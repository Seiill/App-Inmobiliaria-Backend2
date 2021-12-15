import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { post, requestBody } from '@loopback/openapi-v3';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { Credenciales, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
import {Llaves} from './Config/llaves';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) {}

  /*
   * Add service methods here
   */
  @post("/identificarUsuario", {
    responses: {
      '200': {
        description: "Identificación de Usuarios"
      }
    }
  })
  async identificarUsuario(
    @requestBody() credenciales: Credenciales
  ){
let p = await this.servicioAutentication.identificarUsuario(credenciales.Usuario, credenciales.Clave);
if (p){
  let token= this.servicioAutentication.GenerarTokenJWT(p);
}else{
  throw new HttpErrors[401]("Datos invalidos");
}
  }

  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
  }

  IdentificarPersona(usuario: string, clave: string){
    try {
      let usua= this.usuarioRepository.findOne({where:{correo: usuario, clave: clave}});
      if (usua) {
        return usua;
      }
      return false;
    } catch {
      return false;      
    }

  }

  GenerarTokenJWT(usuario: Usuario){
    let token = jwt.sign({
      data:{
        id: usuario.id,
        correo: usuario.Correo,
        nombre: usuario.nombre + " " + usuario.Apellido
      }        
    },
      Llaves.claveJWT);
      return token;
  }
  validarToken(token: string){
  try {
    let datos = jwt.verify(token, Llaves.claveJWT)
    return datos; 
  } catch  {
    return false;
    
  }
}
}