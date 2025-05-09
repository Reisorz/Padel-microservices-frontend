import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCourtDialogComponent } from './select-court-dialog.component';

describe('SelectCourtDialogComponent', () => {
  let component: SelectCourtDialogComponent;
  let fixture: ComponentFixture<SelectCourtDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCourtDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCourtDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
