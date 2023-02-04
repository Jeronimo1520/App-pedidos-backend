import {Router} from 'express'
import { comida_ejemplos } from '../data';
import asynceHandler from 'express-async-handler';
import { ComidaModel } from '../models/comida.model';

const router = Router();

router.get("/seed", asynceHandler(
    async (req,res) =>{
        const comidasContador = await ComidaModel.countDocuments();
        if(comidasContador>0){
            res.send("Semilla ya esta hecha")
            return;
        }

        await ComidaModel.create(comida_ejemplos)
        res.send("Semilla esta hecha")
    }
))

router.get("/", asynceHandler( //Obtener todas als comidas
    async (req,res) =>{
        const comidas = await ComidaModel.find();
        res.send(comidas);
    }
))

router.get("/search/:searchTerm", asynceHandler( //busquedas
    async (req,res)=>{
        const searchRegex = new RegExp(req.params.searchTerm, 'i')
        const comidas = await ComidaModel.find({nombre: {$regex: searchRegex}})
        res.send(comidas);
    }
))

router.get("/:comidaId", asynceHandler( //comida por id
    async (req,res) =>{
        const comida = await ComidaModel.findById(req.params.comidaId)
        res.send(comida)
    }
))


export default router;