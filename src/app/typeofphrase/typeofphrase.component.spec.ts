import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeofphraseComponent } from './typeofphrase.component';

describe('TypeofphraseComponent', () => {
  let component: TypeofphraseComponent;
  let fixture: ComponentFixture<TypeofphraseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeofphraseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeofphraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
