import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosureAddComponent } from './disclosure-add.component';

describe('DisclosureAddComponent', () => {
  let component: DisclosureAddComponent;
  let fixture: ComponentFixture<DisclosureAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclosureAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
