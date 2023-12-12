import { Component } from '@angular/core';

@Component({
  selector: 'app-listar-tarea',
  templateUrl: './listar-tarea.component.html',
  styleUrls: ['./listar-tarea.component.css']
})
export class ListarTareaComponent {

  materias: any[] = [];
  nuevaMateria: any = {};
  notaMasBaja: number | undefined;

  agregarMateria() {
    this.materias.push({ ...this.nuevaMateria });
    this.nuevaMateria = {};
    this.actualizarNotaMasBaja();
  }

  eliminarMateria(index: number) {
    this.materias.splice(index, 1);
    this.actualizarNotaMasBaja();
  }

  private actualizarNotaMasBaja() {
    if (this.materias.length > 0) {
      this.notaMasBaja = Math.min(...this.materias.map(materia => materia.nota));
    } else {
      this.notaMasBaja = undefined;
    }
  }
}
