import { Component,inject, signal } from '@angular/core';
import { AllphrasesService } from '../allphrases.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PhrasenameService } from '../shared/phrasename.service';
import { AuthenticationUser } from '../emitters/emittters';
import { AgainComponent } from '../again/again.component';

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
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.css',
  
})
export class ChoiceComponent {
  id :string|null = " "
  
  m1 :string|null = " "
  phrases = signal<UnifiedPhrase[]>([]);

  allListgrammer:any//: PhraseListItem[] = this.phraseNames.allListgrammer
  allPopularR:any//: PhraseListItem[] = this.phraseNames.allPopularPhrases
  allPopular:any//: PhraseListItem[] = this.phraseNames.allPopularPhrases
  allListStory:any//: PhraseListItem[] = this.phraseNames.allListStory
 
  allListRussiangrammer:any//:PhraseListItem[] = this.phraseNames.allListRussiangrammer
  allListRussianStory:any//:PhraseListItem[] = this.phraseNames.allListRussianStory
  allListPopularRussian:any//:PhraseListItem[] = this.phraseNames.allPopularRussianPhrases
  allListItaliangrammer:any//:PhraseListItem[] = this.phraseNames.allListItaliangrammer
  allListItalianStory:any//:PhraseListItem[] = this.phraseNames.allListItalianStory
  allListPopularItalian:any//:PhraseListItem[] = this.phraseNames.allPopularItalianPhrases
  allListGermangrammer:any//:PhraseListItem[] = this.phraseNames.allListGermangrammer
  allListGermanStory:any//:PhraseListItem[] = this.phraseNames.allListGermanStory

  allListJapanesegrammer:any//:PhraseListItem[] = this.phraseNames.allListJapanesegrammer
  allListJapaneseStory:any//:PhraseListItem[] = this.phraseNames.allListJapaneseStory
  allListPopularJapanese:any//:PhraseListItem[] = this.phraseNames.allPopularJapanesePhrases


  allStory =[]
  allgrammer=[]
  shuffledAn:any[] = []
  //selectedLanguage:string = ""
  lang=''
   
  input=signal("")
  input2=signal("")
  m = "select"
  phraseName = signal<string>('')

  inputh=signal<string>("")
  input3=signal("")
  input4=signal("")
  input5=signal("")
  
  input6=signal<string>("")

  direction1=''
  pro = 'phrase'
  pro2 = 'pr'

  activateRoute:ActivatedRoute = inject(ActivatedRoute)
  constructor(public phrasesService:AllphrasesService,private phraseNames:PhrasenameService,private userA:AuthenticationUser){

  }
  loadPhrasesById() {
  const inputMap = {
    'Korean': this.inputh(),
    'Japanese': this.inputh(),
    'Italian': this.inputh(),
    'German': this.inputh(),
    'Russian': this.inputh(),
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
        // console.log("this is a",data)
      switch(this.id) {
        case 'Korean':
           this.allListgrammer = data.filter(p => p.type === 'grammar');;
           this.allListStory = data.filter(p => p.type === 'story');
          break
        case 'Russian': 
          
           this.allListRussianStory = data.filter(p => p.type === 'grammar');
           this.allListRussiangrammer = data.filter(p => p.type === 'story');
          break
        case 'Italian' : 
          
           this.allListItaliangrammer = data.filter(p => p.type === 'grammar');;
           this.allListItalianStory = data.filter(p => p.type === 'story');
        break
        case 'German': this.allListGermangrammer = data;
          break
        default : 
          
           this.allListJapanesegrammer = data.filter(p => p.type === 'grammar');;
           this.allListJapaneseStory = data.filter(p => p.type === 'story');
      }
      // error: err => console.error(`Failed to load ${lang} grammar:`, err)
      

      

        switch(this.id){
          case'Korean':
            
            this.allStory = this.allListStory
            this.allgrammer= this.allListgrammer
            this.direction1= 'ko-to-en'; // can be toggled
            this.direction =  'ko-to-en';
            this.lang='ko-KR'
             break
          case 'Russian':
              this.direction1='ru-to-en'; // can be toggled
              this.lang='ru-RU'
              this.direction = 'ru-to-en';

              this.allStory = this.allListRussianStory
              this.allgrammer = this.allListRussiangrammer
              break
          
          case 'German':
              this.direction1='ge-to-en'; // can be toggled
              this.allStory = this.allListGermanStory
              this.allgrammer = this.allListGermangrammer
              this.lang='fr-FR'

              break
          case 'Japanese':
            
              this.direction1='jp-to-en'; // can be toggled
              this.direction =  'jp-to-en';

              this.allStory = this.allListJapaneseStory
              this.allgrammer = this.allListJapanesegrammer
              this.lang ='ja-JP'
              break
            
          case 'Italian':
            
            
              this.direction1='itn-to-en'; // can be toggled
            
              this.direction =  'itn-to-en';
              this.allStory = this.allListItalianStory
              this.allgrammer = this.allListItaliangrammer

              this.lang='it-IT'

        }


    }});
    }
    else{
            
        this.allListgrammer  = this.phraseNames.allListgrammer
        this.allPopularR  = this.phraseNames.allPopularPhrases
        this.allListStory = this.phraseNames.allListStory
      
        this.allListRussiangrammer = this.phraseNames.allListRussiangrammer
        this.allListPopularRussian = this.phraseNames.allPopularRussianPhrases
        this.allListRussianStory = this.phraseNames.allListRussianStory

        this.allListItaliangrammer = this.phraseNames.allListItaliangrammer
        this.allListPopularItalian = this.phraseNames.allPopularItalianPhrases
        this.allListItalianStory = this.phraseNames.allListItalianStory
        
        this.allListGermangrammer = this.phraseNames.allListGermangrammer
        this.allListGermanStory = this.phraseNames.allListGermanStory

        this.allListJapanesegrammer = this.phraseNames.allListJapanesegrammer
        this.allListPopularJapanese = this.phraseNames.allPopularJapanesePhrases
        this.allListJapaneseStory  = this.phraseNames.allListJapaneseStory
        

      
      

        switch(this.id){
          case'Korean':
            
            this.allStory = this.allListStory
            this.allPopular = this.allPopularR
            this.allgrammer= this.allListgrammer
            this.direction1= 'ko-to-en'; // can be toggled
            this.direction =  'ko-to-en';
            this.lang='ko-KR'
             break
          case 'Russian':
              this.direction1='ru-to-en'; // can be toggled
              this.lang='ru-RU'
              this.direction = 'ru-to-en';

              this.allStory = this.allListRussianStory
              this.allPopular = this.allListPopularRussian
              this.allgrammer = this.allListRussiangrammer
              break
          
          case 'German':
              this.direction1='ge-to-en'; // can be toggled
              this.allStory = this.allListGermanStory
              
              this.allgrammer = this.allListGermangrammer
              this.lang='fr-FR'

              break
          case 'Japanese':
            
              this.direction1='jp-to-en'; // can be toggled
              this.direction =  'jp-to-en';

              this.allStory = this.allListJapaneseStory
              this.allPopular = this.allListPopularJapanese
              this.allgrammer = this.allListJapanesegrammer
              this.lang ='ja-JP'
              break
            
          case 'Italian':
            
            
              this.direction1='itn-to-en'; // can be toggled
            
              this.direction =  'itn-to-en';
              this.allStory = this.allListItalianStory
              this.allPopular = this.allListPopularItalian
              this.allgrammer = this.allListItaliangrammer

              this.lang='it-IT'

        }



    }


    

    // ✅ Load data after setting ID and language config
  
  
    this.loadPhrasesById();


    
  });

    this.selectPhraseList()
}

setUnifiedPhrases(lang: string, phraseList: any[]) {
  const validList = Array.isArray(phraseList) ? phraseList : [];
  this.phrases.set(validList);
}

  start(){
      this.ngOnInit()
      this.shuffleQuestions();
      this.generateOptions();

  }
  ans:string=""

  pr:boolean = false
  ans2:string =""
  scores:Set<number>= new Set<number>()
  increment :number = 0
  inc():void{
    this.increment+=1
  }


  setOfNumbers = new Set<number>();


  createSet():Set<number>{
    
    this.setOfNumbers.add(Math.floor(Math.random() * length))
    this.setOfNumbers.add(Math.floor(Math.random() * length))
    this.setOfNumbers.add(Math.floor(Math.random() * length))
    return this.setOfNumbers

  }
  
  
  shuffleAnswers(){
    //if(this.id=='Korean'){
    this.shuffledAn = this.phrases()

    for (let i = this.phrases().length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledAn[i], this.shuffledAn[j]] = [this.shuffledAn[j], this.shuffledAn[i]];}
    
  }
  
  shuffledChars:number[]=[]
  shuffleQuestions2(){
    //if(this.id=='Korean'){
    length = this.phrases().length
    
  if (this.createSet.length != 3){
      this.createSet()}
    this.setOfNumbers.add(this.increment)


    
    
    this.shuffledChars= Array.from(this.setOfNumbers)
    for (let i = this.shuffledChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledChars[i], this.shuffledChars[j]] = [this.shuffledChars[j], this.shuffledChars[i]];}
    return this.shuffledChars
  }

rQuestions = [4,2,3,1]

toggle = false
toggleStart(){
  

  this.ngOnInit()
  this.toggle = !this.toggle

}
startQuiz(){

  
  this.on = !this.on
  this.quizStarted = true
  
  this.increment = 0
  this.shuffleQuestions()
  this.shuffleAnswers()
  this.generateOptions();
  //this.toggleStart()
  this.scores.clear()
  this.result=""
  //this.ngOnInit()

  
  

  this.showResults = false;         // 👈 Controls result view
  this.showTryAgainPopup = false;   // 👈 Controls try-again popup
  this.correctAnswers = [];  // 👈 Store correct questions
  this.wrongAnswers = [];    // 👈 Store wrong questions

  this.userResults = []
  this.quizFinished = false

}


sideBar:boolean = true
toggleSidebar(){
    this.ngOnInit()

  this.sideBar = !this.sideBar
}

close2(){
  //this.isReadyToStart = 
  this.ngOnInit()

  this.currentIndex=0
  this.score=0
  this.sideBar = !this.sideBar

  //this.quizStarted = true
  this.ngOnInit()
  

  //this.generateOptions()

}
getSpecificPhrases(p:any){
  if(this.id == 'Japanese'){
    this.inputh.set(p) 
    this.phraseName.set(p)

  }

  
  else if(this.id =='Russian'){

  this.inputh.set(p) 

  this.phraseName.set(p)
  }
  
  else if(this.id == 'Italian'){
    this.inputh.set(p) 
    this.phraseName.set(p)

  }
  
  else if(this.id == 'Korean'){
    this.inputh.set(p)
    this.phraseName.set(p)

  }
  
  else if(this.id == 'German'){
    this.inputh.set(p)
      this.phraseName.set(p)

  }
}
again(){
  this.increment = 0
}

romanitization(){
  
  this.pr = !this.pr 
}

result:string = ""
getEvent(e:any){
  console.log(e)
  
  if(e == this.shuffledAn[this.increment].en){ 
    this.result = "correct"
  }else if((e == this.shuffledAn[this.increment].itn)||(e == this.shuffledAn[this.increment].ge)){
    this.result = "correct" 
  }else{
   
    this.result = "incorrect" 
    this.scores.add(this.increment) 
  }

  }


  study:string = "kte"
  getAnswer2(an:any){
    this.study = an
  }
  //selectedPhrases(s:any){
    //this.input = s
  //}

  on = false;
  settingsOn = false
  settings(){
    this.settingsOn = !this.settingsOn
  }
  show = false
  seePhrases(){
    this.show = !this.show
  }

 //phrases2= signal<allphrases[]>(this.phrases())
 
 

  currentIndex = 0;
  options: { text: string; pr?: string }[] = [];
  score = 0;
  showAnswer = false;

  direction:string| 'ko-to-en' | 'en-to-ko'|'ru-to-en'|'en-to-ru'|'jp-to-en'|'en-to-jp'|'ge-to-en'|'en-to-ge'|'itn-to-en'|'en-to-itn'= this.direction1; // can be toggled

shuffleQuestions() {
  const shuffled = [...this.phrases()].sort(() => Math.random() - 0.5);
  this.phrases.set(shuffled);
}
/*
  generateOptions() {
    const current = this.phrases[this.currentIndex];
    const answers = this.phrases
      .filter((p, i) => i !== this.currentIndex)
      .map(p => this.direction === this.direction1 ? p.en : p[this.pro]);

    const correct = this.direction === this.direction1 ? current.en : current[this.pro];
    this.options = [...answers.slice(0, 3), correct].sort(() => Math.random() - 0.5);
  }*/


generateOptions() {
  const current = this.phrases()[this.currentIndex];
  const answerPool = [...this.phrases()]
    .filter((_, i) => i !== this.currentIndex)
    .slice(0, 3)
    .map(p => ({
      text: this.direction === this.direction1
        ? p.en
        : p[this.pro], // ko or pr
      pr: p[this.pro2]
    }));
  const correct = {
    text: this.direction === this.direction1
      ? current.en
      : current[this.pro],
    pr: current[this.pro2]
  };
  this.options = [...answerPool, correct].sort(() => Math.random() - 0.5);
}
selectedOption: string | null = null;
isCorrect = null;
/*selectAnswer(option: string) {
  this.selectedOption = option;

  const correct = this.direction === this.direction1 ?
    this.phrases()[this.currentIndex].en :
    this.phrases()[this.currentIndex][this.pro];

  if (option === correct) {
    this.isCorrect = true;
    this.score++;
  }else{
    this.isCorrect = false;
  }

  // this.showAnswer = true;
  // setTimeout(() => this.next(), 1000);
  

  if (this.currentIndex < this.phrases().length - 1) {
    // this.currentIndex++;
    setTimeout(() => this.next(), 1000);

  } else {
    // ✅ Mark quiz finished
    this.quizFinished = true;
  }

}*/
selectAnswer(option: string) {
  this.selectedOption = option;

  const currentPhrase = this.phrases()[this.currentIndex];
  const correct = this.direction === this.direction1
    ? currentPhrase.en
    : currentPhrase[this.pro];

  if (option === correct) {
    this.isCorrect = true;
    this.score++;
    this.correctAnswers.push(currentPhrase);   // ✅ Record correct
  } else {
    this.isCorrect = false;
    this.wrongAnswers.push(currentPhrase);     // ❌ Record wrong
  }

  if (this.currentIndex < this.phrases().length - 1) {
    setTimeout(() => this.next(), 1000);
  } else {
    this.quizFinished = true;
    this.showResults = true;                   // 👈 Show results div
  }

      this.userResults=[...this.correctAnswers.map(p => ({ phrase:p, correct: true })),...this.wrongAnswers.map(p => ({ phrase:p, correct: false }))]
}
//sm
// After: quizFinished = false;



showResults = false;         // 👈 Controls result view
showTryAgainPopup = false;   // 👈 Controls try-again popup
correctAnswers: any[] = [];  // 👈 Store correct questions
wrongAnswers: any[] = [];    // 👈 Store wrong questions

userResults = [
];


  next() {
    this.currentIndex++;
    if (this.currentIndex >= this.phrases().length) {
      this.currentIndex = 0;
      this.score = 0;
      this.shuffleQuestions();
    }
    this.showAnswer = false;
    this.selectedOption = null; // 👈 reset selection
    this.generateOptions();
    // this.userResults=[...this.correctAnswers.map(p => ({ phrase:p, correct: true })),...this.wrongAnswers.map(p => ({ phrase:p, correct: false }))]
  }
  showphrase = true
  showPhrase(){
    this.showphrase = !this.showphrase
  }
  toggleDirection() {


    switch(this.id){
      case'Korean':
        this.direction = this.direction === 'ko-to-en' ? 'en-to-ko' : 'ko-to-en';
        this.generateOptions();
        break
      case 'Russian':

        this.direction = this.direction === 'ru-to-en' ? 'en-to-ru' : 'ru-to-en';
        this.generateOptions();
        break
      
      case 'German':

        this.direction = this.direction === 'ge-to-en' ? 'en-to-ge' : 'ge-to-en';
        this.generateOptions();
        break
      
      case 'Italian':

        this.direction = this.direction === 'itn-to-en' ? 'en-to-itn' : 'itn-to-en';
        this.generateOptions();
        break
      
      case 'Japanese':

        this.direction = this.direction === 'jp-to-en' ? 'en-to-jp' : 'jp-to-en';
        this.generateOptions();
  
  
  }
  }


  
playAudio(text: string, lang2: string = this.lang) {
  if(this.id==='Japanese'){
    text = text.replace(/\[\[|\]\]/g, '').replace(/\s/g,'');
  }
  else{text = text.replace(/\[\[|\]\]/g, '')}

  const soundAudio = new SpeechSynthesisUtterance(text);
  soundAudio.lang = lang2;  
  soundAudio.rate = 0.9
  speechSynthesis.speak(soundAudio);
}

highlightMode = false
highlight(){
  this.highlightMode = !this.highlightMode
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
quizFinished = false;


/*tryAgain() {
  this.score = 0;
  this.currentIndex = 0;
  this.quizFinished = false;
  this.quizStarted = true; // restart immediately

  this.shuffleQuestions();
  this.generateOptions();
  this.showAnswer = false;
}*/

tryAgain() {
  this.showResults = false;
  this.quizFinished = false;
  this.currentIndex = 0;
  this.score = 0;
  this.correctAnswers = [];
  this.wrongAnswers = [];
  this.startQuiz(); // or whatever function begins the next set
  // this.shuffleQuestions();
  // this.generateOptions();

}

nextQuiz() {
  this.showResults = false;
  this.quizFinished = false;
  this.correctAnswers = [];
  this.wrongAnswers = [];
  this.startQuiz(); // or whatever function begins the next set
}



isReadyToStart = false;

quizStarted = false
selectPhraseList() {
  this.isReadyToStart = this.phrases().length > 0;
  this.quizStarted = false; // reset if switching
}
openTryAgain() {
  this.showResults = false;
  this.showTryAgainPopup = true;
}

closePopup() {
  this.showTryAgainPopup = false;
}

}
