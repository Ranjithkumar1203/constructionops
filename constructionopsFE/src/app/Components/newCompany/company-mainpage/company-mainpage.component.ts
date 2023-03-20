import { Component, OnInit } from '@angular/core';
import { ConstraintLibraryComponent } from '../constraint-library/constraint-library.component';
import { DepartmentLibraryComponent } from '../department-library/department-library.component';
import { HolidayLibraryComponent } from '../holiday-library/holiday-library.component';
import { PositionLibraryComponent } from '../position-library/position-library.component';
import { ResourceTypeComponent } from '../resource-type/resource-type.component';
import { TradeLibraryComponent } from '../trade-library/trade-library.component';
import { WorkScheduleComponent } from '../work-schedule/work-schedule.component';

@Component({
  selector: 'app-company-mainpage',
  templateUrl: './company-mainpage.component.html',
  styleUrls: ['./company-mainpage.component.css']
})
export class CompanyMainpageComponent implements OnInit {



  userbox1 = true;
  userbox2 = false;
   componentload:any

  constructor() { }
  openUserbox2 = () => {
    this.userbox1 = false;
    this.userbox2 = true;
  }
  openUserbox1=()=>{
    this.userbox1 = true;
    this.userbox2 = false;
  }
  gotoHome=()=>{
    this.componentload = null
  }
  copmponentchange=(e:any)=>{
    if(e=="department"){
      this.componentload = DepartmentLibraryComponent
    }else if(e=="resource"){
      this.componentload = ResourceTypeComponent
    }else if(e=="workschedule"){
      this.componentload = WorkScheduleComponent
    }else if(e=="holiday"){
      this.componentload = HolidayLibraryComponent
    }else if(e=="position"){
      this.componentload = PositionLibraryComponent
    }else if(e=="constraint"){
      this.componentload = ConstraintLibraryComponent
    }else{
      this.componentload = TradeLibraryComponent
    }

  }

  ngOnInit(): void {
  }

}
function input() {
  throw new Error('Function not implemented.');
}

