import { TestBed } from '@angular/core/testing';

import { AllphrasesService } from './allphrases.service';

describe('AllphrasesService', () => {
  let service: AllphrasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllphrasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
