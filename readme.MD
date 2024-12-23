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

