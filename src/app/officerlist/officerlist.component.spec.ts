import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerlistComponent } from './officerlist.component';

describe('OfficerlistComponent', () => {
  let component: OfficerlistComponent;
  let fixture: ComponentFixture<OfficerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
