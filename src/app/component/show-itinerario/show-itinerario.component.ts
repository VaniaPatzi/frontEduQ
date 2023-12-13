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
  oItinerario: Itinerario = new Itinerario();
  oGrado: GradoUsuario = new GradoUsuario();
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
}
