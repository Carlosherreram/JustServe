import { Component, OnInit } from '@angular/core';
import { ReservaResponse } from 'src/app/models/reserva-response';
import { Reserva } from 'src/app/models/reserva.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  public reservas: ReservaResponse[] = []
  public date: Date = new Date()
  public logged: boolean = true
  public loaded = false
  public in = this.AUTH_SERVICE.isLoggedIn
  public MSG = ''

  constructor(private reservaService: ReservaService,
    private dataService: DataService,
    private AUTH_SERVICE: AuthService) {
  }

  ngOnInit(): void {
    if (this.in) {
      this.reservaService.getReserves().subscribe((reserve: ReservaResponse[]) => {
        if (reserve && typeof reserve === 'object') {
          this.reservas = Object.values(reserve);
        }
        this.loaded = true
      })
    }

  }

  public updateUserReserves() {
    this.reservaService.getReserves().subscribe((reserve: ReservaResponse[]) => {
      this.reservas = reserve;
    })

  }

  public isReservaExpired(reserva: Reserva): boolean {
    const reserveDate: Date = new Date(reserva.date);
    return reserveDate < this.date;
  }

  public deleteReserve(idReserve: number) {
    this.dataService.deleteReserves(idReserve, this.dataService.token).subscribe(() => {
      this.reservaService.getReserves().subscribe((reserve: ReservaResponse[]) => {
        if (reserve && typeof reserve === 'object') {
          this.reservas = Object.values(reserve);
        }
      })
      const notification = document.querySelector('.notification');

      if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
          notification.classList.remove('show');
        }, 3000);
      }
      this.MSG = `SE HA ELIMINADO LA RESERVA`;

    });

  }

  public updateReserve(idReserve: number, start_time: string) {
    this.reservaService.updateReserve(idReserve, start_time)
  }


}
