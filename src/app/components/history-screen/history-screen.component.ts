import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalculatorUnderhoodService } from 'src/app/services/calculator-underhood.service';

@Component({
  selector: 'app-history-screen',
  templateUrl: './history-screen.component.html',
  styleUrls: ['./history-screen.component.css']
})
export class HistoryScreenComponent implements OnInit {
  @Output() fromHistory = new EventEmitter<string>()

  constructor(private service: CalculatorUnderhoodService) { }

  ngOnInit(): void {
  }

  get data() {
    return this.service.history
  }

  onReturnExp(val) {
    this.fromHistory.emit(val)
  }

}
