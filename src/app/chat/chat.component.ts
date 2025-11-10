import { Component, ElementRef, inject, NgZone, signal, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { AllphrasesService } from '../allphrases.service';
// import { KoreanPhrases } from '../shared/models/KoreanPhrases';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { GermanPhrases } from '../shared/models/GermanPhrases';
import { PhrasenameService } from '../shared/phrasename.service';
import { PhraseListItem } from '../shared/phrase-list.service';
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
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
selectedPhrases = signal<string>("")
  

showPro() {
  this.showPronunciation = !this.showPronunciation
}
  ko1:any
  constructor(private phrasesServices:AllphrasesService,private phraseName:PhrasenameService,private userA:AuthenticationUser,
    private ngZone:NgZone){
  }
  presentTense:any[] = []



  phrases =signal<UnifiedPhrase[]>([])
  phrasesGerman:any[] = []
  phraseRussian=signal<UnifiedPhrase[]>([])
  phrasesItalian=signal<UnifiedPhrase[]>([])
  phrasesJapanese=signal<UnifiedPhrase[]>([])

  input =signal("")
  input2 =signal("")
  input3 =signal("")
  input4 =signal("")



  storyList 
  phrasesList//:PhraseListItem[] = this.phraseName.allListStory
  phrasesListRussian//:PhraseListItem[] = this.phraseName.allListRussianStory
  phrasesListItalian//:PhraseListItem[] = this.phraseName.allListItalianStory

  
  phrasesListGerman//:string[] = ['conversation','askingDirections',"germanQuestionsForLearners","germanQuestionsForLearners5"];
  phrasesListJapanese//:PhraseListItem[] = this.phraseName.allListJapaneseStory
  assignStory(){
    

    switch(this.id){ 
      case'Korean':
        this.storyList= this.phrasesList 
        break
      case'Russian':
        this.storyList=this.phrasesListRussian 
        break
      case'Italian':
        this.storyList=this.phrasesListItalian
        break
      case'German':
        this.storyList=this.phrasesListGerman
        break
      case 'Japanese':
        
        this.storyList=this.phrasesListJapanese
      }
  }
  
  

  phraseSets:any[] 

  id:string = ""
  activateRoute:ActivatedRoute = inject(ActivatedRoute)
  loadPhrasesById() {
  const inputMap = {
    
    'Korean': this.input(),
    'Italian': this.input3(),
    // 'German': this.input(),
    'Russian': this.input2(),
    'Japanese': this.input4(),

  };

  const phraseLoaderMap = {
    'Korean': this.phrasesServices.getPhrases(),
    'Japanese': this.phrasesServices.getJapanesePhrases(),
    'Italian': this.phrasesServices.getItalianPhrases(),
    'German': this.phrasesServices.getGermanPhrases(),
    'Russian': this.phrasesServices.getRussianPhrases()
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


 /* if (!this.id) return;
  
  // if(this.input()==='')return
  const inputMap = {
    'Korean': this.input(),
    'Italian': this.input3(),
    // 'German': this.input(),
    'Russian': this.input2(),
    'Japanese': this.input4(),

  };

  const inputKey = inputMap[this.id];

  const phraseLoaderMap = {
    'Korean': this.phrasesServices.getPhrases(),
    'Japanese': this.phrasesServices.getJapanesePhrases(),
    'Italian': this.phrasesServices.getItalianPhrases(),
    'German': this.phrasesServices.getGermanPhrases(),
    'Russian': this.phrasesServices.getRussianPhrases()
  };

  const observable$ = phraseLoaderMap[this.id];

  observable$.subscribe({
    next: (data: any) => {
      const phrases = data[inputKey];
      this.setUnifiedPhrases(this.id!, phrases);
    },
    error: (error: any) => {
      alert(`❌ Failed to load ${this.id} phrases: ${error.message}`);
    }
  });*/
  

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
    this.phraseName.getPhrases(this.id).subscribe({
      next: data => {
        console.log("this is a",data)
      switch(this.id) {
        case 'Korean':
           this.phrasesList = data.filter(p => p.type === 'story');
          break
        case 'Russian': 
          
           this.phrasesListRussian = data.filter(p => p.type === 'story');
          break
        case 'Italian' : 
          
           this.phrasesListItalian = data.filter(p => p.type === 'story');
        break
        case 'German': this.phrasesListGerman = data;
          break
        default : 
          
           this.phrasesListJapanese = data.filter(p => p.type === 'story');
      }
      // error: err => console.error(`Failed to load ${lang} grammar:`, err)
      
          this.assignStory()


    }});
    }
    else{
            
        this.phrasesList = this.phraseName.allListStory
        this.phrasesListRussian = this.phraseName.allListRussianStory
        this.phrasesListItalian = this.phraseName.allListItalianStory
        this.phrasesListGerman = this.phraseName.allListGermanStory
        this.phrasesListJapanese  = this.phraseName.allListJapaneseStory
        
        this.assignStory()
    }
  this.loadPhrasesById()
});

  this.setLanguage()
   if(this.id==='Korean'){
     this.chatData = [
      /*{
        p1: { ru:"",ko: "안녕하세요!", pr:"",en: "Hello!" },
        p2: { ru:"",ko: "안녕하세요. 잘 지냈어요?",pr:"", en: "Hi! How have you been?" }
      },
      {
        p1: {ru:"", ko: "요즘 바빴어요.",pr:"", en: "I’ve been busy lately." },
        p2: {ru:"", ko: "그랬군요.", pr:"",en: "I see." }
      },*/
  {
    p1: { phrase: "안녕하세요!", pr: "annyeonghaseyo!", en: "Hello!" },
    p2: { phrase: "안녕하세요. 반갑습니다.", pr: "annyeonghaseyo. bangapseumnida.", en: "Hello. Nice to meet you." }
  },
  {
    p1: { phrase: "요즘 어떻게 지내세요?", pr: "yojeum eotteoke jinaeseyo?", en: "How have you been lately?" },
    p2: { phrase: "잘 지내고 있어요.", pr: "jal jinaego isseoyo.", en: "I’m doing well." }
  },
  {
    p1: { phrase: "오늘 날씨가 좋네요.", pr: "oneul nalssiga jonneyo.", en: "The weather is nice today." },
    p2: { phrase: "네, 정말 좋아요.", pr: "ne, jeongmal joayo.", en: "Yes, it’s really nice." }
  },
  {
    p1: { phrase: "점심 먹었어요?", pr: "jeomsim meogeosseoyo?", en: "Did you eat lunch?" },
    p2: { phrase: "네, 먹었어요. 김밥을 먹었어요.", pr: "ne, meogeosseoyo. gimbabeul meogeosseoyo.", en: "Yes, I did. I had gimbap." }
  },
  {
    p1: { phrase: "주말에 뭐 할 거예요?", pr: "jumare mwo hal geoyeyo?", en: "What are you doing this weekend?" },
    p2: { phrase: "친구랑 영화 보러 갈 거예요.", pr: "chingurang yeonghwa boreo gal geoyeyo.", en: "I'm going to watch a movie with a friend." }
  },
  {
    p1: { phrase: "취미가 뭐예요?", pr: "chwimiga mwoyeyo?", en: "What is your hobby?" },
    p2: { phrase: "책 읽는 걸 좋아해요.", pr: "chaek ilgneun geol joahaeyo.", en: "I like reading books." }
  },
  {
    p1: { phrase: "한국 음식 좋아하세요?", pr: "hanguk eumsik joahaseyo?", en: "Do you like Korean food?" },
    p2: { phrase: "네, 불고기랑 김치찌개 좋아해요.", pr: "ne, bulgogirang gimchijjigae joahaeyo.", en: "Yes, I like bulgogi and kimchi stew." }
  },
  {
    p1: { phrase: "몇 시에 만날까요?", pr: "myeot sie mannalkkayo?", en: "What time should we meet?" },
    p2: { phrase: "세 시에 어때요?", pr: "se sie eottaeyo?", en: "How about 3 o’clock?" }
  },
  {
    p1: { phrase: "어디에서 만나요?", pr: "eodieseo mannayo?", en: "Where should we meet?" },
    p2: { phrase: "지하철역 앞에서 만나요.", pr: "jihacheolyeok apeseo mannayo.", en: "Let’s meet in front of the subway station." }
  },
  {
    p1: { phrase: "다음에 또 봐요.", pr: "daeume tto bwayo.", en: "See you next time." },
    p2: { phrase: "네, 조심히 가세요.", pr: "ne, josimhi gaseyo.", en: "Okay, take care." }
  },{
    p1:{ko:"",pr:"",en:""}
  }
    ];}
  else if(this.id==='Russian'){
    

this.chatData = [
  {
    p1: { phrase: "Привет!", ko:"", pr: "Privet!", en: "Hi!" },
    p2: { phrase: "Как дела?",ko:"", pr: "Kak dela?", en: "How are you?" }
  },
  {
    p1: { phrase: "Хорошо, спасибо.",ko:"", pr: "Khorosho, spasibo.", en: "I'm good, thanks." },
    p2: { phrase: "Рад это слышать.",ko:"", pr: "Rad eto slyshat’.", en: "Glad to hear that." }
  },
  {
    p1:{ru: "Привет!",
    pr: "Privet!",
    en: "Hi!"
    },
  
    p2:{ru: "Как дела?",
    pr: "Kak dela?",
    en: "How are you?"}
  },
  {
    p1:{ru: "Меня зовут .",
    pr: "Menya zovut .",
    en: "My name is ."}
  ,
  
   p2 :{ru: "Откуда ты?",
    pr: "Otkuda ty?",
    en: "Where are you from?"}
  },
  {
    p1:{ru: "Я из России.",
    pr: "Ya iz Rossii.",
    en: "I'm from Russia."}
  ,
  
    p2:{ru: "Сколько тебе лет?",
    pr: "Skol'ko tebe let?",
    en: "How old are you?"}
  },
  {
   p1:{ ru: "Мне двадцать лет.",
    pr: "Mne dvadtsat' let.",
    en: "I’m twenty years old."}
  ,
  
    p2:{ru: "Ты говоришь по-английски?",
    pr: "Ty govorish' po-angliyski?",
    en: "Do you speak English?"}
  },
  {
    p1:{ru: "Я немного говорю по-русски.",
    pr: "Ya nemnogo govoryu po-russki.",
    en: "I speak a little Russian."}
  ,
  
    p2:{ru: "Где находится туалет?",
    pr: "Gde nakhoditsya tualet?",
    en: "Where is the bathroom?"}
  },
  {
    p1:{ru: "Сколько это стоит?",
    pr: "Skol'ko eto stoit?",
    en: "How much is this?"}
  ,
  
    p2:{ru: "Можно счёт, пожалуйста?",
    pr: "Mozhno schyot, pozhaluysta?",
    en: "Can I have the bill, please?"}
  },
  {
   p1:{ ru: "Я не понимаю.",
    pr: "Ya ne ponimayu.",
    en: "I don’t understand."}
  ,
  
   p2:{ ru: "Повторите, пожалуйста.",
    pr: "Povtorite, pozhaluysta.",
    en: "Please repeat."}
  },
  {
    p1:{ru: "Спасибо!",
    pr: "Spasibo!",
    en: "Thank you!"}
  }

];

  }
  else if(this.id==='Italian'){

    this.chatData = [
  {
    p1: {
      itn: "Ciao!",
      pr: "chow",
      en: "Hi!"
    },
    p2: {
      itn: "Ciao, come stai?",
      pr: "chow, koh-meh stai?",
      en: "Hi, how are you?"
    }
  },
  {
    p1: {
      itn: "Sto bene, grazie. E tu?",
      pr: "stoh beh-neh, grah-tsyeh. eh too?",
      en: "I'm fine, thanks. And you?"
    },
    p2: {
      itn: "Anch'io sto bene.",
      pr: "an-kee-oh stoh beh-neh",
      en: "I'm doing well too."
    }
  },
  {
    p1: {
      itn: "Come ti chiami?",
      pr: "koh-meh tee kyah-mee?",
      en: "What’s your name?"
    },
    p2: {
      itn: "Mi chiamo Marco.",
      pr: "mee kyah-moh mar-koh.",
      en: "My name is Marco."
    }
  },
  {
    p1: {
      itn: "Di dove sei?",
      pr: "dee doh-veh seh-ee?",
      en: "Where are you from?"
    },
    p2: {
      itn: "Sono di Roma.",
      pr: "soh-noh dee roh-mah.",
      en: "I am from Rome."
    }
  },
  {
    p1: {
      itn: "Parli inglese?",
      pr: "par-lee een-gleh-seh?",
      en: "Do you speak English?"
    },
    p2: {
      itn: "Sì, un po'.",
      pr: "see, oon poh.",
      en: "Yes, a little."
    }
  },
  {
    p1: {
      itn: "Che ore sono?",
      pr: "keh oh-reh soh-noh?",
      en: "What time is it?"
    },
    p2: {
      itn: "Sono le tre.",
      pr: "soh-noh leh treh.",
      en: "It’s three o’clock."
    }
  },{
    p1:{itn:"",pr:"",en:""}
  }
];

  }else if(this.id=='German'){
    this.chatData = [
  {
    p1: { ge: "Hallo!", en: "Hello!" },
    p2: { ge: "Wie geht's?", en: "How are you?" }
  }
];

  }
  else{
    this.chatData = [
  {
    p1: { phrase: "こんにちは！", kana: "こんにちは！", en: "Hello!" },
    p2: { phrase: "元気ですか？", kana: "げんきですか？", en: "How are you?" },
  }
  
,
  {
    p1: { phrase: "はい、元気です。ありがとう。", pr: "はい、げんきです。ありがとう。", en: "Yes, I'm fine. Thank you." },
    p2: { phrase: "よかったです。", pr: "よかったです。", en: "I'm glad to hear that." }
  },
  {
    p1: { phrase: "今日は何をしますか？", pr: "きょうはなにをしますか？", en: "What are you doing today?" },
    p2: { phrase: "映画を見に行きます。", pr: "えいがをみにいきます。", en: "I'm going to see a movie." }
  },
  {
    p1: { phrase: "誰と行きますか？", pr: "だれといきますか？", en: "Who are you going with?" },
    p2: { phrase: "友達と一緒に行きます。", kana: "ともだちといっしょにいきます。", en: "I'm going with a friend." }
  },
  {
    p1: { phrase: "どの映画を見ますか？", pr: "どのえいがをみますか？", en: "What movie are you going to see?" },
    p2: { phrase: "アクション映画です。", pr: "アクションえいがです。", en: "It's an action movie." }
  },
  {
    p1: { phrase: "お昼ご飯は食べましたか？", pr: "おひるごはんはたべましたか？", en: "Did you eat lunch?" },
    p2: { phrase: "はい、ラーメンを食べました。", pr: "はい、ラーメンをたべました。", en: "Yes, I ate ramen." }
  },
  {
    p1: { phrase: "それは美味しそうですね。", pr: "それはおいしそうですね。", en: "That sounds delicious." },
    p2: { phrase: "とても美味しかったです。", pr: "とてもおいしかったです。", en: "It was very tasty." }
  },
  {
    p1: { phrase: "どこで食べましたか？", pr: "どこでたべましたか？", en: "Where did you eat?" },
    p2: { phrase: "駅の近くのレストランです。", pr: "えきのちかくのレストランです。", en: "At a restaurant near the station." }
  }
  ,{p1:{jp:"",kana:"",en:""}}


      ];

        }
    this.assignStory()
    this.selectPhraseList()
  }
  setUnifiedPhrases(lang: string, phraseList: any[]) {
    this.phrases.set(phraseList);
    // console.log(this.phrases())
    this.phrases()
}

  count=0
  a=0
  increment(){
    this.count += 1
  }
  createPhrase(){
    // this.ngOnInit()
    let phrase:any = []
    return phrase
  
  }

  
  showPronunciation = false;
  showTranslation = true;

togglePronunciation() {
  this.showPronunciation = !this.showPronunciation;
}

toggleTranslation() {
  this.showTranslation = !this.showTranslation;
}


  splitWord:string[] = []
splitPhrase() {
  const getPhrase = () => {
    switch (this.id) {
      case 'Korean': return this.phrases()[0];
      case 'Russian': return this.phrases()[0];
      case 'Italian': return this.phrases()[0];
      case 'German': return this.phrases()[0];
      case 'Japanese': return this.phrases()[0];
      default: return null;
    }
  };

  console.log("this is a phrase",getPhrase())
  const phrase = getPhrase();
  if (!phrase?.phrase) return;

  this.splitWord = phrase.phrase.split("").filter(char => char !== " ");
}


  storedStory:string[] = []
  
createDialog() {
  const index = this.count;

  const p = {
    'Korean': this.phrases()[index],
    'Russian': this.phrases()[index],
    'Italian': this.phrases()[index],
    'German': this.phrases()[index],
    'Japanese': this.phrases()[index]
  }[this.id];

  if (p?.phrase) {
    const value = `${p.phrase}:${p.pr || ''}:${p.en || ''}`;
    this.storedStory.push(value);
  }
}

  hint:string = ""

 storyPhrases() {
  this.createDialog();
  this.increment();

  const hintPhrase = {
    'Korean': this.phrases()[this.count],
    'Russian': this.phrases()[this.count],
    'Italian': this.phrases()[this.count],
    'Japanese':this.phrases()[this.count]
  }[this.id];

  this.hint = hintPhrase?.en || '';
}

  sideBar = true
  toggleSidebar(){
      // this.ngOnInit()
    this.loadPhrasesById()
    this.sideBar = !this.sideBar
    this.selectPhraseList()
    this.loadPhrasesById()
      // this.ngOnInit()


  }
  toggleS(){

    this.sideBar=!this.sideBar
    this.loadPhrasesById()    // this.ngOnInit()


  }

  clearStory() {
    this.storedStory = [];
    this.count = 0;

      const phrase = {
        'Korean': this.phrases()[this.count],
        'Russian': this.phrases()[this.count],
        'Italian': this.phrases()[this.count],
        'Japanese': this.phrases()[this.count]
      }[this.id];

      this.hint = phrase?.en || '';
    }

  getPhrase(p:string){
    switch(this.id){
      case'Korean':
        this.input.set(p)
        this.selectedPhrases.set(p)
        break
      case"Russian":
        this.input2.set(p)
        this.selectedPhrases.set(p)
        break
      case'Italian':
        this.input3.set(p)
        this.selectedPhrases.set(p)
        break
      case "German":
        this.input.set(p)
        this.selectedPhrases.set(p)
        break
      default:
        this.input4.set(p)
        this.selectedPhrases.set(p)
    }

  }

  phrasesC=signal<any[]>([])
  assignPhase(){
    
    switch(this.id){
      case'Korean':

      this.phrasesC.set(this.phrases())
      this.hint = this.phrases()[this.count].en
        break
      case"Russian":

      this.phrasesC.set(this.phrases())
      this.hint = this.phrases()[this.count].en
        break
      case'Italian':

      this.phrasesC.set(this.phrases())
      this.hint = this.phrases()[this.count].en
        break
      case "German":

      this.phrasesC.set(this.phrases())
      this.hint = this.phrases()[this.count].en
        break
      default:

      this.phrasesC.set(this.phrases())
      this.hint = this.phrases()[this.count].en
    }

  }
  getCurrentPhrases() {
  return {
    'Korean': this.phrases(),
    'Russian': this.phrases(),
    'Italian':this.phrases(),
    'German': this.phrasesGerman,
    'Japanese': this.phrases(),
  }[this.id] || [];
}

  startC = false
  start(){
    this.startC = !this.startC
    this.assignPhase()
    this.ngOnInit()
  }

///////////////////////////////////////////////////////////////////

  
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  groupToDialogues(phrases2: any[]) {
  const dialogues = [];

  const userStarts = this.userLeads(); // 🔍 get current lead state

  for (let i = 0; i < phrases2.length - 1; i += 2) {
    if (userStarts) {
      dialogues.push({ p1: phrases2[i], p2: phrases2[i + 1] });
    } else {
      dialogues.push({ p2: phrases2[i + 1], p1: phrases2[i] });
    }
  }

  // ✅ Handle final item (odd count)
  if (phrases2.length % 2 === 1) {
    const last = phrases2[phrases2.length - 1];
    if (userStarts) {
      dialogues.push({ p2: last }); // user speaks last
    } else {

      dialogues.push({ p1: last }); // bot speaks last
    }
  }

  this.chatData = dialogues;
}


  phraseS = ['intro','dialogue']
  selectedSetName: string | null = null;
  

  // rest of your chat logic...



  /////////////////////////////////////////////////////////////
  inputMode: 'type' | 'speech' | 'practice' = 'type';
  language:any
  userInput = '';
  index = 0;
  storyTurn=signal<'p1' | 'p2'>('p1');

  chatHistory: {
    sender: 'user' | 'bot';
    text: string;
    phrase?:string;
    pr?: string;
    en?: string;
    correct?:any;
  }[] = [];

  chatData
  setLanguage(){
    switch(this.id){
      case'Korean':
        this.language = 'ko'
        break
      case'Russian':
        this.language = 'ru'
        break
      case'Italian':
        this.language = 'itn'
        break
      case'German':
        this.language = 'ge'
        break
      case'Japanese':
        this.language = 'jp'
        break
    }

  }
  getLangCode(): string {
    return { jp: 'ja-JP', ge: 'de-DE', itn: 'it-IT',ko:'ko-KR',ru:'ru-RU' }[this.language] || 'en-US';
  }

  setMode(mode:any) {
    this.inputMode = mode;
    this.chatHistory = [];
    this.index = 0;
    this.count =0
    // if (this.waitingForUser){
      this.storyTurn.set(this.userLeads() ? 'p1' : 'p2');
    // if (mode === 'practice') {
      // this.advanceStory();
    // }}
  }
    userLeads=signal<boolean>(true);
    setLead() {
      
      console.log(this.userRole)
      this.userLeads.set(this.userRole === 'lead');
      console.log(this.userLeads())
      }

  getSpeaker(turn: 'p1' | 'p2'): 'user' | 'bot' {
    const userGoesFirst = this.userLeads();
    return (turn === 'p1') === userGoesFirst ? 'user' : 'bot';
  }

private advanceTurnAfter(turn: 'p1' | 'p2') {
  if (turn === 'p1') {
    this.storyTurn.set('p2');
  } else {
    this.storyTurn.set('p1');
    this.index++;
  }
}
hint1 = false



/*submit() {
  this.hint1 = false**/



  submit() {
    this.hint1 = false;
    if (!this.userInput.trim()) return;

    const currentTurn = this.storyTurn();
    if (this.getSpeaker(currentTurn) !== 'user') {
      this.triggerBotResponse();
      console.warn('❌ Not user\'s turn.');
      return;
    }

    const phrase = this.chatData[this.index]?.[currentTurn];
    if (!phrase) return;

    const expected = this.showPronunciation ? phrase?.pr.trim() : phrase.phrase?.trim();
    const userAnswer = this.userInput.trim();
    const isCorrect = expected?.toLowerCase() === userAnswer.toLowerCase();

    // 1) push user's answer
    this.chatHistory.push({
      sender: 'user',
      text: (isCorrect ? '✅ ' : '❌ ') + userAnswer
    });

    // 2) show correct answer feedback
    this.chatHistory.push({
      sender: 'user', // or 'system'
      text: expected,
      pr: phrase.pr,
      en: phrase.en
    });

    // 3) speak correct answer
    this.playSpeech(expected || phrase.phrase);

    // 4) clear input + advance turn
    this.userInput = '';
    this.advanceTurnAfter(currentTurn);

    // 5) trigger bot after a pause
    
    setTimeout(() => this.triggerBotResponse(), 5000);
  }

  startSpeechToText() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('SpeechRecognition API not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = this.getLangCode(); 
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const s = event.results[0][0].transcript;

      // ✅ force Angular update so chat shows immediately
      this.ngZone.run(() => {
        this.userInput = s;

        const currentTurn = this.storyTurn();
        if (this.getSpeaker(currentTurn) === 'user') {
          this.submit();
        } else {
          console.warn("🎙 Speech captured but it's not the user's turn.");
        }
      });
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
    };

    recognition.start();
    console.log('🎤 Speech recognition started with lang:', recognition.lang);
  }

  // your helper functions: storyTurn, getSpeaker, advanceTurnAfter, triggerBotResponse, playSpeech, getLangCode...



    botTyping = false;
triggerBotResponse() {
  // guard end-of-data
  if (this.index >= this.chatData.length) return;

  const conversation = this.chatData[this.index];
  if (!conversation) return;

  const turn = this.storyTurn();
  const phrase = conversation[turn];
  if (!phrase) return;

  if (this.getSpeaker(turn) === 'bot') {
    this.botRespond(phrase, turn);
  }
}
botRespond(phrase: any, turn: 'p1' | 'p2') {
  this.botTyping = true;

  setTimeout(() => {
    this.botTyping = false;

    this.chatHistory.push({
      sender: 'bot',
      text: phrase.phrase,
      pr: phrase.pr,
      en: phrase.en
    });
    // this.generateHint1()
    const speakText = (phrase.phrase || this.getText(phrase));
    this.playSpeech(speakText);

    // advance to next turn / pair
    this.advanceTurnAfter(turn);

    // optional: stop if past last item
    if (this.index >= this.chatData.length) {
      // e.g. this.chatHistory.push({ sender:'system', text:'— end —' });
      return;
    }
  }, 800);
}

loadBotMessage() {
  const currentTurn = this.storyTurn();
  const phrase = this.chatData[this.index]?.[currentTurn];
  if (phrase) this.botRespond(phrase, currentTurn);
}

advanceStory() {
  if (this.index >= this.chatData.length) return;

  const conversation = this.chatData[this.index];
  const turn = this.storyTurn();
  const phrase = conversation?.[turn];
  if (!phrase) return;

  if (this.getSpeaker(turn) === 'bot') {
    this.botRespond(phrase, turn);
  } else {
    // If you ever need to auto-render the user's scripted line
    this.chatHistory.push({
      sender: 'user',
      text: phrase.phrase,
      pr: phrase.pr,
      en: phrase.en
    });
    this.userInput = '';
    
    if(this.inputMode==='practice')this.playSpeech(phrase.phrase)
    this.advanceTurnAfter(turn);
  }
}



  userRole: 'lead' | 'follow' = 'lead'; // default
//////////////////////////////////////////////////////////
    
selectPhraseList() {
  this.isReadyToStart.set(this.phrases().length > 0 );
  this.startNow = false; // reset if switching
  console.log('📘 Phrase list selected:', this.phrases().length,this.isReadyToStart());

}

playSpeech(input: string | { text: string; pr?: string}) {
  if (!window.speechSynthesis) return;

  const lang = this.getLangCode();
  let textToSpeak = '';

  if (typeof input === 'string') {
    textToSpeak = input;
  } else {
    // ✅ Use kana only for jp, use text otherwise
    textToSpeak = (this.language === 'jp' && input.pr) ? input.pr : input.text;
  }

  const soundP = new SpeechSynthesisUtterance(textToSpeak);
  soundP.lang = lang;
  soundP.rate = 0.9; // slightly slower
  soundP.pitch = 1.0;
  speechSynthesis.cancel();
  speechSynthesis.speak(soundP);
}


  getField(): 'jp' | 'ru' | 'ge' | 'itn' |'ko'{
  return this.language;
}

  getText(phrase: any): string {
    const field = this.getField();
    return phrase.phrase || '';
  }
  isReadyToStart=signal<boolean>(false)
  startNow:boolean = false
  startUserTurn() {
    this.ToBegin = false;
    this.advanceStory(); // will display p1
}

   ToBegin = false
   startStudy() {
      this.startNow = true;
      this.userInput = '';
      this.count = 0;
      this.setLead();
      this.chatHistory = [];
      this.index = 0;
      this.storyTurn.set('p1'); // always begin from p1
      this.splitPhrase();
      this.assignPhase();
      this.groupToDialogues(this.phrases());
      // this.generateHint1()

  // 👇 If user leads, wait for them to begin
  if (this.userLeads()) {
    this.ToBegin = true;
  } else {
    this.advanceStory(); // bot goes first
  }
}


  hint1Array:string[] = []
  showHint1 = false;
  getAnswer():string{
    const currentTurn = this.storyTurn();
    const phrase = this.chatData[this.index]?.[currentTurn];
    console.log("pro: ",phrase?.pr , "pro2:", this.showPronunciation)
    return this.showPronunciation?phrase?.pr :phrase?.phrase
  }
  generateHint1() {
    const answer = this.getAnswer().replace(/\s+/g, '').replace(/\[\[|\]\]/g, '');

    this.hint1Array = [...answer].sort(() => Math.random() - 0.5);

    if(this.getSpeaker(this.storyTurn())==='user'){this.hint1 = true;}
  }
  


  cursorPos = 0;
updateCursor(input: HTMLInputElement) {
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
  clearHints() {
    this.hint1Array = [];
    this.showHint1 = false;
  }
}


