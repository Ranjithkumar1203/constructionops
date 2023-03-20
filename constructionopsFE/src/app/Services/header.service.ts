import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  toggle: BehaviorSubject<any> = new BehaviorSubject(false);
  toggle$ = this.toggle.asObservable();

  toggle2: BehaviorSubject<any> = new BehaviorSubject(false);
  toggle2$ = this.toggle2.asObservable();
  constructor(private httpClient: HttpClient) { }
  
  getfrequent(): Observable<any> {
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetFrequents')
  }

  update(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post("https://stagingapi.buildrops.com/UpdateUserFavoriteSetting", body, { 'headers': headers });
  }

  
  getfav(): Observable<any> {
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetUserFavoriteSetting')
  }

 createfav(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post("https://stagingapi.buildrops.com/CreateUserFavoriteSetting", body, { 'headers': headers });
  }

  deletefav(id:any): Observable<any> {
    const params2 = new HttpParams().set("id",id);
     return this.httpClient.delete("https://stagingapi.buildrops.com/DeleteUserFavoriteSetting/",{params:params2});
  }
}
