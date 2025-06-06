import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownConfigComponent } from './dropdown-config.component';

describe('DropdownConfigComponent', () => {
  let component: DropdownConfigComponent;
  let fixture: ComponentFixture<DropdownConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
