import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CalculatorUnderhoodService } from 'src/app/services/calculator-underhood.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<string>()

  @Input() enteredValue: string = ''
  public result: number = 0
  public array = []
  public typeOfPoeration: string
  public operations = ['+', '-', '*', '/']
  public multDelOperations = ['*', '/']
  constructor(
    private calcService: CalculatorUnderhoodService
  ) { }

  ngOnInit(): void {
  }

  onKeyEnter(val) {
    if (val === '.' && this.enteredValue.includes('.') || val === '√' && this.enteredValue[this.enteredValue.length - 1] === '√') {
      console.log('there is repeated sign')
    }
    if(val === '%' && this.enteredValue[this.enteredValue.length - 1] === '%' || this.enteredValue[this.enteredValue.length - 1] === '%' && !this.operations.includes(val)) {
      console.log('value after % not allowed')
    }
    // else if(val === '%' && this.enteredValue.charAt(0) === '%' || val === '√' && this.enteredValue[this.enteredValue.length - 1] === '%') {
    //   console.log('there is smth wrong with %')
    // }
    else {
      if (this.operations.includes(val) && val == this.enteredValue[this.enteredValue.length - 1] || 
          val === '.' && val == this.enteredValue[this.enteredValue.length - 1] || 
          this.operations.includes(val) && this.operations.includes(this.enteredValue[this.enteredValue.length - 1])) {
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
  // variable for define index of last operator to delete last entered operation
  public lastOperator = 0
  clearEntry() {   
    //if enteredValue contains only value, not bunch of operations 
    let tempCe = this.enteredValue.split(/[\s,+,*,/ -]+/)
    if(tempCe.length < 2) this.clear()

    for(let i = 0; i < this.enteredValue.length; i++) {
      if(this.operations.includes(this.enteredValue[i])) {
        this.lastOperator = i
      }
    }
    this.enteredValue = this.enteredValue.substring(0, this.lastOperator)
    this.buttonClick.emit(this.enteredValue)
  }

  operationSwitch() {
    
  }

  clear() {
    this.enteredValue = ''
    this.buttonClick.emit(this.enteredValue)
    this.tempArray = []
    this.operatorArray = []
  }

  backspace() {
    this.enteredValue = this.enteredValue.substring(0, this.enteredValue.length - 1)
    this.buttonClick.emit(this.enteredValue)
  }

  onKeyEnterPercent() {
  }

  public tempArray = []
  public operatorArray = []
  onResult() {
    if(this.tempArray.length == 0)
    this.tempArray.push({operator: 'first', value: this.enteredValue.split(/[\s,+,*,/ -]+/)[0]})
    for (let i = 0; i < this.enteredValue.length; i++) {
      if (this.operations.includes(this.enteredValue.charAt(i))) {
        this.operatorArray.push(i)
        let value = this.enteredValue.substring(i + 1).split(/[\s,+,*,/ -]+/)
        this.tempArray.push({ operator: this.enteredValue.charAt(i), value: value[0] })
      }
    }
    
    let firstVal = this.tempArray[0].value
    //check if first value has a root sqrt
    if(firstVal.includes('√') && firstVal.charAt(0) == '√') {
      firstVal = Math.sqrt(firstVal.substring(1))
    }
    else if(firstVal.includes('√') && firstVal.charAt(0) != '√') {
      let tempVal = firstVal.split('√')
      firstVal = tempVal[0] * Math.sqrt(tempVal[1])
    }
    else if(firstVal.includes('%')) {
      firstVal = parseInt(firstVal)/100
    }
    //set first value of the entered value
    let tempRes = firstVal
    //check if second operation is root or not

    console.log(this.tempArray)
  for(let i = 1; i < this.tempArray.length; i++) {

    let currentVal = this.tempArray[i].value
    let currentOperator = this.tempArray[i].operator
    //for root sqrt without value before the root
    if(currentVal.includes('√') && currentVal.charAt(0) == '√') {
      let tempVal = currentVal.substring(1)
      this.tempArray[i].value = Math.sqrt(tempVal)
    }
    //for root sqrt with value before 
    else if( currentVal.includes('√') && currentVal.charAt(0) != '√') {
      let tempVal = currentVal.split('√')
      this.tempArray[i].value = tempVal[0] * Math.sqrt(tempVal[1])
    }
    //does the current operation has a % and it has multi del operations
    if(currentVal.includes('%') && this.multDelOperations.includes(currentOperator)) {
      this.tempArray[i].value = parseInt(currentVal) / 100
      console.log('there is multi || del operation on this value')
    }
    //does the current operation has a % and it has'n mulit del operations
    else if(currentVal.includes('%') && !this.multDelOperations.includes(currentOperator)) {
      let firstOperand = this.tempArray[i - 1].value
      let percent = parseInt(firstOperand) / 100 * parseInt(currentVal)
      this.tempArray[i].value = percent
    }
    tempRes += this.tempArray[i].operator + this.tempArray[i].value
  }
  //show the final result
  this.tempArray = []
  this.enteredValue = eval(tempRes)
  this.tempArray.push({operator: 'first', value: eval(tempRes).toString()})
  console.log(eval(tempRes))
  this.buttonClick.emit(eval(tempRes))
  console.log(this.tempArray, 'array')
  }
}