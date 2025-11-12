import { Component, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-typeofphrase',
  templateUrl: './typeofphrase.component.html',
  styleUrl: './typeofphrase.component.css',
})
export class TypeofphraseComponent {


  id
  constructor(private activateRoute:ActivatedRoute) {
    this.id = ""
   }
  ngOnInit(): void { 
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
          this.activateRoute.paramMap.subscribe((params:ParamMap)=>
          {
      
            
            let tempId:string|null = params.get('id')
            this.id = tempId
          })
  }
    route:Router = inject(Router)
  
  naVAll(m1:string){
    if (m1 === 'popular'){
      this.route.navigate(['language',this.id,'popular'])
    }
    else if (m1 === 'course'){

      this.route.navigate(['language',this.id,'course'])
                                                                     
    }
    
    else if (m1 === 'story'){
      this.route.navigate(['language',this.id,'story'])
    }
    else{
      this.route.navigate(['lists',this.id])
    }
  }
}