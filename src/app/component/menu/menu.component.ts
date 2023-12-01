import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  onClickSearch(): void {
    let respuesta: string = "Respuesta del servidor";
    let containerHtml: HTMLElement | null = document.getElementById('searchResult');
    if (containerHtml) {
      containerHtml.innerHTML = respuesta;
    } else {
      
    }
  }
}
