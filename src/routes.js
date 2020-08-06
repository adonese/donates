import React from 'react';
import FAQ from "./faq"
import App from './App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export default function LocalRouter() {
    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route path="/wallet/:id">
                        <App />
                    </Route> */}
                    <Route path="/wallet/:id" render={(props) => <App {...props}/>}/>
                    <Route path="/" render={(props) => <App {...props}/>}/>
                    <Route path="/faq">
                        <FAQ />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
