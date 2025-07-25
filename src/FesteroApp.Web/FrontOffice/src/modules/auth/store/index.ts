import { defineStore } from "pinia";
import type {
  LoginPayload,
  RegisterPayload,
  ForgotPasswordPayload,
} from "./types";
import axios from "axios";
import HTTP from "@/utils/http";
import router from "@/router";
import { decodeJwt } from "@/helpers/authHelper";

const api = new HTTP();

export interface AccountType {
  current: {
    id?: string;
    name?: string;
    email?: string;
    expireIn?: Date;
    token?: string;
    roles?: {
      tenantId?: string | undefined;
      company?: string | undefined;
      role?: string | undefined;
    }[];
  };
  isAuthenticated: boolean;
  errorAccount: number | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AccountType => ({
    current: { roles: [{}] },
    isAuthenticated: false,
    errorAccount: null,
  }),

  actions: {
    async login(payload: LoginPayload) {
      try {
        const response = await api.post("/api/users/login", payload);
        const token = response.data.split(" ")[1];

        if (!token) throw new Error("Autênticação ausente");

        const decoded = decodeJwt(token);

        if (!decoded) throw new Error("Autênticação inválida");

        const { id, name, email, expireIn, roles } = decoded;

        const parsedRoles =
          typeof roles === "string"
            ? JSON.parse(roles).map((r: any) => ({
                tenantId: r.TenantId,
                company: r.Company,
                role: r.Role,
              }))
            : [];

        this.current = {
          id: id || "",
          name: name || "",
          email: email || "",
          expireIn,
          roles: parsedRoles,
        };

        this.isAuthenticated = true;
        this.errorAccount = null;

        localStorage.setItem("token", token);
        localStorage.setItem("user",JSON.stringify(this.current));

        router.push({ name: "home" });
      } catch (error: any) {
        this.logout();
        this.errorAccount = error?.response?.status || 500;
        throw error;
      }
    },

    async register(payload: RegisterPayload) {
      try {
        const response = await api.post("/register", payload);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },

    async forgotPassword(payload: ForgotPasswordPayload) {
      try {
        const response = await api.post("/forgot-password", payload);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.current = {};
      this.errorAccount = null;
      localStorage.removeItem("token");
      router.push({ name: "login" });
    },

    restoreSession() {
      const token = localStorage.getItem("token");
      if (token) {
        this.current.token = token;
        this.isAuthenticated = true;
      }
    },
  },
});
