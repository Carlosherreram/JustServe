import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public usersBBDD: User[] = []
  public email = ""
  public password = ""

  private readonly USER_LOGGED_COOKIE = 'LOGGED'

  constructor(private authService: AuthService, private dataService: DataService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe((users: User[]) => {
      this.usersBBDD = users

    })
  }
  onLogin() {
    this.authService.login();
  }

  public loginUser(email: string, password: string): void {
    const user = this.usersBBDD.find(user => user.email === email && user.password === password)
    if (user) {
      this.authService.userLogged = []
      this.authService.isLoggedIn = true
      this.authService.userLogged.push(user)
      this.addCookie(this.USER_LOGGED_COOKIE, true)
    }
  }
  private addCookie(key: string, value: unknown, expirationTime?: number | Date): void {
    this.cookieService.set(
      key,
      value as string,
    )
  }
}
