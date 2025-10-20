import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-again',
  templateUrl: './again.component.html',
  standalone:true,
  imports: [CommonModule], 
  styleUrl: './again.component.css'

})

export class AgainComponent {
 
  @Input() correctCount = 0;
  @Input() wrongCount = 0;
  @Input() userResults: any[] = [];
  
  @Output() retry = new EventEmitter<void>();
  
  @Input() type = "" 
  @Input() select = ""
  la= ""
  pr = ""
  get showTryAgainPopup() {
    // Show “Try Again” if score < 70%
    const total = this.correctCount + this.wrongCount;
    return total == this.correctCount ;
  }

  onRetry() {
    this.retry.emit();
  }

  onNext() {
    this.retry.emit(); // You can change this if Next does something else
  }
  constructor(){

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.userResults)
    if(this.select==='phrase'){
    switch(this.type){
      case 'Korean':
        this.la = "ko"
        this.pr = "pr"
        break;
      case 'Japanese':
        this.la = "jp"
        this.pr = "kana"
        break
      case 'Russian':
        
        this.la = "ru"
        this.pr = "pr"
        break
      case 'Italian':
        
        this.la = "itn"
        this.pr = "pr"
        break
    }
  }else{
    this.la = 'phrase'
  }
    console.log(this.la)

  }
}


