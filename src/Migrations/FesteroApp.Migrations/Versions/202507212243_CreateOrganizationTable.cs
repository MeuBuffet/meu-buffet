﻿using FluentMigrator;

namespace FesteroApp.Migrations.Versions;

[Migration(202507212243)]
public class CreateOrganizationTable : Migration
{
    public override void Up()
    {
        Create.Table("Organization")
            .WithColumn("Id").AsGuid().PrimaryKey()
            .WithColumn("LegalName").AsString(500).NotNullable()
            .WithColumn("TradeName").AsString(500).NotNullable()
            .WithColumn("Document").AsString(20).NotNullable()
            .WithColumn("Type").AsString(100).NotNullable()
            .WithColumn("Industry").AsString(20).NotNullable()
            .WithColumn("Email").AsString(150).NotNullable()
            .WithColumn("Phone").AsString(20).NotNullable()
            .WithColumn("Street").AsString(150).NotNullable()
            .WithColumn("Number").AsString(150).NotNullable()
            .WithColumn("Complement").AsString(150).NotNullable()
            .WithColumn("Neighborhood").AsString(150).NotNullable()
            .WithColumn("PostalCode").AsString(150).NotNullable()
            .WithColumn("City").AsString(150).NotNullable()
            .WithColumn("State").AsString(150).NotNullable()
            .WithColumn("ParentId").AsGuid().Nullable().ForeignKey("FK_Organization_ParentOrganization","Organization", "Id")
            .WithColumn("Level").AsInt32().NotNullable()
            .WithColumn("Path").AsString(500).NotNullable()
            .WithColumn("CreatedOn").AsDateTime().NotNullable()
            .WithColumn("UpdatedOn").AsDateTime().NotNullable()
            .WithColumn("DeletedOn").AsDateTime().Nullable();
    }

    public override void Down()
    {
        Delete.Table("Organization");
    }
}