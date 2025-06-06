import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaSplineComponent } from './area-spline.component';

describe('AreaSplineComponent', () => {
  let component: AreaSplineComponent;
  let fixture: ComponentFixture<AreaSplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaSplineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AreaSplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
