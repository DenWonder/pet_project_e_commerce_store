import ProductList from "./ProductList.tsx";
import {useFetchProductsQuery} from "./catalogApi.ts";
import {Grid2, Typography} from "@mui/material";
import Filters from "./Filters.tsx";
import {useAppDispatch, useAppSelector} from "../../app/store/store.ts";
import AppPagination from "../../app/shared/components/AppPagination.tsx";
import {setPageNumber} from "./catalogSlice.ts";

export default function Catalog() {
    const productsParams = useAppSelector(state => state.catalog);
    const {data, isLoading} = useFetchProductsQuery(productsParams);
    const dispatch = useAppDispatch();
    
    if (isLoading || !data) return <div>Loading...</div>;
    
    return (
        <Grid2 container spacing={4}>
            <Grid2 size={3}>
                <Filters />
            </Grid2>
            <Grid2 size={9}>
                {data.items && data.items.length > 0 ? (
                    <>
                        <ProductList products={data.items} />
                        <AppPagination
                            metadata={data.pagination}
                            onPageChange={(page: number) => dispatch(setPageNumber(page))}
                        />
                    </> 
                ) : (
                    <Typography variant="h5">No results. Try to change filters</Typography>
                )}

            </Grid2>
        </Grid2>
    )
}