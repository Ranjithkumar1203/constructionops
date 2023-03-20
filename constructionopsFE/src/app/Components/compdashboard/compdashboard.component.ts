import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/Services/library.service';

@Component({
  selector: 'app-compdashboard',
  templateUrl: './compdashboard.component.html',
  styleUrls: ['./compdashboard.component.css']
})
export class CompdashboardComponent implements OnInit {
  showInput: boolean | undefined;
  constructor(private service: LibraryService) { }

  ngOnInit(): void {
    this.service.toggle$.subscribe(
      toggle => this.showInput = toggle
    )
  }

  toggle() {
    
  }
  

}
