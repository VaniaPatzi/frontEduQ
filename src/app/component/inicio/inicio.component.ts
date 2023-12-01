import { Component } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-inicio',
  //template: '<button (click)="auth.loginWithRedirect()">Log in</button>'
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(public auth: AuthService){}
  ngOninit(): void { }
  login(){
    this.auth.loginWithRedirect();
  }
}
