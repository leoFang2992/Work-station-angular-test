import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmdComponent } from './pmd.component';

describe('PmdComponent', () => {
  let component: PmdComponent;
  let fixture: ComponentFixture<PmdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
