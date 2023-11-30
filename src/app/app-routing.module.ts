import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { RegistroNotasComponent } from './component/registro-notas/registro-notas.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'registro-notas', component: RegistroNotasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
