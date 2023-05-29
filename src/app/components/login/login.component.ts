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
  public username = ""
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

  public loginUser(username: string, password: string): void {
    if (username != '' && password != '') {
      const user = { username, password }
      this.dataService.login(user)
        .subscribe((token: string) => {
          this.dataService.token = token
          this.authService.addCookie(this.USER_LOGGED_COOKIE, this.dataService.token);
          if (this.dataService.token != '') {
            this.authService.userLogged = []
            this.authService.isLoggedIn = true
            const keepUser = this.usersBBDD.find(user => user.username === username)
            if (keepUser !== undefined) {
              this.authService.userLogged.push(keepUser);
            }
            // this.userName = this.authService.userLogged.map((usernam: string)=> usernam.)
            this.authService.userName = this.userName
          }
        })


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

}
