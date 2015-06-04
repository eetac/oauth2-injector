module.exports = {
    "id": "_id",
    "displayField": "name",
    "enableRefs": true,
    "section":"Authentication",
    "path": "app",
    "plural": "apps",
    "get": {},
    "post": {},
    "put": {},
    "delete": {},
    export:{},
    "search": {},
    "form": {
        "tabs": [
            {
                "title": "Application information",
                "items": ["name"]
            },
            {
                "title": "Details",
                "items": ["details"]
            },
            {
                "title": "Tokens",
                "items": ["tokens"]
            }
        ]
    }
}