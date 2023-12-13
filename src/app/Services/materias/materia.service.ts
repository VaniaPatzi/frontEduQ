import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Materia } from 'src/app/models/materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private API_SERVER = 'http://localhost:8080/api/v1/materias';
  constructor(private httpClient: HttpClient) {}

  public getMateriasPorGradoUsuario(id: number) {
    return this.httpClient.get<Materia[]>(
      this.API_SERVER + '/materias_grado/' + id
    );
  }
}
