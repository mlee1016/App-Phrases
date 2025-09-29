import { Component } from '@angular/core';

interface WordExample {
  word: string;
  reading: string;
  meaning: string;
  kanji: string; 
  kanjiReading: string; 
}

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  examples: WordExample[] = [];
  remainingExamples: WordExample[] = []; // 🔹 pool that shrinks
  currentKanji: WordExample | null = null;
  maskedReading: string = '';
  showAnswer = false;

  userInput: string = '';
  answerChecked: boolean = false;
  isCorrect: boolean = false;

  showNextButton = false; // 🔹 controls Next button
  score = 0;              // 🔹 correct answers count
  wrongAttempts = 0;      // 🔹 track mistakes

  constructor() {
    this.examples = this.loadKanjiExamples();
    this.remainingExamples = [...this.examples];
    this.nextWord();
  }

  loadKanjiExamples(): WordExample[] {
    return [
      { word: '一人', reading: 'ひとり', meaning: 'one person, alone', kanji: '一', kanjiReading: 'ひと' },
      { word: '一日', reading: 'いちにち', meaning: 'one day', kanji: '一', kanjiReading: 'いち' },
      { word: '一致', reading: 'いっち', meaning: 'agreement, match', kanji: '一', kanjiReading: 'いっ' },
      { word: '二人', reading: 'ふたり', meaning: 'two people', kanji: '二', kanjiReading: 'ふた' },
      { word: '二月', reading: 'にがつ', meaning: 'February', kanji: '二', kanjiReading: 'に' },
      { word: '三人', reading: 'さんにん', meaning: 'three people', kanji: '三', kanjiReading: 'さん' },
      { word: '三日', reading: 'みっか', meaning: 'the 3rd (day of month), 3 days', kanji: '三', kanjiReading: 'みっ' },
      { word: '四月', reading: 'しがつ', meaning: 'April', kanji: '四', kanjiReading: 'し' },
      { word: '四つ', reading: 'よっつ', meaning: 'four things', kanji: '四', kanjiReading: 'よっ' },
      // 四 (し, よん, よ) 
      { word: '四月', reading: 'しがつ', meaning: 'April', kanji: '四', kanjiReading: 'し' }, 
      // On 


      { word: '四つ', reading: 'よっつ', meaning: 'four things', kanji: '四', kanjiReading: 'よっ' }, // Kun 
      // 五 (ご, いつ) 
      { word: '五月', reading: 'ごがつ', meaning: 'May', kanji: '五', kanjiReading: 'ご' }, // On 
      { word: '五日', reading: 'いつか', meaning: 'the 5th (day of month), 5 days', kanji: '五', kanjiReading: 'いつ' }, // Kun // 六 (ろく, む) 
      { word: '六月', reading: 'ろくがつ', meaning: 'June', kanji: '六', kanjiReading: 'ろく' }, // On 
      { word: '六つ', reading: 'むっつ', meaning: 'six things', kanji: '六', kanjiReading: 'むっ' }, // Kun // 七 (しち, なな) 
      { word: '七月', reading: 'しちがつ', meaning: 'July', kanji: '七', kanjiReading: 'しち' }, // On 
      { word: '七つ', reading: 'ななつ', meaning: 'seven things', kanji: '七', kanjiReading: 'なな' }, // Kun // 八 (はち, や) 
      { word: '八月', reading: 'はちがつ', meaning: 'August', kanji: '八', kanjiReading: 'はち' }, // On 

      
      { word: '八つ', reading: 'やっつ', meaning: 'eight things', kanji: '八', kanjiReading: 'やっ' }, // Kun // 九 (きゅう, く, ここの) { word: '九月', reading: 'くがつ', meaning: 'September', kanji: '九', kanjiReading: 'く' }, // On 
      { word: '九つ', reading: 'ここのつ', meaning: 'nine things', kanji: '九', kanjiReading: 'ここの' }, // Kun // 十 (じゅう, とお) 
      { word: '十月', reading: 'じゅうがつ', meaning: 'October', kanji: '十', kanjiReading: 'じゅう' }, // On 
      { word: '十日', reading: 'とおか', meaning: 'the 10th (day of month), 10 days', kanji: '十', kanjiReading: 'とお' }, 
      // // Kun // 百 (ひゃく) 
      { word: '百円', reading: 'ひゃくえん', meaning: '100 yen', kanji: '百', kanjiReading: 'ひゃく' }, // On
      { word: '百科事典', reading: 'ひゃっかじてん', meaning: 'encyclopedia', kanji: '百', kanjiReading: 'ひゃっ' }, 
      // On // 千 (せん, ち) 
      { word: '千円', reading: 'せんえん', meaning: '1000 yen', kanji: '千', kanjiReading: 'せん' }, // On 
      { word: '千代田', reading: 'ちよだ', meaning: 'Chiyoda (place name)', kanji: '千', kanjiReading: 'ち' }, // Kun/Name // 万 (まん, ばん) 
      { word: '一万', reading: 'いちまん', meaning: '10,000', kanji: '万', kanjiReading: 'まん' }, 
      // On 

      
      { word: '万全', reading: 'ばんぜん', meaning: 'perfect, thorough', kanji: '万', kanjiReading: 'ばん' }, // On // 円 (えん, まる) 
      { word: '百円', reading: 'ひゃくえん', meaning: '100 yen', kanji: '円', kanjiReading: 'えん' }, // On 
      { word: '円い', reading: 'まるい', meaning: 'round, circular', kanji: '円', kanjiReading: 'まる' }, // Kun // 日 (にち, じつ, ひ, か) [your original examples kept]
      { word: '日本', reading: 'にほん', meaning: 'Japan', kanji: '日', kanjiReading: 'に' }, 
      { word: '日曜日', reading: 'にちようび', meaning: 'Sunday', kanji: '日', kanjiReading: 'にち' }, { word: '休日', reading: 'きゅうじつ', meaning: 'holiday', kanji: '日', kanjiReading: 'じつ' }, 
      { word: '日が昇る', reading: 'ひがのぼる', meaning: 'the sun rises', kanji: '日', kanjiReading: 'ひ' }, 
      { word: '二日', reading: 'ふつか', meaning: 'the 2nd (day of month), 2 days', kanji: '日', kanjiReading: 'か' } ]; 
  }

  maskKanjiReading(word: WordExample): string {
    const regex = new RegExp(word.kanjiReading, 'g');
    return word.reading.replace(regex, '__');
  }

  checkAnswer() {
    this.answerChecked = true;

    const user = this.userInput.normalize('NFC').trim();
    const answer = this.currentKanji?.kanjiReading.normalize('NFC').trim();

    this.isCorrect = user === answer;

    if (this.isCorrect) {
      this.score++;
      this.showNextButton = true; // 🔹 allow moving forward
    } else {
      this.wrongAttempts++;
      this.showNextButton = false; // 🔹 stays on same question
    }
  }

  nextWord(): void {
    this.showAnswer = false;
    this.showNextButton = false;
    this.userInput = "";
    this.answerChecked = false;
    this.hintEnglish = false;
    // 🔹 Remove mastered words from pool
    if (this.isCorrect && this.currentKanji) {
      this.remainingExamples = this.remainingExamples.filter(
        ex => ex !== this.currentKanji
      );
    }

    if (this.remainingExamples.length > 0) {
      this.currentKanji = this.remainingExamples[
        Math.floor(Math.random() * this.remainingExamples.length)
      ];
      this.maskedReading = this.maskKanjiReading(this.currentKanji);
    } else {
      this.currentKanji = null; // no more left
    }
  }

  hintEnglish = false;
  hint() {
    this.hintEnglish = true;
  }

  reveal(): void {
    this.showAnswer = true;
  }

  // Keyboard support
  cursorPos = 0;
  updateCursor(input: HTMLInputElement) {
    this.cursorPos = input.selectionStart ?? this.userInput.length;
  }

  receiveKana(char: any) {
    if (char === '⌫') {
      this.userInput = this.userInput.slice(0, -1);
    } else {
      this.userInput += char;
    }
  } 

  appendToInput(fragment: string, input?: HTMLInputElement) {
    const before = this.userInput.slice(0, this.cursorPos);
    const after = this.userInput.slice(this.cursorPos);
    this.userInput = before + fragment + after;
    this.cursorPos += fragment.length;

    if (input) {
      setTimeout(() => {
        input.selectionStart = this.cursorPos;
        input.selectionEnd = this.cursorPos;
        input.focus();
      });
    }
  }
}
