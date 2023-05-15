import { Component, OnInit } from '@angular/core';
import { RestauranteComponent } from 'src/app/components/restaurante/restaurante.component';
import { AuthService } from 'src/app/services/auth.service';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService,
    public restauranteService: RestauranteService
  ) { }

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
