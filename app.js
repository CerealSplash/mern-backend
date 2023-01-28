//Se ha instalado cors, morgan, http-errors, fs-extra, mongoose, express, express-fileuploader, cloudinary, nodemon, dotenv
//Cloudinary es un servicio de almacenamiento de imagenes para que sea más fácil la manipulación de estas
//PAra poder usar el import y export como en react tenemos que añadir el type module en el package

import express from "express"
//A diferencia de react aquí nosotros nombramos después del import siempre y cuando sea export default
import PostRoutes from "./routes/post.routes.js"
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'
import cors from 'cors'
import {dirname, join} from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(express.json())
app.use(cors())

//La siguiente línea fue provisional para mantenerlos en memoría para luego subirlos a cloudinary 
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./upload"}))

app.use("/", PostRoutes) //Mediante esta línea indicamos que todas las rutas indicadas en PostRoutes son las que serán usadas por el propio express

//Con el sig. método le decimos al backend que use como use como estatico a la carpeta estatica creada en el client
app.use(express.static(join(__dirname, "../client/dist")))


//useTempFiles lo que hace es mandarlo directamente a una carpeta en vez de mantenerlo en memoria y el segundo parametro hace referencia a en dónde se van a guardar los archivos
export default app