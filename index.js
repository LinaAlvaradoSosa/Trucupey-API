import express from "express";
import { conectDB } from "./config/db.js";
import routerProducts from "./routes/products.routes.js";
import routerUser from "./routes/user.routes.js";
import cors from 'cors';




const app = express()
app.use(cors())
conectDB();

app.use(express.json());
app.use ('/api', routerProducts)
app.use('/api', routerUser)



app.listen(3000,()=>{
console.log('server running port 3000');
})