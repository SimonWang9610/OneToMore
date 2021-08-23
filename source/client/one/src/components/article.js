import { useState } from "react";
import { Link } from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBCardTitle,
    MDBCol,
    MDBIcon,
    MDBCardFooter,
    MDBRow,
} from "mdbreact";
import Moment from "react-moment";

const ArticleCard = (props) => {

    const creation = new Date(props.article.CreatedAt);
    const modification = props.article.LastModified ? new Date(props.article.LastModified) : null;

    return (
        <MDBCard style={{ width: "20em" }} className="d-flex justify-content-center">
            <MDBCardBody>
                <MDBCardTitle className="card-title">
                    <Link to={`/article/${props.article.Guid}`} onClick={() => props.content.view(props.article.Guid) }>
                        { props.article.Title}
                    </Link>
                </MDBCardTitle>
                <MDBRow>
                    <MDBCol md="4" className="d-flex justify-content-center">
                        <MDBIcon icon="thumbs-up" className="ml-2" far>{props.article.LikesCount? props.article.LikesCount: 0}</MDBIcon>
                        <MDBIcon icon="comment-dots" className="ml-2">{props.article.CommentsCount? props.article.CommentsCount: 0}</MDBIcon>
                        <MDBIcon icon="eye" className="ml-2">{props.article.ViewsCount ? props.article.ViewsCount : 0}</MDBIcon>

                    </MDBCol>
                    <MDBCol md="8" className="d-flex justify-content-end">
                        {props.article.Author}
                    </MDBCol>
                </MDBRow>


                <MDBRow>
                    <div className="mr-4">
                        Creation:
                    <Moment date={ creation} fromNow />
                    </div>
                    {
                        modification ? <div className="mr-4">Modification: <Moment date={modification} fromNow /></div>: null
                    }
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    )
}

export default ArticleCard;