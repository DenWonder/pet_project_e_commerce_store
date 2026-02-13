import type {Product} from "../../app/models/product.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAddBasketItemMutation} from "../basket/basketApi.ts";
import {currencyFormat} from "../../../lib/util.ts";

type Props = {
    product: Product;
}

export default function ProductCard({product}: Props){
    const [addBasketItem, {isLoading}] = useAddBasketItemMutation();
    
    return (
        <Card
            elevation={3}
            sx={{
                width: 280,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardMedia
                sx={{height: 240, backgroundSize: "cover"}}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography 
                    gutterBottom 
                    sx={{color: 'secondary.main'}}
                    variant="subtitle2">
                    {product.name}
                </Typography>
                <Typography 
                    variant="h6"
                sx={{color:'secondary.main'}}>
                    {currencyFormat(product.price)}
                </Typography>
                {product.quantityInStock <= 0 &&
                    <Typography
                        variant="h6"
                        sx={{color:'primary.main'}}>
                        Out of stock
                    </Typography>
                }
            </CardContent>
            <CardActions
            sx={{justifyContent: "space-between"}}
            >
                <Button 
                    disabled={isLoading || product.quantityInStock <= 0}
                    onClick={() => addBasketItem({
                        product, 
                        quantity: 1
                    })}
                >Add to card</Button>
                <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
}