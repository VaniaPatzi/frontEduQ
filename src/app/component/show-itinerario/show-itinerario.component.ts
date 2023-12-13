import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradoUsuario } from 'src/app/models/grado_usuario';
import { Itinerario } from 'src/app/models/itinerario';
import { Materia } from 'src/app/models/materia';
import { GradoService } from 'src/app/Services/grado/grado.service';

import { ItinerarioService } from 'src/app/Services/itinerario/itinerario.service';
import { MateriaService } from 'src/app/Services/materias/materia.service';

@Component({
  selector: 'app-show-itinerario',
  templateUrl: './show-itinerario.component.html',
  styleUrls: ['./show-itinerario.component.css'],
})
export class ShowItinerarioComponent {
  id: string | null = '';
  topic: string = '';
  respuestaGPT: string = '';
  esperandoRespuesta: boolean = false;
  listMaterias: Materia[] = [];
  listItinerarios: Itinerario[] = [];
  materia_actual: any = '';
  oGrado: GradoUsuario = new GradoUsuario();
  constructor(
    private route: ActivatedRoute,
    public materia_service: MateriaService,
    public grado_service: GradoService,
    public itinerario_service: ItinerarioService
  ) {}
  private CHATGPT_KEY: string =
    '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';

  ngOnInit(): void {
    let id_url = this.route.snapshot.paramMap.get('id');
    this.id = id_url ? id_url : '0';
    this.getMaterias(parseInt(this.id));
    this.getGradoUsuarioById(parseInt(this.id));
    this.getItinerariosByGrado(parseInt(this.id));
  }

  async onClickSearch(): Promise<void> {
    this.esperandoRespuesta = true;
    let mensaje =
      'Generame un plan de estudios semanal para el tema de ' + this.topic;

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
      this.respuestaGPT = data.choices[0]['message']['content'];
      const datos = {
        materia_id: this.materia_actual,
        materia: new Materia(),
        usuario_grado_id: this.oGrado.id,
        res_itinerario: this.respuestaGPT,
        tema: this.topic.toUpperCase(),
      };
      this.itinerario_service.saveRegistro(datos).subscribe(
        (response) => {
          console.log(response);
          this.getItinerariosByGrado(parseInt(this.id ? this.id : '0'));
          setTimeout(() => {
            this.esperandoRespuesta = false;
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  getGradoUsuarioById(id: number) {
    this.grado_service.getGradoById(id).subscribe(
      (response) => {
        this.oGrado = response;
      },
      (error) => {}
    );
  }

  getMaterias(id: number) {
    this.materia_service.getMateriasPorGradoUsuario(id).subscribe(
      (response) => {
        this.listMaterias = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  seleccionaMateria() {
    console.log(this.materia_actual);
  }

  getItinerariosByGrado(id: number) {
    this.itinerario_service.getItinerarioByGrado(id).subscribe(
      (response) => {
        this.listItinerarios = response;
      },
      (error) => {}
    );
  }
}
