import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import HtmlParser  from "react-html-parser";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBIcon,
    MDBBtn,
} from "mdbreact";

import CommentForm from './modals/comment';
import Moment from 'react-moment';

const Single = (props) => {
    const { articleGuid } = useParams();

    const [article, setArticle] = useState(null);
    const [message, setMessage] = useState("loading article");
    const [collected, setCollected] = useState(false);
    const [liked, setLiked] = useState(false);

    const like = async () => {
        if (props.isAuth) {
            if (liked) {
                let res = await props.content.dislike(articleGuid);
                setLiked(res.Success);
                // TODO prompt res.Message
            } else {
                let res = await props.content.like(articleGuid);
                setLiked(res.Success);
            }
        }
    }

    const collect = async () => {

        if (props.isAuth) {
            if (collected) {
                let res = await props.content.removeCollect(articleGuid);
                setCollected(res.Success);
            } else {
                let res = await props.content.collect(articleGuid);
                setCollected(res.Success);
            }
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
            console.log(articleGuid);
            let data = await props.content.single(articleGuid);

            if (data.Success) {
                setArticle(data.Article);
            } else {
                setMessage(data.Message);
            }

            await liked();
            await collected();
        }

        getSingle();
    }, []);

    return (
        <div className="d-flex justify-content-center mt-4">
            {
                article ? <MDBContainer>

                    <MDBRow>
                        <MDBCol md="12">
                        <h2>{article.Title}</h2>
                        </MDBCol>
                    </MDBRow>
                        <MDBRow>
                            <MDBCol md="8" className="d-flex">
                                <div className="mr-2"> Creation: <Moment date={new Date(article.CreatedAt)} fromNow /></div>
                                {
                                    article.LastModified? <div>Modification: <Moment date={ new Date(article.LastModified)} fromNow/></div>: null
                                }
                            </MDBCol>
                            <MDBCol md="2">
                                    <MDBIcon icon="eye">{article.ViewsCount}</MDBIcon>
                            </MDBCol>
                            <MDBCol md="2" className="d-flex">
                                {article.Author}
                            </MDBCol>

                        </MDBRow>
                        
                        <MDBRow>
                            <MDBCol md="12" className="d-flex justify-content-center p-2">
                                {HtmlParser(article.Content)}
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                        <MDBCol md="6" className="d-flex p-2">
                                <MDBBtn onClick={collect} disabled={collected}>
                                    <MDBIcon icon="star" className={ collected? "": "far"}/>
                                </MDBBtn>

                                <MDBBtn onClick={like} disabled={ liked}>
                                    <MDBIcon icon="thumbs-up" className={liked? "": "far" }/>{article.LikesCount? article.LikesCount: 0}
                                </MDBBtn>

                            <CommentForm commentsCount={article.CommentsCount} articleGuid={articleGuid} author={article.Author} content={props.content} isAuth={ props.isAuth}/>
                            </MDBCol>
                        </MDBRow>
                </MDBContainer> : <p>{message}</p>
            }
        </div>
    )
}

export default Single;