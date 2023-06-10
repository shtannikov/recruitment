using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recruitment.Data.Migrations
{
    /// <inheritdoc />
    public partial class DropCityColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "City",
                table: "Candidates");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "Candidates",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
