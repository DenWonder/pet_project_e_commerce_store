import {useFetchBasketQuery} from "../../src/features/basket/basketApi";

export const useBasket = () => {
    const {data: basket} = useFetchBasketQuery();
    const subtotal = basket?.items.reduce((sum: number, item) => sum + item.price * item.quantity, 0,) ?? 0;
    const deliveryFee = subtotal >= 10000 ? 0 : 500;
    const total = subtotal + deliveryFee;

    return {basket, subtotal, deliveryFee, total};
}