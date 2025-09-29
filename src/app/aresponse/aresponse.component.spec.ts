import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AresponseComponent } from './aresponse.component';

describe('AresponseComponent', () => {
  let component: AresponseComponent;
  let fixture: ComponentFixture<AresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
