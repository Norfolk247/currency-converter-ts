import {Currency} from "../providers/rates"
import {Rate} from "../providers/rates/context";


export const getCurrenciesApi = async (from: Currency, to: Currency): Promise<Rate> => {
    try {
        const response = await fetch(`https://api.tinkoff.ru/v1/currency_rates?from=${from}&to=${to}`)
        const data = await response.json()

        // {category: 'DepositPayments', fromCurrency: {…}, toCurrency: {…}, buy: 79.9, sell: 85.75}
        const rate = data.payload.rates[0]

        return {
            name: from,
            stableValue: rate.buy
        }
    } catch (e) {
        throw e
    }
}

export const getRates = (from: Currency[], to: Currency) => Promise.all(from.map(c => getCurrenciesApi(c, to)))
