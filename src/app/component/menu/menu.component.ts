import { Component } from '@angular/core';
// import OpenAI from 'openai';
import { OpeniaService } from 'src/app/Services/openia.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  // openai = new OpenAI({
  //   organization: 'org-ppADaf576g6b981vvfxhMCpS',
  // });
  topic: string  = '';
  constructor(private openaiService: OpeniaService){}
  // private CHATGPT_KEY: string = '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';

  async onClickSearch(): Promise<void> {
    try {
      const response = await this.openaiService.generateItinerary(this.topic);
      console.log('Respuesta de OpenAI:', response);
      // Aquí puedes manipular la respuesta como desees (por ejemplo, mostrarla en la interfaz)
    } catch (error) {
      console.error('Error al generar el itinerario:', error);
    }
  }
  
  
  
  // async callToChatGpt(promp: string):Promise<string> {
  //   const bodyRequest : Record<string,unknown> = {
  //     model: 'gtp-3.5-turbo',
  //     max_tokens: 250,
  //     message: [
  //       {role: 'user', content: promp}
  //     ]
  //   }
  //   const request : RequestInit ={
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.CHATGPT_KEY}`
  //     },
  //     body: JSON.stringify(bodyRequest)
  //   };
  //   const response = await fetch('https://api.openai.com/v1/chat/completions', request);
  //   if (!response.ok) {
  //     throw new Error(`Error en la solicitud: ${response.statusText}`);
  //   }
  //   const responseData = await response.json();
  //   return responseData.choices[0].message.content
  //   // console.log(responseData);
  // }
  // getPromp(){
  //   return `generame un intinerario completo para aprender calculo I y omite la cortecia`;
  // }

}
