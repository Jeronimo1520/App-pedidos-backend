import dotenv from 'dotenv'
import express from 'express'; 
import cors from "cors";
import comidaRouter from './routers/comida.router';
import { dbConnect } from './configs/database.config';
import usuarioRouter from './routers/usuario.router';


dbConnect();
dotenv.config();
//localhost:4200 front
//localhost:5000 back

const app = express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))


app.use("/api/comidas",comidaRouter)
app.use("/api/usuarios", usuarioRouter)


const port = 5000;

app.listen(port, ()=>{
    console.log("Website served on http://localhost:" + port);
})

function asyncHandler(arg0: (req: any, res: any) => Promise<void>): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Function not implemented.');
}
