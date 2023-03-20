import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';
import { HolidaysaddComponent } from './holidaysadd/holidaysadd.component';
export enum KEY_CODE {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
  UP_ARROW = 'ArrowUp',
  DOWN_ARROW = 'ArrowDown',
  ENTER = 'Enter',
  ESCAPE = 'Escape',
  ONE = '1',
  ZERO = '0',
  A = 'A',
  P = 'P',
  a = 'a',
  p = 'p',
  PLUS = '+',
  MINUS = '-',
}
@Component({
  selector: 'app-holidaysimported',
  templateUrl: './holidaysimported.component.html',
  styleUrls: ['./holidaysimported.component.css']
})
export class HolidaysimportedComponent implements OnInit {
  @ViewChild(HolidaysaddComponent) child!: HolidaysaddComponent;
  constructor(private library: HolidayLibraryService) { }
  addpopup: boolean = false;
  public holidays: any;
  public singleholiday: any;
  public editholiday: any;
  public onTheOptionLists: any;
  public monthOptionLists: any;
  public daysOptionLists: any;
  catogery1active: boolean = false;
  catogery2active: boolean = false;
  numbervalue: number = 1;
  sequencenumber: number = 0;
  activeedit: boolean = false;
  activedrop: boolean = false;
  saveandclose: boolean = false;
  editactivedrop: boolean = false;
  yearrulerow: boolean = false;
  monthrulerow: boolean = false;
  weekrulerow: boolean = false;
  dayrulerow: boolean = false;
  movingexpire: number = 1;
  expireenternumber: number = 1;
  movingexpirename: any;
  hoverexpire: boolean = false;
  arrowexpire: boolean = false;
  movingweek: number = 1;
  weekenternumber: number = 1;
  movingweekname: any;
  hoverweek: boolean = false;
  arrowweek: boolean = false;
  movingmonth: number = 1;
  monthenternumber: number = 1;
  movingmonthname: any;
  hovermonth: boolean = false;
  arrowmonth: boolean = false;
  moving2month: number = 1;
  month2enternumber: number = 1;
  moving2monthname: any;
  hover2month: boolean = false;
  arrow2month: boolean = false;
  movingdate: number = 1;
  dateenternumber: number = 1;
  movingdatename: any;
  hoverdate: boolean = false;
  arrowdate: boolean = false;
  observationnumber: boolean = false;
  activedropdown: boolean = false;
  movingup: boolean = false;
  movingdown: boolean = false;
  hournumber: number = 1;
  movedownward: number = 1;
  editmovingexpire: number = 1;
  editexpireenternumber: number = 1;
  editmovingexpirename: any;
  edithoverexpire: boolean = false;
  editarrowexpire: boolean = false;
  editmovingweek: number = 1;
  editweekenternumber: number = 1;
  editmovingweekname: any;
  edithoverweek: boolean = false;
  editarrowweek: boolean = false;
  editmovingmonth: number = 1;
  editmonthenternumber: number = 1;
  editmovingmonthname: any;
  edithovermonth: boolean = false;
  editarrowmonth: boolean = false;
  editmoving2month: number = 1;
  editmonth2enternumber: number = 1;
  editmoving2monthname: any;
  edithover2month: boolean = false;
  editarrow2month: boolean = false;
  editmovingdate: number = 1;
  editdateenternumber: number = 1;
  editmovingdatename: any;
  edithoverdate: boolean = false;
  editarrowdate: boolean = false;
  editobservationnumber: boolean = false;
  viewexpireevent: boolean = false;
  viewexpireyear: boolean = false;
  viewdayofmonth: boolean = false;
  viewdateofmonth: boolean = false;
  alwaysfalse: boolean = true;
  numberincrement: number = 1;
  observationdaynumber: boolean = false;
  observationdaynumberid: number = 0;
  nameactive: boolean = false;
  ruleactive: boolean = false;
  observationactive: boolean = false;
  standardrulerow: boolean = false;
  customerulerow: boolean = false;
  norulerow: boolean = false;
  sunrow: boolean = false;
  monrow: boolean = false;
  tuerow: boolean = false;
  wedrow: boolean = false;
  thurow: boolean = false;
  frirow: boolean = false;
  satrow: boolean = false;
  weekeditvalue: any;
  observation = [
    { id: 1, day: 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday' },
    { id: 2, day: 'Observes Saturday Holidays on Previous Workday' },
    { id: 3, day: 'Observes Sunday Holidays on Next Workday' },
    { id: 4, day: 'Does Not Observe on an Alternate Workday' },
  ];
  expireOptionList = [
    { id: 1, name: 'Never', value: 'Never' },
    { id: 2, name: 'In Year Of', value: 'In Year' },
    { id: 3, name: 'After # of Events', value: 'After' }
  ];
  onTheOptionList = [
    { id: 1, name: 'First', value: true },
    { id: 2, name: 'Second', value: true },
    { id: 3, name: 'Third', value: true },
    { id: 4, name: 'Fourth', value: true },
    { id: 5, name: 'Fifth', value: true },
    { id: 6, name: 'Last', value: true }
  ];
  monthOptionList = [
    { id: 1, name: 'January', value: true },
    { id: 2, name: 'February', value: true },
    { id: 3, name: 'March', value: true },
    { id: 4, name: 'April', value: true },
    { id: 5, name: 'May', value: true },
    { id: 6, name: 'June', value: true },
    { id: 7, name: 'July', value: true },
    { id: 8, name: 'August', value: true },
    { id: 9, name: 'September', value: true },
    { id: 10, name: 'October', value: true },
    { id: 11, name: 'November', value: true },
    { id: 12, name: 'December', value: true }
  ];
  daysOptionList = [
    { id: 1, name: '1st', value: true },
    { id: 2, name: '2nd', value: true },
    { id: 3, name: '3rd', value: true },
    { id: 4, name: '4th', value: true },
    { id: 5, name: '5th', value: true },
    { id: 6, name: '6th', value: true },
    { id: 7, name: '7th', value: true },
    { id: 8, name: '8th', value: true },
    { id: 9, name: '9th', value: true },
    { id: 10, name: '10th', value: true },
    { id: 11, name: '11th', value: true },
    { id: 12, name: '12th', value: true },
    { id: 13, name: '13th', value: true },
    { id: 14, name: '14th', value: true },
    { id: 15, name: '15th', value: true },
    { id: 16, name: '16th', value: true },
    { id: 17, name: '17th', value: true },
    { id: 18, name: '18th', value: true },
    { id: 19, name: '19th', value: true },
    { id: 20, name: '20th', value: true },
    { id: 21, name: '21st', value: true },
    { id: 22, name: '22nd', value: true },
    { id: 23, name: '23rd', value: true },
    { id: 24, name: '24th', value: true },
    { id: 25, name: '25th', value: true },
    { id: 26, name: '26th', value: true },
    { id: 27, name: '27th', value: true },
    { id: 28, name: '28th', value: true },
    { id: 29, name: '29th', value: true },
    { id: 30, name: '30th', value: true },
    { id: 31, name: '31st', value: true }
  ];
  ngOnInit(): void {
    this.singleholiday = [];
    this.holidays = [];
    let i = 1;
    this.onTheOptionLists = [];
    this.onTheOptionList.forEach((val: any) => {
      this.onTheOptionLists.push(val);
    });
    this.monthOptionLists = [];
    this.monthOptionList.forEach((val: any) => {
      this.monthOptionLists.push(val);
    });
    this.daysOptionLists = [];
    this.daysOptionList.forEach((val: any) => {
      this.daysOptionLists.push(val);
    });
    this.library.getholidays().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['checked'] = false;
        itemworkk['standardrule'] = false;
        itemworkk['customerule'] = false;
        itemworkk['norule'] = false;
        itemworkk['dayyesrule'] = false;
        itemworkk['daynorule'] = false;
        itemworkk['yearrule'] = false;
        itemworkk['monthrule'] = false;
        itemworkk['weekrule'] = false;
        itemworkk['dayrule'] = false;
        itemworkk['sundayrule'] = false;
        itemworkk['mondayrule'] = false;
        itemworkk['tuesdayrule'] = false;
        itemworkk['wednesdayrule'] = false;
        itemworkk['thursdayrule'] = false;
        itemworkk['fridayrule'] = false;
        itemworkk['saturdayrule'] = false;
        itemworkk['observation1rule'] = false;
        itemworkk['observation2rule'] = false;
        itemworkk['observation3rule'] = false;
        itemworkk['observation4rule'] = false;
        itemworkk['incrementobservationdays'] = false;
        itemworkk['observation'] = '';
        itemworkk['alternateday'] = '';
        itemworkk['observationnumber'] = '';
        itemworkk['vrepeatEveryCount'] = itemworkk.repeatEveryCount;
        itemworkk['vrepeatEveryTimeline'] = itemworkk.repeatEveryTimeline;
        itemworkk['vexpire'] = itemworkk.expire;
        itemworkk['vmonth'] = itemworkk.month;
        itemworkk['vdateOfMonth'] = itemworkk.dateOfMonth;
        itemworkk['vweeekOfMonth'] = itemworkk.weeekOfMonth;
        itemworkk['vdayOfWeek'] = itemworkk.dayOfWeek;
        itemworkk['vobserveAsWorkDay'] = itemworkk.observeAsWorkDay;
        itemworkk['vobserveNumberOfDays'] = itemworkk.observeNumberOfDays;
        itemworkk['valternateObservation'] = itemworkk.alternateObservation;
        itemworkk['vholidayName'] = itemworkk.holidayName;
        itemworkk['eholidayName'] = itemworkk.holidayName;
        itemworkk['vobservationDayMethod'] = itemworkk.observationDayMethod;
        itemworkk['vruleSetting'] = itemworkk.ruleSetting;
        itemworkk['vexpiryYear'] = itemworkk.expiryYear;
        itemworkk['vexpireEvent'] = itemworkk.expireEvent;
        itemworkk['vobservedOn'] = itemworkk.observedOn;
        itemworkk['sequence'] = 0;
        if (itemworkk.observeAsWorkDay == true) {
          itemworkk.observation = 'YES';
          itemworkk.alternateday = itemworkk.alternateObservation;
          if (itemworkk.observeNumberOfDays == 1) {
            itemworkk.observationnumber = '01';
          } else if (itemworkk.observeNumberOfDays == 2) {
            itemworkk.observationnumber = '02';
          } else if (itemworkk.observeNumberOfDays == 3) {
            itemworkk.observationnumber = '03';
          } else if (itemworkk.observeNumberOfDays == 4) {
            itemworkk.observationnumber = '04';
          } else if (itemworkk.observeNumberOfDays == 5) {
            itemworkk.observationnumber = '05';
          } else if (itemworkk.observeNumberOfDays == 6) {
            itemworkk.observationnumber = '06';
          } else if (itemworkk.observeNumberOfDays == 7) {
            itemworkk.observationnumber = '07';
          } else if (itemworkk.observeNumberOfDays == 8) {
            itemworkk.observationnumber = '08';
          } else if (itemworkk.observeNumberOfDays == 9) {
            itemworkk.observationnumber = '09';
          } else if (itemworkk.observeNumberOfDays >= 10) {
            itemworkk.observationnumber = itemworkk.observeNumberOfDays;
          }
        } else {
          itemworkk.observation = 'NO';
          itemworkk.alternateday = 'N/A';
          itemworkk.observationnumber = 'N/A';
          document.getElementById('hourworkdayseletexttimetext' + itemworkk.holidayId)?.classList.remove('hide');
          document.getElementById('hourworkdayseletexttime' + itemworkk.holidayId)?.classList.add('hide');
          document.getElementById('workdayseletexttimetext' + itemworkk.holidayId)?.classList.remove('hide');
          document.getElementById('workdayseletexttime' + itemworkk.holidayId)?.classList.add('hide');
          document.getElementById('hourbuttondaystime' + itemworkk.holidayId)?.classList.add('hide');
          document.getElementById('buttondaystime' + itemworkk.holidayId)?.classList.add('hide');
          document.getElementById('checkdaystime' + itemworkk.holidayId)?.classList.add('hide');
        }
        if (itemworkk.observeAsWorkDay == true) {
          itemworkk.dayyesrule = true;
          itemworkk.daynorule = false;
        } else {
          itemworkk.dayyesrule = false;
          itemworkk.daynorule = true;
        }

        if (itemworkk.alternateObservation == 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday') {
          itemworkk.observation1rule = true;
        } else if (itemworkk.alternateObservation == 'Observes Saturday Holidays on Previous Workday') {
          itemworkk.observation2rule = true;
        } else if (itemworkk.alternateObservation == 'Observes Sunday Holidays on Next Workday') {
          itemworkk.observation3rule = true;
        } else if (itemworkk.alternateObservation == 'Does Not Observe on an Alternate Workday') {
          itemworkk.observation4rule = true;
        }

        if (itemworkk.ruleSetting == 'Standard Reoccurrence') {
          itemworkk.standardrule = true;
          itemworkk.customerule = false;
          itemworkk.norule = false;
        } else if (itemworkk.ruleSetting == 'Custom Reoccurrence') {
          itemworkk.customerule = true;
          itemworkk.standardrule = false;
          itemworkk.norule = false;
        } else if (itemworkk.ruleSetting == 'No Reoccurrence') {
          itemworkk.norule = true;
          itemworkk.customerule = false;
          itemworkk.standardrule = false;
        }
        if (itemworkk.repeatEveryTimeline == 'Year') {
          itemworkk.yearrule = true;
          itemworkk.monthrule = false;
          itemworkk.weekrule = false;
          itemworkk.dayrule = false;
        } else if (itemworkk.repeatEveryTimeline == 'Month') {
          itemworkk.yearrule = false;
          itemworkk.monthrule = true;
          itemworkk.weekrule = false;
          itemworkk.dayrule = false;
        } else if (itemworkk.repeatEveryTimeline == 'Week') {
          itemworkk.yearrule = false;
          itemworkk.monthrule = false;
          itemworkk.weekrule = true;
          itemworkk.dayrule = false;
        } else if (itemworkk.repeatEveryTimeline == 'day') {
          itemworkk.yearrule = false;
          itemworkk.monthrule = false;
          itemworkk.weekrule = false;
          itemworkk.dayrule = true;
        }
        if (itemworkk.dayOfWeek == 'Sunday') {
          itemworkk.sundayrule = true;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Monday') {
          itemworkk.mondayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Tuesday') {
          itemworkk.tuesdayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Wednesday') {
          itemworkk.wednesdayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Thursday') {
          itemworkk.thursdayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Friday') {
          itemworkk.fridayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Saturday') {
          itemworkk.saturdayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
        }
        if (itemworkk.isImported == true) {

          this.holidays.push(itemworkk);
        }
      });
    });
    console.log('Holiday', this.holidays);
    let a = 1;
    const intervalset = setInterval(() => {
      a++;
      if (a == 4) {
        clearInterval(intervalset);
        this.callingfasle();
      } else {
        this.callingfasle();
      }
    }, 500);



  }
  opencreate() {
    document.getElementById('createmodal')?.click();
  }
  openadd() {
    document.getElementById('activeadded')?.click();
  }
  callingfasle() {
    let u = 1;
    this.holidays.forEach((val: any) => {
      val.sequence = u++;
      if (val.observeAsWorkDay == false) {
        document.getElementById('hourworkdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
        document.getElementById('hourworkdayseletexttime' + val.holidayId)?.classList.add('hide');
        document.getElementById('workdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
        document.getElementById('workdayseletexttime' + val.holidayId)?.classList.add('hide');
        document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.add('hide');
        document.getElementById('buttondaystime' + val.holidayId)?.classList.add('hide');
        document.getElementById('checkdaystime' + val.holidayId)?.classList.add('hide');
      }
      if (val.observeNumberOfDays == 1) {
        document.getElementById('buttondays1time' + val.holidayId)?.classList.add('opacityarrow');
        document.getElementById('buttondaystime' + val.holidayId)?.classList.add('opacityarrow');
      } else {
        document.getElementById('buttondays1time' + val.holidayId)?.classList.remove('opacityarrow');
        document.getElementById('buttondaystime' + val.holidayId)?.classList.remove('opacityarrow');
      }
    });
    console.log('falsecalling',this.holidays)
  }


  checkadd() {
    this.addpopup = true;
    this.child.updaesequence();
    this.child.checkempty();
  }

  nameedit(id: any) {
    if (this.activedropdown == false) {
      this.movingup = false;
      this.observationactive = false;
      this.movingdown = false;
      document.getElementById('holidayedit' + id)?.classList.add('hide');
      document.getElementById('holidaytext' + id)?.classList.add('hide');
      document.getElementById('holidaychecked' + id)?.classList.remove('hide');
      document.getElementById('holidayedittext' + id)?.classList.remove('hide');
      document.getElementById('holidayedittext' + id)?.focus();
      this.holidays.forEach((val: any) => {
        val.incrementobservationdays = false;
        if (val.holidayId != id) {
          this.namecheck(val.holidayId);
          val.nameactive = false;
        } else {
          val.nameactive = true;
        }

      });
      this.holidays.forEach((val: any) => {
        this.alterobservationcheck(val.holidayId);
        this.numberobservationclose(val.holidayId)
        if (val.holidayId != id) {
          this.namecheck(val.holidayId);
        }
      });
    }

  }
  namecheck(id: any) {
    this.nameactive = false;
    document.getElementById('holidayedit' + id)?.classList.remove('hide');
    document.getElementById('holidaytext' + id)?.classList.remove('hide');
    document.getElementById('holidaychecked' + id)?.classList.add('hide');
    document.getElementById('holidayedittext' + id)?.classList.add('hide');
  }

  nameenter(event: any, id: any, holidayname: any) {
    if (event.keyCode == 13) {
      this.namecheck(id);
      this.nameupdate(id, holidayname);
    }
  }

  nameupdate(id: any, holidayname: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.holidayName = holidayname;
        val.vholidayName = holidayname;
        val.eholidayName = holidayname;
      }
    });
    let updateCon = {
      "holidayId": id,
      "holidayName": holidayname,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated", val);
    });
  }
  falseatcivedropdown() {
    this.activedropdown = false;
  }

  observationday(event: any, id: any) {
    if (this.activedropdown == false && this.ruleactive == false) {
      if (event.target.checked) {
        let a = 1;
        const interval2 = setInterval(() => {
          a++;
          if (a == 3) {
            clearInterval(interval2);
            
            this.holidays.forEach((val: any) => {
              val.incrementobservationdays = false;
              if (val.holidayId == id) {
                val.observation = 'YES';
                val.vobserveAsWorkDay = true;
                document.getElementById('hourworkdayseletexttimetext' + val.holidayId)?.classList.add('hide');
                document.getElementById('hourworkdayseletexttime' + val.holidayId)?.classList.remove('hide');
                document.getElementById('workdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
                document.getElementById('workdayseletexttime' + val.holidayId)?.classList.add('hide');
                document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.remove('hide');
                document.getElementById('buttondaystime' + val.holidayId)?.classList.remove('hide');
                document.getElementById('checkdaystime' + val.holidayId)?.classList.remove('hide');
                val.alternateday = val.alternateObservation;
                val.observeNumberOfDays = 1;
                val.vobservationnumber = '01';
                val.vobserveNumberOfDays = 1;
                val.observationnumber = '01';
                document.getElementById('buttondays1time' + id)?.classList.add('opacityarrow');
                document.getElementById('buttondaystime' + id)?.classList.add('opacityarrow');
                if (val.dayOfWeek == 'Sunday') {
                  val.alternateday = 'Observes Sunday Holidays on Next Workday';
                  val.alternateObservation = 'Observes Sunday Holidays on Next Workday'
                  val.valternateObservation = 'Observes Sunday Holidays on Next Workday'
                } else if (val.dayOfWeek == 'Monday') {
                  val.alternateday = 'Does Not Observe on an Alternate Workday';
                  val.alternateObservation = 'Does Not Observe on an Alternate Workday'
                  val.valternateObservation = 'Does Not Observe on an Alternate Workday'
                } else if (val.dayOfWeek == 'Tuesday') {
                  val.alternateday = 'Does Not Observe on an Alternate Workday';
                  val.alternateObservation = 'Does Not Observe on an Alternate Workday'
                  val.valternateObservation = 'Does Not Observe on an Alternate Workday'
                } else
                if (val.dayOfWeek == 'Wednesday') {
                  val.alternateday = 'Does Not Observe on an Alternate Workday';
                  val.alternateObservation = 'Does Not Observe on an Alternate Workday'
                  val.valternateObservation = 'Does Not Observe on an Alternate Workday'
                } else
                if (val.dayOfWeek == 'Thursday') {
                  val.alternateday = 'Does Not Observe on an Alternate Workday';
                  val.alternateObservation = 'Does Not Observe on an Alternate Workday'
                  val.valternateObservation = 'Does Not Observe on an Alternate Workday'
                } else
                if (val.dayOfWeek == 'Friday') {
                  val.alternateday = 'Does Not Observe on an Alternate Workday';
                  val.alternateObservation = 'Does Not Observe on an Alternate Workday'
                  val.valternateObservation = 'Does Not Observe on an Alternate Workday'
                } else
                if (val.dayOfWeek == 'Saturday') {
                  val.alternateday = 'Observes Saturday Holidays on Previous Workday';
                  val.alternateObservation = 'Observes Saturday Holidays on Previous Workday'
                  val.valternateObservation = 'Observes Saturday Holidays on Previous Workday'
                } else {
                  val.alternateday = 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday';
                  val.alternateObservation = 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday'
                  val.valternateObservation = 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday'
                }
                let updateCon = {
                  "holidayId": id,
                  "observeAsWorkDay": true,
                  "alternateObservation":val.alternateObservation,
                  "observeNumberOfDays":val.observeNumberOfDays,
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated", val);
                });
              }
              
            });

          }
        }, 300);

      } else {
        let b = 1;
        const interval3 = setInterval(() => {
          b++;
          if (b == 3) {
            clearInterval(interval3);
            let updateCon = {
              "holidayId": id,
              "observeAsWorkDay": false,
            };
            this.library.update(updateCon).subscribe((val) => {
              console.log("updated", val);
            });
            this.holidays.forEach((val: any) => {
              val.incrementobservationdays = false;
              if (val.holidayId == id) {
                val.vobserveAsWorkDay = false;
                val.observation = 'NO';
                val.observationnumber = 'N/A';
                val.alternateday = 'N/A';
                document.getElementById('hourworkdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
                document.getElementById('hourworkdayseletexttime' + val.holidayId)?.classList.add('hide');
                document.getElementById('workdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
                document.getElementById('workdayseletexttime' + val.holidayId)?.classList.add('hide');
                document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.add('hide');
                document.getElementById('buttondaystime' + val.holidayId)?.classList.add('hide');
                document.getElementById('checkdaystime' + val.holidayId)?.classList.add('hide');
              }
            });
          }
        }, 300);

      }
    } else {

    }
  }
  onworkaddclick() {
    this.addpopup = false;
  }
  addwork() {
    this.singleholiday = [];
    this.holidays = [];
    let i = 1;
    this.onTheOptionLists = [];
    this.onTheOptionList.forEach((val: any) => {
      this.onTheOptionLists.push(val);
    });
    this.monthOptionLists = [];
    this.monthOptionList.forEach((val: any) => {
      this.monthOptionLists.push(val);
    });
    this.daysOptionLists = [];
    this.daysOptionList.forEach((val: any) => {
      this.daysOptionLists.push(val);
    });
    this.library.getholidays().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['checked'] = false;
        itemworkk['standardrule'] = false;
        itemworkk['customerule'] = false;
        itemworkk['norule'] = false;
        itemworkk['dayyesrule'] = false;
        itemworkk['daynorule'] = false;
        itemworkk['yearrule'] = false;
        itemworkk['monthrule'] = false;
        itemworkk['weekrule'] = false;
        itemworkk['dayrule'] = false;
        itemworkk['sundayrule'] = false;
        itemworkk['mondayrule'] = false;
        itemworkk['tuesdayrule'] = false;
        itemworkk['wednesdayrule'] = false;
        itemworkk['thursdayrule'] = false;
        itemworkk['fridayrule'] = false;
        itemworkk['saturdayrule'] = false;
        itemworkk['observation1rule'] = false;
        itemworkk['observation2rule'] = false;
        itemworkk['observation3rule'] = false;
        itemworkk['observation4rule'] = false;
        itemworkk['incrementobservationdays'] = false;
        itemworkk['observation'] = '';
        itemworkk['alternateday'] = '';
        itemworkk['observationnumber'] = '';
        itemworkk['vrepeatEveryCount'] = itemworkk.repeatEveryCount;
        itemworkk['vrepeatEveryTimeline'] = itemworkk.repeatEveryTimeline;
        itemworkk['vexpire'] = itemworkk.expire;
        itemworkk['vmonth'] = itemworkk.month;
        itemworkk['vdateOfMonth'] = itemworkk.dateOfMonth;
        itemworkk['vweeekOfMonth'] = itemworkk.weeekOfMonth;
        itemworkk['vdayOfWeek'] = itemworkk.dayOfWeek;
        itemworkk['vobserveAsWorkDay'] = itemworkk.observeAsWorkDay;
        itemworkk['vobserveNumberOfDays'] = itemworkk.observeNumberOfDays;
        itemworkk['valternateObservation'] = itemworkk.alternateObservation;
        itemworkk['vholidayName'] = itemworkk.holidayName;
        itemworkk['eholidayName'] = itemworkk.holidayName;
        itemworkk['vobservationDayMethod'] = itemworkk.observationDayMethod;
        itemworkk['vruleSetting'] = itemworkk.ruleSetting;
        itemworkk['vexpiryYear'] = itemworkk.expiryYear;
        itemworkk['vexpireEvent'] = itemworkk.expireEvent;
        itemworkk['vobservedOn'] = itemworkk.observedOn;
        itemworkk['sequence'] = i++;
        if (itemworkk.observeAsWorkDay == true) {
          itemworkk.observation = 'YES';
          itemworkk.alternateday = itemworkk.alternateObservation;
          if (itemworkk.observeNumberOfDays == 1) {
            itemworkk.observationnumber = '01';
          } else if (itemworkk.observeNumberOfDays == 2) {
            itemworkk.observationnumber = '02';
          } else if (itemworkk.observeNumberOfDays == 3) {
            itemworkk.observationnumber = '03';
          } else if (itemworkk.observeNumberOfDays == 4) {
            itemworkk.observationnumber = '04';
          } else if (itemworkk.observeNumberOfDays == 5) {
            itemworkk.observationnumber = '05';
          } else if (itemworkk.observeNumberOfDays == 6) {
            itemworkk.observationnumber = '06';
          } else if (itemworkk.observeNumberOfDays == 7) {
            itemworkk.observationnumber = '07';
          } else if (itemworkk.observeNumberOfDays == 8) {
            itemworkk.observationnumber = '08';
          } else if (itemworkk.observeNumberOfDays == 9) {
            itemworkk.observationnumber = '09';
          } else if (itemworkk.observeNumberOfDays >= 10) {
            itemworkk.observationnumber = itemworkk.observeNumberOfDays;
          }
        } else {
          itemworkk.observation = 'NO';
          itemworkk.alternateday = 'N/A';
          itemworkk.observationnumber = 'N/A';
          document.getElementById('hourworkdayseletexttimetext' + itemworkk.holidayId)?.classList.remove('hide');
          document.getElementById('hourworkdayseletexttime' + itemworkk.holidayId)?.classList.add('hide');
          document.getElementById('workdayseletexttimetext' + itemworkk.holidayId)?.classList.remove('hide');
          document.getElementById('workdayseletexttime' + itemworkk.holidayId)?.classList.add('hide');
          document.getElementById('hourbuttondaystime' + itemworkk.holidayId)?.classList.add('hide');
          document.getElementById('buttondaystime' + itemworkk.holidayId)?.classList.add('hide');
          document.getElementById('checkdaystime' + itemworkk.holidayId)?.classList.add('hide');
        }
        if (itemworkk.observeAsWorkDay == true) {
          itemworkk.dayyesrule = true;
          itemworkk.daynorule = false;
        } else {
          itemworkk.dayyesrule = false;
          itemworkk.daynorule = true;
        }

        if (itemworkk.alternateObservation == 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday') {
          itemworkk.observation1rule = true;
        } else if (itemworkk.alternateObservation == 'Observes Saturday Holidays on Previous Workday') {
          itemworkk.observation2rule = true;
        } else if (itemworkk.alternateObservation == 'Observes Sunday Holidays on Next Workday') {
          itemworkk.observation3rule = true;
        } else if (itemworkk.alternateObservation == 'Does Not Observe on an Alternate Workday') {
          itemworkk.observation4rule = true;
        }

        if (itemworkk.ruleSetting == 'Standard Reoccurrence') {
          itemworkk.standardrule = true;
          itemworkk.customerule = false;
          itemworkk.norule = false;
        } else if (itemworkk.ruleSetting == 'Custom Reoccurrence') {
          itemworkk.customerule = true;
          itemworkk.standardrule = false;
          itemworkk.norule = false;
        } else if (itemworkk.ruleSetting == 'No Reoccurrence') {
          itemworkk.norule = true;
          itemworkk.customerule = false;
          itemworkk.standardrule = false;
        }
        if (itemworkk.repeatEveryTimeline == 'Year') {
          itemworkk.yearrule = true;
          itemworkk.monthrule = false;
          itemworkk.weekrule = false;
          itemworkk.dayrule = false;
        } else if (itemworkk.repeatEveryTimeline == 'Month') {
          itemworkk.yearrule = false;
          itemworkk.monthrule = true;
          itemworkk.weekrule = false;
          itemworkk.dayrule = false;
        } else if (itemworkk.repeatEveryTimeline == 'Week') {
          itemworkk.yearrule = false;
          itemworkk.monthrule = false;
          itemworkk.weekrule = true;
          itemworkk.dayrule = false;
        } else if (itemworkk.repeatEveryTimeline == 'day') {
          itemworkk.yearrule = false;
          itemworkk.monthrule = false;
          itemworkk.weekrule = false;
          itemworkk.dayrule = true;
        }
        if (itemworkk.dayOfWeek == 'Sunday') {
          itemworkk.sundayrule = true;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Monday') {
          itemworkk.mondayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Tuesday') {
          itemworkk.tuesdayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Wednesday') {
          itemworkk.wednesdayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Thursday') {
          itemworkk.thursdayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.fridayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Friday') {
          itemworkk.fridayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.saturdayrule = false;
        } else if (itemworkk.dayOfWeek == 'Saturday') {
          itemworkk.saturdayrule = true;
          itemworkk.sundayrule = false;
          itemworkk.mondayrule = false;
          itemworkk.tuesdayrule = false;
          itemworkk.wednesdayrule = false;
          itemworkk.thursdayrule = false;
          itemworkk.fridayrule = false;
        }
        if (itemworkk.isImported == true) {
          this.holidays.push(itemworkk);
        }
      });
    });
    console.log('Holiday', this.holidays);
    let a = 1;
    const intervalset = setInterval(() => {
      a++;
      if (a == 4) {
        clearInterval(intervalset);
        this.callingfasle();
      } else {
        this.callingfasle();
      }
    }, 500);
  }
  activeadd() {
    this.child.addwork();
    document.getElementById('activeadded')?.click()
  }
  alterobservationedit(id: any, workhour: any) {
    if (this.activedropdown == false) {
      this.observationactive = true;
      this.movingup = true;
      this.movingdown = true;
      this.ruleactive = true;
      this.hournumber = id;
      document.getElementById('hourbuttondaystime' + id)?.classList.add('hide');
      document.getElementById('hourcheckdaystime' + id)?.classList.remove('hide');
      document.getElementById('hourdaystime' + id)?.classList.remove('hide');
      this.holidays.forEach((val: any) => {
        val.incrementobservationdays = false;
        if (val.holidayId != id) {
          this.alterobservationcheck(val.holidayId);
          if (val.observeAsWorkDay == false) {
            document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdaystime' + val.holidayId)?.classList.add('hide');
          }
        }
      });
      this.observation.forEach((val2: any) => {
        if (val2.day == workhour) {
          document.getElementById('mworkinghour' + id + val2.id)?.classList.add('active');
          this.movedownward = val2.id;
        }
      });


    }

  }
  alterobservationcheck(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.observationnumber == 'N/A') {

        } else {
          document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.remove('hide');
          document.getElementById('hourcheckdaystime' + val.holidayId)?.classList.add('hide');
          document.getElementById('hourdaystime' + val.holidayId)?.classList.add('hide');
          this.observation.forEach((val2: any) => {
            document.getElementById('mworkinghour' + val.holidayId + val2.id)?.classList.remove('active');
            document.getElementById('mworkinghour' + val.holidayId + val2.id)?.classList.remove('active1');
            document.getElementById('hoverhour' + val.holidayId + val2.id)?.classList.remove('hoverday');
          });
        }
      }

    });

  }

  switchalterobservation(id: any, workhour: any) {
    if (this.observationactive == false) {
      this.observationactive = true;
      this.alterobservationedit(id, workhour);
      this.holidays.forEach((val: any) => {
        this.namecheck(val.holidayId);
        this.numberobservationclose(val.holidayId);
        if (val.holidayId != id) {
          this.alterobservationcheck(val.holidayId);

        }
      });
    } else {
      this.ruleactive = false;
      this.observationactive = false;
      this.movingup = false;
      this.movingdown = false;
      this.alterobservationcheck(id);

    }
  }
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  minnumber(event: any) {
    if (event.length >= 2) {
      event.preventDefault();
    } else {

    }
  }
  moveupobserv() {
    if (this.movingup == true) {
      this.movedownward--;
      if (this.movedownward <= 1) {
        this.movedownward = 1;
      }
      this.observation.forEach((val: any) => {
        if (this.movedownward == val.id) {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.add('hoverday');
        } else {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
          document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
        }
      });
    }

  }
  movedownobserv() {
    if (this.movingup == true) {
      this.movedownward++;
      if (this.movedownward >= 4) {
        this.movedownward = 4;
      }
      this.observation.forEach((val: any) => {
        if (this.movedownward == val.id) {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.add('hoverday');
        } else {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
          document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
        }
      });
    }

  }
  hoverclickobserv() {
    if (this.movingup == true) {
      this.observation.forEach((val: any) => {
        if (this.movedownward == val.id) {
          this.alterobservationupdate(this.hournumber, val.day)
          this.alterobservationcheck(this.hournumber);
          this.movingup = false;
          this.movingdown = false;
        }
      });
    }
  }
  mousehoverin() {
    if (this.movingdown == true) {
      this.movingup = false;
      document.getElementById('hoverhour' + this.hournumber + this.movedownward)?.classList.remove('hoverday');
      this.observation.forEach((val: any) => {

        document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');

      });

    }

  }
  mousehoverout() {
    if (this.movingdown == true) {
      this.movingup = true;
      this.observation.forEach((val: any) => {
        if (this.movedownward == val.id) {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.add('hoverday');
        } else {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
          document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
        }

      });

    }

  }
  alterobservationupdate(id: any, alternateObservation: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        this.ruleactive = false;
        val.alternateday = alternateObservation;
        val.alternateObservation = alternateObservation;
        val.valternateObservation = alternateObservation;
      }
    });
    this.alterobservationcheck(id);
    let updateCon = {
      "holidayId": id,
      "alternateObservation": alternateObservation,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated", val);

    });
  }
  increment(id: any) {
    this.numbervalue++;
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.incrementobservationdays = true;
        this.numberincrement = id;
        val.vobserveNumberOfDays = this.numbervalue;
        val.observeNumberOfDays = this.numbervalue;
        if (val.observeNumberOfDays == 1) {
          val.observationnumber = '01';
        } else if (val.observeNumberOfDays == 2) {
          val.observationnumber = '02';
        } else if (val.observeNumberOfDays == 3) {
          val.observationnumber = '03';
        } else if (val.observeNumberOfDays == 4) {
          val.observationnumber = '04';
        } else if (val.observeNumberOfDays == 5) {
          val.observationnumber = '05';
        } else if (val.observeNumberOfDays == 6) {
          val.observationnumber = '06';
        } else if (val.observeNumberOfDays == 7) {
          val.observationnumber = '07';
        } else if (val.observeNumberOfDays == 8) {
          val.observationnumber = '08';
        } else if (val.observeNumberOfDays == 9) {
          val.observationnumber = '09';
        } else if (val.observeNumberOfDays >= 10) {
          val.observationnumber = this.numbervalue;
        }
        if (val.observeNumberOfDays == 1) {
          document.getElementById('buttondays1time' + id)?.classList.add('opacityarrow');
          document.getElementById('buttondaystime' + id)?.classList.add('opacityarrow');
        } else {
          document.getElementById('buttondays1time' + id)?.classList.remove('opacityarrow');
          document.getElementById('buttondaystime' + id)?.classList.remove('opacityarrow');
        }
      } else {
        val.incrementobservationdays = false;
      }
    });
    let updateCon = {
      "holidayId": id,
      "observeNumberOfDays": this.numbervalue,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated", val);

    });


  }
  numberobservationcoulmn(id: any) {
    if (this.activedropdown == false) {

      this.observationactive = false;
      this.ruleactive = true;
      this.holidays.forEach((val: any) => {
        this.namecheck(val.holidayId);

        this.alterobservationcheck(val.holidayId);
        if (val.holidayId != id) {
          this.numberobservationclose(val.holidayId);
        }
      });
      this.movingup = false;
      this.movingdown = false;

      this.holidays.forEach((val: any) => {
        this.observationdaynumberid = id;
        if (val.holidayId == id) {
          if (val.observationnumber == 'N/A') {
            this.ruleactive = false;
            val.incrementobservationdays = false;
            document.getElementById('hourworkdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('hourworkdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('workdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('workdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondays1time' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdays1time' + val.holidayId)?.classList.add('hide');
          } else {
            document.getElementById('workdayseletexttime' + id)?.classList.remove('hide');
            document.getElementById('workdayseletexttimetext' + id)?.classList.add('hide');
            document.getElementById('buttondays1time' + id)?.classList.remove('hide');
            document.getElementById('buttondaystime' + id)?.classList.add('hide');
            document.getElementById('checkdays1time' + id)?.classList.remove('hide');
            document.getElementById('checkdaystime' + id)?.classList.add('hide');
            val.incrementobservationdays = true;
            this.observationdaynumber = true;
            this.numberincrement = id;
            this.numbervalue = val.observationnumber;
            document.getElementById('workdayseletexttime' + id)?.focus();
          }

        } else {
          if (val.observationnumber == 'N/A') {
            val.incrementobservationdays = false;
            document.getElementById('hourworkdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('hourworkdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('workdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('workdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondays1time' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdays1time' + val.holidayId)?.classList.add('hide');
          } else {
            val.incrementobservationdays = false;
            document.getElementById('workdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('workdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('buttondays1time' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.remove('hide');
            document.getElementById('checkdays1time' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdaystime' + val.holidayId)?.classList.remove('hide');
            document.getElementById('workdayseletexttime' + id)?.focus();
          }

        }
      });

    }
  }
  numberobservationclose(id: any) {
    if (this.activedropdown == false) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          if (val.observationnumber == 'N/A') {
            val.incrementobservationdays = false;
            this.observationdaynumber = false;
            document.getElementById('hourworkdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('hourworkdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('workdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('workdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondays1time' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdays1time' + val.holidayId)?.classList.add('hide');
          } else {
            val.incrementobservationdays = false;
            this.observationdaynumber = false;
            document.getElementById('workdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('workdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondays1time' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.remove('hide');
            document.getElementById('checkdays1time' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdaystime' + val.holidayId)?.classList.remove('hide');
            if (val.observeNumberOfDays == 1) {
              val.observationnumber = '01';
            } else if (val.observeNumberOfDays == 2) {
              val.observationnumber = '02';
            } else if (val.observeNumberOfDays == 3) {
              val.observationnumber = '03';
            } else if (val.observeNumberOfDays == 4) {
              val.observationnumber = '04';
            } else if (val.observeNumberOfDays == 5) {
              val.observationnumber = '05';
            } else if (val.observeNumberOfDays == 6) {
              val.observationnumber = '06';
            } else if (val.observeNumberOfDays == 7) {
              val.observationnumber = '07';
            } else if (val.observeNumberOfDays == 8) {
              val.observationnumber = '08';
            } else if (val.observeNumberOfDays == 9) {
              val.observationnumber = '09';
            } else if (val.observeNumberOfDays >= 10) {
              val.observationnumber = val.observeNumberOfDays;
            }
          }
        }

      });
    }

  }

  onchangenumber(event: any, id: any) {

    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        this.numbervalue = event;
        val.vobserveNumberOfDays = this.numbervalue;
        val.observeNumberOfDays = this.numbervalue;

        // if (val.observeNumberOfDays == 0) {
        //   val.observationnumber = '01';
        //   val.observeNumberOfDays = 1;
        // }
        if (val.observeNumberOfDays == 1 || val.observeNumberOfDays == 0) {

          if (val.observeNumberOfDays == 1) {
            document.getElementById('buttondays1time' + id)?.classList.add('opacityarrow');
            document.getElementById('buttondaystime' + id)?.classList.add('opacityarrow');
          } else {
            document.getElementById('buttondays1time' + id)?.classList.remove('opacityarrow');
            document.getElementById('buttondaystime' + id)?.classList.remove('opacityarrow');
          }
        } else {
          document.getElementById('buttondays1time' + id)?.classList.remove('opacityarrow');
          document.getElementById('buttondaystime' + id)?.classList.remove('opacityarrow');
          val.observationnumber = this.numbervalue;

        }
        let updateCon = {
          "holidayId": id,
          "observeNumberOfDays": this.numbervalue,
        };
        this.library.update(updateCon).subscribe((val) => {
          console.log("updated", val);

        });
      }
    });
  }
  incrementid(id: any) {
    if (this.observationdaynumber == true) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id && val.incrementobservationdays == true) {


          console.log(this.numbervalue)
          this.numbervalue++;
          val.vobserveNumberOfDays = this.numbervalue;
          val.observeNumberOfDays = this.numbervalue;
          if (val.observeNumberOfDays == 1) {
            val.observationnumber = '01';
          } else if (val.observeNumberOfDays == 2) {
            val.observationnumber = '02';
          } else if (val.observeNumberOfDays == 3) {
            val.observationnumber = '03';
          } else if (val.observeNumberOfDays == 4) {
            val.observationnumber = '04';
          } else if (val.observeNumberOfDays == 5) {
            val.observationnumber = '05';
          } else if (val.observeNumberOfDays == 6) {
            val.observationnumber = '06';
          } else if (val.observeNumberOfDays == 7) {
            val.observationnumber = '07';
          } else if (val.observeNumberOfDays == 8) {
            val.observationnumber = '08';
          } else if (val.observeNumberOfDays == 9) {
            val.observationnumber = '09';
          } else if (val.observeNumberOfDays >= 10) {
            val.observationnumber = this.numbervalue;
          }
          if (val.observeNumberOfDays == 1) {
            document.getElementById('buttondays1time' + id)?.classList.add('opacityarrow');
            document.getElementById('buttondaystime' + id)?.classList.add('opacityarrow');
          } else {
            document.getElementById('buttondays1time' + id)?.classList.remove('opacityarrow');
            document.getElementById('buttondaystime' + id)?.classList.remove('opacityarrow');
            let a = 0;
            const interval = setInterval(() => {
              a++;
              if (a == 2) {
                clearInterval(interval);
                document.getElementById('checkdays1time' + id)?.classList.add('check8');
                document.getElementById('checkdays1time' + id)?.classList.remove('check10');

              } else {
                document.getElementById('checkdays1time' + id)?.classList.remove('check8');
                document.getElementById('checkdays1time' + id)?.classList.add('check10');
              }
            }, 200);
          }
          let updateCon = {
            "holidayId": id,
            "observeNumberOfDays": this.numbervalue,
          };
          this.library.update(updateCon).subscribe((val) => {
            console.log("updated", val);

          });

        }
      });

    }
  }
  decrementid(id: any) {
    if (this.observationdaynumber == true) {
      this.holidays.forEach((val: any) => {

        if (val.holidayId == id && val.incrementobservationdays == true) {

          this.numbervalue--;
          if (this.numbervalue <= 1) {
            this.numbervalue = 1;
          }
          val.vobserveNumberOfDays = this.numbervalue;
          val.observeNumberOfDays = this.numbervalue;
          if (val.observeNumberOfDays == 1) {
            val.observationnumber = '01';
          } else if (val.observeNumberOfDays == 2) {
            val.observationnumber = '02';
          } else if (val.observeNumberOfDays == 3) {
            val.observationnumber = '03';
          } else if (val.observeNumberOfDays == 4) {
            val.observationnumber = '04';
          } else if (val.observeNumberOfDays == 5) {
            val.observationnumber = '05';
          } else if (val.observeNumberOfDays == 6) {
            val.observationnumber = '06';
          } else if (val.observeNumberOfDays == 7) {
            val.observationnumber = '07';
          } else if (val.observeNumberOfDays == 8) {
            val.observationnumber = '08';
          } else if (val.observeNumberOfDays == 9) {
            val.observationnumber = '09';
          } else if (val.observeNumberOfDays >= 10) {
            val.observationnumber = this.numbervalue;
          }
          if (val.observeNumberOfDays == 1) {
            document.getElementById('buttondays1time' + id)?.classList.add('opacityarrow');
            document.getElementById('buttondaystime' + id)?.classList.add('opacityarrow');
          } else {
            document.getElementById('buttondays1time' + id)?.classList.remove('opacityarrow');
            document.getElementById('buttondaystime' + id)?.classList.remove('opacityarrow');
            let a = 0;
            const interval = setInterval(() => {
              a++;
              if (a == 2) {
                clearInterval(interval);
                document.getElementById('buttondays1time' + id)?.classList.add('edit8');
                document.getElementById('buttondays1time' + id)?.classList.remove('edit10');

              } else {
                document.getElementById('buttondays1time' + id)?.classList.remove('edit8');
                document.getElementById('buttondays1time' + id)?.classList.add('edit10');
              }
            }, 200);
          }
          let updateCon = {
            "holidayId": id,
            "observeNumberOfDays": this.numbervalue,
          };
          this.library.update(updateCon).subscribe((val) => {
            console.log("updated", val);

          });
        }
      });

    }

  }
  decrement(id: any) {
    this.numbervalue--;
    if (this.numbervalue <= 1) {
      this.numbervalue = 1;
    }
    this.holidays.forEach((val: any) => {

      if (val.holidayId == id) {
        val.incrementobservationdays = true;
        this.numberincrement = id;
        val.vobserveNumberOfDays = this.numbervalue;
        val.observeNumberOfDays = this.numbervalue;
        if (val.observeNumberOfDays == 1) {
          val.observationnumber = '01';
        } else if (val.observeNumberOfDays == 2) {
          val.observationnumber = '02';
        } else if (val.observeNumberOfDays == 3) {
          val.observationnumber = '03';
        } else if (val.observeNumberOfDays == 4) {
          val.observationnumber = '04';
        } else if (val.observeNumberOfDays == 5) {
          val.observationnumber = '05';
        } else if (val.observeNumberOfDays == 6) {
          val.observationnumber = '06';
        } else if (val.observeNumberOfDays == 7) {
          val.observationnumber = '07';
        } else if (val.observeNumberOfDays == 8) {
          val.observationnumber = '08';
        } else if (val.observeNumberOfDays == 9) {
          val.observationnumber = '09';
        } else if (val.observeNumberOfDays >= 10) {
          val.observationnumber = this.numbervalue;
        }

        if (val.observeNumberOfDays == 1) {
          document.getElementById('buttondays1time' + id)?.classList.add('opacityarrow');
          document.getElementById('buttondaystime' + id)?.classList.add('opacityarrow');
        } else {
          document.getElementById('buttondays1time' + id)?.classList.remove('opacityarrow');
          document.getElementById('buttondaystime' + id)?.classList.remove('opacityarrow');
        }
      } else {
        val.incrementobservationdays = false;
      }

    });
    let updateCon = {
      "holidayId": id,
      "observeNumberOfDays": this.numbervalue,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated", val);
    });

  }
  observationedit(id: any) {
    if (this.activedropdown == false) {
      document.getElementById('holidayarrowup' + id)?.classList.add('hide');
      document.getElementById('holidayarrowdown' + id)?.classList.remove('hide');
      this.holidays.forEach((val: any) => {
        val.incrementobservationdays = false;
        if (val.holidayId != id) {
          this.observationcheck(val.holidayId);
        }
      });
      this.editholiday = [];
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          this.editholiday.push(val);
        }
      });
      let a = 1;
      const interval = setInterval(() => {
        a++;
        if (a == 2) {
          clearInterval(interval);
          this.activeeditweek();
        } else {
          this.activeeditweek();
        }
      }, 200);
    }

  }
  observationcheck(id: any) {
    document.getElementById('holidayarrowup' + id)?.classList.remove('hide');
    document.getElementById('holidayarrowdown' + id)?.classList.add('hide');
  }
  switchobservation(id: any) {
    if (this.activedropdown == false) {
      document.getElementById('holidayarrowup' + id)?.click();
      this.observationedit(id);
    } else {

      this.observationcheck(id);
    }
  }
  closeall() {
    this.holidays.forEach((val: any) => {
      val.incrementobservationdays = false;
      this.ruleactive = false;
      this.observationcheck(val.holidayId);
      this.alterobservationcheck(val.holidayId);
      this.namecheck(val.holidayId);
      this.numberobservationclose(val.holidayId);
    });
  }
  // View popup

  //Expire Dropdown

  expireedit(id: any, workday: any) {
    if (this.activedrop == false) {
      this.activedrop = true;
      this.arrowexpire = true;
      this.hoverexpire = true;
      this.expireenternumber = id;
      document.getElementById('holiday1arrowup')?.classList.add('hide');
      document.getElementById('holiday1arrowdown')?.classList.remove('hide');
      document.getElementById('holiday1list')?.classList.remove('hide');
    }
    this.expireOptionList.forEach((val2: any) => {
      if (val2.value == workday) {
        this.movingexpire = val2.id;
        this.movingexpirename = workday;
        document.getElementById('swtchexpirelist' + val2.id)?.classList.add('active');
      }
    });
  }
  expirecheck() {
    this.activedrop = false;
    this.arrowexpire = false;
    this.hoverexpire = false;
    document.getElementById('holiday1arrowup')?.classList.remove('hide');
    document.getElementById('holiday1arrowdown')?.classList.add('hide');
    document.getElementById('holiday1list')?.classList.add('hide');
    this.expireOptionList.forEach((val2: any) => {
      document.getElementById('swtchexpirelist' + val2.id)?.classList.remove('active1');
      document.getElementById('swtchexpirelist' + val2.id)?.classList.remove('active');
      document.getElementById('swtchexpirelist' + val2.id)?.classList.remove('hoverday');

    });
  }
  switchexpire(id: any, workday: any) {
    if (this.activedrop == false) {
      this.expireedit(id, workday);
    } else {
      this.expirecheck();
    }
  }

  moveupexpire() {
    if (this.arrowexpire == true) {
      this.movingexpire -= 1;
      if (this.movingexpire <= 1) {
        this.movingexpire = 1;
      }
      this.expireOptionList.forEach((val2: any) => {
        if (val2.id == this.movingexpire) {
          document.getElementById('swtchexpirelist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtchexpirelist' + val2.id)?.classList.add('active1');
          document.getElementById('swtchexpirelist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  movedownexpire() {
    if (this.arrowexpire == true) {
      this.movingexpire += 1;
      if (this.movingexpire >= 3) {
        this.movingexpire = 3;
      }
      this.expireOptionList.forEach((val2: any) => {
        if (val2.id == this.movingexpire) {
          document.getElementById('swtchexpirelist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtchexpirelist' + val2.id)?.classList.add('active1');
          document.getElementById('swtchexpirelist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  enterexpire() {
    if (this.arrowexpire == true) {
      this.expireOptionList.forEach((val2: any) => {
        if (val2.id == this.movingexpire) {
          this.updateexpire(this.expireenternumber, val2.value);
        }
      });
      this.expirecheck();
    }
  }
  mouseupexpire() {
    if (this.hoverexpire == true) {
      this.arrowexpire = false;
      document.getElementById('swtchexpirelist' + this.movingexpire)?.classList.remove('hoverday');
      this.expireOptionList.forEach((val2: any) => {
        document.getElementById('swtchexpirelist' + val2.id)?.classList.add('active1');
      });
    }
  }
  mousedownexpire() {
    if (this.hoverexpire == true) {
      this.arrowexpire = true;
      this.expireOptionList.forEach((val2: any) => {
        if (val2.name == this.movingexpirename) {
          this.movingexpire = val2.id;
          document.getElementById('swtchexpirelist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  updateexpire(id: any, expirevalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vexpire = expirevalue;
        this.activelowerbtn();
      }
    });
    this.expirecheck();
    if (expirevalue == 'Never') {
      document.getElementById('textexpire1year')?.classList.add('hide');
      document.getElementById('textexpire2year')?.classList.add('hide');
      document.getElementById('textexpire1event')?.classList.add('hide');
      document.getElementById('textexpire2event')?.classList.add('hide');
    } else if (expirevalue == 'In Year') {
      document.getElementById('textexpire1event')?.classList.add('hide');
      document.getElementById('textexpire2event')?.classList.add('hide');
      document.getElementById('textexpire1year')?.classList.remove('hide');
      document.getElementById('textexpire2year')?.classList.remove('hide');
      document.getElementById('textexpire2year')?.focus();
    } else {
      document.getElementById('textexpire1year')?.classList.add('hide');
      document.getElementById('textexpire2year')?.classList.add('hide');
      document.getElementById('textexpire1event')?.classList.remove('hide');
      document.getElementById('textexpire2event')?.classList.remove('hide');
      document.getElementById('textexpire1event')?.focus();
    }
  }

  //Week Dropdown

  weekedit(id: any, workday: any) {
    if (this.activedrop == false) {
      this.activedrop = true;
      this.arrowweek = true;
      this.hoverweek = true;
      this.weekenternumber = id;
      document.getElementById('holiday2arrowup')?.classList.add('hide');
      document.getElementById('holiday2arrowdown')?.classList.remove('hide');
      document.getElementById('holiday2list')?.classList.remove('hide');
      if (workday == '1st') {
        this.movingweekname = 'First';
      } else if (workday == '2nd') {
        this.movingweekname = 'Second';
      } else if (workday == '3rd') {
        this.movingweekname = 'Third';
      } else if (workday == '4th') {
        this.movingweekname = 'Fourth';
      } else if (workday == '5th') {
        this.movingweekname = 'Fifth';
      } else if (workday == 'Last') {
        this.movingweekname = 'Last';
      }
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.name == this.movingweekname) {
          this.movingweek = val2.id;
          document.getElementById('swtchweeklist' + val2.id)?.classList.add('active');
        }
      });
    }

  }
  weekcheck() {
    this.activedrop = false;
    this.arrowweek = false;
    this.hoverweek = false;
    document.getElementById('holiday2arrowup')?.classList.remove('hide');
    document.getElementById('holiday2arrowdown')?.classList.add('hide');
    document.getElementById('holiday2list')?.classList.add('hide');
    this.onTheOptionList.forEach((val2: any) => {
      document.getElementById('swtchweeklist' + val2.id)?.classList.remove('active1');
      document.getElementById('swtchweeklist' + val2.id)?.classList.remove('active');
      document.getElementById('swtchweeklist' + val2.id)?.classList.remove('hoverday');

    });
  }
  switchweek(id: any, workday: any) {
    if (this.activedrop == false) {
      this.weekedit(id, workday);
    } else {
      this.weekcheck();
    }
  }
  moveupweek() {
    if (this.arrowweek == true) {
      this.movingweek -= 1;
      if (this.movingweek <= 1) {
        this.movingweek = 1;
      }
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.id == this.movingweek) {
          document.getElementById('swtchweeklist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtchweeklist' + val2.id)?.classList.add('active1');
          document.getElementById('swtchweeklist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  movedownweek() {
    if (this.arrowweek == true) {
      this.movingweek += 1;
      if (this.movingweek >= 6) {
        this.movingweek = 6;
      }
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.id == this.movingweek) {
          document.getElementById('swtchweeklist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtchweeklist' + val2.id)?.classList.add('active1');
          document.getElementById('swtchweeklist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  enterweek() {
    if (this.arrowweek == true) {
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.id == this.movingweek) {
          this.updateweek(this.weekenternumber, val2.name);
        }
      });
      this.weekcheck();
    }
  }
  mouseupweek() {
    if (this.hoverweek == true) {
      this.arrowweek = false;
      document.getElementById('swtchweeklist' + this.movingweek)?.classList.remove('hoverday');
      this.onTheOptionList.forEach((val2: any) => {
        document.getElementById('swtchweeklist' + val2.id)?.classList.add('active1');
      });
    }
  }
  mousedownweek() {
    if (this.hoverweek == true) {
      this.arrowweek = true;
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.name == this.movingweekname) {
          this.movingweek = val2.id;
          document.getElementById('swtchweeklist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  updateweek(id: any, weekvalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        this.weekeditvalue = weekvalue;
        this.movingweekname = weekvalue;
        if (weekvalue == 'First') {
          val.vweeekOfMonth = '1st'
        } else if (weekvalue == 'Second') {
          val.vweeekOfMonth = '2nd'
        } else if (weekvalue == 'Third') {
          val.vweeekOfMonth = '3rd'
        } else if (weekvalue == 'Fourth') {
          val.vweeekOfMonth = '4th'
        } else if (weekvalue == 'Fifth') {
          val.vweeekOfMonth = '5th'
        } else {
          val.vweeekOfMonth = weekvalue;
        }
        val.vdateOfMonth = '';
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
        this.activelowerbtn();
      }
    });
    this.weekcheck();
    this.onTheOptionList = [];
    this.onTheOptionLists.forEach((val1: any) => {
      this.onTheOptionList.push(val1);
    });
    this.catogery1active = false;
    this.catogery2active = true;
    document.getElementById('textor')?.classList.add('opacitycolour');
    document.getElementById('row2box3')?.classList.remove('hide');
    document.getElementById('row2box2')?.classList.add('hide');
  }

  //Month dropdown

  monthedit(id: any, workday: any) {
    if (this.activedrop == false) {
      this.activedrop = true;
      this.arrowmonth = true;
      this.hovermonth = true;
      this.monthenternumber = id;
      document.getElementById('holiday3arrowup')?.classList.add('hide');
      document.getElementById('holiday3arrowdown')?.classList.remove('hide');
      document.getElementById('holiday3list')?.classList.remove('hide');
      this.monthOptionList.forEach((val2: any) => {
        if (val2.name == workday) {
          this.movingmonth = val2.id;
          this.movingmonthname = workday;
          document.getElementById('swtchmonthlist' + val2.id)?.classList.add('active');
        }
      });
    }

  }
  monthcheck() {
    this.activedrop = false;
    this.arrowmonth = false;
    this.hovermonth = false;
    document.getElementById('holiday3arrowup')?.classList.remove('hide');
    document.getElementById('holiday3arrowdown')?.classList.add('hide');
    document.getElementById('holiday3list')?.classList.add('hide');
    this.monthOptionList.forEach((val2: any) => {
      document.getElementById('swtchmonthlist' + val2.id)?.classList.remove('active1');
      document.getElementById('swtchmonthlist' + val2.id)?.classList.remove('active');
      document.getElementById('swtchmonthlist' + val2.id)?.classList.remove('hoverday');
    });
  }

  switchmonth(id: any, workday: any) {
    if (this.activedrop == false) {
      this.monthedit(id, workday);
    } else {
      this.monthcheck();
    }
  }
  moveupmonth() {
    if (this.arrowmonth == true) {
      this.movingmonth -= 1;
      if (this.movingmonth <= 1) {
        this.movingmonth = 1;
      }
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.movingmonth) {
          document.getElementById('swtchmonthlist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtchmonthlist' + val2.id)?.classList.add('active1');
          document.getElementById('swtchmonthlist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  movedownmonth() {
    if (this.arrowmonth == true) {
      this.movingmonth += 1;
      if (this.movingmonth >= 12) {
        this.movingmonth = 12;
      }
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.movingmonth) {
          document.getElementById('swtchmonthlist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtchmonthlist' + val2.id)?.classList.add('active1');
          document.getElementById('swtchmonthlist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  entermonth() {
    if (this.arrowmonth == true) {
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.movingmonth) {
          this.updatemonth(this.monthenternumber, val2.name);
        }
      });
      this.monthcheck();
    }
  }
  mouseupmonth() {
    if (this.hovermonth == true) {
      this.arrowmonth = false;
      document.getElementById('swtchmonthlist' + this.movingmonth)?.classList.remove('hoverday');
      this.monthOptionList.forEach((val2: any) => {
        document.getElementById('swtchmonthlist' + val2.id)?.classList.add('active1');
      });
    }
  }
  mousedownmonth() {
    if (this.hovermonth == true) {
      this.arrowmonth = true;
      this.monthOptionList.forEach((val2: any) => {
        if (val2.name == this.movingmonthname) {
          this.movingmonth = val2.id;
          document.getElementById('swtchmonthlist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  updatemonth(id: any, monthvalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vmonth = monthvalue;
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
        this.activelowerbtn();
      }
    });
    this.monthcheck();
    this.monthOptionList = [];
    this.monthOptionLists.forEach((val1: any) => {
      this.monthOptionList.push(val1);
    });
    this.catogery1active = false;
    this.catogery2active = true;
    document.getElementById('textor')?.classList.add('opacitycolour');
    document.getElementById('row2box3')?.classList.remove('hide');
    document.getElementById('row2box2')?.classList.add('hide');
  }

  //Month2 dropdown

  month2edit(id: any, workday: any) {
    if (this.activedrop == false) {
      this.activedrop = true;
      this.arrow2month = true;
      this.hover2month = true;
      this.month2enternumber = id;
      document.getElementById('holiday4arrowup')?.classList.add('hide');
      document.getElementById('holiday4arrowdown')?.classList.remove('hide');
      document.getElementById('holiday4list')?.classList.remove('hide');
      this.monthOptionList.forEach((val2: any) => {
        if (val2.name == workday) {
          this.moving2month = val2.id;
          this.moving2monthname = workday;
          document.getElementById('swtch2monthlist' + val2.id)?.classList.add('active');
        }
      });
    }

  }
  month2check() {
    this.activedrop = false;
    this.arrow2month = false;
    this.hover2month = false;
    document.getElementById('holiday4arrowup')?.classList.remove('hide');
    document.getElementById('holiday4arrowdown')?.classList.add('hide');
    document.getElementById('holiday4list')?.classList.add('hide');
    this.monthOptionList.forEach((val2: any) => {
      document.getElementById('swtch2monthlist' + val2.id)?.classList.remove('active1');
      document.getElementById('swtch2monthlist' + val2.id)?.classList.remove('active');
      document.getElementById('swtch2monthlist' + val2.id)?.classList.remove('hoverday');
    });
  }
  switch2month(id: any, workday: any) {
    if (this.activedrop == false) {
      this.month2edit(id, workday);
    } else {
      this.month2check();
    }
  }
  moveup2month() {
    if (this.arrow2month == true) {
      this.moving2month -= 1;
      if (this.moving2month <= 1) {
        this.moving2month = 1;
      }
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.moving2month) {
          document.getElementById('swtch2monthlist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtch2monthlist' + val2.id)?.classList.add('active1');
          document.getElementById('swtch2monthlist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  movedown2month() {
    if (this.arrow2month == true) {
      this.moving2month += 1;
      if (this.moving2month >= 12) {
        this.moving2month = 12;
      }
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.moving2month) {
          document.getElementById('swtch2monthlist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtch2monthlist' + val2.id)?.classList.add('active1');
          document.getElementById('swtch2monthlist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  enter2month() {
    if (this.arrow2month == true) {
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.moving2month) {
          this.update2month(this.month2enternumber, val2.name);
        }
      });
      this.month2check();
    }
  }
  mouseup2month() {
    if (this.hover2month == true) {
      this.arrow2month = false;
      document.getElementById('swtch2monthlist' + this.moving2month)?.classList.remove('hoverday');
      this.monthOptionList.forEach((val2: any) => {
        document.getElementById('swtch2monthlist' + val2.id)?.classList.add('active1');
      });
    }
  }
  mousedown2month() {
    if (this.hover2month == true) {
      this.arrow2month = true;
      this.monthOptionList.forEach((val2: any) => {
        if (val2.name == this.moving2monthname) {
          this.moving2month = val2.id;
          document.getElementById('swtch2monthlist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  update2month(id: any, monthvalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vmonth = monthvalue;
        this.activelowerbtn();
        val.vobservationDayMethod = 'Always on ' + val.vmonth + ' ' + val.vdateOfMonth;
        if (val.observation1rule == true) {
          this.catogery1active = true;
          this.catogery2active = false;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row1box3')?.classList.remove('hide');
          document.getElementById('row1box2')?.classList.add('hide');
        } else {
          this.catogery1active = true;
          this.catogery2active = false;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row1box3')?.classList.remove('hide');
          document.getElementById('row1box2')?.classList.add('hide');
          val.observation1rule = true;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
          val.valternateObservation = 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday';
        }
      }

    });
    this.month2check();
    this.monthOptionList = [];
    this.monthOptionLists.forEach((val1: any) => {
      this.monthOptionList.push(val1);

    });

  }

  //Date dropdown

  dateedit(id: any, workday: any) {
    if (this.activedrop == false) {
      this.activedrop = true;
      this.arrowdate = true;
      this.hoverdate = true;
      this.dateenternumber = id;
      document.getElementById('holiday5arrowup')?.classList.add('hide');
      document.getElementById('holiday5arrowdown')?.classList.remove('hide');
      document.getElementById('holiday5list')?.classList.remove('hide');
      this.daysOptionList.forEach((val2: any) => {
        if (val2.name == workday) {
          this.movingdate = val2.id;
          this.movingdatename = workday;
          document.getElementById('swtchdatelist' + val2.id)?.classList.add('active');
        }
      });
    }

  }
  datecheck() {
    this.activedrop = false;
    this.arrowdate = false;
    this.hoverdate = false;
    document.getElementById('holiday5arrowup')?.classList.remove('hide');
    document.getElementById('holiday5arrowdown')?.classList.add('hide');
    document.getElementById('holiday5list')?.classList.add('hide');
    this.daysOptionList.forEach((val2: any) => {
      document.getElementById('swtchdatelist' + val2.id)?.classList.remove('active1');
      document.getElementById('swtchdatelist' + val2.id)?.classList.remove('active');
      document.getElementById('swtchdatelist' + val2.id)?.classList.remove('hoverday');
    });
  }

  switchdate(id: any, workday: any) {
    if (this.activedrop == false) {
      this.dateedit(id, workday);
    } else {
      this.datecheck();
    }
  }
  moveupdate() {
    if (this.arrowdate == true) {
      this.movingdate -= 1;
      if (this.movingdate <= 1) {
        this.movingdate = 1;
      }
      this.daysOptionList.forEach((val2: any) => {
        if (val2.id == this.movingdate) {
          document.getElementById('swtchdatelist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtchdatelist' + val2.id)?.classList.add('active1');
          document.getElementById('swtchdatelist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  movedowndate() {
    if (this.arrowdate == true) {
      this.movingdate += 1;
      if (this.movingdate >= 31) {
        this.movingdate = 31;
      }
      this.daysOptionList.forEach((val2: any) => {
        if (val2.id == this.movingdate) {
          document.getElementById('swtchdatelist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('swtchdatelist' + val2.id)?.classList.add('active1');
          document.getElementById('swtchdatelist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  enterdate() {
    if (this.arrowdate == true) {
      this.daysOptionList.forEach((val2: any) => {
        if (val2.id == this.movingdate) {
          this.updatedate(this.dateenternumber, val2.name);
        }
      });
      this.datecheck();
    }
  }
  mouseupdate() {
    if (this.hoverdate == true) {
      this.arrowdate = false;
      document.getElementById('swtchdatelist' + this.movingdate)?.classList.remove('hoverday');
      this.daysOptionList.forEach((val2: any) => {
        document.getElementById('swtchdatelist' + val2.id)?.classList.add('active1');
      });
    }
  }
  mousedowndate() {
    if (this.hoverdate == true) {
      this.arrowdate = true;
      this.daysOptionList.forEach((val2: any) => {
        if (val2.name == this.movingdatename) {
          this.movingdate = val2.id;
          document.getElementById('swtchdatelist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  updatedate(id: any, datevalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vdateOfMonth = datevalue;
        val.vweeekOfMonth = '';
        val.vdayOfWeek = '';
        val.vobservationDayMethod = 'Always on ' + val.vmonth + ' ' + val.vdateOfMonth;
        if (val.observation1rule == true) {
          this.catogery1active = true;
          this.catogery2active = false;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row1box3')?.classList.remove('hide');
          document.getElementById('row1box2')?.classList.add('hide');
        } else {
          this.catogery1active = true;
          this.catogery2active = false;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row1box3')?.classList.remove('hide');
          document.getElementById('row1box2')?.classList.add('hide');
          val.observation1rule = true;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
          val.valternateObservation = 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday';
        }
      }

    });
    this.datecheck();
    this.activelowerbtn();
    this.daysOptionList = [];
    this.daysOptionLists.forEach((val1: any) => {
      this.daysOptionList.push(val1);

    });

  }
  holidayeditpopup(id: any) {
    this.singleholiday = [];
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        this.singleholiday.push(val);
      }
    });
    console.log('single', this.singleholiday);
    let a = 1;
    const interval = setInterval(() => {
      a++;
      if (a == 2) {
        clearInterval(interval);
        this.activeweek();
      } else {
        this.activeweek();

      }
    }, 200);
  }
  vpre() {
    this.singleholiday.forEach((val: any) => {
      this.sequencenumber = val.sequence;
    });
    this.sequencenumber -= 1;
    this.holidays.forEach((val1: any) => {
      if (val1.sequence == this.sequencenumber) {
        this.singleholiday = [];
        this.singleholiday.push(val1);
      } else if (this.sequencenumber < 1) {
        this.sequencenumber = this.holidays.length;
        if (val1.sequence == this.sequencenumber) {
          this.singleholiday = [];
          this.singleholiday.push(val1);
        }
      }
    });
    let a = 1;
    const interval = setInterval(() => {
      a++;
      if (a == 2) {
        clearInterval(interval);
        this.activeweek();
      } else {
        this.activeweek();
      }
    }, 200);
  }
  vnext() {
    this.singleholiday.forEach((val: any) => {
      this.sequencenumber = val.sequence;
    });
    this.sequencenumber += 1;

    this.holidays.forEach((val1: any) => {
      if (val1.sequence == this.sequencenumber) {
        this.singleholiday = [];
        this.singleholiday.push(val1);
      } else if (this.sequencenumber > this.holidays.length) {
        this.sequencenumber = 1;
        if (val1.sequence == this.sequencenumber) {
          this.singleholiday = [];
          this.singleholiday.push(val1);
        }
      }
    });
    let a = 1;
    const interval = setInterval(() => {
      a++;
      if (a == 2) {
        clearInterval(interval);
        this.activeweek();
      } else {
        this.activeweek();
      }
    }, 200);
  }

  activelowerbtn() {
    this.activeedit = true;
    document.getElementById('cancelbtncol')?.classList.remove('hide');
    document.getElementById('col1apply')?.classList.remove('hide');
    document.getElementById('col4save')?.classList.remove('hide');
    document.getElementById('col2apply')?.classList.remove('hide');
    document.getElementById('closebtncol')?.classList.add('hide');
    document.getElementById('col3apply')?.classList.add('hide');
    document.getElementById('col4apply')?.classList.add('hide');
    document.getElementById('col4save2')?.classList.add('hide');
  }
  inactivelowerbtn() {
    this.activeedit = false;
    document.getElementById('cancelbtncol')?.classList.add('hide');
    document.getElementById('col1apply')?.classList.add('hide');
    document.getElementById('col4save')?.classList.add('hide');
    document.getElementById('col2apply')?.classList.add('hide');
    document.getElementById('closebtncol')?.classList.remove('hide');
    document.getElementById('col3apply')?.classList.remove('hide');
    document.getElementById('col4apply')?.classList.remove('hide');
    document.getElementById('col4save2')?.classList.remove('hide');
  }
  holidaynameactive(event: any, holidayname: any, id: any) {
    if (event.keyCode == 13) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          if (holidayname != val.eholidayName) {
            this.activelowerbtn();
            val.vholidayName = holidayname;
          } else {
            this.inactivelowerbtn();
          }
        }
      });
    }
  }
  holidaycountactive(event: any, holidaycount: any, id: any) {
    if (event.keyCode == 13) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          if (holidaycount != val.repeatEveryCount) {
            this.activelowerbtn();
            val.vrepeatEveryCount = holidaycount;
          } else {
            this.inactivelowerbtn();
          }
        }
      });
    }
  }

  onchange(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = true;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          this.yearrulerow = true;
          this.monthrulerow = false;
          this.weekrulerow = false;
          this.dayrulerow = false;
          val.vrepeatEveryTimeline = 'Year';
          this.activelowerbtn();
          document.getElementById('yearrowtext')?.classList.remove('opacitycolour');
          document.getElementById('monthrowtext')?.classList.add('opacitycolour');
          document.getElementById('weekrowtext')?.classList.add('opacitycolour');
          document.getElementById('dayrowtext')?.classList.add('opacitycolour');
        }
      });

    } else {
      this.holidays.forEach((val: any) => {
        this.activelowerbtn();
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          this.yearrulerow = true;
          this.monthrulerow = true;
          this.weekrulerow = true;
          this.dayrulerow = true;
          val.vrepeatEveryTimeline = '';
          document.getElementById('yearrowtext')?.classList.remove('opacitycolour');
          document.getElementById('monthrowtext')?.classList.remove('opacitycolour');
          document.getElementById('weekrowtext')?.classList.remove('opacitycolour');
          document.getElementById('dayrowtext')?.classList.remove('opacitycolour');
        }
      });

    }
  }
  on2change(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = true;
          val.weekrule = false;
          val.dayrule = false;
          this.yearrulerow = false;
          this.monthrulerow = true;
          this.weekrulerow = false;
          this.dayrulerow = false;
          val.vrepeatEveryTimeline = 'Month';
          this.activelowerbtn();
          document.getElementById('yearrowtext')?.classList.add('opacitycolour');
          document.getElementById('monthrowtext')?.classList.remove('opacitycolour');
          document.getElementById('weekrowtext')?.classList.add('opacitycolour');
          document.getElementById('dayrowtext')?.classList.add('opacitycolour');
        }
      });

    } else {
      this.holidays.forEach((val: any) => {
        this.activelowerbtn();
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          this.yearrulerow = true;
          this.monthrulerow = true;
          this.weekrulerow = true;
          this.dayrulerow = true;
          val.vrepeatEveryTimeline = '';
          document.getElementById('yearrowtext')?.classList.remove('opacitycolour');
          document.getElementById('monthrowtext')?.classList.remove('opacitycolour');
          document.getElementById('weekrowtext')?.classList.remove('opacitycolour');
          document.getElementById('dayrowtext')?.classList.remove('opacitycolour');
        }
      });

    }
  }
  on3change(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = true;
          val.dayrule = false;
          this.yearrulerow = false;
          this.monthrulerow = false;
          this.weekrulerow = true;
          this.dayrulerow = false;
          val.vrepeatEveryTimeline = 'Week';
          this.activelowerbtn();
          document.getElementById('yearrowtext')?.classList.add('opacitycolour');
          document.getElementById('monthrowtext')?.classList.add('opacitycolour');
          document.getElementById('weekrowtext')?.classList.remove('opacitycolour');
          document.getElementById('dayrowtext')?.classList.add('opacitycolour');
        }
      });

    } else {
      this.holidays.forEach((val: any) => {
        this.activelowerbtn();
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          this.yearrulerow = true;
          this.monthrulerow = true;
          this.weekrulerow = true;
          this.dayrulerow = true;
          val.vrepeatEveryTimeline = '';
          document.getElementById('yearrowtext')?.classList.remove('opacitycolour');
          document.getElementById('monthrowtext')?.classList.remove('opacitycolour');
          document.getElementById('weekrowtext')?.classList.remove('opacitycolour');
          document.getElementById('dayrowtext')?.classList.remove('opacitycolour');
        }
      });

    }
  }
  on4change(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = true;
          this.yearrulerow = false;
          this.monthrulerow = false;
          this.weekrulerow = false;
          this.dayrulerow = true;
          val.vrepeatEveryTimeline = 'Day';
          this.activelowerbtn();
          document.getElementById('yearrowtext')?.classList.add('opacitycolour');
          document.getElementById('monthrowtext')?.classList.add('opacitycolour');
          document.getElementById('weekrowtext')?.classList.add('opacitycolour');
          document.getElementById('dayrowtext')?.classList.remove('opacitycolour');
        }
      });

    } else {
      this.holidays.forEach((val: any) => {
        this.activelowerbtn();
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          this.yearrulerow = true;
          this.monthrulerow = true;
          this.weekrulerow = true;
          this.dayrulerow = true;

          val.vrepeatEveryTimeline = '';
          document.getElementById('yearrowtext')?.classList.remove('opacitycolour');
          document.getElementById('monthrowtext')?.classList.remove('opacitycolour');
          document.getElementById('weekrowtext')?.classList.remove('opacitycolour');
          document.getElementById('dayrowtext')?.classList.remove('opacitycolour');
        }
      });

    }
  }

  onweekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.vweeekOfMonth == 'Select' || val.vmonth == 'Select') {
          this.sunrow = true;
          this.monrow = false;
          this.tuerow = false;
          this.wedrow = false;
          this.thurow = false;
          this.frirow = false;
          this.satrow = false;
          this.catogery1active = false;
          this.catogery2active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box3')?.classList.remove('hide');
          document.getElementById('row2box2')?.classList.add('hide');
          this.holidays.forEach((val: any) => {
            if (val.holidayId == id) {
              val.vdayOfWeek = 'Sunday';
              val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
              this.activelowerbtn();
              val.observation1rule = false;
              val.observation2rule = false;
              val.observation3rule = true;
              val.observation4rule = false;
              val.valternateObservation = 'Observes Sunday Holidays on Next Workday';
            }
          });
          document.getElementById('box5sun')?.classList.add('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.remove('hide');
          document.getElementById('box5mon')?.classList.remove('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.remove('hide');
          document.getElementById('box5thu')?.classList.remove('hide');
          document.getElementById('box5fri')?.classList.remove('hide');
          document.getElementById('box5sat')?.classList.remove('hide');
          document.getElementById('box5sun1')?.classList.add('hide');
          document.getElementById('box5mon1')?.classList.add('hide');
          document.getElementById('box5tue1')?.classList.add('hide');
          document.getElementById('box5wed1')?.classList.add('hide');
          document.getElementById('box5thu1')?.classList.add('hide');
          document.getElementById('box5fri1')?.classList.add('hide');
          document.getElementById('box5sat1')?.classList.add('hide');
        } else {
          if (this.sunrow == false) {
            this.sunrow = true;
            this.catogery1active = false;
            this.catogery2active = true;
            document.getElementById('textor')?.classList.add('opacitycolour');
            document.getElementById('row2box3')?.classList.remove('hide');
            document.getElementById('row2box2')?.classList.add('hide');
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = 'Sunday';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.add('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.remove('hide');
            document.getElementById('box5mon')?.classList.add('hide');
            document.getElementById('box5tue')?.classList.add('hide');
            document.getElementById('box5wed')?.classList.add('hide');
            document.getElementById('box5thu')?.classList.add('hide');
            document.getElementById('box5fri')?.classList.add('hide');
            document.getElementById('box5sat')?.classList.add('hide');
            document.getElementById('box5sun1')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.remove('hide');
            document.getElementById('box5tue1')?.classList.remove('hide');
            document.getElementById('box5wed1')?.classList.remove('hide');
            document.getElementById('box5thu1')?.classList.remove('hide');
            document.getElementById('box5fri1')?.classList.remove('hide');
            document.getElementById('box5sat1')?.classList.remove('hide');
          } else {
            this.sunrow = false;
            this.monrow = false;
            this.tuerow = false;
            this.wedrow = false;
            this.thurow = false;
            this.frirow = false;
            this.satrow = false;
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = '';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.remove('hide');
            document.getElementById('box5mon')?.classList.remove('hide');
            document.getElementById('box5tue')?.classList.remove('hide');
            document.getElementById('box5wed')?.classList.remove('hide');
            document.getElementById('box5thu')?.classList.remove('hide');
            document.getElementById('box5fri')?.classList.remove('hide');
            document.getElementById('box5sat')?.classList.remove('hide');
            document.getElementById('box5sun1')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.add('hide');
            document.getElementById('box5tue1')?.classList.add('hide');
            document.getElementById('box5wed1')?.classList.add('hide');
            document.getElementById('box5thu1')?.classList.add('hide');
            document.getElementById('box5fri1')?.classList.add('hide');
            document.getElementById('box5sat1')?.classList.add('hide');
          }
        }
      }
    });

  }
  on2weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.vweeekOfMonth == 'Select' || val.vmonth == 'Select') {
          this.sunrow = false;
          this.monrow = true;
          this.tuerow = false;
          this.wedrow = false;
          this.thurow = false;
          this.frirow = false;
          this.satrow = false;
          this.catogery1active = false;
          this.catogery2active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box3')?.classList.remove('hide');
          document.getElementById('row2box2')?.classList.add('hide');
          this.holidays.forEach((val: any) => {
            if (val.holidayId == id) {
              val.vdayOfWeek = 'Monday';
              val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
              this.activelowerbtn();
              val.observation1rule = false;
              val.observation2rule = false;
              val.observation3rule = false;
              val.observation4rule = true;
              val.valternateObservation = 'Does Not Observe on an Alternate Workday';
            }
          });
          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.add('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.remove('hide');
          document.getElementById('box5mon')?.classList.remove('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.remove('hide');
          document.getElementById('box5thu')?.classList.remove('hide');
          document.getElementById('box5fri')?.classList.remove('hide');
          document.getElementById('box5sat')?.classList.remove('hide');
          document.getElementById('box5sun1')?.classList.add('hide');
          document.getElementById('box5mon1')?.classList.add('hide');
          document.getElementById('box5tue1')?.classList.add('hide');
          document.getElementById('box5wed1')?.classList.add('hide');
          document.getElementById('box5thu1')?.classList.add('hide');
          document.getElementById('box5fri1')?.classList.add('hide');
          document.getElementById('box5sat1')?.classList.add('hide');
        } else {
          if (this.monrow == false) {
            this.monrow = true;
            this.catogery1active = false;
            this.catogery2active = true;
            document.getElementById('textor')?.classList.add('opacitycolour');
            document.getElementById('row2box3')?.classList.remove('hide');
            document.getElementById('row2box2')?.classList.add('hide');
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = 'Monday';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.add('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('hide');
            document.getElementById('box5sun')?.classList.add('hide');
            document.getElementById('box5tue')?.classList.add('hide');
            document.getElementById('box5wed')?.classList.add('hide');
            document.getElementById('box5thu')?.classList.add('hide');
            document.getElementById('box5fri')?.classList.add('hide');
            document.getElementById('box5sat')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.add('hide');
            document.getElementById('box5sun1')?.classList.remove('hide');
            document.getElementById('box5tue1')?.classList.remove('hide');
            document.getElementById('box5wed1')?.classList.remove('hide');
            document.getElementById('box5thu1')?.classList.remove('hide');
            document.getElementById('box5fri1')?.classList.remove('hide');
            document.getElementById('box5sat1')?.classList.remove('hide');
          } else {
            this.sunrow = false;
            this.monrow = false;
            this.tuerow = false;
            this.wedrow = false;
            this.thurow = false;
            this.frirow = false;
            this.satrow = false;
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = '';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.remove('hide');
            document.getElementById('box5mon')?.classList.remove('hide');
            document.getElementById('box5tue')?.classList.remove('hide');
            document.getElementById('box5wed')?.classList.remove('hide');
            document.getElementById('box5thu')?.classList.remove('hide');
            document.getElementById('box5fri')?.classList.remove('hide');
            document.getElementById('box5sat')?.classList.remove('hide');
            document.getElementById('box5sun1')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.add('hide');
            document.getElementById('box5tue1')?.classList.add('hide');
            document.getElementById('box5wed1')?.classList.add('hide');
            document.getElementById('box5thu1')?.classList.add('hide');
            document.getElementById('box5fri1')?.classList.add('hide');
            document.getElementById('box5sat1')?.classList.add('hide');
          }

        }
      }
    });
  }
  on3weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.vweeekOfMonth == 'Select' || val.vmonth == 'Select') {
          this.sunrow = false;
          this.monrow = false;
          this.tuerow = true;
          this.wedrow = false;
          this.thurow = false;
          this.frirow = false;
          this.satrow = false;
          this.catogery1active = false;
          this.catogery2active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box3')?.classList.remove('hide');
          document.getElementById('row2box2')?.classList.add('hide');
          this.holidays.forEach((val: any) => {
            if (val.holidayId == id) {
              val.vdayOfWeek = 'Tuesday';
              val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
              this.activelowerbtn();
              val.observation1rule = false;
              val.observation2rule = false;
              val.observation3rule = false;
              val.observation4rule = true;
              val.valternateObservation = 'Does Not Observe on an Alternate Workday';
            }
          });
          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.add('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.remove('hide');
          document.getElementById('box5mon')?.classList.remove('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.remove('hide');
          document.getElementById('box5thu')?.classList.remove('hide');
          document.getElementById('box5fri')?.classList.remove('hide');
          document.getElementById('box5sat')?.classList.remove('hide');
          document.getElementById('box5sun1')?.classList.add('hide');
          document.getElementById('box5mon1')?.classList.add('hide');
          document.getElementById('box5tue1')?.classList.add('hide');
          document.getElementById('box5wed1')?.classList.add('hide');
          document.getElementById('box5thu1')?.classList.add('hide');
          document.getElementById('box5fri1')?.classList.add('hide');
          document.getElementById('box5sat1')?.classList.add('hide');
        } else {
          if (this.tuerow == false) {
            this.tuerow = true;
            this.catogery1active = false;
            this.catogery2active = true;
            document.getElementById('textor')?.classList.add('opacitycolour');
            document.getElementById('row2box3')?.classList.remove('hide');
            document.getElementById('row2box2')?.classList.add('hide');
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = 'Tuesday';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.add('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('hide');
            document.getElementById('box5sun')?.classList.add('hide');
            document.getElementById('box5mon')?.classList.add('hide');
            document.getElementById('box5wed')?.classList.add('hide');
            document.getElementById('box5thu')?.classList.add('hide');
            document.getElementById('box5fri')?.classList.add('hide');
            document.getElementById('box5sat')?.classList.add('hide');
            document.getElementById('box5tue1')?.classList.add('hide');
            document.getElementById('box5sun1')?.classList.remove('hide');
            document.getElementById('box5mon1')?.classList.remove('hide');
            document.getElementById('box5wed1')?.classList.remove('hide');
            document.getElementById('box5thu1')?.classList.remove('hide');
            document.getElementById('box5fri1')?.classList.remove('hide');
            document.getElementById('box5sat1')?.classList.remove('hide');
          } else {
            this.sunrow = false;
            this.monrow = false;
            this.tuerow = false;
            this.wedrow = false;
            this.thurow = false;
            this.frirow = false;
            this.satrow = false;
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = '';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.remove('hide');
            document.getElementById('box5mon')?.classList.remove('hide');
            document.getElementById('box5tue')?.classList.remove('hide');
            document.getElementById('box5wed')?.classList.remove('hide');
            document.getElementById('box5thu')?.classList.remove('hide');
            document.getElementById('box5fri')?.classList.remove('hide');
            document.getElementById('box5sat')?.classList.remove('hide');
            document.getElementById('box5sun1')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.add('hide');
            document.getElementById('box5tue1')?.classList.add('hide');
            document.getElementById('box5wed1')?.classList.add('hide');
            document.getElementById('box5thu1')?.classList.add('hide');
            document.getElementById('box5fri1')?.classList.add('hide');
            document.getElementById('box5sat1')?.classList.add('hide');
          }
        }
      }
    });
  }
  on4weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.vweeekOfMonth == 'Select' || val.vmonth == 'Select') {
          this.sunrow = false;
          this.monrow = false;
          this.tuerow = false;
          this.wedrow = true;
          this.thurow = false;
          this.frirow = false;
          this.satrow = false;
          this.catogery1active = false;
          this.catogery2active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box3')?.classList.remove('hide');
          document.getElementById('row2box2')?.classList.add('hide');
          this.holidays.forEach((val: any) => {
            if (val.holidayId == id) {
              val.vdayOfWeek = 'Wednesday';
              val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
              this.activelowerbtn();
              val.observation1rule = false;
              val.observation2rule = false;
              val.observation3rule = false;
              val.observation4rule = true;
              val.valternateObservation = 'Does Not Observe on an Alternate Workday';
            }
          });
          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.add('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.remove('hide');
          document.getElementById('box5mon')?.classList.remove('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.remove('hide');
          document.getElementById('box5thu')?.classList.remove('hide');
          document.getElementById('box5fri')?.classList.remove('hide');
          document.getElementById('box5sat')?.classList.remove('hide');
          document.getElementById('box5sun1')?.classList.add('hide');
          document.getElementById('box5mon1')?.classList.add('hide');
          document.getElementById('box5tue1')?.classList.add('hide');
          document.getElementById('box5wed1')?.classList.add('hide');
          document.getElementById('box5thu1')?.classList.add('hide');
          document.getElementById('box5fri1')?.classList.add('hide');
          document.getElementById('box5sat1')?.classList.add('hide');
        } else {
          if (this.wedrow == false) {
            this.wedrow = true;
            this.catogery1active = false;
            this.catogery2active = true;
            document.getElementById('textor')?.classList.add('opacitycolour');
            document.getElementById('row2box3')?.classList.remove('hide');
            document.getElementById('row2box2')?.classList.add('hide');
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = 'Wednesday';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.add('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.add('hide');
            document.getElementById('box5mon')?.classList.add('hide');
            document.getElementById('box5tue')?.classList.add('hide');
            document.getElementById('box5wed')?.classList.remove('hide');
            document.getElementById('box5thu')?.classList.add('hide');
            document.getElementById('box5fri')?.classList.add('hide');
            document.getElementById('box5sat')?.classList.add('hide');
            document.getElementById('box5sun1')?.classList.remove('hide');
            document.getElementById('box5mon1')?.classList.remove('hide');
            document.getElementById('box5tue1')?.classList.remove('hide');
            document.getElementById('box5wed1')?.classList.add('hide');
            document.getElementById('box5thu1')?.classList.remove('hide');
            document.getElementById('box5fri1')?.classList.remove('hide');
            document.getElementById('box5sat1')?.classList.remove('hide');
          } else {
            this.sunrow = false;
            this.monrow = false;
            this.tuerow = false;
            this.wedrow = false;
            this.thurow = false;
            this.frirow = false;
            this.satrow = false;
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = '';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.remove('hide');
            document.getElementById('box5mon')?.classList.remove('hide');
            document.getElementById('box5tue')?.classList.remove('hide');
            document.getElementById('box5wed')?.classList.remove('hide');
            document.getElementById('box5thu')?.classList.remove('hide');
            document.getElementById('box5fri')?.classList.remove('hide');
            document.getElementById('box5sat')?.classList.remove('hide');
            document.getElementById('box5sun1')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.add('hide');
            document.getElementById('box5tue1')?.classList.add('hide');
            document.getElementById('box5wed1')?.classList.add('hide');
            document.getElementById('box5thu1')?.classList.add('hide');
            document.getElementById('box5fri1')?.classList.add('hide');
            document.getElementById('box5sat1')?.classList.add('hide');
          }
        }
      }
    });
  }
  on5weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.vweeekOfMonth == 'Select' || val.vmonth == 'Select') {
          this.sunrow = false;
          this.monrow = false;
          this.tuerow = false;
          this.wedrow = false;
          this.thurow = true;
          this.frirow = false;
          this.satrow = false;
          this.catogery1active = false;
          this.catogery2active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box3')?.classList.remove('hide');
          document.getElementById('row2box2')?.classList.add('hide');
          this.holidays.forEach((val: any) => {
            if (val.holidayId == id) {
              val.vdayOfWeek = 'Thursday';
              val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
              this.activelowerbtn();
              val.observation1rule = false;
              val.observation2rule = false;
              val.observation3rule = false;
              val.observation4rule = true;
              val.valternateObservation = 'Does Not Observe on an Alternate Workday';
            }
          });
          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.add('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.remove('hide');
          document.getElementById('box5mon')?.classList.remove('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.remove('hide');
          document.getElementById('box5thu')?.classList.remove('hide');
          document.getElementById('box5fri')?.classList.remove('hide');
          document.getElementById('box5sat')?.classList.remove('hide');
          document.getElementById('box5sun1')?.classList.add('hide');
          document.getElementById('box5mon1')?.classList.add('hide');
          document.getElementById('box5tue1')?.classList.add('hide');
          document.getElementById('box5wed1')?.classList.add('hide');
          document.getElementById('box5thu1')?.classList.add('hide');
          document.getElementById('box5fri1')?.classList.add('hide');
          document.getElementById('box5sat1')?.classList.add('hide');
        } else {
          if (this.thurow == false) {
            this.thurow = true;
            this.catogery1active = false;
            this.catogery2active = true;
            document.getElementById('textor')?.classList.add('opacitycolour');
            document.getElementById('row2box3')?.classList.remove('hide');
            document.getElementById('row2box2')?.classList.add('hide');
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = 'Thursday';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.add('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.add('hide');
            document.getElementById('box5mon')?.classList.add('hide');
            document.getElementById('box5tue')?.classList.add('hide');
            document.getElementById('box5wed')?.classList.add('hide');
            document.getElementById('box5thu')?.classList.remove('hide');
            document.getElementById('box5fri')?.classList.add('hide');
            document.getElementById('box5sat')?.classList.add('hide');
            document.getElementById('box5sun1')?.classList.remove('hide');
            document.getElementById('box5mon1')?.classList.remove('hide');
            document.getElementById('box5tue1')?.classList.remove('hide');
            document.getElementById('box5wed1')?.classList.remove('hide');
            document.getElementById('box5thu1')?.classList.add('hide');
            document.getElementById('box5fri1')?.classList.remove('hide');
            document.getElementById('box5sat1')?.classList.remove('hide');
          } else {
            this.sunrow = false;
            this.monrow = false;
            this.tuerow = false;
            this.wedrow = false;
            this.thurow = false;
            this.frirow = false;
            this.satrow = false;
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = '';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.remove('hide');
            document.getElementById('box5mon')?.classList.remove('hide');
            document.getElementById('box5tue')?.classList.remove('hide');
            document.getElementById('box5wed')?.classList.remove('hide');
            document.getElementById('box5thu')?.classList.remove('hide');
            document.getElementById('box5fri')?.classList.remove('hide');
            document.getElementById('box5sat')?.classList.remove('hide');
            document.getElementById('box5sun1')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.add('hide');
            document.getElementById('box5tue1')?.classList.add('hide');
            document.getElementById('box5wed1')?.classList.add('hide');
            document.getElementById('box5thu1')?.classList.add('hide');
            document.getElementById('box5fri1')?.classList.add('hide');
            document.getElementById('box5sat1')?.classList.add('hide');
          }
        }
      }
    });
  }
  on6weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.vweeekOfMonth == 'Select' || val.vmonth == 'Select') {
          this.sunrow = false;
          this.monrow = false;
          this.tuerow = false;
          this.wedrow = false;
          this.thurow = false;
          this.frirow = true;
          this.satrow = false;
          this.catogery1active = false;
          this.catogery2active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box3')?.classList.remove('hide');
          document.getElementById('row2box2')?.classList.add('hide');
          this.holidays.forEach((val: any) => {
            if (val.holidayId == id) {
              val.vdayOfWeek = 'Friday';
              val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
              this.activelowerbtn();
              val.observation1rule = false;
              val.observation2rule = false;
              val.observation3rule = false;
              val.observation4rule = true;
              val.valternateObservation = 'Does Not Observe on an Alternate Workday';
            }
          });
          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.add('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.remove('hide');
          document.getElementById('box5mon')?.classList.remove('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.remove('hide');
          document.getElementById('box5thu')?.classList.remove('hide');
          document.getElementById('box5fri')?.classList.remove('hide');
          document.getElementById('box5sat')?.classList.remove('hide');
          document.getElementById('box5sun1')?.classList.add('hide');
          document.getElementById('box5mon1')?.classList.add('hide');
          document.getElementById('box5tue1')?.classList.add('hide');
          document.getElementById('box5wed1')?.classList.add('hide');
          document.getElementById('box5thu1')?.classList.add('hide');
          document.getElementById('box5fri1')?.classList.add('hide');
          document.getElementById('box5sat1')?.classList.add('hide');
        } else {
          if (this.frirow == false) {
            this.frirow = true;
            this.catogery1active = false;
            this.catogery2active = true;
            document.getElementById('textor')?.classList.add('opacitycolour');
            document.getElementById('row2box3')?.classList.remove('hide');
            document.getElementById('row2box2')?.classList.add('hide');
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = 'Friday';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.add('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.add('hide');
            document.getElementById('box5mon')?.classList.add('hide');
            document.getElementById('box5tue')?.classList.add('hide');
            document.getElementById('box5wed')?.classList.add('hide');
            document.getElementById('box5thu')?.classList.add('hide');
            document.getElementById('box5fri')?.classList.remove('hide');
            document.getElementById('box5sat')?.classList.add('hide');
            document.getElementById('box5sun1')?.classList.remove('hide');
            document.getElementById('box5mon1')?.classList.remove('hide');
            document.getElementById('box5tue1')?.classList.remove('hide');
            document.getElementById('box5wed1')?.classList.remove('hide');
            document.getElementById('box5thu1')?.classList.remove('hide');
            document.getElementById('box5fri1')?.classList.add('hide');
            document.getElementById('box5sat1')?.classList.remove('hide');
          } else {
            this.sunrow = false;
            this.monrow = false;
            this.tuerow = false;
            this.wedrow = false;
            this.thurow = false;
            this.frirow = false;
            this.satrow = false;
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = '';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.remove('hide');
            document.getElementById('box5mon')?.classList.remove('hide');
            document.getElementById('box5tue')?.classList.remove('hide');
            document.getElementById('box5wed')?.classList.remove('hide');
            document.getElementById('box5thu')?.classList.remove('hide');
            document.getElementById('box5fri')?.classList.remove('hide');
            document.getElementById('box5sat')?.classList.remove('hide');
            document.getElementById('box5sun1')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.add('hide');
            document.getElementById('box5tue1')?.classList.add('hide');
            document.getElementById('box5wed1')?.classList.add('hide');
            document.getElementById('box5thu1')?.classList.add('hide');
            document.getElementById('box5fri1')?.classList.add('hide');
            document.getElementById('box5sat1')?.classList.add('hide');
          }
        }
      }
    });
  }
  on7weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.vweeekOfMonth == 'Select' || val.vmonth == 'Select') {
          this.sunrow = false;
          this.monrow = false;
          this.tuerow = false;
          this.wedrow = false;
          this.thurow = false;
          this.frirow = false;
          this.satrow = true;
          this.catogery1active = false;
          this.catogery2active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box3')?.classList.remove('hide');
          document.getElementById('row2box2')?.classList.add('hide');
          this.holidays.forEach((val: any) => {
            if (val.holidayId == id) {
              val.vdayOfWeek = 'Saturday';
              val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
              this.activelowerbtn();
              val.observation1rule = false;
              val.observation2rule = true;
              val.observation3rule = false;
              val.observation4rule = false;
              val.valternateObservation = 'Observes Saturday Holidays on Previous Workday';
            }
          });
          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.add('box5holidayedithover');
          document.getElementById('box5sun')?.classList.remove('hide');
          document.getElementById('box5mon')?.classList.remove('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.remove('hide');
          document.getElementById('box5thu')?.classList.remove('hide');
          document.getElementById('box5fri')?.classList.remove('hide');
          document.getElementById('box5sat')?.classList.remove('hide');
          document.getElementById('box5sun1')?.classList.add('hide');
          document.getElementById('box5mon1')?.classList.add('hide');
          document.getElementById('box5tue1')?.classList.add('hide');
          document.getElementById('box5wed1')?.classList.add('hide');
          document.getElementById('box5thu1')?.classList.add('hide');
          document.getElementById('box5fri1')?.classList.add('hide');
          document.getElementById('box5sat1')?.classList.add('hide');
        } else {
          if (this.satrow == false) {
            this.catogery1active = false;
            this.catogery2active = true;
            document.getElementById('textor')?.classList.add('opacitycolour');
            document.getElementById('row2box3')?.classList.remove('hide');
            document.getElementById('row2box2')?.classList.add('hide');
            this.satrow = true;
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {

                val.vdayOfWeek = 'Saturday';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.add('box5holidayedithover');
            document.getElementById('box5sun')?.classList.add('hide');
            document.getElementById('box5mon')?.classList.add('hide');
            document.getElementById('box5tue')?.classList.add('hide');
            document.getElementById('box5wed')?.classList.add('hide');
            document.getElementById('box5thu')?.classList.add('hide');
            document.getElementById('box5fri')?.classList.add('hide');
            document.getElementById('box5sat')?.classList.remove('hide');
            document.getElementById('box5sun1')?.classList.remove('hide');
            document.getElementById('box5mon1')?.classList.remove('hide');
            document.getElementById('box5tue1')?.classList.remove('hide');
            document.getElementById('box5wed1')?.classList.remove('hide');
            document.getElementById('box5thu1')?.classList.remove('hide');
            document.getElementById('box5fri1')?.classList.remove('hide');
            document.getElementById('box5sat1')?.classList.add('hide');
          } else {
            this.sunrow = false;
            this.monrow = false;
            this.tuerow = false;
            this.wedrow = false;
            this.thurow = false;
            this.frirow = false;
            this.satrow = false;
            this.holidays.forEach((val: any) => {
              if (val.holidayId == id) {
                val.vdayOfWeek = '';
                val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
                this.activelowerbtn();
              }
            });
            document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
            document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
            document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
            document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
            document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
            document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
            document.getElementById('box5sun')?.classList.remove('hide');
            document.getElementById('box5mon')?.classList.remove('hide');
            document.getElementById('box5tue')?.classList.remove('hide');
            document.getElementById('box5wed')?.classList.remove('hide');
            document.getElementById('box5thu')?.classList.remove('hide');
            document.getElementById('box5fri')?.classList.remove('hide');
            document.getElementById('box5sat')?.classList.remove('hide');
            document.getElementById('box5sun1')?.classList.add('hide');
            document.getElementById('box5mon1')?.classList.add('hide');
            document.getElementById('box5tue1')?.classList.add('hide');
            document.getElementById('box5wed1')?.classList.add('hide');
            document.getElementById('box5thu1')?.classList.add('hide');
            document.getElementById('box5fri1')?.classList.add('hide');
            document.getElementById('box5sat1')?.classList.add('hide');
          }
        }
      }
    });
  }


  on1observationchange(event: any, id: any) {
    if (event.target.checked) {
      this.alwaysfalse = true;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.observation1rule = true;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
          this.activelowerbtn();
          val.valternateObservation = 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday';
          document.getElementById('observ1rule')?.classList.remove('hide');
          document.getElementById('observ2rule')?.classList.add('hide');
          document.getElementById('observ3rule')?.classList.add('hide');
          document.getElementById('observ4rule')?.classList.add('hide');
          document.getElementById('observ1rule2')?.classList.add('hide');
          document.getElementById('observ2rule2')?.classList.remove('hide');
          document.getElementById('observ3rule2')?.classList.remove('hide');
          document.getElementById('observ4rule2')?.classList.remove('hide');
        }
      });
    } else {
      this.alwaysfalse = false;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
          this.activelowerbtn();
          val.valternateObservation = '';
          document.getElementById('observ1rule')?.classList.remove('hide');
          document.getElementById('observ2rule')?.classList.remove('hide');
          document.getElementById('observ3rule')?.classList.remove('hide');
          document.getElementById('observ4rule')?.classList.remove('hide');
          document.getElementById('observ1rule2')?.classList.add('hide');
          document.getElementById('observ2rule2')?.classList.add('hide');
          document.getElementById('observ3rule2')?.classList.add('hide');
          document.getElementById('observ4rule2')?.classList.add('hide');
        }
      });
    }


  }
  on2observationchange(event: any, id: any) {
    if (event.target.checked) {
      this.alwaysfalse = true;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.observation1rule = false;
          val.observation2rule = true;
          val.observation3rule = false;
          val.observation4rule = false;
          this.activelowerbtn();
          val.valternateObservation = 'Observes Saturday Holidays on Previous Workday';
          document.getElementById('observ1rule')?.classList.add('hide');
          document.getElementById('observ2rule')?.classList.remove('hide');
          document.getElementById('observ3rule')?.classList.add('hide');
          document.getElementById('observ4rule')?.classList.add('hide');
          document.getElementById('observ1rule2')?.classList.remove('hide');
          document.getElementById('observ2rule2')?.classList.add('hide');
          document.getElementById('observ3rule2')?.classList.remove('hide');
          document.getElementById('observ4rule2')?.classList.remove('hide');
        }
      });
    } else {
      this.alwaysfalse = false;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
          this.activelowerbtn();
          val.valternateObservation = '';
          document.getElementById('observ1rule')?.classList.remove('hide');
          document.getElementById('observ2rule')?.classList.remove('hide');
          document.getElementById('observ3rule')?.classList.remove('hide');
          document.getElementById('observ4rule')?.classList.remove('hide');
          document.getElementById('observ1rule2')?.classList.add('hide');
          document.getElementById('observ2rule2')?.classList.add('hide');
          document.getElementById('observ3rule2')?.classList.add('hide');
          document.getElementById('observ4rule2')?.classList.add('hide');
        }
      });
    }
  }
  on3observationchange(event: any, id: any) {
    if (event.target.checked) {
      this.alwaysfalse = true;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = true;
          val.observation4rule = false;
          this.activelowerbtn();
          val.valternateObservation = 'Observes Sunday Holidays on Next Workday';
          document.getElementById('observ1rule')?.classList.add('hide');
          document.getElementById('observ2rule')?.classList.add('hide');
          document.getElementById('observ3rule')?.classList.remove('hide');
          document.getElementById('observ4rule')?.classList.add('hide');
          document.getElementById('observ1rule2')?.classList.remove('hide');
          document.getElementById('observ2rule2')?.classList.remove('hide');
          document.getElementById('observ3rule2')?.classList.add('hide');
          document.getElementById('observ4rule2')?.classList.remove('hide');
        }
      });
    } else {
      this.alwaysfalse = false;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
          this.activelowerbtn();
          val.valternateObservation = '';
          document.getElementById('observ1rule')?.classList.remove('hide');
          document.getElementById('observ2rule')?.classList.remove('hide');
          document.getElementById('observ3rule')?.classList.remove('hide');
          document.getElementById('observ4rule')?.classList.remove('hide');
          document.getElementById('observ1rule2')?.classList.add('hide');
          document.getElementById('observ2rule2')?.classList.add('hide');
          document.getElementById('observ3rule2')?.classList.add('hide');
          document.getElementById('observ4rule2')?.classList.add('hide');
        }
      });
    }
  }
  observationdecisionvalue(event: any, id: any) {
    if (event.target.checked) {
      this.on4observationchange(event, id);
    } else {
      document.getElementById('observationpopup')?.click();
    }
  }
  on4observationchange(event: any, id: any) {
    if (event.target.checked) {
      this.alwaysfalse = true;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = true;
          this.activelowerbtn();
          val.valternateObservation = 'Does Not Observe on an Alternate Workday';
          document.getElementById('observ1rule')?.classList.add('hide');
          document.getElementById('observ2rule')?.classList.add('hide');
          document.getElementById('observ3rule')?.classList.add('hide');
          document.getElementById('observ4rule')?.classList.remove('hide');
          document.getElementById('observ1rule2')?.classList.remove('hide');
          document.getElementById('observ2rule2')?.classList.remove('hide');
          document.getElementById('observ3rule2')?.classList.remove('hide');
          document.getElementById('observ4rule2')?.classList.add('hide');
        }
      });
    } else {
      this.alwaysfalse = false;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
          this.activelowerbtn();
          val.valternateObservation = '';
          document.getElementById('observ1rule')?.classList.remove('hide');
          document.getElementById('observ2rule')?.classList.remove('hide');
          document.getElementById('observ3rule')?.classList.remove('hide');
          document.getElementById('observ4rule')?.classList.remove('hide');
          document.getElementById('observ1rule2')?.classList.add('hide');
          document.getElementById('observ2rule2')?.classList.add('hide');
          document.getElementById('observ3rule2')?.classList.add('hide');
          document.getElementById('observ4rule2')?.classList.add('hide');
        }
      });
    }
  }
  observation4value(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.observation4rule == true) {

        } else {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = true;
          this.activelowerbtn();
          val.valternateObservation = 'Does Not Observe on an Alternate Workday';
          document.getElementById('observ1rule')?.classList.add('hide');
          document.getElementById('observ2rule')?.classList.add('hide');
          document.getElementById('observ3rule')?.classList.add('hide');
          document.getElementById('observ4rule')?.classList.remove('hide');
          document.getElementById('observ1rule2')?.classList.remove('hide');
          document.getElementById('observ2rule2')?.classList.remove('hide');
          document.getElementById('observ3rule2')?.classList.remove('hide');
          document.getElementById('observ4rule2')?.classList.add('hide');
        }
      }
    });
  }
  standardchange(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          if (val.vruleSetting == 'Standard Reoccurrence') {
            val.standardrule = true;
            val.customerule = false;
            val.norule = false;
            this.standardrulerow = true;
            this.customerulerow = false;
            this.norulerow = false;
            document.getElementById('standardruletext')?.classList.remove('opacitycolour');
            document.getElementById('customeruletext')?.classList.add('opacitycolour');
            document.getElementById('noruletext')?.classList.add('opacitycolour');
          }
        }
      });
      this.activelowerbtn();
      this.emptybutton(id);
    } else {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.standardrule = false;
          val.customerule = false;
          val.norule = false;
          this.standardrulerow = true;
          this.customerulerow = true;
          this.norulerow = true;
          document.getElementById('standardruletext')?.classList.remove('opacitycolour');
          document.getElementById('customeruletext')?.classList.remove('opacitycolour');
          document.getElementById('noruletext')?.classList.remove('opacitycolour');
        }
        this.activelowerbtn();
        this.emptybutton(id);
      });
    }


  }
  working1dayobservation(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.vobserveAsWorkDay = true;
          val.dayyesrule = true;
          val.daynorule = false;
          this.activelowerbtn();
          if (this.catogery1active == true) {
            if (val.observation1rule == true) {

            } else {
              document.getElementById('alt1observation')?.click();
            }
          } else if (this.catogery2active == true) {
            if (val.observation4rule == true) {

            } else {
              this.observation4value(id);
            }


          }
        }
      });
      document.getElementById('row3box2')?.classList.remove('hide');
      document.getElementById('row3box3')?.classList.add('hide');
      document.getElementById('row4box2')?.classList.remove('hide');
      document.getElementById('row4box3')?.classList.add('hide');
    } else {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.vobserveAsWorkDay = false;
          val.dayyesrule = false;
          val.daynorule = true;
          this.activelowerbtn();
          if (this.catogery1active == true) {
            if (val.observation1rule == true) {

            } else {
              document.getElementById('alt1observation')?.click();
            }
          } else if (this.catogery2active == true) {
            if (val.observation4rule == true) {

            } else {
              this.observation4value(id);
            }


          }
        }
      });
      document.getElementById('row3box2')?.classList.add('hide');
      document.getElementById('row3box3')?.classList.remove('hide');
      document.getElementById('row4box2')?.classList.add('hide');
      document.getElementById('row4box3')?.classList.remove('hide');
    }

  }
  working2dayobservation(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.vobserveAsWorkDay = false;
          val.dayyesrule = false;
          val.daynorule = true;
          this.activelowerbtn();
          if (this.catogery1active == true) {
            if (val.observation1rule == true) {

            } else {
              document.getElementById('alt1observation')?.click();
            }
          } else if (this.catogery2active == true) {
            if (val.observation4rule == true) {

            } else {
              this.observation4value(id);
            }


          }
        }
      });
      document.getElementById('row3box2')?.classList.add('hide');
      document.getElementById('row3box3')?.classList.remove('hide');
      document.getElementById('row4box2')?.classList.add('hide');
      document.getElementById('row4box3')?.classList.remove('hide');
    } else {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.vobserveAsWorkDay = true;
          val.dayyesrule = true;
          val.daynorule = false;
          this.activelowerbtn();
          if (this.catogery1active == true) {
            if (val.observation1rule == true) {

            } else {
              document.getElementById('alt1observation')?.click();
            }
          } else if (this.catogery2active == true) {
            if (val.observation4rule == true) {

            } else {
              this.observation4value(id);
            }


          }
        }
      });
      document.getElementById('row3box2')?.classList.remove('hide');
      document.getElementById('row3box3')?.classList.add('hide');
      document.getElementById('row4box2')?.classList.remove('hide');
      document.getElementById('row4box3')?.classList.add('hide');
    }

  }

  emptybutton(id: any) {
    document.getElementById('textor')?.classList.remove('opacitycolour');
    this.closealldrop();
    this.observationnumber = false;
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vexpire = 'Never'
        document.getElementById('textexpire1year')?.classList.add('hide');
        document.getElementById('textexpire2year')?.classList.add('hide');
        document.getElementById('textexpire1event')?.classList.add('hide');
        document.getElementById('textexpire2event')?.classList.add('hide');
        val.vrepeatEveryTimeline = '';
        val.yearrule = false;
        val.monthrule = false;
        val.weekrule = false;
        val.dayrule = false;
        this.yearrulerow = true;
        this.monthrulerow = true;
        this.weekrulerow = true;
        this.dayrulerow = true;
        this.sunrow = false;
        this.monrow = false;
        this.tuerow = false;
        this.wedrow = false;
        this.thurow = false;
        this.frirow = false;
        this.satrow = false;
        document.getElementById('yearrowtext')?.classList.remove('opacitycolour');
        document.getElementById('monthrowtext')?.classList.remove('opacitycolour');
        document.getElementById('weekrowtext')?.classList.remove('opacitycolour');
        document.getElementById('dayrowtext')?.classList.remove('opacitycolour');
        val.vdayOfWeek = '';
        document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
        document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
        document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
        document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
        document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
        document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
        val.valternateObservation = '';
        val.observation1rule = false;
        val.observation2rule = false;
        val.observation3rule = false;
        val.observation4rule = false;
        val.vobserveAsWorkDay == '';
        val.dayyesrule = false;
        val.daynorule = false;
        this.catogery2active = false;
        this.catogery1active = false;
        document.getElementById('row3box2')?.classList.remove('hide');
        document.getElementById('row3box3')?.classList.add('hide');
        document.getElementById('row4box2')?.classList.remove('hide');
        document.getElementById('row4box3')?.classList.add('hide');
        document.getElementById('row1box2')?.classList.remove('hide');
        document.getElementById('row1box3')?.classList.add('hide');
        document.getElementById('row2box2')?.classList.remove('hide');
        document.getElementById('row2box3')?.classList.add('hide');
        val.vdayOfWeek = '';
        val.vweeekOfMonth = 'Select';
        this.movingweekname = 'Select';
        val.vdateOfMonth = '';
        val.vobserveAsWorkDay = '';
        val.vexpire = '';
        val.vmonth = 'Select';
        val.vrepeatEveryCount = '';
        val.vobserveNumberOfDays = 0;
        this.observationnumber = true;
        document.getElementById('box5sun')?.classList.remove('hide');
        document.getElementById('box5mon')?.classList.remove('hide');
        document.getElementById('box5tue')?.classList.remove('hide');
        document.getElementById('box5wed')?.classList.remove('hide');
        document.getElementById('box5thu')?.classList.remove('hide');
        document.getElementById('box5fri')?.classList.remove('hide');
        document.getElementById('box5sat')?.classList.remove('hide');
        document.getElementById('box5sun1')?.classList.add('hide');
        document.getElementById('box5mon1')?.classList.add('hide');
        document.getElementById('box5tue1')?.classList.add('hide');
        document.getElementById('box5wed1')?.classList.add('hide');
        document.getElementById('box5thu1')?.classList.add('hide');
        document.getElementById('box5fri1')?.classList.add('hide');
        document.getElementById('box5sat1')?.classList.add('hide');
        val.valternateObservation = '';
        document.getElementById('observ1rule')?.classList.remove('hide');
        document.getElementById('observ2rule')?.classList.remove('hide');
        document.getElementById('observ3rule')?.classList.remove('hide');
        document.getElementById('observ4rule')?.classList.remove('hide');
        document.getElementById('observ1rule2')?.classList.add('hide');
        document.getElementById('observ2rule2')?.classList.add('hide');
        document.getElementById('observ3rule2')?.classList.add('hide');
        document.getElementById('observ4rule2')?.classList.add('hide');
      }
    });
  }
  cancelbutton(id: any) {
    this.closealldrop();
    this.observationnumber = false;
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vrepeatEveryCount = val.repeatEveryCount;
        val.vrepeatEveryTimeline = val.repeatEveryTimeline;
        val.vexpire = val.expire;
        val.vmonth = val.month;
        val.vdateOfMonth = val.dateOfMonth;
        val.vweeekOfMonth = val.weeekOfMonth;
        val.vdayOfWeek = val.dayOfWeek;
        val.vobserveAsWorkDay = val.observeAsWorkDay;
        val.vobserveNumberOfDays = val.observeNumberOfDays;
        val.valternateObservation = val.alternateObservation;
        val.vholidayName = val.holidayName;
        val.veholidayName = val.holidayName;
        val.vobservationDayMethod = val.observationDayMethod
        val.vruleSetting = val.ruleSetting;
        val.vexpiryYear = val.expiryYear;
        val.vexpireEvent = val.expireEvent;
        val.vobservedOn = val.observedOn;
        if (val.weeekOfMonth == '1st') {
          this.movingweekname = 'First';
        } else if (val.weeekOfMonth == '2nd') {
          this.movingweekname = 'Second';
        } else if (val.weeekOfMonth == '3rd') {
          this.movingweekname = 'Third';
        } else if (val.weeekOfMonth == '4th') {
          this.movingweekname = 'Fourth';
        } else if (val.weeekOfMonth == '5th') {
          this.movingweekname = 'Fifth';
        } else if (val.weeekOfMonth == 'Last') {
          this.movingweekname = 'Last';
        }
        if (val.ruleSetting == 'Standard Reoccurrence') {
          val.standardrule = true;
          val.customerule = false;
          val.norule = false;
          this.standardrulerow = true;
          this.customerulerow = false;
          this.norulerow = false;
          document.getElementById('standardruletext')?.classList.remove('opacitycolour');
          document.getElementById('customeruletext')?.classList.add('opacitycolour');
          document.getElementById('noruletext')?.classList.add('opacitycolour');
        } else if (val.ruleSetting == 'Custom Reoccurrence') {
          val.customerule = true;
          val.standardrule = false;
          val.norule = false;
          this.standardrulerow = false;
          this.customerulerow = true;
          this.norulerow = false;
          document.getElementById('standardruletext')?.classList.add('opacitycolour');
          document.getElementById('customeruletext')?.classList.remove('opacitycolour');
          document.getElementById('noruletext')?.classList.add('opacitycolour');
        } else if (val.ruleSetting == 'No Reoccurrence') {
          val.norule = true;
          val.customerule = false;
          val.standardrule = false;
          this.standardrulerow = false;
          this.customerulerow = false;
          this.norulerow = true;
          document.getElementById('standardruletext')?.classList.add('opacitycolour');
          document.getElementById('customeruletext')?.classList.add('opacitycolour');
          document.getElementById('noruletext')?.classList.remove('opacitycolour');
        }
        if (val.expire == 'Never') {
          document.getElementById('textexpire1year')?.classList.add('hide');
          document.getElementById('textexpire2year')?.classList.add('hide');
          document.getElementById('textexpire1event')?.classList.add('hide');
          document.getElementById('textexpire2event')?.classList.add('hide');
        } else if (val.expire == 'In Year') {
          document.getElementById('textexpire1event')?.classList.add('hide');
          document.getElementById('textexpire2event')?.classList.add('hide');
          document.getElementById('textexpire1year')?.classList.remove('hide');
          document.getElementById('textexpire2year')?.classList.remove('hide');
        } else {
          document.getElementById('textexpire1year')?.classList.add('hide');
          document.getElementById('textexpire2year')?.classList.add('hide');
          document.getElementById('textexpire1event')?.classList.remove('hide');
          document.getElementById('textexpire2event')?.classList.remove('hide');
        }
        if (val.dayOfWeek == '' || val.weeekOfMonth == '' || val.weeekOfMonth == 'Select') {
          this.catogery1active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row1box2')?.classList.add('hide');
          document.getElementById('row1box3')?.classList.remove('hide');
        } else {
          this.catogery1active = false;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row1box2')?.classList.remove('hide');
          document.getElementById('row1box3')?.classList.add('hide');
        }
        if (val.dateOfMonth == '' || val.dateOfMonth == '') {
          this.catogery2active = true;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box2')?.classList.add('hide');
          document.getElementById('row2box3')?.classList.remove('hide');
        } else {
          this.catogery2active = false;
          document.getElementById('textor')?.classList.add('opacitycolour');
          document.getElementById('row2box2')?.classList.remove('hide');
          document.getElementById('row2box3')?.classList.add('hide');
        }
        if (val.observeAsWorkDay == true) {
          this.observationnumber = true;
          document.getElementById('row3box2')?.classList.remove('hide');
          document.getElementById('row3box3')?.classList.add('hide');
          document.getElementById('row4box2')?.classList.remove('hide');
          document.getElementById('row4box3')?.classList.add('hide');
        } else {
          this.observationnumber = false;
          val.observation4rule = true;
          document.getElementById('row3box2')?.classList.add('hide');
          document.getElementById('row3box3')?.classList.remove('hide');
          document.getElementById('row4box2')?.classList.add('hide');
          document.getElementById('row4box3')?.classList.remove('hide');
        }
        if (val.repeatEveryTimeline == 'Year') {
          val.yearrule = true;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          this.yearrulerow = true;
          this.monthrulerow = false;
          this.weekrulerow = false;
          this.dayrulerow = false;
          document.getElementById('yearrowtext')?.classList.remove('opacitycolour');
          document.getElementById('monthrowtext')?.classList.add('opacitycolour');
          document.getElementById('weekrowtext')?.classList.add('opacitycolour');
          document.getElementById('dayrowtext')?.classList.add('opacitycolour');
        } else if (val.repeatEveryTimeline == 'Month') {
          val.yearrule = false;
          val.monthrule = true;
          val.weekrule = false;
          val.dayrule = false;
          this.yearrulerow = false;
          this.monthrulerow = true;
          this.weekrulerow = false;
          this.dayrulerow = false;
          document.getElementById('monthrrowtext')?.classList.remove('opacitycolour');
          document.getElementById('yearrowtext')?.classList.add('opacitycolour');
          document.getElementById('weekrowtext')?.classList.add('opacitycolour');
          document.getElementById('dayrowtext')?.classList.add('opacitycolour');
        } else if (val.repeatEveryTimeline == 'Week') {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = true;
          val.dayrule = false;
          this.yearrulerow = false;
          this.monthrulerow = false;
          this.weekrulerow = true;
          this.dayrulerow = false;
          document.getElementById('weekrowtext')?.classList.remove('opacitycolour');
          document.getElementById('monthrowtext')?.classList.add('opacitycolour');
          document.getElementById('yearrowtext')?.classList.add('opacitycolour');
          document.getElementById('dayrowtext')?.classList.add('opacitycolour');
        } else if (val.repeatEveryTimeline == 'Day') {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = true;
          this.yearrulerow = false;
          this.monthrulerow = false;
          this.weekrulerow = false;
          this.dayrulerow = true;
          document.getElementById('dayrowtext')?.classList.remove('opacitycolour');
          document.getElementById('monthrowtext')?.classList.add('opacitycolour');
          document.getElementById('weekrowtext')?.classList.add('opacitycolour');
          document.getElementById('yearrowtext')?.classList.add('opacitycolour');
        }

        if (val.dayOfWeek == 'Sunday') {
          this.sunrow = true;

          document.getElementById('box5sun')?.classList.add('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.remove('hide');
          document.getElementById('box5mon')?.classList.add('hide');
          document.getElementById('box5tue')?.classList.add('hide');
          document.getElementById('box5wed')?.classList.add('hide');
          document.getElementById('box5thu')?.classList.add('hide');
          document.getElementById('box5fri')?.classList.add('hide');
          document.getElementById('box5sat')?.classList.add('hide');
          document.getElementById('box5sun1')?.classList.add('hide');
          document.getElementById('box5mon1')?.classList.remove('hide');
          document.getElementById('box5tue1')?.classList.remove('hide');
          document.getElementById('box5wed1')?.classList.remove('hide');
          document.getElementById('box5thu1')?.classList.remove('hide');
          document.getElementById('box5fri1')?.classList.remove('hide');
          document.getElementById('box5sat1')?.classList.remove('hide');
        } else if (val.dayOfWeek == 'Monday') {
          this.monrow = true;

          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.add('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.add('hide');
          document.getElementById('box5mon')?.classList.remove('hide');
          document.getElementById('box5tue')?.classList.add('hide');
          document.getElementById('box5wed')?.classList.add('hide');
          document.getElementById('box5thu')?.classList.add('hide');
          document.getElementById('box5fri')?.classList.add('hide');
          document.getElementById('box5sat')?.classList.add('hide');
          document.getElementById('box5sun1')?.classList.remove('hide');
          document.getElementById('box5mon1')?.classList.add('hide');
          document.getElementById('box5tue1')?.classList.remove('hide');
          document.getElementById('box5wed1')?.classList.remove('hide');
          document.getElementById('box5thu1')?.classList.remove('hide');
          document.getElementById('box5fri1')?.classList.remove('hide');
          document.getElementById('box5sat1')?.classList.remove('hide');
        } else if (val.dayOfWeek == 'Tuesday') {
          this.tuerow = true;

          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.add('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.add('hide');
          document.getElementById('box5mon')?.classList.add('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.add('hide');
          document.getElementById('box5thu')?.classList.add('hide');
          document.getElementById('box5fri')?.classList.add('hide');
          document.getElementById('box5sat')?.classList.add('hide');
          document.getElementById('box5sun1')?.classList.remove('hide');
          document.getElementById('box5mon1')?.classList.remove('hide');
          document.getElementById('box5tue1')?.classList.add('hide');
          document.getElementById('box5wed1')?.classList.remove('hide');
          document.getElementById('box5thu1')?.classList.remove('hide');
          document.getElementById('box5fri1')?.classList.remove('hide');
          document.getElementById('box5sat1')?.classList.remove('hide');
        } else if (val.dayOfWeek == 'Wednesday') {
          this.wedrow = true;

          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.add('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.add('hide');
          document.getElementById('box5mon')?.classList.add('hide');
          document.getElementById('box5tue')?.classList.add('hide');
          document.getElementById('box5wed')?.classList.remove('hide');
          document.getElementById('box5thu')?.classList.add('hide');
          document.getElementById('box5fri')?.classList.add('hide');
          document.getElementById('box5sat')?.classList.add('hide');
          document.getElementById('box5sun1')?.classList.remove('hide');
          document.getElementById('box5mon1')?.classList.remove('hide');
          document.getElementById('box5tue1')?.classList.remove('hide');
          document.getElementById('box5wed1')?.classList.add('hide');
          document.getElementById('box5thu1')?.classList.remove('hide');
          document.getElementById('box5fri1')?.classList.remove('hide');
          document.getElementById('box5sat1')?.classList.remove('hide');
        } else if (val.dayOfWeek == 'Thursday') {
          this.thurow = true;

          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.add('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.add('hide');
          document.getElementById('box5mon')?.classList.add('hide');
          document.getElementById('box5tue')?.classList.remove('hide');
          document.getElementById('box5wed')?.classList.add('hide');
          document.getElementById('box5thu')?.classList.add('hide');
          document.getElementById('box5fri')?.classList.add('hide');
          document.getElementById('box5sat')?.classList.add('hide');
          document.getElementById('box5sun1')?.classList.remove('hide');
          document.getElementById('box5mon1')?.classList.remove('hide');
          document.getElementById('box5tue1')?.classList.remove('hide');
          document.getElementById('box5wed1')?.classList.remove('hide');
          document.getElementById('box5thu1')?.classList.add('hide');
          document.getElementById('box5fri1')?.classList.remove('hide');
          document.getElementById('box5sat1')?.classList.remove('hide');
        } else if (val.dayOfWeek == 'Friday') {
          this.frirow = true;

          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.add('box5holidayedithover');
          document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sun')?.classList.add('hide');
          document.getElementById('box5mon')?.classList.add('hide');
          document.getElementById('box5tue')?.classList.add('hide');
          document.getElementById('box5wed')?.classList.add('hide');
          document.getElementById('box5thu')?.classList.add('hide');
          document.getElementById('box5fri')?.classList.remove('hide');
          document.getElementById('box5sat')?.classList.add('hide');
          document.getElementById('box5sun1')?.classList.remove('hide');
          document.getElementById('box5mon1')?.classList.remove('hide');
          document.getElementById('box5tue1')?.classList.remove('hide');
          document.getElementById('box5wed1')?.classList.remove('hide');
          document.getElementById('box5thu1')?.classList.remove('hide');
          document.getElementById('box5fri1')?.classList.add('hide');
          document.getElementById('box5sat1')?.classList.remove('hide');
        } else if (val.dayOfWeek == 'Saturday') {
          this.satrow = true;
          document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('box5sat')?.classList.add('box5holidayedithover');
          document.getElementById('box5sun')?.classList.add('hide');
          document.getElementById('box5mon')?.classList.add('hide');
          document.getElementById('box5tue')?.classList.add('hide');
          document.getElementById('box5wed')?.classList.add('hide');
          document.getElementById('box5thu')?.classList.add('hide');
          document.getElementById('box5fri')?.classList.add('hide');
          document.getElementById('box5sat')?.classList.remove('hide');
          document.getElementById('box5sun1')?.classList.remove('hide');
          document.getElementById('box5mon1')?.classList.remove('hide');
          document.getElementById('box5tue1')?.classList.remove('hide');
          document.getElementById('box5wed1')?.classList.remove('hide');
          document.getElementById('box5thu1')?.classList.remove('hide');
          document.getElementById('box5fri1')?.classList.remove('hide');
          document.getElementById('box5sat1')?.classList.add('hide');
        }

        if (val.alternateObservation == 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday') {
          val.observation1rule = true;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
          document.getElementById('observ1rule')?.classList.remove('hide');
          document.getElementById('observ2rule')?.classList.add('hide');
          document.getElementById('observ3rule')?.classList.add('hide');
          document.getElementById('observ4rule')?.classList.add('hide');
          document.getElementById('observ1rule2')?.classList.add('hide');
          document.getElementById('observ2rule2')?.classList.remove('hide');
          document.getElementById('observ3rule2')?.classList.remove('hide');
          document.getElementById('observ4rule2')?.classList.remove('hide');
        } else if (val.alternateObservation == 'Observes Saturday Holidays on Previous Workday') {
          val.observation1rule = false;
          val.observation2rule = true;
          val.observation3rule = false;
          val.observation4rule = false;
          document.getElementById('observ1rule')?.classList.add('hide');
          document.getElementById('observ2rule')?.classList.remove('hide');
          document.getElementById('observ3rule')?.classList.add('hide');
          document.getElementById('observ4rule')?.classList.add('hide');
          document.getElementById('observ1rule2')?.classList.remove('hide');
          document.getElementById('observ2rule2')?.classList.add('hide');
          document.getElementById('observ3rule2')?.classList.remove('hide');
          document.getElementById('observ4rule2')?.classList.remove('hide');
        } else if (val.alternateObservation == 'Observes Sunday Holidays on Next Workday') {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = true;
          val.observation4rule = false;
          document.getElementById('observ1rule')?.classList.add('hide');
          document.getElementById('observ2rule')?.classList.add('hide');
          document.getElementById('observ3rule')?.classList.remove('hide');
          document.getElementById('observ4rule')?.classList.add('hide');
          document.getElementById('observ1rule2')?.classList.remove('hide');
          document.getElementById('observ2rule2')?.classList.remove('hide');
          document.getElementById('observ3rule2')?.classList.add('hide');
          document.getElementById('observ4rule2')?.classList.remove('hide');
        } else if (val.alternateObservation == 'Does Not Observe on an Alternate Workday') {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = true;
          document.getElementById('observ1rule')?.classList.add('hide');
          document.getElementById('observ2rule')?.classList.add('hide');
          document.getElementById('observ3rule')?.classList.add('hide');
          document.getElementById('observ4rule')?.classList.remove('hide');
          document.getElementById('observ1rule2')?.classList.remove('hide');
          document.getElementById('observ2rule2')?.classList.remove('hide');
          document.getElementById('observ3rule2')?.classList.remove('hide');
          document.getElementById('observ4rule2')?.classList.add('hide');
        }

        if (val.observeAsWorkDay == true) {
          val.dayyesrule = true;
          val.daynorule = false;
          document.getElementById('row3box2')?.classList.remove('hide');
          document.getElementById('row3box3')?.classList.add('hide');
          document.getElementById('row4box2')?.classList.remove('hide');
          document.getElementById('row4box3')?.classList.add('hide');
        } else {
          val.dayyesrule = false;
          val.daynorule = true;
          document.getElementById('row3box2')?.classList.add('hide');
          document.getElementById('row3box3')?.classList.remove('hide');
          document.getElementById('row4box2')?.classList.add('hide');
          document.getElementById('row4box3')?.classList.remove('hide');
        }
      }
    });
    this.daysOptionList = [];
    this.daysOptionLists.forEach((val1: any) => {
      this.daysOptionList.push(val1);
    });
    this.monthOptionList = [];
    this.monthOptionLists.forEach((val1: any) => {
      this.monthOptionList.push(val1);
    });
    this.onTheOptionList = [];
    this.onTheOptionLists.forEach((val1: any) => {
      this.onTheOptionList.push(val1);
    });
  }
  increasenumber() {
    if (this.activedrop == false && this.observationnumber == true) {
      this.activelowerbtn();
      this.singleholiday.forEach((val: any) => {
        val.vobserveNumberOfDays += 1;
      });
    }

  }
  decreasenumber() {
    if (this.activedrop == false && this.observationnumber == true) {
      this.activelowerbtn();
      this.singleholiday.forEach((val: any) => {
        val.vobserveNumberOfDays -= 1;
        if (val.vobserveNumberOfDays <= 1) {
          val.vobserveNumberOfDays = 1;
        }
      });
    }

  }
  activeweek() {
    this.singleholiday.forEach((val: any) => {
      this.sunrow = true;
      if (val.vruleSetting == 'Standard Reoccurrence') {
        val.standardrule = true;
        val.customerule = false;
        val.norule = false;
        this.standardrulerow = true;
        this.customerulerow = false;
        this.norulerow = false;
        document.getElementById('standardruletext')?.classList.remove('opacitycolour');
        document.getElementById('customeruletext')?.classList.add('opacitycolour');
        document.getElementById('noruletext')?.classList.add('opacitycolour');
      } else if (val.vruleSetting == 'Custom Reoccurrence') {
        val.customerule = true;
        val.standardrule = false;
        val.norule = false;
        this.standardrulerow = false;
        this.customerulerow = true;
        this.norulerow = false;
        document.getElementById('standardruletext')?.classList.add('opacitycolour');
        document.getElementById('customeruletext')?.classList.remove('opacitycolour');
        document.getElementById('noruletext')?.classList.add('opacitycolour');
      } else if (val.vruleSetting == 'No Reoccurrence') {
        val.norule = true;
        val.customerule = false;
        val.standardrule = false;
        this.standardrulerow = false;
        this.customerulerow = false;
        this.norulerow = true;
        document.getElementById('standardruletext')?.classList.add('opacitycolour');
        document.getElementById('customeruletext')?.classList.add('opacitycolour');
        document.getElementById('noruletext')?.classList.remove('opacitycolour');
      }
      if (val.vweeekOfMonth == '1st') {
        this.movingweekname = 'First';
      } else if (val.vweeekOfMonth == '2nd') {
        this.movingweekname = 'Second';
      } else if (val.vweeekOfMonth == '3rd') {
        this.movingweekname = 'Third';
      } else if (val.vweeekOfMonth == '4th') {
        this.movingweekname = 'Fourth';
      } else if (val.vweeekOfMonth == '5th') {
        this.movingweekname = 'Fifth';
      } else if (val.vweeekOfMonth == 'Last') {
        this.movingweekname = 'Last';
      }
      if (val.vexpire == 'Never') {
        document.getElementById('textexpire1year')?.classList.add('hide');
        document.getElementById('textexpire2year')?.classList.add('hide');
        document.getElementById('textexpire1event')?.classList.add('hide');
        document.getElementById('textexpire2event')?.classList.add('hide');
      } else if (val.vexpire == 'In Year') {
        document.getElementById('textexpire1event')?.classList.add('hide');
        document.getElementById('textexpire2event')?.classList.add('hide');
        document.getElementById('textexpire1year')?.classList.remove('hide');
        document.getElementById('textexpire2year')?.classList.remove('hide');
      } else {
        document.getElementById('textexpire1year')?.classList.add('hide');
        document.getElementById('textexpire2year')?.classList.add('hide');
        document.getElementById('textexpire1event')?.classList.remove('hide');
        document.getElementById('textexpire2event')?.classList.remove('hide');
      }
      if (val.vdayOfWeek == '' || val.vweeekOfMonth == '' || val.vweeekOfMonth == 'Select') {
        document.getElementById('row1box2')?.classList.add('hide');
        document.getElementById('row1box3')?.classList.remove('hide');
        this.catogery1active = true;
      } else {
        document.getElementById('row1box2')?.classList.remove('hide');
        document.getElementById('row1box3')?.classList.add('hide');
        this.catogery1active = false;
      }
      if (val.vdateOfMonth == '' || val.vdateOfMonth == 'Select') {
        this.catogery2active = true;
        document.getElementById('row2box2')?.classList.add('hide');
        document.getElementById('row2box3')?.classList.remove('hide');
      } else {
        this.catogery2active = false;
        document.getElementById('row2box2')?.classList.remove('hide');
        document.getElementById('row2box3')?.classList.add('hide');
      }
      if (val.vobserveAsWorkDay == true) {
        this.observationnumber = true;
        document.getElementById('row3box2')?.classList.remove('hide');
        document.getElementById('row3box3')?.classList.add('hide');
        document.getElementById('row4box2')?.classList.remove('hide');
        document.getElementById('row4box3')?.classList.add('hide');
      } else {
        this.observationnumber = false;
        val.observation4rule = true;
        document.getElementById('row3box2')?.classList.add('hide');
        document.getElementById('row3box3')?.classList.remove('hide');
        document.getElementById('row4box2')?.classList.add('hide');
        document.getElementById('row4box3')?.classList.remove('hide');
      }
      if (val.vdayOfWeek == 'Sunday') {
        this.sunrow = true;

        document.getElementById('box5sun')?.classList.add('box5holidayedithover');
        document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
        document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
        document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
        document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
        document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sun')?.classList.remove('hide');
        document.getElementById('box5mon')?.classList.add('hide');
        document.getElementById('box5tue')?.classList.add('hide');
        document.getElementById('box5wed')?.classList.add('hide');
        document.getElementById('box5thu')?.classList.add('hide');
        document.getElementById('box5fri')?.classList.add('hide');
        document.getElementById('box5sat')?.classList.add('hide');
        document.getElementById('box5sun1')?.classList.add('hide');
        document.getElementById('box5mon1')?.classList.remove('hide');
        document.getElementById('box5tue1')?.classList.remove('hide');
        document.getElementById('box5wed1')?.classList.remove('hide');
        document.getElementById('box5thu1')?.classList.remove('hide');
        document.getElementById('box5fri1')?.classList.remove('hide');
        document.getElementById('box5sat1')?.classList.remove('hide');
      } else if (val.vdayOfWeek == 'Monday') {
        this.monrow = true;

        document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
        document.getElementById('box5mon')?.classList.add('box5holidayedithover');
        document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
        document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
        document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
        document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sun')?.classList.add('hide');
        document.getElementById('box5mon')?.classList.remove('hide');
        document.getElementById('box5tue')?.classList.add('hide');
        document.getElementById('box5wed')?.classList.add('hide');
        document.getElementById('box5thu')?.classList.add('hide');
        document.getElementById('box5fri')?.classList.add('hide');
        document.getElementById('box5sat')?.classList.add('hide');
        document.getElementById('box5sun1')?.classList.remove('hide');
        document.getElementById('box5mon1')?.classList.add('hide');
        document.getElementById('box5tue1')?.classList.remove('hide');
        document.getElementById('box5wed1')?.classList.remove('hide');
        document.getElementById('box5thu1')?.classList.remove('hide');
        document.getElementById('box5fri1')?.classList.remove('hide');
        document.getElementById('box5sat1')?.classList.remove('hide');
      } else if (val.vdayOfWeek == 'Tuesday') {
        this.tuerow = true;

        document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
        document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
        document.getElementById('box5tue')?.classList.add('box5holidayedithover');
        document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
        document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
        document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sun')?.classList.add('hide');
        document.getElementById('box5mon')?.classList.add('hide');
        document.getElementById('box5tue')?.classList.remove('hide');
        document.getElementById('box5wed')?.classList.add('hide');
        document.getElementById('box5thu')?.classList.add('hide');
        document.getElementById('box5fri')?.classList.add('hide');
        document.getElementById('box5sat')?.classList.add('hide');
        document.getElementById('box5sun1')?.classList.remove('hide');
        document.getElementById('box5mon1')?.classList.remove('hide');
        document.getElementById('box5tue1')?.classList.add('hide');
        document.getElementById('box5wed1')?.classList.remove('hide');
        document.getElementById('box5thu1')?.classList.remove('hide');
        document.getElementById('box5fri1')?.classList.remove('hide');
        document.getElementById('box5sat1')?.classList.remove('hide');
      } else if (val.vdayOfWeek == 'Wednesday') {
        this.wedrow = true;

        document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
        document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
        document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
        document.getElementById('box5wed')?.classList.add('box5holidayedithover');
        document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
        document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sun')?.classList.add('hide');
        document.getElementById('box5mon')?.classList.add('hide');
        document.getElementById('box5tue')?.classList.add('hide');
        document.getElementById('box5wed')?.classList.remove('hide');
        document.getElementById('box5thu')?.classList.add('hide');
        document.getElementById('box5fri')?.classList.add('hide');
        document.getElementById('box5sat')?.classList.add('hide');
        document.getElementById('box5sun1')?.classList.remove('hide');
        document.getElementById('box5mon1')?.classList.remove('hide');
        document.getElementById('box5tue1')?.classList.remove('hide');
        document.getElementById('box5wed1')?.classList.add('hide');
        document.getElementById('box5thu1')?.classList.remove('hide');
        document.getElementById('box5fri1')?.classList.remove('hide');
        document.getElementById('box5sat1')?.classList.remove('hide');
      } else if (val.vdayOfWeek == 'Thursday') {
        this.thurow = true;

        document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
        document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
        document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
        document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
        document.getElementById('box5thu')?.classList.add('box5holidayedithover');
        document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sun')?.classList.add('hide');
        document.getElementById('box5mon')?.classList.add('hide');
        document.getElementById('box5tue')?.classList.add('hide');
        document.getElementById('box5wed')?.classList.add('hide');
        document.getElementById('box5thu')?.classList.remove('hide');
        document.getElementById('box5fri')?.classList.add('hide');
        document.getElementById('box5sat')?.classList.add('hide');
        document.getElementById('box5sun1')?.classList.remove('hide');
        document.getElementById('box5mon1')?.classList.remove('hide');
        document.getElementById('box5tue1')?.classList.remove('hide');
        document.getElementById('box5wed1')?.classList.remove('hide');
        document.getElementById('box5thu1')?.classList.add('hide');
        document.getElementById('box5fri1')?.classList.remove('hide');
        document.getElementById('box5sat1')?.classList.remove('hide');
      } else if (val.vdayOfWeek == 'Friday') {
        this.frirow = true;

        document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
        document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
        document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
        document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
        document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
        document.getElementById('box5fri')?.classList.add('box5holidayedithover');
        document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sun')?.classList.add('hide');
        document.getElementById('box5mon')?.classList.add('hide');
        document.getElementById('box5tue')?.classList.add('hide');
        document.getElementById('box5wed')?.classList.add('hide');
        document.getElementById('box5thu')?.classList.add('hide');
        document.getElementById('box5fri')?.classList.remove('hide');
        document.getElementById('box5sat')?.classList.add('hide');
        document.getElementById('box5sun1')?.classList.remove('hide');
        document.getElementById('box5mon1')?.classList.remove('hide');
        document.getElementById('box5tue1')?.classList.remove('hide');
        document.getElementById('box5wed1')?.classList.remove('hide');
        document.getElementById('box5thu1')?.classList.remove('hide');
        document.getElementById('box5fri1')?.classList.add('hide');
        document.getElementById('box5sat1')?.classList.remove('hide');
      } else if (val.vdayOfWeek == 'Saturday') {
        this.satrow = true;
        document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
        document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
        document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
        document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
        document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
        document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sat')?.classList.add('box5holidayedithover');
        document.getElementById('box5sun')?.classList.add('hide');
        document.getElementById('box5mon')?.classList.add('hide');
        document.getElementById('box5tue')?.classList.add('hide');
        document.getElementById('box5wed')?.classList.add('hide');
        document.getElementById('box5thu')?.classList.add('hide');
        document.getElementById('box5fri')?.classList.add('hide');
        document.getElementById('box5sat')?.classList.remove('hide');
        document.getElementById('box5sun1')?.classList.remove('hide');
        document.getElementById('box5mon1')?.classList.remove('hide');
        document.getElementById('box5tue1')?.classList.remove('hide');
        document.getElementById('box5wed1')?.classList.remove('hide');
        document.getElementById('box5thu1')?.classList.remove('hide');
        document.getElementById('box5fri1')?.classList.remove('hide');
        document.getElementById('box5sat1')?.classList.add('hide');
      }
      if (val.vrepeatEveryTimeline == 'Year') {
        this.yearrulerow = true;
        this.monthrulerow = false;
        this.weekrulerow = false;
        this.dayrulerow = false;
        document.getElementById('yearrowtext')?.classList.remove('opacitycolour');
        document.getElementById('monthrowtext')?.classList.add('opacitycolour');
        document.getElementById('weekrowtext')?.classList.add('opacitycolour');
        document.getElementById('dayrowtext')?.classList.add('opacitycolour');
      } else if (val.vrepeatEveryTimeline == 'Month') {
        this.yearrulerow = false;
        this.monthrulerow = true;
        this.weekrulerow = false;
        this.dayrulerow = false;
        document.getElementById('monthrrowtext')?.classList.remove('opacitycolour');
        document.getElementById('yearrowtext')?.classList.add('opacitycolour');
        document.getElementById('weekrowtext')?.classList.add('opacitycolour');
        document.getElementById('dayrowtext')?.classList.add('opacitycolour');
      } else if (val.vrepeatEveryTimeline == 'Week') {
        this.yearrulerow = false;
        this.monthrulerow = false;
        this.weekrulerow = true;
        this.dayrulerow = false;
        document.getElementById('weekrowtext')?.classList.remove('opacitycolour');
        document.getElementById('monthrowtext')?.classList.add('opacitycolour');
        document.getElementById('yearrowtext')?.classList.add('opacitycolour');
        document.getElementById('dayrowtext')?.classList.add('opacitycolour');
      } else if (val.vrepeatEveryTimeline == 'Day') {
        this.yearrulerow = false;
        this.monthrulerow = false;
        this.weekrulerow = false;
        this.dayrulerow = true;
        document.getElementById('dayrowtext')?.classList.remove('opacitycolour');
        document.getElementById('monthrowtext')?.classList.add('opacitycolour');
        document.getElementById('weekrowtext')?.classList.add('opacitycolour');
        document.getElementById('yearrowtext')?.classList.add('opacitycolour');
      }
      if (val.valternateObservation == 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday') {
        val.observation1rule = true;
        val.observation2rule = false;
        val.observation3rule = false;
        val.observation4rule = false;
        document.getElementById('observ1rule')?.classList.remove('hide');
        document.getElementById('observ2rule')?.classList.add('hide');
        document.getElementById('observ3rule')?.classList.add('hide');
        document.getElementById('observ4rule')?.classList.add('hide');
        document.getElementById('observ1rule2')?.classList.add('hide');
        document.getElementById('observ2rule2')?.classList.remove('hide');
        document.getElementById('observ3rule2')?.classList.remove('hide');
        document.getElementById('observ4rule2')?.classList.remove('hide');
      } else if (val.valternateObservation == 'Observes Saturday Holidays on Previous Workday') {
        val.observation1rule = false;
        val.observation2rule = true;
        val.observation3rule = false;
        val.observation4rule = false;
        document.getElementById('observ1rule')?.classList.add('hide');
        document.getElementById('observ2rule')?.classList.remove('hide');
        document.getElementById('observ3rule')?.classList.add('hide');
        document.getElementById('observ4rule')?.classList.add('hide');
        document.getElementById('observ1rule2')?.classList.remove('hide');
        document.getElementById('observ2rule2')?.classList.add('hide');
        document.getElementById('observ3rule2')?.classList.remove('hide');
        document.getElementById('observ4rule2')?.classList.remove('hide');
      } else if (val.valternateObservation == 'Observes Sunday Holidays on Next Workday') {
        val.observation1rule = false;
        val.observation2rule = false;
        val.observation3rule = true;
        val.observation4rule = false;
        document.getElementById('observ1rule')?.classList.add('hide');
        document.getElementById('observ2rule')?.classList.add('hide');
        document.getElementById('observ3rule')?.classList.remove('hide');
        document.getElementById('observ4rule')?.classList.add('hide');
        document.getElementById('observ1rule2')?.classList.remove('hide');
        document.getElementById('observ2rule2')?.classList.remove('hide');
        document.getElementById('observ3rule2')?.classList.add('hide');
        document.getElementById('observ4rule2')?.classList.remove('hide');
      } else if (val.valternateObservation == 'Does Not Observe on an Alternate Workday') {
        val.observation1rule = false;
        val.observation2rule = false;
        val.observation3rule = false;
        val.observation4rule = true;
        document.getElementById('observ1rule')?.classList.add('hide');
        document.getElementById('observ2rule')?.classList.add('hide');
        document.getElementById('observ3rule')?.classList.add('hide');
        document.getElementById('observ4rule')?.classList.remove('hide');
        document.getElementById('observ1rule2')?.classList.remove('hide');
        document.getElementById('observ2rule2')?.classList.remove('hide');
        document.getElementById('observ3rule2')?.classList.remove('hide');
        document.getElementById('observ4rule2')?.classList.add('hide');
      }

    });
  }
  activeeditweek() {
    this.editholiday.forEach((val: any) => {

      if (val.vweeekOfMonth == '1st') {
        this.editmovingweekname = 'First';
      } else if (val.vweeekOfMonth == '2nd') {
        this.editmovingweekname = 'Second';
      } else if (val.vweeekOfMonth == '3rd') {
        this.editmovingweekname = 'Third';
      } else if (val.vweeekOfMonth == '4th') {
        this.editmovingweekname = 'Fourth';
      } else if (val.vweeekOfMonth == '5th') {
        this.editmovingweekname = 'Fifth';
      } else if (val.vweeekOfMonth == 'Last') {
        this.editmovingweekname = 'Last';
      }
      if (val.vexpire == 'Never') {
        this.viewexpireevent = false;
        this.viewexpireyear = false;
        document.getElementById('edittextexpire1year')?.classList.add('hide');
        document.getElementById('edittextexpire2year')?.classList.add('hide');
        document.getElementById('edittextexpire1event')?.classList.add('hide');
        document.getElementById('edittextexpire2event')?.classList.add('hide');
      } else if (val.vexpire == 'In Year') {
        this.viewexpireevent = false;
        this.viewexpireyear = true;
        document.getElementById('edittextexpire1event')?.classList.add('hide');
        document.getElementById('edittextexpire2event')?.classList.add('hide');
        document.getElementById('edittextexpire1year')?.classList.remove('hide');
        document.getElementById('edittextexpire2year')?.classList.remove('hide');
      } else {
        this.viewexpireevent = true;
        this.viewexpireyear = false;
        document.getElementById('edittextexpire1year')?.classList.add('hide');
        document.getElementById('edittextexpire2year')?.classList.add('hide');
        document.getElementById('edittextexpire1event')?.classList.remove('hide');
        document.getElementById('edittextexpire2event')?.classList.remove('hide');
      }
      if (val.vdayOfWeek == '' && val.vweeekOfMonth == '') {
        this.viewdayofmonth = true;
        this.viewdateofmonth = false;
        document.getElementById('editrow1box2')?.classList.add('hide');
        document.getElementById('editrow1box3')?.classList.remove('hide');
      } else {
        document.getElementById('editrow1box2')?.classList.remove('hide');
        document.getElementById('editrow1box3')?.classList.add('hide');
      }
      if (val.vdateOfMonth == '') {
        this.viewdayofmonth = false;
        this.viewdateofmonth = true;
        document.getElementById('editrow2box2')?.classList.add('hide');
        document.getElementById('editrow2box3')?.classList.remove('hide');
      } else {
        document.getElementById('editrow2box2')?.classList.remove('hide');
        document.getElementById('editrow2box3')?.classList.add('hide');
      }
      if (val.vobserveAsWorkDay == true) {
        this.editobservationnumber = true;
        document.getElementById('editrow3box2')?.classList.remove('hide');
        document.getElementById('editrow3box3')?.classList.add('hide');
        document.getElementById('editrow4box2')?.classList.remove('hide');
        document.getElementById('editrow4box3')?.classList.add('hide');
      } else {
        this.editobservationnumber = false;
        document.getElementById('editrow3box2')?.classList.add('hide');
        document.getElementById('editrow3box3')?.classList.remove('hide');
        document.getElementById('editrow4box2')?.classList.add('hide');
        document.getElementById('editrow4box3')?.classList.remove('hide');
      }
      if (val.vdayOfWeek == 'Sunday') {
        document.getElementById('editbox5sun')?.classList.add('box5holidayedithover');
      } else if (val.vdayOfWeek == 'Monday') {
        document.getElementById('editbox5mon')?.classList.add('box5holidayedithover');
      } else if (val.vdayOfWeek == 'Tuesday') {
        document.getElementById('editbox5tue')?.classList.add('box5holidayedithover');
      } else if (val.vdayOfWeek == 'Wednesday') {
        document.getElementById('editbox5wed')?.classList.add('box5holidayedithover');
      } else if (val.vdayOfWeek == 'Thursday') {
        document.getElementById('editbox5thu')?.classList.add('box5holidayedithover');
      } else if (val.vdayOfWeek == 'Friday') {
        document.getElementById('editbox5fri')?.classList.add('box5holidayedithover');
      } else if (val.vdayOfWeek == 'Saturday') {
        document.getElementById('editbox5sat')?.classList.add('box5holidayedithover');
      }
    });
  }
  dropdownsearch1(event: any, id: any) {
    if (event != '') {
      this.activelowerbtn();
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          this.onTheOptionList = [];
          this.onTheOptionLists.forEach((val1: any) => {
            let a = val1.name.slice(0, 1);
            let b = val1.name.slice(0, 2);
            let c = val1.name.slice(0, 3);
            let d = val1.name.slice(0, 4);
            let e = val1.name.slice(0, 5);
            let f = val1.name.slice(0, 6);
            let g = val1.name.slice(0, 7);
            let h = val1.name.slice(0, 8);
            let i = val1.name.slice(0, 9);
            let j = val1.name.slice(0, 10);
            if (this.movingweekname.toLowerCase() == a.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == b.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == c.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == d.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == e.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == f.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == g.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == h.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == i.toLowerCase()) {
              val1.value = false;
            } else if (this.movingweekname.toLowerCase() == j.toLowerCase()) {
              val1.value = false;
            } else {
              val1.value = true;
            }

            if (val1.value == false) {
              this.onTheOptionList.push(val1);
              console.log(this.onTheOptionList)
              document.getElementById('holiday2arrowup')?.click();
            }
          });
        }
      });
    } else {
      this.onTheOptionList = [];
      this.onTheOptionLists.forEach((val1: any) => {
        this.onTheOptionList.push(val1);
        console.log(this.onTheOptionList)
        document.getElementById('holiday2arrowup')?.click();
      });
    }
  }
  dropdownsearch2(event: any, id: any) {
    if (event != '') {
      this.activelowerbtn();
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          this.monthOptionList = [];
          this.monthOptionLists.forEach((val1: any) => {
            let a = val1.name.slice(0, 1);
            let b = val1.name.slice(0, 2);
            let c = val1.name.slice(0, 3);
            let d = val1.name.slice(0, 4);
            let e = val1.name.slice(0, 5);
            let f = val1.name.slice(0, 6);
            let g = val1.name.slice(0, 7);
            let h = val1.name.slice(0, 8);
            let i = val1.name.slice(0, 9);
            let j = val1.name.slice(0, 10);
            if (val.vmonth.toLowerCase() == a.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == b.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == c.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == d.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == e.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == f.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == g.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == h.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == i.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == j.toLowerCase()) {
              val1.value = false;
            } else {
              val1.value = true;
            }

            if (val1.value == false) {
              this.monthOptionList.push(val1);
              console.log(this.monthOptionList)
              document.getElementById('holiday3arrowup')?.click();
            }
          });
        }
      });
    } else {
      this.monthOptionList = [];
      this.monthOptionLists.forEach((val1: any) => {
        this.monthOptionList.push(val1);
        console.log(this.monthOptionList)
        document.getElementById('holiday3arrowup')?.click();
      });
    }
  }
  dropdownsearch3(event: any, id: any) {
    if (event != '') {
      this.activelowerbtn();
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          this.daysOptionList = [];
          this.daysOptionLists.forEach((val1: any) => {
            let a = val1.name.slice(0, 1);
            let b = val1.name.slice(0, 2);
            let c = val1.name.slice(0, 3);
            let d = val1.name.slice(0, 4);
            if (val.vdateOfMonth.toLowerCase() == a.toLowerCase()) {
              val1.value = false;
            } else if (val.vdateOfMonth.toLowerCase() == b.toLowerCase()) {
              val1.value = false;
            } else if (val.vdateOfMonth.toLowerCase() == c.toLowerCase()) {
              val1.value = false;
            } else if (val.vdateOfMonth.toLowerCase() == d.toLowerCase()) {
              val1.value = false;
            } else {
              val1.value = true;
            }

            if (val1.value == false) {
              this.daysOptionList.push(val1);
              console.log(this.daysOptionList)
              document.getElementById('holiday2arrowup')?.click();
            }
          });
        }
      });
    } else {
      this.daysOptionList = [];
      this.daysOptionLists.forEach((val1: any) => {
        this.daysOptionList.push(val1);
        console.log(this.daysOptionList)
        document.getElementById('holiday2arrowup')?.click();
      });
    }
  }
  dropdownsearch4(event: any, id: any) {
    if (event != '') {
      this.activelowerbtn();
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          this.monthOptionList = [];
          this.monthOptionLists.forEach((val1: any) => {
            let a = val1.name.slice(0, 1);
            let b = val1.name.slice(0, 2);
            let c = val1.name.slice(0, 3);
            let d = val1.name.slice(0, 4);
            let e = val1.name.slice(0, 5);
            let f = val1.name.slice(0, 6);
            let g = val1.name.slice(0, 7);
            let h = val1.name.slice(0, 8);
            let i = val1.name.slice(0, 9);
            let j = val1.name.slice(0, 10);
            if (val.vmonth.toLowerCase() == a.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == b.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == c.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == d.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == e.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == f.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == g.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == h.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == i.toLowerCase()) {
              val1.value = false;
            } else if (val.vmonth.toLowerCase() == j.toLowerCase()) {
              val1.value = false;
            } else {
              val1.value = true;
            }

            if (val1.value == false) {
              this.monthOptionList.push(val1);
              console.log(this.monthOptionList)
              document.getElementById('expirehover')?.click();
            }
          });
        }
      });
    } else {
      this.monthOptionList = [];
      this.monthOptionLists.forEach((val1: any) => {
        this.monthOptionList.push(val1);
        console.log(this.monthOptionList)
        document.getElementById('expirehover')?.click();
      });
    }
  }
  viewall() {
    this.singleholiday = [];
    this.holidays.forEach((val: any) => {
      if (val.sequence == 1) {
        this.singleholiday.push(val);
      }
    });

    let a = 1;
    const interval = setInterval(() => {
      a++;
      if (a == 2) {
        clearInterval(interval);
        this.activeweek();
      } else {
        this.activeweek();
      }
    }, 200);
  }

  close(id: any) {
    if (this.saveandclose == true) {
      this.saveandclose = false;
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.repeatEveryCount = val.vrepeatEveryCount;
          val.repeatEveryTimeline = val.vrepeatEveryTimeline;
          val.expire = val.vexpire;
          val.month = val.vmonth;
          val.dateOfMonth = val.vdateOfMonth;
          val.weeekOfMonth = val.vweeekOfMonth;
          val.dayOfWeek = val.vdayOfWeek;
          val.observeAsWorkDay = val.vobserveAsWorkDay;
          val.observeNumberOfDays = val.vobserveNumberOfDays;
          val.alternateObservation = val.valternateObservation;
          val.holidayName = val.vholidayName;
          val.eholidayName = val.vholidayName;
          val.observationDayMethod = val.vobservationDayMethod;
          val.ruleSetting = val.vruleSetting;
          val.expiryYear = val.vexpiryYear;
          val.expireEvent = val.vexpireEvent;
          val.observedOn = val.vobservedOn;
          val.observationnumber = val.vobserveNumberOfDays;
          if (val.vobserveNumberOfDays == 1) {
            val.observationnumber = '01';
          } else if (val.vobserveNumberOfDays == 2) {
            val.observationnumber = '02';
          } else if (val.vobserveNumberOfDays == 3) {
            val.observationnumber = '03';
          } else if (val.vobserveNumberOfDays == 4) {
            val.observationnumber = '04';
          } else if (val.vobserveNumberOfDays == 5) {
            val.observationnumber = '05';
          } else if (val.vobserveNumberOfDays == 6) {
            val.observationnumber = '06';
          } else if (val.vobserveNumberOfDays == 7) {
            val.observationnumber = '07';
          } else if (val.vobserveNumberOfDays == 8) {
            val.observationnumber = '08';
          } else if (val.vobserveNumberOfDays == 9) {
            val.observationnumber = '09';
          } else if (val.vobserveNumberOfDays >= 10) {
            val.observationnumber = val.observeNumberOfDays;
          }
          if (val.observeAsWorkDay == true) {
            val.observation = 'YES';
            val.alternateday = val.valternateObservation;
            document.getElementById('hourworkdayseletexttimetext' + val.holidayId)?.classList.add('hide');
            document.getElementById('hourworkdayseletexttime' + val.holidayId)?.classList.remove('hide');
            document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.remove('hide');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.remove('hide');
            document.getElementById('checkdaystime' + val.holidayId)?.classList.remove('hide');
          } else {
            val.observation = 'NO';
            val.alternateday = 'N/A';
            val.observationnumber = 'N/A';
            document.getElementById('hourworkdayseletexttimetext' + val.holidayId)?.classList.remove('hide');
            document.getElementById('hourworkdayseletexttime' + val.holidayId)?.classList.add('hide');
            document.getElementById('hourbuttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.add('hide');
            document.getElementById('checkdaystime' + val.holidayId)?.classList.add('hide');
          }
          if (val.observeAsWorkDay == true) {
            val.dayyesrule = true;
            val.daynorule = false;
          } else {
            val.dayyesrule = false;
            val.daynorule = true;
          }
          if (val.vobserveNumberOfDays == 1) {
            document.getElementById('buttondays1time' + val.holidayId)?.classList.add('opacityarrow');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.add('opacityarrow');
          } else {
            document.getElementById('buttondays1time' + val.holidayId)?.classList.remove('opacityarrow');
            document.getElementById('buttondaystime' + val.holidayId)?.classList.remove('opacityarrow');
          }
        }
      });
      this.closealldrop();
    } else {
      this.editcancelbutton(id);
      this.closealldrop();
    }
    this.daysOptionList = [];
    this.daysOptionLists.forEach((val1: any) => {
      this.daysOptionList.push(val1);
    });
    this.monthOptionList = [];
    this.monthOptionLists.forEach((val1: any) => {
      this.monthOptionList.push(val1);
    });
    this.onTheOptionList = [];
    this.onTheOptionLists.forEach((val1: any) => {
      this.onTheOptionList.push(val1);
    });
  }
  save(id: any) {
    this.saveandclose = true;
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        let updateCon = {
          "holidayId": id,
          "repeatEveryCount": val.vrepeatEveryCount,
          "repeatEveryTimeline": val.vrepeatEveryTimeline,
          "expire": val.vexpire,
          "month": val.vmonth,
          "dateOfMonth": val.vdateOfMonth,
          "weeekOfMonth": val.vweeekOfMonth,
          "dayOfWeek": val.vdayOfWeek,
          "observeAsWorkDay": val.vobserveAsWorkDay,
          "observeNumberOfDays": val.vobserveNumberOfDays,
          "alternateObservation": val.valternateObservation,
          "holidayName": val.vholidayName,
          "observationDayMethod": val.vobservationDayMethod,
          "ruleSetting": val.vruleSetting,
          "expiryYear": val.vexpiryYear,
          "expireEvent": val.vexpireEvent,
          "observedOn": val.vobservedOn,
        };
        this.library.update(updateCon).subscribe((val) => {
          console.log("updated", val);
        });
      }
    });
    this.closealldrop();
    this.inactivelowerbtn();
  }

  savennext(id: any) {
    this.save(id);
    this.vnext();
    this.inactivelowerbtn();
    this.closealldrop();
  }

  savenclose(id: any) {
    this.save(id);
    this.inactivelowerbtn();
    this.closealldrop();
    this.close(id);
    document.getElementById('closebtncol')?.click();
  }

  closealldrop() {
    this.expirecheck();
    this.weekcheck();
    this.monthcheck();
    this.month2check();
    this.datecheck();
    this.observationnumber = false;
  }


  //edit column
  editclosealldrop() {
    this.editexpirecheck();
    this.editweekcheck();
    this.editmonthcheck();
    this.editmonth2check();
    this.editdatecheck();
    this.editobservationnumber = false;
  }

  editholidaynameactive(event: any, holidayname: any, id: any) {
    if (event.keyCode == 13) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          if (holidayname != val.eholidayName) {
            val.vholidayName = holidayname;
          } else {
          }
        }
      });
    }
  }
  editholidaycountactive(event: any, holidaycount: any, id: any) {
    if (event.keyCode == 13) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          if (holidaycount != val.repeatEveryCount) {
            val.vrepeatEveryCount = holidaycount;
          } else {

          }
        }
      });
    }
  }
  editonchange(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = true;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          val.vrepeatEveryTimeline = 'Year';
        }
      });

    } else {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          val.vrepeatEveryTimeline = '';
        }
      });

    }
  }
  editon2change(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = true;
          val.weekrule = false;
          val.dayrule = false;
          val.vrepeatEveryTimeline = 'Month';
        }
      });

    } else {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          val.vrepeatEveryTimeline = '';
        }
      });

    }
  }
  editon3change(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = true;
          val.dayrule = false;
          val.vrepeatEveryTimeline = 'Week';
        }
      });

    } else {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          val.vrepeatEveryTimeline = '';
        }
      });

    }
  }
  editon4change(event: any, id: any) {
    if (event.target.checked) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = true;
          val.vrepeatEveryTimeline = 'Day';
        }
      });

    } else {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == id) {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
          val.vrepeatEveryTimeline = '';
        }
      });

    }
  }
  //Expire Dropdown

  editexpireedit(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editactivedrop = true;
      this.editarrowexpire = true;
      this.edithoverexpire = true;
      this.editexpireenternumber = id;
      document.getElementById('editholiday1arrowup')?.classList.add('hide');
      document.getElementById('editholiday1arrowdown')?.classList.remove('hide');
      document.getElementById('editholiday1list')?.classList.remove('hide');
    }
    this.expireOptionList.forEach((val2: any) => {
      if (val2.value == workday) {
        this.editmovingexpire = val2.id;
        this.editmovingexpirename = workday;
        document.getElementById('editswtchexpirelist' + val2.id)?.classList.add('active');
      }
    });
  }
  editexpirecheck() {
    this.editactivedrop = false;
    this.editarrowexpire = false;
    this.edithoverexpire = false;
    document.getElementById('editholiday1arrowup')?.classList.remove('hide');
    document.getElementById('editholiday1arrowdown')?.classList.add('hide');
    document.getElementById('editholiday1list')?.classList.add('hide');
    this.expireOptionList.forEach((val2: any) => {
      document.getElementById('editswtchexpirelist' + val2.id)?.classList.remove('active1');
      document.getElementById('editswtchexpirelist' + val2.id)?.classList.remove('active');
      document.getElementById('editswtchexpirelist' + val2.id)?.classList.remove('hoverday');

    });
  }
  editswitchexpire(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editexpireedit(id, workday);
    } else {
      this.editexpirecheck();
    }
  }

  editmoveupexpire() {
    if (this.editarrowexpire == true) {
      this.editmovingexpire -= 1;
      if (this.editmovingexpire <= 1) {
        this.editmovingexpire = 1;
      }
      this.expireOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingexpire) {
          document.getElementById('editswtchexpirelist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtchexpirelist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtchexpirelist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editmovedownexpire() {
    if (this.editarrowexpire == true) {
      this.editmovingexpire += 1;
      if (this.editmovingexpire >= 3) {
        this.editmovingexpire = 3;
      }
      this.expireOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingexpire) {
          document.getElementById('editswtchexpirelist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtchexpirelist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtchexpirelist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editenterexpire() {
    if (this.editarrowexpire == true) {
      this.expireOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingexpire) {
          this.editupdateexpire(this.editexpireenternumber, val2.value);
        }
      });
      this.editexpirecheck();
    }
  }
  editmouseupexpire() {
    if (this.edithoverexpire == true) {
      this.editarrowexpire = false;
      document.getElementById('editswtchexpirelist' + this.editmovingexpire)?.classList.remove('hoverday');
      this.expireOptionList.forEach((val2: any) => {
        document.getElementById('editswtchexpirelist' + val2.id)?.classList.add('active1');
      });
    }
  }
  editmousedownexpire() {
    if (this.edithoverexpire == true) {
      this.editarrowexpire = true;
      this.expireOptionList.forEach((val2: any) => {
        if (val2.name == this.editmovingexpirename) {
          this.editmovingexpire = val2.id;
          document.getElementById('editswtchexpirelist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  editupdateexpire(id: any, expirevalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vexpire = expirevalue;
      }
    });
    this.editexpirecheck();
    if (expirevalue == 'Never') {
      document.getElementById('edittextexpire1year')?.classList.add('hide');
      document.getElementById('edittextexpire2year')?.classList.add('hide');
      document.getElementById('edittextexpire1event')?.classList.add('hide');
      document.getElementById('edittextexpire2event')?.classList.add('hide');
    } else if (expirevalue == 'In Year') {
      document.getElementById('edittextexpire1event')?.classList.add('hide');
      document.getElementById('edittextexpire2event')?.classList.add('hide');
      document.getElementById('edittextexpire1year')?.classList.remove('hide');
      document.getElementById('edittextexpire2year')?.classList.remove('hide');
      document.getElementById('edittextexpire2year')?.focus();
    } else {
      document.getElementById('edittextexpire1year')?.classList.add('hide');
      document.getElementById('edittextexpire2year')?.classList.add('hide');
      document.getElementById('edittextexpire1event')?.classList.remove('hide');
      document.getElementById('edittextexpire2event')?.classList.remove('hide');
      document.getElementById('edittextexpire1event')?.focus();
    }
  }

  //Week Dropdown

  editweekedit(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editactivedrop = true;
      this.editarrowweek = true;
      this.edithoverweek = true;
      this.editweekenternumber = id;
      document.getElementById('editholiday2arrowup')?.classList.add('hide');
      document.getElementById('editholiday2arrowdown')?.classList.remove('hide');
      document.getElementById('editholiday2list')?.classList.remove('hide');
      console.log(workday)
      if (workday == '1st') {
        this.editmovingweekname = 'First';
      } else if (workday == '2nd') {
        this.editmovingweekname = 'Second';
      } else if (workday == '3rd') {
        this.editmovingweekname = 'Third';
      } else if (workday == '4th') {
        this.editmovingweekname = 'Fourth';
      } else if (workday == '5th') {
        this.editmovingweekname = 'Fifth';
      } else if (workday == 'Last') {
        this.editmovingweekname = 'Last';
      }
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.name == this.editmovingweekname) {
          this.editmovingweek = val2.id;
          document.getElementById('editswtchweeklist' + val2.id)?.classList.add('active');
        }
      });
    }

  }
  editweekcheck() {
    this.editactivedrop = false;
    this.editarrowweek = false;
    this.edithoverweek = false;
    document.getElementById('editholiday2arrowup')?.classList.remove('hide');
    document.getElementById('editholiday2arrowdown')?.classList.add('hide');
    document.getElementById('editholiday2list')?.classList.add('hide');
    this.onTheOptionList.forEach((val2: any) => {
      document.getElementById('editswtchweeklist' + val2.id)?.classList.remove('active1');
      document.getElementById('editswtchweeklist' + val2.id)?.classList.remove('active');
      document.getElementById('editswtchweeklist' + val2.id)?.classList.remove('hoverday');

    });
  }
  editswitchweek(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editweekedit(id, workday);
    } else {
      this.editweekcheck();
    }
  }
  editmoveupweek() {
    if (this.editarrowweek == true) {
      this.editmovingweek -= 1;
      if (this.editmovingweek <= 1) {
        this.editmovingweek = 1;
      }
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingweek) {
          document.getElementById('editswtchweeklist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtchweeklist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtchweeklist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editmovedownweek() {
    if (this.editarrowweek == true) {
      this.editmovingweek += 1;
      if (this.editmovingweek >= 6) {
        this.editmovingweek = 6;
      }
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingweek) {
          document.getElementById('editswtchweeklist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtchweeklist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtchweeklist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editenterweek() {
    if (this.editarrowweek == true) {
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingweek) {
          this.editupdateweek(this.editweekenternumber, val2.name);
        }
      });
      this.editweekcheck();
    }
  }
  editmouseupweek() {
    if (this.edithoverweek == true) {
      this.editarrowweek = false;
      document.getElementById('editswtchweeklist' + this.editmovingweek)?.classList.remove('hoverday');
      this.onTheOptionList.forEach((val2: any) => {
        document.getElementById('editswtchweeklist' + val2.id)?.classList.add('active1');
      });
    }
  }
  editmousedownweek() {
    if (this.edithoverweek == true) {
      this.editarrowweek = true;
      this.onTheOptionList.forEach((val2: any) => {
        if (val2.name == this.editmovingweekname) {
          this.editmovingweek = val2.id;
          document.getElementById('editswtchweeklist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  editupdateweek(id: any, weekvalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        this.editmovingweekname = weekvalue;
        if (weekvalue == 'First') {
          val.vweeekOfMonth = '1st'
        } else if (weekvalue == 'Second') {
          val.vweeekOfMonth = '2nd'
        } else if (weekvalue == 'Third') {
          val.vweeekOfMonth = '3rd'
        } else if (weekvalue == 'Fourth') {
          val.vweeekOfMonth = '4th'
        } else if (weekvalue == 'Fifth') {
          val.vweeekOfMonth = '5th'
        } else {
          val.vweeekOfMonth = weekvalue;
        }
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
      }
    });
    this.editweekcheck();

  }
  editonweekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vdayOfWeek = 'Sunday';
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
      }
    });
    document.getElementById('editbox5sun')?.classList.add('box5holidayedithover');
    document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');

  }
  editon2weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vdayOfWeek = 'Monday';
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
      }
    });
    document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5mon')?.classList.add('box5holidayedithover');
    document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');

  }
  editon3weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vdayOfWeek = 'Tuesday';
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;

      }
    });
    document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5tue')?.classList.add('box5holidayedithover');
    document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');

  }
  editon4weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vdayOfWeek = 'Wednesday';
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;

      }
    });
    document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5wed')?.classList.add('box5holidayedithover');
    document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');

  }
  editon5weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vdayOfWeek = 'Thursday';
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;

      }
    });
    document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5thu')?.classList.add('box5holidayedithover');
    document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');

  }
  editon6weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vdayOfWeek = 'Friday';
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;

      }
    });
    document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5fri')?.classList.add('box5holidayedithover');
    document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');

  }
  editon7weekchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {

        val.vdayOfWeek = 'Saturday';
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;

      }
    });
    document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
    document.getElementById('editbox5sat')?.classList.add('box5holidayedithover');

  }

  //Month dropdown

  editmonthedit(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editactivedrop = true;
      this.editarrowmonth = true;
      this.edithovermonth = true;
      this.editmonthenternumber = id;
      document.getElementById('editholiday3arrowup')?.classList.add('hide');
      document.getElementById('editholiday3arrowdown')?.classList.remove('hide');
      document.getElementById('editholiday3list')?.classList.remove('hide');
      this.monthOptionList.forEach((val2: any) => {
        if (val2.name == workday) {
          this.editmovingmonth = val2.id;
          this.editmovingmonthname = workday;
          document.getElementById('editswtchmonthlist' + val2.id)?.classList.add('active');
        }
      });
    }

  }
  editmonthcheck() {
    this.editactivedrop = false;
    this.editarrowmonth = false;
    this.edithovermonth = false;
    document.getElementById('editholiday3arrowup')?.classList.remove('hide');
    document.getElementById('editholiday3arrowdown')?.classList.add('hide');
    document.getElementById('editholiday3list')?.classList.add('hide');
    this.monthOptionList.forEach((val2: any) => {
      document.getElementById('editswtchmonthlist' + val2.id)?.classList.remove('active1');
      document.getElementById('editswtchmonthlist' + val2.id)?.classList.remove('active');
      document.getElementById('editswtchmonthlist' + val2.id)?.classList.remove('hoverday');
    });
  }

  editswitchmonth(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editmonthedit(id, workday);
    } else {
      this.editmonthcheck();
    }
  }
  editmoveupmonth() {
    if (this.editarrowmonth == true) {
      this.editmovingmonth -= 1;
      if (this.editmovingmonth <= 1) {
        this.editmovingmonth = 1;
      }
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingmonth) {
          document.getElementById('editswtchmonthlist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtchmonthlist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtchmonthlist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editmovedownmonth() {
    if (this.editarrowmonth == true) {
      this.editmovingmonth += 1;
      if (this.editmovingmonth >= 12) {
        this.editmovingmonth = 12;
      }
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingmonth) {
          document.getElementById('editswtchmonthlist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtchmonthlist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtchmonthlist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editentermonth() {
    if (this.editarrowmonth == true) {
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingmonth) {
          this.editupdatemonth(this.editmonthenternumber, val2.name);
        }
      });
      this.editmonthcheck();
    }
  }
  editmouseupmonth() {
    if (this.edithovermonth == true) {
      this.editarrowmonth = false;
      document.getElementById('editswtchmonthlist' + this.editmovingmonth)?.classList.remove('hoverday');
      this.monthOptionList.forEach((val2: any) => {
        document.getElementById('editswtchmonthlist' + val2.id)?.classList.add('active1');
      });
    }
  }
  editmousedownmonth() {
    if (this.edithovermonth == true) {
      this.editarrowmonth = true;
      this.monthOptionList.forEach((val2: any) => {
        if (val2.name == this.editmovingmonthname) {
          this.editmovingmonth = val2.id;
          document.getElementById('editswtchmonthlist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  editupdatemonth(id: any, monthvalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vmonth = monthvalue;
        val.vobservationDayMethod = 'Always ' + val.vweeekOfMonth + ' ' + val.vdayOfWeek + ' in ' + val.vmonth;
      }
    });
    this.editmonthcheck();

  }
  //Month2 dropdown

  editmonth2edit(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editactivedrop = true;
      this.editarrow2month = true;
      this.edithover2month = true;
      this.editmonth2enternumber = id;
      document.getElementById('editholiday4arrowup')?.classList.add('hide');
      document.getElementById('editholiday4arrowdown')?.classList.remove('hide');
      document.getElementById('editholiday4list')?.classList.remove('hide');
      this.monthOptionList.forEach((val2: any) => {
        if (val2.name == workday) {
          this.editmoving2month = val2.id;
          this.editmoving2monthname = workday;
          document.getElementById('editswtch2monthlist' + val2.id)?.classList.add('active');
        }
      });
    }

  }
  editmonth2check() {
    this.editactivedrop = false;
    this.editarrow2month = false;
    this.edithover2month = false;
    document.getElementById('editholiday4arrowup')?.classList.remove('hide');
    document.getElementById('editholiday4arrowdown')?.classList.add('hide');
    document.getElementById('editholiday4list')?.classList.add('hide');
    this.monthOptionList.forEach((val2: any) => {
      document.getElementById('editswtch2monthlist' + val2.id)?.classList.remove('active1');
      document.getElementById('editswtch2monthlist' + val2.id)?.classList.remove('active');
      document.getElementById('editswtch2monthlist' + val2.id)?.classList.remove('hoverday');
    });
  }
  editswitch2month(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editmonth2edit(id, workday);
    } else {
      this.editmonth2check();
    }
  }
  editmoveup2month() {
    if (this.editarrow2month == true) {
      this.editmoving2month -= 1;
      if (this.editmoving2month <= 1) {
        this.editmoving2month = 1;
      }
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.editmoving2month) {
          document.getElementById('editswtch2monthlist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtch2monthlist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtch2monthlist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editmovedown2month() {
    if (this.editarrow2month == true) {
      this.editmoving2month += 1;
      if (this.editmoving2month >= 12) {
        this.editmoving2month = 12;
      }
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.editmoving2month) {
          document.getElementById('editswtch2monthlist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtch2monthlist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtch2monthlist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editenter2month() {
    if (this.editarrow2month == true) {
      this.monthOptionList.forEach((val2: any) => {
        if (val2.id == this.editmoving2month) {
          this.editupdate2month(this.editmonth2enternumber, val2.name);
        }
      });
      this.editmonth2check();
    }
  }
  editmouseup2month() {
    if (this.edithover2month == true) {
      this.editarrow2month = false;
      document.getElementById('editswtch2monthlist' + this.editmoving2month)?.classList.remove('hoverday');
      this.monthOptionList.forEach((val2: any) => {
        document.getElementById('editswtch2monthlist' + val2.id)?.classList.add('active1');
      });
    }
  }
  editmousedown2month() {
    if (this.edithover2month == true) {
      this.editarrow2month = true;
      this.monthOptionList.forEach((val2: any) => {
        if (val2.name == this.editmoving2monthname) {
          this.editmoving2month = val2.id;
          document.getElementById('editswtch2monthlist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  editupdate2month(id: any, monthvalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vmonth = monthvalue;
        val.vobservationDayMethod = 'Always on ' + val.vmonth + ' ' + val.vdateOfMonth;
      }
    });
    this.editmonth2check();

  }
  //Date dropdown

  editdateedit(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editactivedrop = true;
      this.editarrowdate = true;
      this.edithoverdate = true;
      this.editdateenternumber = id;
      document.getElementById('editholiday5arrowup')?.classList.add('hide');
      document.getElementById('editholiday5arrowdown')?.classList.remove('hide');
      document.getElementById('editholiday5list')?.classList.remove('hide');
      this.daysOptionList.forEach((val2: any) => {
        if (val2.name == workday) {
          this.editmovingdate = val2.id;
          this.editmovingdatename = workday;
          document.getElementById('editswtchdatelist' + val2.id)?.classList.add('active');
        }
      });
    }

  }
  editdatecheck() {
    this.editactivedrop = false;
    this.editarrowdate = false;
    this.edithoverdate = false;
    document.getElementById('editholiday5arrowup')?.classList.remove('hide');
    document.getElementById('editholiday5arrowdown')?.classList.add('hide');
    document.getElementById('editholiday5list')?.classList.add('hide');
    this.daysOptionList.forEach((val2: any) => {
      document.getElementById('editswtchdatelist' + val2.id)?.classList.remove('active1');
      document.getElementById('editswtchdatelist' + val2.id)?.classList.remove('active');
      document.getElementById('editswtchdatelist' + val2.id)?.classList.remove('hoverday');
    });
  }

  editswitchdate(id: any, workday: any) {
    if (this.editactivedrop == false) {
      this.editdateedit(id, workday);
    } else {
      this.editdatecheck();
    }
  }
  editmoveupdate() {
    if (this.editarrowdate == true) {
      this.editmovingdate -= 1;
      if (this.editmovingdate <= 1) {
        this.editmovingdate = 1;
      }
      this.daysOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingdate) {
          document.getElementById('editswtchdatelist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtchdatelist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtchdatelist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editmovedowndate() {
    if (this.editarrowdate == true) {
      this.editmovingdate += 1;
      if (this.editmovingdate >= 31) {
        this.editmovingdate = 31;
      }
      this.daysOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingdate) {
          document.getElementById('editswtchdatelist' + val2.id)?.classList.add('hoverday');
        } else {
          document.getElementById('editswtchdatelist' + val2.id)?.classList.add('active1');
          document.getElementById('editswtchdatelist' + val2.id)?.classList.remove('hoverday');
        }
      });
    }

  }
  editenterdate() {
    if (this.editarrowdate == true) {
      this.daysOptionList.forEach((val2: any) => {
        if (val2.id == this.editmovingdate) {
          this.editupdatedate(this.editdateenternumber, val2.name);
        }
      });
      this.editdatecheck();
    }
  }
  editmouseupdate() {
    if (this.edithoverdate == true) {
      this.editarrowdate = false;
      document.getElementById('editswtchdatelist' + this.editmovingdate)?.classList.remove('hoverday');
      this.daysOptionList.forEach((val2: any) => {
        document.getElementById('editswtchdatelist' + val2.id)?.classList.add('active1');
      });
    }
  }
  editmousedowndate() {
    if (this.edithoverdate == true) {
      this.editarrowdate = true;
      this.daysOptionList.forEach((val2: any) => {
        if (val2.name == this.editmovingdatename) {
          this.editmovingdate = val2.id;
          document.getElementById('editswtchdatelist' + val2.id)?.classList.add('hoverday');
        }
      });
    }
  }
  editupdatedate(id: any, datevalue: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vdateOfMonth = datevalue;
        val.vobservationDayMethod = 'Always on ' + val.vmonth + ' ' + val.vdateOfMonth;
      }
    });
    this.editdatecheck();

  }
  editworking1dayobservation(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vobserveAsWorkDay = true;
        val.dayyesrule = true;
        val.daynorule = false;
      }
    });
    this.editon4observationchange(id);
    document.getElementById('editrow3box2')?.classList.remove('hide');
    document.getElementById('editrow3box3')?.classList.add('hide');
    document.getElementById('editrow4box2')?.classList.remove('hide');
    document.getElementById('editrow4box3')?.classList.add('hide');
  }
  editworking2dayobservation(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vobserveAsWorkDay = false;
        val.dayyesrule = false;
        val.daynorule = true;
        val.valternateObservation = '';
      }
    });
    document.getElementById('editrow3box2')?.classList.add('hide');
    document.getElementById('editrow3box3')?.classList.remove('hide');
    document.getElementById('editrow4box2')?.classList.add('hide');
    document.getElementById('editrow4box3')?.classList.remove('hide');
  }
  editon1observationchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.observation1rule = true;
        val.observation2rule = false;
        val.observation3rule = false;
        val.observation4rule = false;
        val.valternateObservation = 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday';
      }
    });

  }
  editon2observationchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.observation1rule = false;
        val.observation2rule = true;
        val.observation3rule = false;
        val.observation4rule = false;
        val.valternateObservation = 'Observes Saturday Holidays on Previous Workday';
      }
    });

  }
  editon3observationchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.observation1rule = false;
        val.observation2rule = false;
        val.observation3rule = true;
        val.observation4rule = false;
        val.valternateObservation = 'Observes Sunday Holidays on Next Workday';
      }
    });

  }
  editon4observationchange(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.observation1rule = false;
        val.observation2rule = false;
        val.observation3rule = false;
        val.observation4rule = true;
        val.valternateObservation = 'Does Not Observe on an Alternate Workday';
      }
    });

  }

  editincreasenumber() {
    if (this.editactivedrop == false && this.editobservationnumber == true) {
      this.editholiday.forEach((val: any) => {
        val.vobserveNumberOfDays += 1;
      });
    }

  }
  editdecreasenumber() {
    if (this.editactivedrop == false && this.editobservationnumber == true) {
      this.editholiday.forEach((val: any) => {
        val.vobserveNumberOfDays -= 1;
        if (val.vobserveNumberOfDays <= 0) {
          val.vobserveNumberOfDays = 0;
        }
      });
    }

  }

  editcancelbutton(id: any) {
    this.editobservationnumber = false;
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vrepeatEveryCount = val.repeatEveryCount;
        val.vrepeatEveryTimeline = val.repeatEveryTimeline;
        val.vexpire = val.expire;
        val.vmonth = val.month;
        val.vdateOfMonth = val.dateOfMonth;
        val.vweeekOfMonth = val.weeekOfMonth;
        val.vdayOfWeek = val.dayOfWeek;
        val.vobserveAsWorkDay = val.observeAsWorkDay;
        val.vobserveNumberOfDays = val.observeNumberOfDays;
        val.valternateObservation = val.alternateObservation;
        val.vholidayName = val.holidayName;
        val.veholidayName = val.holidayName;
        val.vobservationDayMethod = val.observationDayMethod
        val.vruleSetting = val.ruleSetting;
        val.vexpiryYear = val.expiryYear;
        val.vexpireEvent = val.expireEvent;
        val.vobservedOn = val.observedOn;
        if (val.weeekOfMonth == '1st') {
          this.editmovingweekname = 'First';
        } else if (val.weeekOfMonth == '2nd') {
          this.editmovingweekname = 'Second';
        } else if (val.weeekOfMonth == '3rd') {
          this.editmovingweekname = 'Third';
        } else if (val.weeekOfMonth == '4th') {
          this.editmovingweekname = 'Fourth';
        } else if (val.weeekOfMonth == '5th') {
          this.editmovingweekname = 'Fifth';
        } else if (val.weeekOfMonth == 'Last') {
          this.editmovingweekname = 'Last';
        }
        if (val.expire == 'Never') {
          document.getElementById('edittextexpire1year')?.classList.add('hide');
          document.getElementById('edittextexpire2year')?.classList.add('hide');
          document.getElementById('edittextexpire1event')?.classList.add('hide');
          document.getElementById('edittextexpire2event')?.classList.add('hide');
        } else if (val.expire == 'In Year') {
          document.getElementById('edittextexpire1event')?.classList.add('hide');
          document.getElementById('edittextexpire2event')?.classList.add('hide');
          document.getElementById('edittextexpire1year')?.classList.remove('hide');
          document.getElementById('edittextexpire2year')?.classList.remove('hide');
        } else {
          document.getElementById('edittextexpire1year')?.classList.add('hide');
          document.getElementById('edittextexpire2year')?.classList.add('hide');
          document.getElementById('edittextexpire1event')?.classList.remove('hide');
          document.getElementById('edittextexpire2event')?.classList.remove('hide');
        }

        if (val.repeatEveryTimeline == 'Year') {
          val.yearrule = true;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = false;
        } else if (val.repeatEveryTimeline == 'Month') {
          val.yearrule = false;
          val.monthrule = true;
          val.weekrule = false;
          val.dayrule = false;
        } else if (val.repeatEveryTimeline == 'Week') {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = true;
          val.dayrule = false;
        } else if (val.repeatEveryTimeline == 'Day') {
          val.yearrule = false;
          val.monthrule = false;
          val.weekrule = false;
          val.dayrule = true;
        }

        if (val.dayOfWeek = 'Sunday') {
          document.getElementById('editbox5sun')?.classList.add('box5holidayedithover');
          document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');
        } else if (val.dayOfWeek = 'Monday') {
          document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5mon')?.classList.add('box5holidayedithover');
          document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');
        } else if (val.dayOfWeek = 'Tuesday') {
          document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5tue')?.classList.add('box5holidayedithover');
          document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');
        } else if (val.dayOfWeek = 'Wednesday') {
          document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5wed')?.classList.add('box5holidayedithover');
          document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');
        } else if (val.dayOfWeek = 'Thursday') {
          document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5thu')?.classList.add('box5holidayedithover');
          document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');
        } else if (val.dayOfWeek = 'Friday') {
          document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5fri')?.classList.add('box5holidayedithover');
          document.getElementById('editbox5sat')?.classList.remove('box5holidayedithover');
        } else if (val.dayOfWeek = 'Saturday') {
          document.getElementById('editbox5sun')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5mon')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5tue')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5wed')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5thu')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5fri')?.classList.remove('box5holidayedithover');
          document.getElementById('editbox5sat')?.classList.add('box5holidayedithover');
        }

        if (val.alternateObservation == 'Observes Saturday Holidays on Previous Workday and Sunday Holidays on Next Workday') {
          val.observation1rule = true;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = false;
        } else if (val.alternateObservation == 'Observes Saturday Holidays on Previous Workday') {
          val.observation1rule = false;
          val.observation2rule = true;
          val.observation3rule = false;
          val.observation4rule = false;
        } else if (val.alternateObservation == 'Observes Sunday Holidays on Next Workday') {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = true;
          val.observation4rule = false;
        } else if (val.alternateObservation == 'Does Not Observe on an Alternate Workday') {
          val.observation1rule = false;
          val.observation2rule = false;
          val.observation3rule = false;
          val.observation4rule = true;
        }

        if (val.observeAsWorkDay == true) {
          val.dayyesrule = true;
          val.daynorule = false;
          document.getElementById('editrow3box2')?.classList.remove('hide');
          document.getElementById('editrow3box3')?.classList.add('hide');
          document.getElementById('editrow4box2')?.classList.remove('hide');
          document.getElementById('editrow4box3')?.classList.add('hide');
        } else {
          val.dayyesrule = false;
          val.daynorule = true;
          document.getElementById('editrow3box2')?.classList.add('hide');
          document.getElementById('editrow3box3')?.classList.remove('hide');
          document.getElementById('editrow4box2')?.classList.add('hide');
          document.getElementById('editrow4box3')?.classList.remove('hide');
        }
      }
    });
    this.editclosealldrop();
    
  }
  apply(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.repeatEveryCount = val.vrepeatEveryCount;
        val.repeatEveryTimeline = val.vrepeatEveryTimeline;
        val.expire = val.vexpire;
        val.month = val.vmonth;
        val.dateOfMonth = val.vdateOfMonth;
        val.weeekOfMonth = val.vweeekOfMonth;
        val.dayOfWeek = val.vdayOfWeek;
        val.observeAsWorkDay = val.vobserveAsWorkDay;
        val.observeNumberOfDays = val.vobserveNumberOfDays;
        val.alternateObservation = val.valternateObservation;
        val.holidayName = val.vholidayName;
        val.eholidayName = val.vholidayName;
        val.observationDayMethod = val.vobservationDayMethod;
        val.ruleSetting = val.vruleSetting;
        val.expiryYear = val.vexpiryYear;
        val.expireEvent = val.vexpireEvent;
        val.observedOn = val.vobservedOn;
      }
    });
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        let updateCon = {
          "holidayId": id,
          "repeatEveryCount": val.vrepeatEveryCount,
          "repeatEveryTimeline": val.vrepeatEveryTimeline,
          "expire": val.vexpire,
          "month": val.vmonth,
          "dateOfMonth": val.vdateOfMonth,
          "weeekOfMonth": val.vweeekOfMonth,
          "dayOfWeek": val.vdayOfWeek,
          "observeAsWorkDay": val.vobserveAsWorkDay,
          "observeNumberOfDays": val.vobserveNumberOfDays,
          "alternateObservation": val.valternateObservation,
          "holidayName": val.vholidayName,
          "observationDayMethod": val.vobservationDayMethod,
          "ruleSetting": val.vruleSetting,
          "expiryYear": val.vexpiryYear,
          "expireEvent": val.vexpireEvent,
          "observedOn": val.vobservedOn,
        };
        this.library.update(updateCon).subscribe((val) => {
          console.log("updated", val);
        });
      }
    });
    this.editclosealldrop();
  }

  mousehoverarrowup(id: any) {
    document.getElementById('buttondaystime' + id)?.classList.remove('edit5');
    document.getElementById('buttondaystime' + id)?.classList.add('edit7');
  }
  mousehoveroutarrowup(id: any) {
    document.getElementById('buttondaystime' + id)?.classList.add('edit5');
    document.getElementById('buttondaystime' + id)?.classList.remove('edit7');
  }
  mousehoverarrowdown(id: any) {
    document.getElementById('checkdaystime' + id)?.classList.remove('check5');
    document.getElementById('checkdaystime' + id)?.classList.add('check7');
  }
  mousehoveroutarrowdown(id: any) {
    document.getElementById('checkdaystime' + id)?.classList.add('check5');
    document.getElementById('checkdaystime' + id)?.classList.remove('check7');
  }
  mousehoverarrow1up(id: any) {
    document.getElementById('buttondays1time' + id)?.classList.remove('edit8');
    document.getElementById('buttondays1time' + id)?.classList.add('edit9');
  }
  mousehoveroutarrow1up(id: any) {
    document.getElementById('buttondays1time' + id)?.classList.add('edit8');
    document.getElementById('buttondays1time' + id)?.classList.remove('edit9');
  }
  mousehoverarrow1down(id: any) {
    document.getElementById('checkdays1time' + id)?.classList.remove('check8');
    document.getElementById('checkdays1time' + id)?.classList.add('check9');
  }
  mousehoveroutarrow1down(id: any) {
    document.getElementById('checkdays1time' + id)?.classList.add('check8');
    document.getElementById('checkdays1time' + id)?.classList.remove('check9');
  }

  cancelobservationpopup() {
    this.singleholiday.forEach((val: any) => {
      val.observation4rule = true;
    });
  }
  catogeryactive(event: any) {
    if (event.target.checked) {

    } else {
      document.getElementById('textor')?.classList.remove('opacitycolour');
      this.closealldrop();
      this.activelowerbtn();
      document.getElementById('row1box2')?.classList.remove('hide');
      document.getElementById('row1box3')?.classList.add('hide');
      this.catogery1active = false;
      this.catogery2active = false;
      document.getElementById('row2box2')?.classList.remove('hide');
      document.getElementById('row2box3')?.classList.add('hide');
      this.singleholiday.forEach((val: any) => {
        val.vmonth = 'Select';
        val.vdayOfWeek = '';
        val.vweeekOfMonth = 'Select';
        val.vdateOfMonth = 'Select';
        this.movingweekname = 'Select';
        this.sunrow = false;
        this.monrow = false;
        this.tuerow = false;
        this.wedrow = false;
        this.thurow = false;
        this.frirow = false;
        this.satrow = false;
        document.getElementById('box5sun')?.classList.remove('box5holidayedithover');
        document.getElementById('box5mon')?.classList.remove('box5holidayedithover');
        document.getElementById('box5tue')?.classList.remove('box5holidayedithover');
        document.getElementById('box5wed')?.classList.remove('box5holidayedithover');
        document.getElementById('box5thu')?.classList.remove('box5holidayedithover');
        document.getElementById('box5fri')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sat')?.classList.remove('box5holidayedithover');
        document.getElementById('box5sun')?.classList.remove('hide');
        document.getElementById('box5mon')?.classList.remove('hide');
        document.getElementById('box5tue')?.classList.remove('hide');
        document.getElementById('box5wed')?.classList.remove('hide');
        document.getElementById('box5thu')?.classList.remove('hide');
        document.getElementById('box5fri')?.classList.remove('hide');
        document.getElementById('box5sat')?.classList.remove('hide');
        document.getElementById('box5sun1')?.classList.add('hide');
        document.getElementById('box5mon1')?.classList.add('hide');
        document.getElementById('box5tue1')?.classList.add('hide');
        document.getElementById('box5wed1')?.classList.add('hide');
        document.getElementById('box5thu1')?.classList.add('hide');
        document.getElementById('box5fri1')?.classList.add('hide');
        document.getElementById('box5sat1')?.classList.add('hide');
        val.observation1rule = false;
        val.observation2rule = false;
        val.observation3rule = false;
        val.observation4rule = false;
        val.valternateObservation = '';
        document.getElementById('observ1rule')?.classList.remove('hide');
        document.getElementById('observ2rule')?.classList.remove('hide');
        document.getElementById('observ3rule')?.classList.remove('hide');
        document.getElementById('observ4rule')?.classList.remove('hide');
        document.getElementById('observ1rule2')?.classList.add('hide');
        document.getElementById('observ2rule2')?.classList.add('hide');
        document.getElementById('observ3rule2')?.classList.add('hide');
        document.getElementById('observ4rule2')?.classList.add('hide');
        val.vobserveAsWorkDay = true;
        val.dayyesrule = true;
        val.daynorule = false;
        this.activelowerbtn();
        document.getElementById('row3box2')?.classList.remove('hide');
        document.getElementById('row3box3')?.classList.add('hide');
        document.getElementById('row4box2')?.classList.remove('hide');
        document.getElementById('row4box3')?.classList.add('hide');
      });
    }
  }
  cat1active(event: any) {
    if (event != '') {
      this.catogery1active = true;
      this.catogery2active = false;
      document.getElementById('row1box3')?.classList.remove('hide');
      document.getElementById('row1box2')?.classList.add('hide');

    } else {

    }
  }

  cat2active(event: any) {
    if (event != '') {
      this.catogery1active = false;
      this.catogery2active = true;
      document.getElementById('row2box3')?.classList.remove('hide');
      document.getElementById('row2box2')?.classList.add('hide');
    } else {

    }
  }

  directinput(event: any, id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vrepeatEveryCount = '';
        if (event != '') {
          let a = event.length;
          let b = a - 1;
          val.vrepeatEveryCount = event.slice(b, a);
        }
      }
    });
  }
  direct2input(event: any, id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vexpiryYear = '';
        if (event != '') {
          let a = event.length;
          let b = a - 1;
          val.vexpiryYear = event.slice(b, a);
        }
      }
    });
  }
  direct3input(event: any, id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        val.vexpireEvent = '';
        if (event != '') {
          let a = event.length;
          let b = a - 1;
          val.vexpireEvent = event.slice(b, a);
        }
      }
    });
  }

  //keyboard function

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.UP_ARROW) {
      this.moveupexpire();
      this.moveupweek();
      this.moveupmonth();
      this.moveup2month();
      this.moveupdate();
      this.increasenumber();
      this.moveupobserv();
      this.editmoveupexpire();
      this.editmoveupweek();
      this.editmoveupmonth();
      this.editmoveup2month();
      this.editmoveupdate();
      this.editincreasenumber();
      this.incrementid(this.numberincrement);
    }
    if (event.key === KEY_CODE.DOWN_ARROW) {
      this.movedownexpire();
      this.movedownweek();
      this.movedownmonth();
      this.movedown2month();
      this.movedowndate();
      this.decreasenumber();
      this.movedownobserv();
      this.editmovedownexpire();
      this.editmovedownweek();
      this.editmovedownmonth();
      this.editmovedown2month();
      this.editmovedowndate();
      this.editdecreasenumber();
      this.decrementid(this.numberincrement);
    }
    if (event.key === KEY_CODE.ENTER) {
      this.enterexpire();
      this.enterweek();
      this.entermonth();
      this.enter2month();
      this.enterdate();
      this.hoverclickobserv();
      this.editenterexpire();
      this.editenterweek();
      this.editentermonth();
      this.editenter2month();
      this.editenterdate();
      this.numberobservationclose(this.observationdaynumberid);
      this.ruleactive = false;
    }
    if (event.key === KEY_CODE.PLUS) {
      this.increasenumber();
      this.editincreasenumber();
      this.incrementid(this.numberincrement);
    }
    if (event.key === KEY_CODE.MINUS) {
      this.decreasenumber();
      this.editdecreasenumber();
      this.decrementid(this.numberincrement);
    }
  }
}
