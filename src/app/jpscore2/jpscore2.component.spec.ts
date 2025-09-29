import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jpscore2Component } from './jpscore2.component';

describe('Jpscore2Component', () => {
  let component: Jpscore2Component;
  let fixture: ComponentFixture<Jpscore2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Jpscore2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Jpscore2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
