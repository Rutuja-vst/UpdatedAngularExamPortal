import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsheetComponent } from './uploadsheet.component';

describe('UploadsheetComponent', () => {
  let component: UploadsheetComponent;
  let fixture: ComponentFixture<UploadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
