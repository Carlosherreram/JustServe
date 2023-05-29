import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, of, tap } from 'rxjs';
import { Restaurante } from 'src/app/models/restaurante.model';
import { User } from 'src/app/models/users.model';
import { Reserva } from 'src/app/models/reserva.model';
import { Carta } from 'src/app/models/carta.model';
import { Mesa } from 'src/app/models/mesas.model';
import { stringify } from 'querystring';
import { LoginResponse } from 'src/app/models/login-response';
import { ReservaResponse } from 'src/app/models/reserva-response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public restaurantes: Restaurante[] = []
  public users: User[] = []
  public userLogged: User | undefined
  public reserve: Reserva[] = []
  public userReserves: ReservaResponse[] = []
  public token: string = ''
  private readonly URL = "http://cherrera.randion.es/ProyectoFinal/despliegueProyectoBack/public/api/"
  private readonly URL_JSON = "../assets/db.json"

  constructor(private http: HttpClient) {
    this.getUsers().subscribe((users: User[]) => { this.users = users });
    this.getRestaurantes().subscribe(x => this.restaurantes = x)
  }
  // CHECK USER
  public login(user: User): Observable<string> {
    return this.http.post<LoginResponse>(this.URL + 'login', user).pipe(
      map((loginResponse: LoginResponse) => loginResponse.token)
    );
  }


  // CARTA
  public getCartas(): Observable<Carta[]> {
    return this.http.get<Carta[]>('../assets/db.json')
      .pipe(
        map((data: any) => data.Carta)
      );
  }

  // RECOGER MESAS
  public getMesas(): Observable<Mesa[]> {
    // this.URL+'available'
    return this.http.get<Mesa[]>('../assets/db.json')
      .pipe(
        map((data: any) => data.Mesas)
      );
  }

  // ALL RESTAURANTS
  public getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(this.URL + 'restaurants')
      .pipe(
        map((data: any) => data)
      );
  }

  // RESERVAS CRUD
  public getReserves(token: string): Observable<ReservaResponse[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ReservaResponse[]>(this.URL + 'bookings', { headers })
      .pipe(
        map((reservas: ReservaResponse[]) => this.userReserves = reservas)
      );
  }

  public updateReserva(id: number, start_time: string) {
    return this.http.patch(this.URL + 'bookings/' + id, start_time)
  }

  public deleteReserves(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(this.URL + 'bookings/' + id, { headers });
  }

  public postReserve(
    day: string, hour: string, mesa: number,
    restaurantName: string, numberPers: number, userName: string,
    token: string)
    : Observable<Reserva> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const reserervaTot = {
      date: day,
      start_time: hour,
      table_id: mesa
    }
    return this.http.post<Reserva>(this.URL + 'bookings', reserervaTot, { headers });
  }

  // USERRS GET - POST
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL + 'users')
      .pipe(
        map((data: any) => data)
      );
  }

  public postUsers(user: User): Observable<User> {
    return this.http.post<User>(this.URL + 'register', user);
  }






}
