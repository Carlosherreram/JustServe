import { Component, OnInit, OnDestroy } from '@angular/core';

import { Restaurante } from 'src/app/models/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public restaurantes: Restaurante[] = []
  private data: Restaurante[] = []
  public searchRestaurantes: Restaurante[] = []
  public totalLocations: string[] = []
  public totalFood: string[] = []
  public foodSelect = ""
  public locationSelect = ""
  public MSG = '';
  constructor(private restauranteService: RestauranteService) {
    this.getDataOfRestaurants()
  }
  ngOnInit(): void {

  }
  getCombi(food: string, location: string) {
    this.searchRestaurantes = []
    this.searchRestaurantes = this.data.filter(restaurantes =>
      restaurantes.food === food && restaurantes.location === location)

    if (this.searchRestaurantes.length === 0) {
      this.searchRestaurantes = this.data.filter(restaurantes =>
        restaurantes.location === location)
      const notification = document.querySelector('.notification');
      if (notification) {
        notification.classList.add('show');
        setTimeout(() => {
          notification.classList.remove('show');
        }, 3000);
      }
      this.MSG = `No existe ningun restaurante con esa combinacion,
  por defecto se mostraran los restaurantes con las misma localidad`;
    }
  }

  private getLocations() {
    this.data.forEach(restaurante => {
      if (!this.totalLocations.includes(restaurante.location)) {
        this.totalLocations.push(restaurante.location)
      }
    })
    this.totalLocations = this.totalLocations.sort()
  }

  private getFood() {
    this.data.forEach(restaurante => {
      if (!this.totalFood.includes(restaurante.food)) {
        this.totalFood.push(restaurante.food)
      }
    })
    this.totalFood = this.totalFood.sort()
  }
  private getDataOfRestaurants(): void {
    this.restauranteService.showRestaurantes().subscribe((restaurantes: Restaurante[]) => {
      this.data = restaurantes
      this.getLocations()
      this.getFood()
    })
  }

}
