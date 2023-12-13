import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItinerarioService {
  saveRegistro(datos: { materia_id: any; materia: import("../../models/materia").Materia; usuario_grado_id: number; res_itinerario: string; tema: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
