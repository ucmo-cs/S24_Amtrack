import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsAmtraakComponent } from './bookings-amtraak.component';

describe('BookingsAmtraakComponent', () => {
  let component: BookingsAmtraakComponent;
  let fixture: ComponentFixture<BookingsAmtraakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsAmtraakComponent]
    });
    fixture = TestBed.createComponent(BookingsAmtraakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
