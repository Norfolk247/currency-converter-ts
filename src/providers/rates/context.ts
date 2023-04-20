import {createContext, useContext} from "react";

export type Currency = 'eur' | 'usd' | 'gbp' | 'rub'

export type Rate = {
    name: Currency
    stableValue: number
}

export type RatesContext = {
    rates: Rate[]
}

export const DEFAULT_STATE = {rates: []}

export const Rates = createContext<RatesContext>(DEFAULT_STATE)

export const useRates = () => useContext(Rates)