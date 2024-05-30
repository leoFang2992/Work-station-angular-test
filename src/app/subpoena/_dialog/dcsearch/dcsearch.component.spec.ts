import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcsearchComponent } from './dcsearch.component';

describe('DcsearchComponent', () => {
  let component: DcsearchComponent;
  let fixture: ComponentFixture<DcsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
