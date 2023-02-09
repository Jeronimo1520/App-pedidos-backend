import {model,Schema, Types} from 'mongoose';
import { EstatusPedido } from '../constants/pedido_estatus';
import { Comida, ComidaSchema } from './comida.model';

export interface LatLng{
    lat:string;
    lng:string;
}

export const LatLngSchema = new Schema<LatLng>(
    {
        lat :{type: String, required:true},
        lng: {type: String, required:true}
    }
)

export interface PedidoItem{
    comida:Comida;
    precio:number;
    cantidad:number;
}

export const PedidoItemSchema = new Schema<PedidoItem>({
    comida:{type:ComidaSchema, required:true},
    precio:{type:Number, required:true},
    cantidad: {type:Number,required:true},
})

export interface Pedido{
    id:number;
    items:PedidoItem[];
    precioTotal:number;
    nombre:string;
    direccion:string;
    dirreccionLatLng:LatLng;
    idPago:string;
    fechaCreado:string;
    estatus:EstatusPedido;
    usuario:Types.ObjectId; //Foreign key
    actualizado:Date;
}


const PedidoSchema = new Schema<Pedido>({
    nombre: {type:String,required:true},
    direccion: {type:String,required:true},
    dirreccionLatLng:{type:LatLngSchema,required:true},
    idPago:{type:String,required:true},
    precioTotal:{type:Number,required:true},
    items: {type: [PedidoItemSchema],required: true},
    estatus:{type:String,default:EstatusPedido.NUEVO},
    usuario:{type:Schema.Types.ObjectId}
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
});

export const PedidoModel = model('modelo',PedidoSchema);