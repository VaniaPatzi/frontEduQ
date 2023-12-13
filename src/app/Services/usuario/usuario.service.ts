import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API_SERVER = 'http://localhost:8080/api/v1/usuarios';
  private ID_TOKEN = localStorage.getItem('id_token')
    ? localStorage.getItem('id_token')
    : '';

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.ID_TOKEN}`,
  });
  constructor(private httpClient: HttpClient) {}

  public saveUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, usuario, {
      headers: this.headers,
    });
  }
}
