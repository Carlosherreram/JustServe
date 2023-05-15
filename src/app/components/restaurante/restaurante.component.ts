import { Component } from '@angular/core';
import { Restaurante } from 'src/app/models/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.scss']
})
export class RestauranteComponent {
  public restaurantes: Restaurante[] = [];
  public selectedRestaurante: Restaurante | null = null;
  public showSelectedRestaurante: Restaurante[] = [];

  constructor(public restaurantesService: RestauranteService,
  ) { }

  ngOnInit(): void {


    this.restaurantesService.showRestaurantes().subscribe((rest: Restaurante[]) => {
      this.restaurantes = rest.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    });

  }
}
