using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OnlineParkingApplication.Models
{
    public partial class MyDbContext : DbContext
    {
        public MyDbContext()
        {
        }

        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cardetail> Cardetails { get; set; } = null!;
        public virtual DbSet<Feedback> Feedbacks { get; set; } = null!;
        public virtual DbSet<Parkingarea> Parkingareas { get; set; } = null!;
        public virtual DbSet<Parkingdetail> Parkingdetails { get; set; } = null!;
        public virtual DbSet<Parkingslot> Parkingslots { get; set; } = null!;
        public virtual DbSet<Parkingzone> Parkingzones { get; set; } = null!;
        public virtual DbSet<Paymentdetail> Paymentdetails { get; set; } = null!;
        public virtual DbSet<Userdetail> Userdetails { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;database=carparkingdb;user=root;password=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.33-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Cardetail>(entity =>
            {
                entity.HasKey(e => e.CarId)
                    .HasName("PRIMARY");

                entity.ToTable("cardetail");

                entity.HasIndex(e => e.CarNo, "CarNo")
                    .IsUnique();

                entity.HasIndex(e => e.UserId, "UserId");

                entity.Property(e => e.CarNo).HasMaxLength(20);

                entity.Property(e => e.CarType).HasMaxLength(30);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Cardetails)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("cardetail_ibfk_1");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.ToTable("feedback");

                entity.HasIndex(e => e.UserId, "UserId");

                entity.Property(e => e.UserFeedback).HasColumnType("text");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("feedback_ibfk_1");
            });

            modelBuilder.Entity<Parkingarea>(entity =>
            {
                entity.HasKey(e => e.AreaId)
                    .HasName("PRIMARY");

                entity.ToTable("parkingarea");

                entity.HasIndex(e => e.AreaName, "AreaName")
                    .IsUnique();

                entity.Property(e => e.AreaName).HasMaxLength(30);

                entity.Property(e => e.TotalSlots).HasDefaultValueSql("'0'");

                entity.Property(e => e.TotalZones).HasDefaultValueSql("'0'");
            });

            modelBuilder.Entity<Parkingdetail>(entity =>
            {
                entity.HasKey(e => e.DetailsId)
                    .HasName("PRIMARY");

                entity.ToTable("parkingdetail");

                entity.HasIndex(e => e.SlotId, "SlotId");

                entity.HasIndex(e => e.UserId, "UserId");

                entity.Property(e => e.FromDate).HasColumnType("datetime");

                entity.Property(e => e.ToDate).HasColumnType("datetime");

                entity.HasOne(d => d.Slot)
                    .WithMany(p => p.Parkingdetails)
                    .HasForeignKey(d => d.SlotId)
                    .HasConstraintName("parkingdetail_ibfk_1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Parkingdetails)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("parkingdetail_ibfk_2");
            });

            modelBuilder.Entity<Parkingslot>(entity =>
            {
                entity.HasKey(e => e.SlotId)
                    .HasName("PRIMARY");

                entity.ToTable("parkingslot");

                entity.HasIndex(e => e.ZoneId, "ZoneId");

                entity.Property(e => e.IsOccupied).HasColumnType("bit(1)");

                entity.Property(e => e.SlotName).HasMaxLength(30);

                entity.HasOne(d => d.Zone)
                    .WithMany(p => p.Parkingslots)
                    .HasForeignKey(d => d.ZoneId)
                    .HasConstraintName("parkingslot_ibfk_1");
            });

            modelBuilder.Entity<Parkingzone>(entity =>
            {
                entity.HasKey(e => e.ZoneId)
                    .HasName("PRIMARY");

                entity.ToTable("parkingzone");

                entity.HasIndex(e => e.AreaId, "AreaId");

                entity.Property(e => e.TotalSlots).HasDefaultValueSql("'0'");

                entity.HasOne(d => d.Area)
                    .WithMany(p => p.Parkingzones)
                    .HasForeignKey(d => d.AreaId)
                    .HasConstraintName("parkingzone_ibfk_1");
            });

            modelBuilder.Entity<Paymentdetail>(entity =>
            {
                entity.HasKey(e => e.PaymentId)
                    .HasName("PRIMARY");

                entity.ToTable("paymentdetail");

                entity.HasIndex(e => e.UserId, "UserId");

                entity.Property(e => e.PaymentTime).HasColumnType("datetime");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Paymentdetails)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("paymentdetail_ibfk_1");
            });

            modelBuilder.Entity<Userdetail>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PRIMARY");

                entity.ToTable("userdetail");

                entity.HasIndex(e => e.AadhaarNo, "AadhaarNo")
                    .IsUnique();

                entity.HasIndex(e => e.Email, "Email")
                    .IsUnique();

                entity.Property(e => e.AadhaarNo).HasMaxLength(12);

                entity.Property(e => e.Email).HasMaxLength(100);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.MobileNo).HasMaxLength(15);

                entity.Property(e => e.Password).HasMaxLength(100);

                entity.Property(e => e.Role).HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
