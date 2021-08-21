using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanerWebApi.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Planer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Vlasnik = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Mesec",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    PlanerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mesec", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mesec_Planer_PlanerId",
                        column: x => x.PlanerId,
                        principalTable: "Planer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Dan",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Datum = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MesecId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dan_Mesec_MesecId",
                        column: x => x.MesecId,
                        principalTable: "Mesec",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Obaveza",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bitna = table.Column<bool>(type: "bit", nullable: false),
                    VremeOd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VremeDo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DanId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Obaveza", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Obaveza_Dan_DanId",
                        column: x => x.DanId,
                        principalTable: "Dan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dan_MesecId",
                table: "Dan",
                column: "MesecId");

            migrationBuilder.CreateIndex(
                name: "IX_Mesec_PlanerId",
                table: "Mesec",
                column: "PlanerId");

            migrationBuilder.CreateIndex(
                name: "IX_Obaveza_DanId",
                table: "Obaveza",
                column: "DanId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Obaveza");

            migrationBuilder.DropTable(
                name: "Dan");

            migrationBuilder.DropTable(
                name: "Mesec");

            migrationBuilder.DropTable(
                name: "Planer");
        }
    }
}
