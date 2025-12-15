using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ProductsController : Controller
{
    private readonly StoreContext _context;

    public ProductsController(StoreContext context): base()
    {
        _context = context;
    }
    
    [HttpGet]
    public ActionResult<List<Product>> GetProducts()
    {
        return _context.Products.ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProduct(int id)
    {
        var product = _context.Products.Find(id);
        if (product == null) return NotFound();
        return product;
    }
}