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

  public userName = ''

  public token = ''


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

  public addCookie(key: string, value: string): void {
    document.cookie = `${key} = ${value}; path = /`
  }

  public getUserCookie(): String {
    const token = document.cookie
    const requ = "LOGGED="
    let res = false
    let temp = ""
    for (let i = 0; i < token.length; i++) {
      if (token[i] == ";" && res == true) {
        return temp
      }
      if (token[i] == requ[0]) {
        let count = 0
        for (let x = 0; x < requ.length; x++) {
          if (requ[x] == token[i + x]) {
            count++
          }
        }
        if (count == requ.length) {
          res = true
          i += requ.length - 1
        }
      }
      else if (res == true) {
        temp += token[i]
      }
    }
    return temp

  }
}
