import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public MSG: string = 'Ya registrado'
  private register: boolean = false
  public nameRest: string | null = null; // inicialmente establecido en null
  public isOwner: boolean = false

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.login()
  }

  onOwnerChange(event: any) {
    if (!event.target.checked) {
      this.nameRest = null; // si el checkbox está desmarcado, establecer en null
    } else {
      this.nameRest = ''; // si está marcado, dejar el campo en blanco
    }
  }

  onSubmit() {

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
        age: Number(ageInput.value),
        username: usernameInput.value,
        email: emailInput.value,
        owner: Boolean(ownerInput.checked),
        restaurantName: ownerInput.checked ? restaurantNameInput.value : '',
        password: passwordInput.value,
        id: Number(this.dataService.getUsers.length + 2)

      };
      this.register = true
      this.authService.isLoggedIn = true
      this.dataService.postUsers(user).subscribe(
        (response: any) => {
          console.log(response);
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
