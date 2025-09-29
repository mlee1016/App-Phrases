import { Component, inject, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AllphrasesService } from '../allphrases.service';


interface KanjiItem {
  phrase: string;
  pr: string;
  en: string;
}
@Component({
  selector: 'app-jpscore2',
  templateUrl: './jpscore2.component.html',
  styleUrl: './jpscore2.component.css',



  
  /*animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]*/
})




export class Jpscore2Component {
sideBar: any = true;
selectedPhrases = signal<string>("");
close() {
  this.sideBar = false
}
toggleSidebar() {
  this.sideBar = true
}
  theme = 'light2'; // default theme
  selectedKanji2 = signal<any>('');

  kanjiList:KanjiItem[] = [];

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'light2' : 'light';
  }
  index = 0;

  cards = []/*[
    { phrase: '一', pr: 'イチ / イツ', en: 'ひと つ', des: 'One' },
    { phrase: '二', pr: 'ニ', en: 'ふた つ', des: 'Two' },
    { phrase: '三', pr: 'サン', en: 'みっ つ', des: 'Three' },
    { phrase: '日', pr: 'ニチ / ジツ', en: 'ひ / か', des: 'Sun / Day' },
    { phrase: '月', pr: 'ゲツ / ガツ', en: 'つき', des: 'Moon / Month' }
  ];*/
    kanji2 = ['n5','n5-part2','n5-part3','n5-part4',"n4","n4-part2","n4-part3","n4-part4","n4-part5"]

    http: HttpClient = inject(HttpClient)
    constructor(private phrasesService:AllphrasesService){
  
  
    }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  if (!this.selectedKanji2()) {
    this.selectedKanji2.set(this.kanji2);
      this.fetchKanjiList();

  }

  // this.selectRandomKanji();
  // this.fetchKanjiList();

  this.selectPhraseList();

  }

/*
fetchKanjiList() {
  this.phrasesService.getJapanesePhrases().subscribe({
    next: (data2: any) => {
      const selected = this.selectedKanji2();
      if (selected && data2[selected]) {
        this.cards = data2[selected];
        // this.selectRandomKanji(); // trigger new question
        this.isReadyToStart = this.cards.length > 0;
      }
    },
    error: (error: any) => alert(error.message)
  });}*/

  fetchKanjiList() {
  this.phrasesService.getJapanesePhrases().subscribe({
    next: (data2: any) => {
      const selected = this.selectedKanji2();
      if (selected && data2[selected]) {
        this.cards = data2[selected] || [];
        this.index = 0; // ✅ always reset to the first card
        this.isReadyToStart = this.cards.length > 0;

        // ✅ Force update to first card if needed
        if (this.cards.length > 0) {
          this.currentCard(); // triggers getter
        }
      }
    },
    error: (error: any) => alert(error.message)
  });
}

  get currentCard() {
    console.log(this.cards[this.index])
    return this.cards[this.index];
  }

  prevCard() {
    this.index = (this.index - 1 + this.cards.length) % this.cards.length;
  }

  nextCard() {
    this.index = (this.index + 1) % this.cards.length;

  }
  isReadyToStart = true
  quizStarted = true
selectPhraseList() {
  this.selectedKanji2()
  this.isReadyToStart = this.kanjiList.length > 0;
  this.quizStarted = false; // reset if switching
}


  selectKanji(k: any) {
    this.selectedKanji2.set(k);
    this.fetchKanjiList()
    this.selectedPhrases.set(k)
    //this.selectRandomKanji();
  }
  started =false
  start(){
    this.started = true
  }
}

