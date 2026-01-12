using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context): BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
        var basket = await RetrieveBasket();
        
        if(basket == null) return NoContent();

        return basket;
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        basket ??= CreateBasket(); 
       
        var product = await context.Products.FindAsync(productId);
        if(product == null) return BadRequest("Problem with adding item to Basket");

        basket.AddItem(product, quantity);
        var result = await context.SaveChangesAsync() > 0;
        if (result) return CreatedAtAction(nameof(GetBasket), basket);
        return BadRequest("Problem with basket updating");
    }




    [HttpDelete]
    public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        return StatusCode(200);
    }
    
    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }
    
    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(7)
        };
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        context.Baskets.Add(basket);
        return basket;
    }
}