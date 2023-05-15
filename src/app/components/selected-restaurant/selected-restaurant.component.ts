import { Component, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/carta.model';
import { Mesa } from 'src/app/models/mesas.model';
import { Restaurante } from 'src/app/models/restaurante.model';
import { DataService } from 'src/app/services/data.service';
import { RestauranteService } from 'src/app/services/restaurante.service';


@Component({
  selector: 'app-selected-restaurant',
  templateUrl: './selected-restaurant.component.html',
  styleUrls: ['./selected-restaurant.component.scss']
})
export class SelectedRestaurantComponent implements OnInit {
  public selectedRestaurante: Restaurante | null = null;
  public carta: Carta[] = []
  public mesas: Mesa[] = []
  public days: string[] = []
  public numMonth: string[] = []
  public hour: string = ''
  public hours: string[] = ['12:30', '13:30', '14:30', '15:30', '16:30', '16:30', '20:00', '21:00', '22:00']

  constructor(public restauranteService: RestauranteService,
    private readonly DATA_SERVICE: DataService,
  ) {

  }

  ngOnInit(): void {
    this.selectedRestaurante = this.restauranteService.selectedRestaurante
    this.DATA_SERVICE.getCartas().subscribe((cartas: Carta[]) => {
      this.carta = cartas
    })
    this.DATA_SERVICE.getMesas().subscribe((mesas: Mesa[]) => {
      this.mesas = mesas
      this.mesas.sort((a, b) => a.comensales - b.comensales);
    })
    const today = new Date();

    for (let i = 0; i < 8; i++) {
      const nextWeek = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const options: {
        weekday?: 'long' | 'short' | 'narrow';
        day?: 'numeric' | '2-digit';
      } = { weekday: 'long', day: 'numeric' }
      let nextWeek1 = nextWeek.toLocaleString('es', options);

      this.days.push(nextWeek1);
    }
  }



  public cleanSelected(): void {
    console.log('x')
    this.selectedRestaurante = null
    console.log(this.selectedRestaurante)
    console.log('x')
  }

  public makeReserve(): void {

  }


}
