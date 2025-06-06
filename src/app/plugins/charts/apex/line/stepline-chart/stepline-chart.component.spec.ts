import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteplineChartComponent } from './stepline-chart.component';

describe('SteplineChartComponent', () => {
  let component: SteplineChartComponent;
  let fixture: ComponentFixture<SteplineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SteplineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SteplineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
