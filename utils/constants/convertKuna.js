import { currencyFormatter } from "../priceFormat";

const kunaExchangeRate = 7.53450;

export const convertKuna = (currentPrice) => {
    var format = currencyFormatter(currentPrice)
    return (parseFloat(format) * kunaExchangeRate ).toFixed(2);
} 