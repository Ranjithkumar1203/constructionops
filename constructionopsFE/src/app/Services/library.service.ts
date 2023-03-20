import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgControlStatus } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  idnumber:any;
  toggle: BehaviorSubject<any> = new BehaviorSubject(false);
  toggle$ = this.toggle.asObservable();
public addworks :any;
  constructor(private httpClient: HttpClient) { }
  getworks():Observable<any>{
   return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetWorkSchedule');
  }
  getworklibrary():Observable<any>{
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetWorkLibrary');
   }
   getworksettingtime():Observable<any>{
   const params1 = new HttpParams().set("SettingType","Workflow").set("SettingName","Time Starts").set("UserIde","6");
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetWorkScheduleUserSettingsByName',{params:params1});
   }
   getworksettinghour():Observable<any>{
    const params2 = new HttpParams().set("SettingType","Workflow").set("SettingName","Working Hours").set("UserIde","7");
     return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetWorkScheduleUserSettingsByName',{params:params2});
    }

  update(data:any): Observable<any> {
    const headers = {'content-type':'application/json'}
    const body = JSON.stringify(data)
    // console.log( "URL",`${"http://buildropsapi-1821981423.us-east-2.elb.amazonaws.com/UpdateWorkSchedule"}/${id}`, data);
    return this.httpClient.put("https://stagingapi.buildrops.com/UpdateWorkSchedule" , body, {'headers':headers});
  }

 create(data:any): Observable<any> {
  const headers = {'content-type':'application/json'}
    const body = JSON.stringify(data)
    // console.log( "URL",`${"http://buildropsapi-1821981423.us-east-2.elb.amazonaws.com/UpdateWorkSchedule"}/${id}`, data);
    return this.httpClient.post("https://stagingapi.buildrops.com/CreateWorkSchedule" , body, {'headers':headers});
  }
  createtime(data:any): Observable<any> {
    const headers = {'content-type':'application/json'}
      const body = JSON.stringify(data)
      // console.log( "URL",`${"http://buildropsapi-1821981423.us-east-2.elb.amazonaws.com/UpdateWorkSchedule"}/${id}`, data);
      return this.httpClient.post("https://stagingapi.buildrops.com/CreateWorkScheduleSettingOption" , body, {'headers':headers});
    }
    getworksettinglunch():Observable<any>{
      const params2 = new HttpParams().set("SettingType","Workflow").set("SettingName","Lunch Break").set("UserIde","15");
       return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetWorkScheduleUserSettingsByName',{params:params2});
      }
  
  delete(): Observable<any> {
    return this.httpClient.delete("https://stagingapi.buildrops.com/DeleteWorkSchedule");
  }
}
