import { useForm } from "react-hook-form"
import { createProductSchema, type CreateProductSchema } from "../../../lib/schemas/createProductSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Grid2, Paper, Typography } from "@mui/material"
import AppTextInput from "../../app/shared/components/AppTextInput"
import { useFetchFiltersQuery } from "../catalog/catalogApi"
import AppSelectInput from "../../app/shared/components/AppSelectInput"
import AppDropzone from "../../app/shared/components/AppDropzone"
import type {Product} from "../../app/models/product.ts";
import {useEffect} from "react";
/*
import { useCreateProductMutation, useUpdateProductMutation } from "./adminApi"
import { LoadingButton } from "@mui/lab"
import { handleApiError } from "../../lib/util"*/

type Props = {
    setEditMode: (value: boolean) => void;
    product: Product | null;
}

export default function ProductForm({setEditMode, product}: Props){
    const {control, handleSubmit, watch, reset} = useForm({
        mode: 'onTouched',
        resolver: zodResolver(createProductSchema)
    })
    const watchFile = watch('file');
    const {data} = useFetchFiltersQuery();

    useEffect(()=>{
        if(product){
            reset(product);
        }
    }, [product, reset]);

    const onSubmit = (data: CreateProductSchema) => {
        console.log(data);
    }

    return (
        <Box component={Paper} sx={{p:4, maxWidth:'lg', mx:'auto'}}>
            <Typography variant="h4" sx={{mb:4}}>
                Product details
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container spacing={3}>
                    <Grid2 size={12}>
                        <AppTextInput control={control} name="name" label="Product name" />
                    </Grid2>
                    <Grid2 size={6}>
                        {data?.brands &&
                            <AppSelectInput
                                items={data.brands}
                                control={control}
                                name="brand"
                                label="Brand"
                            />
                        }
                    </Grid2>
                    <Grid2 size={6}>
                        {data?.types &&
                            <AppSelectInput
                                items={data.types}
                                control={control}
                                name="type"
                                label="Type"
                            />
                        }
                    </Grid2>
                    <Grid2 size={6}>
                        <AppTextInput type="number" control={control} name="price" label="Price in cents" />
                    </Grid2>
                    <Grid2 size={6}>
                        <AppTextInput type="number" control={control} name="quantityInStock" label="Quantity in stock" />
                    </Grid2>
                    <Grid2 size={12}>
                        <AppTextInput
                            control={control}
                            multiline
                            rows={4}
                            name="description"
                            label='Description' />
                    </Grid2>
                    <Grid2 size={12} display="flex" justifyContent="space-between" alignItems="center">
                        <AppDropzone name="file" control={control} />
                        {watchFile?.preview ? (
                            <img src={watchFile.preview} alt='preview of image'
                                 style={{maxHeight: 200}} />
                        ) : product?.pictureUrl ? (
                            <img src={product?.pictureUrl} alt='preview of image'
                                 style={{maxHeight: 200}} />
                        ) : null}
                    </Grid2>
                </Grid2>
                <Box display='flex' justifyContent='space-between' sx={{mt:3}}>
                    <Button onClick={() => setEditMode(false)} variant='contained' color='inherit'>Cancel</Button>
                    <Button variant='contained' color='success' type="submit">Submit</Button>
                </Box>
            </form>
        </Box>
    )
}