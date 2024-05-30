import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubpoenaComponent } from './subpoena.component';

describe('SubpoenaComponent', () => {
  let component: SubpoenaComponent;
  let fixture: ComponentFixture<SubpoenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubpoenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubpoenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
