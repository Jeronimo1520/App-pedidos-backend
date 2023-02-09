import { Router } from "express";
import asyncHandler from 'express-async-handler'
import { EstatusPedido } from "../constants/pedido_estatus";
import { PedidoModel } from "../models/Pedido.model";

const router = Router();

router.post('/create',
asyncHandler(async (req:any, res:any)=>{
    const pedidoRequest = req.body;

    if(pedidoRequest.items.length <= 0){
        res.status(400).send('Canasta vacia');
        return;
    }
       await PedidoModel.deleteOne({
        usuario:req.usuario.id,
        estatus: EstatusPedido.NUEVO
       })
})
)