import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.css'
})
export class KanjiComponent {


  
    allSites = [
  
      
      {"s":"Study Kanji","des":"Look over all the list"},
      {"s":"Practice 1","des":"choice"},
  
      {"s":"Practice 2","des":"Kanji words"}]
    constructor(private route: Router){

    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      
    }
    navAll(s:string){
  
      if(s === 'Study Kanji'){
      
      this.route.navigate(['kanji/Japanese/kanji-words'])
      
    
      }
      
      if(s === 'Practice 1'){
        this.route.navigate(['kanji/Japanese/studykanji-1'])
      
        }
        
      if(s === 'Practice 2'){
        this.route.navigate(['kanji/Japanese/studykanji-2'])
      
        }
      this.ngOnInit()


    }
          
      
            
                
  
    
}
