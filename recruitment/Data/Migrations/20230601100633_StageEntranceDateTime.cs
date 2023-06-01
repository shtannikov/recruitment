using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace recruitment.Data.Migrations
{
    /// <inheritdoc />
    public partial class StageEntranceDateTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "StageEntranceDateTimeUtc",
                table: "Candidates",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StageEntranceDateTimeUtc",
                table: "Candidates");
        }
    }
}
