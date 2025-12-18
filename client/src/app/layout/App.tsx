import {useEffect, useState} from "react";
import type {Product} from "../models/product.ts";
import Catalog from "../../features/catalog/Catalog.tsx";
import {Box, Button, Container, Typography} from "@mui/material";

function App() {

    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        fetch("https://localhost:5001/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
        
        return () => {}
    }, [])
    
    const addProduct = () => {
        setProducts(prevState => [...prevState,
            {
                id: prevState.length + 1,
                name: 'product' + (prevState.length + 1),
                description: 'Test',
                price: (prevState.length * 100) + 100,
                pictureUrl: 'https://picsum.photo/200',
                type: '',
                brand: 'testBrand',
                quantityInStock: 100
            }])
        };
    
return (
    <Container maxWidth="xl">
        <Box
            display="flex" justifyContent="center" gap={3} marginY={3}>
            <Typography variant='h4'>Re-Store</Typography>
            <Button variant='contained' onClick={addProduct}>Add Product</Button>
        </Box>
        <Catalog products={products} />
    </Container>
  )
}

export default App
