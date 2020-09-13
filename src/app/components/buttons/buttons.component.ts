import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalculatorUnderhoodService } from 'src/app/services/calculator-underhood.service';
import { parse } from 'path';
import { constants } from 'buffer';

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
    for (let i of this.enteredValue) {
      let operatorCounter = 1
      if (this.operations.includes(i)) {
        let index = this.enteredValue.indexOf(i)
        this.operatorArray.push(index)
        // this.enteredValue = this.removeCharacter(this.enteredValue, index)
        console.log(this.enteredValue)
        this.tempArray.push({ operator: i, value: this.enteredValue.substring(index, this.operatorArray[operatorCounter]) })
        operatorCounter++
        // left = index + 1
        console.log(this.tempArray)
      }
    }
    console.log(this.operatorArray)
  }

  removeCharacter(str, char_pos) {
    let part1 = str.substring(0, char_pos);
    let part2 = str.substring(char_pos + 1, str.length);
    return (part1 + part2);
  }
}