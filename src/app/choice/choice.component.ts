import { Component,inject, signal } from '@angular/core';
// import { KoreanPhrases } from '../shared/models/KoreanPhrases';
import { AllphrasesService } from '../allphrases.service';
// import { RussianPhrases } from '../shared/models/RussianPhrases';
// import { ItalianPhrases } from '../shared/models/ItalianPhrases';
// import { GermanPhrases } from '../shared/models/GermanPhrases';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { JapanesePhrases } from '../shared/models/JapanesePhrases';
import { allphrases } from '../shared/models/Allphrases';
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
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrl: './choice.component.css'
})
export class ChoiceComponent {
  id :string|null = " "
  
  phrases = signal<UnifiedPhrase[]>([]);

  allListgrammer:any//: PhraseListItem[] = this.phraseNames.allListgrammer
  allListStory:any//: PhraseListItem[] = this.phraseNames.allListStory
 
  allListRussiangrammer:any//:PhraseListItem[] = this.phraseNames.allListRussiangrammer
  allListRussianStory:any//:PhraseListItem[] = this.phraseNames.allListRussianStory

  allListItaliangrammer:any//:PhraseListItem[] = this.phraseNames.allListItaliangrammer
  allListItalianStory:any//:PhraseListItem[] = this.phraseNames.allListItalianStory
  allListGermangrammer:any//:PhraseListItem[] = this.phraseNames.allListGermangrammer
  allListGermanStory:any//:PhraseListItem[] = this.phraseNames.allListGermanStory
  allListJapanesegrammer:any//:PhraseListItem[] = this.phraseNames.allListJapanesegrammer
  allListJapaneseStory:any//:PhraseListItem[] = this.phraseNames.allListJapaneseStory
  


  allStory =[]
  allgrammer=[]
  shuffledAn:any[] = []
  //selectedLanguage:string = ""
  lang=''

  input=signal("")
  input2=signal("")
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

  /*ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      const tempId: string | null = params.get('id');
       this.id = tempId;
// ///////////////////////
//   if (!this.id) return;

//   const inputMap = {
//     'Korean': this.inputh(),
//     'Japanese': this.inputh(),
//     'Italian': this.inputh(),
//     'German': this.inputh(),
//     'Russian': this.inputh(),
//   };

//   const inputKey = inputMap[this.id];

//   const phraseLoaderMap = {
//     'Korean': this.phrasesService.getPhrases(),
//     'Japanese': this.phrasesService.getJapanesePhrases(),
//     'Italian': this.phrasesService.getItalianPhrases(),
//     'German': this.phrasesService.getGermanPhrases(),
//     'Russian': this.phrasesService.getRussianPhrases()
//   };

//   const observable$ = phraseLoaderMap[this.id];

//   observable$.subscribe({
//     next: (data: any) => {
//       const phrases = data[inputKey];
//       this.setUnifiedPhrases(this.id, phrases);
//     },
//     error: (error: any) => {
//       alert(`❌ Failed to load ${this.id} phrases: ${error.message}`);
//     }
//   });

      });

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
              this.loadPhrasesById()

    


    }
*/

check = signal<any>('')
a_load = false
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
        this.allListStory = this.phraseNames.allListStory
      
        this.allListRussiangrammer = this.phraseNames.allListRussiangrammer
        this.allListRussianStory = this.phraseNames.allListRussianStory

        this.allListItaliangrammer = this.phraseNames.allListItaliangrammer
        this.allListItalianStory = this.phraseNames.allListItalianStory
        this.allListGermangrammer = this.phraseNames.allListGermangrammer
        this.allListGermanStory = this.phraseNames.allListGermanStory
        this.allListJapanesegrammer = this.phraseNames.allListJapanesegrammer
        this.allListJapaneseStory  = this.phraseNames.allListJapaneseStory
        

      
      

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
  //}
    
    /*else if(this.id=='Russian'){
      length = this.ruPhrases.length}
      
     
    else if(this.id=='Italian'){
      length = this.itnPhrases.length}
      
    
    else if(this.id=='German'){
        length = this.gePhrases.length}
        
     
    else if(this.id=='Japanese'){
      length = this.jpPhrases.length}*/
      
            
    
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
}/*
generateOptions() {
  const current = this.phrases[this.currentIndex];

  const answerPool = this.phrases
    .filter((_, i) => i !== this.currentIndex)
    .slice(0, 3)
    .map(p => {
      const option: any = {
        text: this.direction === this.direction1 ? p.en : p[this.pro]
      };

      if (this.direction === this.direction1) {
        option.pr = p[this.pro2]; // e.g., p.pr
      }

      return option;
    });

  const correct: any = {
    text: this.direction === this.direction1 ? current.en : current[this.pro]
  };

  if (this.direction === 'en-to-ko') {
    correct.pr = current[this.pro2]; // e.g., current.pr
  }

  this.options = [...answerPool, correct].sort(() => Math.random() - 0.5);
}*/


  /*electAnswer(option: string) {
    const correct = this.direction === this.direction1 ?
      this.phrases[this.currentIndex].en : this.phrases[this.currentIndex][this.pro];

    if (option === correct) {
      this.score++;
    }

    this.showAnswer = true;
    setTimeout(() => this.next(), 1000);
  }*/

selectedOption: string | null = null;
isCorrect = null;
 selectAnswer(option: string) {
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

}


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


tryAgain() {
  this.score = 0;
  this.currentIndex = 0;
  this.quizFinished = false;
  this.quizStarted = true; // restart immediately

  this.shuffleQuestions();
  this.generateOptions();
  this.showAnswer = false;
}

isReadyToStart = false;

quizStarted = false
selectPhraseList() {
  this.isReadyToStart = this.phrases().length > 0;
  this.quizStarted = false; // reset if switching
}

}
