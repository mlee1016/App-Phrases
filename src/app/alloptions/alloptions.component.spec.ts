import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlloptionsComponent } from './alloptions.component';

describe('AlloptionsComponent', () => {
  let component: AlloptionsComponent;
  let fixture: ComponentFixture<AlloptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlloptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlloptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
