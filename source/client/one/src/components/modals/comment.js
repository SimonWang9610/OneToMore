import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    MDBContainer,
    MDBBtn,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBIcon,
    MDBModal,
    MDBInput
} from "mdbreact";

const CommentForm = (props) => {
    let history = useHistory();
    const [modal, setModal] = useState(false);
    const [comment, setComment] = useState("");
    const [count, setCount] = useState(props.commentsCount);

    const toggle = () => {
        setModal(!modal);
    }

    const submit = async () => {
        if (comment) {
            let payload = {
                Content: comment,
                Author: props.author,
                ArticleGuid: props.articleGuid,
            }

            if (props.isAuth) {
                let res = await props.content.comment(payload);

                if (res.Success) {
                    let query = await props.content.countComments(props.articleGuid);
    
                    if (query.Success) {
                        setCount(query.Count);
                    } else {
                        //TODO prompt res Message
                    }

                    setModal(!modal);
                } else {
                    //TODO prompt res Message
                }
            } else {
                alert("Pleaser login first!");
                history.push("/login");
            }
        }
    }

    useEffect(() => { }, [props.isAuth]);

    return (
        <MDBContainer>
            <MDBBtn onClick={toggle}>
                <MDBIcon icon="comment-dots"/>{count? count: 0}
            </MDBBtn>
            <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalBody>
                    <MDBInput type="textarea" label="Icon Prefix" rows="2" icon="pencil-alt" onChange={e => setComment(e.target.value)}/>
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={submit}>Submit</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    )

}

export default CommentForm;