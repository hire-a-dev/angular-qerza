import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapRoundedComponent } from './heatmap-rounded.component';

describe('HeatmapRoundedComponent', () => {
  let component: HeatmapRoundedComponent;
  let fixture: ComponentFixture<HeatmapRoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatmapRoundedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeatmapRoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
