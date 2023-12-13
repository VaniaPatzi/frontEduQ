import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthServiceService } from './Services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEDU';
  isAuthenticated: boolean = false;
  cargando: boolean = true;

  constructor(
    public auth: AuthService,
    private authService: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      }
      this.auth.idTokenClaims$.subscribe((tokenClaims) => {
        if (tokenClaims && tokenClaims.__raw) {
          localStorage.setItem('id_token', tokenClaims.__raw);
        } else {
          localStorage.removeItem('id_token');
        }
      });

      setTimeout(() => {
        this.cargando = false;
      }, 500);
    });
  }
  
}
