### Create node server
`
npm init --y
`

### Install all dependencies
`
yarn add express mongoose jsonwebtoken bcryptjs cors morgan joi nodemailer 
`
### To read env variables

```
yarn add dotenv
```
* #### In server.js

`
const dotenv = require('dotenv')
`

`
dotenv.config();
`
* ### using --env-file=.env instead of dotenv, in package.json
```
 "dev": "npx nodemon --env-file=.env server.js",
```





