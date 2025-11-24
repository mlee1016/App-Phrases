import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-again',
  templateUrl: './again.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./again.component.css']
})
export class AgainComponent {
  @Input() correctCount = 0; 
  @Input() wrongCount = 0;
  @Input() userResults: any[] = [];
  @Input() attempt: any[] = [];
  @Input() attemptCount = 0;
  @Output() retry = new EventEmitter<void>();
  @Output() again = new EventEmitter<void>();
  @Input() type = '';
  @Input() select = '';

  la = '';
  pr = '';


  ngOnInit(): void {
    console.log('this is the results: ', this.select);
    console.log('this is the attempts: ', this.type);
    console.log('this is the results: ', this.userResults);
    console.log('this is the attempts: ', this.attempt);

    if (this.select === 'phrase') {
      switch (this.type) {
        case 'Korean':
          this.la = 'ko';
          this.pr = 'pr';
          break;
        case 'Japanese':
          this.la = 'jp';
          this.pr = 'kana';
          break;
        case 'Russian':
          this.la = 'ru';
          this.pr = 'pr';
          break;
        case 'Italian':
          this.la = 'itn';
          this.pr = 'pr';
          break;
      }
    } else{
      this.la = 'phrase';
    

    }
    console.log(this.la);
  }
  
  /** ✅ Shows “Try Again” only when NOT all answers are correct */
  get showTryAgainPopup() {
    // const total = this.correctCount + this.wrongCount;
    // if total == 0, still false (avoids showing wrong result when nothing answered)
    // if (total === 0) return false;
    // show popup only when not all correct
    // return this.correctCount !== total;
    return false;
  }
  
  onRetry() {
    this.retry.emit();
  }

  onNext() {
    this.again.emit();
  }
  formatPhrase(phrase: string): string {
    return phrase.replace(/\[\[|\]\]/g, '');
  }
  animatedScore: number = 0;

animateScore() {
  const score = Math.floor((this.correctCount / (this.correctCount + this.wrongCount)) * 100);
  let current = 0;

  const interval = setInterval(() => {
    if (current >= score) {
      clearInterval(interval);
    } else {
      current++;
      this.animatedScore = current;
    }
  }, 20); // smooth speed
}

// Call this inside your results show trigger
ngAfterViewInit() {
  this.animateScore();
}

showRain(): boolean {
  const score = (this.correctCount / (this.correctCount + this.wrongCount)) * 100;
  return score < 50;
}

launchConfetti() {
  const score = (this.correctCount / (this.correctCount + this.wrongCount)) * 100;
  if (score < 80) return;

  for (let i = 0; i < 25; i++) {
    const conf = document.createElement("div");
    conf.classList.add("confetti");
    conf.style.setProperty("--i", i.toString());
    document.body.appendChild(conf);

    setTimeout(() => conf.remove(), 3000);
  }
}
getScoreAnimationClass() {
  const score = (this.correctCount / (this.correctCount + this.wrongCount)) * 100;

  if (score === 100) return 'animate-perfectScore';
  if (score >= 70) return 'animate-goodScore';
  return 'animate-lowScore';
}

}
