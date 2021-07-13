import React, { useState, useEffect } from 'react'

const Button = () => {
    const [message, setMessage] = useState("no message");
    const [status, setStatus] = useState("no fetched");
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (!clicked) return;

        const fetchData = async () => {
            const res = await fetch("/api/v1");
            const data = await res.json();
            setMessage(data.message);
            setStatus("fetched");
        };

        fetchData();
    }, [clicked]);

    return (
        <div>
            <button onClick = {() => {setClicked(true)}}>fetch from server</button>
            <div>{status}</div>
            <div>{message}</div>
        </div>
    )
}

export default Button;