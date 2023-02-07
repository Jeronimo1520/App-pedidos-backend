import dotenv from 'dotenv'
import express from 'express'; 
import cors from "cors";
import { comida_ejemplos, usuarios_ejemplos } from './data';
import comidaRouter from './routers/comida.router';
import { dbConnect } from './configs/database.config';
import jwt from "jsonwebtoken"

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

app.post("/api/usuarios/login", (req,res) =>{
    const {email,password} = req.body;
    const usuario = usuarios_ejemplos.find(usuario => usuario.email === email &&
        usuario.password === password)
    
        if(usuario){
            res.send(generateTokenResponse(usuario))
        }else{
            res.status(400).send("Correo o contraseña no son validos")
        }
})

const generateTokenResponse = (usuario:any)=>{
    const token = jwt.sign({
        email:usuario.email
    },"textoRandom",{
        expiresIn:"30d"
    });

    usuario.token = token;
    return usuario;
}

const port = 5000;

app.listen(port, ()=>{
    console.log("Website served on http://localhost:" + port);
})