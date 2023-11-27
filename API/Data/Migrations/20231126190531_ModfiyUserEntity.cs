using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class ModfiyUserEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photo_Users_UsersId",
                table: "Photo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Photo",
                table: "Photo");

            migrationBuilder.RenameTable(
                name: "Photo",
                newName: "photo");

            migrationBuilder.RenameColumn(
                name: "KnowAs",
                table: "Users",
                newName: "LookingFor");

            migrationBuilder.RenameColumn(
                name: "Birthday",
                table: "Users",
                newName: "DateOfBirth");

            migrationBuilder.RenameIndex(
                name: "IX_Photo_UsersId",
                table: "photo",
                newName: "IX_photo_UsersId");

            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Interests",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Introduction",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KnownAs",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_photo",
                table: "photo",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_photo_Users_UsersId",
                table: "photo",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_photo_Users_UsersId",
                table: "photo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_photo",
                table: "photo");

            migrationBuilder.DropColumn(
                name: "Created",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Interests",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Introduction",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "KnownAs",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "photo",
                newName: "Photo");

            migrationBuilder.RenameColumn(
                name: "LookingFor",
                table: "Users",
                newName: "KnowAs");

            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "Users",
                newName: "Birthday");

            migrationBuilder.RenameIndex(
                name: "IX_photo_UsersId",
                table: "Photo",
                newName: "IX_Photo_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Photo",
                table: "Photo",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Photo_Users_UsersId",
                table: "Photo",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
