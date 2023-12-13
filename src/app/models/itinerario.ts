import { Materia } from './materia';

export class Itinerario {
  id: number;
  materia_id: number;
  materia: Materia = new Materia();
  usuario_grado_id: number;
  res_itinerario: String;
  tema: String;
  constructor() {
    this.id = 0;
    this.materia_id = 0;
    this.materia = new Materia();
    this.usuario_grado_id = 0;
    this.res_itinerario = '';
    this.tema = '';
  }
}
