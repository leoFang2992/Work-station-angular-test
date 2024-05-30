import { TestBed } from '@angular/core/testing';

import { DialogAlertService } from './dialog-alert.service';

describe('DialogAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DialogAlertService = TestBed.get(DialogAlertService);
    expect(service).toBeTruthy();
  });
});
