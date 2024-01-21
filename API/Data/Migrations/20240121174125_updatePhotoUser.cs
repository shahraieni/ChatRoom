using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Data.Migrations
{
    public partial class updatePhotoUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_photo_Users_UsersId",
                table: "photo");

            migrationBuilder.DropIndex(
                name: "IX_photo_UsersId",
                table: "photo");

            migrationBuilder.DropColumn(
                name: "UsersId",
                table: "photo");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "photo",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_photo_UserId",
                table: "photo",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_photo_Users_UserId",
                table: "photo",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_photo_Users_UserId",
                table: "photo");

            migrationBuilder.DropIndex(
                name: "IX_photo_UserId",
                table: "photo");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "photo");

            migrationBuilder.AddColumn<int>(
                name: "UsersId",
                table: "photo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_photo_UsersId",
                table: "photo",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_photo_Users_UsersId",
                table: "photo",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }
    }
}
