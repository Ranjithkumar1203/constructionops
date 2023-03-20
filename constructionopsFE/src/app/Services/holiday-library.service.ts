import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidayLibraryService {
navstatus:boolean=false;
navstatus2:boolean=false


  toggle: BehaviorSubject<any> = new BehaviorSubject(false);
  toggle$ = this.toggle.asObservable();
  constructor(private httpClient: HttpClient) { }
  getholidays(): Observable<any> {
    return this.httpClient.get<any>('https://stagingapi.buildrops.com/GetHoliday')
  }

  update(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.put("https://stagingapi.buildrops.com/UpdateHoliday", body, { 'headers': headers });
  }

  create(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post("https://stagingapi.buildrops.com/CreateHoliday", body, { 'headers': headers });
  }


  delete(): Observable<any> {
    return this.httpClient.delete("https://stagingapi.buildrops.com/DeleteHoliday");
  }
}
