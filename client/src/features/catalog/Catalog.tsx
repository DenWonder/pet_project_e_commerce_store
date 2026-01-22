import ProductList from "./ProductList.tsx";
import {useFetchProductsQuery} from "./catalogApi.ts";
import {Grid2} from "@mui/material";
import Filters from "./Filters.tsx";
import {useAppSelector} from "../../app/store/store.ts";

export default function Catalog() {
    const productsParams = useAppSelector(state => state.catalog);
    const {data, isLoading} = useFetchProductsQuery(productsParams);
    
    if (isLoading || !data) return <div>Loading...</div>;
    
    return (
        <Grid2 container spacing={4}>
            <Grid2 size={3}>
                <Filters />
            </Grid2>
            <Grid2 size={9}>
                <ProductList products={data} />
            </Grid2>
        </Grid2>
    )
}