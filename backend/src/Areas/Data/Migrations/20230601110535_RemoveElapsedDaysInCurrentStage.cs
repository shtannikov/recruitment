using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recruitment.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveElapsedDaysInCurrentStage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ElapsedDaysInCurrentStage",
                table: "Candidates");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ElapsedDaysInCurrentStage",
                table: "Candidates",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
