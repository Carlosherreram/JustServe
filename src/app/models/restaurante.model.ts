import { User } from "src/app/models/users.model";

export interface Restaurante {
  name: string;
  food: string;
  location: string;
  owner?: string;
}
