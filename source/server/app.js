const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dot = require('dot');
const cors = require('cors');
const path = require('path');
const config = require('config');
const Files = require("./utils/Files");

// authentication
const auth = require("./middleware/authenticate");

const loginRouter = require("./router/user/login");
const registerRouter = require("./router/user/register");
// routers related to article
const articleRouter = require('./router/article/article');
const commentRouter = require("./router/article/comment");
const likeRouter = require("./router/article/like");
const collectRouter = require("./router/article/collect");

const { urlencoded } = require('body-parser');

// initialize App
const app = express();

app.use(cors({ allowedHeaders: [ 'Token' ] }));
app.use(methodOverride());

// parse API requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

// path to static files
const dist = path.resolve(__dirname, 'public');
const reactPath = path.join(__dirname, "../client/one/build");

app.use(express.static(dist));
app.use(express.static(reactPath));

app.use(auth);
// handle requests of user services
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/register", registerRouter);
// handle requests of article services
app.use('/api/v1/article', articleRouter);
app.use("/api/v1/article/comment", commentRouter);
app.use("/api/v1/article/like", likeRouter);
app.use("/api/v1/article/collect", collectRouter);



app.get("/", async (req, res, next) => {

    try {
        let indexPath = "../client/one/build/index.html";

        let data = await Files.readFile(indexPath);
        let html = data.toString();
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    } catch (err) {
        console.error(err);
    }
});

const PORT = config.http.port;
const httpServer = http.createServer(app);

httpServer.listen(PORT, (err) => {
    console.log(`API Gateway is listening on port ${httpServer.address().port}`);
});