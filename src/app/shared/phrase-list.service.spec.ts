import { TestBed } from '@angular/core/testing';

import { PhraseListService } from './phrase-list.service';

describe('PhraseListService', () => {
  let service: PhraseListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhraseListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
