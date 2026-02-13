import {createProductSchema, type CreateProductSchema} from "../../../lib/schemas/createProductSchema.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Box, Button, Grid2, Paper, Typography} from "@mui/material"
import AppTextInput from "../../app/shared/components/AppTextInput.tsx";
import {useFetchFiltersQuery} from "../catalog/catalogApi.ts";
import AppSelectInput from "../../app/shared/components/AppSelectInput.tsx";

export default function ProductForm(){
    const {control, handleSubmit} = useForm({
        // mode: 'onTouched',
        // defaultValues: {
        //     name: ''
        // },
        resolver: zodResolver(createProductSchema)
    })

    const {data} = useFetchFiltersQuery();

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
                        <AppTextInput rows={6} control={control} name="description" label="Description" />
                    </Grid2>
                    <Grid2 size={12}>
                        <AppTextInput control={control} name="file" label="Image" />
                    </Grid2>
                </Grid2>
                <Box display='flex' justifyContent='space-between' sx={{mt:3}}>
                    <Button variant='contained' color='inherit'>Cancel</Button>
                    <Button variant='contained' color='success' type="submit">Submit</Button>
                </Box>
            </form>
        </Box>
    )
}