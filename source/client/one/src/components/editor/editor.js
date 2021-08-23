import ReactQuill, {Quill} from "react-quill";
import { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBBtn,
} from "mdbreact";

import QuillToolbar, { formats, modules } from './editor-toolbar';
import "react-quill/dist/quill.snow.css";
import "../../styles/editor.css";
const Editor = (props) => {
    let history = useHistory();

    const [content, setContent] = useState({ value: null });
    const [title, setTitle] = useState(null);

    const handleChange = (value) => {
        setContent({value});
    }

    const create = async () => {

        console.log("quill editor content: " + JSON.stringify(content.value));
        let payload = {
            Title: title,
            Content: content.value,
            Category: null,
        }

        console.log("article: " + JSON.stringify(payload));
        
        try {
            let res = await props.content.create(payload);
            if (res.Success) {
                // TODO should redirect to this published article
                history.push("/")
            } else {
                // TODO prompt Message
            }
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <MDBContainer>
            <MDBRow className="d-flex justify-content-center">
                <MDBInput type="text" hint="Your Title" onChange={e => setTitle(e.target.value) } required></MDBInput>
            </MDBRow>
            <div className="text-editor">
                <QuillToolbar />
                <ReactQuill theme="snow" value={content.value} onChange={handleChange} modules={modules} formats={formats}/>
            </div>

            <MDBRow m="4">
                <MDBCol md="4" className="d-flex">
                    <select className="browser-default custom-select">
                        <option>Category</option>
                        <option value="1">Life</option>
                        <option value="2">Work</option>
                    </select>
                </MDBCol>
                <MDBCol md="4"></MDBCol>
                <MDBCol md="4">
                <Link to="/">
                    <MDBBtn color="danger">Cancel</MDBBtn>
                </Link>
                <MDBBtn color="primary" type="submit" onClick={create } icon="save">Create</MDBBtn>
                </MDBCol>

            </MDBRow>
        </MDBContainer>
    )
}

export default Editor;