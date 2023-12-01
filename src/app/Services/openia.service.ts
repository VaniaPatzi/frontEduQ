import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpeniaService {

  // private CHATGPT_KEY = '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';
  private CHATGPT_KEY = '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';


  // async generateItinerary(topic: string): Promise<string> {
  //   const bodyRequest = {
  //     model: 'gpt-3.5-turbo',
  //     max_tokens: 250,
  //     messages: [
  //       { role: 'user', content: `Genera un itinerario completo para aprender ${topic} y omite la cortesía` }
  //     ]
  //   };
  //   const request: RequestInit = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${this.CHATGPT_KEY}`
  //     },
  //     body: JSON.stringify(bodyRequest)
  //   };
  //   const response = await fetch('https://api.openai.com/v1/chat/completions', request);
  //   console.log(response);
  //   if (!response.ok) {
  //     throw new Error(`Error en la solicitud: ${response.statusText}`);
  //   }
  //   const responseData = await response.json();
  //   return responseData.choices[0].message.content;
    
  // }
}
