import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAmtraakComponent } from './register-amtraak.component';

describe('RegisterAmtraakComponent', () => {
  let component: RegisterAmtraakComponent;
  let fixture: ComponentFixture<RegisterAmtraakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAmtraakComponent]
    });
    fixture = TestBed.createComponent(RegisterAmtraakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
