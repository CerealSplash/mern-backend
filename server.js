import app from "./app.js"
//En este import conectamos a la db
import { db } from "./conecction.js"

const port =  process.env.PORT || 3000

db()


app.listen(port)

console.log(`Server listening on port ${port}`)