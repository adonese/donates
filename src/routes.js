import React from 'react';
import App from './App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Fail from './fail';

export default function LocalRouter() {
    return (
        <Router>

            <Switch>
                {/* <Route path="/wallet/:id">
                        <App />
                    </Route> */}
                {/* <Route path="/success">
                    <Success />
                </Route> */}

                {/* <Route path="/" render={(props) => <Fail {...props} />} />
                <Route path="/success" render={(props) => <Fail {...props} />} />
                <Route path="/wallet/:id" render={(props) => <App {...props} />} /> */}
                {/* <Route path="/" render={(props) => <App {...props} />} /> */}



                <Route path="/fail" render={(props) => <Fail {...props} />} />
                <Route path="/success" render={(props) => <Fail {...props} />} />
                <Route path="/wallet/:id" render={(props) => <App {...props} />} />
                <Route path="/" render={(props) => <App {...props} />} />
                <Route path="/*" render={() => <Fail /* possible prop injection */ />}/>



            </Switch>

        </Router>
    );
}
