import { TestBed } from '@angular/core/testing';

import { DisclosureService } from './disclosure.service';

describe('DisclosureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisclosureService = TestBed.get(DisclosureService);
    expect(service).toBeTruthy();
  });
});
