<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useAppOptionStore } from '@/stores/app-option';
import type { ProgressFinisher } from '@marcoschulte/vue3-progress';
import { useProgress } from '@marcoschulte/vue3-progress';
import AppSidebar from '@/components/app/Sidebar.vue';
import AppSidebarRight from '@/components/app/SidebarRight.vue';
import AppHeader from '@/components/app/Header.vue';
import AppTopMenu from '@/components/app/TopMenu.vue';
import AppFooter from '@/components/app/Footer.vue';
import AppThemePanel from '@/components/app/ThemePanel.vue';
import router from './router';
import { useAuthStore } from '@/modules/auth/store';

const appOption = useAppOptionStore();
const internalInstance = getCurrentInstance();
const auth = useAuthStore();
auth.restoreSession();

const progresses = [] as ProgressFinisher[];

router.beforeEach(async (to, from, next) => {
	progresses.push(useProgress().start());
	appOption.appSidebarMobileToggled = false;
	document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  next();
})
router.afterEach(() => {
	progresses.pop()?.finish();
})
</script>

<template>
	<div class="app" v-bind:class="[{ 
		'app-header-menu-search-toggled': appOption.appHeaderSearchToggled,
		'app-header-fixed': appOption.appHeaderFixed,
		'app-sidebar-fixed': appOption.appSidebarFixed,
		'app-sidebar-grid': appOption.appSidebarGrid,
		'app-sidebar-toggled': appOption.appSidebarToggled,
		'app-sidebar-collapsed': appOption.appSidebarCollapsed,
		'app-sidebar-mobile-toggled': appOption.appSidebarMobileToggled,
		'app-sidebar-mobile-closed': appOption.appSidebarMobileClosed,
		'app-sidebar-end-toggled': appOption.appSidebarEndToggled,
		'app-sidebar-end-mobile-toggled': appOption.appSidebarEndMobileToggled,
		'app-content-full-height': appOption.appContentFullHeight,
		'app-content-full-width': appOption.appSidebarHide,
		'app-without-sidebar': appOption.appSidebarHide,
		'app-with-end-sidebar': appOption.appSidebarEnd,
		'app-with-wide-sidebar': appOption.appSidebarWide,
		'app-with-hover-sidebar': appOption.appSidebarHover,
		'app-with-top-menu': appOption.appTopMenu,
		'app-with-two-sidebar': appOption.appSidebarTwo,
		'pt-0': appOption.appHeaderHide,
		'app-boxed-layout': appOption.appBoxedLayout,
		'app-footer-fixed': appOption.appFooterFixed,
		'app-sidebar-minified': appOption.appSidebarMinified,
		'app-gradient-enabled': appOption.appGradientEnabled
	}, appOption.appClass]">
		<vue3-progress-bar />
		<app-header v-if="!appOption.appHeaderHide" />
		<app-sidebar v-if="!appOption.appSidebarHide" />
		<app-sidebar-right v-if="appOption.appSidebarTwo" />
		<app-top-menu v-if="appOption.appTopMenu" />
		<div class="app-content" v-bind:class="appOption.appContentClass">
			<router-view></router-view>
		</div>
		<app-footer v-if="appOption.appFooter" />
		<app-theme-panel />
	</div>
</template>
