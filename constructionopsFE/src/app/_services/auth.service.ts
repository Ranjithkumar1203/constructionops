import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

const AUTH_API = 'https://stagingapi.buildrops.com/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private router: Router) { }

  login(User: string, Password: string, CompanyName:string): Observable<any> {
    return this.http.post(AUTH_API + 'Constructionlogin', {
      User,
      Password,
      CompanyName
    }, httpOptions);
  
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['']);
  }
  isLoggedIn() {
    const token:any = this.tokenStorageService.getToken(); // get token from local storage
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    return parsedPayload.exp > Date.now() / 1000; // check if token is expired

  }
  
}
