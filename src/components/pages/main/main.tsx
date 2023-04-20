import React, {useEffect, useState} from 'react';
import {useRates} from "../../../providers/rates";
import './main.css'
import {getRates} from "../../../api/currate";

const MainPage = () => {
    const {rates} = useRates()

    const [rateState, setRateState] = useState(rates)

    const updateRates = () => {
        getRates(['eur', 'usd', 'gbp'], 'rub')
            .then(r => {
                setRateState([{name: 'rub', stableValue: 1},...r])
            })
    }
    useEffect(()=> {
        updateRates()
        setInterval(()=>{
            updateRates()
        }, 60000)
    },[])
    const [current, setCurrent] = useState({name: 'rub', stableValue: 1})
    return (
        <div className='main'>
            <div className='main-header'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {current.name.toUpperCase()}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {rateState.map(item => {
                            return <button
                                style={{textTransform: "uppercase"}}
                                key={item.name}
                                className='dropdown-item'
                                type='button'
                                onClick={() => setCurrent({name: item.name, stableValue: item.stableValue})}
                            >{item.name}</button>
                        })}
                    </div>
                </div>
                <div style={{cursor: 'pointer', height: '38px', width: '38px'}} onClick={updateRates}>
                    <svg xmlns="http://www.w3.org/2000/svg" width='38' height="38" fill="currentColor"
                         className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                        <path
                            d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Код</th>
                    <th>Единиц за {current.name.toUpperCase()}</th>
                    <th>{current.name.toUpperCase()} за единицу</th>
                </tr>
                </thead>
                <tbody>
                {rateState.map(item => <tr key={item.name}>
                    <th>{item.name.toUpperCase()}</th>
                    <th>{Math.round((current.stableValue / item.stableValue) * 10 ** 4) / 10 ** 4}</th>
                    <th>{Math.round((item.stableValue / current.stableValue) * 10 ** 4) / 10 ** 4}</th>
                </tr>)}
                </tbody>
            </table>
        </div>
    );
};

export default MainPage;