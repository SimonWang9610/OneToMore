import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,
    MDBBtn,
} from "mdbreact";

const NavbarPage = (props) => {
    let history = useHistory();

    const [isOpen, setOpen] = useState(false);
    const toggleCollapse = () => {
        setOpen(!isOpen);
    }

    const logout = async () => {
        props.setAuth(false);

        try {
            let data = await props.auth.logout();

            if (data.Success) {
                props.storage.clear();
                history.push("/");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <MDBNavbar color="white" dark expand="md" >
            <MDBNavbarBrand>
                <MDBNavLink to="/">
                    <MDBIcon icon="dove" className="green-text" />
                    OneToMore
                </MDBNavLink>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleCollapse} />

            <MDBCollapse className="border-0" isOpen={isOpen} navbar>
                {
                    !props.isAuth ? (
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink to="/login" className="text-dark">Login</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/register" className="text-dark">Sign Up</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="/trend" className="text-dark">Trend<MDBIcon fab icon="gripfire" /></MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    ) : (
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBNavLink to="/logout" className="text-dark">
                                        <span onClick={logout}>Logout</span>
                                    </MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/" className="text-dark">Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/trend" className="text-dark">Trend<MDBIcon fab icon="gripfire" /></MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        )
                }
            </MDBCollapse>
        </MDBNavbar>
    )
}

export default NavbarPage;