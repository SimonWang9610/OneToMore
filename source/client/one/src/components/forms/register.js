import { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInputGroup,
    MDBCard,
    MDBCardBody
} from "mdbreact";


const RegisterForm = (props) => {

    let history = useHistory();

    const [message, setMessage] = useState("");
    // check if the input fileds are empty: [true, false]

    const [validation, setValidation] = useState({
        email: true,
        name: true,
        password: true,
        confirmed: true,
        equal: true,
        emailExist: false,
        nameExist: false,
    });

    // dom nodes reference
    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmRef = useRef(null);

    const checkExist = async (nodeRef, type) => {
        let payload = {
            Email: null,
            Username: null,
        }

        if (type === "email" && validation.email) {
            payload.Email = nodeRef.current.value;

        } else if (type === "name" && validation.name) {
            payload.Username = nodeRef.current.value;
        }

        try {
            let data = await props.auth.verify(payload);

            if (data.Success) {
                if (type === "email") {
                    setValidation({ ...validation, emailExist: data.Message });
                } else {
                setValidation({ ...validation, nameExist: data.Message });
                }
            }
        } catch (err) {
            setMessage(err);
        }
    }

    const checkEmpty = (type, nodeRef) => {
        let filled = false;

        if (nodeRef.current.value) {
            filled = true;
        }

        if (type === "email") {
            setValidation({ ...validation, email: filled })
        } else if (type === "name") {
            setValidation({ ...validation, name: filled });
        } else if (type === "password") {
            setValidation({ ...validation, password: filled });
        } else if (type === "confirmed") {
            setValidation({ ...validation, confirmed: filled });
        } else if (type === "equal") {
            filled = validation.password && validation.confirmed && confirmRef.current.value === passwordRef.current.value;
            setValidation({ ...validation, equal: filled });
        }
    }

    const register = async (e) => {
        e.preventDefault();

        if (validation.email && validation.name && validation.password && validation.confirmed && !validation.emailExist && !validation.nameExist) {

            if (
                validation.equal
            ) {
                let payload = {
                    Email: emailRef.current.value,
                    Username: nameRef.current.value,
                    Password: passwordRef.current.value,
                };

                try {
                    let data = await props.auth.signup(payload);
                    if (data.Success) {
                        history.push("/login");
                    } else {
                        setMessage(data.Message);
                    }
                } catch (err) {
                    setMessage(err);
                }

            } else {
                setMessage("Unmatched Password");
            }
        } else {
            setMessage("Field Required");
        }
    };

    useEffect(() => {

        if (validation.emailExist) {
            setMessage("Email has been taken!");
        } else if (validation.nameExist) {
            setMessage("Username has been taken!");
        } else {
            setMessage("");
        }

    }, [validation]);

    return (
        <MDBContainer className="mt-5 flex-center ">
            <MDBRow className="pt-4 mt-4">
                <MDBCol md="12" className="border-0">
                    <MDBCard style={{ width: "45em" }}>
                        <MDBCardBody>
                            <form id="register-form" onSubmit={register}>
                                <p className="h4 text-center mb-4">Signup</p>

                                <div className="text-danger">{message}</div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="grey-text ">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        ref={emailRef}
                                        onBlur={(e) => {
                                            checkEmpty("email", emailRef);
                                        }}
                                    />
                                    {
                                        validation.email ? null : <p className="text-danger">Field Required</p>
                                    }
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="username" className="grey-text">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        ref={nameRef}
                                        onBlur={(e) => {
                                            checkEmpty("name", nameRef);
                                        }}
                                    />
                                    {
                                        validation.name ? null : <p className="text-danger">Field Required</p>
                                    }
                                </div>
                                <MDBRow>
                                    <MDBCol md="6" className="mb-4 border-0">
                                        <label htmlFor="password" className="grey-text">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            ref={passwordRef}
                                            onBlur={(e) => checkEmpty("password", passwordRef)}
                                        />
                                        {
                                            validation.password ? null : <p className="text-danger">Field Required</p>
                                        }
                                    </MDBCol>
                                    <MDBCol md="6" className="mb-4 border-0">
                                        <label htmlFor="confirmation" className="grey-text">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmation"
                                            className="form-control"
                                            ref={confirmRef}
                                            onBlur={(e) => checkEmpty("equal", confirmRef)}
                                        />
                                        {
                                            validation.confirmed ? null : <p className="text-danger">Field Required</p>
                                        }
                                    </MDBCol>
                                </MDBRow>

                                <div className="text-center mt-4">
                                    <MDBBtn rounded color="unique" type="submit">
                                        Register
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                        <div className="text-center">
                            <div className="mb-2 d-flex justify-content-center">
                                <p className="font-small grey-text">
                                    Has an account yet?<Link to="/login">Login Now</Link>
                                </p>
                            </div>
                        </div>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default RegisterForm;
