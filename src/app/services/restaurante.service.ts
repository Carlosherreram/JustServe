import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurante } from 'src/app/models/restaurante.model';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  public restaurantes: BehaviorSubject<Restaurante[]> = new BehaviorSubject<Restaurante[]>([])

  public searchRestaurantes: Restaurante[] = []

  public selectedRestaurante: Restaurante | null = null;


  constructor(private data: DataService) {
    this.loadRestaurante()
  }

  public loadRestaurante() {
    this.data.getRestaurantes().subscribe((res: Restaurante[]) => {
      this.restaurantes.next(res)
    })
  }

  public showRestaurantes(): Observable<Restaurante[]> {
    return this.data.getRestaurantes();
  }

  public selectRestaurante(restaurante: Restaurante): void {
    this.selectedRestaurante = restaurante;
  }

  public cleanSelected(): void {
    this.selectedRestaurante = null
  }





}


