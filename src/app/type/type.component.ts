import { Component, computed, Input, signal } from '@angular/core';
import { AllphrasesService } from '../allphrases.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhraseListItem } from '../shared/phrase-list.service';
import { PhrasenameService } from '../shared/phrasename.service';
import { AuthenticationUser } from '../emitters/emittters';
import { AutofocusDirective } from '../autofocus.directive';

interface phraseDescription {
  's':'',
  'isDone':''
}


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
  selector: 'type',
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent {
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

  phrasesList
  phraseListRussian2
  phrasesListRussian
  phrasesListItalian 
  phraseListItalian2  
  phrasesListGerman
  phrasesListGerman2
  japaneseStory

  phrasesListJapanese=this.phraseNames.allListJapanesegrammer  

  check = signal<string>('')

  
  directionModeC :string=""
  directionModeE:string =""
  id:string=""
  
  la:string = ""
  lang:string = ""
  phraseStory: any;
  phraseCourse: any;
  phrases = signal([]);
  a_load = false
  constructor(private phrasesService:AllphrasesService,private userA:AuthenticationUser,private activateRoute: ActivatedRoute,private phraseNames:PhrasenameService){
    
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
    if (!lang) return;
    this.id = lang;

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

      this.phrasesList = this.phraseNames.allListgrammer
      this.phraseListRussian2 = this.phraseNames.allListRussianStory
      this.phrasesListRussian = this.phraseNames.allListRussiangrammer
      this.phrasesListItalian = this.phraseNames.allListItaliangrammer
      this.phraseListItalian2  = this.phraseNames.allListItalianStory
      this.phrasesListGerman = this.phraseNames.allListGermangrammer
      this.phrasesListGerman2 = this.phraseNames.allListGermanStory
      this.japaneseStory = this.phraseNames.allListJapaneseStory

      this.phrasesListJapanese = this.phraseNames.allListJapanesegrammer  
      

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
    }


    

    // ✅ Load data after setting ID and language config
  
  
    this.loadPhrasesById();
  });
    this.selectPhraseList()
}
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
    // this.ngOnInit()
    this.loadPhrasesById()
    this.sideBar = !this.sideBar
  }

  close(){
    // this.ngOnInit()
    this.loadPhrasesById()
    this.currentIndex.set(0)
    this.sideBar =!this.sideBar
    this.loadPhrasesById()
    // this.ngOnInit()
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
      this.input4.set(p)
      this.selectedPhrases.set(p)

    }
  }
    
  directionMode: string = " ";
  answerMode: string = 'type';
  currentIndex = signal(0);
  showAnswer2 = false;
  userInput = '';
  result = '';
  pro='kana'
  score = signal(0);

  remainingPhrases = signal<any[]>([]); // Phrases left to quiz

  directionModeCheck = computed(()=>(['kor-to-eng', 'jp-to-eng', 'itn-to-eng', 'rus-to-eng','fr-to-eng'].includes(this.directionMode)) )

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
    this.lastResult.set('')
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
        return this.directionMode ==='fr-to-eng'?this.currentPhrase.phrase:this.currentPhrase.en
      default:
        
        return this.directionMode === 'jp-to-eng'? this.currentPhrase.phrase:this.currentPhrase.en;
      }
    
  }


  getAnswer(): string {
  switch (this.id) {
    case 'Korean':
      if (this.directionMode === 'kor-to-eng') {
        return this.currentPhrase.en;
      } else { // eng-to-kor
        return this.showPronunciation ? this.currentPhrase.pr : this.currentPhrase.phrase;
      }

    case 'Russian':
      if (this.directionMode === 'rus-to-eng') {
        return this.currentPhrase.en;
      } else { // eng-to-rus
        return this.showPronunciation ? this.currentPhrase.pr : this.currentPhrase.phrase;
      }

    case 'Italian':
      if (this.directionMode === 'itn-to-eng') {
        return this.currentPhrase.en;
      } else { // eng-to-itn
        return this.showPronunciation ? this.currentPhrase.pr : this.currentPhrase.phrase;
      }

    case 'German':
      if (this.directionMode === 'de-to-eng') {
        return this.currentPhrase.en;
      } else { // eng-to-de
        return this.showPronunciation ? this.currentPhrase.pr : this.currentPhrase.phrase;
      }

    default: // Japanese
      if (this.directionMode === 'jp-to-eng') {
        return this.currentPhrase.en;
      } else { // eng-to-jp
        return this.showPronunciation ? this.currentPhrase.pr : this.currentPhrase.phrase;
      }
  }
}

    answered = signal(false);       // tracks if current question was answered
    lastResult = signal<string>('');        // tracks the result message

/*selectAnswer(selected: string) {
  const current = this.currentPhrase;

  const isCorrect =
    (this.directionMode === 'kor-to-eng' && selected === current.en) ||
    (this.directionMode === 'eng-to-kor' && selected === current.ko);
  console.log(selected,current.en)
  console.log(isCorrect)
  if (isCorrect) {
    this.score.update(s => s + 1);
    
    // ✅ Remove correct item
    const list = this.remainingPhrases().slice();
    list.splice(this.currentIndex(), 1); // remove current
    this.remainingPhrases.set(list);
    
    // If more phrases remain, reset index
    if (list.length > 0) {
      this.currentIndex.set(this.currentIndex() % list.length); // wrap-around
    } else {
      alert("🎉 Quiz Complete!");
    }
  } else {
    // ❌ Move to next phrase (keeping the current one in list)
    this.currentIndex.update(i => (i + 1) % this.remainingPhrases().length);
  }
}*/

    toggleDirectionMode(mode) {
      this.directionMode = mode;
      if(!this.directionModeCheck()){this.phraseOn = true}
      
      this.clearHints()
      this.reset();
    }

    toggleAnswerMode(mode) {
      this.answerMode = mode;
      this.reset();
    }

   updateAnswer(char: string) {
    const before = this.userInput.slice(0, this.cursorPos);
    const after = this.userInput.slice(this.cursorPos);
    this.userInput = before + char + after;
    this.cursorPos += char.length;

  // Optional: move cursor visually
  setTimeout(() => {
    const inputElem = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (inputElem) {
      inputElem.setSelectionRange(this.cursorPos, this.cursorPos);
      inputElem.focus();
    }
  });
}

submitAnswer() {
  const correct = this.getAnswer().trim().toLowerCase().replace(/\[\[|\]\]/g, '').replace(/[.,!?/-]/g, '').replace(/\s/g,'').replace(/\([^)]*\)/g, '')
;

  let answeredUser = this.userInput.trim().toLowerCase().replace(/\[\[|\]\]/g, '').replace(/[.,!?/-]/g, '').replace(/\s/g,'');


  if (answeredUser === correct && answeredUser !== '') {
    this.lastResult.set('✅ Correct!');
    // this.triggerAnimation('✅');

    this.answered.set(true);

  } else {
    this.lastResult.set(`❌ Incorrect. Answer: ${this.getAnswer()}`)//,correct: ${correct}, user: ${answeredUser}`);
    // this.triggerAnimation('❌');

    this.answered.set(true);

  }
  

}

    reset2() {
      this.showAnswer2 = false;
      this.userInput = '';
      this.result = '';
      this.clearHints()
    }

    /*2?next() {
  
    }*/
   correct(){
    this.answered.set(true)
    this.lastResult.set('✅')
    this.next()
   }
   again(){

    
    this.answered.set(true)
    this.lastResult.set('')
    this.next()
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

  this.answered.set(false);
  this.lastResult.set('');
  this.userInput = '';
  this.reset2();
}


   /* prev() {
      if (this.currentIndex() > 0) {
        this.currentIndex.update(current =>current -1);
        this.reset2();
      }
    }*/

      prev() {
  if (this.currentIndex() > 0) {
    this.currentIndex.update(current => current - 1);
    this.answered.set(false);
    this.lastResult.set('');
    this.userInput = '';
    this.reset2();
  }
}

    showPronunciation = true;

  togglePronunciation() {
    this.showPronunciation = !this.showPronunciation;
  }

  
  
  
  playAudio(text: string, lang2: string = this.lang) {
    let text2:string

    text2 =  text.replace(/\[\[|\]\]/g, ' ');
    // console.log(text2)
    const soundAudio = new SpeechSynthesisUtterance(text2);
    soundAudio.lang = lang2;
    soundAudio.rate = 0.9;    // s 

    speechSynthesis.speak(soundAudio);
  }


    hint1Array: string[] = [];
    hint2Array: string[] = [];
    showHint1 = false;
    showHint2 = false;
generateHint1() {
  // Decide whether to use pronunciation or normal script
  const answer = (this.showPronunciation ? this.currentPhrase.pr : this.getAnswer())
    .replace(/\s+/g, '')
    .replace(/\[\[|\]\]/g, '');

  this.hint1Array = [...answer].sort(() => Math.random() - 0.5);
  this.showHint1 = true;
}

generateHint2() {
  const answer = (this.showPronunciation ? this.currentPhrase.pr : this.getAnswer())
    .replace(/\[\[|\]\]/g, '');
    
  this.hint2Array = answer.split(/\s+/).sort(() => Math.random() - 0.5);
  this.showHint2 = true;
}


  clearHints() {
    
    this.hint1Array = [];
    // this.userInput = '';
    this.hint2Array = [];
    this.showHint1 = false;
    this.showHint2 = false;
  }

  /*#inputRefappendToInput(fragment: string) {
    this.userInput += fragment;
  }*/
  highlightMode = false; // default off

toggleHighlight() {
  this.highlightMode = !this.highlightMode;
}
formatPhrase(phrase: string): string {
  if (!this.highlightMode) {
    // Just remove markers
   
   
    return phrase.replace(/\[\[|\]\]/g, '')
  }
  // Wrap highlighted parts in <span> with styles
  return phrase.replace(
    /\[\[(.*?)\]\]/g,
    '<span class="bg-yellow-200 text-cyan-900 rounded px-1">$1</span>'
  )
}

replayKey: string | null = null;


triggerAnimation(type: any) {
  this.replayKey = null; // reset first
  this.replayKey=type; 
  console.log('Animation triggered:', type);
  console.log(this.replayKey)
}


  showHints = true;

  initial = '';
  vowel = '';
  final = '';
  output = '';

  // Main character sets
  CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
  JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
  JONG = ['', 'ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

  // Romaja hints for UI
  CHO_ROMAJA = ['g','kk','n','d','tt','r/l','m','b','pp','s','ss','ng','j','jj','ch','k','t','p','h'];
  JUNG_ROMAJA = ['a','ae','ya','yae','eo','e','yeo','ye','o','wa','wae','oe','yo','u','wo','we','wi','yu','eu','ui','i'];
  JONG_ROMAJA = ['','g','kk','gs','n','nj','nh','d','r','rg','rm','rb','rs','rt','rp','rh','m','b','bs','s','ss','ng','j','ch','k','t','p','h'];

  // Toggle show/hide
  toggleHints() {
    this.showHints = !this.showHints;
  }

  selectInitial(char: string) {
    this.initial = char;
    this.updateOutput();
  }

  selectVowel(char: string) {
    this.vowel = char;
    this.updateOutput();
  }

  selectFinal(char: string) {
    this.final = char;
    this.updateOutput();
  }

  updateOutput() {
    const choIndex = this.CHO.indexOf(this.initial);
    const jungIndex = this.JUNG.indexOf(this.vowel);
    const jongIndex = this.JONG.indexOf(this.final);

    if (choIndex === -1 || jungIndex === -1) {
      this.output = '';
      return;
    }

    const code = 0xAC00 + (choIndex * 21 * 28) + (jungIndex * 28) + (jongIndex !== -1 ? jongIndex : 0);
    this.output = String.fromCharCode(code);
  }

  resets() {
    this.initial = '';
    this.vowel = '';
    this.final = '';
    this.output = '';
  }

cursorPos = 0;

// updateCursor(input: HTMLInputElement) { 
  // this.cursorPos = input.selectionStart ?? this.userInput.length;
// }
// cursorPos = 0;
// userInput = "";

someInputRef: HTMLInputElement;
updateCursor(input: HTMLInputElement) {
  this.someInputRef = input;
  this.cursorPos = input.selectionStart ?? this.userInput.length;
}

appendToInput(fragment: string, input?: HTMLInputElement) {
  // input = input || this.someInputRef;
  const before = this.userInput.slice(0, this.cursorPos);
  const after = this.userInput.slice(this.cursorPos);
  this.userInput = before + fragment + after;

  // update cursor position
  this.cursorPos += fragment.length;

  // optional: set the cursor back in the input
  if (input) {
    setTimeout(() => {
      input.selectionStart = this.cursorPos;
      input.selectionEnd = this.cursorPos;
      input.focus();
    });
  }
}

@Input() sentence: any;  // {jp, kana, en, pitch}
sentences = [
  {
    jp: "電源 は どこ です か？",
    kana: ["で","ん","げ","ん"," ","は"," ","ど","こ"," ","で","す"," ","か","？"],
    en: "Where is the power outlet?",
    pitch: ["L","H","L","L","L","H","L","L","H","L","H","L","L","L","H","L"]
  },
  {
    jp: "Wi-Fi は あります か？",
    kana: ["わ","い","ふ","ぁ","い"," ","は"," ","あ","り","ま","す"," ","か","？"],
    en: "Do you have Wi-Fi?",
    pitch: ["H","L","H","L","H","L","H","L","H","L","H","L","L","H","L"]
  }
];
phraseOn = true
phraseOnMode(){
  this.phraseOn = !this.phraseOn
}



}



