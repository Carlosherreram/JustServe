import { Restaurante } from "src/app/models/restaurante.model";

export interface User {
  id?: number;
  name: string;
  username: string;
  age: number;
  email: string;
  password: string;
  owner: boolean;
  admin?: boolean;
  restaurantName?: string | null;
}
