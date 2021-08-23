import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardBody
} from "mdbreact";

import { useHistory } from "react-router-dom";


const checkEmpty = (nodeRef, setState) => {
    console.log("trigger check");
    if (nodeRef.current.value) {
        setState(true);
    } else {
        setState(false);
    }
};
const LoginForm = (props) => {
    let history = useHistory();

    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const [message, setMessage] = useState("");
    const [email, setEmail] = useState(true);
    const [password, setPassword] = useState(true);

    const login = async (e) => {
        e.preventDefault();

        props.storage.clear();

        if (email && password) {
            let payload = {
                Email: emailInput.current.value,
                Password: passwordInput.current.value,
            };

            try {
                let data = await props.auth.login(payload);
                console.log(JSON.stringify(data));
                if (data.Token) {
                    props.storage.set('oneToken', data.Token);
                    props.storage.set('UserGuid', data.User.Guid);
                    props.storage.set('Username', data.User.Username);
                    props.storage.set('Email', data.User.Email);

                    console.log("setAuth");
                    props.setAuth(true);

                    history.push("/");
                } else {
                    setMessage(data.Message);
                }
            } catch (err) {
                setMessage(err);
            }

        } else if (!email) {
            setMessage("Field Required");
        } else if (!password) {
            setMessage("Empty Message");
        }

    };

    useEffect(() => {

    }, [email, password]);

    return (
        <MDBContainer className="mb-5 flex-center">
            <MDBRow className="pt-4 mt-4" >
                <MDBCol md="12" className="flex-center border-0">
                    <MDBCard style={{ width: "30em" }}>
                        <MDBCardBody>
                            <form id="login-form" onSubmit={login}>
                                <p className="h4 text-center mb-4">Sign in</p>
                                <div className="text-danger">{message}</div>
                                <label htmlFor="email" className="grey-text">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    ref={emailInput}
                                    onBlur={(e) => checkEmpty(emailInput, setEmail)}
                                />
                                {
                                    email ? null : <p className="text-danger">Field Required</p>
                                }
                                <br />
                                <label htmlFor="password" className="grey-text">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    ref={passwordInput}
                                    onKeyPress={(e) => checkEmpty(passwordInput, setPassword)}
                                />
                                {
                                    password ? null : <p className="text-danger">Field Required</p>
                                }

                                <div className="text-center mt-4">
                                    <MDBBtn color="indigo" type="submit" rounded>
                                        Login
                                    </MDBBtn>
                                </div>
                                <div className="text-center mt-4"></div>
                            </form>
                        </MDBCardBody>
                        <div className="text-center">
                            <p className="font-small dark-grey-text justify-content-center mb-2">
                                <Link to="/forgot">Forgot Password?</Link>
                            </p>
                            <div className="mb-2 d-flex justify-content-center">
                                <p className="font-small grey-text">
                                    <span className="text">No an account yet?</span>
                                    <Link to="/register">Join Now</Link>
                                </p>
                            </div>
                        </div>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer >
    );
};

export default LoginForm;
