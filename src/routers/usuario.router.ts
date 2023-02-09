import { Router } from "express";
import { usuarios_ejemplos } from "../data";
import jwt from "jsonwebtoken"
import asyncHandler from 'express-async-handler'
import { Usuario, UsuarioModel } from "../models/usuario.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req,res) =>{
        const usuariosContador = await UsuarioModel.countDocuments();
        if(usuariosContador>0){
            res.send("Semilla ya esta hecha")
            return;
        }

        await UsuarioModel.create(usuarios_ejemplos)
        res.send("Semilla esta hecha")
    }
))

router.post("/login", asyncHandler(
    async (req,res) =>{
        const {correo,password} = req.body;
        const usuario = await UsuarioModel.findOne({correo,password})
        
            if(usuario){
                res.send(generateTokenResponse(usuario))
            }else{
                res.status(400).send("Correo o contraseña no son validos")
            }
    }
))

router.post('/registro',asyncHandler(
    async (req,res)=>{
        const {nombre,correo,password,direccion,ciudad} = req.body;
        const usuario = await UsuarioModel.findOne({correo});
        if(usuario){
            res.status(400).send('El usuario ya existe')
            return;
        }

        const nuevoUsuario:Usuario = {
            id:'',
            nombre,
            correo: correo.toLowerCase(),
            password,
            ciudad
        }

        const dbUsuario = await UsuarioModel.create(nuevoUsuario);
        res.send(generateTokenResponse(dbUsuario))
    }
))


const generateTokenResponse = (usuario:any)=>{
    const token = jwt.sign({
        email:usuario.email
    },"textoRandom",{
        expiresIn:"30d"
    });

    usuario.token = token;
    return usuario;
}

export default router;