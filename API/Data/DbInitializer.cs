using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static async Task InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                      ?? throw new InvalidOperationException("Failed to retrieve store context");
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to retrieve user manager");

        await SeedData(context, userManager);
    }

    private static async Task SeedData(StoreContext context, UserManager<User> userManager)
    {
        context.Database.Migrate();

        if (!userManager.Users.Any())
        {
            var user = new User
            {
                UserName = "Denis@test.com",
                Email = "Denis@test.com"
            };
            
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");
            
            var admin = new User
            {
                UserName = "admin@test.com",
                Email = "admin@test.com"
            };
            
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
        }

        if (context.Products.Any()) return;

        var products = new List<Product>
        {
         new()
         {
             Name = "Johnnie Walker Red Label 0.7",
             Description = "12 years old blended Scotch whisky",
             Price = 2000,
             PictureUrl = "/images/products/product_1.png",
             Type = "Whiskey",
             Brand = "Johnnie Walker",
             QuantityInStock = 7
            },
            new()
            {
                Name = "Johnnie Walker Black Label 0.7",
                Description = "12 years old blended Scotch whisky",
                Price = 2900,
                PictureUrl = "/images/products/product_2.png",
                Type = "Whiskey",
                Brand = "Johnnie Walker",
                QuantityInStock = 7
            },
            new()
            {
                Name = "Johnnie Walker Double Black 0.7",
                Description = "Intense and smoky blended Scotch whisky",
                Price = 3400,
                PictureUrl = "/images/products/product_3.png",
                Type = "Whiskey",
                Brand = "Johnnie Walker",
                QuantityInStock = 5
            },
            new()
            {
                Name = "Johnnie Walker Green Label 0.7",
                Description = "15 years old blended malt Scotch whisky",
                Price = 4200,
                PictureUrl = "/images/products/product_4.png",
                Type = "Whiskey",
                Brand = "Johnnie Walker",
                QuantityInStock = 4
            },
            new()
            {
                Name = "Jameson Irish Whiskey 0.7",
                Description = "Triple distilled Irish whiskey",
                Price = 1800,
                PictureUrl = "/images/products/product_5.png",
                Type = "Whiskey",
                Brand = "Jameson",
                QuantityInStock = 15
            },
            new()
            {
                Name = "Jameson Black Barrel 0.7",
                Description = "Rich Irish whiskey with toasted barrel notes",
                Price = 2600,
                PictureUrl = "/images/products/product_6.png",
                Type = "Whiskey",
                Brand = "Jameson",
                QuantityInStock = 6
            },
            new()
            {
                Name = "Jameson Caskmates Stout Edition 0.7",
                Description = "Irish whiskey finished in stout beer casks",
                Price = 2200,
                PictureUrl = "/images/products/product_7.png",
                Type = "Whiskey",
                Brand = "Jameson",
                QuantityInStock = 9
            },
            new()
            {
                Name = "Jameson Crested 0.7",
                Description = "Traditional Irish whiskey with sherry cask notes",
                Price = 2400,
                PictureUrl = "/images/products/product_8.png",
                Type = "Whiskey",
                Brand = "Jameson",
                QuantityInStock = 7
            },
            new()
            {
                Name = "Jack Daniel’s Old No.7 0.7",
                Description = "Tennessee whiskey charcoal mellowed",
                Price = 2200,
                PictureUrl = "/images/products/product_9.png",
                Type = "Whiskey",
                Brand = "Jack Daniel’s",
                QuantityInStock = 10
            },
            new()
            {
                Name = "Jack Daniel’s Gentleman Jack 0.7",
                Description = "Double mellowed Tennessee whiskey",
                Price = 2800,
                PictureUrl = "/images/products/product_10.png",
                Type = "Whiskey",
                Brand = "Jack Daniel’s",
                QuantityInStock = 6
            },
            new()
            {
                Name = "Jack Daniel’s Single Barrel 0.7",
                Description = "Premium single barrel Tennessee whiskey",
                Price = 3900,
                PictureUrl = "/images/products/product_11.png",
                Type = "Whiskey",
                Brand = "Jack Daniel’s",
                QuantityInStock = 4
            },
            new()
            {
                Name = "Chivas Regal 12 0.7",
                Description = "12 years old blended Scotch whisky",
                Price = 2600,
                PictureUrl = "/images/products/product_12.png",
                Type = "Whiskey",
                Brand = "Chivas Regal",
                QuantityInStock = 8
            },
            new()
            {
                Name = "Chivas Regal 18 0.7",
                Description = "18 years old blended Scotch whisky",
                Price = 5200,
                PictureUrl = "/images/products/product_13.png",
                Type = "Whiskey",
                Brand = "Chivas Regal",
                QuantityInStock = 3
            },
            new()
            {
                Name = "Chivas Regal Extra 0.7",
                Description = "Rich blended whisky with sherry cask finish",
                Price = 3400,
                PictureUrl = "/images/products/product_14.png",
                Type = "Whiskey",
                Brand = "Chivas Regal",
                QuantityInStock = 5
            },
            new()
            {
                Name = "Absolut Vodka 0.7",
                Description = "Swedish premium vodka",
                Price = 1400,
                PictureUrl = "/images/products/product_15.png",
                Type = "Vodka",
                Brand = "Absolut",
                QuantityInStock = 20
            },
            new()
            {
                Name = "Absolut Citron 0.7",
                Description = "Lemon flavored vodka",
                Price = 1500,
                PictureUrl = "/images/products/product_16.png",
                Type = "Vodka",
                Brand = "Absolut",
                QuantityInStock = 14
            },
            new()
            {
                Name = "Absolut Elyx 0.7",
                Description = "Luxury handcrafted copper distilled vodka",
                Price = 3900,
                PictureUrl = "/images/products/product_17.png",
                Type = "Vodka",
                Brand = "Absolut",
                QuantityInStock = 4
            },
            new()
            {
                Name = "Absolut Raspberry 0.7",
                Description = "Raspberry flavored vodka with natural ingredients",
                Price = 1500,
                PictureUrl = "/images/products/product_18.png",
                Type = "Vodka",
                Brand = "Absolut",
                QuantityInStock = 13
            },
            new()
            {
                Name = "Bacardi Carta Blanca 0.7",
                Description = "White rum, light and smooth",
                Price = 1600,
                PictureUrl = "/images/products/product_19.png",
                Type = "Rum",
                Brand = "Bacardi",
                QuantityInStock = 18
            },
            new()
            {
                Name = "Bacardi Carta Negra 0.7",
                Description = "Dark rum with rich molasses notes",
                Price = 1800,
                PictureUrl = "/images/products/product_20.png",
                Type = "Rum",
                Brand = "Bacardi",
                QuantityInStock = 11
            },
            new()
            {
                Name = "Bacardi Reserva Ocho 0.7",
                Description = "Aged rum matured for 8 years",
                Price = 3200,
                PictureUrl = "/images/products/product_1.png",
                Type = "Rum",
                Brand = "Bacardi",
                QuantityInStock = 6
            }
        };
        
        context.Products.AddRange(products);

        context.SaveChanges();
    }
}