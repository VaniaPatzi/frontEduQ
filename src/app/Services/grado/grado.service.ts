import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GradoUsuario } from 'src/app/models/grado_usuario';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  private API_SERVER = 'http://localhost:8080/api/v1/grados';
  constructor(private httpClient: HttpClient) {}

  public getGradosUsuario(id: number) {
    return this.httpClient.get<GradoUsuario[]>(
      this.API_SERVER + '/grados_usuario/' + id
    );
  }

  public getGradoById(id: number) {
    return this.httpClient.get<GradoUsuario>(this.API_SERVER + '/' + id);
  }

  public saveRegistro(datos: any): Observable<any> {
    return this.httpClient.post<GradoUsuario>(this.API_SERVER, datos);
  }
}
