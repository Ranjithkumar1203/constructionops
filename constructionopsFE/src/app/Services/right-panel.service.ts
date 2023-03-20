import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightPanelService {
  public iddrop: Number|undefined;
  public length: any;
  public tablength: any;
  public deletetab:any;
  public name:any;
  public idtab: any;
  public seqid: any;
  public righttab: any = [];
  toggle: BehaviorSubject<any> = new BehaviorSubject(false);
  toggle$ = this.toggle.asObservable();

  toggle1: BehaviorSubject<any> = new BehaviorSubject(false);
  toggle1$ = this.toggle1.asObservable();
  constructor(private httpClient: HttpClient) { }
  gettabs():Observable<any>{
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetRightPanelUserSettingOptions')
   }
   gettaboptions():Observable<any>{
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetUserRightPanelSetting')
   }
   getroutes():Observable<any>{
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetUserRightPanelSettingRoutes')
   }
   getsouteby():Observable<any>{
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetUserRightPanelSettingSouteByValue')
   }
 
   update(data:any): Observable<any> {
     const headers = {'content-type':'application/json'}
     const body = JSON.stringify(data)
     return this.httpClient.put("https://stagingapi.buildrops.com/UpdateUserSetting" , body, {'headers':headers});
   }
 
  create(data:any): Observable<any> {
   const headers = {'content-type':'application/json'}
     const body = JSON.stringify(data)
     return this.httpClient.post("https://stagingapi.buildrops.com/CreateUserRightPanelSetting" , body, {'headers':headers});
   }
   
   
   delete(id:any): Observable<any> {
    const params2 = new HttpParams().set("id",id);
     return this.httpClient.delete("https://stagingapi.buildrops.com/DeleteUserSetting/",{params:params2});
   }
}
