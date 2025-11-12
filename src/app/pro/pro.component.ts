import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, signal } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationUser } from '../emitters/emittters';
import { PhrasenameService } from '../shared/phrasename.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-pro',
  templateUrl: './pro.component.html',
  styleUrl: './pro.component.css' 
})
export class ProComponent {
  // user = signal<any>('')

  sub = ["Free sub","Monthly Sub","1 year Sub"]
  language: string[] = ["Japanese","Russian","Italian","Korean","German"]
  pwd:string = ""

  switch1:boolean = false
  // url_get_user:string ="http://127.0.0.1:8000/api/user/"
  email = ""
  id = ""
  switch2:boolean = false
  status2 = signal<string>('')
  subscription = "1 year"
  constructor(private http:HttpClient,public auth_user:AuthenticationUser,private phraseNames:PhrasenameService){

  }
  authLoaded:any
  
  surveyModalOpen = false;

openSurveyModal() {
  this.surveyModalOpen = true;
}

  user = signal<any>('');
  surveyData = signal<any>(null);  // store fetched survey
  surveyExists = signal<boolean>(false); // new: track if survey exists
  router: any;

  // ...other existing properties

  ngOnInit(): void {
    this.auth_user.initializeAuth();
    this.auth_user.authStatus.subscribe(s =>
      this.status2.update(a => a = s)
    );
    this.auth_user.authStatusLoaded.subscribe(loaded => this.authLoaded = loaded);

    this.userStuff();
    this.getSurvey(); // fetch survey on component load
  }

  

  url_get_user:string = "http://127.0.0.1:8000/api/user/";
  url_get_survey:string = "http://127.0.0.1:8000/api/survey/me/"; // adjust to your endpoint

  // ---- GET Survey ----
  getSurvey() {
    this.http.get(this.url_get_survey, { withCredentials: true })
      .subscribe({
        next: (data: any) => {
          if (data) {
            console.log('Survey data fetched', data);
            this.surveyData.update(() => data);
            this.surveyExists.update(() => true);
          } else {
            this.surveyExists.update(() => false);
          }
        },
        error: (error: any) => {
          console.error('Error fetching survey', error);
          this.surveyExists.update(() => false);
        }
      });
  }

  goToCreateSurvey() {
    // Navigate to survey creation component/page
    this.router.navigate(['/create-survey']);
  }

  userStuff(){

     this.user.update(name => name=this.auth_user.username)
     this.email = this.auth_user.email
  
     
     this.id = this.auth_user.id 
  }
  // ...keep all other methods (move, switchPwd, switchUsr)
}


