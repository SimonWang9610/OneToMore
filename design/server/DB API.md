
# Basic functions

## Query

- `dbQueryLogic(type: string, batch: boolean, ids: array)`
  - `type`: indicate which table the server should search, such as `"article`->`Table Article`, `"user"`->`Table User`
  - `batch`: indicates if executing batch query
  - `ids`: includes all unique database `uuid`s that the server should query. if `batch` is `false`, `uuid = ids[0]`. if `uuid = -1`, query the object with the latest modified data.
- `dbQueryLogicByCategory(type:string, item: string array, id: number)`
  - `type`: same as `dbQueryLogic()`
  - `item`: indicates which columns the server should return
  - `id`: `uuid` in database
## Update
- `dbUpdateLogic(type: string, params: json object, object: type Object)`
  - `type`: same as `dbQueryLogic()`
  - `params`: indicates which items should be updated. For example, the `params` for `"article"` should be like

        params = {
            title: boolean,
            abstract: boolean,
            content: boolean,
            lastModified: boolean
        }

  - `object`: the new values of `params` can be indexed in the typeObject`. `object` should be consistent with `type`

## DELETE
- `dbDeleteLogic(type: string, batch: boolean, ids: array)`
  - `type` same as `dbQueryLogic()`
  - `batch`: indicates if executing batch DELETE
  - `ids`: same as `dbQueryLogic()`

## Add
- `dbAddLogic(type: string, object: typeObject)`
  - `type` same as `dbQueryLogic()`
  - `object`: a new record of the specific table by `type`
