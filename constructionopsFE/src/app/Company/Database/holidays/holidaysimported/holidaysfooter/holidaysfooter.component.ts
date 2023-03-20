import { Component, OnInit } from '@angular/core';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';

@Component({
  selector: 'app-holidaysfooter',
  templateUrl: './holidaysfooter.component.html',
  styleUrls: ['./holidaysfooter.component.css']
})
export class HolidaysfooterComponent implements OnInit {
  public holidays: any;
  constructor(private library: HolidayLibraryService) { }

  ngOnInit(): void {
    this.holidays = [];
    this.library.getholidays().subscribe((val) => {
      console.log("val", val);
      val.forEach((itemworkk: any) => {
        if (itemworkk.isImported == true) {
          this.holidays.push(itemworkk);
        }
      });
    });
  
  }

}
