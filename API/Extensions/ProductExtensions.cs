using API.Entities;

namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        query = orderBy switch
        {
            "price" => query.OrderBy(x => x.Price),
            "priceDesc" => query.OrderByDescending(x => x.Price),
            "name" => query.OrderBy(x => x.Name),
            "nameDesc" => query.OrderByDescending(x => x.Name),
            "type" => query.OrderBy(x => x.Type),
            "typeDesc" => query.OrderByDescending(x => x.Type),
            _ => query.OrderBy(x => x.Name)
        };
        return query;
    }
}