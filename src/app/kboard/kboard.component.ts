import { Component, EventEmitter, Input, Output, signal } from '@angular/core';


const kanaMap: Record<string, string> = { 
  // vowels
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  // k
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  // g
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  // s
  sa: 'さ', shi: 'し', su: 'す', se: 'せ', so: 'そ',
  sha: 'しゃ', shu: 'しゅ', sho: 'しょ',
  // z
  za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ',
  // t
  ta: 'た', chi: 'ち', tsu: 'つ', te: 'て', to: 'と',
  cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ',
  // d
  da: 'だ', de: 'で', do: 'ど',
  // n
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  // h
  ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  // b
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  // p
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  // m
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  // y
  ya: 'や', yu: 'ゆ', yo: 'よ',
  // r
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  // w, n
  wa: 'わ', wo: 'を', n: 'ん',
};

@Component({
  selector: 'app-kboard',
  templateUrl: './kboard.component.html',
  styleUrl: './kboard.component.css'
})
export class KboardComponent {


  // Track the selected input mode
// Initial consonants (Chosung)

chosung = [
  { char: 'ㄱ', romaja: 'g' },  { char: 'ㄴ', romaja: 'n' },  { char: 'ㄷ', romaja: 'd' },
  { char: 'ㄹ', romaja: 'r/l' },{ char: 'ㅁ', romaja: 'm' },  { char: 'ㅂ', romaja: 'b' },
  { char: 'ㅅ', romaja: 's' },  { char: 'ㅇ', romaja: '-' },  { char: 'ㅈ', romaja: 'j' },
  { char: 'ㅊ', romaja: 'ch' },{ char: 'ㅋ', romaja: 'k' },  { char: 'ㅌ', romaja: 't' },
  { char: 'ㅍ', romaja: 'p' },  { char: 'ㅎ', romaja: 'h' }
];

// Vowels (Jungsung)
jungsung = [
  { char: 'ㅏ', romaja: 'a' },   { char: 'ㅑ', romaja: 'ya' },  { char: 'ㅓ', romaja: 'eo' },
  { char: 'ㅕ', romaja: 'yeo' }, { char: 'ㅗ', romaja: 'o' },   { char: 'ㅛ', romaja: 'yo' },
  { char: 'ㅜ', romaja: 'u' },   { char: 'ㅠ', romaja: 'yu' },  { char: 'ㅡ', romaja: 'eu' },
  { char: 'ㅣ', romaja: 'i' },   { char: 'ㅐ', romaja: 'ae' },  { char: 'ㅔ', romaja: 'e' }
];


// Final consonants (Jongsung / Batchim)
jongsung = [
  { char: '', romaja: '' },     // No final consonant
  { char: 'ㄱ', romaja: 'k' },   { char: 'ㄲ', romaja: 'kk' },  { char: 'ㄳ', romaja: 'ks' },
  { char: 'ㄴ', romaja: 'n' },   { char: 'ㄵ', romaja: 'nj' },  { char: 'ㄶ', romaja: 'nh' },
  { char: 'ㄷ', romaja: 't' },   { char: 'ㄹ', romaja: 'l' },   { char: 'ㄺ', romaja: 'lk' },
  { char: 'ㄻ', romaja: 'lm' },  { char: 'ㄼ', romaja: 'lb' },  { char: 'ㄽ', romaja: 'ls' },
  { char: 'ㄾ', romaja: 'lt' },  { char: 'ㄿ', romaja: 'lp' },  { char: 'ㅀ', romaja: 'lh' },
  { char: 'ㅁ', romaja: 'm' },   { char: 'ㅂ', romaja: 'p' },   { char: 'ㅄ', romaja: 'ps' },
  { char: 'ㅅ', romaja: 't' },   { char: 'ㅆ', romaja: 't' },   { char: 'ㅇ', romaja: 'ng' },
  { char: 'ㅈ', romaja: 't' },   { char: 'ㅊ', romaja: 't' },   { char: 'ㅋ', romaja: 'k' },
  { char: 'ㅌ', romaja: 't' },   { char: 'ㅍ', romaja: 'p' },   { char: 'ㅎ', romaja: 'h' }
];
@Output() messageEvent = new EventEmitter<string>();

// sendChar(char: string) {
//       this.messageEvent.emit(char);
// }


@Input() lang:any=''
langMode = signal<'Korean' | 'Russian'|'Japanese'>(this.lang);

  // Russian letters with layout key hints
  russianLetters: { letter: string, key: string }[] = [
    { letter: 'А', key: 'F' }, { letter: 'Б', key: ',' }, { letter: 'В', key: 'D' },
    { letter: 'Г', key: 'U' }, { letter: 'Д', key: 'L' }, { letter: 'Е', key: 'T' },
    { letter: 'Ё', key: '`' }, { letter: 'Ж', key: ';' }, { letter: 'З', key: 'P' },
    { letter: 'И', key: 'B' }, { letter: 'Й', key: 'Q' }, { letter: 'К', key: 'R' },
    { letter: 'Л', key: 'K' }, { letter: 'М', key: 'V' }, { letter: 'Н', key: 'Y' },
    { letter: 'О', key: 'J' }, { letter: 'П', key: 'G' }, { letter: 'Р', key: 'H' },
    { letter: 'С', key: 'C' }, { letter: 'Т', key: 'N' }, { letter: 'У', key: 'E' },
    { letter: 'Ф', key: 'A' }, { letter: 'Х', key: '[' }, { letter: 'Ц', key: 'W' },
    { letter: 'Ч', key: 'X' }, { letter: 'Ш', key: 'I' }, { letter: 'Щ', key: 'O' },
    { letter: 'Ъ', key: ']' }, { letter: 'Ы', key: 'S' }, { letter: 'Ь', key: 'M' },
    { letter: 'Э', key: '\'' }, { letter: 'Ю', key: '.' }, { letter: 'Я', key: 'Z' }
  ];
romajiHints = signal<boolean>(false);
finalJapanese = signal<string>('');  // output phrase
japaneseBuffer = signal<string>('');    // final kana phrase
romajiInput = signal<string>('');       // typed romaji (before conversion)
japaneseMode = signal<'hiragana' | 'katakana'>('hiragana');




  // @Input() lang: string = 'Japanese';
  @Output() charSelected = new EventEmitter<string>();

  // Example for Japanese buttons
  sendChar(char: string) {
    this.charSelected.emit(char);
  }

activeTab = 0;


getKanaTabs() {
  if (this.japaneseMode() === 'hiragana') {
    return [
      { label: "あ行", set: [
        { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' },
        { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' }
      ]},
      { label: "か行", set: [
        { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' },
        { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' }
      ]},
      { label: "さ行", set: [
        { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' },
        { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' }
      ]},
      { label: "た行", set: [
        { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' },
        { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' }
      ]},
      { label: "な行", set: [
        { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' },
        { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' }
      ]},
      { label: "は行", set: [
        { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' },
        { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' }
      ]},
      { label: "ま行", set: [
        { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' },
        { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' }
      ]},
      { label: "や行", set: [
        { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' }
      ]},
      { label: "ら行", set: [
        { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' },
        { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' }
      ]},
      { label: "わ行", set: [
        { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' },{char:'っ',romaji:'dc'}
      ]},
      { label: "濁音 (Dakuten)", set: [
        { char: 'が', romaji: 'ga' }, { char: 'ぎ', romaji: 'gi' }, { char: 'ぐ', romaji: 'gu' },
        { char: 'げ', romaji: 'ge' }, { char: 'ご', romaji: 'go' },
        { char: 'ざ', romaji: 'za' }, { char: 'じ', romaji: 'ji' }, { char: 'ず', romaji: 'zu' },
        { char: 'ぜ', romaji: 'ze' }, { char: 'ぞ', romaji: 'zo' },
        { char: 'だ', romaji: 'da' }, { char: 'ぢ', romaji: 'ji' }, { char: 'づ', romaji: 'zu' },
        { char: 'で', romaji: 'de' }, { char: 'ど', romaji: 'do' },
        { char: 'ば', romaji: 'ba' }, { char: 'び', romaji: 'bi' }, { char: 'ぶ', romaji: 'bu' },
        { char: 'べ', romaji: 'be' }, { char: 'ぼ', romaji: 'bo' }
      ]},
      { label: "半濁音 (Handakuten)", set: [
        { char: 'ぱ', romaji: 'pa' }, { char: 'ぴ', romaji: 'pi' }, { char: 'ぷ', romaji: 'pu' },
        { char: 'ぺ', romaji: 'pe' }, { char: 'ぽ', romaji: 'po' }
      ]},
      { label: "拗音 (Yōon)", set: [
        { char: 'きゃ', romaji: 'kya' }, { char: 'きゅ', romaji: 'kyu' }, { char: 'きょ', romaji: 'kyo' },
        { char: 'しゃ', romaji: 'sha' }, { char: 'しゅ', romaji: 'shu' }, { char: 'しょ', romaji: 'sho' },
        { char: 'ちゃ', romaji: 'cha' }, { char: 'ちゅ', romaji: 'chu' }, { char: 'ちょ', romaji: 'cho' },
        { char: 'にゃ', romaji: 'nya' }, { char: 'にゅ', romaji: 'nyu' }, { char: 'にょ', romaji: 'nyo' },
        { char: 'ひゃ', romaji: 'hya' }, { char: 'ひゅ', romaji: 'hyu' }, { char: 'ひょ', romaji: 'hyo' },
        { char: 'みゃ', romaji: 'mya' }, { char: 'みゅ', romaji: 'myu' }, { char: 'みょ', romaji: 'myo' },
        { char: 'りゃ', romaji: 'rya' }, { char: 'りゅ', romaji: 'ryu' }, { char: 'りょ', romaji: 'ryo' },
        { char: 'ぎゃ', romaji: 'gya' }, { char: 'ぎゅ', romaji: 'gyu' }, { char: 'ぎょ', romaji: 'gyo' },
        { char: 'じゃ', romaji: 'ja' }, { char: 'じゅ', romaji: 'ju' }, { char: 'じょ', romaji: 'jo' },
        { char: 'びゃ', romaji: 'bya' }, { char: 'びゅ', romaji: 'byu' }, { char: 'びょ', romaji: 'byo' },
        { char: 'ぴゃ', romaji: 'pya' }, { char: 'ぴゅ', romaji: 'pyu' }, { char: 'ぴょ', romaji: 'pyo' }
      ]}
    ];
  } else {
    return [
  { label: "ア行", set: [
      { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' },
      { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' }
  ]},
  { label: "カ行", set: [
      { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' },
      { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' }
  ]},
  { label: "サ行", set: [
      { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' },
      { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' }
  ]},
  { label: "タ行", set: [
      { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' },
      { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' }
  ]},
  { label: "ナ行", set: [
      { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' },
      { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' }
  ]},
  { label: "ハ行", set: [
      { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' },
      { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' }
  ]},
  { label: "マ行", set: [
      { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' },
      { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' }
  ]},
  { label: "ヤ行", set: [
      { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' }
  ]},
  { label: "ラ行", set: [
      { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' },
      { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' }
  ]},
  { label: "ワ行", set: [
      { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' }
  ]},
  { label: "濁音 (Dakuten)", set: [
      { char: 'ガ', romaji: 'ga' }, { char: 'ギ', romaji: 'gi' }, { char: 'グ', romaji: 'gu' },
      { char: 'ゲ', romaji: 'ge' }, { char: 'ゴ', romaji: 'go' },
      { char: 'ザ', romaji: 'za' }, { char: 'ジ', romaji: 'ji' }, { char: 'ズ', romaji: 'zu' },
      { char: 'ゼ', romaji: 'ze' }, { char: 'ゾ', romaji: 'zo' },
      { char: 'ダ', romaji: 'da' }, { char: 'ヂ', romaji: 'ji' }, { char: 'ヅ', romaji: 'zu' },
      { char: 'デ', romaji: 'de' }, { char: 'ド', romaji: 'do' },
      { char: 'バ', romaji: 'ba' }, { char: 'ビ', romaji: 'bi' }, { char: 'ブ', romaji: 'bu' },
      { char: 'ベ', romaji: 'be' }, { char: 'ボ', romaji: 'bo' }
  ]},
  { label: "半濁音 (Handakuten)", set: [
      { char: 'パ', romaji: 'pa' }, { char: 'ピ', romaji: 'pi' }, { char: 'プ', romaji: 'pu' },
      { char: 'ペ', romaji: 'pe' }, { char: 'ポ', romaji: 'po' }
  ]},
  { label: "小文字 / Others", set: [
      { char: 'ァ', romaji: 'a' }, { char: 'ィ', romaji: 'i' }, { char: 'ゥ', romaji: 'u' },
      { char: 'ェ', romaji: 'e' }, { char: 'ォ', romaji: 'o' },
      { char: 'ッ', romaji: '(double consonant)' },  // small tsu
      { char: 'ャ', romaji: 'ya' }, { char: 'ュ', romaji: 'yu' }, { char: 'ョ', romaji: 'yo' },
      { char: 'ー', romaji: 'long vowel' }
  ]}

 ];
  }
}

constructor(){

}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.langMode.set(this.lang)
  this.sendMessage()
}
addKana(kana: string) {
  const updated = this.japaneseBuffer() + kana;
  this.japaneseBuffer.set(updated);
  this.finalJapanese.set(updated);
  this.sendMessage()
}

switchJPMode() {
  this.japaneseMode.set(this.japaneseMode() === 'hiragana' ? 'katakana' : 'hiragana');
}

deleteJP() {
  const trimmed = this.japaneseBuffer().slice(0, -1);
  this.japaneseBuffer.set(trimmed);
  this.finalJapanese.set(trimmed);
}

clearJP() {
  this.japaneseBuffer.set('');
  this.finalJapanese.set('');
}

  // Store typed content
  russianInput = signal<string>('');    // Russian phrase

  finalPhrase = signal<string>('');     // unified phrase output
  // Signals
jamos = signal<string>('');           // Raw Jamos typed (e.g. ㄱㅏㄴ)
assembledKorean = signal<string>(''); // Assembled result

// Toggle language mode
toggleLang() {
  switch(this.langMode()){
    case'Korean':
      this.langMode.set('Korean');
      break
    case 'Russian':
      this.langMode.set('Russian');

      break
    default:
      this.langMode.set('Japanese');


  }
  this.finalPhrase.set('');
}

// Add a jamo and trigger reassembly
addJamo(char: string) {
  this.jamos.set(this.jamos() + char);
  this.updateHangulAssembly();
}

// Try grouping every 2 or 3 characters and compose Hangul syllables
updateHangulAssembly() {
  const input = this.jamos();
  const groups: string[] = [];

  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    const ju = input[i + 1];
    const jo = input[i + 2];

    const tryCompose3 = this.combineHangul(ch + ju + jo);
    if (tryCompose3.length === 1) {
      groups.push(tryCompose3);
      i += 3;
    } else {
      const tryCompose2 = this.combineHangul(ch + ju);
      if (tryCompose2.length === 1) {
        groups.push(tryCompose2);
        i += 2;
      } else {
        groups.push(ch); // Not valid Choseong + Jungseong
        i += 1;
      }
    }
  }

  const output = groups.join('');
  this.assembledKorean.set(output);
  this.finalPhrase.set(output);


}

  sendMessage() {
    switch(this.langMode()){
    case'Korean':
      this.messageEvent.emit(this.finalPhrase());
      break
    case 'Russian':
      this.messageEvent.emit(this.russianInput());
      break
  
  
    default:
      this.messageEvent.emit(this.finalJapanese());


    }
  }
// Compose a Hangul syllable from Choseong + Jungseong + (optional) Jongseong
combineHangul(s: string): string {
  const choseongList = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
  const jungseongList = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅛㅜㅠㅡㅣ";
  const jongseongList = ['', 'ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ',
                         'ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

  const [ch, ju, jo = ''] = s;
  const ci = choseongList.indexOf(ch);
  const ji = jungseongList.indexOf(ju);
  const joi = jongseongList.indexOf(jo);

  if (ci === -1 || ji === -1) return s;
  const code = 0xAC00 + ((ci * 21 + ji) * 28) + (joi !== -1 ? joi : 0);
  return String.fromCharCode(code);
}

  addRussian(char: string) {
    this.russianInput.set(this.russianInput() + char);
    this.finalPhrase.set(this.russianInput());
  }


  clearAll() {
    this.jamos.set('');
    this.assembledKorean.set('');
    this.russianInput.set('');
    this.finalPhrase.set('');
    this.finalJapanese.set('')
    // this.sendChar(this.assembledKorean())

  }


deleteLast() {
  if (this.langMode() === 'Korean') {
    const current = this.jamos();
    if (current.length > 0) {
      this.jamos.set(current.slice(0, -1));
      this.updateHangulAssembly();
    }
  } else {
    const current = this.russianInput();
    if (current.length > 0) {
      this.russianInput.set(current.slice(0, -1));
      this.finalPhrase.set(this.russianInput());
    }
  }
  // this.sendChar(this.assembledKorean())
}
 romajiToKana(input: string): string {
  let result = '';
  let i = 0;

  while (i < input.length) {
    // Handle small tsu (double consonants)
    if (i + 1 < input.length && input[i] === input[i + 1] && this.isConsonant(input[i])) {
      result += 'っ';
      i++;
      continue;
    }

    // Try longest match (3-letter)
    let found = false;
    for (let len of [3, 2, 1]) {
      const chunk = input.slice(i, i + len).toLowerCase();
      const kana = kanaMap[chunk];
      if (kana) {
        result += kana;
        i += len;
        found = true;
        break;
      }
    }

    if (!found) {
      // Unknown romaji — just append
      result += input[i];
      i++;
    }
  }

  return result;
}

 isConsonant(c: string) {
  return /^[bcdfghjklmnpqrstvwxyz]$/.test(c);
}
convertRomajiInput() {
  const kana = this.romajiToKana(this.romajiInput());
  this.japaneseBuffer.set(kana);
}

}


