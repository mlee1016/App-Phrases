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
  name?: string;
  isDone: boolean;
  type?: string;
  id?:number;
  phrase_id?:number
  difficulty?: string;
}
@Injectable({
  providedIn: 'root'
})

export class PhrasenameService { 
 // constructor(private http:HttpClient) {}

  /*allListgrammer: PhraseListItem[] = [

    { s: "course1", isDone:false},
    { s: "course2", isDone:false},
    { s: "course3", isDone:false},
    { s: "course4", isDone:false},
    { s: "course5", isDone:false},

    
    { s: "course6", isDone:false},
    { s: "course7", isDone:false},

    
    { s: "1-50verbs-current-present",isDone:false},
    { s: "1-50present-verbs", isDone: false},
    { s: "and-verb-conjugation", isDone: false },
    { s: "and-verb-conjugation2",isDone:false},
    { s: "and-verb-conjugation3", isDone: false },
    { s: "this way/that way", isDone:false},



//   ];*/
//   allListgrammer: PhraseListItem[] = [
//   { s: "course1", name: "Course 1 — Basic Foundations", isDone:false },
//   { s: "course2", name: "Course 2 — Essential Sentences", isDone:false },
//   { s: "course3", name: "Course 3 — Daily Conversation", isDone:false },
//   { s: "course4", name: "Course 4 — Practical Grammar", isDone:false },
//   { s: "course5", name: "Course 5 — Real-Life Usage", isDone:false },

//   { s: "course6", name: "Course 6 — Verb Patterns", isDone:false },
//   { s: "course7", name: "Course 7 — Advanced Verb Flow", isDone:false },

//   { s: "1-50verbs-current-present", name: "Top 50 Verbs: Present Tense (Set 1)", isDone:false },
//   { s: "1-50present-verbs",        name: "Top 50 Verbs: Present Tense (Set 2)", isDone:false },
//   { s: "and-verb-conjugation",     name: "Verb Conjugation Basics", isDone:false },
//   { s: "and-verb-conjugation2",    name: "Verb Conjugation Practice 1", isDone:false },
//   { s: "and-verb-conjugation3",    name: "Verb Conjugation Practice 2", isDone:false },
//   { s: "this way/that way",        name: "Direction Expressions (This/That Way)", isDone:false }
// ];

  
  
  
//   allPopularPhrases:PhraseListItem[]=[
    
//     { s: "1-50 useful", isDone: false},
//     { s: "51-100 useful", isDone: false},
//     { s: "popular phrases 1", isDone:false},
//     { s: "popular phrases 2", isDone:false},
//     { s: "phrases1", isDone:false},
//     { s: "phrases2", isDone:false},
//     { s: "phrases3", isDone:false},
//     { s: "phrases4", isDone:false},
//     { s: "phrases5", isDone:false},

//     { s: "phrases6", isDone:false}, 
//     { s: "phrases7", isDone:false},
//     { s: "phrases8", isDone:false},
//     { s: "phrases9", isDone:false},
//     { s: "smalltalk", isDone:false},
//     { s: "weather", isDone:false},  
//     { s: "weather2", isDone:false},
//     { s: "negations", isDone:false},

//   ]

//   allListStory: PhraseListItem[] = [
//     { s: "story1", isDone: false },
//     { s: "story2", isDone: false },
//     { s: "story3", isDone: false },
//     { s: "story4", isDone: false },
//     { s: "story5", isDone: false },
//     { s: "story6", isDone: false },
//     { s: "qA", isDone: false },
//     { s: "asking_directions", isDone: false },
//     { s: "plans_about_future", isDone: false },
//     { s: "dialogues", isDone: false },
//     { s: "dialogues2", isDone: false },
//     { s: "dialogues3", isDone: false },
//     { s: "dialogues4", isDone: false },
//     { s: "dialogues5", isDone: false },
//     { s: "dialogue", isDone: false },
//     { s: "dialogue2", isDone: false }, 
 

//   ];

allListgrammer: PhraseListItem[] = [
  
  { s: "1-20adjectives", name: "1- 20 popular adjectives", difficulty: "easy", isDone:false },
  { s: "21-40adjectives", name: "21 - 40 popular adjectives", difficulty: "easy", isDone:false },
  { s: "41-60adjectives", name: "41 - 60 popular adjectives", difficulty: "easy", isDone:false },
  { s: "61-80adjectives", name: "61 - 80 popular adjectives", difficulty: "easy", isDone:false },
  { s: "있어요-i-sseo-yo", name:  "있어요-i-sseo-yo", difficulty: "easy", isDone:false },
  { s: "1-50verbs", name: "Top 50 Verbs - polite Form", difficulty: "easy", isDone:false },


  
  { s: "1-50na-adj", name: "1 - 50 popular nouns + adjectives", difficulty: "easy", isDone:false },
  { s: "51-100na-adj", name: "51 - 105 noun + adjectives ", difficulty: "easy", isDone:false },


  { s: "ad-negations", name: "1 - 50 adectives - negations", difficulty: "easy", isDone:false },
  { s: "ad-negations2", name: "51 - 100 adectives - negations", difficulty: "easy", isDone:false },
  { s: "ad-negations-copula", name: "1 - 50 adectives - negations - copula", difficulty: "easy", isDone:false },
  { s: "ad-past", name: "1 - 50 adectives - past", difficulty: "easy", isDone:false },
  { s: "ad-past2", name: "51 - 105 adectives - past", difficulty: "easy", isDone:false },
  { s: "ad-future", name: "1 - 50 Adjectives future tense", difficulty: "easy", isDone:false },
  { s: "ad-future2", name: "51 - 105 Adjectives future tense", difficulty: "easy", isDone:false },

  { s: "course1", name: "Course 1", difficulty: "easy", isDone:false },
  { s: "course2", name: "Course 2", difficulty: "easy", isDone:false },
  { s: "course3", name: "Course 3", difficulty: "easy", isDone:false },
  { s: "course4", name: "Course 4 — Practical Grammar", difficulty: "easy", isDone:false },
  { s: "course5", name: "Course 5", difficulty: "easy", isDone:false },

  { s: "course6", name: "Course 6", difficulty: "easy", isDone:false },
  { s: "course7", name: "Course 7", difficulty: "medium", isDone:false },

  { s: "1-50verbs-current-present", name: "Top 50 Verbs — On going Tense 1", difficulty: "Intermediate", isDone:false },
  { s: "1-50present-verbs",        name: "Top 50 Verbs — On going Tense 2", difficulty: "Intermediate", isDone:false },

  { s: "and-verb-conjugation",     name: "Verb Conjugation Practice 1 (connect 2 verbs)", difficulty: "Intermediate", isDone:false },
  { s: "and-verb-conjugation2",    name: "Verb Conjugation Practice 2 (connect 2 verbs)", difficulty: "Intermediate", isDone:false },
  { s: "and-verb-conjugation3",    name: "Verb Conjugation Practice 3 (connect 2 verbs)", difficulty: "Intermediate", isDone:false },

  { s: "this way/that way",        name: "Direction Expressions (This/That Way)", difficulty: "medium", isDone:false }
];



allPopularPhrases: PhraseListItem[] = [
  { s: "1-50 useful", name: "Useful Phrases 1–50", difficulty: "easy", isDone: false },
  { s: "51-100 useful", name: "Useful Phrases 51–100", difficulty: "easy", isDone: false },

  { s: "popular phrases 1", name: "Popular Phrases 1", difficulty: "easy", isDone:false },
  { s: "popular phrases 2", name: "Popular Phrases 2", difficulty: "easy", isDone:false },

  { s: "phrases1", name: "Daily Phrases 1", difficulty: "Easy", isDone:false },
  { s: "phrases2", name: "Daily Phrases 2", difficulty: "Easy", isDone:false },
  { s: "phrases3", name: "Daily Phrases 3", difficulty: "Medium", isDone:false },
  { s: "phrases4", name: "Daily Phrases 4", difficulty: "Medium", isDone:false },
  { s: "phrases5", name: "Daily Phrases 5", difficulty: "Medium", isDone:false },

  { s: "phrases6", name: "Daily Phrases 6", difficulty: "Medium", isDone:false }, 
  { s: "phrases7", name: "Daily Phrases 7", difficulty: "Medium", isDone:false },
  { s: "phrases8", name: "Daily Phrases 8", difficulty: "Medium", isDone:false },
  { s: "phrases9", name: "Daily Phrases 9", difficulty: "intermediate", isDone:false },

  { s: "smalltalk", name: "Small Talk", difficulty: "intermediate", isDone:false },
  { s: "weather", name: "Weather Expressions 1", difficulty: "easy", isDone:false },
  { s: "weather2", name: "Weather Expressions 2", difficulty: "medium", isDone:false },
  { s: "negations", name: "Negation Forms", difficulty: "medium", isDone:false }]


allListStory: PhraseListItem[] = [
  { s: "story1", name: "Short Story 1", difficulty: "easy", isDone: false },
  { s: "story2", name: "Short Story 2", difficulty: "easy", isDone: false },
  { s: "story3", name: "Short Story 3", difficulty: "Medium", isDone: false },
  { s: "story4", name: "Short Story 4", difficulty: "Medium", isDone: false },
  { s: "story5", name: "Short Story 5", difficulty: "Medium", isDone: false },
  { s: "story6", name: "Short Story 6", difficulty: "easy", isDone: false },

  { s: "qA", name: "Q&A Practice", difficulty: "Easy", isDone: false },
  { s: "asking_directions", name: "Asking Directions", difficulty: "Easy", isDone: false },
  { s: "plans_about_future", name: "Future Plans Dialogue", difficulty: "Medium", isDone: false },

  { s: "dialogues", name: "Dialogues Set 1", difficulty: "Easy", isDone: false },
  { s: "dialogues2", name: "Dialogues Set 2", difficulty: "Medium", isDone: false },
  { s: "dialogues3", name: "Dialogues Set 3", difficulty: "Medium", isDone: false },
  { s: "dialogues4", name: "Dialogues Set 4", difficulty: "Medium", isDone: false },
  { s: "dialogues5", name: "Dialogues Set 5", difficulty: "Hard", isDone: false },

  { s: "dialogue", name: "Dialogue 1", difficulty: "Easy", isDone: false },
  { s: "dialogue2", name: "Dialogue 2", difficulty: "Medium", isDone: false }
];

  /*allListRussiangrammer: PhraseListItem[] = [

    { s: "part1", isDone: false },
    { s: "part2", isDone:false},
    { s: "part3", isDone: false },
    { s: "part4", isDone:false},
    
    { s: "part5", isDone: false },
    { s: "part6", isDone:false},
    { s: "ya-verb-conjugation", isDone: false },
    { s: "tbl-verb-conjugation", isDone: false },
  ];
  allPopularRussianPhrases:PhraseListItem[]=[
        { s: "usefulRussian", isDone: false },
        { s: "phrases1", isDone: false },
  ]
  allListRussianStory: PhraseListItem[] = [
    { s: "conversation", isDone: false },
    { s: "conversationQA", isDone: false },
    { s: "conversationQA2-1", isDone: false },
    { s: "conversationQA2", isDone: false },
    { s: "conversationQA3", isDone: false },
    { s: "easy-story1", isDone: false },
    { s: "easy-story2", isDone: false },
  ];*/
  allListRussiangrammer: PhraseListItem[] = [
    
  { s: "phrases", name: "Phrases: noun + adjec 1", difficulty: "easy", isDone: false },
  { s: "phrases2", name: "Phrases: noun + adjec 2", difficulty: "easy", isDone: false },
  { s: "phrases3", name: "Phrases: noun + adjec 3", difficulty: "easy", isDone: false },
  { s: "phrases4", name: "Phrases: noun + adjec 4", difficulty: "easy", isDone: false },
  { s: "ad-future-copula", name: "noun + ad (future)", difficulty: "easy", isDone: false },
  
  { s: "russianverbs", name: "Popular russian verbs ", difficulty: "easy", isDone: false },
  { s: "part1", name: "Part 1: Grammar Point", difficulty: "medium", isDone: false },
  { s: "part2", name: "Part 2: Grammar Point", difficulty: "easy", isDone: false },
  { s: "part3", name: "Part 3", difficulty: "medium", isDone: false },
  { s: "part4", name: "Part 4", difficulty: "medium", isDone: false },

  { s: "part5", name: "Part 5", difficulty: "medium", isDone: false },
  { s: "part6", name: "Part 6", difficulty: "medium", isDone: false },

  { s: "ya-verb-conjugation", name: "Verb Conjugation — Я Form", difficulty: "medium", isDone: false },
  { s: "tbl-verb-conjugation", name: "Verb Conjugation (tlb) Practice", difficulty: "intermediate", isDone: false }
];
allPopularRussianPhrases: PhraseListItem[] = [
  { s: "usefulRussian", name: "Top Useful Phrases (Set 1)", difficulty: "easy", isDone: false },
  { s: "phrases1", name: "Common Everyday Phrases", difficulty: "easy", isDone: false },
];
allListRussianStory: PhraseListItem[] = [
  { s: "conversation", name: "Conversation 1 — Greetings", difficulty: "easy", isDone: false },
  { s: "conversationQA", name: "Conversation Q&A — Daily Life", difficulty: "easy", isDone: false },
  { s: "conversationQA2-1", name: "Conversation Q&A — Shopping", difficulty: "medium", isDone: false },
  { s: "conversationQA2", name: "Conversation Q&A — Activities", difficulty: "medium", isDone: false },
  { s: "conversationQA3", name: "Conversation Q&A — Travel", difficulty: "medium", isDone: false },

  { s: "easy-story1", name: "Short Story 1 — Beginner Level", difficulty: "easy", isDone: false },
  { s: "easy-story2", name: "Short Story 2 — Beginner Level", difficulty: "easy", isDone: false }
];



//   allListItaliangrammer: PhraseListItem[] = [
//     { s: "course1", isDone: false },
//     { s: "course1-2", isDone: false },
//     { s: "course1-3",isDone:false},
//     { s: "course1-4", isDone: false },
//     { s: "masculine/plural-nouns", isDone: false },
//     { s: "masculine/plural-nouns2", isDone: false },
//     { s: "masculine/singular-nouns", isDone: false },
//     { s: "masculine/singular-nouns2", isDone: false },
//   ];
//   allPopularItalianPhrases:PhraseListItem[]=[
    
//     { s: "useful",name:"Useful Phrases", isDone: false, difficulty:"easy" },
//     { s: "phrases1",name:"Phrases", isDone: false, difficulty:"easy" },
//     {s:"1-50adjec",name:"1-50 Adjectives", isDone:false, difficulty:"easy"},
//     {s:"51-100adject",name:"51-100 Adjectives", isDone:false, difficulty:"medium"},

//   ]


//   allListItalianStory: PhraseListItem[] = [
//   { s: "introduction", name: "Introduction", difficulty: "easy", isDone: false },
//   { s: "intro", name: "Intro (Simple)", difficulty: "easy", isDone: false },
//   { s: "asking-directions", name: "Asking for Directions", difficulty: "easy", isDone: false },
//   { s: "q/a", name: "Q/A Set 1", difficulty: "easy", isDone: false },
//   { s: "q/a2", name: "Q/A Set 2", difficulty: "medium", isDone: false },
//   { s: "q/a3", name: "Q/A Set 3", difficulty: "medium", isDone: false },
//   { s: "story", name: "Short Story", difficulty: "medium", isDone: false }
// ];

// 🇮🇹 Italian Grammar Courses
allListItaliangrammer: PhraseListItem[] = [
  
  { s: "1-50adjec", name: "1–50 Adjectives", difficulty: "easy", isDone: false },
  { s: "51-100adject", name: "51–100 Adjectives", difficulty: "easy", isDone: false },
  { s: "course1", name: "Course 1: ", difficulty: "medium", isDone: false },
  { s: "course1-2", name: "Course 1 - Part 2", difficulty: "medium", isDone: false },
  { s: "course1-3", name: "Course 1 - Part 3", difficulty: "medium", isDone: false },
  { s: "course1-4", name: "Course 1 - Part 4", difficulty: "medium", isDone: false },

  { s: "masculine/plural-nouns", name: "Masculine Plural Nouns", difficulty: "medium", isDone: false },
  { s: "masculine/plural-nouns2", name: "Masculine Plural Nouns 2", difficulty: "medium", isDone: false },

  { s: "masculine/singular-nouns", name: "Masculine Singular Nouns", difficulty: "intermediate", isDone: false },
  { s: "masculine/singular-nouns2", name: "Masculine Singular Nouns 2", difficulty: "intermediate", isDone: false }
];


// 🇮🇹 Popular Italian Phrases
allPopularItalianPhrases: PhraseListItem[] = [
  { s: "useful", name: "Useful Phrases", difficulty: "easy", isDone: false },
  { s: "phrases1", name: "Phrases Set 1", difficulty: "easy", isDone: false },

];


// 🇮🇹 Italian Stories + Q/A
allListItalianStory: PhraseListItem[] = [
  { s: "introduction", name: "Introduction", difficulty: "easy", isDone: false },
  { s: "intro", name: "Intro (Simple)", difficulty: "easy", isDone: false },

  { s: "asking-directions", name: "Asking for Directions", difficulty: "easy", isDone: false },

  { s: "q/a", name: "Q/A Set 1", difficulty: "easy", isDone: false },
  { s: "q/a2", name: "Q/A Set 2", difficulty: "medium", isDone: false },
  { s: "q/a3", name: "Q/A Set 3", difficulty: "medium", isDone: false },

  { s: "story", name: "Short Story", difficulty: "medium", isDone: false }
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
  
    
  { s:"adjec", name: "Common Adjectives", difficulty: "easy", isDone: false },
  { s:"adjec2", name: "Common Adjectives 2", difficulty: "easy", isDone: false },
  { s:"adjec3", name: "Common Adjectives 3", difficulty: "easy", isDone: false },
  // { s:"adjec4", name: "Common Adjectives 4", difficulty: "easy", isDone: false },
  { s:"ad-n", name: "Top 50 Ad+Nouns", difficulty: "easy", isDone: false },
  // { s:"51-100nouns", name: "51-100 Nouns", difficulty: "easy", isDone: false },
  { s: "part1", name: "Basic Grammar 1", difficulty: "easy", isDone: false },
  { s: "part2", name: "Basic Grammar 2", difficulty: "easy", isDone: false },
  { s: "part3", name: "Grammar Point ", difficulty: "easy", isDone: false },
  { s: "part4", name: "Beginner Grammar 4", difficulty: "Medium", isDone: false },
  { s: "part5", name: "Beginner Grammar 5", difficulty: "Medium", isDone: false },
  { s: "part6", name: "Beginner Grammar 6", difficulty: "Medium", isDone: false },
  { s: "part7", name: "Beginner Grammar 7", difficulty: "Medium", isDone: false },
  { s: "part8", name: "Beginner Grammar 8", difficulty: "Medium", isDone: false },

  { s: "te-form-verbs", name: "Te-form Verbs", difficulty: "Intermediate", isDone: false },
  { s: "this way / that way", name: "Directional Forms", difficulty: "Easy", isDone: false },
  { s: "I think-", name: "と思う (I think)", difficulty: "Medium", isDone: false },
  // { s: "ad-1-50n3", name: "Adjectives advance 1 ", difficulty: "Medium", isDone: false },
  // { s: "ad-51-100n3", name: "Adjectives advance 2", difficulty: "Medium", isDone: false },
  { s: "adjectives", name: "Adjectives I", difficulty: "medium", isDone: false },
  { s: "adjectives2", name: "Adjectives II", difficulty: "Medium", isDone: false },
  { s: "time", name: "Time Expressions", difficulty: "medium", isDone: false },
];
allPopularJapanesePhrases: PhraseListItem[] = [
  { s: "phrases1", name: "Useful Phrases 1", difficulty: "easy", isDone: false },
  { s: "phrases2", name: "Useful Phrases 2", difficulty: "easy", isDone: false },
  { s: "phrases3", name: "Useful Phrases 3", difficulty: "easy", isDone: false },
  { s: "phrases4", name: "Useful Phrases 4", difficulty: "easy", isDone: false },
  { s: "phrase5", name: "Useful Phrases 5", difficulty: "medium", isDone: false },
  { s: "easydailyroutine", name: "Daily Routine", difficulty: "easy", isDone: false },
  { s: "easydailyroutine2", name: "Daily Routine 2", difficulty: "easy", isDone: false },
  { s: "easydailyroutine3", name: "Daily Routine 3", difficulty: "medium", isDone: false },
  { s: "useful", name: "General Daily Phrases", difficulty: "easy", isDone: false },
  { s: "useful4", name: "Useful Daily Phrases 2", difficulty: "Medium", isDone: false },
  { s:"practice", name: "Practice Sentences", difficulty: "Medium", isDone: false },
];
allListJapaneseStory: PhraseListItem[] = [
  { s: "story-intro", name: "Introduction Story", difficulty: "Easy", isDone: false },
  { s:"dailyroutine1", name: "Daily Routine", difficulty: "Easy", isDone: false },
  { s:"dailyroutine2", name: "Daily Routine 2", difficulty: "Easy", isDone: false },
  { s: "asking_directions", name: "Asking Directions", difficulty: "medium", isDone: false },
  { s: "restaurant", name: "At the Restaurant", difficulty: "Easy", isDone: false },
  { s: "conversation2", name: "Conversation Set 2", difficulty: "Medium", isDone: false },
  { s: "conversation", name: "Basic Conversation", difficulty: "Easy", isDone: false },
  { s: "JapaneseStory", name: "Short Story 1", difficulty: "Medium", isDone: false },
  { s: "conversation3", name: "Conversation Set 3", difficulty: "Medium", isDone: false },
  { s: "casual", name: "Casual Dialogue", difficulty: "Easy", isDone: false },

  { s: "A-walk", name: "A Walk", difficulty: "Easy", isDone: false },
  { s: "A-Japanese-town", name: "Japanese Town Walk", difficulty: "Medium", isDone: false },
  { s: "festival", name: "Festival Story 1", difficulty: "Medium", isDone: false },
  { s: "festival2", name: "Festival Story 2", difficulty: "Medium", isDone: false },

  { s: "combini", name: "At the Combini 1", difficulty: "Easy", isDone: false },
  { s: "combini2", name: "At the Combini 2", difficulty: "Easy", isDone: false },
  { s: "food-stall", name: "Food Stall 1", difficulty: "Medium", isDone: false },
  { s: "food-stall2", name: "Food Stall 2", difficulty: "Medium", isDone: false },

  { s: "hotel", name: "Hotel Story 1", difficulty: "Medium", isDone: false },
  { s: "hotel2", name: "Hotel Story 2", difficulty: "Hard", isDone: false }
];

  /*allListJapanesegrammer: PhraseListItem[] = [
//{ s: "n5", isDone: false },
    
    { s: "part1", isDone: false },
    { s: "part2", isDone: false },
    { s: "part3", isDone: false },
    { s: "part4", isDone: false },
    { s: "part5", isDone: false },
    { s: "part6", isDone: false },
    { s: "part7", isDone: false },
    { s: "part8", isDone: false },
    // { s: "n4-part1", isDone: false },

    { s: "te-form-verbs", isDone: false },
    { s: "this way / that way", isDone: false},
    { s: "I think-", isDone: false },
    // { s: "part15", isDone:false},
    { s: "adjectives", isDone:false},
    { s: "adjectives2", isDone:false},
    { s: "time", isDone:false},

  ];
  allPopularJapanesePhrases:PhraseListItem[]=[

    
    { s: "phrases1", isDone:false},
    { s: "phrases2", isDone:false},
    { s: "phrases3", isDone:false},
    { s: "phrases4", isDone:false},
    { s: "phrase5", isDone:false},
    
    { s: "useful", isDone: false },
    { s: "useful4", isDone: false },
    { s:"practice", isDone:false}

  ]
  allListJapaneseStory: PhraseListItem[] = [
    { s: "asking_directions", isDone: false },
    { s: "restaurant", isDone: false },
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
  ];*/
  userPhrases:any[] = [];
  /*
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
}}