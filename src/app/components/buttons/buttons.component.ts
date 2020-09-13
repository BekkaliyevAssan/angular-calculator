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
    if (val === '.' && this.enteredValue.includes('.')) {
      console.log('there is already .')
    }
    else {
      if (this.operations.includes(val) && val == this.enteredValue[this.enteredValue.length - 1] || val === '.' && val == this.enteredValue[this.enteredValue.length - 1]) {
        console.log('repeated')
      } else {
        if (this.enteredValue === '' && this.operations.includes(val) || val === '0' && this.enteredValue === '') {
          console.log('first is operation')
        } else {
          this.enteredValue += val
          this.buttonClick.emit(this.enteredValue)
          console.log('not-repeated')
        }
      }
    }
  }

  operationSwitch() {
    if (this.enteredValue) {
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

  onKeyEnterPercent() {
    // if(this.enteredValue !== '' && this.enteredValue[this.enteredValue.length - 1] !== '%') {
    //   this.enteredValue += '%'
    //   this.buttonClick.emit(this.enteredValue)

    //   let percent = parseInt(this.enteredValue) / 100
    // }
    // else console.log('operator error')
  }

  onKeyEnterRoot() {
    // if(this.enteredValue[this.enteredValue.length - 1] !== '√') {
    //   this.enteredValue += '√'
    //   this.buttonClick.emit(this.enteredValue)
    // }
    //   else {
    //   console.log('root square repeat')
    // }
  }

  public tempArray = []
  public operatorArray = []
  onResult() {
    for (let i = 0; i < this.enteredValue.length; i++) {
      if (this.operations.includes(this.enteredValue.charAt(i))) {
        this.operatorArray.push(i)
        let value = this.enteredValue.substring(i + 1).split(/[\s,+,*,/ -]+/)
        this.tempArray.push({ operator: this.enteredValue.charAt(i), value: value[0] })
      }
    }
    console.log(this.operatorArray)
    console.log(this.tempArray)
  }
}