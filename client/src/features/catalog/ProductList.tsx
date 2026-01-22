import type {Product} from "../../app/models/product.ts";
import ProductCard from "./ProductCard.tsx";
import {Grid2} from "@mui/material";

type Props = {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    return (
        <Grid2 container spacing={3}>
            {products.map(product => (
                <Grid2 size={3} display='flex' key={product.id}>
                    <ProductCard key={product.id} product={product} />
                </Grid2>
            ))}
        </Grid2>
    )
}