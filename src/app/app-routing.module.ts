import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/components/about/about.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { ReservaComponent } from 'src/app/components/reserva/reserva.component';
import { SelectedRestaurantComponent } from 'src/app/components/selected-restaurant/selected-restaurant.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';
import { RestaurantesComponent } from 'src/app/pages/restaurantes/restaurantes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'restaurantes', component: RestaurantesComponent },
  { path: 'restaurantes/selectRestaurante', component: SelectedRestaurantComponent },
  { path: 'home/selectRestaurante', component: SelectedRestaurantComponent },
  { path: 'reservas', component: ReservaComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
