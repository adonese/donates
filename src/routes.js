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
                    <Route exact path="/">
                        <App />
                    </Route>
                    <Route path="/faq">
                        <FAQ />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
