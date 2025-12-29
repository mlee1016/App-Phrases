import { Component,inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthenticationUser } from '../emitters/emittters';
@Component({
  selector: 'app-alloptions',
  templateUrl: './alloptions.component.html',
  styleUrl: './alloptions.component.css'
})
export class AlloptionsComponent { 

  
  
    allSites = [
  
       
      // {"s":"All List","des":"Look over all the list of phrase","m":'story + popular + course'}, 
      {"s":"Fill in the blank","des":"given a phrase with a missing section place the correct grammar word in to the phrase","m":'course'}, 

      {"s":"Study Cards","des":"Allows to individually study phrases and words to understand meaning also","m":'story + popular + course'}, 

      {"s":"Multi","des":"Study with selection choice questions","m":'story + popular + course'}, 
  
      {"s":"Type","des":"Study by typing in your answers, each card disappear when you are right","m":'story + popular + course'}, 
  
      {"s":"Card","des":"allows you to study cards, each cards disapears from deck when you are right","m":'story + popular + course'}, 
      {"s":"Study kanji","des":"Study some kanji from n5 - n1 in multiple section"},
      {"s":"Speech pronuciation","des":"Practice speaking and pronunciation,allows to you to see how accurate you are","m":'story + popular + course'}, 
      {"s":"Chat","des":"Allows you to chat with a bot with predetermined conversations, either you lead or the bot leads you decide","m":'story'}, 


    ]
    route:Router = inject(Router)
    authentication = inject(AuthenticationUser) 
    id: string|null = ""
    m : string|null = ""
    activateRoute:ActivatedRoute= inject(ActivatedRoute)
    status = ""
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      //let theSelectedLanguage = this.activateRoute.snapshot.paramMap.get('id')
      //this.current = theSelectedLanguage;
  
  
  
      /*this.activateRoute.paramMap.subscribe((params:ParamMap)=>
      {
  
        
        let tempId:string|null = params.get('id')
        this.id = tempId
      })*/
    this.activateRoute.paramMap.subscribe((params:ParamMap) => {
      let tempId:string|null = params.get('id');
      let ms:string|null = params.get('m');
      this.id = tempId;
      this.m = ms;
    });
        
      this.authentication.authStatus.subscribe((d:any) =>{
        this.status = d
      })
    }
    navAll(s:string){
  
      if(s === 'All List'){
      
      this.route.navigate(['lists',this.id,this.m])
      
    
      }
      
      if(s === 'Study Cards'){
        this.route.navigate(['study',this.id,this.m])
      
        }
        
      if(s === 'Chat' && this.m==='story'){
        this.route.navigate(['chat',this.id,this.m])
      
        }
        
        if(s === 'Multi'){
          this.route.navigate(['choice',this.id,this.m])
        
          }
          
      if(s === 'Type'){
        this.route.navigate(['type',this.id,this.m])
      
        }
  
        
        if(s === 'Study kanji'&& this.id=='Japanese'){
          this.route.navigate(['kanji','Japanese',this.m])
        
          }
  
      
          if(s==='Card'){
            this.route.navigate(['cards',this.id,this.m])
          }
          if(s === 'Fill in the blank' && this.m==='course'){
            this.route.navigate(['fillintheblank',this.id,this.m])
          
            }
            if(s === 'Speech pronuciation'){
              this.route.navigate(['speech',this.id,this.m])
            }
                
  
          this.ngOnInit()
    }
    
    shutD = true
    shut(){
      this.shutD= !this.shutD
    }
  

    get filteredSites() {
  return this.allSites.filter(item => {
    // Exclude "Study kanji" if not Japanese
    if (item.s === 'Study kanji' && this.id !== 'Japanese') return false;

    // Exclude "Study Cards" if Italian
    if (item.s === 'Study Cards' && this.id === 'Italian') return false;

    // Otherwise include if it matches the category
    return item.m?.includes(this.m);
  });
} 
expandedIndex: number | null = null;

toggleExpand(index: number) {
  this.expandedIndex = this.expandedIndex === index ? null : index;
}

} 