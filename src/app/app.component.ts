import { Component } from '@angular/core';
import { Operation } from './interfaces/operation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public inputValue: string = ''
  public inputArray = []
  title = 'calculator';

  buttonClick(val) {
    this.inputValue = val
  }
}
