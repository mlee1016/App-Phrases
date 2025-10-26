import { Component, inject, Input, signal } from '@angular/core';
import { AllphrasesService } from '../allphrases.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhrasenameService } from '../shared/phrasename.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationUser } from '../emitters/emittters';
type PhraseCourse = {
  category: string;
  lessons: [{phrase: string, pr: string, en: string},];
};
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
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.css' 
})
export class AllComponent{   
  //activeRoute  :ActivatedRoute = inject(ActivatedRoute)

  completed = false
  current:string = ""
  selectedPhraseNames = signal<string | null>(null); 

  input:string = "";
  input2:string = "";
  input3:string = "";
  input4: string =""
  input5: string =""

  edit = false
  id : string|null= ""
  //phrases:allphrases[]
  allListgrammer//= this.phraseName.allListgrammer
  allPopular//= this.phraseName.allPopular
  allListStory// = this.phraseName.allListStory
  
  allListRussiangrammer// = this.phraseName.allListRussiangrammer
  allListRussianStory //= this.phraseName.allListRussianStory;
  allListItaliangrammer//= this.phraseName.allListItaliangrammer
  allListItalianStory//= this.phraseName.allListItalianStory
  name = signal<string>('')
  allListGermangrammer//  = this.phraseName.allListGermangrammer
  allListGermanStory//:any[] = [{"s":"conversation",isDone:false},{"s":"askingDirections",isDone:false},{"s":"germanQuestionsForLearners",isDone:false},{"s":"germanQuestionsForLearners2",isDone:false},{"s":"germanQuestionsForLearners3",isDone:false},{"s":"germanQuestionsForLearners4",isDone:false},{"s":"germanQuestionsForLearners5",isDone:false}]

  language = ''
  //pro = ''
  allListJapanesegrammer//= this.phraseName.allListJapanesegrammer
  allListJapaneseStory//= this.phraseName.allListJapaneseStory
  korean = [
  { category: "course1", lessons: [
      { phrase: "에서 (eseo)", pr: "eseo", en: "at, in (location of action)" },
      { phrase: "에서 (eseo)", pr: "eseo", en: "from" },
      { phrase: "하지만 / 그러나 (hajiman / geureona)", pr: "hajiman / geureona", en: "but, however" },
      { phrase: "쯤 (jjeum)", pr: "jjeum", en: "about, approximately" },
      { phrase: "아직 (ajik)", pr: "ajik", en: "still, not yet" },
      { phrase: "까지 (kkaji)", pr: "kkaji", en: "until, till, to" },
      { phrase: "이제부터 (ijebuteo)", pr: "ijebuteo", en: "from now, soon" }
  ]},

  { category: "course2", lessons: [
      { phrase: "있다 (itda)", pr: "itda", en: "there is (non-living)" },
      { phrase: "있다 (itda)", pr: "itda", en: "there is (living)" },
      { phrase: "…는 게 좋다 (neun ge jota)", pr: "neun ge jota", en: "it’d be better to" },
      { phrase: "…지 않는 게 좋다 (ji anneun ge jota)", pr: "ji anneun ge jota", en: "it’d be better not to" },
      { phrase: "제일 (jeil)", pr: "jeil", en: "the most" },
      { phrase: "거나 (geona)", pr: "geona", en: "or (A or B, choice)" },
      { phrase: "…까? (kka?)", pr: "kka?", en: "question marker" }
  ]},

  // { category: "course3", lessons: [
      // extend later
  // ]},

  { category: "course3", lessons: [
      { phrase: "만 (man)", pr: "man", en: "only, just" },
      { phrase: "…ㄹ/을 거예요 (…l/eul geoyeyo)", pr: "geoyeyo", en: "probably" },
      { phrase: "에서 (eseo)", pr: "eseo", en: "at, in" },
      { phrase: "으로/로 (euro/ro)", pr: "euro/ro", en: "with, by (means/method)" },
      { phrase: "でしょう (deshou)", pr: "geot gatda", en: "probably, I think" }, 
      { phrase: "이/가 (i/ga)", pr: "i/ga", en: "subject marker" },
      { phrase: "하지만 (hajiman)", pr: "hajiman", en: "but, however" }
  ]},

  { category: "course4", lessons: [
      { phrase: "…기 전에 (gi jeone)", pr: "gi jeone", en: "before" },
      { phrase: "…지 않을래요? (ji anheullae-yo?)", pr: "ji anheullae yo?", en: "won’t you, let’s" },
      { phrase: "…ㅂ시다/…자 (…bshida / …ja)", pr: "bshida / ja", en: "let’s, shall we" },
      { phrase: "도 (do)", pr: "do", en: "also, too, as well" },
      { phrase: "벌써 (beolsseo)", pr: "beolsseo", en: "already" },
      { phrase: "…지 마 (ji ma)", pr: "ji ma", en: "don’t (casual)" },
      { phrase: "…지 마세요 (ji maseyo)", pr: "ji maseyo", en: "please don’t" }
  ]},

  { category: "course5", lessons: [
      { phrase: "되다 (doeda)", pr: "doeda", en: "to become" },
      { phrase: "이다 / 입니다 (ida / imnida)", pr: "ida / imnida", en: "is, am, are" },
      { phrase: "이었다 / 이었어요 (ieotda / ieosseoyo)", pr: "ieotda / ieosseoyo", en: "was, were" },
      { phrase: "에 (e)", pr: "e", en: "in, at, to, for" },
      { phrase: "에/으로 (e/euro)", pr: "e / euro", en: "to (direction)" },
      { phrase: "…러 가다 (reo gada)", pr: "reo gada", en: "to go in order to" },
      { phrase: "…기로 하다 (giro hada)", pr: "giro hada", en: "to decide on" },
      { phrase: "의 (ui)", pr: "ui", en: "of (possessive)" },
      { phrase: "…는 것 (neun geot)", pr: "neun geot", en: "nominalizer (turns verb into noun)" }
  ]},

  { category: "course6", lessons: [
      { phrase: "…고 있다 (go itda)", pr: "go itda", en: "is/are doing" },
      { phrase: "…주세요 (juseyo)", pr: "juseyo", en: "please do…" },
      { phrase: "…도 된다 (do doenda)", pr: "do doenda", en: "may, is okay to" },
      { phrase: "…고 나서 (go naseo)", pr: "go naseo", en: "after doing" },
      { phrase: "…면 안 된다 (myeon an doenda)", pr: "myeon an doenda", en: "must not, may not" },
      { phrase: "하고 (hago)", pr: "hago", en: "and, with" },
      { phrase: "…을/를 작정이다 (…eul/reul jakjeong ida)", pr: "jakjeong ida", en: "plan to, intend to" },
      { phrase: "나 / 이나 (na / ina)", pr: "na / ina", en: "and (listing)" },
      { phrase: "보다 ~ 더 (boda ~ deo)", pr: "boda ~ deo", en: "is more ~ than" }
  ]},

  { category: "part8", lessons: [
      { phrase: "…는 것 (neun geot)", pr: "neun geot", en: "the act of ... / doing ..." },
      { phrase: "…니까 (nikka)", pr: "nikka", en: "because of, since" },
      { phrase: "…는 걸 잘하다 (neun geol jalhada)", pr: "neun geol jalhada", en: "to be good at doing" },
      { phrase: "…는 걸 좋아하다 (neun geol johahada)", pr: "neun geol johahada", en: "like / love doing" },
      { phrase: "…는 걸 못하다 (neun geol mothada)", pr: "neun geol mothada", en: "to be bad at doing" },
      { phrase: "…고 싶다 (go sipda)", pr: "go sipda", en: "want to" },
      { phrase: "…(으)ㄴ 적이 있다 (…(eu)n jeogi itda)", pr: "eun jeogi itda", en: "have done before" }
  ]}
];




  russian =[
  {
    "category": "part1",
    "lessons": [
      { "phrase": "и", "pr": "i", "en": "and" },
      { "phrase": "а", "pr": "a", "en": "and/but" },
      { "phrase": "но", "pr": "no", "en": "but" },
      { "phrase": "потому что", "pr": "potomu chto", "en": "because" },
      { "phrase": "хотя", "pr": "khotya", "en": "although" },
      { "phrase": "если", "pr": "yesli", "en": "if" }
    ]
  },
  {
    "category": "part2",
    "lessons": [
      { "phrase": "в", "pr": "v", "en": "in/at" },
      { "phrase": "на", "pr": "na", "en": "on/at" },
      { "phrase": "с", "pr": "s", "en": "with" },
      { "phrase": "у", "pr": "u", "en": "by/near/at (also possession)" },
      { "phrase": "от", "pr": "ot", "en": "from" },
      { "phrase": "для", "pr": "dlya", "en": "for" },
      { "phrase": "без", "pr": "bez", "en": "without" },
      { "phrase": "о / об", "pr": "o / ob", "en": "about" }
    ]
  },
  {
    "category": "part3",
    "lessons": [
      { "phrase": "кто", "pr": "kto", "en": "who" },
      { "phrase": "что", "pr": "chto", "en": "what" },
      { "phrase": "где", "pr": "gde", "en": "where" },
      { "phrase": "когда", "pr": "kogda", "en": "when" },
      { "phrase": "почему", "pr": "pochemu", "en": "why" },
      { "phrase": "как", "pr": "kak", "en": "how" },
      { "phrase": "какой/какая/какое", "pr": "kakoy/kakaya/kakoye", "en": "which / what kind of" }
    ]
  },
  {
    "category": "part4",
    "lessons": [
      { "phrase": "не", "pr": "ne", "en": "not" },
      { "phrase": "ни", "pr": "ni", "en": "neither/nor" },
      { "phrase": "тоже", "pr": "tozhe", "en": "also" },
      { "phrase": "ещё", "pr": "eshchyo", "en": "still / more" },
      { "phrase": "уже", "pr": "uzhe", "en": "already" },
      { "phrase": "всегда", "pr": "vsegda", "en": "always" },
      { "phrase": "никогда", "pr": "nikogda", "en": "never" }
    ]  
  },
  {
    "category": "part5",
    "lessons": [
      { "phrase": "это", "pr": "eto", "en": "this/it" },
      { "phrase": "здесь", "pr": "zdes'", "en": "here" },
      { "phrase": "там", "pr": "tam", "en": "there" },
      { "phrase": "я", "pr": "ya", "en": "I" },
      { "phrase": "ты", "pr": "ty", "en": "you" },
      { "phrase": "он / она", "pr": "on / ona", "en": "he / she" },
      { "phrase": "мы / они", "pr": "my / oni", "en": "we / they" }
    ]
  },
  {
    "category": "part6",
    "lessons": []
  },
  {
    "category": "part7",
    "lessons": []
  },
  {
    "category": "part8",
    "lessons": []
  },
  {
    "category": "part9",
    "lessons": []
  }
]

  italian =[
  {
    "category": "part1",
    "lessons": [
      { "phrase": "e", "pr": "eh", "en": "and" },
      { "phrase": "oppure/o", "pr": "op-poo-re/o", "en": "or" },
      { "phrase": "ma", "pr": "ma", "en": "but" },
      { "phrase": "perché", "pr": "per-ke", "en": "because" },
      { "phrase": "anche se", "pr": "an-ke se", "en": "although" },
      { "phrase": "se", "pr": "se", "en": "if" },
      { "phrase": "inoltre", "pr": "i-nol-tre", "en": "also / moreover" }
    ]
  },
  {
    "category": "part2",
    "lessons": [
      { "phrase": "in", "pr": "in", "en": "in/at" },
      { "phrase": "su", "pr": "su", "en": "on" },
      { "phrase": "con", "pr": "kon", "en": "with" },
      { "phrase": "da", "pr": "da", "en": "from/by/at (possession)" },
      { "phrase": "di", "pr": "di", "en": "of/from" },
      { "phrase": "per", "pr": "per", "en": "for" },
      { "phrase": "senza", "pr": "sen-za", "en": "without" },
      { "phrase": "su riguardo a", "pr": "su ri-guard-o a", "en": "about" }
    ]
  },
  {
    "category": "part3",
    "lessons": [
      { "phrase": "chi", "pr": "ki", "en": "who" },
      { "phrase": "che cosa", "pr": "ke ko-sa", "en": "what" },
      { "phrase": "dove", "pr": "do-ve", "en": "where" },
      { "phrase": "quando", "pr": "kwan-do", "en": "when" },
      { "phrase": "perché", "pr": "per-ke", "en": "why" },
      { "phrase": "come", "pr": "ko-me", "en": "how" },
      { "phrase": "quale", "pr": "kwa-le", "en": "which/what kind of" }
    ]
  },
  {
    "category": "part4",
    "lessons": [
      { "phrase": "non", "pr": "non", "en": "not" },
      { "phrase": "né", "pr": "ne", "en": "neither/nor" },
      { "phrase": "anche", "pr": "an-ke", "en": "also/too" },
      { "phrase": "ancora", "pr": "an-ko-ra", "en": "still / yet" },
      { "phrase": "già", "pr": "ja", "en": "already" },
      { "phrase": "sempre", "pr": "sem-pre", "en": "always" },
      { "phrase": "mai", "pr": "mai", "en": "never" }
    ]
  },
  {
    "category": "part5",
    "lessons": [
      { "phrase": "questo", "pr": "kwes-to", "en": "this/it" },
      { "phrase": "qui", "pr": "kwi", "en": "here" },
      { "phrase": "lì", "pr": "li", "en": "there" },
      { "phrase": "io", "pr": "io", "en": "I" },
      { "phrase": "tu", "pr": "tu", "en": "you" },
      { "phrase": "lui / lei", "pr": "lui / lei", "en": "he / she" },
      { "phrase": "noi / voi / loro", "pr": "noi / voi / lo-ro", "en": "we / you (pl) / they" }
    ]
  },
  {
    "category": "part6",
    "lessons": [
      { "phrase": "ciao", "pr": "chao", "en": "hi/bye" },
      { "phrase": "grazie", "pr": "gra-tsye", "en": "thank you" },
      { "phrase": "prego", "pr": "pre-go", "en": "you're welcome" },
      { "phrase": "scusa", "pr": "sku-za", "en": "excuse me (informal)" },
      { "phrase": "mi dispiace", "pr": "mi dis-pya-che", "en": "I'm sorry" }
    ]
  },
  {
    "category": "part7",
    "lessons": [
      { "phrase": "buongiorno", "pr": "bwon-jor-no", "en": "good morning" },
      { "phrase": "buonasera", "pr": "bwo-na-se-ra", "en": "good evening" },
      { "phrase": "buonanotte", "pr": "bwo-na-not-te", "en": "good night" },
      { "phrase": "arrivederci", "pr": "ar-ri-ve-der-chi", "en": "goodbye (formal)" },
      { "phrase": "a presto", "pr": "a pres-to", "en": "see you soon" }
    ]
  },
  {
    "category": "part8",
    "lessons": [
      { "phrase": "bene", "pr": "be-ne", "en": "well" },
      { "phrase": "male", "pr": "ma-le", "en": "badly" },
      { "phrase": "forse", "pr": "for-se", "en": "maybe" },
      { "phrase": "subito", "pr": "su-bi-to", "en": "immediately" },
      { "phrase": "semplicemente", "pr": "sem-pli-che-men-te", "en": "simply" }
    ]
  },
  {
    "category": "part9",
    "lessons": [
      { "phrase": "va bene", "pr": "va be-ne", "en": "okay / all right" },
      { "phrase": "d'accordo", "pr": "da-kor-do", "en": "agreed / okay" },
      { "phrase": "non lo so", "pr": "non lo so", "en": "I don’t know" },
      { "phrase": "certo", "pr": "cher-to", "en": "sure / of course" },
      { "phrase": "magari", "pr": "ma-ga-ri", "en": "maybe / I wish" }
    ]
  }
]

  japanese = [
  { category: "part1", lessons: [
      { phrase: "です・だ", pr: "です・だ", en: "is, am, are" },
      { phrase: "でした・だった", pr: "でした・だった", en: "was, were" },
      { phrase: "なる", pr: "なる", en: "to become" },
      { phrase: "が", pr: "が", en: "subject marker" },
      { phrase: "か", pr: "か", en: "question marker" },
      { phrase: "か", pr: "か", en: "or (A or B, choice)" }
  ]},

  { category: "part2", lessons: [
      { phrase: "から", pr: "から", en: "because, since" },
      { phrase: "から", pr: "から", en: "from" },
      { phrase: "けれども", pr: "けれども", en: "but, although" },
      { phrase: "が", pr: "が", en: "but, however" },
      { phrase: "まで", pr: "まで", en: "until, till, to" },
      { phrase: "これから", pr: "これから", en: "from now, soon" },
      { phrase: "まだ", pr: "まだ", en: "still, not yet" }
  ]},

  { category: "part3", lessons: [
      { phrase: "くらい", pr: "くらい", en: "about, approximately" },
      { phrase: "いちばん", pr: "いちばん", en: "the most" },
      { phrase: "より〜のほうが〜", pr: "より〜のほうが〜", en: "is more ~ than" },
      { phrase: "だけ", pr: "だけ", en: "only, just" },
      { phrase: "もう", pr: "もう", en: "already, anymore" },
      { phrase: "も", pr: "も", en: "also, too, as well" },
  ]},

  { category: "part4", lessons: [
      { phrase: "だろう", pr: "だろう", en: "probably" },
      { phrase: "でしょう", pr: "でしょう", en: "probably, I think" },
      { phrase: "ほうがいい", pr: "ほうがいい", en: "it’d be better to" },
      { phrase: "ほうがいい", pr: "ほうがいい", en: "it’d be better not to" },
      { phrase: "つもりだ", pr: "つもりだ", en: "plan to, intend to" }
  ]}, 

  { category: "part5", lessons: [
      { phrase: "まえに", pr: "まえに", en: "before" },
      { phrase: "てから", pr: "てから", en: "after doing" },
      { phrase: "ている", pr: "ている", en: "is/are doing" },
      { phrase: "てください", pr: "てください", en: "please do…" },
      { phrase: "てもいい", pr: "てもいい", en: "may, is okay to" },
      { phrase: "てはいけない", pr: "てはいけない", en: "must not, may not"  }
  ]},

  { category: "part6", lessons: [
      { phrase: "に", pr: "に", en: "in, at, to, for" },
      { phrase: "に／へ", pr: "に／へ", en: "to (direction)" },
      { phrase: "にいく", pr: "にいく", en: "to go in order to" },
      { phrase: "にする", pr: "にする", en: "to decide on" },
      { phrase: "で", pr: "で", en: "at, in (location)" },
      { phrase: "で", pr: "で", en: "with, by (means/method)" },
      { phrase: "と", pr: "と", en: "and, with" },
      { phrase: "や", pr: "や", en: "and (listing)" }
  ]},

  { category: "part7", lessons: [
      { phrase: "な", pr: "な", en: "don’t do (casual)" },
      { phrase: "ないでください", pr: "ないでください", en: "please don’t" },
      { phrase: "ませんか", pr: "ませんか", en: "let’s, won’t you" },
      { phrase: "ましょう", pr: "ましょう", en: "let’s, shall we" }
  ]},

  { category: "part8", lessons: [
      { phrase: "の", pr: "の", en: "of (possessive)" },
      { phrase: "の", pr: "の", en: "nominalizer (turns verb into noun)" },
      { phrase: "の", pr: "の", en: "the act of ... / doing ..." },
      { phrase: "ので", pr: "ので", en: "because of, since" },
      { phrase: "のがじょうず", pr: "のがじょうず", en: "to be good at doing" },
      { phrase: "のがすき", pr: "のがすき", en: "like / love doing" },
      { phrase: "のがへた", pr: "のがへた", en: "to be bad at doing" },
      { phrase: "たい", pr: "たい", en: "want to" },
      { phrase: "たことがある", pr: "たことがある", en: "have done before" }
  ]}
];

  reactiveForm: FormGroup
  ro = false
  @Input() fromApp:string = ""
  show: boolean = false;
  route:Router = inject(Router)
  activateRoute:ActivatedRoute= inject(ActivatedRoute)
  highlightMode = true;
  status2 = signal<string>('');
  status = ''
  a_load: boolean;
  check = signal<any>('');
  //phrase_ind = signal<PhraseIndex>({name:'',ind:0}) un-comment\\\\\\\\\\\\\\\\\\\\\\\\\
  constructor(private phrasesService: AllphrasesService,private http:HttpClient,private formbuilder:FormBuilder
    

  ,private fb: FormBuilder,public phraseName:PhrasenameService,public auth_user:AuthenticationUser) {
    this.editForm = this.fb.group({
      ko: ['', Validators.required],
      pr: [''],
      en: ['', Validators.required],
      des: [''],
      phrase_name: ['', Validators.required]
    });
    this.auth_user.initializeAuth()
    
     this.auth_user.authStatus.subscribe(s =>
      this.status2.update(a=>a=s)
     )
  }
  
  serializedUrl = "http://127.0.0.1:8000/api/phrases-serializer/"
  jsonPhrase:any = []
  serializePhrase(){
    this.http.get(this.serializedUrl).subscribe((phrase:any)=>{
      console.log(phrase)
      this.jsonPhrase = phrase
      console.log(this.jsonPhrase)
      alert('success') 
    })
  }

  numberClass = 500;

  onEvent(num:number){
    this.numberClass = num

  }
  allStory = [{s:"",isDone:false,id:0}]
  allCourse = []
  theCourse:any =[]
  iscompleted = false
  ngOnInit(): void {
    
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
  const tempId: string | null = params.get('id');
  this.id = tempId;

  if (!this.id) return;

  const inputMap = {
    'Korean': this.selectedPhraseNames(),
    'Japanese': this.selectedPhraseNames(),
    'Italian': this.selectedPhraseNames(),
    'German': this.selectedPhraseNames(),
    'Russian':  this.selectedPhraseNames()
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
      this.setUnifiedPhrases(this.id!, phrases);
    },
    error: (error: any) => {
      alert(`❌ Failed to load ${this.id} phrases: ${error.message}`);
    }
  });



    this.auth_user.initializeAuth()
    this.auth_user.authStatusLoaded.subscribe(a=>this.a_load=a)
    this.auth_user.authStatus.subscribe((id:string)=>
      this.check.update(a =>a=id)
      )
  
    
    // Call only for the selected language
    if(this.check() ==='signed in'){
    this.phraseName.getPhrases(this.id).subscribe({
      next: data => {
        console.log("this is a",data)
      switch(this.id) {
        case 'Korean':
           this.allListgrammer = data.filter(p => p.type === 'grammar');
           this.allListStory = data.filter(p => p.type === 'story');
          console.log("this is a some course: ",this.allListStory)

          break
        case 'Russian': 
          
           this.allListRussiangrammer = data.filter(p => p.type === 'grammar');
           this.allListRussianStory = data.filter(p => p.type === 'story');
          break
        case 'Italian' : 
          
           this.allListItaliangrammer = data.filter(p => p.type === 'grammar');;
           this.allListItalianStory = data.filter(p => p.type === 'story');
        break
        case 'German': this.allListGermanStory = data;
          break
        default : 
          
           this.allListJapanesegrammer = data.filter(p => p.type === 'grammar');;
           this.allListJapaneseStory = data.filter(p => p.type === 'story');
      }
      // error: err => console.error(`Failed to load ${lang} grammar:`, err)
      

    
    switch(this.id){
      case 'Korean':
        this.language ='Korean'
        this.allStory =this.allListStory
        this.allCourse = this.allListgrammer
        this.theCourse = this.korean
        //this.pro = "pr"
        break
      case 'Russian':
        this.language='Russian'
        
        this.allStory =this.allListRussianStory
        this.allCourse = this.allListRussiangrammer
        this.theCourse = this.russian
        //this.pro = "pr"

        break
      case 'Italian':
        this.language='Italian'
        
        this.allStory =this.allListItalianStory
        this.allCourse = this.allListItaliangrammer
        this.theCourse = this.italian
        //this.pro = "pr"
        break

      case 'German':
        this.language='German'
        
        this.allStory =this.allListGermanStory
        this.allCourse = this.allListGermangrammer
        //this.pro = "pr"

        break
      case'Japanese':
        this.language = 'Japanese'

        this.allStory = this.allListJapaneseStory
        this.allCourse= this.allListJapanesegrammer

        this.theCourse = this.japanese
        //this.pro = "kana"



    }
    }});
    }
    else{

      
          
      this.allListgrammer= this.phraseName.allListgrammer
      this.allPopular = this.phraseName.allPopularPhrases
      this.allListStory = this.phraseName.allListStory
      this.allListRussiangrammer = this.phraseName.allListRussiangrammer
      this.allListRussianStory = this.phraseName.allListRussianStory;
      this.allListItaliangrammer= this.phraseName.allListItaliangrammer
      this.allListItalianStory= this.phraseName.allListItalianStory
      this.allListGermangrammer  = this.phraseName.allListGermangrammer
      this.allListGermanStory = [{"s":"conversation",isDone:false},{"s":"askingDirections",isDone:false},{"s":"germanQuestionsForLearners",isDone:false},{"s":"germanQuestionsForLearners2",isDone:false},{"s":"germanQuestionsForLearners3",isDone:false},{"s":"germanQuestionsForLearners4",isDone:false},{"s":"germanQuestionsForLearners5",isDone:false}]
      this.allListJapanesegrammer= this.phraseName.allListJapanesegrammer
      this.allListJapaneseStory= this.phraseName.allListJapaneseStory
            
    }

    
    switch(this.id){
      case 'Korean':
        this.language ='Korean'
        this.allStory =this.allListStory
        this.allCourse = this.allListgrammer
        this.theCourse = this.korean
        //this.pro = "pr"
        break
      case 'Russian':
        this.language='Russian'
        
        this.allStory =this.allListRussianStory
        this.allCourse = this.allListRussiangrammer
        this.theCourse = this.russian
        //this.pro = "pr"

        break
      case 'Italian':
        this.language='Italian'
        
        this.allStory =this.allListItalianStory
        this.allCourse = this.allListItaliangrammer
        this.theCourse = this.italian
        //this.pro = "pr"
        break

      case 'German':
        this.language='German'
        
        this.allStory =this.allListGermanStory
        this.allCourse = this.allListGermangrammer
        //this.pro = "pr"

        break
      case'Japanese':
        this.language = 'Japanese'

        this.allStory = this.allListJapaneseStory
        this.allCourse= this.allListJapanesegrammer

        this.theCourse = this.japanese
        //this.pro = "kana"



    }

    });

    if(this.check()==='signed in'){this.loadCompletedFromBackend()}
  }
phrases = signal<UnifiedPhrase[]>([]);
activeIndex: number | null = null;

show3(index: number) {
  this.activeIndex = this.activeIndex === index ? null : index;
}

setUnifiedPhrases(lang: string, phraseList: any[]) {
  this.phrases.set(phraseList);

}


  navToSite(){
    this.route.navigate([])
  }

  grammar = false

  showGrammar(){
    this.grammar = !this.grammar

    this.ngOnInit();

    this.input=""
  }
  update(event:any){
    console.log(event)
    
    this.reactiveForm = this.formbuilder.group({
      
      jp: event.jp,
      kana: event.kana,
      en: event.en,
      des: event.des,
      phrase_name: event.phrase_name,
      username: event.username,
      id:event.id
    })
    this.edit = true
  
  }

  /*getList(s:string,ind:any,set:string){ un-comment
    
    if(this.id=="Korean"){
      this.input = s
      this.selectedPhraseName.set(s);
      this.phrase_ind.set({name:set,'ind':ind})
    }
    
    else if(this.id=="Russian"){
      this.input = s
      this.selectedPhraseName.set(s);
      this.phrase_ind.set({name:set,'ind':ind})


    }
    else if(this.id == "Italian"){
      this.input = s
      this.selectedPhraseName.set(s);
      this.phrase_ind.set({name:set,'ind':ind})


    }
    
    else if(this.id == "Japanese"){
      this.input = s
      this.selectedPhraseName.set(s);
      this.phrase_ind.set({name:set,'ind':ind})

    
    }else if(this.id == "German"){
      this.input5 =s
      this.selectedPhraseName.set(s);

    }

    this.ngOnInit()
  }*/
  updateSerializedUrl = "http://127.0.0.1:8000/api/update-phrases-serializer/"
  showlessons = false
  show2(){
    this.showlessons = !this.showlessons
  }
  editSomePhrase2(){ 
    this.edit = false
  }
  editPhrase(){
    this.http.put(this.updateSerializedUrl,this.reactiveForm.getRawValue()).subscribe((data:any)=>{

      console.log(data)
      
    

    this.reactiveForm = this.formbuilder.group({
      jp: '',
      kana: '',
      en: '',
      des: '',
      phrase_name:'',
      username: '',
    })
    })


    this.edit = false

  }

  hideContent = false;
  hide(){
    this.hideContent = !this.hideContent
  }


  course = false
  showCourse(){

    this.course = !this.course
  }

  isPanelOpen = false;
  selectedPhrase: string | null = null;

  togglePhrasePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  selectPhrase(phrase: string) {
    this.selectedPhraseNames.set(phrase);
  }

  selectedItem: string | null = null;
  selectedType: string = '';

  togglePanel() {
    this.isPanelOpen = !this.isPanelOpen;
  }

  select(type: string, item: string) {
    this.selectedType = type;
    this.selectedItem = item;
  }
  editForm!: FormGroup;
  editingIndex: number | null = null;

  
  openEdit(index: number) {
    this.editingIndex = index;
    this.editForm.setValue({ ...this.phrases[index] });
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  saveEdit() {
    if (this.editForm.valid && this.editingIndex !== null) {
      this.phrases[this.editingIndex] = this.editForm.value;
      this.editingIndex = null;
    }
  }
  //showsCompleted
  showCompleteConfirm = false;

  isCompleted = this.phrase_ind()['name']=='s'?this.allStory[this.phrase_ind()['ind']].isDone:this.allCourse[this.phrase_ind()['ind']];
/*toggleCompleteConfirm() { un-comment
  const { name, ind } = this.phrase_ind();
  
  // Sync checkbox state with actual status
  if (name === 's') {
    this.isCompleted = this.allStory[ind].isDone;
  } else if (name === 'c') {
    this.isCompleted = this.allCourse[ind].isDone;
  }

  // Now show/hide the panel
  this.showCompleteConfirm = !this.showCompleteConfirm;
}*/


/*saveCompleted() { un-comment-when 
  const { name, ind } = this.phrase_ind();

  if (this.isCompleted) {
    switch (name) {
      case 's':
        this.allStory[ind].isDone = true;
        break;
      case 'c':
        this.allCourse[ind].isDone = true;
        break;
      case 'g':
        this.allListgrammer[ind].isDone = true;
        break;
    }
  } else {
    // Unmark completed
    switch (name) {
      case 's':
        this.allStory[ind].isDone = false;
        break;
      case 'c':
        this.allCourse[ind].isDone = false;
        break;
      case 'g':
        this.allListgrammer[ind].isDone = false;
        break;
    }
  }

  this.isCompleted = false;
  this.showCompleteConfirm = false;
}*/

/*getDoneStatus(): boolean { un-comment ////////////////////////////////////////////////////////////////
  const { name, ind } = this.phrase_ind();
  switch (name) {
    case 's': return this.allStory[ind]?.isDone ?? false;
    case 'c': return this.allCourse[ind]?.isDone ?? false;
    case 'g': return this.allListgrammer[ind]?.isDone ?? false;
    default: return false;
  }
}*/

/*
objectPhrase = {s:'',isDone:false}
saveCompleted() {

  
  if (this.isCompleted) {
    console.log('Phrase marked as completed:', this.selectedPhraseName());
    // Optionally update your local state or make API call to save completion
    switch(this.phrase_ind()['name']){
      case's':
        this.allStory[this.phrase_ind()['ind']]['isDone'] = true
        break
      case'c':
        this.allCourse[this.phrase_ind()['ind']]['isDone'] = false
    
    }
      //this.isCompleted = false
  }else if(!this.isCompleted){
    this.allStory[this.phrase_ind()['ind']]['isDone'] = false
  }
  this.isCompleted = false
  this.showCompleteConfirm = false;

}*/


  //isCompleted = false;
  //language = 'Korean'; // or dynamic
  selectedIndex = -1;
  //selectedType = ''; // 's' or 'c'
  aPhrase(s: string, i: number, name: string) {
    this.selectedIndex = i;
    this.selectedType = name;


    this.selectedPhraseNames.set(s)
    this.ngOnInit()
    //this.service.setLanguage(this.language); // optional
  }

  selectedPhraseName() {
    return this.selectedIndex >= 0 ? this.selectedIndex : null;
  }

  phrase_ind() {
    return { ind: this.selectedIndex, name: this.selectedType };
  }

  toggleCompleteConfirm() {
    this.isCompleted = this.getDoneStatus();
    this.showCompleteConfirm = !this.showCompleteConfirm;
  }

  getDoneStatus() {
    if (this.selectedType === 's') return this.allStory[this.selectedIndex]?.isDone;
    if (this.selectedType === 'p') return this.allPopular[this.selectedIndex]?.isDone;

    if (this.selectedType === 'c') return this.allCourse[this.selectedIndex]?.isDone;
    return false;
  }

saveCompleted() {
  if (this.selectedIndex < 0) return;

  let selectedArray;
  let type: 'story' | 'grammar'|'popular';

  if (this.selectedType === 's') {
    selectedArray = this.allStory;
    type = 'story';
  } else if (this.selectedType === 'c') {
    selectedArray = this.allCourse;
    type = 'grammar';
  } else if (this.selectedType === 'p') {
    selectedArray = this.allPopular;
    type = 'popular';
  }  
  else {
    return;
  }
  const phrase = selectedArray[this.selectedIndex];
  phrase.isDone = this.isCompleted;
  // Save to backend
  this.phraseName.savePhraseProgress(phrase.id ??-1, phrase.isDone).subscribe({
    next: () => console.log('✅ Progress saved for phrase', phrase),
    error: err => console.error('❌ Failed to save progress', err)
  });
  this.showCompleteConfirm = false;
}
loadCompletedFromBackend() {
  this.phraseName.getDoneStatus(this.language, 'story').subscribe(progressList => {

    console.log(progressList)
    const progressMap = new Map(progressList.map(p=>[p.phrase_id,p.isDone]))
    console.log(progressMap)
    this.allStory.forEach((story) => story.isDone =progressMap.get(story.id)??false);
  });

  
  this.phraseName.getDoneStatus(this.language, 'grammar').subscribe(progressList => {
    const progressMap = new Map(progressList.map(p=>[p.phrase_id,p.isDone]))
    this.allCourse.forEach((story) => story.isDone =progressMap.get(story.id)??false);
  });
}
clearCompleted() {
  // Reset in UI
  this.allStory.forEach(item => item.isDone = false);
  this.allCourse.forEach(item => item.isDone = false);

  // Send bulk clear to backend
  this.phraseName.clearProgress(this.language).subscribe({
    next: () => console.log('✅ All progress cleared'),
    error: err => console.error('❌ Failed to clear progress', err)
  });
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

clear(){
  
}
}
