import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCourtDialogComponent } from './new-court-dialog.component';

describe('NewCourtDialogComponent', () => {
  let component: NewCourtDialogComponent;
  let fixture: ComponentFixture<NewCourtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCourtDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCourtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
