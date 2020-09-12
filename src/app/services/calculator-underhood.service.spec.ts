import { TestBed } from '@angular/core/testing';

import { CalculatorUnderhoodService } from './calculator-underhood.service';

describe('CalculatorUnderhoodService', () => {
  let service: CalculatorUnderhoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorUnderhoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
