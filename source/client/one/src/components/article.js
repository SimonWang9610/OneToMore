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
} from "mdbreact";


const ArticleCard = (props) => {
    return (
        <MDBCard style={{ width: "20em" }}>
            <MDBCardBody>
                <MDBCardTitle className="card-title">
                    <Link to={`/article/${props.articleGuid}`}>
                        { props.article.Title}
                    </Link>
                </MDBCardTitle>
                <MDBCol md="4" className="d-flex justify-content-center">
                    <MDBIcon icon="like">{props.article.LikesCount}</MDBIcon>
                    <MDBIcon icon="comment">{props.article.CommentsCount}</MDBIcon>
                    <MDBIcon icon="view">{props.article.ViewsCount}</MDBIcon>
                </MDBCol>
            </MDBCardBody>
            <MDBCardFooter>
                <p> Creation: {props.article.CreatedAt}</p>
                <p> Last Modified: {props.article.LastModified}</p>
                <p> Author: {props.article.Author}</p>
            </MDBCardFooter>
        </MDBCard>
    )
}

export default ArticleCard;