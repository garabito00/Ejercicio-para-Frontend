import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IContacto } from 'src/app/modelos/IContacto';
import { IPersona } from 'src/app/modelos/IPersona';
import { DirectorioService } from 'src/app/servicio/directorio.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private fb: FormBuilder, private servicio: DirectorioService, private router: Router) { }

  idPorParametro: any;
  formulario!: FormGroup;
  registro: IPersona | any;

  get contactos(): FormArray{
    return this.formulario.get('contactos') as FormArray;
  } 
  
  ngOnInit(): void {
    this.CapturarIdPorParametro();
    this.CrearFormulario();      
  }

  CapturarIdPorParametro(){
    this.idPorParametro = Number(this.activeRoute.snapshot.paramMap.get('id'));
  }

  CrearFormulario(): void {
    this.registro = this.servicio.GetUnRegistro(this.idPorParametro);

    this.formulario = this.fb.group({
      nombre: [this.registro.nombre, [Validators.required, Validators.maxLength(20)]],
      apellido: [this.registro.apellido, [Validators.required, Validators.maxLength(20)]],
      correo: [this.registro.correo, [Validators.required, Validators.maxLength(30)]],
      contactos: this.fb.array([])
    });

    this.CargarContactos();
    
  }

  CrearCampoContacto(){
    return this.fb.group({
      numero: ['', Validators.maxLength(15)]
    })
  }

  LLenarCampoContacto(numero: string){  
    return this.fb.group({
      numero: [numero, Validators.maxLength(15)]
    })
    
  }
  
  CargarContactos(){
    
    for(let i = 0; i < this.registro.contactos.length; i++){
      this.contactos.push(this.LLenarCampoContacto(this.registro.contactos[i].numeroTelefonico));
    }
  }

  AgregarControlDeContacto(): void{
    this.contactos.push(this.CrearCampoContacto());
  }

  EliminarControlDeContacto(index: number): void{
    this.contactos.removeAt(index);
  }

  RegresarAlInicio(): void {
    this.router.navigate(['/inicio']);
  }

  private ObtenerContactosArray(idPersona: number, idContacto: number, numerosArray: any){

    let contactosArray: IContacto[] = [];
    let contacto: IContacto;
    let registro = this.servicio.GetUnRegistro(idPersona) as IPersona;
    for(let i = 0; i < numerosArray.length; i++){
      if(i < registro.contactos.length){
        contacto = {
          id: registro.contactos[i].id,
          personaID: idPersona,
          numeroTelefonico: numerosArray[i].numero
        }
      } else {
        contacto = {
          id: idContacto + i,
          personaID: idPersona,
          numeroTelefonico: numerosArray[i].numero
        }
      }
      contactosArray.push(contacto);
      this.EliminarControlDeContacto(0);
    }
    
    return contactosArray;
  }

  ActualizarRegistro(){
    let idPersona = this.idPorParametro;
    let idContacto = this.servicio.UltimoIdDeContacto();
    let numerosArray = this.formulario.value.contactos;

    let contactosArray: IContacto[] = this.ObtenerContactosArray(idPersona, idContacto, numerosArray);

    let registro: IPersona = {
      id: idPersona,
      nombre: this.formulario.value.nombre,
      apellido: this.formulario.value.apellido,
      correo: this.formulario.value.correo,
      contactos: contactosArray
    } 

   
    this.servicio.ActualizarRegistro(registro);
    console.log('Se Actualizo el Registro');
    this.formulario.reset();
    this.RegresarAlInicio();
  }

}
