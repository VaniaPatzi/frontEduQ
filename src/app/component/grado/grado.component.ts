import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GradoService } from 'src/app/Services/grado/grado.service';
import { GradoUsuario } from 'src/app/models/grado_usuario';
import { Materia } from 'src/app/models/materia';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-grado',
  templateUrl: './grado.component.html',
  styleUrls: ['./grado.component.css']
})
export class GradoComponent {

  private CHATGPT_KEY: string =
  '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';
esperandoRespuesta: boolean = false;
enviado: boolean = false;
oGrado: GradoUsuario = new GradoUsuario();
oGradoCreado: GradoUsuario = new GradoUsuario();
oUsuario: Usuario = new Usuario();
oMaterias: Materia[] = [];
resultado: String ='';
errors: String[] = [];
puntaje_minimo: Number = 60;
pista_cantidad: Number = 1;

constructor(private router: Router, public grado_service: GradoService) {}

ngOnInit(): void {}

// chatgpt
public async getResultados(): Promise<void> {
  this.validarMaterias();
  this.esperandoRespuesta = true;
  if (this.errors.length == 0 && localStorage.getItem('usuario')) {
    let mensaje = `Tengo las siguientes materias y notas: `;
    console.log(this.oMaterias.length);
    this.oMaterias.forEach((item, index) => {
      mensaje += `- ${item.nombre.toUpperCase()}: ${item.nota}`;
      if (index < this.oMaterias.length - 1) {
        mensaje += `\n`;
      } else {
        mensaje += `\n`;
      }
    });
    this.pista_cantidad = this.getCantidadMenores();
    mensaje += `. Necesito saber que me listes las materias con calificacion menor a 60, de la siguiente manera: "Materias con calificacion menor a 60: MATERIA 1, MATERIA2, etc... Y no cambies los nombres que te envío, solo ponlos en mayusculas`;

    /* Descomponer las materias segun estos mensajes de prueba recibidos:
      1) this.resultado = 'Materias con calificación menor a 60: MATEMATICAS, FILOSOFIA';
      2) this.resultado = 'No tienes ninguna materia con calificación menor a 60, todas tus materias tienen una calificación de 90.';
      3) this.resultado= 'Materias con calificación menor a 60: (No hay materias con calificación menor a 60)';
    */

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.CHATGPT_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: mensaje,
          },
        ],
        // max_tokens: 150, // El número máximo de tokens que esperas recibir en la respuesta
      }),
    };

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        requestOptions
      );
      const data = await response.json();
      // asignando la respuesta a la variable respuestaGPT para mostrarlo en la página
      this.resultado = data.choices[0]['message']['content'];
      console.log(this.resultado);
      this.oMaterias.forEach((elem) => {
        const nombreMateriaMayus = elem.nombre.toUpperCase();
        const resultadoMayus = this.resultado.toUpperCase();
        // Verificar si el nombre de la materia está incluido en el resultado
        elem.estado = 'NORMAL';
        if (resultadoMayus.includes(nombreMateriaMayus)) {
          // La materia está incluida en el resultado
          elem.estado = 'BAJO';
        }
        elem.nombre = nombreMateriaMayus;
      });

      // obtener el resultado
      let usuarioString = localStorage.getItem('usuario');
      if (usuarioString != null) {
        let usuario = JSON.parse(usuarioString);
        this.oUsuario.id = usuario.id;
        this.oUsuario.email = usuario.email;
        this.oUsuario.nombre = usuario.nombre;
      }
      // armar el request body
      const datos = {
        usuario_id: this.oUsuario.id,
        grado: this.oGrado.grado,
        nivel: this.oGrado.nivel,
        materias: this.oMaterias.map((elem) => {
          return {
            id: elem.id,
            nombre: elem.nombre,
            nota: elem.nota,
            estado: elem.estado,
          };
        }),
      };
      console.log(mensaje);

      this.grado_service.saveRegistro(datos).subscribe(
        (response) => {
          this.enviado = true;
          console.log(response);
          this.vaciarValores();
          this.oGradoCreado = response;
          setTimeout(() => {
            this.esperandoRespuesta = false;
            this.enviado = false;
          }, 2000);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
    } catch (error) {
      this.esperandoRespuesta = false;
      console.error('Error:', error);
      // this.errors.push(error);
      throw error;
    }
  } else {
    this.esperandoRespuesta = false;
  }
}

public validarMaterias() {
  this.errors = [];

  if (this.oGrado.grado == '') {
    this.errors.push('Debes seleccionar un grado');
  }
  if (this.oGrado.nivel == '') {
    this.errors.push('Debes seleccionar un nivel');
  }

  this.oMaterias.forEach((item, index) => {
    if (item.nombre == '' || item.nota + '' == '') {
      this.errors.push(
        'Debes completar todos los campos de la Fila ' + (index + 1)
      );
    }
  });
  if (this.errors.length > 0) {
    return true;
  }
  return false;
}

// materias
public agregarMateria() {
  this.oMaterias.push({
    id: 0,
    nombre: '',
    nota: 0,
    estado: '',
  });
}
public eliminarMateria(index: number) {
  this.oMaterias.splice(index, 1);
}

public vaciarResultado() {
  this.resultado = '';
  this.oGradoCreado = new GradoUsuario();
}

public vaciarValores() {
  this.errors = [];
  this.oMaterias = [];
  this.oGrado.grado = '';
  this.oGrado.nivel = '';
}
public getCantidadMenores() {
  let c_menores = 0;
  if (this.oMaterias.length > 0) {
    c_menores = this.oMaterias.filter(
      (elemento) => elemento.nota < 60
    ).length;
  }
  return c_menores;
}
}
