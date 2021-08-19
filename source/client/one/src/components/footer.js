import { Link } from "react-router-dom";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBFooter,
    MDBNavLink
} from "mdbreact";

const FootPage = () => {
    return (
        <MDBFooter color="blue" className="mt-4 stylish-color-dark fixed-bottom" >
            <MDBContainer fluid className="text-center text-md-left ">
                <MDBRow>
                    <MDBCol md="4" >
                        <div className="text-center py-3">
                            <Link to="/cc/privacy">Privacy</Link>
                        </div>
                    </MDBCol>
                    <MDBCol md="4">
                        <div className="footer-copyright text-center py-3">AjaxWeaver &copy; 2021</div>
                    </MDBCol>
                    <MDBCol md="4" >
                        <div className="text-center py-3">
                            <Link to="/cc/terms">Terms</Link>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </MDBFooter>
    )
}

export default FootPage;