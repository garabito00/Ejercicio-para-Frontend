import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IContacto } from 'src/app/modelos/IContacto';
import { IPersona } from 'src/app/modelos/IPersona';
import { DirectorioService } from 'src/app/servicio/directorio.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  constructor(private fb: FormBuilder, private servicio: DirectorioService, private router: Router) { }


  formulario!: FormGroup;

  get contactos(): FormArray{
    return this.formulario.get('contactos') as FormArray;
  } 


  CrearFormulario(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      apellido: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.maxLength(30)]],
      contactos: this.fb.array([])
    });

  }

  CrearCampoContacto(){
    return this.fb.group({
      numero: ['', Validators.maxLength(15)]
    })
  }

  AgregarControlDeContacto(): void{
    this.contactos.push(this.CrearCampoContacto());
  }

  EliminarControlDeContacto(index: number): void{
    this.contactos.removeAt(index);
  }

  CrearRegistro(){
    let idPersona = this.servicio.ultimoIdDePersona + 1;
    let idContacto = this.servicio.ultimoIdDeContacto + 1;
    let numerosArray = this.formulario.value.contactos;

    let contactosArray: IContacto[] = this.ObtenerContactosArray(idPersona, idContacto, numerosArray);

    let registro: IPersona = {
      id: this.servicio.ultimoIdDePersona + 1,
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      correo: this.formulario.value.correo,
      contactos: contactosArray
    } 

    this.servicio.InsertarRegistro(registro);
    console.log("Se creo el registro");
    this.formulario.reset();
    this.RegresarAlInicio();
  }

  RegresarAlInicio(): void {
    this.router.navigate(['/inicio']);
  }

  private ObtenerContactosArray(idPersona: number, idContacto: number, numerosArray: any){

    let contactosArray: IContacto[] = [];

    for(let i = 0; i < numerosArray.length; i++){
      let contacto: IContacto = {
        id: idContacto + i,
        personaID: idPersona,
        numeroTelefonico: numerosArray[i].numero
      }
      contactosArray.push(contacto);
      this.EliminarControlDeContacto(0); 
    }
    
    return contactosArray;
  }

  ngOnInit(): void {
    this.CrearFormulario();
  }

}
