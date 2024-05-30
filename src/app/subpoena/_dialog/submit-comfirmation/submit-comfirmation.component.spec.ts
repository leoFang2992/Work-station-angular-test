import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitComfirmationComponent } from './submit-comfirmation.component';

describe('SubmitComfirmationComponent', () => {
  let component: SubmitComfirmationComponent;
  let fixture: ComponentFixture<SubmitComfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitComfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitComfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
