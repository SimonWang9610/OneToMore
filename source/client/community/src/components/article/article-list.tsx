import React, {useState, useEffect} from 'react';
import { Query, Article,  Response} from "../../interfaces/article";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { articleCreators, ArticleState } from "../../store/article";
import { ArticleQuery, ArticleMutation } from "../../logics/article";

interface Props {
    key: number,
    article: Article,
}

const LikeStyle = (color: string) => {
    return { color: color };
}

const CollectStyle = (color: string) => {
    return { color: color };
}


const Display: React.FC<Props> = ({ key, article}: Props) => {
    
    const [state, setState] = useState(article);

    const [likeStyle, setLikeStyle] = useState(state.liked? LikeStyle("red"): LikeStyle("white"));

    const [collectStyle, setCollectStyle] = useState(state.collected? CollectStyle("red"): CollectStyle("white"));

    const like = () => {
        ArticleMutation.likeArticle(state.Guid, null).then(res => {
            if (res.success) {
                const newState = { ...state, likeCount: state.likeCount + 1, liked: !state.liked };
                setState(newState);
            }
        });
    }

    const collect = () => {
        ArticleMutation.collectArticle(state.Guid, null).then(res => {
            if (res.success) {
                const newState = { ...state, collected: !state.collected };
                setState(newState);
            }
        })
    }

    useEffect(() => {
        if (state.liked) setLikeStyle({color: "red"});
        if (state.collected) setCollectStyle({color: "red"});

    }, [state.liked, state.collected])

    return (
        <div className="article-entry">
            <div>{state.title}</div>
            <div>{state.author}</div>
            <div>{state.lastModified}</div>
            <button>{state.commentCount}</button>

            <button style={ likeStyle} onClick={() => like()}>{state.likeCount}</button>
            <button style={collectStyle} onClick={() => collect()}></button>
        </div>
    )
}   

interface Data {
    articles: [Article]
}
const ArticleList: React.FC<Data> = ({ articles }: Data) => {

    const [state, setState] = useState(articles);

    return (
        <div className="article-list">
            {
                state.map((article, key) => {
                    return <Display key={key} article={article} />
                })
            }
        </div>
    )
}

export const List = ArticleList;