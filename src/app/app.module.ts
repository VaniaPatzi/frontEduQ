import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { RegistroNotasComponent } from './component/registro-notas/registro-notas.component';
import { MenuComponent } from './component/menu/menu.component';
import { RegistroComponent } from './component/registro-notas/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroNotasComponent,
    MenuComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
