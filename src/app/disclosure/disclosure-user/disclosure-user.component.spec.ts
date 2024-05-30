import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosureUserComponent } from './disclosure-user.component';

describe('DisclosureUserComponent', () => {
  let component: DisclosureUserComponent;
  let fixture: ComponentFixture<DisclosureUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclosureUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosureUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
