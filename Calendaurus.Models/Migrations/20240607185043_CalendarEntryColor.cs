using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Calendaurus.Models.Migrations
{
    /// <inheritdoc />
    public partial class CalendarEntryColor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "CalendarEntries",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "CalendarEntries");
        }
    }
}
