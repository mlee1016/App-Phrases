import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseStudyComponent } from './phrase-study.component';

describe('PhraseStudyComponent', () => {
  let component: PhraseStudyComponent;
  let fixture: ComponentFixture<PhraseStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhraseStudyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhraseStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
