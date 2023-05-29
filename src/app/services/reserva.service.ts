import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReservaResponse } from 'src/app/models/reserva-response';
import { Reserva } from 'src/app/models/reserva.model';
import { Restaurante } from 'src/app/models/restaurante.model';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  public restaurantes: BehaviorSubject<Restaurante[]> = new BehaviorSubject<Restaurante[]>([])

  public userReserves: Reserva[] = []

  constructor(private data: DataService) {
    this.getReserves()
  }


  public getReserves(): Observable<ReservaResponse[]> {
    return this.data.getReserves(this.data.token);
  }

  public deleteReserve(id: number, token: string) {
    this.data.deleteReserves(id, token)
  }

  public updateReserve(id: number, start_time: string) {
    return this.data.updateReserva(id, start_time)
  }





}


