import dotenv from 'dotenv'
dotenv.config();

import express from 'express'; 
import cors from "cors";
import { comida_ejemplos } from './data';
import comidaRouter from './routers/comida.router';
import { dbConnect } from './configs/database.config';

dbConnect();
//localhost:4200 front
//localhost:5000 back

const app = express();
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))


app.use("/api/comidas",comidaRouter)

const port = 5000;
app.listen(port, ()=>{
    console.log("Website served on http://localhost:" + port);
})