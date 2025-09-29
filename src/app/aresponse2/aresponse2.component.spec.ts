import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aresponse2Component } from './aresponse2.component';

describe('Aresponse2Component', () => {
  let component: Aresponse2Component;
  let fixture: ComponentFixture<Aresponse2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aresponse2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Aresponse2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
