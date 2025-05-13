import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlayerDialogComponent } from './select-player-dialog.component';

describe('SelectPlayerDialogComponent', () => {
  let component: SelectPlayerDialogComponent;
  let fixture: ComponentFixture<SelectPlayerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlayerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
