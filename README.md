JOIN-CONFIG
--------------------------------------------------------------

Usually we have config.js file like this:
```
module.exports = {
    port: 3000,
    mongo: 'mongodb://localhost:27017/db'
};
```

This module extends config module with Environment Variables 
and Application Variables. Application Variables should have format 
`property=value`, for Environment Variables only properties used
in initial config.js will be used because otherwise config
will be clogged with useless variables from environment. If 
you use objects in Applications Variables they should be
valid JSON. And do not forget to escape double quotes with backslash
if you specify them in IDEs like WebStorm.

Examples:

```
node app.js mongo=mongodb://<host>/<db> watch=true interval=3
```
```
PORT=4000 USE_MONGO=true node app.js server='{"host":<host>,"port":1234}'
```