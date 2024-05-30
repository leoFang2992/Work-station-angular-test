import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosureEditComponent } from './disclosure-edit.component';

describe('DisclosureEditComponent', () => {
  let component: DisclosureEditComponent;
  let fixture: ComponentFixture<DisclosureEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclosureEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
