import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcCreateComponent } from './dc-create.component';

describe('DcCreateComponent', () => {
  let component: DcCreateComponent;
  let fixture: ComponentFixture<DcCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
