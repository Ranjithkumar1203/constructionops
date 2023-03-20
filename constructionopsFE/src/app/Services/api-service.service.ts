import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  toggle: BehaviorSubject<any> = new BehaviorSubject(false);
  toggle$ = this.toggle.asObservable();
  constructor(private httpClient: HttpClient) { }

  createDepartment = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post('https://stagingapi.buildrops.com/CreateDepartment', body, { 'headers': headers })
  }

  getDepartment = () => {
    return this.httpClient.get("https://stagingapi.buildrops.com/GetDepartments")
  }

  updateDepartment = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.put('https://stagingapi.buildrops.com/UpdateDepartment', body, { 'headers': headers })

  }
  deleteDepartment = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: data
    };
    return this.httpClient.delete('https://stagingapi.buildrops.com/DeleteDepartment', httpOptions)
  }

  getResources = () => {
    return this.httpClient.get("https://stagingapi.buildrops.com/GetResourceTypes")
  }


  createResourceType = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post('https://stagingapi.buildrops.com/CreateResourceType', body, { 'headers': headers })
  }
  updateResourceType = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.put('https://stagingapi.buildrops.com/UpdateResourceType', body, { 'headers': headers })

  }
  deleteResourceType = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: data
    };
    return this.httpClient.delete('https://stagingapi.buildrops.com/DeleteResourceType', httpOptions)
  }

  forgetPassword = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post('https://stagingapi.buildrops.com/ForgetPassword', body, { 'headers': headers })
  }
  findForgetPasswordKey = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post('https://stagingapi.buildrops.com/FindForgetPasswordKey', body, { 'headers': headers })
  }
  resetPassword = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post('https://stagingapi.buildrops.com/ResetPassword', body, { 'headers': headers })
  }
  findCompany = () => {
    return this.httpClient.get('https://stagingapi.buildrops.com/GetCompany');
  }

  createDepartmentLibrary = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post('https://stagingapi.buildrops.com/CreateDepartmentLibrary', body, { 'headers': headers })
  }

  getDepartmentLibrary = () => {
    return this.httpClient.get("https://stagingapi.buildrops.com/GetDepartmentsLibrary")
  }

  updateDepartmentLibrary = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.put('https://stagingapi.buildrops.com/UpdateDepartmentLibrary', body, { 'headers': headers })

  }
  deleteDepartmentLibrary = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: data
    };
    return this.httpClient.delete('https://stagingapi.buildrops.com/DeleteDepartmentLibrary', httpOptions)
  }


  getResourcesLibrary = () => {
    return this.httpClient.get("https://stagingapi.buildrops.com/GetResourceLibrary")
  }


  createResourceLibrary = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post('https://stagingapi.buildrops.com/CreateResourceLibrary', body, { 'headers': headers })
  }
  updateResourceLibrary = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.put('https://stagingapi.buildrops.com/UpdateResourceLibrary', body, { 'headers': headers })

  }
  deleteResourceLibrary = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: data
    };
    return this.httpClient.delete('https://stagingapi.buildrops.com/DeleteResourceLibrary', httpOptions)
  }


  getWorkLibrary = () => {
    return this.httpClient.get("https://stagingapi.buildrops.com/GetWorkLibrary")
  }

  createWorkLibrary = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.post('https://stagingapi.buildrops.com/CreateWorkLibrary', body, { 'headers': headers })
  }
  deleteWorkLibrary = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: data
    };
    return this.httpClient.delete('https://stagingapi.buildrops.com/DeleteWorkLibrary', httpOptions)
  }

  updateWorkLibrary = (data: any): Observable<any> => {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data)
    return this.httpClient.put('https://stagingapi.buildrops.com/UpdateWorkLibrary', body, { 'headers': headers })

  }

}
