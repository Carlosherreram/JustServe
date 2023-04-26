import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Restaurante } from 'src/app/models/restaurante.model';
import { User } from 'src/app/models/users.model';
import { Reserva } from 'src/app/models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public restaurantes: Restaurante[] = []
  public users: User[] = []


  constructor(private http: HttpClient) {
    this.getUsers().subscribe((users: User[]) => { this.users = users })
  }

  public getRestaurantes(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>
      ('https://justreserve-40e6a-default-rtdb.firebaseio.com/restaurantes.json')

  }
  public getReserves(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>
      ('https://justreserve-40e6a-default-rtdb.firebaseio.com/reservas.json')

  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>
      ('https://justreserve-40e6a-default-rtdb.firebaseio.com/users.json')

  }
  public postUsers(user: User): Observable<User> {
    return this.http.put<User>(
      'https://justreserve-40e6a-default-rtdb.firebaseio.com/users/'
      + this.users.length + '.json', user);
  }



}
