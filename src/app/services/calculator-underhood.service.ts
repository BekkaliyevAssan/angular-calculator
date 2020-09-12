import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorUnderhoodService {

  constructor() { }

  onResult(array) {
    let tempResult = 0
    array.forEach(val => {
      tempResult += parseInt(val.value)
    })
    console.log(tempResult, 'this is forEach result')
  }
}
