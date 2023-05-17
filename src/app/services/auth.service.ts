import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users.model';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = false

  public loginP: boolean = true

  public userLogged: User[] = []


  constructor(public dataService: DataService) { }

  public getUsers(): Observable<User[]> {
    return this.dataService.getUsers();
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  setloginP(value: boolean): void {
    this.loginP = value;
  }

  getloginP(): boolean {
    return this.loginP;
  }
}
