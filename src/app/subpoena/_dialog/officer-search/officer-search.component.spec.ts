import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerSearchComponent } from './officer-search.component';

describe('OfficerSearchComponent', () => {
  let component: OfficerSearchComponent;
  let fixture: ComponentFixture<OfficerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
