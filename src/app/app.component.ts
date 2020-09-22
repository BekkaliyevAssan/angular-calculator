import { Component } from '@angular/core';
import { Operation } from './interfaces/operation';
import { CalculatorUnderhoodService } from './services/calculator-underhood.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public inputValue: string = ''
  public inputArray = []
  public manuallyEntered

  public fromHistoryValue
  
  title = 'calculator';
  constructor(private service: CalculatorUnderhoodService) {}
  buttonClick(val) {
    this.inputValue = val
  }

  onManualEnter(value) {
    this.manuallyEntered = value
    console.log(value)
  }

  get isVisible(): boolean{
    return this.service.isSidebarVisible
  }

  toggleSidebar() {
    this.service.toggleSidebar()
  }

  fromHistory(val) {
    this.fromHistoryValue = val
  }
}
