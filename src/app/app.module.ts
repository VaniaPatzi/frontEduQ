import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { MenuComponent } from './component/menu/menu.component';
import { ItinerarioComponent } from './component/itinerario/itinerario.component';

import { AuthModule } from '@auth0/auth0-angular';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    ItinerarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AuthModule.forRoot({
      domain: 'dev-bi4egrb5e4ay8rvj.us.auth0.com',
      clientId: 'SBWeJ0myCXyFmX1v9wNWpbFOsYzHZaEB',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
