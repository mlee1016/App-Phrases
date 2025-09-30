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
  
      
      {"s":"All List","des":"Look over all the list"}, 
      // {"s":"Study Cards","des":"Allows to individual phrases and words"},
      {"s":"Fill in the blank","des":"given a phrase with a missing section place the correct word in to the spot"},

      {"s":"Multi","des":"Study with multiple choice questions"},
  
      {"s":"Type","des":"Study by typing in your answers"},
  
      {"s":"Chat","des":"Allows you to chat with a bot with predetermined conversations"},
  
      {"s":"Card","des":"allows you to study cards"},
      {"s":"Study kanji","des":"Study some from kanji from n5 - n1"},
      {"s":"Speech pronuciation","des":"Practice speaking and pronunciation"},

    ]
  
    route:Router = inject(Router)
    authentication = inject(AuthenticationUser) 
    id: string|null = ""
    activateRoute:ActivatedRoute= inject(ActivatedRoute)
    status = ""
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      //let theSelectedLanguage = this.activateRoute.snapshot.paramMap.get('id')
      //this.current = theSelectedLanguage;
  
  
  
      this.activateRoute.paramMap.subscribe((params:ParamMap)=>
      {
  
        
        let tempId:string|null = params.get('id')
        this.id = tempId
      })
  
        
      this.authentication.authStatus.subscribe((d:any) =>{
        this.status = d
      })
    }
    navAll(s:string){
  
      if(s === 'All List'){
      
      this.route.navigate(['lists',this.id])
      
    
      }
      
      if(s === 'Study Cards'){
        this.route.navigate(['study',this.id])
      
        }
        
      if(s === 'Chat'){
        this.route.navigate(['chat',this.id])
      
        }
        
        if(s === 'Multi'){
          this.route.navigate(['choice',this.id])
        
          }
          
      if(s === 'Type'){
        this.route.navigate(['type',this.id])
      
        }
  
        
        if(s === 'Study kanji'&& this.id=='Japanese'){
          this.route.navigate(['kanji','Japanese'])
        
          }
  
      
          if(s==='Card'){
            this.route.navigate(['cards',this.id])
          }
          if(s === 'Fill in the blank'){
            this.route.navigate(['fillintheblank',this.id])
          
            }
            if(s === 'Speech pronuciation'){
              this.route.navigate(['speech',this.id])
            }
                
  
          this.ngOnInit()
    }
    
    shutD = true
    shut(){
      this.shutD= !this.shutD
    }
  
    get filteredSites() {
    return this.allSites.filter(item =>
      !(item.s === 'Study kanji' && this.id !== 'Japanese')
    );
  }
  

}
