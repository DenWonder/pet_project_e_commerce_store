import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Product} from "../../app/models/product.ts";

export default function ProductDetails() {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch(`https://localhost:5001/api/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.log(err));
    }, [id]);
    
    return (
        <div>The name of product is: {product?.name}</div>
    )
}