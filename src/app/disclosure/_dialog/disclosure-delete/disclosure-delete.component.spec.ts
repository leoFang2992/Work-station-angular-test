import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosureDeleteComponent } from './disclosure-delete.component';

describe('DisclosureDeleteComponent', () => {
  let component: DisclosureDeleteComponent;
  let fixture: ComponentFixture<DisclosureDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclosureDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosureDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
