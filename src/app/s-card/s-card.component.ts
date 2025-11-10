
import { Component, computed, signal } from '@angular/core';
import { AllphrasesService } from '../allphrases.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhraseListItem } from '../shared/phrase-list.service';
import { PhrasenameService } from '../shared/phrasename.service';

import { AuthenticationUser } from '../emitters/emittters';
export interface UnifiedPhrase {
  phrase: string;
  pr: string;
  en: string;
  des?: string;
  language?: string;
  type?: string;
  phrase_name?: string;
}


@Component({
  selector: 'app-s-card',
  templateUrl: './s-card.component.html',
  styleUrl: './s-card.component.css'
})
export class SCardComponent {
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
  input4=''
  sideBar: boolean = true
  pr = false
  //presentTense:JapanesePhrases[] = this.jpPhrases
  //allPhrase :string[] = []
  phrasesList//:PhraseListItem[] = this.phraseNames.allListgrammer;
  allPhrase//:PhraseListItem[] = this.phraseNames.allListStory;
  phraseStory
  phrasePopular
  phraseCourse
  phrases = signal<UnifiedPhrase[]>([]);

  phrasesListRussian//:PhraseListItem[] = this.phraseNames.allListRussiangrammer;
  phraseListRussian2//:PhraseListItem[] = this.phraseNames.allListRussianStory;
  phraseListPopularRussian//:PhraseListItem[] = this.phraseNames.allListPopularRussian;
  phrasesListItalian//:PhraseListItem[] = this.phraseNames.allListItaliangrammer;
  phraseListItalian2//:PhraseListItem[] = this.phraseNames.allListItalianStory;
  phraseListPopularItalian//:PhraseListItem[] = this.phraseNames.allListPopularItalian;
  phrasesListGerman//:PhraseListItem[] = [{s:'course1',isDone:false}];
  phrasesListGerman2//:PhraseListItem[] = this.phraseNames.allListGermanStory;
  phrasesListJapanese//:PhraseListItem[] = this.phraseNames.allListJapanesegrammer;
  japaneseStory//:PhraseListItem[] = this.phraseNames.allListJapaneseStory ;
  phraseListPopularJapanese//:PhraseListItem[] = this.phraseNames.allListPopularJapanese;
  directionModeC :string=""
  directionModeE:string =""
  id:string=""
  m:string = "s"
  m1:string=""
  la:string = ""
  lang:string = ""
  constructor(private phrasesService:AllphrasesService,private activateRoute: ActivatedRoute,private phraseNames:PhrasenameService
    
    ,private userA:AuthenticationUser){
  }
  

 /* ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
  const tempId: string | null = params.get('id');
  this.id = tempId;

  if (!this.id) return;

  const inputMap = {
    'Korean': this.inputh(),
    'Japanese': this.input2(),
    'Italian': this.input3(),
    'German': this.input4,
    'Russian': this.input5(),
  };

  const inputKey = inputMap[this.id];

  const phraseLoaderMap = {
    'Korean': this.phrasesService.getPhrases(),
    'Japanese': this.phrasesService.getJapanesePhrases(),
    'Italian': this.phrasesService.getItalianPhrases(),
    'German': this.phrasesService.getGermanPhrases(),
    'Russian': this.phrasesService.getRussianPhrases()
  };

  const observable$ = phraseLoaderMap[this.id];

  observable$.subscribe({
    next: (data: any) => {
      const phrases = data[inputKey];
      this.setUnifiedPhrases(this.id, phrases);
    },
    error: (error: any) => {
      alert(`❌ Failed to load ${this.id} phrases: ${error.message}`);
    }
  });
});


  switch (this.id) {
    case 'Korean':
      this.phraseStory = this.allPhrase;
      this.phraseCourse =this.phrasesList;
      this.directionMode = 'kor-to-eng';
      this.directionModeE = 'kor-to-eng';
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
      this.phraseStory = this.phrasesListItalian;
      this.phraseCourse = this.phraseListItalian2;

      this.directionMode = 'itn-to-eng';
      this.directionModeE = 'itn-to-eng';
      this.directionModeC = 'eng-to-itn';
      this.lang = 'it-IT';
      this.la = 'itn';
      break;

    case 'German':
      this.phraseStory = this.phrasesListGerman;
      this.directionMode = 'eng-to-ge';
      this.directionModeE = 'ge-to-eng';
      this.directionModeC = 'eng-to-ge';
      this.lang = 'de-DE';
      this.la = 'ge';
      break;

    case 'Russian':
    default:
      this.phraseStory = this.phrasesListRussian;
      this.phraseCourse = this.phraseListRussian2;
      this.directionMode = 'rus-to-eng';
      this.directionModeE = 'rus-to-eng';
      this.lang = 'ru-RU';
      this.la = 'ru';
      break;
  }

  this.selectPhraseList()
}*/

loadPhrasesById() {
  const inputMap = {
    'Korean': this.inputh(),
    'Japanese': this.input2(),
    'Italian': this.input3(),
    'German': this.input4,
    'Russian': this.input5(),
  };

  const phraseLoaderMap = {
    'Korean': this.phrasesService.getPhrases(),
    'Japanese': this.phrasesService.getJapanesePhrases(),
    'Italian': this.phrasesService.getItalianPhrases(),
    'German': this.phrasesService.getGermanPhrases(),
    'Russian': this.phrasesService.getRussianPhrases()
  };

  const observable$ = phraseLoaderMap[this.id];

  if (!observable$) return;

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

check = signal<any>('')
a_load = false
ngOnInit(): void {
  this.activateRoute.paramMap.subscribe((params: ParamMap) => {
    const lang = params.get('id');
    const m = params.get('m');
    if (!lang) return;
    this.id = lang;
    this.m1 = m;

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

        switch(this.id){
    case 'Korean':
      this.phraseStory = this.allPhrase;
      this.phraseCourse =this.phrasesList;
      this.directionMode = 'kor-to-eng';
      this.directionModeE = 'kor-to-eng';
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
      this.phraseStory = this.phrasesListGerman;
      this.directionMode = 'eng-to-ge';
      this.directionModeE = 'ge-to-eng';
      this.directionModeC = 'eng-to-ge';
      this.lang = 'de-DE';
      this.la = 'ge';
      break;

    case 'Russian':
      this.phraseStory = this.phraseListRussian2;
      this.phraseCourse = this.phrasesListRussian;
      this.directionMode = 'rus-to-eng';
      this.directionModeE = 'rus-to-eng';
      this.lang = 'ru-RU';
      this.la = 'ru';
      break;
  }


    }});
    }
    else{
            
        this.phrasesList  = this.phraseNames.allListgrammer
        this.phrasePopular  = this.phraseNames.allPopularPhrases
        this.allPhrase = this.phraseNames.allListStory
      
        this.phrasesListRussian = this.phraseNames.allListRussiangrammer;
        this.phraseListRussian2 = this.phraseNames.allListRussianStory;
        this.phraseListPopularRussian = this.phraseNames.allPopularRussianPhrases;
        this.phrasesListItalian = this.phraseNames.allListItaliangrammer
        this.phraseListPopularItalian = this.phraseNames.allPopularItalianPhrases;
        this.phraseListItalian2 = this.phraseNames.allListItalianStory
        this.phrasesListGerman = this.phraseNames.allListGermangrammer
        this.phrasesListGerman2 = this.phraseNames.allListGermanStory
        this.phrasesListJapanese = this.phraseNames.allListJapanesegrammer
        this.phraseListPopularJapanese = this.phraseNames.allPopularJapanesePhrases
        this.japaneseStory  = this.phraseNames.allListJapaneseStory
        
        switch(this.id){
    case 'Korean':
      this.phraseStory = this.allPhrase;
      this.phrasePopular = this.phrasePopular
      this.phraseCourse =this.phrasesList;
      this.directionMode = 'kor-to-eng';
      this.directionModeE = 'kor-to-eng';
      this.lang = 'ko-KR';
      this.la = 'ko';
      break;

    case 'Japanese':
      this.phraseStory = this.japaneseStory;
      this.phrasePopular = this.phraseListPopularJapanese
      this.phraseCourse = this.phrasesListJapanese;
      this.directionMode = 'jp-to-eng';
      this.directionModeE = 'jp-to-eng';
      this.directionModeC = 'eng-to-jp';
      this.lang = 'ja-JP';
      this.la = 'jp';
      break;

    case 'Italian':
      this.phraseStory = this.phraseListItalian2;
      this.phrasePopular = this.phraseListPopularItalian;
      this.phraseCourse = this.phrasesListItalian;

      this.directionMode = 'itn-to-eng';
      this.directionModeE = 'itn-to-eng';
      this.directionModeC = 'eng-to-itn';
      this.lang = 'it-IT';
      this.la = 'itn';
      break;

    case 'German':
      this.phraseStory = this.phrasesListGerman;
      this.directionMode = 'eng-to-ge';
      this.directionModeE = 'ge-to-eng';
      this.directionModeC = 'eng-to-ge';
      this.lang = 'de-DE';
      this.la = 'ge';
      break;

    case 'Russian':
    default:
      this.phraseStory = this.phraseListRussian2;
      this.phrasePopular = this.phraseListPopularRussian;
      this.phraseCourse = this.phrasesListRussian;
      this.directionMode = 'rus-to-eng';
      this.directionModeE = 'rus-to-eng';
      this.lang = 'ru-RU';
      this.la = 'ru';
      break;
  }
    }
    // ✅ Load data after setting ID and language config
    this.loadPhrasesById();});
}
showAnswer2 = false;

revealAnswer() {
  this.showAnswer2 = true;
}

// next() {
//   this.showAnswer2 = false;
//   // Load next question logic here...
// }


setUnifiedPhrases(lang: string, phraseList: any[]) {
  this.phrases.set(phraseList);

}

  nextQuestion(){
    this.count += 1;
    this.toggle = false
    this.input = ""
    this.shuffledPh = this.shuffle(this.count,this.a)
    this.shuffledPh2 = this.shuffle2(this.count,this.a)
    this.hint = ""


    
    //setTimeout(this.getNextPhrase,3000);
  }
  reset(){
    this.count=0;
    this.ans = ""
    this.ans1 = ""
    this.a=1
    this.input=""
    this.shuffledPh = this.shuffle(this.count,this.a)
  }
  showAnswer(){
    this.toggle = !this.toggle
  }

  q:number = 0
  a:number = 1
  

  inputSwitch(event2:any){
  if (event2 == '1'){
    
    this.ans1 = '1'
    this.a = 0
  }else{
    this.ans1 = '0'
    this.a = 1
    }
  }
  switchCard(e:string){
    if(e == '1'){this.ans='1'}
    else{this.ans='0'}

  }
  toggleStart(){
    this.togglestart = !this.togglestart
  }


  setChar(char1:string){

    this.input += char1 
    
  }
  
  shuffle2(c:number,ques:number){



    //if(this.id == 'Japanese'){
      if(this.count<this.phrases.length){
        let shuffledChars2 = this.phrases[this.count].phrase.split("")
        for (let i = shuffledChars2.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledChars2[i], shuffledChars2[j]] = [shuffledChars2[j], shuffledChars2[i]];}
          return shuffledChars2//.filter((s)=>{s!=" "})
      }
    return [""]

    }
  
  shuffle(c:number,ques:number){


    
    //if(this.id == 'Japanese'){
      
      if(this.count<this.phrases.length){
        let shuffledChars = this.phrases[this.count].phrase.split(" ")
        for (let i = shuffledChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledChars[i], shuffledChars[j]] = [shuffledChars[j], shuffledChars[i]];}
          return shuffledChars//.filter((s)=>{s!=" "})
    
        }
    

    
    return [""]
  }
  shuffledPh = this.shuffle(this.count,1)

  shuffledPh2 = this.shuffle2(this.count,1)

  
  hint = ""
  displayHint(h:string){
    this.hint = h
  }

  romanitization(){
    this.pr = !this.pr
  }

  start = false
  startLearning(){

    //this.ngOnInit()
    this.start = !this.start
    this.count = 0
    this.a=1
    this.input=""
    this.shuffledPh = this.shuffle(this.count,this.a)
    this.shuffledPh2 = this.shuffle2(this.count,this.a)
    //this.ngOnInit()

  }

  
  isReadyToStart = false;
  quizStarted = false
selectPhraseList() {
  this.phrases()
  this.isReadyToStart = this.phrases().length > 0;
  this.quizStarted = false; // reset if switching
}

  toggleSidebar(){
    this.loadPhrasesById()
    this.sideBar = !this.sideBar
  }
  


  close(){
    this.loadPhrasesById()
    this.currentIndex.set(0)
    this.sideBar =!this.sideBar
    this.loadPhrasesById()
  }
  allPhraseList(i : PhraseListItem[]){
    this.allPhrase = i
  }
  
  getSpecificPhrases(p:string){
    if(this.id == 'Japanese'){
      this.input2.set(p);
      this.selectedPhrases.set(p)
    }

    
    else if(this.id =='Russian'){

    this.input5.set(p) 
    this.selectedPhrases.set(p)

    }
    
    else if(this.id == 'Italian'){
      this.input3.set(p)
      this.selectedPhrases.set(p)

    }
    
    else if(this.id == 'Korean'){
      this.inputh.set(p)
      this.selectedPhrases.set(p)
      
    }
    
    else if(this.id == 'German'){
      this.input4= p
      this.selectedPhrases.set(p)

    }
  }
    
  directionMode: string = " ";
  answerMode: string = 'type';
  currentIndex = signal(0); 
  // showAnswer2 = false;
  userInput = '';
  result = '';
  pro='kana'
  score = signal(0);

  remainingPhrases = signal<any[]>([]); // Phrases left to quiz

  directionModeCheck = computed(()=>(['kor-to-eng', 'jp-to-eng', 'itn-to-eng', 'rus-to-eng','ge-to-eng'].includes(this.directionMode)) )

 /* get currentPhrase() {
    return this.phrases()[this.currentIndex()];
  }*/


  get currentPhrase() {
  return this.remainingPhrases()[this.currentIndex()];
}
  
  startQuiz() {
  const all = this.phrases();
  this.remainingPhrases.set([...all]);   // fresh copy
  this.currentIndex.set(0);
  this.score.set(0);
  this.quizStarted = true
  this.answered.set(false)
  this.currentPhrase()
}


  getQuestion(): string {
    switch(this.id){
      case 'Korean':
        return this.directionMode === 'kor-to-eng'? this.currentPhrase.phrase: this.currentPhrase.en;
      case 'Russian':
        
        return this.directionMode === 'rus-to-eng'? this.currentPhrase.phrase:this.currentPhrase.en;
      case 'Italian':
        return this.directionMode === 'itn-to-eng'? this.currentPhrase.phrase:this.currentPhrase.en;
      case 'German':
        return this.directionMode ==='ge-to-eng'?this.currentPhrase.phrase:this.currentPhrase.en
      default:
        
        return this.directionMode === 'jp-to-eng'? this.currentPhrase.phrase:this.currentPhrase.en;
      }
    
  }

    getAnswer(): string {
      switch(this.id){
        case'Korean':
          return this.directionMode === 'kor-to-eng'
          ? this.currentPhrase.en
          : this.currentPhrase.phrase;
          
        case 'Russian':
          return this.directionMode === 'rus-to-eng'
          ? this.currentPhrase.en
          : this.currentPhrase.phrase;
          
        case 'Italian':
          
          return this.directionMode === 'itn-to-eng'
          ? this.currentPhrase.en
          : this.currentPhrase.phrase;
        
        case 'German':
          return this.directionMode ==='ge-to-eng'
          ?this.currentPhrase.en
          :this.currentPhrase.phrase;
        default:
          
          return this.directionMode === 'jp-to-eng'
          ? this.currentPhrase.en
          : this.currentPhrase.phrase;  
      }
    }
    answered = signal(false);       // tracks if current question was answered
    lastResult = signal('');        // tracks the result message

    toggleDirectionMode(mode) {
      this.directionMode = mode;
      
      // this.clearHints()
      if(!this.directionModeCheck()){this.phraseOn = true}

      this.reset();
    }

    toggleAnswerMode(mode) {
      this.answerMode = mode;
      this.reset();
    }

    reset2() {
      this.showAnswer2 = false;
      this.userInput = '';
      this.result = '';
      // this.clearHints()
    }

attemptCount = 0;
userResults: { phrase: string; correct: boolean; attempts: number }[] = [];
attempt: { phrase: string; correct: boolean }[] = [];
animationClass = '';

Popup = false
correct() { 
  this.animationClass ='animate-slide-right'
  this.answered.set(true);
  this.lastResult.set('✅');

  // ✅ Add the result for this question
  this.userResults.push({
    phrase: this.getQuestion(),
    correct: true,
    attempts: this.attemptCount + 1 // include this final correct attempt
  });

  // Reset attempt counter for the next phrase
  this.attemptCount = 0;


  console.log(this.userResults)
  this.next();
}

again() {
  this.animationClass ='animate-slide-left'

  this.answered.set(true);
  this.lastResult.set('');
  
  // ❌ Add a wrong attempt
  this.attempt.push({ phrase: this.getQuestion(), correct: false });
  this.attemptCount += 1;

  console.log(this.attempt)
  this.next();
}

next() {
  this.showAnswer2 = false;
  setTimeout(()=>{
    this.animationClass='animate-fade-in'
  },500)
  if (!this.answered()) return; // ⛔ prevent skipping unattempted

  if (this.lastResult().startsWith('✅')) {
    const list = this.remainingPhrases().slice();
    list.splice(this.currentIndex(), 1);
    this.remainingPhrases.set(list);
    // ✅ When no phrases remain, trigger result popup
    if (list.length === 0) {
      this.Popup = true; // use *ngIf in your template
      return;
    }

    this.userInput = '';
    this.currentIndex.set(this.currentIndex() % list.length);
  } else {
    // Go to next (keep list)
    this.currentIndex.update(i => (i + 1) % this.remainingPhrases().length);
  }
  this.answered.set(false);
  this.lastResult.set('');
  this.userInput = '';
  this.reset2();
}

  showPronunciation = true;

  togglePronunciation() {
    this.showPronunciation = !this.showPronunciation;
  }

  
  
  
  playAudio(text: string, lang2: string = this.lang) {
    let text2:string = text
    text2 =  text2.replace(/\[\[|\]\]/g, '');
    console.log(text2)
    const soundAudio = new SpeechSynthesisUtterance(text2);
    soundAudio.lang = lang2;

    soundAudio.rate = 0.9;    // s 

    speechSynthesis.speak(soundAudio);
  }


    hint1Array: string[] = [];
    hint2Array: string[] = [];
    showHint1 = false;
    showHint2 = false;
  appendToInput(fragment: string) {
    this.userInput += fragment;
  }
  highlightMode = false; // default off

toggleHighlight() {
  this.highlightMode = !this.highlightMode;
}
formatPhrase(phrase: string): string {
  if (!this.highlightMode) {
    // Just remove markers
   
   
    return phrase.replace(/\[\[|\]\]/g, '');
  }


  // Wrap highlighted parts in <span> with styles
  return phrase.replace(
    /\[\[(.*?)\]\]/g,
    '<span class="bg-yellow-200 text-cyan-900 rounded px-1">$1</span>'
  );
}

phraseOn = true
phraseOnMode(){
  this.phraseOn = !this.phraseOn
}

}
