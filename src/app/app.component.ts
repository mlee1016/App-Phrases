import { Component, inject, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationUser } from './emitters/emittters';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { statSync } from 'fs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
[x: string]: any;
  title = 'Phrases';
  
  
  reactiveForm : FormGroup

  //languages= [{"id":"Korean"},{"id":"Russian"},{"id":"Italian"},{"id":"Japanese"},{"id":"German"}]
  navBar = ["Home","Profile","About","Feedback"];
  styleWidth:string = '';
  styleleft: string = ''
  status:any = ''
  route: Router = inject(Router)
  toggle = false;
  url_get_user:string ="http://127.0.0.1:8000/api/user/"
  url_sign_out:string ="http://127.0.0.1:8000/api/signout/"
    sidebarItems = [
  { label: 'Home', icon: 'fa fa-home', route: 'home' },
  // { label: 'Profile', icon: 'fa fa-user', route: 'profile' },
  { label: 'About', icon: 'fa fa-heart', route: 'about' },
  { label: 'Feedback', icon: 'fa fa-envelope', route: 'feedback' }
];

  languages = ['Korean', 'Russian', 'Italian', 'Japanese'];


    
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  constructor(private http: HttpClient,public auth_U:AuthenticationUser,private formBuilder:FormBuilder){
    
  }
  toggleButton(){
    this.toggle = !this.toggle
  }


 
    phrases: any = [];


   
    phrase_names = [
        "qA", "asking_directions", "plans_about_future", "dialogues",
        "dialogues2", "dialogues3", "dialogues4", "dialogues5",
        "cafe", "cafe2", "askingDirection"
    ] 
    authLoaded = false;
    isSignedIn = false;



  ngOnInit(): void {
    this.auth_U.initializeAuth()
    this.auth_U.authStatus.subscribe(status => {
    this.status = status;
  });
        this.auth_U.authStatusLoaded.subscribe(loaded => this.authLoaded = loaded);

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    /*let token_ = ""

    let storage = localStorage.getItem('jwt') ?? false

    if(localStorage.length != 0){token_= localStorage.getItem('jwt')}

    this.http.post(this.url_get_user,{'jwt':token_},{withCredentials:true}).subscribe((data:any)=>{   

    
    
      console.log(data)
      this.auth_U.emitNewData('signed in')

      this.reactiveForm = this.formBuilder.group({
        jwt: token_
      })})



      
    this.auth_U.authStatus.subscribe((data:string)=>{
      
      
      this.status=data

      console.log("this is data",data)
      console.log("this is status",this.status)
    })
    

    const userId = 2; // Example: Replace with actual logged-in user ID
    this.getUserPhraseInfo(userId).subscribe({
      next: (res) => {
        this.phrases = res.phrases || [];
        console.log('Loaded phrases:', this.phrases);
      },
      error: (err) => {
        console.error('Failed to load phrases', err);
      }
    });
  



    */
    // this.upload()
  }
 getopenNav() {
  
    return this.toggle ? 'sideClass': '';
  }
  navToSite(par:any){
    this.route.navigate(['/language',this.languages[par]])

  }
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
/*closeNav() {
    ("mySidenav").style.width = "0";
    ("main").style.marginLeft = "0";
  }*/

    
    handleEvent(data: any) {
      console.log('Received data from child:', data);
    }
  
  seePhrases = false
  open(){
    this.seePhrases = !this.seePhrases
    this.slanguages= false
  }
  slanguages = false
  seeLanguages(){
    this.slanguages = !this.slanguages
  }
  side = false
openSidebar() {
  this.seePhrases = true;
}

closeSidebar() {
  this.seePhrases = false;
}

  signOut(){
    this.http.post(this.url_sign_out,this.reactiveForm.getRawValue()).subscribe({
      next:(res:any)=>{
        localStorage.setItem("jwt","")

        alert("you just signed out of your user profile")
        
        this.auth_U.emitNewData("signed out")
        
  this.auth_U.authStatus.subscribe(status => {
    this.status = status;
    console.log('Status updated:', this.status);
  });
      },
      error:(error:any)=>{
        //Emitters.authEmitters.emit(true)
        
        
        
        alert("you are signed in still")
      }
    });
  }

  //  sendPhraseNamesToBackend(phraseList: string[]) {
  //   return this.http.post('http://localhost:8000/api/upload-phrases/', {
  //     phrases: phraseList,
  //     user_id: 2  // hardcoded for now
  //   }); 
  // // }


  // upload() {
  //   this.sendPhraseNamesToBackend(this.phrase_names).subscribe(res => {
  //     console.log('Upload complete', res);
  //   });
  // }

  
  getUserPhraseInfo(userId: number) {
    return this.http.get<{ phrases: any }>(
      `http://localhost:8000/api/get-user-phraseinfo?user_id=${userId}`
    );
  }
} 