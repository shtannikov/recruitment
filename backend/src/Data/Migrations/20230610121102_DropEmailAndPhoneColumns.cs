using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recruitment.Data.Migrations
{
    /// <inheritdoc />
    public partial class DropEmailAndPhoneColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Candidates");

            migrationBuilder.DropColumn(
                name: "MobilePhone",
                table: "Candidates");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Candidates",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MobilePhone",
                table: "Candidates",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
