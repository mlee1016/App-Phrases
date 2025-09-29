import { TestBed } from '@angular/core/testing';

import { PhrasenameService } from './phrasename.service';

describe('PhrasenameService', () => {
  let service: PhrasenameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhrasenameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
