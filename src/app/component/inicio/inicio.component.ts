import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(public auth: AuthService, private router: Router){ }
  ngOnInit(): void { 
    this.auth.isAuthenticated$.subscribe(isAuthenticaed => {
      if (isAuthenticaed) {
        this.router.navigate(['/menuBar'])
      }
    })
  }

  login(){
    this.auth.loginWithRedirect()
  }
}
