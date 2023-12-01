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
  private CHATGPT_KEY: string = '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';
  
  
  async onClickSearch(): Promise<void> {
    
  //   try {
  //     const peticion = {
  //         "id": "chatcmpl-abc123",
  //         "object": "chat.completion",
  //         "created": 1677858242,
  //         "model": "gpt-3.5-turbo-1106",
  //         "usage": {
  //             "prompt_tokens": 13,
  //             "completion_tokens": 7,
  //             "total_tokens": 20
  //         },
  //         "choices": [
  //             {
  //                 "message": {
  //                     "role": "assistant",
  //                     "content": "\n\nThis is a test!"
  //                 },
  //                 "finish_reason": "stop",
  //                 "index": 0
  //             }
  //         ]
  //     };
  
  //     const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             // Add your OpenAI API key here
  //             'Authorization': 'Bearer '+ this.CHATGPT_KEY,
  //             "OpenAI-Organization" : "org-ppADaf576g6b981vvfxhMCpS"
  //         },
  //         body: JSON.stringify(peticion)
  //     });
  
  //     console.log(response)
  
  // } catch (error) {
  //     console.error('Error al generar el itinerario:', error);
  // }
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
