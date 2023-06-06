import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public MSG: string = 'Ya registrado'
  private register: boolean = false
  public nameRest: string | null = null; // inicialmente establecido en null
  public isOwner: boolean = false

  constructor(private authService: AuthService, private dataService: DataService) { }

  public onRegister(): void {
    this.authService.login()
  }

  public onOwnerChange(event: any): void {
    if (!event.target.checked) {
      this.nameRest = null; // si el checkbox está desmarcado, establecer en null
    } else {
      this.nameRest = ''; // si está marcado, dejar el campo en blanco
    }
  }

  public onSubmit(): void {
    const nameInput = document.getElementById('nombre') as HTMLInputElement;
    const ageInput = document.getElementById('age') as HTMLInputElement;
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const ownerInput = document.getElementById('owner') as HTMLInputElement;
    const restaurantNameInput = document.getElementById('nameRest') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    if (!this.register) {
      const user: User = {
        name: nameInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        owner: Boolean(ownerInput.checked),
        admin: false,
        password: passwordInput.value,
        age: Number(ageInput.value),
        restaurantName: ownerInput.checked ? restaurantNameInput.value : '',

      };
      this.dataService.postUsers(user).subscribe(
        (userLogged: User) => {
          this.register = true
          this.authService.isLoggedIn = true
          this.dataService.userLogged = userLogged
        },)

    } else {
      const notification = document.querySelector('.notification');
      if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
          notification.classList.remove('show');
        }, 3000);
      }

    }

  }



}
