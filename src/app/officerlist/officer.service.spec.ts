import { TestBed } from '@angular/core/testing';

import { OfficerService } from './officer.service';

describe('OfficerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfficerService = TestBed.get(OfficerService);
    expect(service).toBeTruthy();
  });
});
