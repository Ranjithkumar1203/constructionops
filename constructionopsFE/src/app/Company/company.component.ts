import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';
import { LibraryService } from '../Services/library.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent{
  showInput: boolean | undefined;
  loading: boolean;
  constructor(private router: Router, private httpClient: HttpClient,private service: LibraryService) {
    this.loading = false;
    router.events.subscribe((event: any) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loading = false;
      }
  })

  this.service.toggle$.subscribe(
    toggle => this.showInput = toggle
  )

}

toggle() {
    
}

}
