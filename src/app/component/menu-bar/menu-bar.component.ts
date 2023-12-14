import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthServiceService } from 'src/app/Services/auth/auth-service.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  isAuthenticated: boolean = false;

  constructor(
    public auth: AuthService,
    private authService: AuthServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (!this.isAuthenticated) {
        this.router.navigate(['/inicio']);
      }
    });
  }

  logOut() {
    this.auth.logout();
  }
}
