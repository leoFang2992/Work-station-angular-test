import { TestBed } from '@angular/core/testing';

import { PmdService } from './pmd.service';

describe('PmdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PmdService = TestBed.get(PmdService);
    expect(service).toBeTruthy();
  });
});
