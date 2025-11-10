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
  @Input() showAudioButton = false;
  @Input() isCourse = false;

  @Output() pronunciationToggled = new EventEmitter<void>();
  @Output() phraseToggled = new EventEmitter<void>();
  @Output() audioPlayed = new EventEmitter<void>();
  @Output() highlightToggled = new EventEmitter<void>();

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
}

