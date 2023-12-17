import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from 'src/app/models/usuario';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
 
  usuario: Usuario = new Usuario();
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
