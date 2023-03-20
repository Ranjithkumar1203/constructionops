import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/Services/library.service';
import { RightPanelService } from 'src/app/Services/right-panel.service';

@Component({
  selector: 'app-bodyheader',
  templateUrl: './bodyheader.component.html',
  styleUrls: ['./bodyheader.component.css']
})
export class BodyheaderComponent implements OnInit {
  showInput: boolean | undefined;

  constructor(private service: RightPanelService) { }

  ngOnInit(): void {
    this.service.toggle$.subscribe(
      toggle => this.showInput = toggle
    )
  }

  toggle() {
 this.showInput != this.showInput;
  }

}
