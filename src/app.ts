import express from "express";
import morgan from "morgan";
import {config} from "dotenv";
import urlRoutes from './Routes/UrlRoutes'

config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("tiny"))

app.use('/api/url', urlRoutes)

export default app;