import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    MDBCol,
    MDBRow,
    MDBContainer,
} from "mdbreact";


import ArticleCard from './article';


const MainPage = (props) => {
    let history = useHistory();

    const [articles, setArticles] = useState(null);
    const [message, setMessage] = useState("Loading Articles");

    useEffect(() => {
        async function getArticles() {

            let data = await props.content.all();

            if (data.Success) {
                setArticles(data.Articles);
            } else if (data.Message === "SessionExpired" || data.Message === "InvalidCredential") {
                history.push("/login");
            } else {
                console.log(data.Message);
            }
        }
        getArticles();
    }, []);

    return (
        <div>
            {
                articles ? <MDBContainer>
                    {articles.map(article => {
                        return (
                            <div className="d-flex justify-content-center m-4">
                                <ArticleCard article={article} content={props.content} />
                            </div>
                        )
                    })}
                </MDBContainer>: <p>{message}</p>
            }
        </div>
    )
}

export default MainPage;