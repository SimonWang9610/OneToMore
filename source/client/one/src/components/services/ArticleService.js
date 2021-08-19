/*
ajax requests of articles
*/

class ArticleServiceProvider {
    constructor(service) {
        this.service = service;
        this.prefix = "/api/v1/article";
    }

    create(payload) {
        const api = this.prefix + "/create";
        return this.service.postData(api, payload);
    }

    edit(id, payload) {
        const api = this.prefix + "/edit/" + id;
        return this.service.postData(api, payload);
    }

    view(id) {
        const api = this.prefix + "/view/" + id;
        return this.service.postData(api);
    }

    delete(id) {
        const api = this.prefix + "/" + id;
        return this.service.deleteData(api);
    }

    single(id) {
        const api = this.prefix + "/" + id;
        return this.service.getData(api);
    }

    all(skip, limit) {
        let api = this.prefix + "/";

        if (skip && limit) {
            let condition = `?skip=${skip}&limit=${limit}`;
            api.concat(condition);
        }
        return this.service.getData(api);
    }

    getComments(articleGuid, commentGuid) {
        let api = this.prefix + "/commet/" + articleGuid;

        if (commentGuid) {
            api.concat("/" + commentGuid);
        }

        return this.service.getData(api);
    }

    comment(payload) {
        const api = this.prefix + "/comment/create";
        return this.service.postData(api, payload);
    }

    countComments(articleGuid) {
        const api = this.prefix + "/comment/count/" + articleGuid;
        return this.service.getData(api);
    }

    deleteComment(commentGuid) {
        const api = this.prefix + "/" + commentGuid;
        return this.service.deleteData(api);
    }

    getLikes(articleGuid) {
        const api = this.prefix + "/like/" + articleGuid;
        return this.service.getData(api);
    }

    like(articleGuid) {
        const api = this.prefix + "/like/" + articleGuid;
        return this.service.postData(api);
    }

    dislike(articleGuid) {
        const api = this.prefix + "/like/" + articleGuid;
        return this.service.service.deleteData(api);
    }

    getCollections(articleGuid) {
        let api = this.prefix + "/collect";

        if (articleGuid) {
            api.concat("/" + articleGuid);
        }

        return this.service.getData(api);
    }

    collect(articleGuid) {
        const api = this.prefix + "/collect/" + articleGuid;
        return this.service.postData(api);
    }

    removeCollect(articleGuid) {
        const api = this.prefix + "/collect/" + articleGuid;
        return this.service.deleteData(api);
    }

}