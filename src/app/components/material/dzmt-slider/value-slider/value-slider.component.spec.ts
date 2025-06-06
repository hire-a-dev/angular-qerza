import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueSliderComponent } from './value-slider.component';

describe('ValueSliderComponent', () => {
  let component: ValueSliderComponent;
  let fixture: ComponentFixture<ValueSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValueSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
