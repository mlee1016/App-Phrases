import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, { username, password });
  }

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Retrieve token
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('jwt_token');
  }
}
