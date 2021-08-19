import {
    MDBView,
    MDBMask,
    MDBBtn,
} from "mdbreact";

import { Route, Link, Switch, useHistory, useParams } from "react-router-dom";

import LoginForm from "./forms/login";
import RegisterForm from "./forms/register";
import MainPage from './main-page';
import Single from './single';
const HomeView = (props) => {

    let history = useHistory();

    return (
        <MDBView >
            <Switch>
                <Route path="/" exact>
                    <MainPage isAuth={props.isAuth} content={props.content}/>
                </Route>
                <Route path="/login" exact>
                    <LoginForm storage={props.storage} auth={props.auth} setAuth={props.setAuth} />
                </Route>
                <Route path="/register" exact>
                    <RegisterForm storage={props.storage} auth={props.auth} />
                </Route>
                <Route path="/article/:articleGuid">
                    <Single isAuth={props.isAuth} content={props.content} />
                </Route>
            </Switch>
        </MDBView>
    )
}

export default HomeView;