import { Component, SimpleChanges,Input, OnChanges, ChangeDetectorRef,signal,NgZone } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

import { PhrasenameService } from '../shared/phrasename.service';
import { on } from 'events';
import { PhraseListItem } from '../shared/phrase-list.service';
import { AllphrasesService } from '../allphrases.service';
import { AuthenticationUser } from '../emitters/emittters';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';





  export interface UnifiedPhrase {
    phrase: string;
    pr: string;
    en: string;
    des?: string;
    language?: string;
    type?: string;
    phrase_name?: string;}
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
      
})
  

  export class ProgressComponent {
    count:number = 0;
    ans1:string = ""
    ans:string = ' ';
    toggle: boolean = false
    togglestart:boolean = false
  
  
    
    inputh= signal('')
    selectedPhrases = signal('')
  
    input= ''
    input2=signal('')
    
    
    input3=signal('')
  
    input5= signal('')
    input4= signal('')
    sideBar: boolean = true
    pr = false
    //presentTense:JapanesePhrases[] = this.jpPhrases
    //allPhrase :string[] = []
    
    allPhrase
    Popular
    phrasesList
    phraseListRussian2
    phraseListRussianPopular
    phrasesListRussian
    phrasesListItalian 
    phraseListPopularItalian
    phraseListItalian2  
    phrasesListGerman
    phrasesListGerman2
    japaneseStory
    phrasesListJapanesePopular
    phrasesListJapanese=this.phraseNames.allListJapanesegrammer  
  
    check = signal<string>('')
    directionMode :string=""
    
    directionModeC :string=""
    directionModeE:string =""
    id:string=""
    m1:string=""
    la:string = ""
    lang:string = ""

    phraseStory: any;
    phrasePopular: any;
    phraseCourse: any;
    phrases = signal<any>([]);
    a_load = false
    constructor(private phrasesService:AllphrasesService,private userA:AuthenticationUser,
      private activateRoute: ActivatedRoute,private phraseNames:PhrasenameService,private ngZone: NgZone) {
      
    }
    
   
  
  
  
  loadPhrasesById() {
    const inputMap = {
      'Korean': this.inputh(),
      'Japanese': this.input2(),
      'Italian': this.input3(),
      'German': this.input4(),
      'Russian': this.input5(),
    };
    //calls phrase service to json phrase
    const phraseLoaderMap = {
      'Korean': this.phrasesService.getPhrases(),
      'Japanese': this.phrasesService.getJapanesePhrases(),
      'Italian': this.phrasesService.getItalianPhrases(),
      'German': this.phrasesService.getGermanPhrases(),
      'Russian': this.phrasesService.getRussianPhrases()
    };
  
    const observable$ = phraseLoaderMap[this.id];
  
    if (!observable$) return;
  
  
  
    //subscribe to local json file to get actual 
    observable$.subscribe({
      next: (data: any) => {
        const phrases = data[inputMap[this.id]];
        this.setUnifiedPhrases(this.id, phrases);
        this.selectPhraseList();
      },
      error: (error: any) => {
        alert(`❌ Failed to load ${this.id} phrases: ${error.message}`);
      }
    });
  }
  
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      const lang = params.get('id');
      const m = params.get('m');
      if (!lang) return;
      this.id = lang;
      
      this.m1 = m
      this.userA.initializeAuth()
      this.userA.authStatusLoaded.subscribe(a=>this.a_load=a)
      this.userA.authStatus.subscribe((id:string)=>
        this.check.update(a =>a=id)
        )
    
      
      // Call only for the selected language
      if(this.check() ==='signed in'){
      this.phraseNames.getPhrases(this.id).subscribe({
        next: data => {
          console.log("this is a",data)
        switch(this.id) {
          case 'Korean':
             this.phrasesList = data.filter(p => p.type === 'grammar');;
             this.allPhrase = data.filter(p => p.type === 'story');
            break
          case 'Russian': 
            
             this.phrasesListRussian = data.filter(p => p.type === 'grammar');
             this.phraseListRussian2 = data.filter(p => p.type === 'story');
            break
          case 'Italian' : 
            
             this.phrasesListItalian = data.filter(p => p.type === 'grammar');;
             this.phraseListItalian2 = data.filter(p => p.type === 'story');
          break
          case 'German': this.phrasesListGerman = data;
            break
          default : 
            
             this.phrasesListJapanese = data.filter(p => p.type === 'grammar');;
             this.japaneseStory = data.filter(p => p.type === 'story');
        }
        // error: err => console.error(`Failed to load ${lang} grammar:`, err)
        
  
      switch (this.id) {
        case 'Korean':
          this.phraseStory = this.allPhrase;
          this.phraseCourse = this.phrasesList;
          console.log(this.phraseStory)
          this.directionMode = 'kor-to-eng';
          this.directionModeE = 'kor-to-eng';
          this.directionModeC = 'eng-to-kor';
  
          this.lang = 'ko-KR';
          this.la = 'ko';
          break;
        case 'Japanese':
          this.phraseStory = this.japaneseStory;
          this.phraseCourse = this.phrasesListJapanese;
          this.directionMode = 'jp-to-eng';
          this.directionModeE = 'jp-to-eng';
          this.directionModeC = 'eng-to-jp';
          this.lang = 'ja-JP';
          this.la = 'jp';
          break;
        case 'Italian':
          this.phraseStory = this.phraseListItalian2;
          this.phraseCourse = this.phrasesListItalian;
          this.directionMode = 'itn-to-eng';
          this.directionModeE = 'itn-to-eng';
          this.directionModeC = 'eng-to-itn';
          this.lang = 'it-IT';
          this.la = 'itn';
          break;
        case 'German':
          this.phraseCourse = this.phrasesListGerman;
          this.phraseStory = this.phrasesListGerman2;
          this.directionMode = 'eng-to-fr';
          this.directionModeE = 'fr-to-eng';
          this.directionModeC = 'eng-to-fr';
          this.lang = 'fr-FR';
          this.la = 'ge';
          break;
        case 'Russian':
        default:
          this.phraseStory = this.phraseListRussian2;
          this.phraseCourse = this.phrasesListRussian;
          this.directionMode = 'rus-to-eng';
          this.directionModeE = 'rus-to-eng';
          this.directionModeC = 'eng-to-rus';
  
          this.lang = 'ru-RU';
          this.la = 'ru';
          break;
  
        }
      }});
      }
      else{
  
        
        
        this.allPhrase = this.phraseNames.allListStory
        this.Popular  = this.phraseNames.allPopularPhrases
        this.phrasesList = this.phraseNames.allListgrammer
        this.phraseListRussian2 = this.phraseNames.allListRussianStory
        this.phraseListRussianPopular = this.phraseNames.allPopularRussianPhrases
        this.phrasesListRussian = this.phraseNames.allListRussiangrammer
        this.phrasesListItalian = this.phraseNames.allListItaliangrammer
        this.phraseListPopularItalian = this.phraseNames.allPopularItalianPhrases
        this.phraseListItalian2  = this.phraseNames.allListItalianStory
        this.phrasesListGerman = this.phraseNames.allListGermangrammer
        this.phrasesListGerman2 = this.phraseNames.allListGermanStory
        this.japaneseStory = this.phraseNames.allListJapaneseStory
        this.phrasesListJapanesePopular = this.phraseNames.allPopularJapanesePhrases
        this.phrasesListJapanese = this.phraseNames.allListJapanesegrammer  
        
  
      switch (this.id) {
        case 'Korean':
          this.phraseStory = this.allPhrase;
          this.phrasePopular = this.Popular
          this.phraseCourse = this.phrasesList;
          // console.log(this.phraseStory)
          this.directionMode = 'kor-to-eng';
          this.directionModeE = 'kor-to-eng';
          this.directionModeC = 'eng-to-kor';
  
          this.lang = 'ko-KR';
          this.la = 'ko';
          break;
        case 'Japanese':
          this.phraseStory = this.japaneseStory;
          this.phrasePopular = this.phrasesListJapanesePopular
          this.phraseCourse = this.phrasesListJapanese;
          this.directionMode = 'jp-to-eng';
          this.directionModeE = 'jp-to-eng';
          this.directionModeC = 'eng-to-jp';
          this.lang = 'ja-JP';
          this.la = 'jp';
          break;
        case 'Italian':
          this.phraseStory = this.phraseListItalian2;
          this.phrasePopular = this.phraseListPopularItalian
          this.phraseCourse = this.phrasesListItalian;
          this.directionMode = 'itn-to-eng';
          this.directionModeE = 'itn-to-eng';
          this.directionModeC = 'eng-to-itn';
          this.lang = 'it-IT';
          this.la = 'itn';
          break;
        case 'German':
          this.phraseCourse = this.phrasesListGerman;
          this.phraseStory = this.phrasesListGerman2;
          this.directionMode = 'eng-to-fr';
          this.directionModeE = 'fr-to-eng';
          this.directionModeC = 'eng-to-fr';
          this.lang = 'fr-FR';
          this.la = 'ge';
          break;
        case 'Russian':
        default:
          this.phraseStory = this.phraseListRussian2;
          this.phrasePopular = this.phraseListRussianPopular
          this.phraseCourse = this.phrasesListRussian;
          this.directionMode = 'rus-to-eng';
          this.directionModeE = 'rus-to-eng';
          this.directionModeC = 'eng-to-rus';
  
          this.lang = 'ru-RU';
          this.la = 'ru';
          break;
  
      }        
      }
  
  
      
  
      // ✅ Load data after setting ID and language config
    
    
      this.loadPhrasesById();
    });
      this.selectPhraseList()
  }
  setUnifiedPhrases(lang: string, phraseList: any[]) {
    this.phrases.set(phraseList);
    this.remainingPhrases.set([...phraseList]); // fresh copy
    this.currentIndex.set(0);
    // this.score.set(0);
  }
  isReadyToStart = false;
  quizStarted = false
selectPhraseList() {
  // this.phrases()
  this.isReadyToStart = this.phrases().length > 0;
  this.quizStarted = false; // reset if switching


}
  listening = false;
  userInput: string = '';
  pronunciationFeedback: string = '';
  lastResult = signal<string>('');
  answered = signal<boolean>(false);
  comparisonResult: { char: string; correct: boolean }[] = []; // for detailed feedback
  proportionCorrect = 0; // e.g. 0.8 for 80% correct
// inject in constructor:
// constructor(private ngZone: NgZone) {}

startSpeechToText(expectedRaw: string) {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error('❌ SpeechRecognition API not supported.');
    return;
  }

  // --- helpers ---
  const kataToHira = (str: string) =>
    str.replace(/[\u30A1-\u30FA\u30FC]/g, ch =>
      ch === 'ー' ? 'ー' : String.fromCharCode(ch.charCodeAt(0) - 0x60)
    );
  const stripDiacritics = (str: string) =>
    str.normalize('NFD').replace(/\p{Diacritic}+/gu, '');

  const normalize = (t: string) => {
    if (!t) return '';
    let n = t.normalize('NFKC').trim();

    // language-specific tweaks
    // this.la should be 'jp' | 'ko' | 'ru' | 'itn' | 'ge'
    if (this.la === 'jp') {
      // normalize kana & common punctuation for JP
      n = kataToHira(n).replace(/ー/g, ''); // drop long vowel mark for leniency
    }

    // generic cleanup
    n = stripDiacritics(n.toLowerCase());
    // keep letters/numbers only (unicode aware)
    n = n.replace(/[^\p{L}\p{N}]+/gu, '');
    return n;
  };

  const expected = normalize(expectedRaw);

  const recognition = new SpeechRecognition();
  recognition.lang = this.lang;   // e.g. 'ja-JP', 'ko-KR', 'ru-RU', 'de-DE', 'it-IT'
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  this.listening = true;
  this.pronunciationFeedback = '';

recognition.onresult = (event: any) => {
  const transcript: string = event.results[0][0].transcript || '';
  const heardNorm = normalize(transcript);

  const expectedChars = expected.split('');
  const heardChars = heardNorm.split('');

  // align shorter/longer by index
  const maxLen = Math.max(expectedChars.length, heardChars.length);
  const comparison: { char: string; correct: boolean }[] = [];

  for (let i = 0; i < maxLen; i++) {
    const expChar = expectedChars[i] || '';
    const heardChar = heardChars[i] || '';

    comparison.push({
      char: heardChar || '(none)',
      correct: expChar === heardChar && expChar !== ''
    });
  }

  // decide overall correctness
  const allCorrect = comparison.every(c => c.correct);

  this.ngZone.run(() => {
    this.userInput = transcript; // raw transcript
  
  
    this.comparisonResult = comparison;
    // console.log(comparison)
    this.proportionCorrect = comparison.filter(c => c.correct).length / comparison.length*100;

    if(this.proportionCorrect ===100){
      this.pronunciationFeedback = '✅ Perfect match!'
    }else if(this.proportionCorrect >=80){
      
      this.pronunciationFeedback = `❌ so close! Some differences found ,Expected: "${expectedRaw}"`;

    }else if(this.proportionCorrect >=50){
      this.pronunciationFeedback = `❌ keep trying, Some differences found ,\n Expected: "${expectedRaw}"`;

    }else{
      this.pronunciationFeedback = `❌ nope, not close. \n Expected: "${expectedRaw}"`;
    }


    
    if (this.lastResult) this.lastResult.set(this.pronunciationFeedback);
    if (this.answered) this.answered.set(true);

    this.listening = false;
  });

  try { recognition.stop(); } catch {}
};

  recognition.onerror = (event: any) => {
    this.ngZone.run(() => {
      console.error('Speech recognition error:', event.error);
      this.pronunciationFeedback = '⚠ Speech recognition error.';
      this.listening = false;
    });
  };

  recognition.onend = () => {
    this.ngZone.run(() => (this.listening = false));
  };
  recognition.start();
}
/*startSpeechToText(expectedRaw: string, expectedKana?: string) {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error('❌ SpeechRecognition API not supported.');
    return;
  }

  const kataToHira = (str: string) =>
    str.replace(/[\u30A1-\u30FA\u30FC]/g, ch =>
      ch === 'ー' ? 'ー' : String.fromCharCode(ch.charCodeAt(0) - 0x60)
    );

  const stripDiacritics = (str: string) =>
    str.normalize('NFD').replace(/\p{Diacritic}+/gu, '');

  const normalizeKana = (t: string) => {
    if (!t) return '';
    let n = t.normalize('NFKC').trim();
    n = kataToHira(n);         // Katakana → Hiragana
    n = n.replace(/ー/g, '');  // drop long vowel marks if you want leniency
    n = stripDiacritics(n);
    return n;
  };

  // --- Use kana if available, otherwise fall back to raw
  const expected = normalizeKana(expectedKana || expectedRaw).replace(/\s+/g, '');

  const recognition = new SpeechRecognition();
  recognition.lang = this.lang; // e.g. 'ja-JP'
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  this.listening = true;
  this.pronunciationFeedback = '';

  recognition.onresult = (event: any) => {
    const transcript: string = event.results[0][0].transcript || '';
    const heardNorm = normalizeKana(transcript).replace(/\s+/g, '');

    // Compare kana-to-kana, ignoring Kanji
    const expectedChars = expected.split('');
    const heardChars = heardNorm.split('');
    const maxLen = Math.max(expectedChars.length, heardChars.length);

    const comparison: { char: string; correct: boolean }[] = [];
    for (let i = 0; i < maxLen; i++) {
      const expChar = expectedChars[i] || '';
      const heardChar = heardChars[i] || '';
      comparison.push({
        char: heardChar || '(none)',
        correct: expChar === heardChar && expChar !== ''
      });
    }

    const allCorrect = comparison.every(c => c.correct);

    this.ngZone.run(() => {
      this.userInput = heardNorm; // raw speech
      console.log(this.userInput)
      this.pronunciationFeedback = allCorrect
        ? '✅ Perfect Match!'
        : `❌ Some kana differences. Expected (Kana): "${expected}"`;

      this.comparisonResult = comparison;
      this.proportionCorrect = (comparison.filter(c => c.correct).length / comparison.length) * 100;

      if (this.lastResult) this.lastResult.set(this.pronunciationFeedback);
      if (this.answered) this.answered.set(true);
      this.listening = false;
    });

    try { recognition.stop(); } catch {}
  };

  recognition.onerror = (event: any) => {
    this.ngZone.run(() => {
      console.error('Speech recognition error:', event.error);
      this.pronunciationFeedback = '⚠ Speech recognition error.';
      this.listening = false;
    });
  };

  recognition.onend = () => {
    this.ngZone.run(() => (this.listening = false));
  };

  recognition.start();
}*/



startQuiz() {
  const all = this.phrases();
  this.remainingPhrases.set([...all]);   // fresh copy
  this.currentIndex.set(0);
  // this.score.set(0);
  this.quizStarted = true
  this.answered.set(false)
  this.currentPhrase()
  this.userInput = ''
  this.pronunciationFeedback = ''
  this.comparisonResult = []
  this.lastResult.set('')
  this.proportionCorrect = 0
}
again(){
  
}

  toggleSidebar(){
    this.loadPhrasesById()
    this.sideBar = !this.sideBar 
  }
  
  close(){
    this.loadPhrasesById()
    // this.currentIndex.set(0)
    this.sideBar =!this.sideBar
    this.loadPhrasesById()
  }
highlightMode = false;
toggleHighlight() {
  this.highlightMode = !this.highlightMode;
}
formatPhrase(phrase: string): string {
  if (!this.highlightMode) {
    // Just remove markers
   
   
    return phrase.replace(/\[\[|\]\]/g, '');

  }
  return phrase.replace(
    /\[\[(.*?)\]\]/g,
    '<span class="bg-yellow-200 text-cyan-900 rounded px-1">$1</span>'
  );
}

  remainingPhrases = signal<any[]>([]); // Phrases left to quiz
  currentIndex = signal<number>(0); // Index of current phrase
  get currentPhrase() {
    return this.remainingPhrases()[this.currentIndex()];
  }

  getProgress(): string {

    return this.currentPhrase.phrase//: this.currentPhrase.en;
    
  }
  
  getSpecificPhrases(p:string){
    switch(this.id){
      case 'Korean':
      this.inputh.set(p);
      this.selectedPhrases.set(p);
      break;
      case 'Japanese':
      this.input2.set(p);
      this.selectedPhrases.set(p);
      break;  
      case 'Italian':
      this.input3.set(p);
      this.selectedPhrases.set(p);
      break;  
      case 'German':
      this.input4.set(p);
      this.selectedPhrases.set(p);
      break;
      case 'Russian':
      this.input5.set(p);
      this.selectedPhrases.set(p);
      break;  

    }
}

next() {
  if (!this.answered()) return; // ⛔ Block skipping until answered

  // Remove if correct
  if (this.lastResult().startsWith('✅')) {
    const list = this.remainingPhrases().slice();
    list.splice(this.currentIndex(), 1);
    this.remainingPhrases.set(list);

    if (list.length === 0) {
      alert("🎉 All correct!");
      return;
    }
    this.userInput = ""
    this.currentIndex.set(this.currentIndex() % list.length);
  } else {
    // Go to next, keep current if wrong
    this.currentIndex.update(i => (i + 1) % this.remainingPhrases().length);
  }

  // this.answered.set(false);
  // this.lastResult.set('');
  this.userInput = '';
  this.pronunciationFeedback = '';
  this.comparisonResult = [];
  this.answered.set(false);
  this.lastResult.set('');
  // this.reset2();
}


  playAudio(text: string, lang2: string = this.lang) {
    let text2:string

    text2 =  text.replace(/\[\[|\]\]/g, ' ');
    console.log(text2)
    const soundAudio = new SpeechSynthesisUtterance(text2);
    soundAudio.lang = lang2;
    soundAudio.rate = 0.9;    // s 
    speechSynthesis.cancel(); // stop prior if still speaking
    speechSynthesis.speak(soundAudio);
  }
}

