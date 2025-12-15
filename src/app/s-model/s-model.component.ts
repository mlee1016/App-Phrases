import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-s-model',
  templateUrl: './s-model.component.html',
  styleUrl: './s-model.component.css'
})
export class SModelComponent {



  @Input() sideBar: boolean = false;
  @Input() m1: string = '';
  @Input() phraseCourse: any[] = [];
  @Input() phrasePopular: any[] = [];
  @Input() phraseStory: any[] = [];
  @Input() selectedPhrases!: () => string;

  @Output() closeModal = new EventEmitter<void>();
  @Output() selectPhrase = new EventEmitter<string>();

  close() {
    this.closeModal.emit();
  }

  getSpecificPhrases(phrase: string) {
    this.selectPhrase.emit(phrase);
  } 
  
}
