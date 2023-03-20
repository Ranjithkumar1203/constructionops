import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/Services/library.service';

@Component({
  selector: 'app-workfooter',
  templateUrl: './workfooter.component.html',
  styleUrls: ['./workfooter.component.css']
})
export class WorkfooterComponent implements OnInit {
  public works: any;
  constructor( private library: LibraryService) { }

  ngOnInit(): void {
    this.works = [];
    this.library.getworks().subscribe((val) => {
      console.log("val", val);
      val.forEach((itemworkk: any) => {
        if (itemworkk.isImported == true) {
          this.works.push(itemworkk);
        }
      });
    });
  }

}
