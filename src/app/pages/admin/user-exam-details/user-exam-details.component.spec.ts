import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExamDetailsComponent } from './user-exam-details.component';

describe('UserExamDetailsComponent', () => {
  let component: UserExamDetailsComponent;
  let fixture: ComponentFixture<UserExamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
