import { TestBed } from '@angular/core/testing';

import { EvaluationRecordService } from './evaluation-record.service';

describe('EvaluationRecordService', () => {
  let service: EvaluationRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
