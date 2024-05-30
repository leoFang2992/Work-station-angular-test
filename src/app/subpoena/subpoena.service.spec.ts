import { TestBed } from '@angular/core/testing';

import { SubpoenaService } from './subpoena.service';

describe('SubpoenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubpoenaService = TestBed.get(SubpoenaService);
    expect(service).toBeTruthy();
  });
});
