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

  constructor(
    private calcService: CalculatorUnderhoodService
  ) { }

  ngOnInit(): void {
    console.log(eval("2*3"))
  }

  onKeyEnter(val) {
    this.enteredValue += val
    console.log(this.enteredValue)
    this.buttonClick.emit(this.enteredValue)
  }
  
  operationSwitch() {

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
    this.result = eval(this.enteredValue)
    this.enteredValue = this.result.toString()
    this.buttonClick.emit(this.enteredValue)
  }
}