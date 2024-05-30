import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclosureAdminComponent } from './disclosure-admin.component';

describe('DisclosureAdminComponent', () => {
  let component: DisclosureAdminComponent;
  let fixture: ComponentFixture<DisclosureAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisclosureAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisclosureAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
