import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPersona } from '../modelos/IPersona';

@Injectable({
  providedIn: 'root'
})
export class DirectorioService {

  constructor(private http: HttpClient) { }

  //Propiedades del sevicio
  private rutaAlJson: string = 'Repositorio/directorio.json';
  ultimoIdDePersona!: number;
  ultimoIdDeContacto!: number;
  directorio: IPersona[] = [];
  directorioAnterior: IPersona[] = [];
  primeraVez: boolean = true;
  botonDeRetroceso: boolean = false;

  //Metodos del servicio
  public GetDirectorio(): Promise<any>{  
    let directorio = new Promise((resolve: any, reject: any) => {
      this.http.get(this.rutaAlJson).toPromise().then(
        respuesta => resolve(respuesta),
        err => {
          console.log(`Codigo de estatus: ${err.status}. Mensaje: ${err.error.message}`);
          reject(err);
        }
      );
    });    
    return directorio;
  }

  GetUnRegistro(id: number){
    return this.directorio.find(registro => registro.id == id);
  }

  //Para verificar cual es el ultimo ID guardado en JSon
  GuardarUltimoID(directorio: IPersona[]): void{
    this.ultimoIdDePersona = directorio[directorio.length - 1].id;
    this.ultimoIdDeContacto = directorio[directorio.length - 1].contactos[directorio[directorio.length - 1].contactos.length - 1].id;
  }

  //Ultimo id de la tabla de contactos
  UltimoIdDeContacto(){
    return this.directorio[this.directorio.length - 1].contactos[this.directorio[this.directorio.length - 1].contactos.length - 1].id;
  }

  InsertarRegistro(registro: IPersona){
    this.directorio.push(registro);
  }

  ObtenerIndex(id: number){
    return this.directorio.indexOf(this.GetUnRegistro(id) as IPersona);
  }
  
  ActualizarRegistro(registro: IPersona){
    this.directorio[this.ObtenerIndex(registro.id)] = registro;
  }
}
