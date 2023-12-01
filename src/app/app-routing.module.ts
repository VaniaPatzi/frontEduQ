import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { MenuComponent } from './component/menu/menu.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: ' ', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: InicioComponent},
  {path: 'inicio', component:AppComponent},
  {path: 'menu', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
