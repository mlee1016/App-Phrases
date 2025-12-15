import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhrasewordComponent } from './phraseword.component';

describe('PhrasewordComponent', () => {
  let component: PhrasewordComponent;
  let fixture: ComponentFixture<PhrasewordComponent>;

  beforeEach(async () => { 
    await TestBed.configureTestingModule({
      declarations: [PhrasewordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhrasewordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
