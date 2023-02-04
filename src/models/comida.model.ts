import { model, Schema } from "mongoose";

export interface Comida{
    id:string; 
    nombre:string;
    precio:number;
    etiquetas: string[];
    estrellas:number;
    imagenUrl: string;
    tiempo:string;
    local:string;
}


export const ComidaSchema = new Schema<Comida>(
    {
        nombre: {type: String, required:true},
        precio: {type: Number, required:true},
        etiquetas: {type: [String]},
        estrellas: {type: Number, required:true},
        imagenUrl: {type: String, required:true},
        tiempo: {type: String, required:true},
        local: {type: String, required:true},

    }, {
        toJSON:{
            virtuals:true
        },

        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

export const ComidaModel = model<Comida>('comida',ComidaSchema);