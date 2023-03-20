import { Component, OnInit } from '@angular/core';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';
import { HolidaysimportedComponent } from '../holidaysimported.component';

@Component({
  selector: 'app-holidayscreate',
  templateUrl: './holidayscreate.component.html',
  styleUrls: ['./holidayscreate.component.css']
})
export class HolidayscreateComponent implements OnInit {
  checkedList: any;
  holidayname: any;
  activedform: boolean = false;
  boxsun: boolean = false;
  boxmon: boolean = false;
  boxtue: boolean = false;
  boxwed: boolean = false;
  boxthus: boolean = false;
  boxfri: boolean = false;
  boxsat: boolean = false;
  monthswitch:boolean = false;
  expireswitchyear: boolean = false;
  expireswitchevent: boolean = false;
  day1observed: boolean = false;
  day2observed: boolean = false;
  day3observed: boolean = false;
  day4observed: boolean = false;
  weekvalue: any;
  yearvalue: boolean = false;
  observeAsWorkDay: boolean = true;
  monthvalue: boolean = false;
  weeksvalue: boolean = false;
  dayvalue: boolean = false;
  holidaycheck: boolean = false;
  expireOnSelectedValue: any;
  repeatnumber: any;
  expireyear: any;
  observedays: number = 1;
  expireevent: any;
  repeatinterval: any;
  onTheSelectedValue: any;
  onMonthSelectedValue: any;
  monthSelectedValue: any;
  daySelectedValue: any;
  observablevalue: any;
  observableyes: boolean = false;
  observableno: boolean = false;
  observationday: any;
  options = [
    { id: "1", name: 'Sunday', value: 'Sun', checked: false },
    { id: "2", name: 'Monday', value: 'Mon', checked: false },
    { id: "3", name: 'Tuesday', value: 'Tue', checked: false },
    { id: "4", name: 'Wednesday', value: 'Wed', checked: false },
    { id: "5", name: 'Thursday', value: 'Thu', checked: false },
    { id: "6", name: 'Friday', value: 'Fri', checked: false },
    { id: "7", name: 'Saturday', value: 'Sat', checked: false },
  ];
  expireOptionList = [
    { id: 1, name: 'Never', value: 'Never' },
    { id: 2, name: 'In Year Of', value: 'In Year' },
    { id: 3, name: 'After # of Events', value: 'After' }
  ];
  onTheOptionList = [
    { id: 0, name: 'Add New' },
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' },
    { id: 3, name: 'Third' },
    { id: 4, name: 'Fourth' },
    { id: 5, name: 'Fifth' },
    { id: 6, name: 'Last' }
  ];
  monthOptionList = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ];
  daysOptionList = [
    { id: 1, name: '1st' },
    { id: 2, name: '2nd' },
    { id: 3, name: '3rd' },
    { id: 4, name: '4th' },
    { id: 5, name: '5th' },
    { id: 6, name: '6th' },
    { id: 7, name: '7th' },
    { id: 8, name: '8th' },
    { id: 9, name: '9th' },
    { id: 10, name: '10th' },
    { id: 11, name: '11th' },
    { id: 12, name: '12th' },
    { id: 13, name: '13th' },
    { id: 14, name: '14th' },
    { id: 15, name: '15th' },
    { id: 16, name: '16th' },
    { id: 17, name: '17th' },
    { id: 18, name: '18th' },
    { id: 19, name: '19th' },
    { id: 20, name: '20th' },
    { id: 21, name: '21st' },
    { id: 22, name: '22nd' },
    { id: 23, name: '23rd' },
    { id: 24, name: '24th' },
    { id: 25, name: '25th' },
    { id: 26, name: '26th' },
    { id: 27, name: '27th' },
    { id: 28, name: '28th' },
    { id: 29, name: '29th' },
    { id: 30, name: '30th' },
    { id: 31, name: '31st' }
  ];
  constructor(private library: HolidayLibraryService,private method: HolidaysimportedComponent) { }

  ngOnInit(): void {
    this.checkedList = [];
    this.expireOnSelectedValue = 'Never';
    this.onTheSelectedValue = '';
    this.onMonthSelectedValue = '';
    this.monthSelectedValue = "";
    this.daySelectedValue = "";
    this.holidayname = '';
    this.repeatnumber = '';
    this.repeatinterval = '';
    this.observablevalue = '';
    this.expireyear = '';
    this.expireevent = '';
    this.holidaycheck = false;
    
  }
createclick(){
  let a = 1;
  const interval = setInterval(() => {
    console.log(a++)
    if (a == 2) {
      clearInterval(interval);
      document.getElementById('holidaynamerow')?.focus();
    }
  }, 1000);
  
}

  onCheckboxChange(option: any, event: any) {
    if (event.target.checked) {
      this.checkedList.push(option.value);
    } else {
      for (var i = 0; i < this.options.length; i++) {
        if (this.checkedList[i] == option.value) {
          this.checkedList.splice(i, 1);
        }
      } this.checkedList.splice(i, 1);
    }
    console.log(this.checkedList);
  }
  activecancel() {
    document.getElementById('workclose')?.classList.add('hide');
    document.getElementById('workcancel')?.classList.remove('hide');
  }
  updateexpirevalue(day: any) {
    this.expireOnSelectedValue = day;
    console.log(day);
    if (day == 'Never') {
      this.expireswitchyear = false;
      this.expireswitchevent = false;
      document.getElementById('exptext1')?.classList.add('hide');
      document.getElementById('exptextbox1')?.classList.add('hide');
      document.getElementById('exptext2')?.classList.add('hide');
      document.getElementById('exptextbox2')?.classList.add('hide');
    } else if (day == 'After') {
      this.expireswitchyear = false;
      this.expireswitchevent = true;
      document.getElementById('exptext1')?.classList.add('hide');
      document.getElementById('exptextbox1')?.classList.add('hide');
      document.getElementById('exptext2')?.classList.remove('hide');
      document.getElementById('exptextbox2')?.classList.remove('hide');
    } else {
      this.expireswitchyear = true;
      this.expireswitchevent = false;
      document.getElementById('exptext1')?.classList.remove('hide');
      document.getElementById('exptextbox1')?.classList.remove('hide');
      document.getElementById('exptext2')?.classList.add('hide');
      document.getElementById('exptextbox2')?.classList.add('hide');
    }
  }
  expireclick() {
    document.getElementById('expirevalueedit')?.classList.remove('hideedit1');
    document.getElementById('expirevalueedit')?.classList.add('edit1');
    document.getElementById('expirevaluecheck')?.classList.add('hidecheck1');
    document.getElementById('expirevaluecheck')?.classList.remove('check1');
    document.getElementById('expirevaluelist')?.classList.add('hidelist2');
    document.getElementById('expirevaluelist')?.classList.remove('list2');
  }
  expireeditclick() {
    //this.worknameonactive();
    document.getElementById('expirevalueedit')?.classList.add('hideedit1');
    document.getElementById('expirevalueedit')?.classList.remove('edit1');
    document.getElementById('expirevaluecheck')?.classList.remove('hidecheck1');
    document.getElementById('expirevaluecheck')?.classList.add('check1');
    document.getElementById('expirevaluelist')?.classList.remove('hidelist2');
    document.getElementById('expirevaluelist')?.classList.add('list2');
  }
  updateonThevalue(day: any) {
    this.onTheSelectedValue = day;
    document.getElementById('basicform4')?.classList.add('hide');
    document.getElementById('basic1form4')?.classList.remove('hide');
  }
  onTheclick() {
    document.getElementById('onThevalueedit')?.classList.remove('hideedit1');
    document.getElementById('onThevalueedit')?.classList.add('edit1');
    document.getElementById('onThevaluecheck')?.classList.add('hidecheck1');
    document.getElementById('onThevaluecheck')?.classList.remove('check1');
    document.getElementById('onThevaluelist')?.classList.add('hidelist2');
    document.getElementById('onThevaluelist')?.classList.remove('list2');
  }
  onTheeditclick() {
    document.getElementById('onThevalueedit')?.classList.add('hideedit1');
    document.getElementById('onThevalueedit')?.classList.remove('edit1');
    document.getElementById('onThevaluecheck')?.classList.remove('hidecheck1');
    document.getElementById('onThevaluecheck')?.classList.add('check1');
    document.getElementById('onThevaluelist')?.classList.remove('hidelist2');
    document.getElementById('onThevaluelist')?.classList.add('list2');
  }
  updateonMonthvalue(day: any) {
    this.onMonthSelectedValue = day;
    document.getElementById('day4observedid')?.click();
    document.getElementById('basicform4')?.classList.add('hide');
    document.getElementById('basic1form4')?.classList.remove('hide');
  }
  onMonthclick() {
    document.getElementById('onMonthvalueedit')?.classList.remove('hideedit1');
    document.getElementById('onMonthvalueedit')?.classList.add('edit1');
    document.getElementById('onMonthvaluecheck')?.classList.add('hidecheck1');
    document.getElementById('onMonthvaluecheck')?.classList.remove('check1');
    document.getElementById('onMonthvaluelist')?.classList.add('hidelist2');
    document.getElementById('onMonthvaluelist')?.classList.remove('list2');
  }
  onMontheditclick() {
    //this.worknameonactive();
    document.getElementById('onMonthvalueedit')?.classList.add('hideedit1');
    document.getElementById('onMonthvalueedit')?.classList.remove('edit1');
    document.getElementById('onMonthvaluecheck')?.classList.remove('hidecheck1');
    document.getElementById('onMonthvaluecheck')?.classList.add('check1');
    document.getElementById('onMonthvaluelist')?.classList.remove('hidelist2');
    document.getElementById('onMonthvaluelist')?.classList.add('list2');
  }
  updatemonthvalue(day: any) {
    this.onMonthSelectedValue = day;
    this.monthswitch = true;
    document.getElementById('basicform2')?.classList.add('hide');
    document.getElementById('basic1form2')?.classList.remove('hide');
  }
  monthclick() {
    document.getElementById('monthvalueedit')?.classList.remove('hideedit1');
    document.getElementById('monthvalueedit')?.classList.add('edit1');
    document.getElementById('monthvaluecheck')?.classList.add('hidecheck1');
    document.getElementById('monthvaluecheck')?.classList.remove('check1');
    document.getElementById('monthvaluelist')?.classList.add('hidelist2');
    document.getElementById('monthvaluelist')?.classList.remove('list2');
  }
  montheditclick() {
    //this.worknameonactive();
    document.getElementById('monthvalueedit')?.classList.add('hideedit1');
    document.getElementById('monthvalueedit')?.classList.remove('edit1');
    document.getElementById('monthvaluecheck')?.classList.remove('hidecheck1');
    document.getElementById('monthvaluecheck')?.classList.add('check1');
    document.getElementById('monthvaluelist')?.classList.remove('hidelist2');
    document.getElementById('monthvaluelist')?.classList.add('list2');
  }
  updatedayvalue(day: any) {
    this.daySelectedValue = day;
    this.observablevalue = 'Equal';
    document.getElementById('day1observedid')?.click(); 
    document.getElementById('basicform2')?.classList.add('hide');
    document.getElementById('basic1form2')?.classList.remove('hide');
  }
  dayclick() {
    document.getElementById('dayvalueedit')?.classList.remove('hideedit1');
    document.getElementById('dayvalueedit')?.classList.add('edit1');
    document.getElementById('dayvaluecheck')?.classList.add('hidecheck1');
    document.getElementById('dayvaluecheck')?.classList.remove('check1');
    document.getElementById('dayvaluelist')?.classList.add('hidelist2');
    document.getElementById('dayvaluelist')?.classList.remove('list2');
  }
  dayeditclick() {
    //this.worknameonactive();
    document.getElementById('dayvalueedit')?.classList.add('hideedit1');
    document.getElementById('dayvalueedit')?.classList.remove('edit1');
    document.getElementById('dayvaluecheck')?.classList.remove('hidecheck1');
    document.getElementById('dayvaluecheck')?.classList.add('check1');
    document.getElementById('dayvaluelist')?.classList.remove('hidelist2');
    document.getElementById('dayvaluelist')?.classList.add('list2');
  }

  activebasicform(event: any) {
    if (this.activedform == true) {
      this.observablevalue = 'Equal';
      document.getElementById('observationyes')?.click();
      if (event.target.checked) {
        document.getElementById('basicform1')?.classList.remove('hide');
        document.getElementById('basicform2')?.classList.remove('hide');
        document.getElementById('basicform3')?.classList.remove('hide');
        document.getElementById('basicform4')?.classList.remove('hide');
        document.getElementById('basicform5')?.classList.remove('hide');
        document.getElementById('repeat1text')?.focus();
      } else {
        document.getElementById('basicform1')?.classList.add('hide');
        document.getElementById('basicform2')?.classList.add('hide');
        document.getElementById('basic1form2')?.classList.add('hide');
        document.getElementById('basicform3')?.classList.add('hide');
        document.getElementById('basicform4')?.classList.add('hide');
        document.getElementById('basic1form4')?.classList.add('hide');
        document.getElementById('basicform5')?.classList.add('hide');
      }
    }
  }

  activeform() {
    this.activedform = true;
    document.getElementById('closebtn')?.classList.add('hide');
    document.getElementById('cancelbtn')?.classList.remove('hide');
  }
  onChange(event: any, value: any) {
    if (event.keyCode == '13') {
      console.log(this.holidayname);
      if (value != '') {
        this.activeform();
      } else {
        this.cancelbutton();
      }

    }
  }
  increment() {
    this.observedays++;
  }
  decrement() {
    this.observedays--;
    if (this.observedays <= 1) {
      this.observedays = 1;
    }
  }
  on2Change(event: any) {
    if (event != '') {
      this.activeform();
    } else {
      this.cancelbutton();
    }
  }


  clicksun() {
    if (this.boxsun == false) {
      this.weekvalue = 'Sunday';
      document.getElementById('basicform4')?.classList.add('hide');
      document.getElementById('basic1form4')?.classList.remove('hide');
      this.boxsun = true;
      document.getElementById('boxs1')?.classList.add('row3box4');
      document.getElementById('boxs1')?.classList.remove('row3box2');
      this.boxmon = false;
      document.getElementById('boxm')?.classList.remove('row3box5');
      document.getElementById('boxm')?.classList.add('row3box3');
      this.boxtue = false;
      document.getElementById('boxt1')?.classList.remove('row3box5');
      document.getElementById('boxt1')?.classList.add('row3box3');
      this.boxwed = false;
      document.getElementById('boxw')?.classList.remove('row3box5');
      document.getElementById('boxw')?.classList.add('row3box3');
      this.boxthus = false;
      document.getElementById('boxt2')?.classList.remove('row3box5');
      document.getElementById('boxt2')?.classList.add('row3box3');
      this.boxfri = false;
      document.getElementById('boxf')?.classList.remove('row3box5');
      document.getElementById('boxf')?.classList.add('row3box3');
      this.boxsat = false;
      document.getElementById('boxs2')?.classList.remove('row3box5');
      document.getElementById('boxs2')?.classList.add('row3box3');
    } else {
      this.weekvalue = '';
      this.boxsun = false;
      document.getElementById('boxs1')?.classList.remove('row3box4');
      document.getElementById('boxs1')?.classList.add('row3box2');
      this.deactiverow2();
    }
  }
  clickmon() {
    if (this.boxmon == false) {
      this.weekvalue = 'Monday';
      document.getElementById('basicform4')?.classList.add('hide');
      document.getElementById('basic1form4')?.classList.remove('hide');
      this.boxmon = true;
      document.getElementById('boxm')?.classList.add('row3box5');
      document.getElementById('boxm')?.classList.remove('row3box3');
      this.boxsun = false;
      document.getElementById('boxs1')?.classList.remove('row3box4');
      document.getElementById('boxs1')?.classList.add('row3box2');
      this.boxtue = false;
      document.getElementById('boxt1')?.classList.remove('row3box5');
      document.getElementById('boxt1')?.classList.add('row3box3');
      this.boxwed = false;
      document.getElementById('boxw')?.classList.remove('row3box5');
      document.getElementById('boxw')?.classList.add('row3box3');
      this.boxthus = false;
      document.getElementById('boxt2')?.classList.remove('row3box5');
      document.getElementById('boxt2')?.classList.add('row3box3');
      this.boxfri = false;
      document.getElementById('boxf')?.classList.remove('row3box5');
      document.getElementById('boxf')?.classList.add('row3box3');
      this.boxsat = false;
      document.getElementById('boxs2')?.classList.remove('row3box5');
      document.getElementById('boxs2')?.classList.add('row3box3');
    } else {
      this.weekvalue = '';
      this.boxmon = false;
      document.getElementById('boxm')?.classList.remove('row3box5');
      document.getElementById('boxm')?.classList.add('row3box3');
      this.deactiverow2();
    }

  }
  clicktue() {
    if (this.boxtue == false) {
      this.weekvalue = 'Tuesday';
      document.getElementById('basicform4')?.classList.add('hide');
      document.getElementById('basic1form4')?.classList.remove('hide');
      this.boxtue = true;
      document.getElementById('boxt1')?.classList.add('row3box5');
      document.getElementById('boxt1')?.classList.remove('row3box3');
      this.boxsun = false;
      document.getElementById('boxs1')?.classList.remove('row3box4');
      document.getElementById('boxs1')?.classList.add('row3box2');
      this.boxmon = false;
      document.getElementById('boxm')?.classList.remove('row3box5');
      document.getElementById('boxm')?.classList.add('row3box3');
      this.boxwed = false;
      document.getElementById('boxw')?.classList.remove('row3box5');
      document.getElementById('boxw')?.classList.add('row3box3');
      this.boxthus = false;
      document.getElementById('boxt2')?.classList.remove('row3box5');
      document.getElementById('boxt2')?.classList.add('row3box3');
      this.boxfri = false;
      document.getElementById('boxf')?.classList.remove('row3box5');
      document.getElementById('boxf')?.classList.add('row3box3');
      this.boxsat = false;
      document.getElementById('boxs2')?.classList.remove('row3box5');
      document.getElementById('boxs2')?.classList.add('row3box3');
    } else {
      this.weekvalue = '';
      this.boxtue = false;
      document.getElementById('boxt1')?.classList.remove('row3box5');
      document.getElementById('boxt1')?.classList.add('row3box3');
      this.deactiverow2();
    }
  }
  clickwed() {
    if (this.boxwed == false) {
      this.weekvalue = 'Wednesday';
      document.getElementById('basicform4')?.classList.add('hide');
      document.getElementById('basic1form4')?.classList.remove('hide');
      this.boxwed = true;
      document.getElementById('boxw')?.classList.add('row3box5');
      document.getElementById('boxw')?.classList.remove('row3box3');
      this.boxsun = false;
      document.getElementById('boxs1')?.classList.remove('row3box4');
      document.getElementById('boxs1')?.classList.add('row3box2');
      this.boxmon = false;
      document.getElementById('boxm')?.classList.remove('row3box5');
      document.getElementById('boxm')?.classList.add('row3box3');
      this.boxtue = false;
      document.getElementById('boxt1')?.classList.remove('row3box5');
      document.getElementById('boxt1')?.classList.add('row3box3');
      this.boxthus = false;
      document.getElementById('boxt2')?.classList.remove('row3box5');
      document.getElementById('boxt2')?.classList.add('row3box3');
      this.boxfri = false;
      document.getElementById('boxf')?.classList.remove('row3box5');
      document.getElementById('boxf')?.classList.add('row3box3');
      this.boxsat = false;
      document.getElementById('boxs2')?.classList.remove('row3box5');
      document.getElementById('boxs2')?.classList.add('row3box3');
    } else {
      this.weekvalue = '';
      this.boxwed = false;
      document.getElementById('boxw')?.classList.remove('row3box5');
      document.getElementById('boxw')?.classList.add('row3box3');
      this.deactiverow2();
    }
  }
  clickthus() {
    if (this.boxthus == false) {
      this.weekvalue = 'Thursday';
      document.getElementById('basicform4')?.classList.add('hide');
      document.getElementById('basic1form4')?.classList.remove('hide');
      this.boxthus = true;
      document.getElementById('boxt2')?.classList.add('row3box5');
      document.getElementById('boxt2')?.classList.remove('row3box3');
      this.boxsun = false;
      document.getElementById('boxs1')?.classList.remove('row3box4');
      document.getElementById('boxs1')?.classList.add('row3box2');
      this.boxmon = false;
      document.getElementById('boxm')?.classList.remove('row3box5');
      document.getElementById('boxm')?.classList.add('row3box3');
      this.boxtue = false;
      document.getElementById('boxt1')?.classList.remove('row3box5');
      document.getElementById('boxt1')?.classList.add('row3box3');
      this.boxwed = false;
      document.getElementById('boxw')?.classList.remove('row3box5');
      document.getElementById('boxw')?.classList.add('row3box3');
      this.boxfri = false;
      document.getElementById('boxf')?.classList.remove('row3box5');
      document.getElementById('boxf')?.classList.add('row3box3');
      this.boxsat = false;
      document.getElementById('boxs2')?.classList.remove('row3box5');
      document.getElementById('boxs2')?.classList.add('row3box3');
    } else {
      this.weekvalue = '';
      this.boxthus = false;
      document.getElementById('boxt2')?.classList.remove('row3box5');
      document.getElementById('boxt2')?.classList.add('row3box3');
      this.deactiverow2();
    }
  }
  clickfri() {
    if (this.boxfri == false) {
      this.weekvalue = 'Friday';
      document.getElementById('basicform4')?.classList.add('hide');
      document.getElementById('basic1form4')?.classList.remove('hide');
      this.boxfri = true;
      document.getElementById('boxf')?.classList.add('row3box5');
      document.getElementById('boxf')?.classList.remove('row3box3');
      this.boxsun = false;
      document.getElementById('boxs1')?.classList.remove('row3box4');
      document.getElementById('boxs1')?.classList.add('row3box2');
      this.boxmon = false;
      document.getElementById('boxm')?.classList.remove('row3box5');
      document.getElementById('boxm')?.classList.add('row3box3');
      this.boxtue = false;
      document.getElementById('boxt1')?.classList.remove('row3box5');
      document.getElementById('boxt1')?.classList.add('row3box3');
      this.boxwed = false;
      document.getElementById('boxw')?.classList.remove('row3box5');
      document.getElementById('boxw')?.classList.add('row3box3');
      this.boxthus = false;
      document.getElementById('boxt2')?.classList.remove('row3box5');
      document.getElementById('boxt2')?.classList.add('row3box3');;
      this.boxsat = false;
      document.getElementById('boxs2')?.classList.remove('row3box5');
      document.getElementById('boxs2')?.classList.add('row3box3');
    } else {
      this.weekvalue = '';
      this.boxfri = false;
      document.getElementById('boxf')?.classList.remove('row3box5');
      document.getElementById('boxf')?.classList.add('row3box3');
      this.deactiverow2();
    }
  }
  clicksat() {
    if (this.boxsat == false) {
      this.weekvalue = 'Saturday';
      document.getElementById('basicform4')?.classList.add('hide');
      document.getElementById('basic1form4')?.classList.remove('hide');
      this.boxsat = true;
      document.getElementById('boxs2')?.classList.add('row3box5');
      document.getElementById('boxs2')?.classList.remove('row3box3');
      this.boxsun = false;
      document.getElementById('boxs1')?.classList.remove('row3box4');
      document.getElementById('boxs1')?.classList.add('row3box2');
      this.boxmon = false;
      document.getElementById('boxm')?.classList.remove('row3box5');
      document.getElementById('boxm')?.classList.add('row3box3');
      this.boxtue = false;
      document.getElementById('boxt1')?.classList.remove('row3box5');
      document.getElementById('boxt1')?.classList.add('row3box3');
      this.boxwed = false;
      document.getElementById('boxw')?.classList.remove('row3box5');
      document.getElementById('boxw')?.classList.add('row3box3');
      this.boxthus = false;
      document.getElementById('boxt2')?.classList.remove('row3box5');
      document.getElementById('boxt2')?.classList.add('row3box3');
      this.boxfri = false;
      document.getElementById('boxf')?.classList.remove('row3box5');
      document.getElementById('boxf')?.classList.add('row3box3');
    } else {
      this.weekvalue = '';
      this.boxsat = false;
      document.getElementById('boxs2')?.classList.remove('row3box5');
      document.getElementById('boxs2')?.classList.add('row3box3');
      this.deactiverow2();
    }
  }
  deactiverow2() {
    if (this.weekvalue == '' && this.onMonthSelectedValue == '' && this.onTheSelectedValue == '') {
      document.getElementById('basicform4')?.classList.remove('hide');
      document.getElementById('basic1form4')?.classList.add('hide');
    }
  }
  selectrepeatmonth(event: any) {
    if (event.target.checked) {
      this.repeatinterval = 'Month';
      this.yearvalue = false;
      this.weeksvalue = false;
      this.dayvalue = false;
    } else {
      this.repeatinterval = '';
      this.monthvalue = false;
    }
  }
  selectrepeatweek(event: any) {
    if (event.target.checked) {
      this.repeatinterval = 'Week';
      this.monthvalue = false;
      this.yearvalue = false;
      this.dayvalue = false;
    } else {
      this.repeatinterval = '';
      this.weeksvalue = false;
    }
  }
  selectrepeatday(event: any) {
    if (event.target.checked) {
      this.repeatinterval = 'Day';
      this.monthvalue = false;
      this.weeksvalue = false;
      this.yearvalue = false;
    } else {
      this.repeatinterval = '';
      this.dayvalue = false;
    }
  }
  selectrepeatyear(event: any) {
    if (event.target.checked) {
      this.repeatinterval = 'Year';
      this.monthvalue = false;
      this.weeksvalue = false;
      this.dayvalue = false;
    } else {
      this.repeatinterval = '';
      this.yearvalue = false;
    }
  }
  dayobservedfalse() {
    document.getElementById('observe2row1')?.classList.add('hide');
    document.getElementById('observe2row2')?.classList.add('hide');
    document.getElementById('observe2row3')?.classList.add('hide');
    document.getElementById('observe2row4')?.classList.add('hide');
    document.getElementById('observe1row1')?.classList.remove('hide');
    document.getElementById('observe1row2')?.classList.remove('hide');
    document.getElementById('observe1row3')?.classList.remove('hide');
    document.getElementById('observe1row4')?.classList.remove('hide');
  }
  dayobservedtrue() {
    this.day2observed = false;
    this.day4observed = false
    this.day3observed = false;
    this.day1observed = false;
    document.getElementById('observe1row1')?.classList.add('hide');
    document.getElementById('observe1row2')?.classList.add('hide');
    document.getElementById('observe1row3')?.classList.add('hide');
    document.getElementById('observe1row4')?.classList.add('hide');
    document.getElementById('observe2row1')?.classList.remove('hide');
    document.getElementById('observe2row2')?.classList.remove('hide');
    document.getElementById('observe2row3')?.classList.remove('hide');
    document.getElementById('observe2row4')?.classList.remove('hide');
  }
  dayobserved1(event: any) {
    if (event.target.checked) {
      this.observationday = 'Observes Saturday Holidays on previous work day and Observes Sunday Holidays on Next Work Day';
      this.day2observed = false;
      this.day3observed = false;
      this.day4observed = false;
      this.activecreatbtn();
      document.getElementById('observe1row2')?.classList.add('hide');
      document.getElementById('observe1row3')?.classList.add('hide');
      document.getElementById('observe1row4')?.classList.add('hide');
      document.getElementById('observe2row2')?.classList.remove('hide');
      document.getElementById('observe2row3')?.classList.remove('hide');
      document.getElementById('observe2row4')?.classList.remove('hide');
    } else {
      this.observationday = '';
      this.day1observed = false;
      this.dayobservedfalse();
    }
  }
  dayobserved2(event: any) {
    if (event.target.checked) {
      this.observationday = 'Observes Saturday Holidays On Previous Work Day ONLY';
      this.day1observed = false;
      this.day3observed = false;
      this.day4observed = false;
      this.activecreatbtn();
      document.getElementById('observe1row1')?.classList.add('hide');
      document.getElementById('observe1row3')?.classList.add('hide');
      document.getElementById('observe1row4')?.classList.add('hide');
      document.getElementById('observe2row1')?.classList.remove('hide');
      document.getElementById('observe2row3')?.classList.remove('hide');
      document.getElementById('observe2row4')?.classList.remove('hide');
    } else {
      this.observationday = '';
      this.day2observed = false;
      this.dayobservedfalse();
    }
  }
  dayobserved3(event: any) {
    if (event.target.checked) {
      this.observationday = 'Observes Sunday Holidays On Next Work Day ONLY';
      this.day2observed = false;
      this.day1observed = false;
      this.day4observed = false;
      this.activecreatbtn();
      document.getElementById('observe1row1')?.classList.add('hide');
      document.getElementById('observe1row2')?.classList.add('hide');
      document.getElementById('observe1row4')?.classList.add('hide');
      document.getElementById('observe2row1')?.classList.remove('hide');
      document.getElementById('observe2row2')?.classList.remove('hide');
      document.getElementById('observe2row4')?.classList.remove('hide');
    } else {
      this.observationday = '';
      this.day3observed = false;
      this.dayobservedfalse();
    }
  }
  dayobserved4(event: any) {
    if (event.target.checked) {
      this.observationday = 'Does Not Observe Weekend Holidays';
      this.day2observed = false;
      this.day3observed = false;
      this.day1observed = false;
      this.activecreatbtn();
      document.getElementById('observe1row1')?.classList.add('hide');
      document.getElementById('observe1row2')?.classList.add('hide');
      document.getElementById('observe1row3')?.classList.add('hide');
      document.getElementById('observe2row1')?.classList.remove('hide');
      document.getElementById('observe2row2')?.classList.remove('hide');
      document.getElementById('observe2row3')?.classList.remove('hide');
      this.observablevalue = 'Observe as Non-Work Day';
    } else {
      this.observationday = '';
      this.day4observed = false;
      this.dayobservedfalse();
    }
  }

  observableyesno1(event: any) {
    if (event.target.checked) {
      this.observableno = false;
      this.observeAsWorkDay = true;
      if (this.observablevalue == 'Does Not Observe as Non-Work Day') {
        this.dayobservedfalse();
        document.getElementById('day4observedid')?.click();
      } else if (this.observablevalue == '') {
        document.getElementById('day4observedid')?.click();
      }
      this.observablevalue = 'Observe as Non-Work Day';
      this.activecreatbtn();
      document.getElementById('plusminusrow2')?.classList.add('hide');
      document.getElementById('plusminusrow1')?.classList.remove('hide');

    } else {
      this.observablevalue = '';
      this.observableyes = false;
    }
  }
  observableyesno2(event: any) {
    if (event.target.checked) {
      this.observableyes = false;
      this.observablevalue = 'Does Not Observe as Non-Work Day';
      this.observeAsWorkDay = false;
      this.activecreatbtn();
      this.dayobservedtrue();
      document.getElementById('plusminusrow1')?.classList.add('hide');
      document.getElementById('plusminusrow2')?.classList.remove('hide');
    } else {
      this.observableno = false;
      this.observablevalue = '';
      this.dayobservedfalse();
      document.getElementById('day4observedid')?.click();
      document.getElementById('plusminusrow2')?.classList.add('hide');
      document.getElementById('plusminusrow1')?.classList.remove('hide');
    }
  }

  activecreatbtn() {
    if (this.repeatnumber != '' && this.onMonthSelectedValue != '' && this.observablevalue != '' && this.repeatinterval != '' && this.expireOnSelectedValue != '' && this.observationday != '') {
      document.getElementById('preview1btn')?.classList.add('hide');
      document.getElementById('preview2btn')?.classList.remove('hide');
      document.getElementById('create1btn')?.classList.add('hide');
      document.getElementById('create2btn')?.classList.remove('hide');
    } else {
      document.getElementById('preview2btn')?.classList.add('hide');
      document.getElementById('preview1btn')?.classList.remove('hide');
      document.getElementById('create2btn')?.classList.add('hide');
      document.getElementById('create1btn')?.classList.remove('hide');
    }
  }
  createbtn() {
    let createCon = {
      "repeatEveryCount": parseInt(this.repeatnumber),
      "repeatEveryTimeline": this.repeatinterval,
      "expire": this.expireOnSelectedValue,
      "month": this.onMonthSelectedValue,
      "dateOfMonth": this.daySelectedValue,
      "weeekOfMonth": this.onTheSelectedValue,
      "dayOfWeek": this.weekvalue,
      "observeAsWorkDay": this.observeAsWorkDay,
      "observeNumberOfDays": this.observedays,
      "alternateObservation": this.observationday,
      "holidayName": this.holidayname,
      "observationDayMethod": "Date",
      "isImported": false,
      "ruleSetting": "Standard Reoccurrence",
      "expiryYear": this.expireyear,
      "expireEvent": this.expireevent,
      "observedOn": this.observedays.toString(),
      "isAdded": true,
      "isLibrary": false
    };
    this.library.create(createCon).subscribe((val) => {
      console.log("Created", createCon);
      this.cancelbutton();
      this.method.activeadd();
      this.method.openadd();
    });
  }
  cancelbutton() {
    this.expireOnSelectedValue = 'Never';
    this.onTheSelectedValue = '';
    this.onMonthSelectedValue = '';
    this.monthSelectedValue = "";
    this.daySelectedValue = "";
    this.activedform = false;
    this.holidayname = '';
    this.weekvalue = '';
    this.repeatnumber = '';
    this.repeatinterval = '';
    this.expireyear = '';
    this.expireevent = '';
    this.observedays = 1;
    this.dayobservedfalse();
    this.day2observed = false;
    this.day4observed = false
    this.day3observed = false;
    this.day1observed = false;
    if (this.holidaycheck == true) {
      document.getElementById('checkstandard')?.click();
    }
    document.getElementById('basicform1')?.classList.add('hide');
    document.getElementById('basicform2')?.classList.add('hide');
    document.getElementById('basicform3')?.classList.add('hide');
    document.getElementById('basicform4')?.classList.add('hide');
    document.getElementById('basicform5')?.classList.add('hide');
    document.getElementById('closebtn')?.classList.remove('hide');
    document.getElementById('cancelbtn')?.classList.add('hide');
    document.getElementById('preview1btn')?.classList.remove('hide');
    document.getElementById('preview2btn')?.classList.add('hide');
    document.getElementById('create1btn')?.classList.remove('hide');
    document.getElementById('create2btn')?.classList.add('hide');
    document.getElementById('basicform2')?.classList.add('hide');
    document.getElementById('basic1form2')?.classList.add('hide');
    document.getElementById('basic1form4')?.classList.add('hide');
    this.boxsun = false;
    document.getElementById('boxs1')?.classList.remove('row3box4');
    document.getElementById('boxs1')?.classList.add('row3box2');
    this.boxmon = false;
    document.getElementById('boxm')?.classList.remove('row3box5');
    document.getElementById('boxm')?.classList.add('row3box3');
    this.boxtue = false;
    document.getElementById('boxt1')?.classList.remove('row3box5');
    document.getElementById('boxt1')?.classList.add('row3box3');
    this.boxwed = false;
    document.getElementById('boxw')?.classList.remove('row3box5');
    document.getElementById('boxw')?.classList.add('row3box3');
    this.boxthus = false;
    document.getElementById('boxt2')?.classList.remove('row3box5');
    document.getElementById('boxt2')?.classList.add('row3box3');
    this.boxfri = false;
    document.getElementById('boxf')?.classList.remove('row3box5');
    document.getElementById('boxf')?.classList.add('row3box3');
    this.boxsat = false;
    document.getElementById('boxs2')?.classList.remove('row3box5');
    document.getElementById('boxs2')?.classList.add('row3box3');
    this.yearvalue = false;
    this.weeksvalue = false;
    this.dayvalue = false;
    this.monthvalue = false;
    this.observableyes = false;
    this.observableno = false;
    this.observationday = '';
    this.observeAsWorkDay = false;
    this.observablevalue = '';
    this.monthswitch = false;
    document.getElementById('plusminusrow2')?.classList.add('hide');
    document.getElementById('plusminusrow1')?.classList.remove('hide');
    this.expireswitchyear = false;
    this.expireswitchevent = false;
    this.createclick();
  }

}
