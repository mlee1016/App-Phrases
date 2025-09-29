import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationUser } from '../emitters/emittters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.css'
})
export class ActivationComponent {


  // verify-email.component.ts
  activate = signal<string>('');

  constructor(private route: ActivatedRoute, private authService: AuthenticationUser,private http:HttpClient) {}


  /*ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid')!;
    const token = this.route.snapshot.paramMap.get('token')!;

    this.authService.verifyEmail(uid, token).subscribe({
      next: (res: any) => this.message = res.success,
      error: (err) => this.message = err.error.error
    });
  }
 success 
 loading 
 ngOnInit(): void {
  this.loading = true;
  const uid = this.route.snapshot.paramMap.get('uidb64');
  const token = this.route.snapshot.paramMap.get('token');

  this.http.get(`http://127.0.0.1:8000/api/verify-email/${uid}/${token}/`).subscribe({
    next: (res) => {
      this.success = true;
      this.loading = false;
    },
    error: () => {
      this.success = false;
      this.loading = false;
    }
  });
}
  */

  // message: string = '';
  loading = true;
  uidT:string

  tokenT:string


  ngOnInit(): void {
    
    
    
    let uid = this.route.snapshot.paramMap.get('uidb64');
    let token = this.route.snapshot.paramMap.get('token');
    this.uidT = uid
    this.tokenT = token
    // console.log('uid: ',this.uid, 'token: ',this.token)
    /*if (uid && token) {
      this.authService.verifyEmail(uid, token).subscribe({
        next: (res: any) => {
          this.message = '✅ Email verified successfully!';
          this.loading = false;
        },
        error: (err) => {
          this.message = '❌ Verification failed or expired link.';
          this.loading = false;
        }
      });
    } else {
      this.message = '❌ Invalid verification link.';
      this.loading = false;
    }
  }*/

  // this.someActivation()
}
  someActivation(){




    
    if (this.uidT && this.tokenT) {
      // console.log('part-works')
      this.authService.verifyEmail(this.uidT, this.tokenT).subscribe({
        next: (res: any) => {
         

          this.activate.set('success');
          // this.loading = false;
          this.onSignupSuccess()
        }, 
        error: (err) => {
          this.activate.set('error');
          // this.loading = false;
        }
      });
    } else {

      this.activate.set('loading');
            // console.log('part')

      // this.loading = false;
    }
  }
// signup.component.ts
showSurvey = false;

onSignupSuccess() {
  this.showSurvey = true;
}

handleSurvey(data: any) {
  console.log('Survey submitted:', data);
  // send to backend with HttpClient
}


}
