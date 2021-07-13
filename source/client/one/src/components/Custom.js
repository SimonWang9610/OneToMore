import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const Client = () => {
    const { path, url } = useRouteMatch();

    return (
        <div>
            <ul>
                <li>{path}</li>
                <li>{url}</li>
            </ul>
        </div>
    );
};

const Custom = () => {
    const [message, setMessage] = useState("message from custom");

    return (
        <Router>
            <div>
                <Link to='/client'>{message}</Link>
                <Switch>
                    <Route exact path="/client">
                        <Client />
                    </Route>
                </Switch>
            </div>
        </Router>
    )

};



export default Custom;