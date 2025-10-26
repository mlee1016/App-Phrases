import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserphraseComponent } from './userphrase.component';

describe('UserphraseComponent', () => {
  let component: UserphraseComponent;
  let fixture: ComponentFixture<UserphraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserphraseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserphraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
