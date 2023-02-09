import { model, Schema } from "mongoose";

export interface Usuario{
    id:string;
    correo:string;
    password:string
    nombre:string;
    // direccion:string;
    ciudad:string;
 
}

export const UsuarioSchema= new Schema<Usuario>({
    nombre: {type:String, required:true},
    correo: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    // direccion: {type:String, required:true},
    ciudad: {type:String, required:true}

},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
});

export const UsuarioModel = model<Usuario>('usuario', UsuarioSchema);