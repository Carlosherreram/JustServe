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
  public MSG = '';
  public userName = ''


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
      this.userName = user.name
      this.authService.userName = this.userName
      const token = "aquí_debes_tener_el_token_generado_en_el_backend";
      this.addCookie(this.USER_LOGGED_COOKIE, token);
    }
    else {
      const notification = document.querySelector('.notification');
      if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
          notification.classList.remove('show');
        }, 3000);
      }
      this.MSG = `CREDENCIALES INCORRECTAS`;
    }
  }

  public checkSession() {
    if (this.cookieService.get('LOGGED') === 'true') {
    } else {
    }
  }

  public logout() {
    this.cookieService.delete('LOGGED');
  }

  private addCookie(key: string, value: string, expirationTime?: number | Date): void {
    const expirationDate = expirationTime ? new Date(expirationTime) : new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hora en milisegundos

    this.cookieService.set(key, value, expirationDate, '/');
  }

}
