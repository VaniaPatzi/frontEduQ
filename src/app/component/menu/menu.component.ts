import { Component } from '@angular/core';
// import OpenAI from 'openai';
import { OpeniaService } from 'src/app/Services/openia.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  // openai = new OpenAI({
  //   organization: 'org-ppADaf576g6b981vvfxhMCpS',
  // });
  topic: string = '';
  respuestaGPT: string = '';
  esperandoRespuesta: boolean = false;
  constructor(private openaiService: OpeniaService) {}
  private CHATGPT_KEY: string =
    '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';
  // private CHATGPT_KEY: string = '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';

  async onClickSearch(): Promise<void> {
    // console.log('asdasd');
    this.esperandoRespuesta = true;
    let mensaje = 'Generame un plan de estudios semanal para ' + this.topic;
    // console.log(this.topic);
    // console.log(mensaje);

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
      setTimeout(() => {
        this.esperandoRespuesta = false;
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  /*
"Aquí tienes un posible plan de estudios semanal para el curso de Cálculo 1:\n\nDía 1:\n- Repasar los conceptos básicos de derivadas.\n- Resolver ejercicios de derivadas de funciones algebraicas.\n- Estudiar la regla del producto y del cociente para derivadas.\n- Resolver ejercicios utilizando estas reglas.\n- Resolver problemas de aplicación de derivadas.\n\nDía 2:\n- Repasar los conceptos básicos de integrales.\n- Resolver ejercicios de integrales indefinidas.\n- Estudiar la regla del cambio de variable en integrales.\n- Resolver ejercicios utilizando esta regla.\n- Resolver problemas de aplicación de integrales.\n\nDía 3:\n- Estudiar las integrales definidas y sus propiedades.\n- Resolver ejercicios de cálculo de áreas bajo la curva.\n- Resolver ejercicios utilizando el teorema fundamental del cálculo.\n- Resolver problemas de aplicación de integrales definidas.\n\nDía 4:\n- Estudiar las técnicas de integración por partes.\n- Resolver ejercicios utilizando esta técnica.\n- Estudiar las integrales trigonométricas y sus propiedades.\n- Resolver ejercicios de integración de funciones trigonométricas.\n\nDía 5:\n- Repasar los conceptos de series infinitas.\n- Estudiar la convergencia de series infinitas.\n- Resolver ejercicios de convergencia y divergencia de series.\n- Resolver ejercicios de sumas de series infinitas.\n\nDía 6:\n- Estudiar las series de potencias y sus propiedades.\n- Resolver ejercicios de convergencia y divergencia de series de potencias.\n- Resolver ejercicios de sumas de series de potencias.\n- Resolver problemas de aplicación de series de potencias.\n\nDía 7:\n- Repasar todos los conceptos y ejercicios vistos durante la semana.\n- Resolver problemas prácticos y agregar ejercicios adicionales.\n- Hacer una revisión general de lo aprendido.\n\nRecuerda adaptar este plan de estudios a tus necesidades y disponibilidad de tiempo. También es importante complementarlo con la lectura de libros de texto y la consulta de material adicional en línea."
 */
}
