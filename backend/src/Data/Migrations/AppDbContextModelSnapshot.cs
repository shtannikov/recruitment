﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using recruitment.Data;

#nullable disable

namespace recruitment.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("recruitment.Data.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PersonalName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("recruitment.Data.Candidate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CurrentStageId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("StageEntranceDateTimeUtc")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("MiddleName")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CurrentStageId");

                    b.ToTable("Candidates");
                });

            modelBuilder.Entity("recruitment.Data.Feedback", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AuthorId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("CandidateId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreationDateTimeUtc")
                        .HasColumnType("TEXT");

                    b.Property<int>("FunnelStageId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("CandidateId");

                    b.HasIndex("FunnelStageId");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("recruitment.Data.Funnel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Funnels");
                });

            modelBuilder.Entity("recruitment.Data.FunnelStage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("FunnelId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("FunnelId");

                    b.ToTable("FunnelStages");
                });

            modelBuilder.Entity("recruitment.Data.Vacancy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("RecruitmentFunnelId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RecruitmentFunnelId")
                        .IsUnique();

                    b.ToTable("Vacancies");
                });

            modelBuilder.Entity("recruitment.Data.Candidate", b =>
                {
                    b.HasOne("recruitment.Data.FunnelStage", "CurrentStage")
                        .WithMany("Candidates")
                        .HasForeignKey("CurrentStageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CurrentStage");
                });

            modelBuilder.Entity("recruitment.Data.Feedback", b =>
                {
                    b.HasOne("recruitment.Data.ApplicationUser", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("recruitment.Data.Candidate", "Candidate")
                        .WithMany("Feedbacks")
                        .HasForeignKey("CandidateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("recruitment.Data.FunnelStage", "FunnelStage")
                        .WithMany()
                        .HasForeignKey("FunnelStageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Author");

                    b.Navigation("Candidate");

                    b.Navigation("FunnelStage");
                });

            modelBuilder.Entity("recruitment.Data.FunnelStage", b =>
                {
                    b.HasOne("recruitment.Data.Funnel", "Funnel")
                        .WithMany("Stages")
                        .HasForeignKey("FunnelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Funnel");
                });

            modelBuilder.Entity("recruitment.Data.Vacancy", b =>
                {
                    b.HasOne("recruitment.Data.Funnel", "RecruitmentFunnel")
                        .WithOne("Vacancy")
                        .HasForeignKey("recruitment.Data.Vacancy", "RecruitmentFunnelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RecruitmentFunnel");
                });

            modelBuilder.Entity("recruitment.Data.Candidate", b =>
                {
                    b.Navigation("Feedbacks");
                });

            modelBuilder.Entity("recruitment.Data.Funnel", b =>
                {
                    b.Navigation("Stages");

                    b.Navigation("Vacancy")
                        .IsRequired();
                });

            modelBuilder.Entity("recruitment.Data.FunnelStage", b =>
                {
                    b.Navigation("Candidates");
                });
#pragma warning restore 612, 618
        }
    }
}
