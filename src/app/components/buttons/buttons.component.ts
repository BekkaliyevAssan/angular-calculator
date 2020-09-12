import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalculatorUnderhoodService } from 'src/app/services/calculator-underhood.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<string>()

  public enteredValue: string = ''
  public result: number = 0
  public array = []
  public typeOfPoeration: string
  public operations = ['+', '-', '*', '/']
  constructor(
    private calcService: CalculatorUnderhoodService
  ) { }

  ngOnInit(): void {
  }

  onKeyEnter(val) {
    if(this.operations.includes(val) && val == this.enteredValue[this.enteredValue.length - 1]) {
      console.log('repeated')
    } else {
      if(this.enteredValue === '' && this.operations.includes(val)) {
        console.log('first is operation')
      } else {
        this.enteredValue += val
        this.buttonClick.emit(this.enteredValue)
        console.log('not-repeated')
      }
    }
  }
  
  operationSwitch() {
    if(this.enteredValue) {
      let res = (parseInt(this.enteredValue)) * -1
      this.enteredValue = res.toString()
      this.buttonClick.emit(this.enteredValue)
    }
  }  

  clear() {
    this.enteredValue = ''
    this.buttonClick.emit(this.enteredValue)
  }

  backspace() {
    this.enteredValue = this.enteredValue.substring(0, this.enteredValue.length - 1)
    this.buttonClick.emit(this.enteredValue)
  }

  onResult() {
    if(!this.operations.includes(this.enteredValue[this.enteredValue.length - 1])) {
      this.result = eval(this.enteredValue)
      this.enteredValue = this.result.toString()
      this.buttonClick.emit(this.enteredValue)
    }
    else {
      console.log('enter last number')
    }
  }
}