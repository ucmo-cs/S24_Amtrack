import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsViewComponent } from './tickets-view.component';

describe('TicketsViewComponent', () => {
  let component: TicketsViewComponent;
  let fixture: ComponentFixture<TicketsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketsViewComponent]
    });
    fixture = TestBed.createComponent(TicketsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
