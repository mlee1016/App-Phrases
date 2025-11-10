import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SCardComponent } from './s-card.component';

describe('SCardComponent', () => {
  let component: SCardComponent;
  let fixture: ComponentFixture<SCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
