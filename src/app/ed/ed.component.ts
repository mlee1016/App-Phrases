import { Component } from '@angular/core';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import {EventEmitter, inject, Output, output, signal } from '@angular/core';
import { AuthenticationUser, LanguageDone, Phrase } from '../emitters/emittters';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PhraseListItem } from '../shared/phrase-list.service';
import { Router } from '@angular/router';
import { PhrasenameService } from '../shared/phrasename.service';
import { trigger, transition, style, animate } from '@angular/animations';

  



@Component({
  selector: 'app-ed',
  templateUrl: './ed.component.html',
  styleUrl: './ed.component.css',
  
    animations: [
      trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms ease-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('500ms ease-in', style({ opacity: 0 }))
        ])
      ])
    ]
  
})
export class EdComponent {



  
    
    //@Output() a = new EventEmitter<boolean>()
    
    user = signal<any>({})
    recentPhrases = [{s:'this',content:"description"}]
    site = "Site"
    languages = ['Japanese','Korean','Italian','Russian']
    
    //check = 'signed in'
    check = signal<string>('')
    reactiveForm : FormGroup
    testing = "&lta&gttesting&lt/a&gt"
  
    
    koreanStory = this.phraseService.allListStory
    koreanGrammar = this.phraseService.allListgrammer
    russianStory = this.phraseService.allListRussianStory
    russianGrammar = this.phraseService.allListRussiangrammer
  
    language: LanguageDone[] = [];
    selectedLanguage: LanguageDone;
    phrasesLearned = 0;
    storiesCompleted = 0;
    url_get_user:string ="http://127.0.0.1:8000/api/user/"
    url_sign_out:string ="http://127.0.0.1:8000/api/signout/"
    myPhraseList: PhraseListItem[];
    authLoaded:any
    constructor(private http:HttpClient,public userAuth:AuthenticationUser,private formBuilder:FormBuilder,
      
      private phraseService:PhrasenameService){
  
    }
    private intervalId: any;
    ngOnInit(): void { 
      // Or specify your 
      
      /*let token_ = " "
      
      let storage = localStorage.getItem('jwt') ?? false
      if(storage){token_= localStorage.getItem('jwt')}
  
      this.http.post(this.url_get_user,{'jwt':token_},{withCredentials:true}).subscribe((data:any)=>{   
        //alert('Hello: '+ data.name)
        //this.check = "signed in"
        this.chech2.set('signed in')
        
        console.log(data)
        this.userAuth.emitNewData('signed in')
        this.reactiveForm = this.formBuilder.group({
          jwt: token_
        })
      })
  */
      //this.token_ = localStorage.getItem('jwt')
      
  
      
  
  
      this.userAuth.initializeAuth()
      this.user.update(s=>s=this.userAuth.username)
  
      this.userAuth.authStatus.subscribe((id:string)=>{
        this.check.update(a=>a= id)
        // console.log("this is id",id)
           // this.user.set(this.userAuth.username)
  
     })
     
        
      this.userAuth.authStatusLoaded.subscribe(loaded => this.authLoaded = loaded);
      
      // console.log("authentication loaded",this.authLoaded)
      // this.auth_U.authStatus.subscribe(status => this.isSignedIn = (status === 'signed in'));
  
    /*this.userAuth.getCompletedPhrases().subscribe((data) => {
      this.recentPhrases = data.slice(-6).reverse(); // last 6 phrases
      this.phrasesLearned = data.length;
      this.storiesCompleted = data.filter(p => p.category === 'story').length;
    });*/
    
    
     
    
  
    if (this.check()==='signed in'){
      this.userAuth.getDonePhrases().subscribe((data) => {
        // Only show languages that have at least one done phrase
        console.log(data)
        this.language = data.filter(
          (lang) => lang.grammar.length > 0 || lang.story.length > 0
        );
        // Optional: auto-select the first language
        if (this.language.length) this.selectedLanguage = this.language[0];
      });}
      
    }
    
  
    clickSee(){
      
      this.currentLang = this.languages[this.index];
      this.intervalId = setInterval(() => {
        this.index = (this.index + 1) % this.languages.length;
        this.currentLang = this.languages[this.index];
      }, 2500);
    }
    ngOnDestroy() {
      // prevent memory leaks
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
    currentLang = '';
    private index = 0;
  
  
    changeLang() {
      this.currentLang = this.languages[this.index];
      setTimeout(() => {
        this.currentLang = '';
        this.index = (this.index + 1) % this.languages.length;
        setTimeout(() => this.changeLang(), 500); // wait for fade-out before next
      }, 2000); // time to display each word
    }
  
  
    getDonePhrasesByType(type: 'grammar' | 'story'): Phrase[] {
      if (!this.selectedLanguage) return [];
      return type === 'grammar'
        ? this.selectedLanguage.grammar
        : this.selectedLanguage.story;
    
  }
  
    signOut(){
      
      this.http.post(this.url_sign_out,this.reactiveForm.getRawValue()).subscribe({
        next:(res:any)=>{
          localStorage.setItem("jwt","")
          this.userAuth.emitNewData('signed out')
          alert("you just signed out selected")
  
        },
        error:(error:any)=>{
          alert("you are signed in still")
        } 
      });
    }
  
    seePhrases:boolean = false
    open(){
      this.seePhrases = !this.seePhrases
    }
    slanguages = false
    seeLanguages(){
      this.slanguages = !this.slanguages 
    
    }
    route: Router = inject(Router)
    
     navToSite(par:any){
      this.route.navigate(['/language',this.languages[par]])
  
    }
    total =signal<number>(0)
    totalCount(lang:string){
      console.log("this is suppose to :",lang)
      switch(lang){
        case  'Korean':
  
          this.total.set(this.phraseService.allListStory.length)
          break;
        default:
          this.total.set(this.phraseService.allListItalianStory.length)
      }
    }
  
}
