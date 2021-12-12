import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { CrearComponent } from './componentes/crear/crear.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarComponent } from './componentes/actualizar/actualizar.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CrearComponent,
    ActualizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
