import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SModelComponent } from './s-model.component';

describe('SModelComponent', () => {
  let component: SModelComponent;
  let fixture: ComponentFixture<SModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
