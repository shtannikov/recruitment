using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recruitment.Data.Migrations
{
    /// <inheritdoc />
    public partial class PluralFormForEveryTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_FunnelStage_CurrentStageId",
                table: "Candidates");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_FunnelStage_FunnelStageId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_FunnelStage_Funnel_FunnelId",
                table: "FunnelStage");

            migrationBuilder.DropForeignKey(
                name: "FK_Vacancies_Funnel_RecruitemtFunnelId",
                table: "Vacancies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FunnelStage",
                table: "FunnelStage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Funnel",
                table: "Funnel");

            migrationBuilder.RenameTable(
                name: "FunnelStage",
                newName: "FunnelStages");

            migrationBuilder.RenameTable(
                name: "Funnel",
                newName: "Funnels");

            migrationBuilder.RenameIndex(
                name: "IX_FunnelStage_FunnelId",
                table: "FunnelStages",
                newName: "IX_FunnelStages_FunnelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FunnelStages",
                table: "FunnelStages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Funnels",
                table: "Funnels",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_FunnelStages_CurrentStageId",
                table: "Candidates",
                column: "CurrentStageId",
                principalTable: "FunnelStages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_FunnelStages_FunnelStageId",
                table: "Feedbacks",
                column: "FunnelStageId",
                principalTable: "FunnelStages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FunnelStages_Funnels_FunnelId",
                table: "FunnelStages",
                column: "FunnelId",
                principalTable: "Funnels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vacancies_Funnels_RecruitemtFunnelId",
                table: "Vacancies",
                column: "RecruitemtFunnelId",
                principalTable: "Funnels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Candidates_FunnelStages_CurrentStageId",
                table: "Candidates");

            migrationBuilder.DropForeignKey(
                name: "FK_Feedbacks_FunnelStages_FunnelStageId",
                table: "Feedbacks");

            migrationBuilder.DropForeignKey(
                name: "FK_FunnelStages_Funnels_FunnelId",
                table: "FunnelStages");

            migrationBuilder.DropForeignKey(
                name: "FK_Vacancies_Funnels_RecruitemtFunnelId",
                table: "Vacancies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FunnelStages",
                table: "FunnelStages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Funnels",
                table: "Funnels");

            migrationBuilder.RenameTable(
                name: "FunnelStages",
                newName: "FunnelStage");

            migrationBuilder.RenameTable(
                name: "Funnels",
                newName: "Funnel");

            migrationBuilder.RenameIndex(
                name: "IX_FunnelStages_FunnelId",
                table: "FunnelStage",
                newName: "IX_FunnelStage_FunnelId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FunnelStage",
                table: "FunnelStage",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Funnel",
                table: "Funnel",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Candidates_FunnelStage_CurrentStageId",
                table: "Candidates",
                column: "CurrentStageId",
                principalTable: "FunnelStage",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Feedbacks_FunnelStage_FunnelStageId",
                table: "Feedbacks",
                column: "FunnelStageId",
                principalTable: "FunnelStage",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FunnelStage_Funnel_FunnelId",
                table: "FunnelStage",
                column: "FunnelId",
                principalTable: "Funnel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vacancies_Funnel_RecruitemtFunnelId",
                table: "Vacancies",
                column: "RecruitemtFunnelId",
                principalTable: "Funnel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
