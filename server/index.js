import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Postroutes from './routes/posts.js'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT
const CONNECTION_URL = process.env.CONNECTION_URL

app.use(express.json({limit: '30mb'}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use('/posts', Postroutes)

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server is running a post ${PORT}`)))
    .catch((error) => console.log(`${error} not connected`))

