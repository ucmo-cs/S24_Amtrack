import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsAmtraakComponent } from './stations-amtraak.component';

describe('StationsAmtraakComponent', () => {
  let component: StationsAmtraakComponent;
  let fixture: ComponentFixture<StationsAmtraakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StationsAmtraakComponent]
    });
    fixture = TestBed.createComponent(StationsAmtraakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
