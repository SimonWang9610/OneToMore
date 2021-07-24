import React from 'react';
import { useQuery } from "@apollo/client";
import { Query} from '../../interfaces/article';

interface Props {
    id: string,
}

const DisplaySingle: React.FC<Props> = ({id }: Props) => {
    
    const { loading, error, data } = useQuery(Query.GET_SINGLE, { variables: { id } });

    if (loading) {
        return <p>Loading</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return (
        <div className="article">
            <div className="article-title">{data.Single.title}</div>
            <div className="article-abstract">{data.Single.abstract}</div>
            <div className="article-content">{data.Single.content}</div>
            <div className="article-author">{data.Single.author}</div>
            <div className="article-info">{data.Single.createdAt} | {data.Single.modifiedAt}</div>
            <div className="article-interactions">
                <button>{data.Single.likeCount}</button>
                <button>{data.Single.collected}</button>
                <button>{data.Single.commentCount}</button>
            </div>
            
        </div>
    )
}