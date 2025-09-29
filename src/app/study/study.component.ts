import { Component, ContentChild, ElementRef, inject, Input,OnInit, ViewChild } from '@angular/core';
// import { KoreanPhrases } from '../shared/models/KoreanPhrases';
import { AllphrasesService } from '../allphrases.service';
import { Subject,Observable, Subscription } from 'rxjs';
// import { GermanPhrases } from '../shared/models/GermanPhrases';
// import { JapanesePhrases} from '../shared/models/JapanesePhrases'
import { ActivatedRoute, ParamMap } from '@angular/router';
// import { ItalianPhrases } from '../shared/models/ItalianPhrases';
// import { RussianPhrases } from '../shared/models/RussianPhrases';
//import { HttpClient } from '@angular/common/http';
import { AuthenticationUser } from '../emitters/emittters';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrl: './study.component.css'
})
export class StudyComponent implements OnInit {
  jpPhrases:any[] = []
  phrases:any[] = []
  russianPhrases:any[] = []
  itaPhrases:any[] = []
  gerPhrases:any[] = []


  input:string = '一'
  //input2:string = ""
  toggle:boolean = false
  count:number = 0;
  /*phrasesList:string[] = ['qA', 'presentTense','dialogues','dialogues2','dialogues3','dialogues4','dialogues5'];
  phrasesListRussian:string[] = ['usefulRussian', 'conversation',"conversationQA2","conversationQA2-1"];
  phrasesListItalian:string[] = ['phrases', 'introduction',"q/a","q/a2"];

  
  phrasesListGerman:string[] = ['usefulGerman', 'conversation','askingDirections',"germanQuestionsForLearners","germanQuestionsForLearners5"];
  phrasesListJapanese:string[] = ['asking_directions','part1','part2','part3','part4','part5','part6',"一","二","三","四","五","n5","n4"]*/
  
  
  
  allListgrammer = [{"s":"tense"},{"s":"presentTense"},{"s":"Particles"},{"s":"Conjunctions"},{"s":"Structure"},{"s":"part2"},{"s":"part3"},{"s":"part4"},{"s":"part5"},{"s":"Honorifics"},{"s":"Koreanpart"}]
  allListStory:string[] = ["qA","asking_directions","plans_about_future","dialogues","dialogues2","dialogues3","dialogues4","dialogues5",]
   
 
  allListRussiangrammer:string[] = ["usefulRussian"]
  allListRussianStory:string[] = ["conversation","conversationQA","conversationQA2-1","conversationQA2","conversationQA3","Asking Directions","Eating"]

  allListItaliangrammer:string[] = ["phrases","introduction","q/a","q/a2","q/a3"]
  allListItalianStory:string[] = ["introduction","q/a","q/a2","q/a3"]

  allListGermangrammer:string[] = ["usefulGerman"]
  allListGermanStory:string[] = ["conversation","askingDirections","germanQuestionsForLearners","germanQuestionsForLearners2","germanQuestionsForLearners3","germanQuestionsForLearners4","germanQuestionsForLearners5"]

  allListJapanesegrammer:string[] = ["n5","n4","part1","part2","part3","part4","part5","part6","part7","part8"]
  allListJapaneseStory:string[] = ["asking_directions","JapaneseStory"]
  activateRoute:ActivatedRoute= inject(ActivatedRoute)
  
  //kanji:string[] = ["一","二","三","四","五"]
  //selectedKanji:string = ""
  recognition: any;
  t:string = ""
  ro:boolean = false
  //Send info from parent to child
  @Input() fromApp: string = '';
  //@ViewChild('t') tep:ElementRef;
  //@ContentChild('s') p:ElementRef;
  id: string|null = ""


  constructor(private phrasesService: AllphrasesService,private authUser:AuthenticationUser){//,private http:HttpClient){
    
    
  }
  ngOnInit(): void {

    

    this.authUser.authStatus.subscribe((data:string)=>{
      console.log(data)
    })
    this.activateRoute.paramMap.subscribe((params:ParamMap)=>
    {

      
      let tempId:string|null = params.get('id')
      this.id = tempId
    })
    if(this.id == "Korean"){
    this.phrasesService.getPhrases().subscribe({
    
      next:(data:any) => {if(this.input!= ''){this.phrases= data[this.input]}},
      error:(error:any) => {alert(error.message)}
    });debugger

    
  }else if (this.id=="Russian"){
    this.phrasesService.getRussianPhrases().subscribe({
    
      next:(data:any) => {if(this.input!= ''){this.russianPhrases= data[this.input]}},
      error:(error:any) => {alert(error.message)}
    });debugger}
    
  
  else if (this.id == "Italian"){
    this.phrasesService.getItalianPhrases().subscribe({
    
      next:(data:any) => {if(this.input!= ''){this.itaPhrases= data[this.input]}},
      error:(error:any) => {alert(error.message)}
    });debugger}


  else if (this.id == "Japanese"){
    this.phrasesService.getJapanesePhrases().subscribe({
    
      next:(data:any) => {if(this.input!= ''){this.jpPhrases= data[this.input]}},
      error:(error:any) => {alert(error.message)}
    });debugger}



    
  else{
    this.phrasesService.getGermanPhrases().subscribe({
    
      next:(data:any) => {if(this.input!= ''){this.gerPhrases= data[this.input]}},
      error:(error:any) => {alert(error.message)}
    });debugger}



    //this.getStuff()




////////////////////////////////////////////////////
    /*if("webkitSpeechRecognition" in window){
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      this.t = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        this.t += event.results[i][0].transcript;
      }
    };}
    else{
      this.t = "there was an interruption"
    }*/
    /////////////////////////////////////////////
  }
  
 //name:any;

  //APIURL = 'http://127.0.0.1:5000/';





  //getStuff(){
  //this.http.get(this.APIURL+"api/data").subscribe((res)=>{
      
    //this.name = res
  //})
  //}
  incrementCount(){
    switch(this.id){

      case "Japanese":
            
        if(this.count < (this.jpPhrases.length-1)){
          this.count+=1

        }else if(this.count >= (this.jpPhrases.length-1) ){
          this.count=0
        }
        break;

      case "German":
        
        if(this.count < (this.gerPhrases.length-1)){
          this.count+=1

        }else if(this.count >= (this.gerPhrases.length-1) ){
          this.count=0
        }
        break;

      case "Italian":
          
        if(this.count < (this.itaPhrases.length-1)){
          this.count+=1

        }else if(this.count >= (this.itaPhrases.length-1) ){
          this.count=0
        }
        break;

      case "Korean":
          
        if(this.count < (this.phrases.length-1)){
          this.count+=1

        }else if(this.count >= (this.phrases.length-1) ){
          this.count=0
        }
        break;

      case "Russian":
          
        if(this.count < (this.russianPhrases.length-1)){
          this.count+=1

        }else if(this.count >= (this.russianPhrases.length-1) ){
          this.count=0
        }
        break;
    }


  }

  start(){
    this.toggle = !this.toggle
  }



  decrementCount(){

    
    switch(this.id){

      case "Japanese":
            
        if(this.count > 0&&this.count <= (this.jpPhrases.length-1)){
          this.count-=1

        }else if(this.count <= 0){
          this.count=this.jpPhrases.length-1
        }
        break;

      case "German":
        
        if(this.count > 0&&this.count <= (this.gerPhrases.length-1)){
          this.count-=1

        }else if(this.count <= 0){
          this.count=this.gerPhrases.length-1
        }
        break;

      case "Italian":
          
        if(this.count > 0&&this.count <= (this.itaPhrases.length-1)){
          this.count-=1

        }else if(this.count <= 0){
          this.count=this.itaPhrases.length-1
        }
        break;

      case "Korean":
          
        if(this.count> 0 &&this.count <= (this.phrases.length-1)){
          this.count-=1

        }else if(this.count <= 0){
          this.count=this.phrases.length-1

        }
        break;

      case "Russian":
          
        if( this.count > 0 &&this.count <= (this.russianPhrases.length-1)){
          this.count-=1

        }else if(this.count <= 0 ){
          this.count=this.russianPhrases.length-1
        }
        break;
    }
  }

  selectPhrase(e:string){
    if(this.id == 'Japanese'){
      this.input = e
    }else if(this.id == "Russian"){
    this.input = e}
    
    else if(this.id == 'Italian'){
      this.input = e
    }else if(this.id == "German"){
    this.input = e}

    else if(this.id =='Korean'){
      this.input = e
    }

    this.ngOnInit()
  }
  showList = false
  giveList(){
    this.showList = !this.showList
  }

  showRo(){
    this.ro = !this.ro
  }


  
  
  speak() {
    let text = "저는 한국어를 공부해요.";
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "ko-KR";
    window.speechSynthesis.speak(speech);
}

  
/*
  startRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
    }
  */
  highlightWords(text: string): string {
    const keyword = 'important';
    const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
    return text.replace(regex, `<span class="bg-yellow-300 font-bold">$1</span>`);
  }

  
  openSection = {
    course: true,
    story: true
  };

  selectedItem: string | null = null;

  toggleSection(section: 'course' | 'story') {
    this.openSection[section] = !this.openSection[section];
  }

  selectItem(item: string) {
    this.selectedItem = item;
  }

  toggleAllSections() {
  const shouldExpand = !this.areAllExpanded();
  this.openSection.course = shouldExpand;
  this.openSection.story = shouldExpand;
}

areAllExpanded(): boolean {
  return this.openSection.course && this.openSection.story;
}
  isSidebarOpen = true;


  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}