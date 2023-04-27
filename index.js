import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

import fileUpload from "express-fileupload";
const app = express();
dotenv.config()

//CONST
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//дополняем  базовые настройки
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))


//Routes

app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.use('/api/comments', commentRoute)

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@blog.9uyh7la.mongodb.net/${DB_NAME}`
    );
    app.listen(PORT, () => console.log('server start'))
  } catch (error) {
    console.log(error);
  }
}
start();
