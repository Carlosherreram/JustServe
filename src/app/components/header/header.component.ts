import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger?.addEventListener('click', () => {
      menu?.classList.toggle('active');
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

  enviarLogReg(login: boolean) {
    this.authService.setloginP(login);
  }

  logOut() {
    this.authService.isLoggedIn = false;
  }
}
