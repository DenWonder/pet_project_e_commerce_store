using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<StoreContext>()
                      ?? throw new InvalidOperationException("Failed to retrieve store context");

        SeedData(context);
    }

    private static void SeedData(StoreContext context)
    {
        context.Database.Migrate();

        if (context.Products.Any()) return;

        var products = new List<Product>
        {
         new()
         {
                Name = "Johnnie Walker Red Label 0.7",
                Description = "Blended Scotch whisky, bold and smoky",
                Price = 15,
                PictureUrl = "/images/products/JW_Red_1.png",
                Type = "Whiskey",
                Brand = "Johnnie Walker",
                QuantityInStock = 10
            },
            new()
            {
                Name = "Johnnie Walker Black Label 0.7",
                Description = "12 years old blended Scotch whisky",
                Price = 29,
                PictureUrl = "/images/products/JW_Black_1.png",
                Type = "Whiskey",
                Brand = "Johnnie Walker",
                QuantityInStock = 7
            },
            new()
            {
                Name = "Jameson Irish Whiskey 0.7",
                Description = "Triple distilled Irish whiskey",
                Price = 18,
                PictureUrl = "/images/products/Jameson_1.png",
                Type = "Whiskey",
                Brand = "Jameson",
                QuantityInStock = 15
            },
            new()
            {
                Name = "Jack Daniel’s Old No.7 0.7",
                Description = "Tennessee whiskey charcoal mellowed",
                Price = 22,
                PictureUrl = "/images/products/JackDaniels_1.png",
                Type = "Whiskey",
                Brand = "Jack Daniel’s",
                QuantityInStock = 12
            },
            new()
            {
                Name = "Chivas Regal 12 0.7",
                Description = "12 years old blended Scotch whisky",
                Price = 26,
                PictureUrl = "/images/products/Chivas12_1.png",
                Type = "Whiskey",
                Brand = "Chivas Regal",
                QuantityInStock = 8
            },
            new()
            {
                Name = "Glenfiddich 12 0.7",
                Description = "Single malt Scotch whisky",
                Price = 42,
                PictureUrl = "/images/products/Glenfiddich12_1.png",
                Type = "Whiskey",
                Brand = "Glenfiddich",
                QuantityInStock = 5
            },
            new()
            {
                Name = "Ballantine’s Finest 0.7",
                Description = "Smooth blended Scotch whisky",
                Price = 17,
                PictureUrl = "/images/products/Ballantines_1.png",
                Type = "Whiskey",
                Brand = "Ballantine’s",
                QuantityInStock = 20
            },
            new()
            {
                Name = "Absolut Vodka 0.7",
                Description = "Swedish premium vodka",
                Price = 14,
                PictureUrl = "/images/products/Absolut_1.png",
                Type = "Vodka",
                Brand = "Absolut",
                QuantityInStock = 25
            },
            new()
            {
                Name = "Grey Goose Vodka 0.7",
                Description = "French premium vodka",
                Price = 31,
                PictureUrl = "/images/products/GreyGoose_1.png",
                Type = "Vodka",
                Brand = "Grey Goose",
                QuantityInStock = 9
            },
            new()
            {
                Name = "Finlandia Vodka 0.7",
                Description = "Classic Finnish vodka",
                Price = 12,
                PictureUrl = "/images/products/Finlandia_1.png",
                Type = "Vodka",
                Brand = "Finlandia",
                QuantityInStock = 18
            },
            new()
            {
                Name = "Bacardi Carta Blanca 0.7",
                Description = "White rum, light and smooth",
                Price = 16,
                PictureUrl = "/images/products/Bacardi_1.png",
                Type = "Rum",
                Brand = "Bacardi",
                QuantityInStock = 14
            },
            new()
            {
                Name = "Captain Morgan Spiced Gold 0.7",
                Description = "Spiced rum with vanilla notes",
                Price = 19,
                PictureUrl = "/images/products/CaptainMorgan_1.png",
                Type = "Rum",
                Brand = "Captain Morgan",
                QuantityInStock = 11
            },
            new()
            {
                Name = "Havana Club 7 Años 0.7",
                Description = "Aged Cuban dark rum",
                Price = 24,
                PictureUrl = "/images/products/Havana7_1.png",
                Type = "Rum",
                Brand = "Havana Club",
                QuantityInStock = 6
            },
            new()
            {
                Name = "Beefeater London Dry Gin 0.7",
                Description = "Classic London dry gin",
                Price = 18,
                PictureUrl = "/images/products/Beefeater_1.png",
                Type = "Gin",
                Brand = "Beefeater",
                QuantityInStock = 13
            },
            new()
            {
                Name = "Bombay Sapphire Gin 0.7",
                Description = "Premium gin with botanicals",
                Price = 23,
                PictureUrl = "/images/products/Bombay_1.png",
                Type = "Gin",
                Brand = "Bombay Sapphire",
                QuantityInStock = 10
            },
            new()
            {
                Name = "Jägermeister 0.7",
                Description = "Herbal liqueur with 56 herbs",
                Price = 17,
                PictureUrl = "/images/products/Jagermeister_1.png",
                Type = "Liqueur",
                Brand = "Jägermeister",
                QuantityInStock = 16
            },
            new()
            {
                Name = "Baileys Original 0.7",
                Description = "Irish cream liqueur",
                Price = 20,
                PictureUrl = "/images/products/Baileys_1.png",
                Type = "Liqueur",
                Brand = "Baileys",
                QuantityInStock = 9
            },
            new()
            {
                Name = "Martini Bianco 1.0",
                Description = "Sweet white vermouth",
                Price = 13,
                PictureUrl = "/images/products/MartiniBianco_1.png",
                Type = "Vermouth",
                Brand = "Martini",
                QuantityInStock = 22
            },
            new()
            {
                Name = "Martini Rosso 1.0",
                Description = "Classic red vermouth",
                Price = 13,
                PictureUrl = "/images/products/MartiniRosso_1.png",
                Type = "Vermouth",
                Brand = "Martini",
                QuantityInStock = 19
            },
            new()
            {
                Name = "Campari Bitter 0.7",
                Description = "Italian bitter aperitif",
                Price = 19,
                PictureUrl = "/images/products/Campari_1.png",
                Type = "Aperitif",
                Brand = "Campari",
                QuantityInStock = 8
            }
        };
        
        context.Products.AddRange(products);

        context.SaveChanges();
    }
}