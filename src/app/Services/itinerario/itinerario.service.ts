import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itinerario } from 'src/app/models/itinerario';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {
  private API_SERVER = 'http://localhost:8080/api/v1/itinerarios';
  constructor(private httpClient: HttpClient) {}

  public getItinerarioByMateria(id: number) {
    return this.httpClient.get<Itinerario>(
      this.API_SERVER + '/itinerario_materia/' + id
    );
  }
  public getItinerarioByGrado(id: number) {
    return this.httpClient.get<Itinerario[]>(
      this.API_SERVER + '/itinerarios_grado/' + id
    );
  }

  public getItinerarioById(id: number) {
    return this.httpClient.get<Itinerario>(this.API_SERVER + '/' + id);
  }

  public saveRegistro(datos: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, datos, {
      responseType: 'text',
    });
  }
}
