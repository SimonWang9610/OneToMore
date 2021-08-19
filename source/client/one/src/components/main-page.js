import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    MDBCol,
    MDBRow,
    MDBContainer,
} from "mdbreact";


import ArticleCard from './article';


const MainPage = (props) => {

    const [articles, setArticles] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function getArticles() {
            let res = await props.content.all();

            if (res.Success) {
                setArticles(res.Articles);
            } else {
                setMessage(res.Message);
            }
        }
        getArticles();
    });

    return (
        <MDBContainer>
            {
                message ?
                    <p>{message}</p> :
                    articles.map(article => {
                    return (
                        <MDBRow>
                            <ArticleCard article={article} />
                        </MDBRow>
                    )
                })
            }
        </MDBContainer>
    )
}

export default MainPage;