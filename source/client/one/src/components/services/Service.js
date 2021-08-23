/*
encapsulate all ajax requests
*/

import axios from "axios";

class ServiceProvider {
    constructor(storage) {
        this.storage = storage;
    }

    createHeaders() {
        let headers = {};
        let token = this.storage.get("oneToken");

        if (token) {
            headers["Token"] = token;
        }

        return headers;
    }

    async sendData(method, url, payload) {
        let req = {
            method: method,
            url: url,
            headers: this.createHeaders(),
            responseType: "json",
        }
        // axios does not require converting payload to json object
        if (payload) {
            req.data = payload
        }

        const res = await axios(req);

        if (res.data) {
            console.log(res.data);
            return res.data;
        }
        else {
            throw new Error(res.message);
        }
    }

    async getData(url) {
        let req = {
            method: "get",
            url: url,
            headers: this.createHeaders(),
            responseType: "json",
        }
        console.log("getting data...");
        
        try {
            const res = await axios(req);
            if (res.data) {
                console.log(res.data);
                return res.data;
            } else {
                throw new Error(res.message);
            }
        } catch (err) {
            console.error(err);
        }

    }

    postData(url, payload) {
        return this.sendData("post", url, payload);
    }

    deleteData(url, payload) {
        return this.sendData("delete", url, payload);
    }
}

export default ServiceProvider;