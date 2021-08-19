/*
encapsulate ajax requests of user authentication
*/

// TODO : forgotPwd, resetPwd, validateEmail, changePwd

class UAServiceProvider {
    constructor(service) {
        this.service = service;
        this.prefix = "/api/v1";
    }

    login(payload) {
        const api = this.prefix + "/login";
        return this.service.postData(api, payload);
    }

    logout() {
        const api = this.prefix + "/login/logout";
        const payload = {
            Action: "logout"
        }

        return this.service.postData(api, payload);
    }

    signup(payload) {
        const api = this.prefix + "/register";
        return this.service.postData(api, payload);
    }

    verify(payload) {
        const api = this.prefix + "/register/verify";
        return this.service.postData(api, payload);
    }
}

export default UAServiceProvider;