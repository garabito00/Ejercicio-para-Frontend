import { Component, OnInit } from '@angular/core';
import { IPersona } from 'src/app/modelos/IPersona';
import { DirectorioService } from 'src/app/servicio/directorio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private servicio: DirectorioService) { }

  directorio: IPersona[] = this.servicio.directorio;
  botonDeRetroceso: boolean = this.servicio.botonDeRetroceso;

  ngOnInit(): void {
    this.GetDirectorio();
  }

  GetDirectorio(){
    if(this.servicio.primeraVez){
      let directorio = this.servicio.GetDirectorio();
      directorio.then(respuesta => {
        this.servicio.directorio = respuesta;
        this.directorio = this.servicio.directorio;
      }, (err) => {
        this.servicio.directorio = []
      });
      this.servicio.primeraVez = false;
    }    

  }

  enviarIDs(){
    this.servicio.GuardarUltimoID(this.directorio);
  }
}
