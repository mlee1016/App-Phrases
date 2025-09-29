import { Component, inject, OnInit, signal } from '@angular/core';
import { AllphrasesService } from '../allphrases.service';
// import { JapanesePhrases } from '../shared/models/JapanesePhrases';
import { HttpClient } from '@angular/common/http';

interface KanjiItem {
  phrase: string;
  pr: string;
  en: string;
}

@Component({
  selector: 'app-jpscore',
  templateUrl: './jpscore.component.html',
  styleUrl: './jpscore.component.css'
})
export class JpscoreComponent implements OnInit{
  

  jpPhrases:any[] = [];
  kanjiList:KanjiItem[] = [];
  input:string = '一' ;
  input2:string = "kanji_list"
  kList = false;
  selectedKanji:any= "";
  selectedKanji2=signal<string>("");
  kanji2 = ['n5','n5-part2','n5-part3','n5-part4',"n4","n4-part2","n4-part3","n4-part4","n4-part5"]



  Phrases:{"jp":"一","en":"one"}


  http: HttpClient = inject(HttpClient)
  constructor(private phrasesService:AllphrasesService){


  }
// inside JpscoreComponent
remainingKanji: KanjiItem[] = []; // pool of questions left
completedKanji: KanjiItem[] = []; // track correctly answered
wrongAttempts: number = 0;
score: number = 0;

ngOnInit(): void {
  if (!this.selectedKanji2()) {
    this.selectedKanji2.set(this.kanji2[0]);
  }
  this.fetchKanjiList();
  this.selectPhraseList();
}

// fetch list & reset progress
fetchKanjiList() {
  this.phrasesService.getJapanesePhrases().subscribe({
    next: (data2: any) => {
      const selected = this.selectedKanji2();
      if (selected && data2[selected]) {
        this.kanjiList = data2[selected];
        this.remainingKanji = [...this.kanjiList]; // reset quiz pool
        this.completedKanji = [];
        this.score = 0;
        this.wrongAttempts = 0;
        this.selectRandomKanji();
        this.isReadyToStart = this.kanjiList.length > 0;
      }
    },
    error: (error: any) => alert(error.message)
  });
}
canNext = false
checkSKun(selected: string) {
  this.kunSelected = selected;

  const validKun = this.selectedKanji.pr?.split(',').map(k => k.trim()) ?? [];
  const isKunCorrect = validKun.includes(this.kunSelected);

  if (this.kunSelected !== '') {
    if (isKunCorrect) {
      this.kunFeedback = "Correct!";
      this.kunCorrect = true;   // 🔹 track per-field correctness
    } else {
      this.kunFeedback = "Try again";
      this.kunCorrect = false;
      this.wrongAttempts++;
    }
  }

  this.updateGlobalFeedback();
}

checkSOn(selected: string) {
  this.onSelected = selected;

  const validOn = this.selectedKanji.en?.split(',').map(o => o.trim()) ?? [];
  const isOnCorrect = validOn.includes(this.onSelected);

  if (this.onSelected !== '') {
    if (isOnCorrect) {
      this.onFeedback = "Correct!";
      this.onCorrect = true;    // 🔹 track per-field correctness
    } else {
      this.onFeedback = "Try again";
      this.onCorrect = false;
      this.wrongAttempts++;
    }
  }

  this.updateGlobalFeedback();
}

checkKun() {
  const kunValid = this.selectedKanji.pr?.split(',').map(k => k.trim()) ?? [];
  if (this.typedKun.trim()) {
    const match = kunValid.includes(this.typedKun.trim());
    this.kunFeedback = match ? "Correct!" : "Try again";
  }
}

checkOn() {
  const onValid = this.selectedKanji.en?.split(',').map(k => k.trim()) ?? [];
  if (this.typedOn.trim()) {
    const match = onValid.includes(this.typedOn.trim());
    this.onFeedback = match ? "Correct!" : "Try again";
  }
}

kunCorrect = false;
onCorrect = false;

private updateGlobalFeedback() {
  if (this.kunCorrect && this.onCorrect) {
    this.feedback = "🎉 Fully Correct!";
    this.canNext = true;
  } else if (this.kunCorrect || this.onCorrect) {
    this.feedback = "✅ Half correct, keep going!";
    this.canNext = false;
  } else {
    this.feedback = "❌ Try again!";
    this.canNext = false;
  }
}

/*nextQuestion() {
  // Only count as correct if BOTH answers are right
  if (this.wrongAttempts === 0) {
    this.handleCorrect();
  } else {
    this.handleWrong(); // ❌ partial or wrong stays in pool
  }

  this.feedback = "";
  this.kunFeedback = "";
  this.onFeedback = "";
  this.kunSelected = '';
  this.onSelected = '';
  this.typedKun = '';
  this.typedOn = '';
  this.kunCorrect = false;
  this.onCorrect = false;
  this.canNext = false;
  this.wrongAttempts = 0;

  this.selectRandomKanji();
}*/

/*handleCorrect() {
  this.feedback = "🎉 Correct!";
  this.score++;
  this.completedKanji.push(this.selectedKanji);
  this.remainingKanji = this.remainingKanji.filter(k => k !== this.selectedKanji);

  this.showNextButton = true; // enable "Next" button
}*/

handleWrong() {
  this.feedback = "❌ Try again!";
  this.wrongAttempts++;
  this.showNextButton = true; // user must still click to continue
}

// --- new ---
showNextButton = false;


  selectedPhrases = signal<string>("");
  currentPhrase(){
    return this.kanjiList
  }
  selectKanji(k: any) {

    this.selectedKanji2.set(k);
    this.fetchKanjiList()
    this.selectedPhrases.set(k)
    //this.selectRandomKanji();
  }

  //selectedKanji: any = null;
  mode: 'type' | 'mc' = 'mc';
  feedback = '';
  kunyomiOptions: string[] = [];
  onyomiOptions: string[] = [];
  kunSelected: string = '';
  onSelected: string = '';
  typedKun = '';
  typedOn = '';


  // 🎯 Pick from remainingKanji, not full list
selectRandomKanji() {
  if (this.remainingKanji.length === 0) {
    this.selectedKanji = null; // quiz complete
    this.feedback = "🏆 All kanji completed!";
    return;
  }

  const randIndex = Math.floor(Math.random() * this.remainingKanji.length);
  this.selectedKanji = this.remainingKanji[randIndex];

  // reset fields
  this.feedback = '';
  this.typedKun = '';
  this.typedOn = '';
  this.kunSelected = '';
  this.onSelected = '';
  this.kunFeedback = '';
  this.onFeedback = '';

  this.generateOptions();
}

// 🎯 Handle correct: remove from pool
handleCorrect() {
  this.feedback = "🎉 Correct!";
  this.score++;
  this.completedKanji.push(this.selectedKanji);

  // remove from remaining
  this.remainingKanji = this.remainingKanji.filter(
    k => k !== this.selectedKanji
  );

  this.showNextButton = true; // enable "Next"
}

// 🎯 Next question should only use remaining pool
nextQuestion() {
  if (this.wrongAttempts === 0 && this.kunCorrect && this.onCorrect) {
    this.handleCorrect();
  } else {
    this.handleWrong();
  }

  // reset state
  this.feedback = "";
  this.kunFeedback = "";
  this.onFeedback = "";
  this.kunSelected = '';
  this.onSelected = '';
  this.typedKun = '';
  this.typedOn = '';
  this.kunCorrect = false;
  this.onCorrect = false;
  this.canNext = false;
  this.wrongAttempts = 0;
  this.showNextButton = false;

  this.selectRandomKanji();
}

  /*selectRandomKanji() { 
    this.selectedKanji = this.kanjiList[Math.floor(Math.random() * this.kanjiList.length)];
    this.feedback = '';
    this.typedKun = '';
    this.typedOn = '';
    this.kunSelected = '';
    this.onSelected = '';
    this.kunFeedback='';
    this.onFeedback = '';
    this.generateOptions();
  }*/

  switchMode() {
    this.mode = this.mode === 'mc' ? 'type' : 'mc';
  }

generateOptions() {
  //if (!this.selectedKanji || !this.kanjiList) return;

  const correctKunyomi = this.selectedKanji.pr
    ? this.selectedKanji.pr.split(',').map(k => k.trim())
    : ['n/a'];
  const correctOnyomi = this.selectedKanji.en
    ? this.selectedKanji.en.split(',').map(k => k.trim())
    : ['n/a'];

  // Collect fake options from all other kanji in the list
  const fakeKunyomiPool = this.kanjiList
    .filter(k => k !== this.selectedKanji && k.pr)
    .flatMap(k => k.pr.split(',').map(p => p.trim()))
    .filter(opt => !correctKunyomi.includes(opt)); // exclude correct answers

  const fakeOnyomiPool = this.kanjiList
    .filter(k => k !== this.selectedKanji && k.en)
    .flatMap(k => k.en.split(',').map(o => o.trim()))
    .filter(opt => !correctOnyomi.includes(opt)); // exclude correct answers

  // Pick 6 options total (including correct ones)
  this.kunyomiOptions = this.shuffle([
    ...correctKunyomi,
    ...this.pickRandom(fakeKunyomiPool, 6 - correctKunyomi.length),
  ]).slice(0, 6);

  this.onyomiOptions = this.shuffle([
    ...correctOnyomi,
    ...this.pickRandom(fakeOnyomiPool, 6 - correctOnyomi.length),
  ]).slice(0, 6);
}
shuffle(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5);
}

pickRandom(array: string[], count: number): string[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

  isCorrect(type: 'kunyomi' | 'onyomi', opt: string) {
    const valid = type === 'kunyomi' ? this.selectedKanji.pr : this.selectedKanji.en;
    return valid?.includes(opt);
  }
  kunFeedback = ""
  onFeedback = ""
sideBar = true
started = false
isReadyToStart = false
toggleSidebar(){
  this.sideBar = true
}
close(){
  this.sideBar = !this.sideBar
}
start(){
this.started = true
this.selectRandomKanji()
}

  quizStarted = false
selectPhraseList() {
  this.selectedKanji2()
  this.isReadyToStart = this.kanjiList.length > 0;
  this.quizStarted = false; // reset if switching
}

receiveKana(char: any) {
  if (char === '⌫') { // backspace
    this.typedKun = this.typedKun.slice(0, -1);
  } else {
    this.typedKun += char;
  }
}

}