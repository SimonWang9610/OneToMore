- MongoDB generates `ObjectID` automatically that can be indexed
- each `object` in a collection or a document will have a `ObjectId` automatically, so there is no need to add `id` filed in `Schema` and `typeDefs`
- the fields of `Schema` must be consistent with the name of `typeDefs`


- `update` the element of the array in a document

        document {
            _id,
            keys: [
                {
                    first,
                    second,
                }
            ]
        }

        const query = {_id: id, "keys.first": <condition>}
        const updateInfo = {
            $set: {
                "keys.$second":< new value>
            }
        }