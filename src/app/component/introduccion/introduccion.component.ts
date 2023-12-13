import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthServiceService } from 'src/app/Services/auth/auth-service.service';
import { GradoService } from 'src/app/Services/grado/grado.service';
import { GradoUsuario } from 'src/app/models/grado_usuario';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.css']
})
export class IntroduccionComponent {

  isAuthenticated: boolean = false;
  listGradosUsuario: GradoUsuario[] = [];

  constructor(
    public auth: AuthService,
    private authService: AuthServiceService,
    public grado_service: GradoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      }
      this.getGradosUsuario();
    });
  }

  getGradosUsuario() {
    let usuarioString = localStorage.getItem('usuario');
    if (usuarioString != null) {
      let usuario = JSON.parse(usuarioString);
      this.grado_service.getGradosUsuario(usuario.id).subscribe(
        (response) => {
          this.listGradosUsuario = response;
        },
        (error) => {
          console.log('error: ' + error);
        }
      );
    }
  }
}
