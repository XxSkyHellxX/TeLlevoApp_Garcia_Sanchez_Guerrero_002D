import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



export interface Datos{
    id:number,
    nombre:string,
    apellido:string,
    correo:string,
    celular:number,
    rut:string,
    pass:string,
    vehiculo:string,
    //datos auto
    patente:string,
    marca:string,
    modelo:string,
    color:string
    modified:number;
}

const ITEMS_KEY = 'my-datos'

@Injectable({
  providedIn: 'root'
})
export class ServicesDatosService {

  private _storage! : Storage;

  constructor(private storage:Storage) {
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage=storage;
  }

  async addDatos(dato:Datos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos:Datos[])=>{
      if(datos){
        datos.push(dato);
        return this.storage.set(ITEMS_KEY,datos);
      }else{
        return this.storage.set(ITEMS_KEY,[dato])
      }
    })
    
  }

  getDatos():Promise<Datos[]>{
    return this.storage.get(ITEMS_KEY);
  }

  async deleteDatos(id:number):Promise<Datos>{
    return this.storage.get(ITEMS_KEY).then((datos:Datos[])=>{
      if(!datos || datos.length===0){
        return null;
      }
      let toKeep:Datos[]=[];

      for(let i of datos){
        if (i.id!==id){
          toKeep.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY,toKeep)
    })
  }

}
