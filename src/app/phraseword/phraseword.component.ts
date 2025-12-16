import { Component, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AllphrasesService } from '../allphrases.service';
import { AuthenticationUser } from '../emitters/emittters';



// This is the TypeScript and HTML structure for an Angular component to handle a Japanese quiz app.

// quiz.component.ts

interface QuizOption {
  jp: string;
  kana: string;
  en: string;
  grammarPoint: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  phrase: string;
  kana: string;
  en: string;
  grammarPoint: string;
  options: QuizOption[];
}

@Component({
  selector: 'app-phraseword',
  templateUrl: './phraseword.component.html',
  styleUrl: './phraseword.component.css'
})
export class PhrasewordComponent {


  a = false
  pr = false


  currentQuestionIndex = 0;
  selectedIndex: number | null = null;
  score = 0;
  quizComplete = false; 
  shuffledOptions: any[] = [];
  id : string = ""
  koreanPhraseNames = [{s:'course1',isDone:false},{s:'course2',isDone:false},{s:'course3',isDone:false},{s:'course4',isDone:false},{s:'course5',isDone:false}]
  russianPhraseNames = [{s:"course1",isDone:true}]

  italianPhraseNames =[{s:'part1',isDone:false},{s:'part2',isDone:false},{s:'part3',isDone:false},{s:'part4',isDone:false},{s:'part5',isDone:false}]

  japanesePhraseNames = [{s:'part1',isDone:false},{s:'part2',isDone:false},{s:'part3',isDone:false},{s:'part4',isDone:false},{s:'part5',isDone:false},{s:'part6',isDone:false},{s:'part7',isDone:false}]

  selectedPhrases = signal<string>("");


  get currentPhrase() {
     
    return this.phrases()//this.remainingPhrases()[this.currentIndex()];
} 
   
  questionsPolite
  input = signal<any>('')
  speak = '' 
  questions
  test
  m = "phrase"
  initial:string = ""
  a_load = false
  check = signal<string>('')
  constructor(private activateRoute:ActivatedRoute,private phrasesService:AllphrasesService,private userA:AuthenticationUser){



  }////////////////////////////////////////////////////////////////////////////////////
  
loadPhrasesById() {
  const inputMap = {
    'Korean': this.input(),
    'Japanese': this.input(),
    'Italian': this.input(),
    'German': this.input(),
    'Russian': this.input(),
  };
  //calls phrase service to json phrase
  const phraseLoaderMap = {
    'Korean': this.phrasesService.getKoreanPhraseword(),
    'Japanese': this.phrasesService.getJapanesePhraseword(),
    'Italian': this.phrasesService.getItalianPhraseword(),
    'German': this.phrasesService.getGermanPhrases(),
    'Russian': this.phrasesService.getRussianPhraseword()
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
  });}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    /*this.activateRoute.paramMap.subscribe((params: ParamMap) => {
  const tempId: string | null = params.get('id');
  this.id = tempId;

  if (!this.id) return;

  const inputMap = {
    'Korean': this.input(),
    'Japanese': this.input(),
    'Italian': this.input(),
    'Russian': this.input(),
  };

  const inputKey = inputMap[this.id];

  const phraseLoaderMap = {
    'Korean': this.phrasesService.getKoreanPhraseword(),
    'Japanese': this.phrasesService.getJapanesePhraseword(),
    'Italian': this.phrasesService.getItalianPhraseword(),
    'German': this.phrasesService.getGermanPhrases(),
    'Russian': this.phrasesService.getRussianPhraseword()
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
});*/
    
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
    // if(this.check() ==='signed in'){}

    switch(this.id){
      case 'Korean':
        this.initial = 'ko'
        this.speak = 'ko-KR'
        this.phraseStory = this.koreanPhraseNames

        break
      case 'Russian':
        this.initial = 'ru'
        this.speak  = 'ru-RU'
        this.phraseStory = this.russianPhraseNames

        //this.questions= []
      break
      case 'Italian':
        this.initial = 'itn'
        this.speak = 'it-IT'
        this.phraseStory = this.italianPhraseNames

       // this.questions=[]
    break
      default:
        this.initial = 'jp'
        this.speak = 'ja-JP'
        this.phraseStory = this.japanesePhraseNames

      break
  }

  this.loadPhrasesById()
});
    this.selectPhraseList()

    // this.shuffleCurrentOptions();
  }

setUnifiedPhrases(lang: string, phraseList: any[]) {
  this.phrases.set(phraseList);
  this.test=this.phrases()
  
  console.log("phrases",this.phrases())
  console.log("test",this.test)


}
  ans :string= ""
  ans2:string=""
  ans3:string =""
    getAnswer(){

      switch(this.id){
        case 'Korean':
          this.a = !this.a
          this.ans = this.phrases()[this.count].answer.ko
          this.ans2 = this.phrases()[this.count].answer.ko
          this.ans3 = this.questionsPolite[this.count].answer.ko
          break
        case 'Russian':
          
          this.a = !this.a
          this.ans = this.test[this.count].answer.ru
          this.ans2 = this.questions[this.count].answer.ru
          this.ans3 = this.questionsPolite[this.count].answer.ru
          break
        case 'Italian':
          
          this.a = !this.a
          this.ans = this.test[this.count].answer.itn
          this.ans2 = this.questions[this.count].answer.itn
          this.ans3 = this.questionsPolite[this.count].answer.itn
          
          break
        default:
          
          this.a = !this.a
          this.ans = this.test[this.count].answer.jp
          this.ans2 = this.questions[this.count].answer.jp
          this.ans3 = this.questionsPolite[this.count].answer.jp
          break
        }


    }
    
  
  isReadyToStart = false;
  quizStarted = false
selectPhraseList() {
  // this.phrases()
  this.isReadyToStart = this.phrases().length > 0;
  this.quizStarted = false; // reset if switching

}

playSpeech(text: string) {
  if (!window.speechSynthesis) return;
  
    let text2:string = text
    text2 =  text2.replace(/\s\[\[|\]\]/g, '');
    const lang = this.speak; // default Japanese
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;    // s
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

playSpeechForQuestion(question: any) {
  let text = question[this.initial];

  if (Array.isArray(question.answer)) {
    // Replace blanks one by one
    question.answer.forEach((ans: any) => {
      text = text.replace('___', ans[this.initial]);
    });
  } else {
    // Fallback if single answer
    text = text.replace(/___/g, question.answer[this.initial]);
  }

  this.playSpeech(text);
}


  
  startQuiz() {
    const all = this.phrases();
    // this.remainingPhrases.set([...all]);   // fresh copy
    // this.currentIndex.set(0);

    this.score = 0;
    this.currentQuestionIndex = 0;
    this.quizStarted = true
    this.quizComplete = false;
    this.answerChecked = false;
    this.answered = false;
    this.selectedIndex = null;
    this.selectedOption = null;
    this.answerChecked2 = false;
    this.correctAnswers = [];
    this.wrongAnswers = [];
    this.userResults = []
    this.shuffleCurrentOptions();
    // this.answered.set(false)
    this.currentPhrase()
}


    rominization(){
      this.pr = !this.pr
    }
    count = 0
    
    showQuestion(){
      this.a = false
      this.count++
    }

    get currentQuestion() {
    return this.phrases()[this.currentQuestionIndex];
  }

    

 shuffleCurrentOptions() {
    const options = [...this.currentQuestion.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    this.shuffledOptions = options;
  }

  answerChecked = false
  answerChecked2 = false
  sub = false
  
    
  showResults = false;         // 👈 Controls result view
  showTryAgainPopup = false;   // 👈 Controls try-again popup
  correctAnswers: any[] = [];  // 👈 Store correct questions
  wrongAnswers: any[] = [];    // 👈 Store wrong questions

  userResults = [
  ];

 selectAnswer4(index: number) {
  this.selectedIndex = index;
  this.answerChecked = true;
  this.answerChecked2 = true;

  const selected = this.shuffledOptions[index];
  const lang = this.initial; // "ko", "jp", etc.

  // Normalize selected option into array of parts
  const selectedParts = Array.isArray(selected[lang])
    ? selected[lang].map((p: string) => p.trim())
    : ('' + selected[lang]).split(',').map((p) => p.trim());

  // Normalize correct answer into array of parts
  const correctAnswers = Array.isArray(this.currentQuestion.answer)
    ? this.currentQuestion.answer.map((a: any) => ('' + a[lang]).trim())
    : ('' + this.currentQuestion.answer[lang]).split(',').map((p) => p.trim());

  const isCorrect =
    selectedParts.length === correctAnswers.length &&
    selectedParts.every((p, i) => p === correctAnswers[i]);

  if (isCorrect) {
    this.score++;
    this.sub = true;
    this.correctAnswers.push(this.currentQuestion.answer[0]);   // ✅ Record correct

  } else {
    this.sub = false;

    this.wrongAnswers.push(this.currentQuestion.answer[0]);   // ✅ Record correct

  }
  this.userResults=[...this.correctAnswers.map(p => ({ phrase:p, correct: true })),...this.wrongAnswers.map(p => ({ phrase:p, correct: false }))]

}

againQuiz() {
  this.currentQuestionIndex = 0;
  this.count = 0;
  this.quizComplete = false;   // don’t toggle with !, just reset
  this.score = 0;

  // reset answer states
  this.answerChecked = false;
  this.answerChecked2 = false;
  this.answered = false;
  this.sub = false;
  this.selectedIndex = null;
  this.selectedOption = null;

  this.userResults = []
  this.correctAnswers = [];
  this.wrongAnswers = [];
  // reshuffle options for first question
  this.shuffleCurrentOptions();
}

  nextQuestion() {
    this.sub = false
    this.answerChecked2 = false
    this.answerChecked = false;
    if (this.currentQuestionIndex < this.phrases().length - 1) {
      this.currentQuestionIndex++;
      this.selectedIndex = null;
      this.shuffleCurrentOptions();
    } else {
      this.quizComplete = true;
    }
  }

///

  currentQuestionIndex2 = 0;
  score2= 0;
  answered = false;
  selectedOption: QuizOption | null = null;

  


selectOption(option: any) {
  this.selectedOption = option;
  this.answered = true;

  if (option.isCorrect) {
    this.score2++;
  }
}
highlightMode = false; // default off

toggleHighlight() {
  this.highlightMode = !this.highlightMode;
}

phrases=signal<any>('')
formatPhrase(phrase: string): string {
  if (!this.highlightMode) {
    // Just remove markers
    return phrase.replace(/\[\[|\]\]/g, '');
  }

  // Wrap highlighted parts in <span> with styles
  return phrase.replace(
    /\[\[(.*?)\]\]/g,
    '<span class="bg-yellow-200 rounded px-1">$1</span>'
  );
}

formatEnglish(en: string): string {
  return en.replace(/\[\[(.*?)\]\]/g, '<mark class="bg-cyan-200 px-1 rounded">$1</mark>');
}
sideBar = true
phraseStory = []
close(){
  
  this.loadPhrasesById() 

  this.sideBar = !this.sideBar
  // this.ngOnInit()
  this.loadPhrasesById()

}
getSpecificPhrases(phrase:string){
  this.input.set(phrase)
  this.selectedPhrases.set(phrase)

}
open(){
  this.loadPhrasesById()
  this.sideBar = !this.sideBar
}
  pro=false
  togglePr(){
    this.pro = !this.pro
  } 
}

