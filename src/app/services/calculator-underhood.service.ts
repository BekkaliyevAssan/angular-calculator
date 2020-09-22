import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorUnderhoodService {
  isSidebarVisible: boolean = true
  sidebarVisibleChange: Subject<boolean> = new Subject<boolean>()
  public tempHistory = []
  history
  historyAdd: Subject<any> = new Subject<any>()

  constructor() { 
    this.sidebarVisibleChange.subscribe(data => {
      this.isSidebarVisible = data
    })
    this.historyAdd.subscribe(value => {
      this.history = value
    })
  }

  onResult(array) {
    let tempResult = 0
    array.forEach(val => {
      tempResult += parseInt(val.value)
    })
    console.log(tempResult, 'this is forEach result')
  }
  toggleSidebar() {
    this.sidebarVisibleChange.next(!this.isSidebarVisible)
  }

  onAddHistory(value) {
    this.tempHistory.push(value)
    this.historyAdd.next(this.tempHistory)
    console.log(this.history)
  }

}
