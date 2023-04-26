import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/models/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  public offerRestaurantes: Restaurante[] = []

  constructor(private restauranteService: RestauranteService) {
    this.getRestaurants()
  }
  ngOnInit(): void {

  }

  getOffersRestaurants(): void {
    const finalOffers = this.offerRestaurantes.filter(
      restaurant => restaurant.food === 'burguer')
    // this.offerRestaurantes = this.offerRestaurantes.filter(
    //   restaurant => restaurant.food === 'burguer')
    this.offerRestaurantes = finalOffers
  }
  private getRestaurants(): void {
    this.restauranteService.showRestaurantes().subscribe((offerRest: Restaurante[]) => {
      this.offerRestaurantes = offerRest
      this.getOffersRestaurants()
    })

  }


}
