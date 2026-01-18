import {useParams} from "react-router-dom";
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import {useFetchProductDetailsQuery} from "./catalogApi.ts";
import {currencyFormat} from "../../../lib/util.ts";
import {useAddBasketItemMutation} from "../basket/basketApi.ts";
import {type ChangeEvent, useState} from "react";

export default function ProductDetails() {
    const {id} = useParams();
    const {data: product, isLoading} = useFetchProductDetailsQuery(id ? +id : 0);
    const [addBasketItem] = useAddBasketItemMutation();
    const [quantity, setQuantity] = useState(1);

    if (!product || isLoading) return <div>Loading...</div>

    const handleUpdateBasket = () => {
        if (0 < quantity && quantity <= 99) {
            addBasketItem({product, quantity: quantity})
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = +event.currentTarget.value;
        if (value >= 0) setQuantity(value)
    }

    const productDetails = [
        { label: 'Name', value: product.name },
        { label: 'Description', value: product.description },
        { label: 'Type', value: product.type },
        { label: 'Brand', value: product.brand },
        { label: 'Quantity in stock', value: product.quantityInStock },
    ]

    return (
        <Grid2 container spacing={6} maxWidth='lg' sx={{ mx: 'auto' }}>
            <Grid2 size={6}>
                <img src={product?.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid2>
            <Grid2 size={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider  sx={{mb: 2}} />
                <Typography variant="h4" color='secondary'>{currencyFormat(product.price)}</Typography>
                <TableContainer>
                    <Table sx={{
                        '& td': {fontSize: '1rem'}
                    }}>
                        <TableBody>
                            {productDetails.map((detail, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{fontWeight: 'bold'}}>{detail.label}</TableCell>
                                    <TableCell>{detail.value}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid2 container spacing={2} marginTop={3}>
                    <Grid2 size={6}>
                        <TextField
                            variant="outlined"
                            type="number"
                            label={quantity > 99 || quantity < 0 ? `Invalid value` : `Quantity:`}
                            fullWidth
                            InputProps={{ inputProps: {
                                    pattern: '[0-9]*',
                                    min: 0,
                                    max: 99,
                                    maxLength: 2 } }}
                            maxRows={2}
                            value={quantity}
                            onChange={handleInputChange}
                            error={quantity > 99}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <Button
                            sx={{height: '55px'}}
                            color="primary"
                            disabled={quantity <= 0 || quantity > 99}
                            size="large"
                            variant="contained"
                            fullWidth
                            onClick={handleUpdateBasket}
                        >
                            Add to Basket
                        </Button>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}