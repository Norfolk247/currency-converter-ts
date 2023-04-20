import {FC, PropsWithChildren, useEffect, useState} from "react";
import {Currency, DEFAULT_STATE, Rates, RatesContext} from "./context";
import {getRates} from "../../api/currate";

type RatesProviderProps = FC<PropsWithChildren<{ from: Currency[], to: Currency }>>

export const RatesProvider: RatesProviderProps = ({children, from, to}) => {
    const [ratesContext, setRatesContext] = useState<RatesContext>(DEFAULT_STATE)
    useEffect(() => {
        getRates(from, to)
            .then(r => {
                setRatesContext({rates: [{name: 'rub', stableValue: 1},...r]})
            })
    }, [from, to])

    return <Rates.Provider value={ratesContext}>
        {children}
    </Rates.Provider>
}