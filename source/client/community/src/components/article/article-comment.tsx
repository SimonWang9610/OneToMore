import React from 'react';
import { useQuery } from "@apollo/client";
import { Query, Comment } from '../../interfaces/article';

interface Props {
    key: number,
    comment: Comment,
}

const Display: React.FC<Props> = ({ key, comment }: Props) => {
    return (
        <div className="comment-entry">
            <p> {comment.author}</p>
            <p>{comment.createdAt}</p>
            <p>{comment.content}</p>
        </div>
    )
}

const CommentList: React.FC<{ id: string }> = ({ id }) => {
    
    const {loading, error, data} = useQuery(Query.GET_COMMENTS, { variables: { id } });

    if (loading) {
        return <p>Loading</p>
    }

    if (error) {
        return <p>{error.message}</p>
    }

    return (
        <div className="comments">
            {
                data.Comment.map((comment: Comment, key: number) => {
                   return <Display key={key} comment={comment}/>
                })
            }
        </div>
    )

}