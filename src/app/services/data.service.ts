import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map, of } from 'rxjs';
import { Restaurante } from 'src/app/models/restaurante.model';
import { User } from 'src/app/models/users.model';
import { Reserva } from 'src/app/models/reserva.model';
import { Carta } from 'src/app/models/carta.model';
import { Mesa } from 'src/app/models/mesas.model';
import { AuthService } from 'src/app/services/auth.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public restaurantes: Restaurante[] = []
  public users: User[] = []
  public reserve: Reserva[] = []

  constructor(private http: HttpClient) {
    this.getUsers().subscribe((users: User[]) => { this.users = users });
    this.getRestaurantes().subscribe((restaurantes: Restaurante[]) => { this.restaurantes = restaurantes });
  }

  public getCartas(): Observable<Carta[]> {
    return this.http.get<Carta[]>('../assets/db.json')
      .pipe(
        map((data: any) => data.Carta)
      );
  }

  public getMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>('../assets/db.json')
      .pipe(
        map((data: any) => data.Mesas)
      );
  }

  public getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>('../assets/db.json')
      .pipe(
        map((data: any) => data.restaurantes)
      );
  }

  public getReserves(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>('../assets/db.json')
      .pipe(
        map((data: any) => data.reservas)
      );
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('../assets/db.json')
      .pipe(
        map((data: any) => data.users)
      );
  }

  public postUsers(user: User): Observable<User> {
    const newId = this.users.length + 1;
    const newUser = { ...user, id: newId };
    this.users.push(newUser);
    return of(newUser);
  }

  // public postReserve(day: string, hour: string, mesa: number, restaurantName: string, numberPers: number): Observable<any> {
  //   const reserva: Reserva = {
  //     userName: this.logged.userName ?? null,
  //     nameRestaurante: restaurantName,
  //     date: new Date(day + 'T' + hour),
  //     idMesa: mesa,
  //     numberPers: numberPers
  //   };

  //   return this.http.post<any>('../assets/db.json' + '/reservas', reserva);
  // }




}
