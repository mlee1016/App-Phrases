import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,NgForm,PatternValidator,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationUser } from '../emitters/emittters';
import { CookieService } from '../interceptors/cookie.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  reactiveForm : FormGroup

  username = ""
  password =""
  errorMessage = '';
  //auth_User = new AuthenticationUser()
  signin = "You are not sign in"
  url_sign_in:string ="http://127.0.0.1:8000/api/signin/"

  constructor(private http:HttpClient,private auth_User: AuthenticationUser ,private formBuilder:FormBuilder,private router:Router,private cookie:CookieService){

  }
  the_data = {'cookie':""}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.reactiveForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    //this.reactiveForm = this.formBuilder.group({
      //email: "",
      //password: ""
    //})
    this.auth_User.authStatus.subscribe((data:string)=>{
      this.signin = data
    })
  }
  signIn2(){
    this.auth_User.signIn(this.reactiveForm.value)
  }
/*signIn(formData: any) {
  this.http.post(this.url_sign_in, formData, { withCredentials: true }).subscribe({
    next: (data: any) => {
      // Store token in service variable and localStorage
      this.token_ = data.jwt;
      localStorage.setItem('jwt', this.token_);

      // Update authentication status
      this.emitNewData('signed in');

      // Optional: store user info if returned
      this.username = data.name || '';
      this.email = data.email || '';
      this.id = data.id || '';
      
      // Navigate after login
      this.router.navigate(['']);
    },
    error: (err) => {
      console.error('Sign-in failed', err);
      this.emitNewData('signed out');
    }
  });
}*/
/*
signIn() {
  if (this.reactiveForm.valid) {
    this.http.post<{ jwt: string }>(this.url_sign_in, this.reactiveForm.value)
      .subscribe({
        next: (data) => {
          localStorage.setItem('jwt', data.jwt);
          this.auth_User.initializeAuth();
          this.router.navigate(['']);
        },
        error: (err) => console.error('Login failed', err)
      });
  }
}

  /*signIn(){
    // deletes later on
    console.log(this.reactiveForm.getRawValue())
    
    if (this.reactiveForm.valid) {
      // Your sign-in logic here
      this.http.post(this.url_sign_in,this.reactiveForm.getRawValue(),{withCredentials:true}).subscribe(

      (data:any)=>{
        //console.log(data)
        localStorage.setItem('jwt',data.jwt)
        this.auth_User.initializeAuth();
        this.router.navigate([''])
        //this.auth_User.username = data.jwt.name

      })
      console.log('Form Submitted', this.reactiveForm.value);
    } else {
      // Mark all fields as touched to trigger validation messages
      this.reactiveForm.markAllAsTouched();
    }*/
  /*
    this.http.post(this.url_sign_in,this.reactiveForm.getRawValue(),{withCredentials:true}).subscribe(

      (data:any)=>{
        console.log(data)
        localStorage.setItem('jwt',data.jwt)
        this.router.navigate(['home'])
        this.auth_User.initializeAuth();

      })*/
  }
      /*login() {
        this.cookie.login(this.username, this.password).subscribe((response:any) => {
          this.cookie.saveToken(response.access);
          this.router.navigate(['/protected']);///////////////////////////s
        }, error => {
          this.errorMessage = 'Invalid credentials';
        });*/
