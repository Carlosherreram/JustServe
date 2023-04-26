import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public usersBBDD: User[] = []
  public email = ""
  public password = ""

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe((users: User[]) => {
      this.usersBBDD = users

    })
  }
  onLogin() {
    this.authService.login();
  }

  loginUser(email: string, password: string) {
    const user = this.usersBBDD.find(user => user.email === email && user.password === password)
    if (user) {
      this.authService.userLogged = []
      this.authService.isLoggedIn = true
      this.authService.userLogged.push(user)
    }
  }

}
