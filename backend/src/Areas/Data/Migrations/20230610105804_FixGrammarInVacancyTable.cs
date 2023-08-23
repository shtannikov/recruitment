using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recruitment.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixGrammarInVacancyTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacancies_Funnels_RecruitemtFunnelId",
                table: "Vacancies");

            migrationBuilder.RenameColumn(
                name: "RecruitemtFunnelId",
                table: "Vacancies",
                newName: "RecruitmentFunnelId");

            migrationBuilder.RenameIndex(
                name: "IX_Vacancies_RecruitemtFunnelId",
                table: "Vacancies",
                newName: "IX_Vacancies_RecruitmentFunnelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vacancies_Funnels_RecruitmentFunnelId",
                table: "Vacancies",
                column: "RecruitmentFunnelId",
                principalTable: "Funnels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacancies_Funnels_RecruitmentFunnelId",
                table: "Vacancies");

            migrationBuilder.RenameColumn(
                name: "RecruitmentFunnelId",
                table: "Vacancies",
                newName: "RecruitemtFunnelId");

            migrationBuilder.RenameIndex(
                name: "IX_Vacancies_RecruitmentFunnelId",
                table: "Vacancies",
                newName: "IX_Vacancies_RecruitemtFunnelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vacancies_Funnels_RecruitemtFunnelId",
                table: "Vacancies",
                column: "RecruitemtFunnelId",
                principalTable: "Funnels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
