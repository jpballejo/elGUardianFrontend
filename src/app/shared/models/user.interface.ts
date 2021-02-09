import {Direccion} from './direccion';
import {Mascota} from './mascota';
import { Reserva } from "./reserva";
export type Roles = 'USER' | 'ADMIN' | 'CLIENT'; // | 'EDITOR'

export interface User {
  uid: string,
  email?: string,
  displayName?: string,
  emailVerified: boolean,
  photoURL?: string,
  role?: Roles,
  name?: String,
  apellido?: String,
  celular?: String,
  phoneNumber?: String,
  mascotas?:Mascota[],
  reservas?:Reserva[],
  direccion?:Direccion,
}
