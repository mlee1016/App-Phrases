import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JpscoreComponent } from './jpscore.component';

describe('JpscoreComponent', () => {
  let component: JpscoreComponent;
  let fixture: ComponentFixture<JpscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JpscoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JpscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
