import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UsuarioService } from 'src/app/Services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario = new Usuario();
  constructor(
    public auth: AuthService,
    private router: Router,
    public usuario_service: UsuarioService
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticaed) => {
      if (isAuthenticaed) {
        this.auth.user$.subscribe((user) => {
          const email = user?.email;
          const nombre = user?.name;
          console.log(email);
          console.log(nombre);
          this.usuario.email = email ? email : '';
          this.usuario.nombre = nombre ? nombre : '';
          this.usuario_service.saveUsuario(this.usuario).subscribe(
            (response) => {
              const usuario = response ?? ''; // Usando el operador de coalescencia nula (??)
              if (usuario) {
                localStorage.setItem('usuario', JSON.stringify(usuario));
                setTimeout(() => {
                  this.router.navigate(['/inicio']);
                }, 500);
              } else {
                this.auth.logout();
                this.router.navigate(['/']);
                localStorage.removeItem('usuario');
              }
            },
            (error) => {
              console.error('Error al guardar usuario', error);
              // this.auth.logout();
              // this.router.navigate(['/']);
              // localStorage.removeItem('usuario');
            }
          );
        });
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
