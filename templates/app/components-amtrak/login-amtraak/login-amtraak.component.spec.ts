import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAmtraakComponent } from './login-amtraak.component';

describe('LoginAmtraakComponent', () => {
  let component: LoginAmtraakComponent;
  let fixture: ComponentFixture<LoginAmtraakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAmtraakComponent]
    });
    fixture = TestBed.createComponent(LoginAmtraakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
