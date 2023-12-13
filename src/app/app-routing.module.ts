import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { MenuComponent } from './component/menu/menu.component';
import { MenuBarComponent } from './component/menu-bar/menu-bar.component';
import { IntroduccionComponent } from './component/introduccion/introduccion.component';
import { LoginComponent } from './component/login/login.component';
import { ShowItinerarioComponent } from './component/show-itinerario/show-itinerario.component';
import { ItinerarioComponent } from './component/itinerario/itinerario.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {path: 'inicio', component: InicioComponent},
  { path: 'itinerario/:id', component: ItinerarioComponent },
  { path: 'itinerario/show/:id', component: ShowItinerarioComponent },
  {path: 'menuBar', component: MenuBarComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'intro', component: IntroduccionComponent},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
