import { Injectable } from '@angular/core';
//declaro los nombres del arreglo en funcion de la resolucion
export const CustomBreakpointNames = {
  extraSmall: 'extraSmall',
  extraLarge: 'extraLarge',
  altoNormal:'altoNormal',
  altoBajo:'altoBajo',
};
@Injectable({
  providedIn: 'root'
})

export class BreakpointsService {
  breakpoints: object = {
    '(max-width: 590px)': CustomBreakpointNames.extraSmall,//aca asigno una resolucion al nombre
    '(min-width: 660px)': CustomBreakpointNames.extraLarge,
    '(max-heigth: 700px)':CustomBreakpointNames.altoNormal,
    '(min-heigth: 400px)':CustomBreakpointNames.altoBajo,

  };

  getBreakpoints(): string[] {//retorno las claves de breakpoint
    return Object.keys(this.breakpoints);
  }

  getBreakpointName(breakpointValue): string {//retorno los nombres de breakpoint
    return this.breakpoints[breakpointValue];
  }
  constructor() {

  }
}
