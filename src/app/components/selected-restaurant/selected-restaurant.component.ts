import { Component, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/carta.model';
import { Mesa } from 'src/app/models/mesas.model';
import { Restaurante } from 'src/app/models/restaurante.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { RestauranteService } from 'src/app/services/restaurante.service';


@Component({
  selector: 'app-selected-restaurant',
  templateUrl: './selected-restaurant.component.html',
  styleUrls: ['./selected-restaurant.component.scss']
})
export class SelectedRestaurantComponent implements OnInit {
  public selectedRestaurante: Restaurante | null = null;
  public logged = this.authService.isLoggedIn
  public carta: Carta[] = []
  public mesas: Mesa[] = []
  public mesasAvailables: Mesa[] = []
  public days: string[] = []
  public MSG = '';
  public numMonth: string[] = []
  public hour: string = ''
  public selectedDay: string = ''
  public idMesa: number = 0
  public numPersMesa: number = 0
  public hours: string[] = ['12:30', '13:30', '14:30', '15:30', '16:30', '16:30', '20:00', '21:00', '22:00']

  constructor(public restauranteService: RestauranteService,
    private readonly DATA_SERVICE: DataService,
    private readonly authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.selectedRestaurante = this.restauranteService.selectedRestaurante
    this.DATA_SERVICE.getCartas().subscribe((cartas: Carta[]) => {
      this.carta = cartas
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

  public showNotification(message: string, duration: number): void {
    const notification = document.querySelector('.notification');

    if (notification) {
      notification.textContent = message;
      notification.classList.add('show');

      setTimeout(() => {
        notification.classList.remove('show');
      }, duration);
    }
  }


  public cleanSelected(): void {
    console.log('x')
    this.selectedRestaurante = null
    console.log(this.selectedRestaurante)
    console.log('x')
  }

  public searchReserve(start_time: string, date: string, restaurantName: string): Mesa[] {
    if (start_time && date) {
      this.DATA_SERVICE.getMesas().subscribe((mesas: Mesa[]) => {
        this.mesas = mesas
        this.mesas.sort((a, b) => a.comensales - b.comensales);
      })
      return this.mesas
    }
    this.showNotification('FALTAN CAMPOS POR RELLENAR', 3000)
    this.mesas = []
    return this.mesas

  }

  public makeReserve(
    day: string, hour: string, mesa: number, numberPers: number, nameRest: string)
    : void {
    if (day != '' && hour != '' && nameRest != '' && mesa != 0 && numberPers != 0) {
      // this.DATA_SERVICE.postReserve(day, hour, mesa, nameRest, numberPers)
      this.showNotification('RESERVA HECHA', 3000)
      this.DATA_SERVICE.postReserve(day, hour, mesa, nameRest, numberPers, this.authService.userName)
    } else {
      this.showNotification('FALTAN CAMPOS POR RELLENAR', 3000)
    }

  }


}
