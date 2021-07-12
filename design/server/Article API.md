
## `Article` router

- `Article` in database
  - `uuid`: `NOT NULL`
  - `title`: `NOT NULL`
  - `abstract`
  - `content`: `NOT NULL`
  - `lastModified`: `NOT NULL`

### `GET` from the server database
- `GET /api/v1/article/latest`: get the latest modified article by default
  - `dbQueryLogic("article", false, [-1])`
  - return `articleObject`
- `GET /api/v1/article/:page`: get the `page`-th articles from the database
- `GET /api/v1/article/:uuid`: get one article by `uuid`

### `DELETE` from the server database
- `DELETE /api/v1/article/:uuid`
  - `dbDeleteLogic("article", false, [uuid])`
  - redirect to `GET /api/v1/article/1`
- `DELETE /api/v1/article/batch`: delete a batch of articles, the `uuid` of targeted articles is wrapped in `payload`.
  - `dbDeleteLogic("article", true, ids)`
  - redirect to `GET /api/v1/article/1`

### `POST` to the server database
- `POST /api/v1/article/new`: create a new article
  - `generateUuid()`
  - `dbAddLogic("article", articleObject)`
  - redirect to `GET /api/v1/article/1`
- `POST /api/v1/article/edit/:uuid`: edit an existing article
  - `dbQueryLogic("article", false, [uuid])`
  - `dbUpdateLogic("article", params, newArticleObject)`
  - return `newArticleObject`