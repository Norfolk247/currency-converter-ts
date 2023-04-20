import './App.css'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "./components/header/header";
import Main from "./components/pages/main/main";
import Converter from "./components/pages/converter/converter";
import {RatesProvider} from "./providers/rates";

function App() {
    return (
        <RatesProvider from={['eur', 'usd', 'gbp']} to={'rub'}>
            <div className='app'>
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route path='/converter' component={Converter}/>
                        <Redirect to='/'/>
                    </Switch>
                </BrowserRouter>
            </div>
        </RatesProvider>
    );
}

export default App;
