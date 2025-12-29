import { Component, Input, signal } from '@angular/core';
import { AllphrasesService } from '../allphrases.service';
import { identifierName } from '@angular/compiler';
import { ActivatedRoute, ParamMap, Route } from '@angular/router';
import { PhrasenameService } from '../shared/phrasename.service';

interface PhraseMapping {
  [key: number]: {
    ko?: number[];
    pr?: number[];
    kana?:number[];
    ru?:number[];
    ge?:number[];
    itn?:number[];
    jp?:number[];
    en: number[];
  };
}

interface Phrase {
  ko?: string[];
  ru?:string[];
  jp?:string[];
  kana?:string[];
  pr?: string[];
  ge?:string[];
  itn?:string[];

  des?: string; // <-- grammar note
  en: string[];
  map: PhraseMapping;



}
@Component({
  selector: 'app-phrase-study',
  templateUrl: './phrase-study.component.html',
  styleUrl: './phrase-study.component.css'
})
export class PhraseStudyComponent {
  Popular:any = [{s:''}]
  id =''
  sidebarOpen: boolean = true;


  allEntries :any 

  allListGrammer:any = this.phraseName.allListgrammer
  allListPopularKorean:any[] = this.phraseName.allPopularPhrases
  allListStory: any[] = this.phraseName.allListStory

  phrasesListRu:any[] = this.phraseName.allListRussiangrammer;
  phrasePopularRussian:any[] = this.phraseName.allPopularRussianPhrases;
  phrasesListRussian:any[] = this.phraseName.allListRussianStory;
  playLanguage = '' // Default to Japanese
  allList = [{s:''}]
  allListS = [{s:''}]

  phrasesListItalian:any[] = this.phraseName.allListItaliangrammer; 
  phrasePopularItalian:any[] = this.phraseName.allPopularItalianPhrases;
  phrasesListItalian2:any[] = this.phraseName.allListItalianStory;

  phrasesListGerman:any[] = this.phraseName.allListGermangrammer;
  phrasesListGerman2:any[] = [{"s":"conversation",isDone:false},{"s":"askingDirections",isDone:false},{"s":"germanQuestionsForLearners",isDone:false},{"s":"germanQuestionsForLearners2",isDone:false},{"s":"germanQuestionsForLearners3",isDone:false},{"s":"germanQuestionsForLearners4",isDone:false},{"s":"germanQuestionsForLearners5",isDone:false}]

  allListJapanesegrammer:any[] = this.phraseName.allListJapanesegrammer;
  allPopularJapanesePhrases:any[] = this.phraseName.allPopularJapanesePhrases
  allListJapaneseStory:any[] = this.phraseName.allListJapaneseStory;
  
  constructor(private phrasesService:AllphrasesService,private activateRoute:ActivatedRoute,private phraseName:PhrasenameService){

  }
  selectLang:any
  pro:any =signal<any>('pr')
  m1:string =''
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    

      
    this.activateRoute.paramMap.subscribe((params:ParamMap)=>
    {

      
      let tempId:string|null = params.get('id')
      let select:string|null = params.get('m')
      this.id = tempId
      this.m1 = select || ''
    })
  switch(this.id){
    
    case'Korean':
      this.selectLang = 'ko'
      this.playLanguage = 'ko-KR'
      this.allList = this.allListGrammer
      this.Popular= this.allListPopularKorean
      this.allListS = this.allListStory
      break
    case 'Russian':
      this.selectLang = 'ru'

      this.playLanguage = 'ru-RU'
      this.allList = this.phrasesListRu
      this.Popular= this.phrasePopularRussian
      this.allListS = this.phrasesListRussian
      break
    case'Italian':
      this.selectLang = 'itn'
      this.playLanguage = 'it-IT'
      this.allList = this.phrasesListItalian
      this.Popular= this.phrasePopularItalian
      this.allListS = this.phrasesListItalian2

      break
    case'German':
      this.selectLang = 'ge'

      this.playLanguage = 'de-DE'
      this.allList = this.phrasesListGerman 
      this.allListS = this.phrasesListGerman2
      break

    case'Japanese':
      this.selectLang = 'jp'
      this.pro.set('kana')
      this.playLanguage = 'ja-JP'
      this.allList = this.allListJapanesegrammer
      this.Popular= this.allPopularJapanesePhrases
      this.allListS = this.allListJapaneseStory

  }



    switch(this.id){
      case'Korean': 

        this.phrasesService.getKoreanStudy().subscribe({
          
          next:(data:any) => {if(this.selectedItem!= ''){this.phrases= data[this.selectedItem]}},
          error:(error:any) => {alert(error.message)}
        })
      break
    case'Russian':
      this.phrasesService.getRussianStudy().subscribe({
      
        next:(data:any) => {if(this.selectedItem!= ''){this.phrases= data[this.selectedItem]}},
        error:(error:any) => {alert(error.message)}
      })
     break
    case'Italian':

      this.phrasesService.getItalianStudy().subscribe({
      
        next:(data:any) => {if(this.selectedItem!= ''){this.phrases= data[this.selectedItem]}},
        error:(error:any) => {alert(error.message)}
      })
      break
    case 'German':
      this.phrasesService.getGermanStudy().subscribe({
      
        next:(data:any) => {if(this.selectedItem!= ''){this.phrases= data[this.selectedItem]}},
        error:(error:any) => {alert(error.message)}
      })
     
      break
    case'Japanese':
      this.phrasesService.getJapaneseStudy().subscribe({
      
        next:(data:any) => {if(this.selectedItem!= ''){this.phrases= data[this.selectedItem]}},
        error:(error:any) => {alert(error.message)}
      })
      break

      
      
    
    }


    this.phrasesService.getKoreanEntries().subscribe({
      next:(data:any) => {this.allEntries= data},
      error:(error:any) => {alert(error.message)}
    })
}

  selectedItem: any = '';
  
  selectItem(item: any) {
    this.selectedItem = typeof item === 'string' ? item : item.s;
    console.log('Selected:', this.selectedItem);
  }
  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.ngOnInit()
  }


  currentIndex: number = 0;

get currentPhrase(): Phrase {
  return this.phrases[this.currentIndex];
}

nextCard() {
  if (this.currentIndex < this.phrases.length - 1) {
    this.currentIndex++;
  }
}

prevCard() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }
}


  phrases :Phrase[]=[{ko:[],pr:[],en:[],map:[]}]

  hoverGroup: string | null = null;

  activeIndices: { en:number[] ,ko?: number[]; pr?: number[];jp?:number[]; ru?: number[]; ge?: number[], kana?: number[]} | null = null;

 
 onHover(wordIndex: number, lang: 'ko' | 'pr' | 'en' | 'jp' | 'ru' | 'itn' | 'ge' | 'kana', phrase: Phrase) {
  for (let key in phrase.map) {
    const entry = phrase.map[key];
    if (entry[lang]?.includes(wordIndex)) {
      this.activeIndices = entry;
      return;
    }
  }
  this.activeIndices = null;
}

  setHoverGroup(group: string) {
    this.hoverGroup = group;
  }

  clearHoverGroup() {
    this.hoverGroup = null;
  }

  shouldHighlight(groupId: string): boolean {
    return this.hoverGroup === groupId;
  }

  currectInde = 0
  isActive(index: number, lang: 'ko' | 'pr' | 'en'|'jp'|'ru'|'itn'|'ge'|'kana'): boolean {
    this.currectInde = index
    return this.activeIndices ? this.activeIndices[lang].includes(index) : false;
  }

  clearHover() {
    this.activeIndices = null;
  }          

  // phrase: any
phrase = {
  ko: "저는 학교에 갑니다",
  pr: "jeo neun hakgyo e gamnida",
  en: "I go to a school",
  map: [
    { ko: "저는", pr: "jeo neun", en: ["I"], info: "Pronoun + Topic particle (저 = I, 는 = topic)" },
    { ko: "학교에", pr: "hakgyo e", en: ["to school"], info: "Noun + Locative particle (학교 = school, 에 = to)" },
    { ko: "갑니다", pr: "gamnida", en: ["go","a"], info: "Verb (가다 = to go) in formal polite present tense" }
  ]
};


  hoveredIndex: number | null = null;

  setHover(index: number | null) {
    this.hoveredIndex = index;
  }


  selectedWord: any = null;

  selectWord(word: any) {
    this.selectedWord = word;
  }

  closePopup() {
    this.selectedWord = null;
  }
// phrase-trainer.component.ts
playAudio(text: string, lang: string = 'ja-JP') {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;   // "ja-JP" for Japanese, "ko-KR" for Korean, "en-US" for English
    utterance.rate = 0.9;    // s 
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Your browser does not support Speech Synthesis.");
  }
}

stopAudio() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
hovered: any = null;

splitPhrase(text: string) {
  return text.split(' ');
}




 hoverWord(word: string) {
   this.hovered = this.allEntries.find(d => d.la.replace(/[.]/g, '') === word.replace(/[.]/g, ''));
 }

clearHover2() {
  this.hovered = null; 
}

isHovered(word: string) {
  return this.hovered && this.hovered.la.includes(word);
}

isHoveredByPron(word: string) {
  return this.hovered && this.hovered.pr.includes(word);
}

isHoveredByEng(word: string) {
  return this.hovered && this.hovered.en.includes(word);
}

}
