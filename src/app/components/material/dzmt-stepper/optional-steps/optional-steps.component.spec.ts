import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalStepsComponent } from './optional-steps.component';

describe('OptionalStepsComponent', () => {
  let component: OptionalStepsComponent;
  let fixture: ComponentFixture<OptionalStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionalStepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionalStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
