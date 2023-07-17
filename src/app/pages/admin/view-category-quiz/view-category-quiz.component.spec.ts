import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoryQuizComponent } from './view-category-quiz.component';

describe('ViewCategoryQuizComponent', () => {
  let component: ViewCategoryQuizComponent;
  let fixture: ComponentFixture<ViewCategoryQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCategoryQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCategoryQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
