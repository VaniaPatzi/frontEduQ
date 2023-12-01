import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpeniaService {

<<<<<<< HEAD
  private CHATGPT_KEY = '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';
=======
  private CHATGPT_KEY = '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';
>>>>>>> b75dfc68bf6311961eda9659f1072142f44a9c71

  async generateItinerary(topic: string): Promise<string> {
    const bodyRequest = {
      engine: 'davinci',
      prompt: `Genera un itinerario completo para aprender ${topic} y omite la cortesía`,
      max_tokens: 250,
    };

    const request: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.CHATGPT_KEY}`
      },
      body: JSON.stringify(bodyRequest)
    };

    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', request);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

      const responseData = await response.json();
      return responseData.choices[0].text;
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      throw error;  // Lanzar el error para que se maneje en el componente
    }
  }
}
