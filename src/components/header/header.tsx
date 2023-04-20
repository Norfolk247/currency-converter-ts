import './header.css'
import React from 'react';
import {useHistory} from "react-router-dom";

const Header = () => {
    const history = useHistory()
    return (
        <div className='header'>
            <div className='header-btn' onClick={()=>history.push('/')}>Главная</div>
            <div className='header-btn' onClick={()=>history.push('/converter')}>Конвертер</div>
        </div>
    );
};

export default Header;