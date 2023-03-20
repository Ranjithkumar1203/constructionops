import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CompanyheaderComponent } from 'src/app/Company/companyheader/companyheader.component';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';
import { LibraryService } from 'src/app/Services/library.service';
export class work {
  constructor(
    public parentPermissionID: number,
    public parentPermission: string,
    public subPermissions: string,
  ){
  }
}
@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.css']
})
export class SidepanelComponent implements OnInit {

status:boolean = false;
showText = false;
works: work[] | undefined;

  constructor(private service: LibraryService,private router: Router,private service2: HolidayLibraryService) { }

  ngOnInit(): void {
    this.service2.navstatus = false;
    this.service2.navstatus2 = false;
    // this.getworks();
  }
clickEvent(){
  this.status = !this.status;
}
toggleText() {
  this.showText = !this.showText;
  this.service.toggle.next(this.showText)
}
isHomeRoute() {
  return  (this.router.url != '/company') && (this.router.url != '/company/workschedule') && (this.router.url != '/company/workcomplete') && (this.router.url != '/company/workimported') && (this.router.url != '/company/holiday') && (this.router.url != '/company/holidaysimported') && (this.router.url != '/company/holidayscomplete');
}

navworkschedule(){
  this.service2.navstatus = true;
}

navholidays() {
  this.service2.navstatus2 = true;
}

}
