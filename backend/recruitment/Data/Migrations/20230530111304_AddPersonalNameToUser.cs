using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recruitment.Migrations
{
    /// <inheritdoc />
    public partial class AddPersonalNameToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PersonalName",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PersonalName",
                table: "AspNetUsers");
        }
    }
}
