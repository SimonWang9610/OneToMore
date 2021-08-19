import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBIcon,
    MDBBtn,
} from "mdbreact";

import CommentForm from './modals/comment';

const Single = (props) => {
    const { articleGuid } = useParams();

    const [article, setArticle] = useState(null);
    const [message, setMessage] = useState("");
    const [collected, setCollected] = useState(false);
    const [liked, setLiked] = useState(false);

    const like = async () => {
        if (liked) {
            let res = await props.content.dislike(articleGuid);
            setLiked(res.Success);
            // TODO prompt res.Message
        } else {
            let res = await props.content.like(articleGuid);
            setLiked(res.Success);
        }
    }

    const collect = async () => {
        if (collected) {
            let res = await props.content.removeCollect(articleGuid);
            setCollected(res.Success);
        } else {
            let res = await props.content.collect(articleGuid);
            setCollected(res.Success);
        }
     }
    const comment = () => { }

    useEffect(() => {
        
        async function liked() {
            let res = await props.content.getLikes(articleGuid);
            setLiked(res.Success);
        }

        async function collected() {
            let res = await props.content.getCollections(articleGuid);
            setCollected(res.Success);
        }
        async function getSingle() {

            let res = await props.content.single(articleGuid);

            if (res.Success) {
                setArticle(res.Article);
            } else {
                setMessage(res.Message);
            }

            await liked();
            await collected();

            if (props.isAuth) {
                props.content.view(articleGuid);
            }
        }

        getSingle();
    });

    return (
        <MDBContainer>
            {
                message ?
                    <p>{message}</p> :
                    <MDBRow>
                        <h2>{article.Title}</h2>
                        <div id="article-info">
                            <div>{article.Author}</div>
                            <div>{article.CreatedAt}</div>
                            <div>{article.LastModified}</div>
                            <div>
                            <MDBIcon icon="view">{props.article.ViewsCount}</MDBIcon>
                            </div>
                        </div>
                        <MDBRow>
                            <div>{article.Content}</div>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBBtn onClick={like} disabled={ liked}>
                                    <MDBIcon icon={liked? "liked": "like"}>{props.article.LikesCount}</MDBIcon>
                                </MDBBtn>

                                <MDBBtn onClick={collect} disabled={collected}>
                                    <MDBIcon icon={ collected? "collect": "collected"}></MDBIcon>
                                </MDBBtn>

                                <CommentForm commentsCount={article.CommentsCount} articleGuid={articleGuid} author={article.Author} content={ props.content}/>
                            </MDBCol>
                        </MDBRow>
                    </MDBRow>
            }
        </MDBContainer>
    )
}

export default Single;