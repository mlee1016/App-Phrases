import { Component } from '@angular/core';
import confetti from 'canvas-confetti';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  


  open = false;
  timeLeft = 0;
  interval: any = null;
  running = false;

  presets = [
    { label: '15 min', value: 15 * 60 },
    { label: '20 min', value: 20 * 60 },
    { label: '30 min', value: 30 * 60 },
  ];
  @ViewChild('confettiCanvas', { static: false }) confettiCanvas!: ElementRef<HTMLCanvasElement>;

  togglePanel() {
    this.open = !this.open;
  }

  selectTime(seconds: number) {
    this.timeLeft = seconds;
  }
start() {
  if (this.running) return;

  this.running = true;

  this.interval = setInterval(() => {
    this.timeLeft--;

    // update progress
    // this.progress = 100 - (this.timeLeft / this.totalTime) * 100;

    // when time reaches 0
    /*if (this.timeLeft <= 0) {
      this.stop();
      this.open = true;   // ⬅️ auto-open the sliding panel
      return;
    }*/
    if (this.timeLeft <= 0) {
  this.stop();
  this.open = true;           // auto-expand panel
  setTimeout(() => this.launchConfetti(), 250); // 🎉 CONFETTI
  return;
}

  }, 1000);
}


  stop() {
    this.running = false;
    clearInterval(this.interval);
  }

  resume() {
    if (!this.running && this.timeLeft > 0) {
      this.start();
    }
  }

  reset() {
    this.stop();
    this.timeLeft = 0;
  }

  get formattedTime() {
    const m = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    const s = (this.timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  get progress() {
    if (this.timeLeft === 0) return 0;
    return (this.timeLeft / (30 * 60)) * 100; // max ring size = 30 min
  }





  totalTime = 0;
  testTimer() {
  this.stop(); // stop anything running
  this.totalTime = 3;  // 3 seconds
  this.timeLeft = 3;
  // this.progress = 0;

  this.start();   // start countdown
}
launchConfetti() {
  const canvas = this.confettiCanvas.nativeElement;
  const myConfetti = confetti.create(canvas, {
    resize: true,        // auto-resize
    useWorker: true      // boosts performance
  });

  // Main physics burst
  myConfetti({
    particleCount: 150,
    spread: 80,
    startVelocity: 40,
    gravity: 1,
    ticks: 200,
    origin: { y: 0.2 }
  });

  // Extra random burst for realism
  setTimeout(() => {
    myConfetti({
      particleCount: 80,
      spread: 120,
      startVelocity: 60,
      gravity: 1.1,
      origin: { x: Math.random(), y: Math.random() * 0.3 }
    });
  }, 200);
}



}
