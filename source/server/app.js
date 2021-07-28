const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dot = require('dot');
const cors = require('cors');
const path = require('path');
const config = require('config');

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
app.use(express.static(dist));

app.use(auth);
// handle requests of user services
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/register", registerRouter);
// handle requests of article services
app.use('/api/v1/article', articleRouter);
app.use("/api/v1/article/comment", commentRouter);
app.use("/api/v1/article/like", likeRouter);
app.use("/api/v1/article/collect", collectRouter);



app.get('/api/v1', (req, res, next) => {
    return res.status(200).json({
        message: "response from the server"
    });
});

const PORT = config.http.port;
const httpServer = http.createServer(app);

httpServer.listen(PORT, (err) => {
    console.log(`API Gateway is listening on port ${httpServer.address().port}`);
});