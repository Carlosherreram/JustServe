import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reserva } from 'src/app/models/reserva.model';
import { Restaurante } from 'src/app/models/restaurante.model';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  // public restaurantes: BehaviorSubject<Restaurante[]> = new BehaviorSubject<Restaurante[]>([])

  public userReserves: Reserva[] = []

  constructor(private data: DataService) {
    this.userReservas()
  }


  public userReservas(): Observable<Reserva[]> {
    return this.data.getReserves();
  }

  // public postReservas(reserva: Reserva): Observable<Reserva> {
  //   const newId = this.userReservas.length + 1;
  //   const newUser = { ...user, id: newId };
  //   this.users.push(newUser);
  //   return of(newUser);
  // }





}

