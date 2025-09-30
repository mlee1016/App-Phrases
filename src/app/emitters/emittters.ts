
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';

// @Injectable({ 
//   providedIn: 'root'
// })
// export class AuthenticationUser {

//   // Tracks whether the user is signed in or out
//   private authUser = new BehaviorSubject<string>('signed out');
//   authStatus = this.authUser.asObservable();

//   // Tracks whether auth has finished loading
//   private authLoaded = new BehaviorSubject<boolean>(false);
//   authStatusLoaded = this.authLoaded.asObservable();

//   // User info
//   username: string = "";
//   email: string = "";
//   id: string = "";
//   token_: string = '';

//   readonly url_get_user = 'http://127.0.0.1:8000/api/user/';
//   readonly url_sign_out = 'http://127.0.0.1:8000/api/signout/';

//   constructor(
//     private http: HttpClient,
//     private formBuilder: FormBuilder,
//     private router: Router
//   ) {
//     this.initializeAuth();
//   }

//   /**
//    * Run once on app start to check for existing JWT
   
//   initializeAuth() {
//     if (typeof window === 'undefined') return;

//     const storedToken = localStorage.getItem('jwt');
//     if (storedToken) {
//       this.token_ = storedToken;
//       const form = this.formBuilder.group({ jwt: storedToken });

//       this.http.post(this.url_get_user, form.getRawValue(), { withCredentials: true }).subscribe({
//         next: (data: any) => {
//           console.log('User authenticated:', data);
//           this.username = data.name || '';
//           this.email = data.email || '';
//           this.id = data.id || '';
//           this.emitNewData('signed in');
          
//           this.subscribed = data.subscribed || false; // backend sends this
//           this.authLoaded.next(true);
//         },
//         error: (err) => {
//           console.warn('Auth failed:', err);
//           this.emitNewData('signed out');
//           this.authLoaded.next(true);
//         }
//       });
//     } else {
//       this.emitNewData('signed out');
//       this.authLoaded.next(true);
//     }
//   }*/
// initializeAuth() {
//   if (typeof window === 'undefined') return;

//   const token = localStorage.getItem('jwt');
//   if (token) {
//     this.http.get(this.url_get_user, {
//       headers: { Authorization: `Bearer ${token}` }
//     }).subscribe({
//       next: (user: any) => {
//         this.username = user.name;
//         this.email = user.email;
//         this.id = user.id;
//         this.emitNewData('signed in');
//       },
//       error: () => this.emitNewData('signed out')
//     });
//   }
// }

//   /**
//    * Emit login state
//    */
//   emitNewData(status: string) {
//     this.authUser.next(status);
//   }

//   /**
//    * Logout
//    */
//   signOut() {
//     const form = this.formBuilder.group({ jwt: this.token_ });

//     this.http.post(this.url_sign_out, form.getRawValue()).subscribe({
//       next: () => {
//         localStorage.removeItem('jwt');
//         this.username = '';
//         this.email = '';
//         this.id = '';
//         this.token_ = '';
//         this.emitNewData('signed out');
//         alert('You have signed out.');
//         this.router.navigate(['home']);
//       },
//       error: (err) => {
//         console.error('Sign out failed', err);
//         alert('Sign out failed.');
//       }
//     });
//   }
//   // Inside AuthenticationUser service
// private subscribed = false;

// isSubscribed() {
//   return this.subscribed;

// }

// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

export interface Phrase {
  id: number;
  name: string;
  type: 'grammar' | 'story';
}

interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}
export interface LanguageDone {
  id: number;
  name: string;
  grammar: Phrase[];
  story: Phrase[];
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationUser {
  private authUser = new BehaviorSubject<string>('signed out');
  authStatus = this.authUser.asObservable();

  private authLoaded = new BehaviorSubject<boolean>(false);
  authStatusLoaded = this.authLoaded.asObservable();

  username: string = '';
  email: string = '';
  id: string = '';
  token_: string = '';
  private subscribed = false;

  readonly url_get_user = 'http://127.0.0.1:8000/api/user/';
  readonly url_sign_out = 'http://127.0.0.1:8000/api/signout/';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    
  ) {}

  initializeAuth() {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('jwt');
    if (token) {
      this.token_ = token;
      this.http.get(this.url_get_user, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (user: any) => {
          this.username = user.name || '';
          this.email = user.email || '';
          this.id = user.id || '';
          this.subscribed = user.subscribed || false;
          this.emitNewData('signed in');
          this.authLoaded.next(true);
        },
        error: () => {
          this.emitNewData('signed out');
          this.authLoaded.next(true);
        }
      });
    } else {
      this.emitNewData('signed out');
      this.authLoaded.next(true);
    }
  }

  emitNewData(status: string) {
    this.authUser.next(status);
  }

  signOut() {
    this.http.post(this.url_sign_out, {}, {
      headers: { Authorization: `Bearer ${this.token_}` }
    }).subscribe({
      next: () => {
        localStorage.removeItem('jwt');
        this.username = '';
        this.email = '';
        this.id = '';
        this.token_ = '';
        this.emitNewData('signed out');
        alert('You have signed out.');
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error('Sign out failed', err);
        alert('Sign out failed.');
      }
    });
  }
getAuthHeaders() {
  return { Authorization: `Bearer ${this.token_}` };
}

  isSubscribed() {
    return this.subscribed;
  }
  
  url_sign_in:string ="http://127.0.0.1:8000/api"

signIn(formData: any) {
  this.http.post(`${this.url_sign_in}/signin/`, formData, { withCredentials: true }).subscribe({
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
}
// auth.service.ts


  signUp(user: {username: string, email: string, password: string}) {
    return this.http.post(`${this.url_sign_in}/signup/`, user);
  }

  verifyEmail(uidb64: string, token: string) {
    return this.http.get(`${this.url_sign_in}/verify-email/${uidb64}/${token}/`);
  }


/*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.authUser.token_; // use service variable
  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next.handle(cloned);
  }
  return next.handle(req);
}*/
 private apiUrl = '/done-phrases/';
  getDonePhrases(): Observable<LanguageDone[]> {
    return this.http.get<LanguageDone[]>(this.url_sign_in+this.apiUrl);
  }
// src/app/core/auth-api.service.t

  private base = '/api'; // adjust if needed


  setPassword(payload: ChangePasswordPayload) {
    return this.http.post<{ detail: string }>(
      `${this.url_sign_in}/password_reset/`,
      payload,
      { withCredentials: true } // if you use cookie/session auth
    );
  }
}