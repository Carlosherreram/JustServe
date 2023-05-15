import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReservaService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss']
})
export class ReservaComponent implements OnInit {
  public reservas: Reserva[] = []
  public date: Date = new Date()

  constructor(private reservaService: ReservaService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.reservaService.userReservas().subscribe((reserve: Reserva[]) => {
      this.reservas = reserve;
      this.checkUserReserve()
    })


  }

  private checkUserReserve(): void {
    if (this.authService.userLogged) {
      this.reservas = this.reservas.filter(reserva =>
        reserva.userName === this.authService.userLogged[0].name
      );
    }
  }


  public isReservaExpired(reserva: Reserva): boolean {
    const reserveDate: Date = new Date(reserva.date);
    return reserveDate < this.date;
  }


}
