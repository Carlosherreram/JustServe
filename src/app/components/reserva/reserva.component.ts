import { Component, OnInit } from '@angular/core';
import { ReservaResponse } from 'src/app/models/reserva-response';
import { Reserva } from 'src/app/models/reserva.model';
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

  constructor(private reservaService: ReservaService,
    private dataService: DataService) {
  }

  ngOnInit(): void {
    this.reservaService.getReserves().subscribe((reserve: ReservaResponse[]) => {
      if (reserve && typeof reserve === 'object') {
        this.reservas = Object.values(reserve);
      }
      this.loaded = true
      console.log(this.reservas)
    })

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

    });

  }

  public updateReserve(idReserve: number, start_time: string) {
    this.reservaService.updateReserve(idReserve, start_time)
  }


}
