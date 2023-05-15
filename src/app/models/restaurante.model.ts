import { Carta } from "src/app/models/carta.model";

export interface Restaurante {
  name: string,
  food: string,
  location: string,
  owner?: string,
}
