import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationUser } from '../emitters/emittters';
export interface Language {
  id: number;
  name: string;
}

export interface Phrase {
  id: number;
  language: number; // or Language object if nested
  name: string;
  type: 'grammar' | 'story';
}

export interface Progress {
  id: number;
  user: number;   // user id
  phrase: number; // phrase id
  is_done: boolean;
}

export interface PhraseListItem {
  s: string;
  isDone: boolean;
  type?: string;
  id?:number;
  phrase_id?:number
}
@Injectable({
  providedIn: 'root'
})

export class PhrasenameService { 
 // constructor(private http:HttpClient) {}

  allListgrammer: PhraseListItem[] = [

    // { s:'part1',isDone:true},
    // { s:'part1-2',isDone:false},
    // { s: "part2", isDone: false },
    // { s:'part2-2',isDone:false},
    // { s: "part3", isDone: true},
    // { s:'part3-2',isDone:false},
    // { s: "part4", isDone: false },
    // { s:'part4-2',isDone:false},
    // { s: "part5", isDone: false },
    // { s: "part5-2", isDone: false },
    { s: "course1", isDone:false},
    { s: "course2", isDone:false},
    { s: "course3", isDone:false},
    { s: "course4", isDone:false},
    { s: "course5", isDone:false},

    
    { s: "course6", isDone:false},
    { s: "course7", isDone:false},

    
    { s: "course15", isDone:false},
    { s: "Honorifics", isDone: false },
    { s: "Conjunctions", isDone: false },

    
    { s: "tense", isDone: true},
    { s: "presentTense", isDone: true},
    { s: "Koreanpart", isDone: false},
    { s: "startphrases1", isDone:false},
    { s: "1-50", isDone: true},
    { s: "51-100", isDone: false},
    { s: "1-50verbs-current-present",isDone:false},
    { s: "1-50present-verbs", isDone: false},
    { s: "and-verb-conjugation", isDone: false },
    { s: "and-verb-conjugation2",isDone:false},
    { s: "and-verb-conjugation3", isDone: false },
    { s: "this way/that way", isDone:false},
    { s: "phrases1", isDone:false},

    { s: "phrase2", isDone:false},
    { s: "pronounce", isDone:false},
    { s: "phrases3", isDone:false},
    { s: "phrases4", isDone:false},
    { s: "phrases5", isDone:false},
 
    { s: "phrases6", isDone:false}, 
    { s: "phrases7", isDone:false},
    { s: "phrases8", isDone:false},
    { s: "phrases9", isDone:false},





  ];
  allListStory: PhraseListItem[] = [
    { s: "story1", isDone: false },
    { s: "story2", isDone: false },
    { s: "story3", isDone: false },
    { s: "story4", isDone: false },
    { s: "story5", isDone: false },
    { s: "story6", isDone: false },
    { s: "qA", isDone: false },
    { s: "asking_directions", isDone: false },
    { s: "plans_about_future", isDone: false },
    { s: "dialogues", isDone: false },
    { s: "dialogues2", isDone: false },
    { s: "dialogues3", isDone: false },
    { s: "dialogues4", isDone: false },
    { s: "dialogues5", isDone: false },
    { s: "dialogue", isDone: false },
    { s: "dialogue2", isDone: false }, 
 

  ];

  allListRussiangrammer: PhraseListItem[] = [
    
    { s: "part1", isDone: false },
    { s: "part2", isDone:false},
    { s: "part3", isDone: false },
    { s: "part4", isDone:false},
    
    { s: "part5", isDone: false },
    { s: "part6", isDone:false},
    // { s: "course1", isDone: false },
    // { s: "course2", isDone: false },
    // { s: "course3", isDone: false },
    // { s: "course4", isDone: false },
    // { s: "course5", isDone: false },
    // { s: "course6", isDone: false },
    // { s: "course7", isDone: false },
    { s: "usefulRussian", isDone: false },
    { s: "ya-verb-conjugation", isDone: false },
    { s: "tbl-verb-conjugation", isDone: false },

    { s: "phrases1", isDone: false },

  ];

  allListRussianStory: PhraseListItem[] = [
    { s: "conversation", isDone: false },
    { s: "conversationQA", isDone: false },
    { s: "conversationQA2-1", isDone: false },
    { s: "conversationQA2", isDone: false },
    { s: "conversationQA3", isDone: false },
    { s: "easy-story1", isDone: false },
    { s: "easy-story2", isDone: false },
  ];


  allListItaliangrammer: PhraseListItem[] = [
    { s: "course1", isDone: false },
    { s: "course1-2", isDone: false },
    { s: "course1-3",isDone:false},
    { s: "course1-4", isDone: false },
    // { s: "course2", isDone: false },
    // { s: "course3", isDone: false },
    // { s: "course4", isDone: false }, 
    // { s: "course5", isDone: false },
    // { s: "course6", isDone: false },/
    // { s: "course7", isDone: false },
    { s: "masculine/plural-nouns", isDone: false },
    { s: "masculine/plural-nouns2", isDone: false },
    { s: "masculine/singular-nouns", isDone: false },
    { s: "masculine/singular-nouns2", isDone: false },
    { s: "useful", isDone: false },
    { s: "phrases1", isDone: false }

  ];

  allListItalianStory: PhraseListItem[] = [
    { s: "introduction", isDone: false },
    { s: "intro", isDone: false },
    { s: "asking-directions", isDone: false },
    { s: "q/a", isDone: false },
    { s: "q/a2", isDone: false },
    { s: "q/a3", isDone: false },
    { s:"story",isDone:false}
  ];

  allListGermangrammer: PhraseListItem[] = [
    { s: "course1", isDone: false },
    { s: "course2", isDone: false },
    
    { s: "course3", isDone: false },
    { s: "course4", isDone: false },
    { s: "course5", isDone: false },
    { s: "course6", isDone: false },
    { s: "course7", isDone: false },
    { s: "course8", isDone: false },
  ];

  allListGermanStory: PhraseListItem[] = [
    { s: "conversation", isDone: false },
    { s: "askingDirections", isDone: false },
    { s: "germanQuestionsForLearners", isDone: false },
    { s: "germanQuestionsForLearners2", isDone: false },
    { s: "germanQuestionsForLearners3", isDone: false },
    { s: "germanQuestionsForLearners4", isDone: false },
    { s: "germanQuestionsForLearners5", isDone: false }
  ];
  allListJapanesegrammer: PhraseListItem[] = [
//{ s: "n5", isDone: false },
    { s: "part1", isDone: false },
    { s: "part2", isDone: false },
    { s: "part3", isDone: false },
    { s: "part4", isDone: false },
    { s: "part5", isDone: false },
    { s: "part6", isDone: false },
    { s: "part7", isDone: false },
    { s: "part8", isDone: false },
    { s: "useful", isDone: false },
    { s: "useful4", isDone: false },
    { s: "n4-part1", isDone: false },

    { s: "te-form-verbs", isDone: false },
    { s: "this way / that way", isDone: false},
    { s: "I think-", isDone: false },
    { s: "part15", isDone:false},
    { s: "adjectives", isDone:false},
    { s: "adjectives2", isDone:false},
    { s: "time", isDone:false},
    { s:"practice", isDone:false}

  ];

  allListJapaneseStory: PhraseListItem[] = [
    { s: "asking_directions", isDone: false },
    { s: "conversation2", isDone: false },
    { s: "conversation", isDone: false },
    { s: "JapaneseStory", isDone: false },
    { s: "conversation3", isDone: false },
    { s: "casual", isDone: false },
    { s: "A-walk", isDone: false },
    { s: "A-Japanese-town", isDone: false },
    { s: "festival", isDone: false },
    { s: "festival2", isDone: false },   
    { s: "combini",isDone:false},
    { s: "combini2",isDone:false},
    { s: "food-stall",isDone:false},
    { s: "food-stall2",isDone:false},
    { s: "hotel", isDone: false },
    { s: "hotel2", isDone: false }
  ];/*

  // 🔄 Language reactive store
  private languageId = new BehaviorSubject<string>('Korean');
  languageId$ = this.languageId.asObservable();
  
    private baseUrl = 'http://127.0.0.1:8000/api';  // your API base URL

  setLanguage(lang: string): void {
    this.languageId.next(lang);
  }

  *getPhrases(lang: string): PhraseListItem[] {
    switch (lang) {
      case 'Korean': return this.allListgrammer;
      case 'Russian': return this.allListRussiangrammer;
      case 'Italian': return this.allListItaliangrammer;
      case 'German': return this.allListGermangrammer;
      case 'Japanese': return this.allListJapanesegrammer;
      default: return [];
    }
  }*

  getStories(lang: string): PhraseListItem[] {
    switch (lang) {
      case 'Korean': return this.allListStory;
      case 'Russian': return this.allListRussianStory;
      case 'Italian': return this.allListItalianStory;
      case 'German': return this.allListGermanStory;
      case 'Japanese': return this.allListJapaneseStory;
      default: return [];
    }


  }
  saveToLocal(lang: string, key: 'grammar' | 'story', data: PhraseListItem[]) {
  const storageKey = `${lang}_${key}`;
  localStorage.setItem(storageKey, JSON.stringify(data));
}

loadFromLocal(lang: string, key: 'grammar' | 'story'): PhraseListItem[] | null {
  const storageKey = `${lang}_${key}`;
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : null;
}

getPhrases(lang: string): PhraseListItem[] {
  const local = this.loadFromLocal(lang, 'grammar');
  if (local) return local;

  switch (lang) {
    case 'Korean': return this.allListgrammer;
    case 'Russian': return this.allListRussiangrammer;
      case 'Italian': return this.allListItaliangrammer;
      case 'German': return this.allListGermangrammer;
      case 'Japanese': return this.allListJapanesegrammer;
    default: return [];
  }
}



private storyDone$ = new BehaviorSubject<boolean[]>([]);

watchStoryDone() {
  return this.storyDone$.asObservable();
}
getDoneStatus(lang: string, type: 'story' | 'grammar'): boolean[] {
  const key = `${lang}_${type}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

saveDoneStatus(lang: string, type: 'story' | 'grammar', doneFlags: boolean[]) {
  const key = `${lang}_${type}`;
  localStorage.setItem(key, JSON.stringify(doneFlags));
}

clearLocal(lang: string, type: 'story' | 'grammar') {
  const key = `${lang}_${type}`;
  localStorage.removeItem(key);
}

updateStoryDone(newFlags: boolean[]) {
  this.storyDone$.next(newFlags);
  this.saveDoneStatus('Korean', 'story', newFlags);
}*/


  // private apiBase = '/api/api'; // Django API base path
  private apiBase = 'http://127.0.0.1:8000/api';  // your API base URL

  // Store current language reactively
  private languageId = new BehaviorSubject<string>('Korean');
  languageId$ = this.languageId.asObservable();


  // private apiBase = '/api'; // adjust if your backend URL is different
  private phraseNamesSubject = new BehaviorSubject<PhraseListItem[]>([]);
  phraseNames$ = this.phraseNamesSubject.asObservable();

  // Default list when not signed in
  private defaultList: PhraseListItem[] = [
    { s: 'Default Story 1', isDone: false },
    { s: 'Default Story 2', isDone: false }
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthenticationUser
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.authStatus.subscribe(a  => this.check.update(status1 => status1 = a))
  }
  check = signal<string>('')
  /** Used by your components to trigger loading */
  loadPhraseNames(lang: string, type: 'grammar' | 'story') {
    if (this.check()) {
      // ✅ Signed in: fetch from backend & merge done status
      this.getPhrasesWithDoneStatus(lang, type).subscribe({
        next: (data) => this.phraseNamesSubject.next(data),
        error: () => {
          console.error('Failed to fetch phrase names, using defaults.');
          this.phraseNamesSubject.next(this.defaultList);
        }
      });
    } else {
      // ❌ Not signed in: just show defaults
      this.phraseNamesSubject.next(this.defaultList);
    }
  }

  /** Grammar phrases 
  getPhrases(lang: string): Observable<PhraseListItem[]> {
    return this.http.get<any[]>(`${this.apiBase}/phrases/`, {
      params: { language: lang, type: 'grammar' }
    }).pipe(
      map(data => data.map(item => ({
        s: item.name,
        isDone: false
      })))
    );
  }*/


    /*getPhrases(lang: string) {
      return this.http.get<PhraseListItem[]>(`/api/phrases/`, {
        params: { language: lang }
      });
    }*/
  getPhrases(lang: string) {
  return this.http.get<any[]>(`${this.apiBase}/phrases/`, {
     params:{language: lang},headers:this.authService.getAuthHeaders() 
  }).pipe(
    map(data => data.map(item => ({
      id : item.id,     //user to know where to store in 
      s: item.name,     // map name → s
      type: item.type,  // keep type so you can filter in component
      isDone: false     // default false for now
    })))
  );
}

  /** Story phrases */
  getStories(lang: string): Observable<PhraseListItem[]> {
    return this.http.post<any[]>(`${this.apiBase}/phrases/`, 
      { language: lang, type: 'story' },
      { withCredentials: true }
    ).pipe(
      map(data => data.map(item => ({
        s: item.name,
        isDone: false
      })))
    );
  }

  /** Progress flags */

  /** Merge phrases with progress */
  getPhrasesWithDoneStatus(lang: string, type: 'grammar' | 'story'): Observable<PhraseListItem[]> {
    const phrases$ = type === 'grammar' ? this.getPhrases(lang) : this.getStories(lang);
    const done$ = this.getDoneStatus(lang, type);

    return forkJoin([phrases$, done$]).pipe(
      map(([phrases, doneFlags]) =>
        phrases.map((phrase, idx) => ({
          ...phrase,
          isDone: doneFlags[idx] ?? false
        }))
      ),
      catchError(() => of(this.defaultList)) // fallback to defaults if backend fails
    );
  }

savePhraseProgress(phraseId: number, isDone: boolean) {
  return this.http.post(`${this.apiBase}/progress/`, {
    phrase_id: phraseId,
    is_done: isDone,
  },{withCredentials:true},);


}

getDoneStatus(lang: string, type: 'story' | 'grammar') {
  return this.http.get<{ phrase_id: number, is_done: boolean }[]>(
    `${this.apiBase}/progress/`,
    {
      params: { language: lang, type },
      headers: this.authService.getAuthHeaders()
    }
  ).pipe(
    map(list => list.map(item => ({
      phrase_id: item.phrase_id,
      isDone: item.is_done   // convert snake_case to camelCase
    })))
  );
}

clearProgress(lang: string) {
  return this.http.delete(`${this.apiBase}/progress/clear/`, {
    params: { language: lang }
  });
}

}
