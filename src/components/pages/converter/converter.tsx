import './converter.css'
import React, {useRef, useState} from 'react';
import {Rate, useRates} from "../../../providers/rates";


const Converter = () => {
    const {rates} = useRates()
    const leftInput = useRef<HTMLInputElement>(null)
    const rightInput = useRef<HTMLInputElement>(null)
    const [current, setCurrent] = useState<Rate[]>([{name: 'rub', stableValue: 1},{name: 'rub', stableValue: 1}])
    return (
        <div className='converter'>
            <div className='converter-item'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {current[0].name.toUpperCase()}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {rates.map(r=><button className='dropdown-item' type='button' key={r.name} onClick={()=>{
                            setCurrent(prevState => [{name: r.name, stableValue: r.stableValue},prevState[1]])
                        }}>{r.name.toUpperCase()}</button>)}
                    </div>
                </div>
                <div className='input-box'>
                    <input type={"number"} ref={leftInput} onChange={e => {
                        if (rightInput.current !== null) {
                            rightInput.current.value = (Math.round(current[0].stableValue/current[1].stableValue*10**4*(parseInt(e.target.value)))/10**4).toString()
                        }
                    }}/>
                </div>
            </div>
            <div className='converter-item' style={{display: "flex", alignContent: "center", flexWrap: 'wrap'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                     className="bi bi-arrow-left-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                          d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                </svg>
            </div>
            <div className='converter-item'>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {current[1].name.toUpperCase()}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        {rates.map(r=><button className='dropdown-item' type='button' key={r.name} onClick={()=>{
                            setCurrent(prevState => [prevState[0],{name: r.name, stableValue: r.stableValue}])
                        }}>{r.name.toUpperCase()}</button>)}
                    </div>
                </div>
                <div className='input-box'>
                    <input type={"number"} ref={rightInput} onChange={e => {
                        if (leftInput.current !== null) {
                            leftInput.current.value = (Math.round(current[1].stableValue/current[0].stableValue*10**4*(parseInt(e.target.value)))/10**4).toString()
                        }
                    }}/>
                </div>
            </div>
        </div>
    );
};

export default Converter;