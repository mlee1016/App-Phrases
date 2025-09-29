import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, viewChild,NgZone } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthenticationUser } from '../emitters/emittters';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {


  url_sign_up:string ="http://127.0.0.1:8000/api/signup/"
  user_id = ''
  pass_word = ''


  allUsers = []

  @ViewChild('registerForm') form :NgForm

  reactiveForm:FormGroup
  formData:any = {}

  
  constructor(private http:HttpClient,private formbuilder:FormBuilder,private router:Router,
    
    private aService:AuthenticationUser, private ngZone: NgZone){

  }
  ngOnInit(): void {
    //this.getAllUsers()
    
    // Google sign-in button
    /*(window as any).google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    (window as any).google.accounts.id.renderButton(
      document.getElementById('google-btn'),
      { theme: 'outline', size: 'large' }
    );*/
    

    this.reactiveForm = this.formbuilder.group({
      name: '',
      email: '',
      password: ''
    })
  
  }
  handleCredentialResponse(response: any) {
    // Send token to backend
    this.http.post('/api/auth/google/', { token: response.credential })
      .subscribe(res => {
        console.log('Logged in', res);
      });
  }


  username = '';
  email = '';
  password = '';
  message = '';

  onSignUp() {
    this.aService.signUp({ username: this.username, email: this.email, password: this.password })
      .subscribe({
        next: () => this.message = 'Check your email for verification link!',
        error: (err) => this.message = 'Sign-up failed: ' + err.error
      });
  }


    /*this.reactiveForm = new FormGroup({
      
      firstName: new FormControl("",Validators.required),
      lastName : new FormControl("",Validators.required),
      userName : new FormControl("",Validators.required),
      password : new FormControl("",Validators.required),
      email : new FormControl("",[Validators.required,Validators.email]),
      skill: new FormArray([new FormControl("",Validators.required)]),
    })
    //this.reactiveForm.get('password').valueChanges.subscribe((name)=>{
      //console.log(name)
    //})

    
    this.reactiveForm.valueChanges.subscribe((data)=>{
      console.log(data)
    })


    
    this.reactiveForm.get('password').statusChanges.subscribe((pa)=>{
      console.log(pa)
    })

    
    this.reactiveForm.statusChanges.subscribe((sta)=>{
      console.log(sta)
    })
    this.reactiveForm.setValue({
      firstName: this.reactiveForm.get('firstName').value,
      lastName: "",
      userName:"",
      password: "",
      email:  this.reactiveForm.get('email').value,
      skill: [""]
    })


    //this.reactiveForm.get('email').setValue(email)

    
    //this.reactiveForm.patchValue({
      //email: "someEMAIL@gmail.com"
    //})

  }*/

  /*
  onFormSubmit(){
    //this.form.value
    this.formData= this.reactiveForm.value
    //this.form.reset()
  }
  addSkill(){
    (<FormArray>this.reactiveForm.get('skill')).push(new FormControl("a"))
  }
  rSkill(i:number){
    const skill = (<FormArray>this.reactiveForm.get('skill'))
    skill.removeAt(i)
  }*/

  // saveData(){
  //   console.log(this.reactiveForm.getRawValue())
  //   this.http.post(this.url_sign_up,this.reactiveForm.getRawValue()).subscribe((save_user:any) => {

  //       this.router.navigate(['home'])
  //     });
  // }

  // signup.component.ts
  apiBase = 'http://127.0.0.1:8000/api/'; // Django backend


  // message: string | null = null;
  error: string | null = null;


  saveData() {
    if (this.reactiveForm.invalid) return;

    const formData = this.reactiveForm.value;

    this.http.post(`${this.apiBase}signup/`, formData).subscribe({
      next: (res: any) => {
        this.message = '✅ Account created! Check your email to verify.';
        this.error = null;
        this.reactiveForm.reset();
      },
      error: (err) => {
        this.error = err.error?.message || '❌ Signup failed. Try again.';
        this.message = null;
      },
    });
  }



}
  /*
saveData(){

  
  let id_data = {
    'username':this.username,
    'email':this.email,
    'password1': this.password1,
    'password2': this.password2,
  }
  console.log("this is: " +  id_data.username+id_data.email)
  this.http.post(this.url_,id_data).subscribe((save_user:any) => {
    
  })
  
  this.username = ""
  this.email = ""
  this.password1 = ""
  this.password2 = ""

  this.getAllUsers()
}


deleteUser(user:any){

  let temp_user = {
    'username': user.username,
    'email': user.email,
    'password1': user.password1,
    'password2': user.password2,
  }
  console.log(user)
  this.http.delete(this.url_,user).subscribe((delete_user:any) => {
    
    alert(delete_user.status)
    this.allUsers = delete_user
  })
}
getAllUsers(){
  this.http.get(this.url_).subscribe((all_users:any) => {
    this.allUsers = all_users
  })

  
}
updateUser(){
  
  this.http.put(this.url_,{'username':this.username,'email':this.email,'password1':this.password1,'password2':this.password2}).subscribe((update_user:any) => {
    console.log(update_user)
    alert(update_user.status)
  })
  
  this.username = ""
  this.email = ""
  this.password1 = ""
  this.password2 = ""

}
edit(user:any){
  this.username = user.username
  this.email = user.email
  this.password1 = user.password1
  this.password2 = user.password2
}


signIn(username1,password1){
  let sign_in = {
    'username': username1,
    'password': password1
  }
  
  console.log("this is: " +  sign_in)
  this.http.post(this.url_2,sign_in).subscribe((save_user:any) => {
    console.log(save_user.username)
    alert('success')
  })
}*/




  


