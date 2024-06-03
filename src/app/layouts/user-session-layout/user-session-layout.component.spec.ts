import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSessionLayoutComponent } from './user-session-layout.component';

describe('UserSessionLayoutComponent', () => {
  let component: UserSessionLayoutComponent;
  let fixture: ComponentFixture<UserSessionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSessionLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSessionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
