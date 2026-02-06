using System;
using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    
    public required DbSet<Basket> Baskets { get; set; }
    public required DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id = "52b9825a-e0a2-4734-9825-1414528f55cc", ConcurrencyStamp = "Member", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Id = "0cb54b31-ca88-49ad-a11e-6783be183928", ConcurrencyStamp = "Admin", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}