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
* #### using --env-file=.env instead of dotenv, in package.json
```
 "dev": "npx nodemon --env-file=.env server.js",
```

### Database configuration
* ### In dbConfig.js
```
export const dbConnection = ()=>{
    return mongoose.connect(process.env.MONGO_URI)
}
```
* ### In server.js
```
import { dbConnection } from './config/dbConfig.js'
dbConnection()
      .then(() => {
        console.log('DB Connected')
        app.listen(PORT, (error) => {
            error
              ? console.log('Unable to connect DB')
              : console.log(`app is listening on ${PORT} `)
        })
      })
      .catch((error) => {
        console.log('Error occurred', error)
      })

```
### Middleware 
```
import cors from 'cors'
import morgan from 'morgan'
app.use(cors());
app.use(morgan("dev"))
app.use(express.json())
```


