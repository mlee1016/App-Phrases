import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {



  @Input() showPronunciation = false;
  @Input() phraseOn = false;
  @Input() showPhraseButton = false;
  @Input() showAudioButton = true;
  @Input() isCourse = false;
  @Input() select = true;
  @Input() m1:string|null = null;
  @Output() pronunciationToggled = new EventEmitter<void>();
  @Output() phraseToggled = new EventEmitter<void>();
  @Output() audioPlayed = new EventEmitter<void>();
  @Output() highlightToggled = new EventEmitter<void>();
  @Output() SpeechtoText = new EventEmitter<void>();

  @Input() listening: boolean = false;
showExtraControls: any;
  togglePronunciation() {
    this.pronunciationToggled.emit();
  }
  togglePhrase() {
    this.phraseToggled.emit();
  }
  playAudio() {
    this.audioPlayed.emit();
  }
  toggleHighlight() {
    this.highlightToggled.emit();
  }
  
stopAudio() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
startSpeechToText() {

  this.SpeechtoText.emit();   
  this.listening = !this.listening; 
}
}

