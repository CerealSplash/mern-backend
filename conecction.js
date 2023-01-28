import { mongoose } from "mongoose";
//Mglpaylh
import { URI } from "./config.js"

export const db = async () => {
  const ded = mongoose.connection;

  try {
    mongoose.set("strictQuery", true); //Ni idea pero se ocupa

    await mongoose.connect(URI);
   console.log("Connection succesfully")
  } catch (err) {
    console.log("Ha ocurrido un error al conectar a la DB", err);
  }
};
