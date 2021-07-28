const router = require("express").Router();
const Utils = require("../../utils/Utils");
const fs = require("fs-extra");
const MimeType = require("../../utils/MimeType");
const path = require("path");
const Response = require("../../utils/response");

router.get("/tmp/:filename", async (req, res, next) => {
    let filePath = path.join(__dirname, "../../vault/tmp", req.params.filename);
    streamFile(res, filePath);
});

router.get("/image/:folder/:filename", async (req, res, next) => {
    let folder = req.params.folder;
    let filename = req.params.filename;
    let filePath = path.join(__dirname, "../../vault/images", folder, filename);

    fs.pathExists(filePath).then(exist => {
        if (exist) {
            streamFile(res, filePath);
        } else {
            let url = "/api/v1/vault/tmp" + filename;
            res.redirect(url);
        }
    });
});

router.delete("/images/:folder/:filename", async (req, res, next) => {
    let folder = req.params.folder;
    let filename = req.params.filename;

    let filePath = path.join(__dirname, '../../vault/images', folder, filename);
    let tmpPath = path.join(__dirname, '../../vault/tmp', filename);
    
    return fs.remove(filePath).then(() => {
        return fs.remove(tmpPath).then(() => {
            return Response(res, true, "FileRemoved");
        });
    }).catch(err => {
        console.error(err);
        return Response(res, false, "RemoveFileFailure");
    })
});


function streamFile(res, filePath) {
    fs.pathExists(filePath).then(exist => {
        if (exist) {
            let contentType = MimeType.getContentType(filePath);
            res.writeHead(200, { "Content-Type": contentType });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
        }
    }).catch(err => {
        res.end(err);
    })
}