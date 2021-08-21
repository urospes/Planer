﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PlanerWebApi.Models;

namespace PlanerWebApi.Migrations
{
    [DbContext(typeof(PlanerContext))]
    partial class PlanerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PlanerWebApi.Models.Dan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Datum")
                        .HasColumnType("datetime2")
                        .HasColumnName("Datum");

                    b.Property<int?>("MesecId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MesecId");

                    b.ToTable("Dan");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Mesec", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)")
                        .HasColumnName("Naziv");

                    b.Property<int?>("PlanerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PlanerId");

                    b.ToTable("Mesec");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Obaveza", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Bitna")
                        .HasColumnType("bit")
                        .HasColumnName("Bitna");

                    b.Property<int?>("DanId")
                        .HasColumnType("int");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)")
                        .HasColumnName("Naziv");

                    b.Property<string>("Opis")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Opis");

                    b.Property<string>("Tip")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Tip");

                    b.Property<DateTime>("VremeDo")
                        .HasColumnType("datetime2")
                        .HasColumnName("VremeDo");

                    b.Property<DateTime>("VremeOd")
                        .HasColumnType("datetime2")
                        .HasColumnName("VremeOd");

                    b.HasKey("Id");

                    b.HasIndex("DanId");

                    b.ToTable("Obaveza");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Planer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Vlasnik")
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)")
                        .HasColumnName("Vlasnik");

                    b.HasKey("Id");

                    b.ToTable("Planer");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Dan", b =>
                {
                    b.HasOne("PlanerWebApi.Models.Mesec", "Mesec")
                        .WithMany("Dani")
                        .HasForeignKey("MesecId");

                    b.Navigation("Mesec");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Mesec", b =>
                {
                    b.HasOne("PlanerWebApi.Models.Planer", "Planer")
                        .WithMany("Meseci")
                        .HasForeignKey("PlanerId");

                    b.Navigation("Planer");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Obaveza", b =>
                {
                    b.HasOne("PlanerWebApi.Models.Dan", "Dan")
                        .WithMany("Obaveze")
                        .HasForeignKey("DanId");

                    b.Navigation("Dan");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Dan", b =>
                {
                    b.Navigation("Obaveze");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Mesec", b =>
                {
                    b.Navigation("Dani");
                });

            modelBuilder.Entity("PlanerWebApi.Models.Planer", b =>
                {
                    b.Navigation("Meseci");
                });
#pragma warning restore 612, 618
        }
    }
}
