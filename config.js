import dotenv from "dotenv"

//Aquí se importan todos los datos del .env
dotenv.config()

export const URI = process.env.ATLAS_URI