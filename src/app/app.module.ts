import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { MenuComponent } from './component/menu/menu.component';
import { ItinerarioComponent } from './component/itinerario/itinerario.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { MenuBarComponent } from './component/menu-bar/menu-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    ItinerarioComponent,
    MenuBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    AuthModule.forRoot({
      domain: 'dev-bi4egrb5e4ay8rvj.us.auth0.com',
      clientId: 'SBWeJ0myCXyFmX1v9wNWpbFOsYzHZaEB',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
