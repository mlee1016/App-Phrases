import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KboardComponent } from './kboard.component';

describe('KboardComponent', () => {
  let component: KboardComponent;
  let fixture: ComponentFixture<KboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
