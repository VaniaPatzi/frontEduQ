import { Materia } from './materia';
import { Usuario } from './usuario';

export class GradoUsuario {
  id: number;
  usuario_id: number;
  grado: String;
  nivel: String;
  materias: Materia[] = [];
  constructor() {
    this.id = 0;
    this.usuario_id = 0;
    this.grado = '';
    this.nivel = '';
  }
}
