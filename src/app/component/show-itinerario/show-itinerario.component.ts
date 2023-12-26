import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradoUsuario } from 'src/app/models/grado_usuario';
import { Itinerario } from 'src/app/models/itinerario';
import { GradoService } from 'src/app/Services/grado/grado.service';

import { ItinerarioService } from 'src/app/Services/itinerario/itinerario.service';

@Component({
  selector: 'app-show-itinerario',
  templateUrl: './show-itinerario.component.html',
  styleUrls: ['./show-itinerario.component.css'],
})
export class ShowItinerarioComponent {
  id: string | null = '';
  private CHATGPT_KEY: string =
    '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';
  oItinerario: Itinerario = new Itinerario();
  oGrado: GradoUsuario = new GradoUsuario();
  index_pregunta: number = 0;
  esperandoRespuesta: boolean = false;
  mostrarRespuesta: boolean = false;
  respuestaGPT: Array<{ pregunta: string; respuesta: string }> = [];
  constructor(
    private route: ActivatedRoute,
    public itinerario_service: ItinerarioService,
    public grado_service: GradoService
  ) {}

  ngOnInit(): void {
    let id_url = this.route.snapshot.paramMap.get('id');
    this.id = id_url ? id_url : '0';
    this.getItinerarioById(parseInt(this.id));
  }

  getItinerarioById(id: number) {
    this.itinerario_service.getItinerarioById(id).subscribe(
      (response) => {
        this.oItinerario = response;
        this.getGradoById(this.oItinerario.usuario_grado_id);
      },
      (error) => {}
    );
  }

  getGradoById(id: number) {
    this.grado_service.getGradoById(id).subscribe((response) => {
      this.oGrado = response;
    });
  }

  async onClickSearch(): Promise<void> {
    this.esperandoRespuesta = true;
    let mensaje = `Asignatura: ${this.oItinerario.materia}
    Tema: ${this.oItinerario.tema}
    Necesito que armes 10 preguntas con sus respectivas respuestas, pero que esten armadas en un formato JSON.
    Es de suma importancia que solo devuelvas el json sin decir previamente. Ejemplo:
    [
      {
        "pregunta":"La pregunta 1",
        "respuesta":"Respuesta de la pregunta 1"
      },
      {
        "pregunta":"La pregunta 2",
        "respuesta":"Respuesta de la pregunta 2"
      }
      {
        "pregunta":"La pregunta 3",
        "respuesta":"Respuesta de la pregunta 3"
      }
      {
        "pregunta":"La pregunta 4",
        "respuesta":"Respuesta de la pregunta 4"
      }
      {
        "pregunta":"La pregunta 5",
        "respuesta":"Respuesta de la pregunta 5"
      }
      {
        "pregunta":"La pregunta 6",
        "respuesta":"Respuesta de la pregunta 6"
      }
      {
        "pregunta":"La pregunta 7",
        "respuesta":"Respuesta de la pregunta 7"
      }
      {
        "pregunta":"La pregunta 8",
        "respuesta":"Respuesta de la pregunta 8"
      }
      {
        "pregunta":"La pregunta 9",
        "respuesta":"Respuesta de la pregunta 9"
      }
      {
        "pregunta":"La pregunta 10",
        "respuesta":"Respuesta de la pregunta 10"
      }
    ]`;

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
      this.respuestaGPT = JSON.parse(data.choices[0]['message']['content']);
      console.log(this.respuestaGPT);
      this.index_pregunta = 0;
      this.esperandoRespuesta = false;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  toggleMostrar() {
    this.mostrarRespuesta = !this.mostrarRespuesta;
  }
  incrementarIndex() {
    if (
      this.respuestaGPT &&
      this.index_pregunta < this.respuestaGPT.length - 1
    ) {
      console.log('aa');
      this.index_pregunta++;
    } else {
      this.index_pregunta = 0;
    }
  }
  decrementarIndex() {
    if (this.respuestaGPT && this.index_pregunta > 0) {
      this.index_pregunta--;
    } else {
      this.index_pregunta = this.respuestaGPT
        ? this.respuestaGPT.length - 1
        : 0;
    }
  }
}

/*
RESULTADO:
[
    {
        "pregunta": "¿Qué es una matriz?",
        "respuesta": "Una matriz es una estructura rectangular compuesta por elementos dispuestos en filas y columnas."
    },
    {
        "pregunta": "¿Cuál es la diferencia entre una matriz fila y una matriz columna?",
        "respuesta": "Una matriz fila es una matriz con una sola fila y múltiples columnas. Una matriz columna es una matriz con una sola columna y múltiples filas."
    },
    {
        "pregunta": "¿Qué es un vector?",
        "respuesta": "Un vector es una matriz de una sola columna o una sola fila."
    },
    {
        "pregunta": "¿Qué es un espacio vectorial?",
        "respuesta": "Un espacio vectorial es un conjunto de vectores con dos operaciones definidas: suma de vectores y multiplicación por un escalar."
    },
    {
        "pregunta": "¿Qué es una transformación lineal?",
        "respuesta": "Una transformación lineal es una función que preserva las operaciones de suma de vectores y multiplicación por escalar."
    },
    {
        "pregunta": "¿Cuál es la definición matemática de una matriz transpuesta?",
        "respuesta": "La matriz transpuesta de una matriz A se obtiene cambiando las filas por columnas."
    },
    {
        "pregunta": "¿Cómo se multiplica una matriz por un escalar?",
        "respuesta": "Se multiplican todos los elementos de la matriz por el escalar."
    },
    {
        "pregunta": "¿Cuál es el producto de dos matrices?",
        "respuesta": "El producto de dos matrices A y B es otra matriz C, donde el elemento cij es el resultado del producto punto entre la fila i de A y la columna j de B."
    },
    {
        "pregunta": "¿Cuándo una matriz es invertible?",
        "respuesta": "Una matriz es invertible si su determinante es diferente de cero."
    },
    {
        "pregunta": "¿Cuál es la matriz identidad?",
        "respuesta": "La matriz identidad es una matriz cuadrada con unos en la diagonal principal y ceros en el resto de elementos."
    }
]
*/

