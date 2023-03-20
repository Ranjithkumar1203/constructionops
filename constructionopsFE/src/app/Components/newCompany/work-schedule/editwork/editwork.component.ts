import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { LibraryService } from 'src/app/Services/library.service';
import { EditWorkScheduleComponent } from '../edit-work-schedule/edit-work-schedule.component';
import { WorkScheduleComponent } from '../work-schedule.component';
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
  TAB = 'Tab',
  SHIFT = 'Shift'
}
@Component({
  selector: 'app-editwork',
  templateUrl: './editwork.component.html',
  styleUrls: ['./editwork.component.css']
})
export class EditworkComponent implements OnInit {
  naming: any;
  checkedLists: any;
  lunuchtime1: any;
  lunuchtime2: any;
  lunuchtime3: any;
  lunuchtime4: any;
  lunuchtime5: any;
  checkedList: any;
  nameswitch: boolean = false;
  selectMeridiem = "AM"
  selctWeekOpen = false
  hourTableOpen = false

  setStartHour: any
  oneToTwelveArray: any[] = []
  oneToFiftynineArray: any[] = []
  stringdays: any;

  addpopup: boolean = false;
  viewmovingup: boolean = false;
  viewmoving1up: boolean = false;
  viewmoving2up: boolean = false;
  viewmoving3up: boolean = false;
  viewmoving4up: boolean = false;
  viewlunch2switch: boolean = false;
  viewmoving5up: boolean = false;
  itemChecked: boolean = false;
  isallchecked: boolean = false;
  viewweekactive: boolean = false;
  viewlunchnumber = 0;
  public workimports: any;

  workScheduleForm: any;
  checkedDayInString: any;
  lunchnumber: number = 0;

  public viewrecords: any;
  selectedDay: string = '';
  tabnumber: number = 0;
  tabfunc: number = 1;
  tabfunc2: any = 0;
  idnumber: number = 0;
  activetab: boolean = false;
  viewdayswitch: boolean = false;
  viewweekswitch: boolean = false;
  viewtimeswitch: boolean = false;
  viewtime1switch: boolean = false;
  viewtime2switch: boolean = false;
  viewtime3switch: boolean = false;
  viewhourswitch: boolean = false;
  viewhour1switch: boolean = false;
  viewlunchswitch: boolean = false;
  viewlunch1switch: boolean = false;

  hoursvalue1: any;
  hoursvalue2: any;
  hoursvalue3: any;
  hoursvalue4: any;
  hoursvalue5: any;
  hoursvalue6: any;
  hoursvalue7: any;

  currentvalue: any;
  checkedListss: any;
  number: number = 0;
  public addworks: any;
  incredcrenumber: number = 0;
  namenumber: number = 0;
  daysnumber: number = 0;
  viewdaysnumber: number = 0;
  viewdaystartnumber: number = 0;
  viewtimenumber: number = 0;
  viewhournumber: number = 0;
  lengthworks: any;
  isEditable: boolean = false;
  editableactive: boolean = false;
  editpopup: boolean = false;
  check: any;
  selecttext: any;
  idview: number = 0;
  sequenceview: number = 0;
  ischeck: any;
  hourvalues: any;
  status: boolean = false;
  status1: boolean = false;
  checked: boolean = false;
  activeon: boolean = false;
  switchname: any;
  clocktext: any;
  hournumber: number = 0;
  weeknumber: number = 0;
  week1number: number = 0;
  timenumber: number = 0;
  moveupwards: number = 0;
  movedownwards: number = 0;
  movedownwardss: number = 0;
  daynumber: number = 0;
  hourssnumber: any;
  hournumberings: number = 0;
  hourssnumbera: any;
  hourssnumberb: any;
  works: any;
  timevalues: any;
  lunchevalues: any;
  sorter: any;
  sortera: any;
  workdaysswitching: boolean = false;
  workweeksswitching: boolean = false;
  worktimeswitching: boolean = false;
  workhourswitching: boolean = false;
  workweekactive: boolean = false;
  tab1enter: boolean = false;
  tab2enter: boolean = false;
  tab3enter: boolean = false;
  tab4enter: boolean = false;
  tab5enter: boolean = false;
  tab6enter: boolean = false;
  tab7enter: boolean = false;
  tab8enter: boolean = false;
  tab9enter: boolean = false;
  tab10enter: boolean = false;
  movingup: boolean = false;
  movingup1: boolean = false;
  movingup2: boolean = false;
  movingup3: boolean = false;
  movingup4: boolean = false;
  movingup5: boolean = false;
  movingup6: boolean = false;
  movingup7: boolean = false;
  movingup7a: boolean = false;
  movingup8: boolean = false;
  movingup9: boolean = false;
  movingup9a: boolean = false;
  close1: boolean = false;
  close2: boolean = false;
  close4: boolean = false;
  close3: boolean = false;
  close5: boolean = false;
  lunchtext: number = 0;
  idnumbertime: number = 0;
  idnumberhour: number = 0;
  options = [
    { id: 1, name: 'Sunday', value: 'Sun', checked: false, ischecked: false, weekchecked: false },
    { id: 2, name: 'Monday', value: 'Mon', checked: false, ischecked: false, weekchecked: false },
    { id: 3, name: 'Tuesday', value: 'Tue', checked: false, ischecked: false, weekchecked: false },
    { id: 4, name: 'Wednesday', value: 'Wed', checked: false, ischecked: false, weekchecked: false },
    { id: 5, name: 'Thursday', value: 'Thu', checked: false, ischecked: false, weekchecked: false },
    { id: 6, name: 'Friday', value: 'Fri', checked: false, ischecked: false, weekchecked: false },
    { id: 7, name: 'Saturday', value: 'Sat', checked: false, ischecked: false, weekchecked: false },
  ];

  days = [
    { idday: 1, day: 'Sunday' },
    { idday: 2, day: 'Monday' },
    { idday: 3, day: 'Tuesday' },
    { idday: 4, day: 'Wednesday' },
    { idday: 5, day: 'Thursday' },
    { idday: 6, day: 'Friday' },
    { idday: 7, day: 'Saturday' },
  ];

  times = [
    { idtime: 1, time: '06:00 AM' },
    { idtime: 2, time: '07:00 AM' },
    { idtime: 3, time: '08:00 AM' },
    { idtime: 4, time: '09:00 AM' },
  ];

  clocks = [
    { idclock: 1, clock: 'AM' },
    { idclock: 2, clock: 'PM' },
  ];

  hours = [
    { idhour: 1, hour: '8 Hours' },
    { idhour: 2, hour: '9 Hours' },
    { idhour: 3, hour: '10 Hours' },
    { idhour: 4, hour: '12 Hours' },
  ];

  selectDays = [
    { id: "1", name: 'Sunday', value: 'Sun', checked: false },
    { id: "2", name: 'Monday', value: 'Mon', checked: false },
    { id: "3", name: 'Tuesday', value: 'Tue', checked: false },
    { id: "4", name: 'Wednesday', value: 'Wed', checked: false },
    { id: "5", name: 'Thursday', value: 'Thu', checked: false },
    { id: "6", name: 'Friday', value: 'Fri', checked: false },
    { id: "7", name: 'Saturday', value: 'Sat', checked: false },
  ]


  showInput: boolean | undefined;

  checkBoxes: any

  allDayArray: any[] = []

  constructor(private library: LibraryService,private apiservice: ApiServiceService,private method:WorkScheduleComponent) { }

  ngOnInit(): void {
    this.library.toggle$.subscribe(
      toggle => this.showInput = toggle
    )
    this.nameswitch = false;
    document.documentElement.style.setProperty('--x', '0px');
    this.hoursvalue2 = '';
    this.hoursvalue3 = '';
    this.hoursvalue1 = '';
    this.hoursvalue4 = '';
    this.hoursvalue5 = '';
    this.hoursvalue6 = '';
    this.hoursvalue7 = '';
    this.viewrecords = [];
    this.workimports = [];
    this.hourssnumber = [];

    
    this.works = [];
    this.library.getworklibrary().subscribe((val) => {

      val.forEach((itemworkk: any) => {
        itemworkk['name'] = itemworkk.libraryName,
          itemworkk['tname'] = itemworkk.libraryName,
          itemworkk['dayvalue'] = itemworkk.weekStart,
          itemworkk['days'] = itemworkk.workingDays,
          itemworkk['daynumber'] = itemworkk.numberOfDays,
          itemworkk['time'] = itemworkk.dayStart,
          itemworkk['vname'] = itemworkk.libraryName,
          itemworkk['vdayvalue'] = itemworkk.weekStart,
          itemworkk['vdays'] = itemworkk.workingDays,
          itemworkk['vdaynumber'] = itemworkk.numberOfDays,
          itemworkk['vtime'] = itemworkk.dayStart,
          itemworkk['ischeckedvalue'] = false;
        itemworkk['itemChecked'] = false;
        itemworkk['isallchecked'] = false;
        if (itemworkk.hoursWorked == 1) {
          itemworkk['hour'] = itemworkk.hoursWorked + ' Hour';
          itemworkk['vhour'] = itemworkk.hoursWorked + ' Hour';
        } else {
          itemworkk['hour'] = itemworkk.hoursWorked + ' Hours';
          itemworkk['vhour'] = itemworkk.hoursWorked + ' Hours';
        }
        if (itemworkk.lunchBreak.toString().length == 1) {
          if (itemworkk.lunchBreak == 1) {
            itemworkk['lunch'] = '0' + itemworkk.lunchBreak + ' Minute';
            itemworkk['vlunch'] = '0' + itemworkk.lunchBreak + ' Minute';
          } else {
            itemworkk['lunch'] = '0' + itemworkk.lunchBreak + ' Minutes';
            itemworkk['vlunch'] = '0' + itemworkk.lunchBreak + ' Minutes';
          }
        } else if (itemworkk.lunchBreak.toString().length == 2) {
          itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + itemworkk.lunchBreak.toString().split('')[1] + ' Minutes';
          itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + itemworkk.lunchBreak.toString().split('')[1] + ' Minutes';
        } else if (itemworkk.lunchBreak.toString().length == 3) {
          if (itemworkk.lunchBreak.toString().split('')[0] == 1) {
            if (itemworkk.lunchBreak.toString().split('')[1] == 0 && itemworkk.lunchBreak.toString().split('')[2] == 0) {
              itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hour';
              itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hour';
            } else {
              if (itemworkk.lunchBreak.toString().split('')[1] == 0 && itemworkk.lunchBreak.toString().split('')[2] == 1) {
                itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hour ' + itemworkk.lunchBreak.toString().split('')[1] + itemworkk.lunchBreak.toString().split('')[2] + ' Minute';
                itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hour ' + itemworkk.lunchBreak.toString().split('')[1] + itemworkk.lunchBreak.toString().split('')[2] + ' Minute';
              } else {
                itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hour ' + itemworkk.lunchBreak.toString().split('')[1] + itemworkk.lunchBreak.toString().split('')[2] + ' Minutes';
                itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hour ' + itemworkk.lunchBreak.toString().split('')[1] + itemworkk.lunchBreak.toString().split('')[2] + ' Minutes';
              }

            }
          } else {
            if (itemworkk.lunchBreak.toString().split('')[1] == 0 && itemworkk.lunchBreak.toString().split('')[2] == 0) {
              itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hours';
              itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hours';
            } else {
              if (itemworkk.lunchBreak.toString().split('')[1] == 0 && itemworkk.lunchBreak.toString().split('')[2] == 1) {
                itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hours ' + itemworkk.lunchBreak.toString().split('')[1] + itemworkk.lunchBreak.toString().split('')[2] + ' Minute';
                itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hours ' + itemworkk.lunchBreak.toString().split('')[1] + itemworkk.lunchBreak.toString().split('')[2] + ' Minute';
              } else {
                itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hours ' + itemworkk.lunchBreak.toString().split('')[1] + itemworkk.lunchBreak.toString().split('')[2] + ' Minutes';
                itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + ' Hours ' + itemworkk.lunchBreak.toString().split('')[1] + itemworkk.lunchBreak.toString().split('')[2] + ' Minutes';
              }

            }
          }
        } else if (itemworkk.lunchBreak.toString().length == 4) {
          if (itemworkk.lunchBreak.toString().split('')[1] == 0 && itemworkk.lunchBreak.toString().split('')[2] == 0) {
            itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + itemworkk.lunchBreak.toString().split('')[1] + ' Hours';
            itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + itemworkk.lunchBreak.toString().split('')[1] + ' Hours';
          } else {
            if (itemworkk.lunchBreak.toString().split('')[1] == 0 && itemworkk.lunchBreak.toString().split('')[2] == 1) {
              itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + itemworkk.lunchBreak.toString().split('')[1] + ' Hours ' + itemworkk.lunchBreak.toString().split('')[2] + itemworkk.lunchBreak.toString().split('')[3] + ' Minute';
              itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + itemworkk.lunchBreak.toString().split('')[1] + ' Hours ' + itemworkk.lunchBreak.toString().split('')[2] + itemworkk.lunchBreak.toString().split('')[3] + ' Minute';
            } else {
              itemworkk['lunch'] = itemworkk.lunchBreak.toString().split('')[0] + itemworkk.lunchBreak.toString().split('')[1] + ' Hours ' + itemworkk.lunchBreak.toString().split('')[2] + itemworkk.lunchBreak.toString().split('')[3] + ' Minutes';
              itemworkk['vlunch'] = itemworkk.lunchBreak.toString().split('')[0] + itemworkk.lunchBreak.toString().split('')[1] + ' Hours ' + itemworkk.lunchBreak.toString().split('')[2] + itemworkk.lunchBreak.toString().split('')[3] + ' Minutes';
            }

          }
        }
        itemworkk['clocktext'] = '';
        itemworkk['clockhour'] = '';
        itemworkk['clockmin'] = '';
        itemworkk['hoursnumber'] = itemworkk.hoursWorked;

        this.workimports.push(itemworkk);




      });
    });


    this.checkedList = [];
    this.checkedLists = [];

    
    const interval = setInterval(() => {
      if (this.workimports.length != 0) {
        clearInterval(interval);
        let a = this.workimports.length;
        this.workimports.forEach((val: any) => {
          val.sequence = a--;
        });
        this.autowidth();
      } else {

      }
    }, 400);


    this.timevalues = [];
    this.library.getworksettingtime().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['splitedvaluea'] = itemworkk.selectedValue.split(" ", 2);
        itemworkk['splitedvalueb'] = itemworkk.splitedvaluea[0];
        itemworkk['splitedvalued'] = itemworkk.splitedvaluea[1];
        itemworkk['splitedvaluec'] = itemworkk.splitedvalueb.split(":", 2);
        itemworkk['splitedvalue'] = parseInt(itemworkk.splitedvaluec[0] + itemworkk.splitedvaluec[1]);
      });

      this.timevalues = val;
      this.timevalues.sort((a: { splitedvalue: any; }, b: { splitedvalue: any; }) => a.splitedvalue - b.splitedvalue);
      this.sortera = {
        "am": 0,
        "pm": 1,
      }

      this.timevalues.sort((a: { splitedvalued: any; }, b: { splitedvalued: any; }) => {
        let day1 = a.splitedvalued.toLowerCase();
        let day2 = b.splitedvalued.toLowerCase();
        return this.sortera[day1] - this.sortera[day2];
      });
    });

    this.lunchevalues = [];
    this.library.getworksettinglunch().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        this.lunchevalues.push(itemworkk);
      });
    });

    this.hourvalues = [];
    this.library.getworksettinghour().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['hournumber'] = 0;

        itemworkk['hoursWorking'] = itemworkk.selectedValue;
        if (itemworkk.hoursWorking == '1 Hours') {
          itemworkk.hournumber = 1;
        } else if (itemworkk.hoursWorking == '2 Hours') {
          itemworkk.hournumber = 2;
        } else if (itemworkk.hoursWorking == '3 Hours') {
          itemworkk.hournumber = 3;
        } else if (itemworkk.hoursWorking == '4 Hours') {
          itemworkk.hournumber = 4;
        } else if (itemworkk.hoursWorking == '5 Hours') {
          itemworkk.hournumber = 5;
        } else if (itemworkk.hoursWorking == '6 Hours') {
          itemworkk.hournumber = 6;
        } else if (itemworkk.hoursWorking == '7 Hours') {
          itemworkk.hournumber = 7;
        } else if (itemworkk.hoursWorking == '8 Hours') {
          itemworkk.hournumber = 8;
        } else if (itemworkk.hoursWorking == '9 Hours') {
          itemworkk.hournumber = 9;
        } else if (itemworkk.hoursWorking == '10 Hours') {
          itemworkk.hournumber = 10;
        } else if (itemworkk.hoursWorking == '11 Hours') {
          itemworkk.hournumber = 11;
        } else if (itemworkk.hoursWorking == '12 Hours') {
          itemworkk.hournumber = 12;
        } else if (itemworkk.hoursWorking == '13 Hours') {
          itemworkk.hournumber = 13;
        } else if (itemworkk.hoursWorking == '14 Hours') {
          itemworkk.hournumber = 14;
        } else if (itemworkk.hoursWorking == '15 Hours') {
          itemworkk.hournumber = 15;
        } else if (itemworkk.hoursWorking == '16 Hours') {
          itemworkk.hournumber = 16;
        } else if (itemworkk.hoursWorking == '17 Hours') {
          itemworkk.hournumber = 17;
        } else if (itemworkk.hoursWorking == '18 Hours') {
          itemworkk.hournumber = 18;
        } else if (itemworkk.hoursWorking == '19 Hours') {
          itemworkk.hournumber = 19;
        } else if (itemworkk.hoursWorking == '20 Hours') {
          itemworkk.hournumber = 20;
        } else if (itemworkk.hoursWorking == '21 Hours') {
          itemworkk.hournumber = 21;
        } else if (itemworkk.hoursWorking == '22 Hours') {
          itemworkk.hournumber = 22;
        } else if (itemworkk.hoursWorking == '23 Hours') {
          itemworkk.hournumber = 23;
        } else if (itemworkk.hoursWorking == '24 Hours') {
          itemworkk.hournumber = 24;
        }
      });


      this.hourvalues = val;
      this.hourvalues.sort((a: { hournumber: any; }, b: { hournumber: any; }) => a.hournumber - b.hournumber);
    });



    setInterval(() => {
      if (this.showInput == true) {
        this.showInput = false;
        this.openview();
      } else {

      }
      if (this.status == true) {
        this.selecttext = "Unselect All"
      } else {
        this.selecttext = "Select All"
      }
    }, 400);

  
  }
  openview() {
    this.viewrecords = [];
    this.workimports.forEach((val: any) => {
      if (this.library.idnumber == val.id) {
        this.viewrecords.push(val)

      }
    });
  }

  autowidth() {
    document.documentElement.style.setProperty('--x', '0px');
    let arr1: any = [];
    let arr10 = [];
    let arr9 = 0;
    this.workimports.forEach((val: any) => {
      arr1.push(val.workingDays);
    });
    for (var i = 0; i < arr1.length; i++) {
      let arr2: any = [];
      let arr5: any = [];
      let arr8: any = [];
      arr5.push(arr1[i]);
      arr2 = arr5.toString().split(',');
      let arr3 = arr2[0];
      let arr4 = arr2[arr2.length - 1];
      let arr6 = 0;
      let arr7 = 0;
      this.options.forEach((arrs: any) => {
        if (arrs.value == arr3) {
          arr6 = parseInt(arrs.id);
        }
        if (arrs.value == arr4) {
          arr7 = parseInt(arrs.id);
        }


      });
      for (let j = arr6; j <= arr7; j++) {
        arr8.push(j);
      }

      arr9 = arr8.length - arr2.length;
      if (arr9 != 0) {
        arr10.push(arr2.length);
      }
    }
    if (arr10.length == 0) {
      document.documentElement.style.setProperty('--x', '0px');
    } else if (arr10.length != 0) {
      var max = arr10.reduce((a: number, b: number) => Math.max(a, b));

      if (max == 3) {
        document.documentElement.style.setProperty('--x', '20px');
      } else if (max == 4) {
        document.documentElement.style.setProperty('--x', '40px');
      } else if (max == 5) {
        document.documentElement.style.setProperty('--x', '60px');
      } else if (max == 6) {
        document.documentElement.style.setProperty('--x', '80px');
      }
    }
  }
  onChangelunch(valueupdate: any, id: any) {
    if (valueupdate != '') {
      if (this.editpopup == true) {
        document.getElementById('viewrow2lunch')?.focus();
        this.hoursvalue4 = valueupdate;
        if (this.clocktext >= 2) {
          this.hoursvalue4 = 0;
          this.clocktext = 0;
        }
      } else {
        document.getElementById('row2lunch' + id)?.focus();
        this.hoursvalue4 = valueupdate;
        if (this.clocktext >= 2) {
          this.hoursvalue4 = 0;
          this.clocktext = 0;
        }
      }
    }
  }
  onChange2lunch(valueupdate: any, id: any) {
    if (valueupdate != '') {
      if (this.editpopup == true) {
        this.viewrecords.forEach((value: any) => {
          this.hoursvalue5 = '';
          this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
          var a = value.vhour.split(' ')[0];
          this.viewlunch2switch = true;
          if (parseInt(this.hoursvalue5) >= parseInt(a)) {
            document.getElementById('viewrow2lunch')?.blur();
            this.hoursvalue4 = 0;
            this.clocktext = 0;
            this.hoursvalue2 = a;
            this.hoursvalue1 = 0;
            this.hoursvalue3 = 0;
          } else {
            document.getElementById('viewrow3lunch')?.focus();
          }
        });
      } else {
        this.workimports.forEach((value: any) => {
          if (value.id == id) {
            this.hoursvalue5 = '';
            this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
            var a = value.hour.split(' ')[0];
            this.viewlunch2switch = true;
            if (parseInt(this.hoursvalue5) >= parseInt(a)) {
              document.getElementById('row2lunch' + id)?.blur();
              this.hoursvalue4 = 0;
              this.clocktext = 0;
              this.hoursvalue2 = a;
              this.hoursvalue1 = 0;
              this.hoursvalue3 = 0;
            } else {
              document.getElementById('row3lunch' + id)?.focus();
            }
          }
        });
      }
    }
  }
  onChange3lunch(valueupdate: any, id: any) {
    if (valueupdate != '') {
      if (this.editpopup == true) {
        this.hoursvalue5 = 0;
        this.viewrecords.forEach((value: any) => {
          this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
          var a = value.vhour.split(' ')[0];
          if (parseInt(this.hoursvalue5) >= parseInt(a)) {
            if (this.hoursvalue1 >= 6) {
              document.getElementById('viewrow4lunch')?.focus();
              this.hoursvalue4 = 0;
              this.clocktext = 0;
              this.hoursvalue2 = parseInt(a);
              this.hoursvalue1 = 0;
              this.hoursvalue3 = 0;
            } else {
              document.getElementById('viewrow4lunch')?.focus();
              this.hoursvalue4 = 0;
              this.clocktext = 0;
              this.hoursvalue2 = parseInt(a) - 1;
            }
          } else {
            if (this.hoursvalue1 >= 6) {
              document.getElementById('viewrow4lunch')?.focus();
              this.hoursvalue4 = 0;
              this.clocktext = 0;
              this.hoursvalue2 = parseInt(this.hoursvalue2) + 1;
              this.hoursvalue1 = 0;
              this.hoursvalue3 = 0;
            } else {
              document.getElementById('viewrow4lunch')?.focus();
            }
          }
        });
      } else {
        this.hoursvalue5 = 0;
        this.workimports.forEach((value: any) => {
          if (value.id == id) {
            this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
            var a = value.hour.split(' ')[0];
            if (parseInt(this.hoursvalue5) >= parseInt(a)) {
              if (this.hoursvalue1 >= 6) {
                document.getElementById('row4lunch' + id)?.focus();
                this.hoursvalue4 = 0;
                this.clocktext = 0;
                this.hoursvalue2 = parseInt(a);
                this.hoursvalue1 = 0;
                this.hoursvalue3 = 0;
              } else {
                document.getElementById('row4lunch' + id)?.focus();
                this.hoursvalue4 = 0;
                this.clocktext = 0;
                this.hoursvalue2 = parseInt(a) - 1;
              }
            } else {
              if (this.hoursvalue1 >= 6) {
                document.getElementById('row4lunch' + id)?.focus();
                this.hoursvalue4 = 0;
                this.clocktext = 0;
                this.hoursvalue2 = parseInt(this.hoursvalue2) + 1;
                this.hoursvalue1 = 0;
                this.hoursvalue3 = 0;
              } else {
                document.getElementById('row4lunch' + id)?.focus();
              }
            }
          }
        });
      }
    }

  }
  onChange4lunch(valueupdate: any, id: any) {
    if (valueupdate != '') {
      if (this.editpopup == true) {
        this.viewrecords.forEach((value: any) => {
          this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
          var a = value.vhour.split(' ')[0];
          if (parseInt(this.hoursvalue5) >= parseInt(a)) {
            this.hoursvalue4 = 0;
            this.clocktext = 0;
            this.hoursvalue2 = parseInt(a) - 1;
          }
        });
      } else {
        this.workimports.forEach((value: any) => {
          if (value.id == id) {
            this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
            var a = value.hour.split(' ')[0];
            if (parseInt(this.hoursvalue5) >= parseInt(a)) {
              this.hoursvalue4 = 0;
              this.clocktext = 0;
              this.hoursvalue2 = parseInt(a) - 1;
            }
          }
        });
      }
    }

  }

  onChange(valueupdate: any, id: any) {
    if (valueupdate != '') {
      if (this.editpopup == true) {
        document.getElementById('viewrow1time')?.classList.remove('redcolour');
        document.getElementById('viewrow2time')?.classList.remove('redcolour');
        document.getElementById('viewrow3time')?.classList.remove('redcolour');
        document.getElementById('viewrow4time')?.classList.remove('redcolour');
        document.getElementById('viewrow6time')?.classList.remove('redcolour');
        document.getElementById('viewrow3time')?.focus();
        this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
        if (this.hoursvalue5 == 14) {
          this.clocktext = 0;
          this.hoursvalue4 = 0;
          this.hoursvalue2 = 2;
          this.hoursvalue6 = 'PM';
          this.hoursvalue5 = '';
          document.getElementById('viewclocksublist')?.classList.add('arrow1opacity');
          document.getElementById('viewclocksub1list')?.classList.remove('arrow2opacity');
        } else if (this.hoursvalue5 == 13) {
          this.clocktext = 0;
          this.hoursvalue4 = 0;
          this.hoursvalue2 = 1;
          this.hoursvalue5 = '';
          this.hoursvalue6 = 'PM';
          document.getElementById('viewclocksublist')?.classList.add('arrow1opacity');
          document.getElementById('viewclocksub1list')?.classList.remove('arrow2opacity');
        } else if (this.hoursvalue5 > 12) {
          this.clocktext = 0;
          this.hoursvalue4 = 0;
          this.hoursvalue5 = '';
          this.hoursvalue2 = this.hoursvalue2 - 2;
          this.hoursvalue6 = 'PM';
          document.getElementById('viewclocksublist')?.classList.add('arrow1opacity');
          document.getElementById('viewclocksub1list')?.classList.remove('arrow2opacity');
        } else {
          this.hoursvalue4 = this.clocktext;
          this.hoursvalue6 = 'AM';
          this.hoursvalue5 = '';
          document.getElementById('viewclocksub1list')?.classList.add('arrow2opacity');
          document.getElementById('viewclocksublist')?.classList.remove('arrow1opacity');
        }
      } else {

        document.getElementById('row1time' + id)?.classList.remove('redcolour');
        document.getElementById('row2time' + id)?.classList.remove('redcolour');
        document.getElementById('row3time' + id)?.classList.remove('redcolour');
        document.getElementById('row4time' + id)?.classList.remove('redcolour');
        document.getElementById('row6time' + id)?.classList.remove('redcolour');
        document.getElementById('row3time' + this.timenumber)?.focus();
        this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
        // if (this.hoursvalue2 == 3) {
        //   this.clocktext = 0;
        // } else if (this.hoursvalue2 == 4) {
        //   this.clocktext = 0;
        // }
        // else if (this.hoursvalue2 == 5) {
        //   this.clocktext = 0;
        // }
        // else if (this.hoursvalue2 == 6) {
        //   this.clocktext = 0;
        // }
        // else if (this.hoursvalue2 == 7) {
        //   this.clocktext = 0;
        // }
        // else if (this.hoursvalue2 == 8) {
        //   this.clocktext = 0;
        // } else if (this.hoursvalue2 == 9) {
        //   this.clocktext = 0;
        // } 

        // if (this.hoursvalue1 == 6) {
        //   this.hoursvalue1 = 5;
        // } else if (this.hoursvalue1 == 7) {
        //   this.hoursvalue1 = 5;
        // } else if (this.hoursvalue1 == 8) {
        //   this.hoursvalue1 = 5;
        // } else if (this.hoursvalue1 == 9) {
        //   this.hoursvalue1 = 5;
        // }
        if (this.hoursvalue5 == 14) {
          this.clocktext = 0;
          this.hoursvalue4 = 0;
          this.hoursvalue2 = 2;
          this.hoursvalue6 = 'PM';
          this.hoursvalue5 = '';
          document.getElementById('clocksublist' + this.timenumber)?.classList.add('arrow1opacity');
          document.getElementById('clocksub1list' + this.timenumber)?.classList.remove('arrow2opacity');
        } else if (this.hoursvalue5 == 13) {
          this.clocktext = 0;
          this.hoursvalue4 = 0;
          this.hoursvalue2 = 1;
          this.hoursvalue5 = '';
          this.hoursvalue6 = 'PM';
          document.getElementById('clocksublist' + this.timenumber)?.classList.add('arrow1opacity');
          document.getElementById('clocksub1list' + this.timenumber)?.classList.remove('arrow2opacity');
        } else if (this.hoursvalue5 > 12) {
          this.clocktext = 0;
          this.hoursvalue4 = 0;
          this.hoursvalue5 = '';
          this.hoursvalue2 = this.hoursvalue2 - 2;
          this.hoursvalue6 = 'PM';
          document.getElementById('clocksublist' + this.timenumber)?.classList.add('arrow1opacity');
          document.getElementById('clocksub1list' + this.timenumber)?.classList.remove('arrow2opacity');
        } else {
          this.hoursvalue4 = this.clocktext;
          this.hoursvalue6 = 'AM';
          this.hoursvalue5 = '';
          document.getElementById('clocksub1list' + this.timenumber)?.classList.add('arrow2opacity');
          document.getElementById('clocksublist' + this.timenumber)?.classList.remove('arrow1opacity');
        }

      }

    }
  }

  on2Change(valueupdate: any, id: any) {
    if (valueupdate != '') {
      if (this.editpopup == true) {
        document.getElementById('viewrow1time')?.classList.remove('redcolour');
        document.getElementById('viewrow2time')?.classList.remove('redcolour');
        document.getElementById('viewrow3time')?.classList.remove('redcolour');
        document.getElementById('viewrow4time')?.classList.remove('redcolour');
        document.getElementById('viewrow6time')?.classList.remove('redcolour');
        document.getElementById('viewrow4time')?.focus();
      } else {
        document.getElementById('row1time' + id)?.classList.remove('redcolour');
        document.getElementById('row2time' + id)?.classList.remove('redcolour');
        document.getElementById('row3time' + id)?.classList.remove('redcolour');
        document.getElementById('row4time' + id)?.classList.remove('redcolour');
        document.getElementById('row6time' + id)?.classList.remove('redcolour');
        document.getElementById('row4time' + this.timenumber)?.focus();
      }
    }
  }
  clockedit(id: any) {
    if (this.movingup8 == true) {
      document.getElementById('row1time' + id)?.classList.remove('redcolour');
      document.getElementById('row2time' + id)?.classList.remove('redcolour');
      document.getElementById('row3time' + id)?.classList.remove('redcolour');
      document.getElementById('row4time' + id)?.classList.remove('redcolour');
      document.getElementById('row6time' + id)?.classList.remove('redcolour');
      document.getElementById('clocksublist' + id)?.classList.add('arrow1opacity');
      document.getElementById('clocksub1list' + id)?.classList.remove('arrow2opacity');
      this.hoursvalue6 = 'PM';
    } else if (this.viewtime2switch == true) {
      document.getElementById('viewrow1time')?.classList.remove('redcolour');
      document.getElementById('viewrow2time')?.classList.remove('redcolour');
      document.getElementById('viewrow3time')?.classList.remove('redcolour');
      document.getElementById('viewrow4time')?.classList.remove('redcolour');
      document.getElementById('viewrow6time')?.classList.remove('redcolour');
      document.getElementById('viewclocksublist')?.classList.add('arrow1opacity');
      document.getElementById('viewclocksub1list')?.classList.remove('arrow2opacity');
      this.hoursvalue6 = 'PM';
    }

  }
  clockdone(id: any) {
    if (this.movingup8 == true) {
      document.getElementById('row1time' + id)?.classList.remove('redcolour');
      document.getElementById('row2time' + id)?.classList.remove('redcolour');
      document.getElementById('row3time' + id)?.classList.remove('redcolour');
      document.getElementById('row4time' + id)?.classList.remove('redcolour');
      document.getElementById('row6time' + id)?.classList.remove('redcolour');
      document.getElementById('clocksub1list' + id)?.classList.add('arrow2opacity');
      document.getElementById('clocksublist' + id)?.classList.remove('arrow1opacity');
      this.hoursvalue6 = 'AM';
    } else if (this.viewtime2switch == true) {
      document.getElementById('viewrow1time')?.classList.remove('redcolour');
      document.getElementById('viewrow2time')?.classList.remove('redcolour');
      document.getElementById('viewrow3time')?.classList.remove('redcolour');
      document.getElementById('viewrow4time')?.classList.remove('redcolour');
      document.getElementById('viewrow6time')?.classList.remove('redcolour');
      document.getElementById('viewclocksub1list')?.classList.add('arrow2opacity');
      document.getElementById('viewclocksublist')?.classList.remove('arrow1opacity');
      this.hoursvalue6 = 'AM';
    }


  }
  on3Change(valueupdate: any, id: any) {
    if (valueupdate != '') {
      if (this.editpopup == true) {
        this.viewtime2switch = true;
        document.getElementById('viewrow6time')?.focus();
        document.getElementById('viewrow1time')?.classList.remove('redcolour');
        document.getElementById('viewrow2time')?.classList.remove('redcolour');
        document.getElementById('viewrow3time')?.classList.remove('redcolour');
        document.getElementById('viewrow4time')?.classList.remove('redcolour');
        document.getElementById('viewrow6time')?.classList.remove('redcolour');
        this.viewtime3switch = true;
      } else {
        document.getElementById('row6time' + this.timenumber)?.focus();
        this.movingup8 = true;
        this.movingup4 = true;
        document.getElementById('row1time' + id)?.classList.remove('redcolour');
        document.getElementById('row2time' + id)?.classList.remove('redcolour');
        document.getElementById('row3time' + id)?.classList.remove('redcolour');
        document.getElementById('row4time' + id)?.classList.remove('redcolour');
        document.getElementById('row6time' + id)?.classList.remove('redcolour');
      }
    }
  }

  on4Change(valueupdate: any, id: any, workhoursnumber: any) {
    if (this.editpopup == true) {
      if (valueupdate != '') {
        if (valueupdate >= 24) {
          workhoursnumber = 24;
        } else {

        }
      }
    } else {
      this.movingup5 = true;
      if (valueupdate != '') {
        if (valueupdate >= 24) {
          workhoursnumber = 24;
        } else {

        }
      }
    }


  }
  on5Change(valueupdate: any, id: any) {
    if (valueupdate != '') {
      if (this.editpopup == true) {
        document.getElementById('viewrow1time')?.classList.remove('redcolour');
        document.getElementById('viewrow2time')?.classList.remove('redcolour');
        document.getElementById('viewrow3time')?.classList.remove('redcolour');
        document.getElementById('viewrow4time')?.classList.remove('redcolour');
        document.getElementById('viewrow6time')?.classList.remove('redcolour');
      } else {
        document.getElementById('row1time' + id)?.classList.remove('redcolour');
        document.getElementById('row2time' + id)?.classList.remove('redcolour');
        document.getElementById('row3time' + id)?.classList.remove('redcolour');
        document.getElementById('row4time' + id)?.classList.remove('redcolour');
        document.getElementById('row6time' + id)?.classList.remove('redcolour');
      }
    }
  }
  addwork() {
    this.works = [];
    this.workimports = [];
    let i = 1;
    this.library.getworks().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['name'] = itemworkk.workScheduleName,
          itemworkk['tname'] = itemworkk.workScheduleName,
          itemworkk['dayvalue'] = itemworkk.dayWeekStarts,
          itemworkk['days'] = itemworkk.workingDays,
          itemworkk['daynumber'] = itemworkk.numberOfDays,
          itemworkk['time'] = itemworkk.timeDayStarts,
          itemworkk['hour'] = itemworkk.hoursWorking.split(',')[0],
          itemworkk['vname'] = itemworkk.workScheduleName,
          itemworkk['vdayvalue'] = itemworkk.dayWeekStarts,
          itemworkk['vdays'] = itemworkk.workingDays,
          itemworkk['vdaynumber'] = itemworkk.numberOfDays,
          itemworkk['vtime'] = itemworkk.timeDayStarts,
          itemworkk['vhour'] = itemworkk.hoursWorking.split(',')[0],
          itemworkk['ischeckedvalue'] = false;
        itemworkk['splitedvaluea'] = itemworkk.timeDayStarts.split(" ", 2);
        itemworkk['splitedvalueb'] = itemworkk.splitedvaluea[0];
        itemworkk['splitedvalued'] = itemworkk.splitedvaluea[1];
        itemworkk['splitedvaluec'] = itemworkk.splitedvalueb.split(":", 2);
        itemworkk['splitedvalue'] = parseInt(itemworkk.splitedvaluec[0] + itemworkk.splitedvaluec[1]);
        itemworkk['itemChecked'] = false;
        itemworkk['isallchecked'] = false;
        itemworkk['sequence'] = i++;
        itemworkk['clocktext'] = '';
        itemworkk['clockhour'] = '';
        itemworkk['clockmin'] = '';
        itemworkk['hoursnumber'] = 0;
        if (itemworkk.isImported == true) {
          this.workimports.push(itemworkk);




          this.workimports.sort((a: { splitedvalue: any; }, b: { splitedvalue: any; }) => a.splitedvalue - b.splitedvalue);
          this.sortera = {
            "am": 0,
            "pm": 1,
          }

          this.workimports.sort((a: { splitedvalued: any; }, b: { splitedvalued: any; }) => {
            let day1 = a.splitedvalued.toLowerCase();
            let day2 = b.splitedvalued.toLowerCase();
            return this.sortera[day1] - this.sortera[day2];
          });

          this.sorter = {
            "sunday": 0,
            "monday": 1,
            "tuesday": 2,
            "wednesday": 3,
            "thursday": 4,
            "friday": 5,
            "saturday": 6,

          }

          this.workimports.sort((a: { dayWeekStarts: any; }, b: { dayWeekStarts: any; }) => {
            let day1 = a.dayWeekStarts.toLowerCase();
            let day2 = b.dayWeekStarts.toLowerCase();
            return this.sorter[day1] - this.sorter[day2];
          });
          this.workimports = this.workimports.sort((a: { numberOfDays: number; }, b: { numberOfDays: number; }) => a.numberOfDays - b.numberOfDays);
        }
      });
    });
    let a = 1;
    let b = 1;
    const interval = setInterval(() => {
      b++;
      if (b == 4) {
        clearInterval(interval);
        this.workimports.forEach((val: any) => {
          val.sequence = a++;
          this.works.push(val);
        });

      } else {

      }
    }, 400);
    let c = 1;
    const interval1 = setInterval(() => {
      c++;
      if (c == 3) {
        clearInterval(interval1);
        this.works.forEach((val: any) => {
          this.workimports.push(val);
        });
      } else {

      }
    }, 400);
  }

  worknameonactive(workname: any, id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        this.currentvalue = val.workScheduleName;

        if (workname != this.currentvalue) {
          this.editableactive = true;
          this.viewonactive();
          this.currentvalue = "";
        } else {
          this.editableactive = false;
          this.currentvalue = "";
        }
      }
    });
  }

  worknameactive(event: any, workname: any, id: any) {

    if (event.keyCode === 13) {
      this.workimports.forEach((val: any) => {
        if (val.id == id) {

          if (workname != val.tname) {
            this.viewactive();
            this.editableactive = true;
            this.currentvalue = "";
          } else {
            this.viewinactive();
            this.editableactive = false;
            this.currentvalue = "";
          }
        }
      });

    } else {

    }


  }

  clcikevent(workname: any, id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        this.currentvalue = val.name;

        if (workname != this.currentvalue) {
          this.viewactive();
        } else {
          this.viewinactive();
        }
      }
    });
  }
  nameopen() {
    this.switchname = true;
  }

  increment(id: any) {

    if (this.editpopup == true) {

    } else {
      this.movingup5 = true;
    }

    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        if (this.hournumberings == this.hourssnumber.length) {
          this.hournumberings = 0;
          val.hoursnumber = this.hourssnumber[this.hournumberings];
          this.hournumberings += 1;
        } else {
          val.hoursnumber = this.hourssnumber[this.hournumberings];
          this.hournumberings += 1;
        }

      }


    });


  }


  decrement(id: any) {
    if (this.editpopup == true) {

    } else {
      this.movingup5 = true;
    }

    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        if (this.hournumberings == 0) {
          this.hournumberings = this.hourssnumber.length - 1;
          val.hoursnumber = this.hourssnumber[this.hournumberings];
        } else {
          this.hournumberings -= 1;
          val.hoursnumber = this.hourssnumber[this.hournumberings];

        }

      }

    });

  }

  next() {
    this.viewrecords.forEach((val: any) => {
      this.idview = val.id;
      this.sequenceview = val.sequence;
    });

    let a = this.sequenceview + 1;

    this.workimports.forEach((val: any) => {

      if (val.sequence == a) {
        this.viewrecords = [];
        this.viewrecords.push(val);
      } else if (a > this.workimports.length) {
        a = 1;
        if (val.sequence == a) {
          this.viewrecords = [];
          this.viewrecords.push(val);
        }
      }
    });

  }
  prev() {
    this.viewrecords.forEach((val: any) => {
      this.idview = val.id;
      this.sequenceview = val.sequence;
    });

    let a = this.sequenceview - 1;
    this.workimports.forEach((val: any) => {

      if (val.sequence == a) {
        this.viewrecords = [];
        this.viewrecords.push(val);
      } else if (a < 1) {
        a = this.workimports.length;
        if (val.sequence == a) {
          this.viewrecords = [];
          this.viewrecords.push(val);
        }
      }
    });

  }

  selectall1days(id: any) {
    this.checkedLists = [];
    this.checkedList = [];
    this.status = !this.status;

    if (this.status == true) {
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
      this.options.forEach((valoption: any) => {
        valoption.checked = true;
        this.checkedLists.push(valoption);
        this.checkedList.push(valoption.value);
      });
    } else {
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
      this.options.forEach((valoption: any) => {
        valoption.checked = false;
        this.checkedLists = [];
        this.checkedList = [];
      });
    }
    this.checkedvalues(id);

    this.autonamingdays(id);
  }

  selectalldays(id: any) {
    this.checkedLists = [];
    this.checkedList = [];
    this.status = !this.status;

    if (this.status == true) {
      this.options.forEach((valoption: any) => {
        valoption.checked = true;
        this.checkedLists.push(valoption);
        this.checkedList.push(valoption.value);
      });
    } else {
      this.options.forEach((valoption: any) => {
        valoption.checked = false;
        this.checkedLists = [];
        this.checkedList = [];
      });
    }
    this.checkedvalues(id);

    this.autonamingdays(id);
  }
  close() {
    this.nameswitch = true;
  }
  selectallday(id: any) {
    this.checkedLists = [];
    this.checkedList = [];
    this.status = !this.status;

    if (this.status == true) {
      this.options.forEach((valoption: any) => {
        valoption.checked = true;
        this.checkedLists.push(valoption);
        this.checkedList.push(valoption.value);
      });
      this.viewrecords.forEach((val: any) => {
        val.ischeckedvalue = true;
      });
    } else {
      this.options.forEach((valoption: any) => {
        valoption.checked = false;
        this.checkedLists = [];
        this.checkedList = [];
      });
      this.viewrecords.forEach((val: any) => {
        val.ischeckedvalue = false;
      });
    }
    this.vcheckedvalues(id);

  }
  toggle() {
    this.status = !this.status
  }
  canbtn(id: any) {
    this.checkedvaluess(id);
    this.options.forEach((val3: any) => {
      val3.checked = false;
    });
    this.checkedList = [];
    this.checkedLists = [];
    this.workimports.forEach((val2: any) => {
      if (val2.id == id) {
        var week = val2.workingDays;
        var weeksplit = week.split(',');
        for (var a in weeksplit) {
          this.options.forEach((val: any) => {
            if (val.value == weeksplit[a]) {
              val.checked = true;
              this.checkedLists.push(val);
              this.checkedList.push(val.value);
            }
          });
        }
      }
    });
    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });

    } else {
      this.status = false;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
   
    }
    this.autonamingdays(id)
  }
  vcanbtn(id: any) {
    this.vcheckedvaluess(id);
    this.activeon = false;
    this.options.forEach((val3: any) => {
      val3.checked = false;
    });
    this.viewweekactive = false;
    this.checkedList = [];
    this.checkedLists = [];
    this.viewrecords.forEach((val2: any) => {
      if (val2.id == id) {
        var week = val2.workingDays;
        var weeksplit = week.split(',');
        for (var a in weeksplit) {
          this.options.forEach((val: any) => {
            if (val.value == weeksplit[a]) {
              val.checked = true;
              this.checkedLists.push(val);
              this.checkedList.push(val.value);
            }
          });
        }
      }
    });
    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });

    } else {
      this.status = false;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });

    }
  }
  checkedevent(option: any, event: any, id: any, optionid: any) {
    this.options.forEach((val: any) => {
      if (val.id == optionid) {
        if (val.checked == false) {
          val.checked = true;
          this.options.forEach((optionvalue: any) => {
            if (optionvalue.value == option) {
              this.checkedLists.push(optionvalue);
            }
          });
          this.checkedvalues(id);
          let a = this.checkedLists.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
          this.checkedList = [];
          this.checkedLists.forEach((val: any) => {
            this.checkedList.push(val.value);
          });
        } else {
          val.checked = false;
          for (var i = 0; i < this.options.length; i++) {
            if (this.checkedList[i] == option) {
              this.checkedList.splice(i, 1);
            }

          }

          this.checkedLists = [];
          this.checkedList.forEach((val3: any) => {
            this.options.forEach((optionvalue: any) => {
              if (optionvalue.value == val3) {
                this.checkedLists.push(optionvalue);
              }
            });
          });
          this.checkedvalues(id);
        }
      }
    });

    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });

    } else {
      this.status = false;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
   
    }
    this.autonamingdays(id);
  }
  vcheckedevent(option: any, event: any, id: any, optionid: any) {
 
    this.options.forEach((val: any) => {
      if (val.id == optionid) {
    
        if (val.checked == false) {
          val.checked = true;
          this.options.forEach((optionvalue: any) => {
            if (optionvalue.value == option) {
              this.checkedLists.push(optionvalue);
            }
          });
          this.vcheckedvalues(id);
          let a = this.checkedLists.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
          this.checkedList = [];
          this.checkedLists.forEach((valoption: any) => {
            this.checkedList.push(valoption.value);
          });
   
        } else {
          val.checked = false;
          for (var i = 0; i < this.options.length; i++) {
            if (this.checkedList[i] == option) {
              this.checkedList.splice(i, 1);
            }

          }

          this.checkedLists = [];
          this.checkedList.forEach((val3: any) => {
            this.options.forEach((optionvalue: any) => {
              if (optionvalue.value == val3) {
                this.checkedLists.push(optionvalue);
              }
            });
          });
          this.vcheckedvalues(id);
         
        }
      }
    });


    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.viewrecords.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
    } else {
      this.status = false;
      this.viewrecords.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
    }

  }

  onCheckboxChange(option: any, event: any, id: any) {

    if (event.target.checked) {
      this.options.forEach((optionvalue: any) => {
        if (optionvalue.value == option) {
          this.checkedLists.push(optionvalue);
        }
      });
      this.checkedvalues(id);
      let a = this.checkedLists.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      this.checkedList = [];
      this.checkedLists.forEach((val: any) => {
        this.checkedList.push(val.value);
      });

    } else {
      for (var i = 0; i < this.options.length; i++) {
        if (this.checkedList[i] == option) {
          this.checkedList.splice(i, 1);
        }

      }

      this.checkedLists = [];
      this.checkedList.forEach((val3: any) => {
        this.options.forEach((optionvalue: any) => {
          if (optionvalue.value == val3) {
            this.checkedLists.push(optionvalue);
          }
        });
      });
      this.checkedvalues(id);
    }

    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
  
    } else {
      this.status = false;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });

    }
    this.autonamingdays(id);
  }




  vonCheckboxChange(option: any, event: any, id: any) {

    if (event.target.checked) {
      this.options.forEach((optionvalue: any) => {
        if (optionvalue.value == option) {
          this.checkedLists.push(optionvalue);
        }
      });
      this.vcheckedvalues(id);
      let a = this.checkedLists.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      this.checkedList = [];
      this.checkedLists.forEach((val: any) => {
        this.checkedList.push(val.value);
      });

    } else {
      for (var i = 0; i < this.options.length; i++) {
        if (this.checkedList[i] == option) {
          this.checkedList.splice(i, 1);
        }

      }

      this.checkedLists = [];
      this.checkedList.forEach((val3: any) => {
        this.options.forEach((optionvalue: any) => {
          if (optionvalue.value == val3) {
            this.checkedLists.push(optionvalue);
          }
        });
      });
      this.vcheckedvalues(id);
    }

    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.viewrecords.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
  
    } else {
      this.status = false;
      this.viewrecords.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });

    }


  }
  checkvalue() {
    return this.checkedList;
  }

  checkvaluenumber() {
    this.check = this.checkedList.length
    return this.check
  }
  setTurtle(index: any) {
    this.workimports.selectedTurtle = this.workimports.turtles[index];
  }
  checkedvalues(id: any) {
    this.close1 = true;
    this.close2 = false;
    this.workweekactive = true;
    this.activeon = true;
    this.close5 = true;
    document.getElementById('clobtn' + id)?.classList.add('hide');
    document.getElementById('canbtn' + id)?.classList.remove('hide');
    document.getElementById('appbtns' + id)?.classList.add('hide');
    document.getElementById('appbtn' + id)?.classList.remove('hide');
  }
  vcheckedvalues(id: any) {
    this.viewweekactive = true;
    this.close1 = true;
    this.close2 = false;
    document.getElementById('vclobtn' + id)?.classList.add('hide');
    document.getElementById('vcanbtn' + id)?.classList.remove('hide');
    document.getElementById('vappbtns' + id)?.classList.add('hide');
    document.getElementById('vappbtn' + id)?.classList.remove('hide');
  }
  checkedvaluess(id: any) {
    this.activeon = false;
    this.workweekactive = false;
    this.movingup9 = false;
    this.close5 = false;
    this.close1 = false;
    this.close2 = true;
    document.getElementById('clobtn' + id)?.classList.remove('hide');
    document.getElementById('canbtn' + id)?.classList.add('hide');
    document.getElementById('appbtns' + id)?.classList.remove('hide');
    document.getElementById('appbtn' + id)?.classList.add('hide');
  }
  closecheckboxdrop() {
    if (this.close5 == true) {
      this.canbtn(this.weeknumber);

    }
  }
  vcheckedvaluess(id: any) {
    this.close1 = false;
    this.close2 = true;
    document.getElementById('vclobtn' + id)?.classList.remove('hide');
    document.getElementById('vcanbtn' + id)?.classList.add('hide');
    document.getElementById('vappbtns' + id)?.classList.remove('hide');
    document.getElementById('vappbtn' + id)?.classList.add('hide');
  }


  openDetails(work: any) {
    this.editpopup = true;
    this.tabnumber = 0;
    this.viewrecords = [];


    document.getElementById('workname')?.setAttribute('value', work.workScheduleName);
    document.getElementById('workdays')?.setAttribute('value', work.days);
    document.getElementById('worknoofdays')?.setAttribute('value', work.daynumber);
    document.getElementById('workweek')?.setAttribute('value', work.dayvalue);
    document.getElementById('worktime')?.setAttribute('value', work.time);
    document.getElementById('workhours')?.setAttribute('value', work.hour);


    this.viewrecords.push(work);


  }
  viewall() {
    this.editpopup = true;
    this.tabnumber = 0;
    this.viewrecords = [];
    this.workimports.forEach((val: any) => {
      if (val.sequence == 1) {
        this.viewrecords.push(val)
      }
    });
  }
  selectChangeHandler(event: any) {
    this.checkedList = event.target.value;
  }
  count() {
    this.checkedList;
    document.getElementById("count")?.setAttribute('value', this.checkedList.length);

  }

  deleteItems() {
    this.checkedList = [];

    for (let i = 0; i < this.workimports.length; i++) {
      if (this.workimports[i].itemChecked == true) {
        this.checkedList.push(this.workimports[i])
      }
    }

  }

  // confirmDelete() {
  //   this.checkedList.forEach((checkedItem: any) => {

  //     this.library.delete().subscribe((val) => {

  //     });
  //   })
  // }

  updatework(id: any, workname: any) {
    this.activeon = false;
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.name = workname;
        val.vname = workname;
        val.tname = workname;
        val.workScheduleName = workname;
      }
    });

    let updateCon = {
      "id": id,
      "workScheduleName": workname,
    };
    this.library.update(updateCon).subscribe((val) => {

      //this.workimports=val;
    });
  }

  selectItem(workItem: any) {

  }
  editopfun() {
    this.editpopup = false;
  }
  selectall(worksItem: any) {
    this.checkedList = [];
    for (let i = 0; i < this.workimports.length; i++)
      this.workimports[i].isallchecked = true;
    if (this.workimports.isallchecked == true) {
      for (let i = 0; i < this.workimports.length; i++) {
        this.workimports[i].itemChecked = true;
      }

    } else {
      for (let i = 0; i < this.workimports.length; i++) {
        this.workimports[i].itemChecked = false;
        this.workimports[i].isallchecked = false;
      }
 
    }
  }

  unselectall(worksItem: any) {
    this.checkedList = [];
    for (let i = 0; i < this.workimports.length; i++) {
      this.workimports[i].itemChecked = false;
    } this.workimports.isallchecked = false;

    document.getElementById('unselecttext')?.classList.add('hide');
    document.getElementById('checkboxunselect')?.classList.add('hide');
  }

  editbutton() {
    document.getElementById('checkboxunselect')?.classList.remove('hide');
    document.getElementById('unselecttext')?.classList.remove('hide');
  }
  updateworkenter(event: any, id: any, workname: any) {
    this.activeon = false;
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.name = workname;
        val.vname = workname;
        val.tname = workname;
        val.workScheduleName = workname;
      }
    });
    if (event.keyCode === 13) {
    
      let updateCon = {
        "id": id,
        "workScheduleName": workname,
      };
      this.library.update(updateCon).subscribe((val) => {

        this.done(id);
      });
    }

  }

  opencreate() {
    document.getElementById('createmodal')?.click();
  }

  edit(id: any) {
    this.close1 = false;
    this.close2 = true;
    if (this.activeon == false) {
      this.namenumber = id;
      document.getElementById('workele' + id)?.classList.remove('hideupdatedata');
      document.getElementById('workele' + id)?.classList.add('updatedata');
      document.getElementById('workeletext' + id)?.classList.remove('update');
      document.getElementById('workeletext' + id)?.classList.add('hideupdate');
      document.getElementById('button' + id)?.classList.remove('edit3');
      document.getElementById('button' + id)?.classList.add('hideedit');
      document.getElementById('checked' + id)?.classList.remove('hidecheck');
      document.getElementById('checked' + id)?.classList.add('check2');
      this.nameactiveclose(id);
    } else {

    }

  }

  done(id: any) {

    document.getElementById('workele' + id)?.classList.remove('updatedata');
    document.getElementById('workele' + id)?.classList.add('hideupdatedata');
    document.getElementById('workeletext' + id)?.classList.remove('hideupdate');
    document.getElementById('workeletext' + id)?.classList.add('update');
    document.getElementById('button' + id)?.classList.remove('hideedit');
    document.getElementById('button' + id)?.classList.add('edit3');
    document.getElementById('checked' + id)?.classList.remove('check2');
    document.getElementById('checked' + id)?.classList.add('hidecheck');

  }



  updatework2(id: any) {
    this.activeon = false;
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.days = this.checkedList.toString();
        val.vdays = this.checkedList.toString();
        val.workingDays = this.checkedList.toString();
        val.daynumber = this.check;
        val.vdaynumber = this.check;
        val.numberOfDays = this.check;
        val.workScheduleName = this.naming;
        val.name = this.naming;
        val.vname = this.naming;
        val.tname = this.naming;
      }
    });
 
    let updateCon = {
      "id": id,
      "workingDays": this.checkedList.toString(),
      "numberOfDays": this.check,
      "workScheduleName": this.naming,
    };
    this.library.update(updateCon).subscribe((val) => {

      //this.workimports=val;
      // window.location.reload();
    });
    this.autowidth();
    this.closeall();
  }
  activeworkweek(workweek: any, id: any) {
    this.options.forEach((val: any) => {
      val.checked = false;
    });
    this.checkedList = [];
    this.checkedLists = [];
    var week = workweek;
    var weeksplit = week.split(',');
    for (var a in weeksplit) {
      this.options.forEach((val: any) => {
        if (val.value == weeksplit[a]) {
          val.checked = true;
          this.checkedLists.push(val);
          this.checkedList.push(val.value);
        }
      });
    }


    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
   
    } else {
      this.status = false;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
      
    }
  }

  vactiveworkweek(vworkdays: any, id: any) {
    this.options.forEach((val: any) => {
      val.checked = false;
    });
    this.checkedList = [];
    this.checkedLists = [];
    var week = vworkdays;
    var weeksplit = week.split(',');
    for (var a in weeksplit) {
      this.options.forEach((val: any) => {
        if (val.value == weeksplit[a]) {
          val.checked = true;
          this.checkedLists.push(val);
          this.checkedList.push(val.value);
        }
      });
    }

    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });

    } else {
      this.status = false;
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });

    }
  }


  edit2(id: any, workweek: any) {
    this.close1 = false;
    this.close2 = true;
    this.weeknumber = id;
    if (this.activeon == false) {
      this.daysnumber = 0;
      this.movingup2 = false;
      this.movingup6 = true;
      this.weekactiveclose(id);
      document.getElementById('workdayeletext' + id)?.classList.add('update');
      document.getElementById('workdayele' + id)?.classList.remove('hidelist1');
      document.getElementById('workdayele' + id)?.classList.add('list1');
      document.getElementById('buttonday' + id)?.classList.remove('edit');
      document.getElementById('buttonday' + id)?.classList.add('hideedit');
      document.getElementById('checkday' + id)?.classList.remove('hidecheck');
      document.getElementById('checkday' + id)?.classList.add('check');
      this.activeworkweek(workweek, id);
    } else {

    }

  }

  done2(id: any) {
    this.close4 = false;
    this.activeon = false;
    this.workdaysswitching = false;
    document.getElementById('workdayeletext' + id)?.classList.add('update');
    document.getElementById('workdayele' + id)?.classList.add('hidelist1');
    document.getElementById('workdayele' + id)?.classList.remove('list1');
    document.getElementById('buttonday' + id)?.classList.remove('hideedit');
    document.getElementById('buttonday' + id)?.classList.add('edit');
    document.getElementById('checkday' + id)?.classList.remove('check');
    document.getElementById('checkday' + id)?.classList.add('hidecheck');
    this.options.forEach((val: any) => {
      val.checked = false;
    });
    this.checkedList = [];
    this.checkedLists = [];
    this.status = false;
    this.checkedvaluess(id);
  }

  updatework3(id: any, workweek: any) {
    this.activeon = false;
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.dayWeekStarts = workweek;
        val.dayvalue = workweek;
        val.vdayvalue = workweek;
      }
    });

    let updateCon = {
      "id": id,
      "dayWeekStarts": workweek,
    };
    this.library.update(updateCon).subscribe((val) => {
  
      //this.workimports=val;
    });
    this.closeall();
  }
  selectdayvalue(id: any) {

    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        this.days.forEach((val2: any) => {
          if (val.dayWeekStarts == val2.day) {

            this.number = val2.idday;

          }
        });
      }

    });

  }
  selectdaysvalue() {
    document.getElementById('workingday' + this.number)?.classList.add('active');
  }
  edit3(id: any, workday: any) {
    this.close1 = false;
    this.close2 = true;
    this.movingup = true;
    this.movingup2 = false;
    this.movingup1 = false;
    this.movingup4 = false;
    this.movingup5 = false;
    this.movingup6 = false;
    this.daynumber = id;
    if (this.activeon == false) {
      document.getElementById('days' + id)?.classList.remove('hidelist1');
      document.getElementById('days' + id)?.classList.add('list6');
      // document.getElementById('workdayseletext' + id)?.classList.add('hideupdate');
      // document.getElementById('workdayseletext' + id)?.classList.remove('update');
      document.getElementById('buttondays' + id)?.classList.remove('edit');
      document.getElementById('buttondays' + id)?.classList.add('hideedit');
      document.getElementById('checkdays' + id)?.classList.remove('hidecheck');
      document.getElementById('checkdays' + id)?.classList.add('check');
      this.days.forEach((val2: any) => {
        if (val2.day == workday) {
          document.getElementById('mworkingday' + id + val2.idday)?.classList.add('active');
          this.moveupwards = val2.idday;
        }
      });
      this.dayactiveclose(id);
    } else {

    }

    this.days.forEach((val: any) => {
      if (workday == val.day) {
        this.moveupwards = val.idday;
      }

    });

  }

  done3(id: any) {

    document.getElementById('days' + id)?.classList.add('hidelist1');
    document.getElementById('days' + id)?.classList.remove('list6');
    // document.getElementById('workdayseletext' + id)?.classList.remove('hideupdate');
    // document.getElementById('workdayseletext' + id)?.classList.add('update');
    document.getElementById('buttondays' + id)?.classList.remove('hideedit');
    document.getElementById('buttondays' + id)?.classList.add('edit');
    document.getElementById('checkdays' + id)?.classList.remove('check');
    document.getElementById('checkdays' + id)?.classList.add('hidecheck');
    this.days.forEach((val2: any) => {
      document.getElementById('mworkingday' + id + val2.idday)?.classList.remove('active');
      document.getElementById('mworkingday' + id + val2.idday)?.classList.remove('active1');
      document.getElementById('hoverday' + id + val2.idday)?.classList.remove('hoverday');
    });
  }

  edit10(id: any, workday: any) {
    if (this.activeon == false) {

      this.close1 = false;
      this.close2 = true;
      this.lunchnumber = id;
      this.viewmoving5up = true;
      document.getElementById('lunchs' + id)?.classList.remove('hidelist1');
      document.getElementById('lunchs' + id)?.classList.add('list6');
      // document.getElementById('workdayseletext' + id)?.classList.add('hideupdate');
      // document.getElementById('workdayseletext' + id)?.classList.remove('update');
      document.getElementById('editlunch' + id)?.classList.remove('edit');
      document.getElementById('editlunch' + id)?.classList.add('hideedit');
      document.getElementById('checklunch' + id)?.classList.remove('hidecheck');
      document.getElementById('checklunch' + id)?.classList.add('check');
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          if (val.lunch == 'N/A') {
            document.getElementById('nalunch' + id)?.classList.add('active');
            this.viewlunchnumber = 0;
          } else {
            this.lunchevalues.forEach((val2: any) => {
              if (val2.selectedValue == workday) {
                this.viewlunchnumber = val2.sequence;
                document.getElementById('mworkinglunch' + id + val2.id)?.classList.add('active');

              }
            });
          }
        }
      });
      this.lunchactiveclose(id);
    } else {

    }

  }

  done10(id: any) {
    document.getElementById('addnewlunch' + id)?.classList.add('hidetime');
    document.getElementById('lunchs' + id)?.classList.add('hidelist1');
    document.getElementById('lunchs' + id)?.classList.remove('list6');
    // document.getElementById('workdayseletext' + id)?.classList.remove('hideupdate');
    // document.getElementById('workdayseletext' + id)?.classList.add('update');
    document.getElementById('editlunch' + id)?.classList.remove('hideedit');
    document.getElementById('editlunch' + id)?.classList.add('edit');
    document.getElementById('checklunch' + id)?.classList.remove('check');
    document.getElementById('checklunch' + id)?.classList.add('hidecheck');
    document.getElementById('nalunch' + id)?.classList.remove('active');
    this.lunchevalues.forEach((val2: any) => {
      document.getElementById('mworkinglunch' + id + val2.id)?.classList.remove('active');
      document.getElementById('mworkinglunch' + id + val2.id)?.classList.remove('active1');
      document.getElementById('hoverlunch' + id + val2.id)?.classList.remove('hoverday');
    });
  }
  updatework10(id: any, worklunch: any) {
    this.activeon = false;
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.lunch = worklunch;
        val.vlunch = worklunch;
        val.hoursWorking = val.hour + ',' + val.lunch;
 
        let updateCon = {
          "id": id,
          "hoursWorking": val.hour + ',' + val.lunch,
        };
        this.library.update(updateCon).subscribe((val) => {
  
          //this.workimports=val;
        });
      }
    });
    this.autonaminghour(id);
    this.closeall();
  }
  updatework11(id: any) {
    this.activeon = false;
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.lunch = 'N/A';
        val.vlunch = 'N/A';
        val.hoursWorking = val.hour + ',' + 'N/A';
     
        let updateCon = {
          "id": id,
          "hoursWorking": val.hour + ',' + 'N/A',
        };
        this.library.update(updateCon).subscribe((val) => {

          //this.workimports=val;
        });
      }
    });
    this.autonaminghour(id);
    this.closeall();
  }
  updatework4(id: any, worktime: any) {
    this.activeon = false;
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.time = worktime;
        val.vtime = worktime;
        val.timeDayStarts = worktime;
      }
    });
    //console.log("id",id,workname)
    let updateCon = {
      "id": id,
      "timeDayStarts": worktime,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.workimports=val;
    });
    this.closeall();
    this.autonamingtime(id, worktime)
  }

  edittime(id: any) {
    this.activeon = true;
    this.close1 = true;
    this.close2 = false;
    this.movingup1 = false;
    this.movingup = false;
    this.movingup2 = false;
    this.close3 = true;
    this.movingup4 = false;
    this.movingup5 = false;
    this.movingup6 = false;
    this.movingup7 = true;
    this.movingup7a = false;
    this.clocktext = '';
    this.hoursvalue2 = '';
    this.hoursvalue3 = '';
    this.hoursvalue1 = '';
    this.hoursvalue4 = '';
    this.hoursvalue5 = '';
    this.hoursvalue6 = '';
    this.hoursvalue7 = '';
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.clocktext = '';
        val.clockhour = '';
        val.clockmin = '';
      }
    });
    document.getElementById('hours' + id)?.classList.remove('hidetime');
    document.getElementById('hours' + id)?.classList.add('timehour');
    document.getElementById('row1time' + id)?.focus();
  }
  editlunch(id: any) {
    this.clocktext = '';
    this.hoursvalue2 = '';
    this.hoursvalue3 = '';
    this.hoursvalue1 = '';
    this.hoursvalue4 = '';
    this.hoursvalue5 = '';
    this.activeon = true;
    this.close1 = true;
    this.close2 = false;
    this.viewlunch2switch = true;
    document.getElementById('addnewlunch' + id)?.classList.remove('hidetime');
    document.getElementById('addnewlunch' + id)?.classList.add('timehour');
    document.getElementById('row1lunch' + id)?.focus();
  }
  closeeditlunch() {
    this.close1 = false;
    this.close2 = true;
    this.activeon = false;
    this.viewlunch2switch = false;
    this.workimports.forEach((val: any) => {
      document.getElementById('addnewlunch' + val.id)?.classList.add('hidetime');
      document.getElementById('addnewlunch' + val.id)?.classList.remove('timehour');
    });
  }
  closeedittime() {
    this.movingup1 = true;
    if (this.close3 == true) {
      this.close3 = false;
      this.activeon = false;
      this.movingup = false;
      this.movingup2 = false;
      this.movingup4 = false;
      this.movingup5 = false;
      this.movingup6 = false;
      this.movingup7 = false;
      this.movingup7a = false;
      this.close2 = true;
      this.close1 = false;
      this.clocktext = '';
      this.hoursvalue2 = '';
      this.hoursvalue3 = '';
      this.hoursvalue1 = '';
      this.hoursvalue4 = '';
      this.hoursvalue5 = '';
      this.hoursvalue6 = '';
      this.hoursvalue7 = '';
      this.movingup1 = true;
      this.workimports.forEach((val: any) => {
        document.getElementById('hours' + val.id)?.classList.add('hidetime');
        document.getElementById('hours' + val.id)?.classList.remove('timehour');
      });
    }

  }
  edit4(id: any, worktime: any) {
    this.close1 = false;
    this.close2 = true;
    this.movingup1 = true;
    this.movingup = false;
    this.movingup2 = false;
    this.movingup4 = false;
    this.movingup5 = false;
    this.movingup6 = false;
    this.timenumber = id;
    if (this.activeon == false) {
      document.getElementById('daystime' + id)?.classList.remove('hidelist1');
      document.getElementById('daystime' + id)?.classList.add('list6');
      // document.getElementById('workdayseletexttime' + id)?.classList.add('hideupdate');
      // document.getElementById('workdayseletexttime' + id)?.classList.remove('update');
      document.getElementById('buttondaystime' + id)?.classList.remove('edit');
      document.getElementById('buttondaystime' + id)?.classList.add('hideedit');
      document.getElementById('checkdaystime' + id)?.classList.remove('hidecheck');
      document.getElementById('checkdaystime' + id)?.classList.add('check');
      document.getElementById('addnewtime' + id)?.classList.remove('hoverday');
      this.timevalues.forEach((val2: any) => {
        if (val2.selectedValue == worktime) {
          document.getElementById('mworkingtime' + id + val2.id)?.classList.add('active');
          this.movedownwards = val2.sequence;
        }
      });
      this.timeactiveclose(id);
    } else {
    }

  }

  done4(id: any) {
    this.close3 = false;
    this.movingup8 = false;
    this.movingup4 = false;
    document.getElementById('daystime' + id)?.classList.add('hidelist1');
    document.getElementById('daystime' + id)?.classList.remove('list6');
    document.getElementById('hours' + id)?.classList.add('hidetime');
    document.getElementById('buttondaystime' + id)?.classList.remove('hideedit');
    document.getElementById('buttondaystime' + id)?.classList.add('edit');
    document.getElementById('checkdaystime' + id)?.classList.remove('check');
    document.getElementById('checkdaystime' + id)?.classList.add('hidecheck');
    this.timevalues.forEach((val2: any) => {
      document.getElementById('mworkingtime' + id + val2.id)?.classList.remove('active');
      document.getElementById('mworkingtime' + id + val2.id)?.classList.remove('active1');
      document.getElementById('hovertime' + id + val2.id)?.classList.remove('hoverday');
    });
  }

  updatework5(id: any, workhours: any) {
    this.activeon = false;
    var lunchtime = '';
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.hour = workhours;
        val.vhour = workhours;
        val.hoursWorking = workhours;
        lunchtime = val.lunch;
        if (val.hoursWorking == '1 Hour') {
          val.hournumber = 1;
        } else if (val.hoursWorking == '2 Hours') {
          val.hournumber = 2;
        } else if (val.hoursWorking == '3 Hours') {
          val.hournumber = 3;
        } else if (val.hoursWorking == '4 Hours') {
          val.hournumber = 4;
        } else if (val.hoursWorking == '5 Hours') {
          val.hournumber = 5;
        } else if (val.hoursWorking == '6 Hours') {
          val.hournumber = 6;
        } else if (val.hoursWorking == '7 Hours') {
          val.hournumber = 7;
        } else if (val.hoursWorking == '8 Hours') {
          val.hournumber = 8;
        } else if (val.hoursWorking == '9 Hours') {
          val.hournumber = 9;
        } else if (val.hoursWorking == '10 Hours') {
          val.hournumber = 10;
        } else if (val.hoursWorking == '11 Hours') {
          val.hournumber = 11;
        } else if (val.hoursWorking == '12 Hours') {
          val.hournumber = 12;
        } else if (val.hoursWorking == '13 Hours') {
          val.hournumber = 13;
        } else if (val.hoursWorking == '14 Hours') {
          val.hournumber = 14;
        } else if (val.hoursWorking == '15 Hours') {
          val.hournumber = 15;
        } else if (val.hoursWorking == '16 Hours') {
          val.hournumber = 16;
        } else if (val.hoursWorking == '17 Hours') {
          val.hournumber = 17;
        } else if (val.hoursWorking == '18 Hours') {
          val.hournumber = 18;
        } else if (val.hoursWorking == '19 Hours') {
          val.hournumber = 19;
        } else if (val.hoursWorking == '20 Hours') {
          val.hournumber = 20;
        } else if (val.hoursWorking == '21 Hours') {
          val.hournumber = 21;
        } else if (val.hoursWorking == '22 Hours') {
          val.hournumber = 22;
        } else if (val.hoursWorking == '23 Hours') {
          val.hournumber = 23;
        } else if (val.hoursWorking == '24 Hours') {
          val.hournumber = 24;
        }
      }
    });
    //console.log("id",id,workname)
    let updateCon = {
      "id": id,
      "hoursWorking": workhours + ',' + lunchtime,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated", this.workimports);
      //this.workimports=val;
    });
    this.autonaminghour(id);

  }

  edithours(id: any) {
    this.activeon = true;
    this.close1 = true;
    this.close2 = false;
    this.movingup1 = false;
    this.movingup = false;
    this.movingup2 = false;
    this.movingup4 = false;
    this.movingup6 = false;
    this.hournumberings = 0;
    this.hourssnumber = [];
    this.hourssnumbera = [];
    this.hourssnumberb = [];
    for (let i = 1; i <= 24; i++) {
      this.hourvalues.forEach((val: any) => {
        if (val.hournumber == i) {
          this.hourssnumbera.push(i);
        }
      });
    }
    for (let i = 1; i <= 24; i++) {
      this.hourssnumberb.push(i);
    }

    this.hourssnumber = this.hourssnumberb.filter((x: any) => !this.hourssnumbera.includes(x))
    console.log('ready list a', this.hourssnumbera)
    console.log('ready list b', this.hourssnumberb)
    console.log('ready list', this.hourssnumber)
    this.close4 = true;
    this.activeon = true;
    this.movingup3 = true;
    this.movingup2 = false;
    this.hournumber = id;
    document.getElementById('dayhours' + id)?.classList.remove('hidetime');
    document.getElementById('dayhours' + id)?.classList.add('timehours');
    document.getElementById('row1hour' + id)?.focus();
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.hoursnumber = this.hourssnumber[0];
      }
    });
  }
  closeedithours() {
    this.movingup2 = true;
    if (this.close4 == true) {
      this.close4 = false;
      this.close2 = true;
      this.close1 = false;
      this.movingup = false;
      this.movingup1 = false;
      this.movingup4 = false;
      this.movingup5 = false;
      this.movingup6 = false;
      this.activeon = false;
      this.movingup3 = false;

      this.workimports.forEach((val: any) => {
        document.getElementById('dayhours' + val.id)?.classList.add('hidetime');
        document.getElementById('dayhours' + val.id)?.classList.remove('timehours');
      });
    }

  }
  edit5(id: any, workhour: any) {
    this.close1 = false;
    this.close2 = true;
    this.movingup2 = true;
    this.movingup = false;
    this.movingup1 = false;
    this.movingup4 = false;
    this.movingup5 = false;
    this.movingup6 = false;
    this.hournumber = id;
    if (this.activeon == false) {
      document.getElementById('hourdaystime' + id)?.classList.remove('hidelist1');
      document.getElementById('hourdaystime' + id)?.classList.add('list6');
      document.getElementById('hourbuttondaystime' + id)?.classList.remove('edit');
      document.getElementById('hourbuttondaystime' + id)?.classList.add('hideedit');
      document.getElementById('hourcheckdaystime' + id)?.classList.remove('hidecheck');
      document.getElementById('hourcheckdaystime' + id)?.classList.add('check');
      document.getElementById('addnewhour' + id)?.classList.remove('hoverday');
      this.hourvalues.forEach((val2: any) => {
        if (val2.selectedValue == workhour) {
          document.getElementById('mworkinghour' + id + val2.id)?.classList.add('active');

        }
      });
      this.houractiveclose(id);
    } else {

    }
    this.hourvalues.forEach((val: any) => {
      if (workhour == val.selectedValue) {
        this.movedownwardss = val.sequence;
      }

    });
    console.log(this.movedownwardss);
  }

  done5(id: any) {
    this.close4 = false;
    this.movingup5 = false;
    document.getElementById('hourdaystime' + id)?.classList.add('hidelist1');
    document.getElementById('hourdaystime' + id)?.classList.remove('list6');
    document.getElementById('dayhours' + id)?.classList.add('hidetime');
    document.getElementById('hourbuttondaystime' + id)?.classList.remove('hideedit');
    document.getElementById('hourbuttondaystime' + id)?.classList.add('edit');
    document.getElementById('hourcheckdaystime' + id)?.classList.remove('check');
    document.getElementById('hourcheckdaystime' + id)?.classList.add('hidecheck');
    this.hourvalues.forEach((val2: any) => {
      document.getElementById('mworkinghour' + id + val2.id)?.classList.remove('active');
      document.getElementById('mworkinghour' + id + val2.id)?.classList.remove('active1');
      document.getElementById('hoverhour' + id + val2.id)?.classList.remove('hoverday');
    });
  }

  completeimport(id: any) {
    document.getElementById('btn1')?.classList.remove('vimport');
    document.getElementById('btn1')?.classList.add('hidebtn');
    document.getElementById('btn2')?.classList.remove('cimport');
    document.getElementById('btn2')?.classList.add('hidebtn');
    document.getElementById('t1')?.classList.add('hide');
    document.getElementById('checkboxselect')?.classList.remove('hide');
    document.getElementById('editbutton')?.classList.remove('hide');
    document.getElementById('deletebutton')?.classList.remove('hide');
    document.getElementById('selecttext')?.classList.remove('hide');
    for (let id = 2; id < 5; id++) {
      document.getElementById('t' + id)?.classList.add('hide');
      document.getElementById('isChecked' + id)?.classList.remove('hidecheckbox');
      document.getElementById('isChecked' + id)?.classList.add('checkbox');
      document.getElementById('button' + id)?.classList.remove('edit');
      document.getElementById('button' + id)?.classList.add('hideedit');
      document.getElementById('buttonday' + id)?.classList.remove('edit');
      document.getElementById('buttonday' + id)?.classList.add('hideedit');
      document.getElementById('buttondays' + id)?.classList.remove('edit');
      document.getElementById('buttondays' + id)?.classList.add('hideedit');
      document.getElementById('buttondaystime' + id)?.classList.remove('edit');
      document.getElementById('buttondaystime' + id)?.classList.add('hideedit');
      document.getElementById('hourbuttondaystime' + id)?.classList.remove('edit');
      document.getElementById('hourbuttondaystime' + id)?.classList.add('hideedit');
    }

  }

  editsingle() {
    if (this.workimports.itemChecked == true) {
      document.getElementById('t')?.classList.remove('hide');
      document.getElementById('isChecked')?.classList.add('hidecheckbox');
      document.getElementById('isChecked')?.classList.remove('checkbox');
      document.getElementById('button')?.classList.add('edit');
      document.getElementById('button')?.classList.remove('hideedit');
      document.getElementById('buttonday')?.classList.add('edit');
      document.getElementById('buttonday')?.classList.remove('hideedit');
      document.getElementById('buttondays')?.classList.add('edit');
      document.getElementById('buttondays')?.classList.remove('hideedit');
      document.getElementById('buttondaystime')?.classList.add('edit');
      document.getElementById('buttondaystime')?.classList.remove('hideedit');
      document.getElementById('hourbuttondaystime')?.classList.add('edit');
      document.getElementById('hourbuttondaystime')?.classList.remove('hideedit');
    }
  }


  edit6(id: any, workname: any, vworkdays: any) {
    if (this.activeon == false) {
      this.close1 = false;
      this.close2 = true;
      document.getElementById('vedit' + id)?.classList.remove('edit4');
      document.getElementById('vedit' + id)?.classList.add('hideedit1');
      document.getElementById('vcheck' + id)?.classList.remove('hidecheck1');
      document.getElementById('vcheck' + id)?.classList.add('check1');
      document.getElementById('vlist' + id)?.classList.remove('hidelist2');
      document.getElementById('vlist' + id)?.classList.add('list2');
      // this.worknameonactive(workname, id);
      this.vactiveworkweek(vworkdays, id)
      this.done7();
      this.done8();
      this.done9();
      this.done11();
      this.viewmovingup = true;
    }
  }

  done6(id: any) {
    // this.close1 = false;
    // this.close2 = false;
    document.getElementById('vedit' + id)?.classList.add('edit4');
    document.getElementById('vedit' + id)?.classList.remove('hideedit1');
    document.getElementById('vcheck' + id)?.classList.add('hidecheck1');
    document.getElementById('vcheck' + id)?.classList.remove('check1');
    document.getElementById('vlist' + id)?.classList.add('hidelist2');
    document.getElementById('vlist' + id)?.classList.remove('list2');
    document.getElementById('viewweekcheckbox' + id + this.viewdaysnumber)?.classList.remove('subli1checkboxweek');
    document.getElementById('viewweektext' + id + this.viewdaysnumber)?.classList.remove('subli1textdownarrow');
    this.status = false;
    this.viewdayswitch = false;
    this.viewmovingup = false;
    this.viewdaysnumber = 0;
    document.getElementById('vclobtn' + id)?.classList.remove('canbtnhover');
    document.getElementById('selectallviewcheckbox' + id)?.classList.remove('subli1checkboxweek');
    document.getElementById('selectallviewtext' + id)?.classList.remove('subli1textdownarrow');
  }

  edit7(id: any, workname: any, vworkday: any) {
    if (this.activeon == false) {
      this.close1 = false;
      this.close2 = true;
      document.getElementById('edit2')?.classList.remove('edit1');
      document.getElementById('edit2')?.classList.add('hideedit1');
      document.getElementById('check2')?.classList.remove('hidecheck1');
      document.getElementById('check2')?.classList.add('check1');
      document.getElementById('list3')?.classList.remove('hidelist3');
      document.getElementById('list3')?.classList.add('list3');
      // this.worknameonactive(workname, id);
      this.days.forEach((val2: any) => {
        if (val2.day == vworkday) {
          this.viewdaystartnumber = val2.idday;
          document.getElementById('vworkingday' + id + val2.idday)?.classList.add('active');
        } else {
          document.getElementById('vworkingday' + id + val2.idday)?.classList.remove('active');
        }
      });
      this.done6(id);
      this.done8();
      this.done9();
      this.done11();
      this.viewmoving1up = true;
    }
  }

  done7() {
    // this.close1 = false;
    // this.close2 = false;
    document.getElementById('edit2')?.classList.add('edit1');
    document.getElementById('edit2')?.classList.remove('hideedit1');
    document.getElementById('check2')?.classList.add('hidecheck1');
    document.getElementById('check2')?.classList.remove('check1');
    document.getElementById('list3')?.classList.add('hidelist3');
    document.getElementById('list3')?.classList.remove('list3');
    this.viewweekswitch = false;
    this.viewmoving1up = false;

  }

  edit8(id: any, workname: any, vworktime: any) {
    if (this.activeon == false) {
      this.close1 = false;

      this.close2 = true;
      document.getElementById('edit3')?.classList.remove('edit1');
      document.getElementById('edit3')?.classList.add('hideedit1');
      document.getElementById('check3')?.classList.remove('hidecheck1');
      document.getElementById('check3')?.classList.add('check1');
      document.getElementById('list4')?.classList.remove('hidelist4');
      document.getElementById('list4')?.classList.add('list4');
      // this.worknameonactive(workname, id);
      this.timevalues.forEach((val2: any) => {
        if (val2.selectedValue == vworktime) {
          this.viewtimenumber = val2.sequence;
          document.getElementById('vtime' + id + val2.id)?.classList.add('active');

        } else {
          document.getElementById('vtime' + id + val2.id)?.classList.remove('active');

        }
      });
      this.done6(id);
      this.done7();
      this.done9();
      this.done11();
      this.viewmoving2up = true;
    }
  }

  done8() {
    // this.close1 = false;
    // this.close2 = false;
    document.getElementById('edit3')?.classList.add('edit1');
    document.getElementById('edit3')?.classList.remove('hideedit1');
    document.getElementById('check3')?.classList.add('hidecheck1');
    document.getElementById('check3')?.classList.remove('check1');
    document.getElementById('list4')?.classList.add('hidelist4');
    document.getElementById('list4')?.classList.remove('list4');
    this.viewtimeswitch = false;
    this.viewmoving2up = false;
    this.viewtime2switch = false;
  }
  edit9(id: any, workname: any, vworkhour: any) {
    if (this.activeon == false) {
      this.close1 = false;
      this.close2 = true;
      document.getElementById('edit4')?.classList.remove('edit1');
      document.getElementById('edit4')?.classList.add('hideedit1');
      document.getElementById('check4')?.classList.remove('hidecheck1');
      document.getElementById('check4')?.classList.add('check1');
      document.getElementById('list5')?.classList.remove('hidelist5');
      document.getElementById('list5')?.classList.add('list5');
      // this.worknameonactive(workname, id);
      this.hourvalues.forEach((val2: any) => {
        if (val2.selectedValue == vworkhour) {
          this.viewhournumber = val2.sequence;
          document.getElementById('vhour' + id + val2.id)?.classList.add('active');
        } else {
          document.getElementById('vhour' + id + val2.id)?.classList.remove('active');
        }
      });
      this.done6(id);
      this.done8();
      this.done7();
      this.done11();
      this.viewmoving3up = true;
    }
  }

  done9() {
    // this.close1 = false;
    // this.close2 = false;
    document.getElementById('edit4')?.classList.add('edit1');
    document.getElementById('edit4')?.classList.remove('hideedit1');
    document.getElementById('check4')?.classList.add('hidecheck1');
    document.getElementById('check4')?.classList.remove('check1');
    document.getElementById('list5')?.classList.add('hidelist5');
    document.getElementById('list5')?.classList.remove('list5');
    this.viewhourswitch = false;
    this.viewmoving3up = false;
  }
  edit11(id: any, workname: any, vworktime: any) {
    if (this.activeon == false) {
      this.close1 = false;
      this.close2 = true;
      this.viewmoving4up = true;
      document.getElementById('lunchedit')?.classList.remove('edit1');
      document.getElementById('lunchedit')?.classList.add('hideedit1');
      document.getElementById('lunchcheck')?.classList.remove('hidecheck1');
      document.getElementById('lunchcheck')?.classList.add('check1');
      document.getElementById('listlunch')?.classList.remove('hidelist4');
      document.getElementById('listlunch')?.classList.add('list4');
      // this.worknameonactive(workname, id);
      if (vworktime == 'N/A') {
        document.getElementById('naviewlunch')?.classList.add('active');
        this.viewlunchnumber = 0;
      } else {
        this.lunchevalues.forEach((val2: any) => {
          if (val2.selectedValue == vworktime) {
            this.viewlunchnumber = val2.sequence;
            document.getElementById('vlunch' + id + val2.id)?.classList.add('active');

          } else {
            document.getElementById('vlunch' + id + val2.id)?.classList.remove('active');
            document.getElementById('naviewlunch')?.classList.remove('active');
          }
        });
      }
      this.done6(id);
      this.done8();
      this.done9();
      this.done7();
    }
  }

  done11() {
    document.getElementById('lunchedit')?.classList.add('edit1');
    document.getElementById('lunchedit')?.classList.remove('hideedit1');
    document.getElementById('lunchcheck')?.classList.add('hidecheck1');
    document.getElementById('lunchcheck')?.classList.remove('check1');
    document.getElementById('listlunch')?.classList.add('hidelist4');
    document.getElementById('listlunch')?.classList.remove('list4');
    this.viewlunchswitch = false;
    this.viewmoving4up = false;
  }

  viewactive() {
    this.activetab = true;
    this.tab4enter = false;
    this.tab5enter = false;
    this.tab6enter = false;
    this.tab7enter = false;
    this.tab8enter = false;
    this.tab9enter = false;
    this.tab10enter = false;
    this.tabnumber = 1;
    document.getElementById('vprev')?.classList.add('hide');
    document.getElementById('vnext')?.classList.add('hide');
    document.getElementById('vclose')?.classList.add('hide');
    document.getElementById('vcancel')?.classList.remove('hide');
    document.getElementById('vsave')?.classList.add('hide');
    document.getElementById('vsaves')?.classList.remove('hide');
    document.getElementById('vsavennext')?.classList.add('hide');
    document.getElementById('vsavennexts')?.classList.remove('hide');
    document.getElementById('vsavenclose')?.classList.add('hide');
    document.getElementById('vsavencloses')?.classList.remove('hide');
  }

  viewinactive() {
    this.activetab = false;
    this.tab4enter = false;
    this.tab5enter = false;
    this.tab6enter = false;
    this.tab7enter = false;
    this.tab8enter = false;
    this.tab9enter = false;
    this.tab10enter = false;
    this.tabnumber = 0;
    document.getElementById('vprev')?.classList.remove('hide');
    document.getElementById('vnext')?.classList.remove('hide');
    document.getElementById('vclose')?.classList.remove('hide');
    document.getElementById('vcancel')?.classList.add('hide');
    document.getElementById('vsave')?.classList.remove('hide');
    document.getElementById('vsaves')?.classList.add('hide');
    document.getElementById('vsavennext')?.classList.remove('hide');
    document.getElementById('vsavennexts')?.classList.add('hide');
    document.getElementById('vsavenclose')?.classList.remove('hide');
    document.getElementById('vsavencloses')?.classList.add('hide');
    this.viewedithourclose();
    this.vieweditlunchclose();
    this.viewedittimeclose();
  }
  viewcancel() {
    this.viewrecords.forEach((val: any) => {
      if (val.vtime == val.time && val.vlunch == val.lunch && val.vhour == val.hour && val.vdayvalue == val.dayvalue) {
        document.getElementById('vprev')?.classList.remove('hide');
        document.getElementById('vnext')?.classList.remove('hide');
        document.getElementById('vclose')?.classList.remove('hide');
        document.getElementById('vcancel')?.classList.add('hide');
        document.getElementById('vsaves')?.classList.add('hide');
        document.getElementById('vsave')?.classList.remove('hide');
        document.getElementById('vsavennexts')?.classList.add('hide');
        document.getElementById('vsavennext')?.classList.remove('hide');
        document.getElementById('vsavencloses')?.classList.add('hide');
        document.getElementById('vsavenclose')?.classList.remove('hide');
      } else {
        this.vcheckedvaluess(val.id);
      }
    });

  }

  viewonactive() {
    if (this.editableactive == true) {
      this.activetab = true;
      this.tab4enter = false;
      this.tab5enter = false;
      this.tab6enter = false;
      this.tab7enter = false;
      this.tab8enter = false;
      this.tab9enter = false;
      this.tab10enter = false;
      this.tabnumber = 1;
      document.getElementById('vprev')?.classList.add('hide');
      document.getElementById('vnext')?.classList.add('hide');
      document.getElementById('space')?.classList.add('spacenext');
      document.getElementById('vclose')?.classList.add('hide');
      document.getElementById('vcancel')?.classList.remove('hide');
      document.getElementById('vsave')?.classList.add('hide');
      document.getElementById('vsaves')?.classList.remove('hide');
      document.getElementById('vsavennext')?.classList.add('hide');
      document.getElementById('vsavennexts')?.classList.remove('hide');
      document.getElementById('vsavenclose')?.classList.add('hide');
      document.getElementById('vsavencloses')?.classList.remove('hide');
    } else {
      this.activetab = false;
      this.tab4enter = false;
      this.tab5enter = false;
      this.tab6enter = false;
      this.tab7enter = false;
      this.tab8enter = false;
      this.tab9enter = false;
      this.tab10enter = false;
      this.tabnumber = 0;
      document.getElementById('vprev')?.classList.remove('hide');
      document.getElementById('vnext')?.classList.remove('hide');
      document.getElementById('space')?.classList.remove('spacenext');
      document.getElementById('vclose')?.classList.remove('hide');
      document.getElementById('vcancel')?.classList.add('hide');
      document.getElementById('vsave')?.classList.remove('hide');
      document.getElementById('vsaves')?.classList.add('hide');
      document.getElementById('vsavennext')?.classList.remove('hide');
      document.getElementById('vsavennexts')?.classList.add('hide');
      document.getElementById('vsavenclose')?.classList.remove('hide');
      document.getElementById('vsavencloses')?.classList.add('hide');
    }
  }
  viewupdateclose() {
    this.workimports.forEach((val: any) => {
      val.libraryName = val.vname;
      val.workingDays = val.vdays;
      val.numberOfDays = val.vdaynumber;
      val.weekStart = val.vdayvalue;
      val.dayStart = val.vtime;
      val.hoursWorked = val.vhour;
      val.lunchbreaknumber = val.vlunch;
    });
    this.tabnumber = 0;
    this.method.refreshdata();
  }
  vupdate(id: any, vworkname: any, vworkdays: any, vworkdayssss: any, vworkweek: any, vworktime: any, vworkhours: any, vworklunch: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        if (this.checkedList == '') {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;
          val.vlunch = vworklunch;
        } else {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdays = this.checkedList.toString();
          val.vdaynumber = vworkdayssss;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;
          val.vlunch = vworklunch;
        }
        var hourvalue = 0;
        hourvalue = parseInt(vworkhours.split(' ')[0]);
        console.log(vworklunch.split(' ')[1])
        var lunchvalue = 0;
        if (vworklunch.split(' ').length == 2) {
          if (vworklunch.split(' ')[1] == 'Hour') {
            lunchvalue = parseInt(vworklunch.split(' ')[0] + '0' + '0');
          } else if (vworklunch.split(' ')[1] == 'Minute') {
            lunchvalue = parseInt('0' + vworklunch.split(' ')[0]);
          } else if (vworklunch.split(' ')[1] == 'Hours') {
            lunchvalue = parseInt(vworklunch.split(' ')[0] + '0' + '0');
          } else if (vworklunch.split(' ')[1] == 'Minutes') {
            lunchvalue = parseInt(vworklunch.split(' ')[0]);
          }
        } else {
          if (vworklunch.split(' ')[3] == 'Minutes') {
            if (vworklunch.split(' ')[1] == 'Hour') {
              lunchvalue = parseInt(vworklunch.split(' ')[0] + vworklunch.split(' ')[2]);
            } else {
              lunchvalue = parseInt(vworklunch.split(' ')[0] + vworklunch.split(' ')[2]);
            }
          } else if (vworklunch.split(' ')[3] == 'Minute') {
            if (vworklunch.split(' ')[1] == 'Hour') {
              lunchvalue = parseInt(vworklunch.split(' ')[0] + '0' + vworklunch.split(' ')[2]);
            } else {
              lunchvalue = parseInt(vworklunch.split(' ')[0] + '0' + vworklunch.split(' ')[2]);
            }
          }
        }

        let updateCon = {
          "libraryId": id,
          "libraryName": vworkname,
          "workingDays": vworkdays,
          "numberOfDays": vworkdayssss,
          "weekStart": vworkweek,
          "dayStart": vworktime,
          "hoursWorked": hourvalue,
          "lunchBreak": lunchvalue
        };
        this.apiservice.updateWorkLibrary(updateCon).subscribe((val) => {
          console.log("updated");
        });
        console.log('Values', updateCon);
      }
    });
  }
  vupdateapply(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.vdays = this.checkedList.toString();
        val.vdaynumber = this.checkedLists.length;
      }
    });
    this.vcheckedvaluess(id)
    this.autonamingview();
    this.viewweekactive = false;
  }
  vupdatedayvalue(id: any, vworkweek: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.vdayvalue = vworkweek;
      }
    });
  }
  vupdatetime(id: any, vworktime: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.vtime = vworktime;
      }
    });
    this.autonamingview();
  }

  vupdatehour(id: any, vworkhours: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.vhour = vworkhours;
      }
    });
    this.autonamingview();
  }
  vupdatelunch(id: any, vworklunch: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.vlunch = vworklunch;
      }
    });
    this.autonamingview();
  }
  closealldrop(id: any) {

    this.done6(id);
    this.done7();
    this.done8();
    this.done9();
    this.done11();
    this.viewcancel();



  }

  onKeyPress(event: any) {

    if (event.keyCode == 13) {
      alert('Entered Click Event!');
    } else {
    }
  }
  nameclose(id: any) {
    this.workimports.forEach((val: any) => {

      if (val.id == id) {
        console.log('work', this.workimports)
        val.vname = val.name;
        val.tname = val.name;
        val.vdays = val.days;
        val.vdaynumber = val.daynumber;
        val.vdayvalue = val.dayvalue;
        val.vtime = val.time;
        val.vhour = val.hour;
        val.vlunch = val.lunch
        this.options.forEach((val3: any) => {
          val3.checked = false;
        });
      }
    })
  }

  moveup() {
    if (this.movingup == true) {
      this.moveupwards--;
      console.log(this.moveupwards);
      if (this.moveupwards < 1) {
        this.moveupwards = 1;
      }
      this.days.forEach((val) => {
        if (this.moveupwards == val.idday) {
          document.getElementById('hoverday' + this.daynumber + val.idday)?.classList.add('hoverday');
        } else {
          document.getElementById('hoverday' + this.daynumber + val.idday)?.classList.remove('hoverday');
          document.getElementById('mworkingday' + this.daynumber + val.idday)?.classList.add('active1');
        }
      });
    } else {

    }

  }
  movedown() {
    if (this.movingup == true) {

      this.moveupwards++;
      console.log(this.moveupwards);
      if (this.moveupwards > 7) {
        this.moveupwards = 7;
      }
      this.days.forEach((val) => {
        if (this.moveupwards == val.idday) {
          document.getElementById('hoverday' + this.daynumber + val.idday)?.classList.add('hoverday');
        } else {
          document.getElementById('hoverday' + this.daynumber + val.idday)?.classList.remove('hoverday');
          document.getElementById('mworkingday' + this.daynumber + val.idday)?.classList.add('active1');
        }

      });
    } else {

    }

  }
  moveup1() {
    if (this.movingup1 == true) {

      this.movedownwards--;
      if (this.movedownwards < 1) {
        this.movedownwards = 0;
        if (this.movedownwards == 0) {
          document.getElementById('addnewtime' + this.timenumber)?.classList.add('hoverday');
          this.timevalues.forEach((val: any) => {
            if (val.sequence == 1) {
              document.getElementById('hovertime' + this.timenumber + val.id)?.classList.remove('hoverday');
            }
            document.getElementById('mworkingtime' + this.timenumber + val.id)?.classList.add('active1');
          });
        }
      }

      this.timevalues.forEach((val: any) => {
        if (this.movedownwards == val.sequence) {
          document.getElementById('hovertime' + this.timenumber + val.id)?.classList.add('hoverday');
        } else {
          document.getElementById('hovertime' + this.timenumber + val.id)?.classList.remove('hoverday');
          document.getElementById('mworkingtime' + this.timenumber + val.id)?.classList.add('active1');
        }
      });
    } else {

    }

  }
  movedown1() {
    if (this.movingup1 == true) {
      this.movedownwards++;
      console.log(this.timevalues.length);
      if (this.movedownwards > this.timevalues.length) {
        this.movedownwards = this.timevalues.length;
      }
      this.timevalues.forEach((val: any) => {
        if (this.movedownwards == val.sequence) {
          document.getElementById('hovertime' + this.timenumber + val.id)?.classList.add('hoverday');
        } else {
          document.getElementById('hovertime' + this.timenumber + val.id)?.classList.remove('hoverday');
          document.getElementById('mworkingtime' + this.timenumber + val.id)?.classList.add('active1');
          document.getElementById('addnewtime' + this.timenumber)?.classList.remove('hoverday');
        }
      });
    } else {

    }

  }
  moveup2() {
    if (this.movingup2 == true) {
      this.movedownwardss--;
      if (this.movedownwardss < 1) {
        this.movedownwardss = 0;
        if (this.movedownwardss == 0) {
          document.getElementById('addnewhour' + this.hournumber)?.classList.add('hoverday');
          this.hourvalues.forEach((val: any) => {
            if (val.sequence == 1) {
              document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
            }
            document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
          });
        }
      }
      this.hourvalues.forEach((val: any) => {
        if (this.movedownwardss == val.sequence) {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.add('hoverday');
        } else {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
          document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
        }
      });
    }

  }
  movedown2() {
    if (this.movingup2 == true) {
      this.movedownwardss++;
      if (this.movedownwardss > this.hourvalues.length) {
        this.movedownwardss = this.hourvalues.length;
      }
      this.hourvalues.forEach((val: any) => {
        if (this.movedownwardss == val.sequence) {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.add('hoverday');
        } else {
          document.getElementById('addnewhour' + this.hournumber)?.classList.remove('hoverday');
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
          document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
        }
      });
    }

  }

  // checking() {
  //   this.child.checkempty();
  // }
  nameactiveclose(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id != id) {
        this.done(val.id);
      }
      this.done2(val.id);
      this.done3(val.id);
      this.done10(val.id);
      this.done4(val.id);
      this.done5(val.id);
      this.workdaysswitching = false;
      this.workweeksswitching = false;
      this.worktimeswitching = false;
      this.workhourswitching = false;
    });
  }

  weekactiveclose(id: any) {
    this.workimports.forEach((val: any) => {
      this.done(val.id);
      this.done3(val.id);
      this.done10(val.id);
      this.done4(val.id);
      this.done5(val.id);
      this.workweeksswitching = false;
      this.worktimeswitching = false;
      this.workhourswitching = false;
    });
  }
  dayactiveclose(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id != id) {
        this.done3(val.id);
      }
      this.done2(val.id);
      this.done10(val.id);
      this.done(val.id);
      this.done4(val.id);
      this.done5(val.id);
      this.workdaysswitching = false;
      this.worktimeswitching = false;
      this.workhourswitching = false;
      this.movingup1 = false;
      this.movingup2 = false;
      this.movingup6 = false;
    });
  }
  timeactiveclose(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id != id) {
        this.done4(val.id);
      }
      this.done2(val.id);
      this.done10(val.id);
      this.done3(val.id);
      this.done(val.id);
      this.done5(val.id);
      this.workdaysswitching = false;
      this.workweeksswitching = false;
      this.workhourswitching = false;
      this.movingup = false;
      this.movingup2 = false;
      this.movingup6 = false;
    });
  }
  houractiveclose(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id != id) {
        this.done5(val.id);
      }
      this.done2(val.id);
      this.done10(val.id);
      this.done3(val.id);
      this.done4(val.id);
      this.done(val.id);
      this.workdaysswitching = false;
      this.workweeksswitching = false;
      this.worktimeswitching = false;
      this.movingup = false;
      this.movingup1 = false;
      this.movingup6 = false;
    });
  }
  lunchactiveclose(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id != id) {
        this.done10(val.id);
      }
      this.done5(val.id);
      this.done2(val.id);
      this.done3(val.id);
      this.done4(val.id);
      this.done(val.id);
      this.workdaysswitching = false;
      this.workweeksswitching = false;
      this.worktimeswitching = false;
      this.movingup = false;
      this.movingup1 = false;
      this.movingup6 = false;
    });
  }
  activeadd() {
    // this.child.addwork();
    document.getElementById('activeadded')?.click()
  }

  closeall() {

    if (this.activeon == false) {
      this.close1 = false;
      this.close2 = false;
      this.workimports.forEach((val: any) => {
        this.done5(val.id);
        this.workdaysswitching = false;
        this.workweeksswitching = false;
        this.worktimeswitching = false;
        this.workhourswitching = false;
        this.done2(val.id);
        this.done3(val.id);
        this.done4(val.id);
        this.done10(val.id);
        this.done(val.id);
        this.movingup = false;
        this.close3 = false;
        this.close4 = false;
        this.close5 = false;
        this.movingup1 = false;
        this.movingup2 = false;
        this.movingup3 = false;
        this.movingup6 = false;
        this.movingup4 = false;
        this.movingup5 = false;
        this.movingup6 = false;
        this.movingup7 = false;
        this.movingup7a = false;
        this.movingup8 = false;
      });
    }
  }

  checkadd() {
    this.addpopup = true;
    // this.child.updaesequence();
    // this.child.checkempty();
  }
  clickworkday(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc = val.sequence;
        this.tabfunc2 = 1;
        this.tabnumber = 0;
      }
    });
  }
  clickworkweek(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc = val.sequence;
        this.tabfunc2 = 2;
        this.tabnumber = 0;
      }
    });
  }
  clickworktime(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc = val.sequence;
        this.tabfunc2 = 3;
        this.tabnumber = 0;
      }
    });
  }
  clickworkhour(id: any) {
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        if (val.sequence == this.workimports.length) {
          this.tabfunc = 1;
          this.tabfunc2 = 0;
          this.tabnumber = 1;
        } else {
          this.tabfunc = val.sequence + 1;
          this.tabfunc2 = 0;
          this.tabnumber = 0;
        }
      }
    });
  }
  workdaysswitch(id: any, workdays: any) {

    if (this.workdaysswitching == false) {
      this.workdaysswitching = true;
      this.edit2(id, workdays);
    } else {
      this.workdaysswitching = false;
      this.done2(id);
    }
  }
  workweekswitch(id: any, workswwek: any) {

    if (this.workweeksswitching == false) {
      this.workweeksswitching = true;
      this.edit3(id, workswwek);
    } else {
      this.workweeksswitching = false;
      this.done3(id);
    }
  }
  worktimeswich(id: any, worktime: any) {

    if (this.worktimeswitching == false) {
      this.worktimeswitching = true;
      this.edit4(id, worktime);
    } else {
      this.worktimeswitching = false;
      this.done4(id);
    }
  }
  workhourswitch(id: any, workhour: any) {

    if (this.workhourswitching == false) {
      this.workhourswitching = true;
      this.edit5(id, workhour);
    } else {
      this.workhourswitching = false;
      this.done5(id);
    }
  }
  closedayhover() {
    this.movingup = false;
  }
  closetimehover() {
    this.movingup1 = false;
  }
  closehourhover() {
    this.movingup2 = false;
  }
  mousehoverin(id: number) {
    this.moveupwards = id;
    this.movingup = false;
    this.days.forEach((val) => {
      document.getElementById('hoverday' + this.daynumber + val.idday)?.classList.remove('hoverday');
      document.getElementById('mworkingday' + this.daynumber + val.idday)?.classList.add('active1');
    });
  }
  mousehoverin1(id: number) {
    this.movedownwards = id;
    this.movingup1 = false;
    this.timevalues.forEach((val: any) => {
      document.getElementById('addnewtime' + this.timenumber)?.classList.remove('hoverday');
      document.getElementById('hovertime' + this.timenumber + val.id)?.classList.remove('hoverday');
      document.getElementById('mworkingtime' + this.timenumber + val.id)?.classList.add('active1');
    });
  }
  mousehoverin2(id: number) {
    this.movedownwardss = id;
    this.movingup2 = false;
    this.hourvalues.forEach((val: any) => {
      document.getElementById('addnewhour' + this.hournumber)?.classList.remove('hoverday');
      document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
      document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
    });
  }
  mousehoverin3(id: number) {
    this.movingup6 = false;
    this.movingup2 = false;
    this.options.forEach((val) => {
      document.getElementById('optionvalueweekcheckbox' + id + val.id)?.classList.remove('subli1checkboxweek');
      document.getElementById('optionvalueweektext' + id + val.id)?.classList.remove('subli1textdownarrow');
      document.getElementById('selectall1dayscheckbox' + id)?.classList.remove('subli1checkboxweek');
      document.getElementById('selectall1days' + id)?.classList.remove('subli1textdownarrow');
      document.getElementById('clobtn' + id)?.classList.remove('canbtnhover');
      document.getElementById('canbtn' + id)?.classList.remove('clobtnhover');
      document.getElementById('appbtn' + id)?.classList.remove('clobtnhover');
    });
  }
  mousehoverout3() {
    this.movingup6 = true;
    this.movingup2 = false;
  }
  mousehoverout() {
    this.movingup = true;
    this.days.forEach((val) => {
      if (this.moveupwards == val.idday) {
        document.getElementById('hoverday' + this.daynumber + val.idday)?.classList.add('hoverday');
      } else {
        document.getElementById('hoverday' + this.daynumber + val.idday)?.classList.remove('hoverday');
        document.getElementById('mworkingday' + this.daynumber + val.idday)?.classList.add('active1');
      }

    });
  }
  mousehoverout1() {
    if (this.movingup4 == true) {
      this.movingup1 = false;

    } else {
      this.movingup1 = true;
    }
    if (this.movedownwards == 0) {
      document.getElementById('addnewtime' + this.timenumber)?.classList.add('hoverday');
      this.timevalues.forEach((val: any) => {
        if (val.sequence == 1) {
          document.getElementById('hovertime' + this.timenumber + val.id)?.classList.remove('hoverday');
        }
        document.getElementById('mworkingtime' + this.timenumber + val.id)?.classList.add('active1');
      });
    }
    this.timevalues.forEach((val: any) => {
      if (this.movedownwards == val.sequence) {
        document.getElementById('hovertime' + this.timenumber + val.id)?.classList.add('hoverday');
      } else {
        document.getElementById('hovertime' + this.timenumber + val.id)?.classList.remove('hoverday');
        document.getElementById('mworkingtime' + this.timenumber + val.id)?.classList.add('active1');
      }

    });
  }
  mousehoverout2() {
    if (this.movingup3 == true) {
      this.movingup2 = false;

    } else {
      this.movingup2 = true;
    }
    if (this.movedownwardss == 0) {
      document.getElementById('addnewhour' + this.hournumber)?.classList.add('hoverday');
      this.hourvalues.forEach((val: any) => {
        if (val.sequence == 1) {
          document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
        }
        document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
      });
    }
    this.hourvalues.forEach((val: any) => {
      if (this.movedownwardss == val.sequence) {
        document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.add('hoverday');
      } else {
        document.getElementById('hoverhour' + this.hournumber + val.id)?.classList.remove('hoverday');
        document.getElementById('mworkinghour' + this.hournumber + val.id)?.classList.add('active1');
      }

    });
  }
  closeweekselect(id: any) {
    if (this.movingup6 == true) {
      this.movingup2 = false;
      this.daysnumber++;
      console.log(this.daysnumber)
      document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.classList.add('subli1checkboxweek');
      document.getElementById('optionvalueweektext' + id + this.daysnumber)?.classList.add('subli1textdownarrow');
      this.options.forEach((val: any) => {
        if (val.id != this.daysnumber) {
          document.getElementById('optionvalueweekcheckbox' + id + val.id)?.classList.remove('subli1checkboxweek');
          document.getElementById('optionvalueweektext' + id + val.id)?.classList.remove('subli1textdownarrow');
        }
      });

      if (this.workweekactive == false) {
        if (this.daysnumber == 8) {
          this.options.forEach((val: any) => {
            document.getElementById('optionvalueweekcheckbox' + id + val.id)?.classList.remove('subli1checkboxweek');
            document.getElementById('optionvalueweektext' + id + val.id)?.classList.remove('subli1textdownarrow');
            document.getElementById('selectall1dayscheckbox' + id)?.classList.add('subli1checkboxweek');
            document.getElementById('selectall1days' + id)?.classList.add('subli1textdownarrow');

          });

        }
        if (this.daysnumber >= 9) {
          this.daysnumber = 9;
          document.getElementById('selectall1dayscheckbox' + id)?.classList.remove('subli1checkboxweek');
          document.getElementById('selectall1days' + id)?.classList.remove('subli1textdownarrow');
          document.getElementById('clobtn' + id)?.classList.add('canbtnhover');
        }
      } else {
        if (this.daysnumber == 8) {
          this.daysnumber = 8;
          this.movingup9 = true;
          document.getElementById('selectall1dayscheckbox' + id)?.classList.remove('subli1checkboxweek');
          document.getElementById('selectall1days' + id)?.classList.remove('subli1textdownarrow');
          document.getElementById('appbtn' + id)?.classList.add('clobtnhover');
        }
        if (this.daysnumber >= 9) {
          this.daysnumber = 8;
          this.movingup9 = true;
          document.getElementById('selectall1dayscheckbox' + id)?.classList.remove('subli1checkboxweek');
          document.getElementById('selectall1days' + id)?.classList.remove('subli1textdownarrow');
          document.getElementById('appbtn' + id)?.classList.add('clobtnhover');
        }

      }

    }
  }
  closeweekUPselect(id: any) {
    if (this.movingup6 == true) {
      this.movingup2 = false;
      this.daysnumber--;
      console.log(this.daysnumber)
      document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.classList.add('subli1checkboxweek');
      document.getElementById('optionvalueweektext' + id + this.daysnumber)?.classList.add('subli1textdownarrow');
      this.options.forEach((val: any) => {
        if (val.id != this.daysnumber) {
          document.getElementById('optionvalueweekcheckbox' + id + val.id)?.classList.remove('subli1checkboxweek');
          document.getElementById('optionvalueweektext' + id + val.id)?.classList.remove('subli1textdownarrow');
          document.getElementById('selectall1dayscheckbox' + id)?.classList.remove('subli1checkboxweek');
          document.getElementById('selectall1days' + id)?.classList.remove('subli1textdownarrow');
        }
      });
      if (this.daysnumber < 1) {
        this.daysnumber = 1;
        document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.classList.add('subli1checkboxweek');
        document.getElementById('optionvalueweektext' + id + this.daysnumber)?.classList.add('subli1textdownarrow');
      }

      if (this.daysnumber == 8) {
        document.getElementById('selectall1dayscheckbox' + id)?.classList.add('subli1checkboxweek');
        document.getElementById('selectall1days' + id)?.classList.add('subli1textdownarrow');
        document.getElementById('clobtn' + id)?.classList.remove('canbtnhover');
        document.getElementById('appbtn' + id)?.classList.remove('clobtnhover');
        this.movingup9 = false;
      }

    }
  }
  closeweekRIGHTselect(id: any) {
    if (this.movingup9 == true && this.workweekactive == true) {
      this.daysnumber = 8;
      document.getElementById('appbtn' + id)?.classList.add('clobtnhover');
      document.getElementById('canbtn' + id)?.classList.remove('canbtnhover');
    }
  }
  closeweekLEFTselect(id: any) {
    if (this.movingup9 == true && this.workweekactive == true) {
      this.daysnumber = 9;
      document.getElementById('appbtn' + id)?.classList.remove('clobtnhover');
      document.getElementById('canbtn' + id)?.classList.add('canbtnhover');
    }
  }
  applyselecetdweek(id: any) {
    if (this.movingup6 == true) {
      if (this.daysnumber == 1) {
        document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.click();
      } else if (this.daysnumber == 2) {
        document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.click();
      } else if (this.daysnumber == 3) {
        document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.click();
      } else if (this.daysnumber == 4) {
        document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.click();
      } else if (this.daysnumber == 5) {
        document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.click();
      } else if (this.daysnumber == 6) {
        document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.click();
      } else if (this.daysnumber == 7) {
        document.getElementById('optionvalueweekcheckbox' + id + this.daysnumber)?.click();
      } else if (this.daysnumber == 8) {
        console.log('its 8')
        if (this.workweekactive == true && this.movingup9 == true) {
          document.getElementById('appbtn' + id)?.click();
          console.log('apply clicked')
        } else {
          document.getElementById('selectall1dayscheckbox' + id)?.click();
        }
      } else if (this.daysnumber == 9) {
        console.log('its 9')
        if (this.workweekactive == true && this.movingup9 == true) {
          document.getElementById('canbtn' + id)?.click();
          console.log('cancel clicked')
          document.getElementById('clobtn' + id)?.classList.add('canbtnhover');
        } else {
          console.log('close clicked')
          document.getElementById('clobtn' + id)?.click();
        }
      } else {

      }
    }

  }
  hoverclick() {
    if (this.movingup == true) {
      this.days.forEach((val: any) => {
        if (this.moveupwards == val.idday) {
          console.log(this.daynumber, val.day);
          this.updatework3(this.daynumber, val.day)
          this.closeall();
        }
      });
    }
  }
  hoverclick1() {
    if (this.movingup1 == true) {
      this.timevalues.forEach((val: any) => {
        if (this.movedownwards == val.sequence) {
          this.updatework4(this.timenumber, val.selectedValue)
          this.closeall();
        }
      });
    }
  }
  hovertimeclick() {
    if (this.movingup1 == true && this.movedownwards == 0) {
      this.edittime(this.timenumber);
    }
  }
  hoverclick2() {
    if (this.movingup2 == true) {
      this.hourvalues.forEach((val: any) => {
        if (this.movedownwardss == val.sequence) {
          this.updatework5(this.hournumber, val.selectedValue)
          this.closeall();
        }
      });
    }
  }
  hoverhourclick() {
    if (this.movingup2 == true && this.movedownwardss == 0) {
      this.movingup5 = false;
      this.edithours(this.hournumber);
    }
  }
  incrementkey() {
    if (this.movingup3 == true) {
      this.increment(this.hournumber);
      this.newhour();
    }

  }

  decrementkey() {
    if (this.movingup3 == true) {
      this.decrement(this.hournumber);
      this.newhour();
    }

  }

  newhour() {
    this.workimports.forEach((val: any) => {
      if (this.hournumber == val.id) {
        console.log(val.hournumber);
      }
    });
  }

  createhour(id: any) {
    this.activeon = false;
    if (this.movingup5 == true) {
      this.workimports.forEach((val: any) => {
        if (val.id == id) {
          if (val.hoursnumber >= 25) {

          } else {
            console.log(val.hoursnumber);
            val.hour = val.hoursnumber + ' Hours';
            val.vhour = val.hoursnumber + ' Hours';
            val.hoursWorking = val.hoursnumber + ' Hours';
            let createCon = {
              "settingId": 7,
              "optionValue": val.hoursnumber + ' Hours',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.done5(id);
              this.addupdatehour();
            });
            let updateCon = {
              "id": id,
              "hoursWorking": val.hoursnumber + ' Hours,' + val.lunch,
            };
            this.library.update(updateCon).subscribe((val) => {
              console.log("updated");
              //this.workimports=val;
              this.autonaminghour(id);
            });
          }

        }
      });

    } else if (this.viewhour1switch == true) {
      console.log('value view popup')
      var idvalue = 0;
      this.viewrecords.forEach((value: any) => {
        value.id = idvalue;
      });
      this.workimports.forEach((val: any) => {
        if (val.id == idvalue) {
          if (val.hoursnumber >= 25) {

          } else {
            val.vhour = val.hoursnumber + ' Hours';
            let createCon = {
              "settingId": 7,
              "optionValue": val.hoursnumber + ' Hours',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.done9();
              this.addupdatehour();
              this.viewedithourclose();
              this.autonamingview();
            });
          }

        }
      });

    }
  }

  createtime(id: any) {
    this.activeon = false;
    if (this.movingup7a == true) {
      this.movingup7 = false;
      this.movingup7a = false;
      this.movingup1 == false;
      this.hoursvalue7 = this.clocktext + this.hoursvalue2;
      console.log(this.hoursvalue7);
      let a = 0;
      let value = this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6;
      this.timevalues.forEach((val: any) => {

        if (val.selectedValue == value) {
          this.movingup9a = false;
          a++
          console.log('false');
          document.getElementById('row1time' + id)?.classList.add('redcolour');
          document.getElementById('row2time' + id)?.classList.add('redcolour');
          document.getElementById('row3time' + id)?.classList.add('redcolour');
          document.getElementById('row4time' + id)?.classList.add('redcolour');
          document.getElementById('row6time' + id)?.classList.add('redcolour');
        } else {

        }
      });
      if (a == 0 && this.movingup9a == false) {
        this.movingup9a = true;
        document.getElementById('row1time' + id)?.classList.remove('redcolour');
        document.getElementById('row2time' + id)?.classList.remove('redcolour');
        document.getElementById('row3time' + id)?.classList.remove('redcolour');
        document.getElementById('row4time' + id)?.classList.remove('redcolour');
        document.getElementById('row6time' + id)?.classList.remove('redcolour');
      } else {

      }
      if (this.movingup9a == false) {

      } else {

        if (this.hoursvalue7 > 13) {

        } else {
          if (this.movingup4 == true) {
            this.workimports.forEach((val: any) => {
              if (val.id == id) {
                console.log(val.hournumber);
                val.time = this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6;
                val.vtime = this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6;
                val.timeDayStarts = this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6;
                let createCon = {
                  "settingId": 6,
                  "optionValue": this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6,
                };
                this.library.createtime(createCon).subscribe((val) => {
                  console.log("Created", val);
                  this.done4(id);
                  this.addupdatetime();

                });
                let updateCon = {
                  "id": id,
                  "timeDayStarts": this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6,
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                  //this.workimports=val;
                });
              }
            });
          }
          this.workimports.forEach((work: any) => {
            if (work.id == id) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
              this.setStartHour = this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6;
              this.workScheduleForm = work.hoursWorking.split(' ');
              this.checkedList = [];
              this.checkedLists = [];
              var week = work.workingDays;
              var weeksplit = week.split(',');
              for (var a in weeksplit) {
                this.options.forEach((val: any) => {
                  if (val.value == weeksplit[a]) {
                    this.checkedLists.push(val);
                    this.checkedList.push(val.value);
                    this.checkedDayInString = this.checkedList.toString();
                  }
                });
              }
            }
          });
          let arr2: any = [];
          this.checkedLists.forEach((val: any) => {
            arr2.push(parseInt(val.id));
          });
          let arr3 = arr2.pop();
          let arr4 = arr2[0];
          let arr1: any = [];
          for (var i = arr4; i < arr3; i++) {
            arr1.push(i);
          }
          let difference = arr1.filter((x: any) => arr2.indexOf(x) === -1);
          let enddate: number = 0;
          let mindate: any;
          let min1date = 0;
          let min2date = 0;
          let min3date = 0;
          let min4date: any;
          min4date = this.setStartHour.split(':')[1];
          this.selectMeridiem = min4date.split(' ')[1];
          min1date = parseInt(min4date.split(' ')[0]) + parseInt(this.lunuchtime3 + this.lunuchtime4);
          if (min1date >= 60) {
            if (min1date == 120) {
              mindate = 0;
              min2date = 2;
            } else {
              min3date = min1date - 60;
              min2date = 1;
              console.log('min:', min3date)
              if (min3date <= 9) {
                mindate = '0' + min3date;

              } else {
                mindate = min3date;
              }
            }
          } else {
            if (min1date <= 9) {
              mindate = '0' + min1date;
            } else {
              mindate = min1date;
            }
            min2date = 0;
          }
          enddate = parseInt(this.setStartHour.split(':')[0]) + parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date;
          if (enddate >= 12) {
            let a = '';
            if (this.selectMeridiem == 'AM') {
              if ((enddate - 12) == 0) {
                a = "12" + ":" + mindate + " PM";
              } else if ((enddate - 12) <= -1) {
                a = (enddate - 12) + ":" + mindate + " PM"
              } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
                a = "0" + (enddate - 12) + ":" + mindate + " AM"
              } else {
                a = "0" + (enddate - 12) + ":" + mindate + " PM";
              }
            } else {
              if ((enddate - 12) == 0) {
                a = "12" + ":" + mindate + " AM";
              } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
                a = "0" + (enddate - 12) + ":" + mindate + " PM"
              } else {
                a = "0" + (enddate - 12) + ":" + mindate + " AM";
              }
            }
            if (difference.length == 0) {
              let value1 = '';
              let value2 = '';
              this.checkedLists.forEach((val: any) => {
                if (arr4 == val.id) {
                  value1 = val.value;
                }

                if (arr3 == val.id) {
                  value2 = val.value;
                }
              });
              this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
            } else {
              this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
            }
          } else {
            let a = '';
            if (this.selectMeridiem == 'AM') {
              a = enddate + ":" + mindate + " AM";
            } else {
              a = enddate + ":" + mindate + " PM";
            }

            if (difference.length == 0) {
              let value1 = '';
              let value2 = '';
              this.checkedLists.forEach((val: any) => {
                if (arr4 == val.id) {
                  value1 = val.value;
                }

                if (arr3 == val.id) {
                  value2 = val.value;
                }
              });
              this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
            } else {
              this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
            }
          }
          console.log(this.naming);
          this.workimports.forEach((val: any) => {
            if (val.id == id) {
              val.workScheduleName = this.naming;
              val.name = this.naming;
              val.vname = this.naming;
              val.tname = this.naming;
            }
          });
          //console.log("id",id,workname)
          let updateCon = {
            "id": id,
            "workScheduleName": this.naming,
          };
          this.library.update(updateCon).subscribe((val) => {
            console.log("updated");
            //this.workimports=val;
          });
        }

      }


    } else if (this.viewtime3switch == true) {
      this.hoursvalue7 = this.clocktext + this.hoursvalue2;
      let a = 0;
      let value = this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6;
      this.timevalues.forEach((val: any) => {

        if (val.selectedValue == value) {
          this.movingup9a = false;
          a++
          document.getElementById('viewrow1time')?.classList.add('redcolour');
          document.getElementById('viewrow2time')?.classList.add('redcolour');
          document.getElementById('viewrow3time')?.classList.add('redcolour');
          document.getElementById('viewrow4time')?.classList.add('redcolour');
          document.getElementById('viewrow6time')?.classList.add('redcolour');
        } else {

        }
      });
      if (a == 0 && this.movingup9a == false) {
        this.movingup9a = true;
        document.getElementById('viewrow1time')?.classList.remove('redcolour');
        document.getElementById('viewrow2time')?.classList.remove('redcolour');
        document.getElementById('viewrow3time')?.classList.remove('redcolour');
        document.getElementById('viewrow4time')?.classList.remove('redcolour');
        document.getElementById('viewrow6time')?.classList.remove('redcolour');
      } else {

      }
      if (this.movingup9a == false) {

      } else {

        if (this.hoursvalue7 > 13) {

        } else {
          var idvalue = 0;
          this.viewrecords.forEach((value: any) => {
            value.id = idvalue;
          });
          this.workimports.forEach((val: any) => {
            if (val.id == idvalue) {

              console.log(val.hournumber);

              val.vtime = this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6;

              let createCon = {
                "settingId": 6,
                "optionValue": this.clocktext + this.hoursvalue2 + ":" + this.hoursvalue1 + this.hoursvalue3 + " " + this.hoursvalue6,
              };
              this.library.createtime(createCon).subscribe((val) => {
                console.log("Created", val);
                this.done8();
                this.addupdatetime();
                this.viewedittimeclose();
                this.autonamingview();
              });
            }
          });
        }
      }
    }

  }

  updateclock(id: any, clock: any) {
    this.hoursvalue6 = clock;
  }

  addupdatetime() {
    this.library.getworksettingtime().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['splitedvaluea'] = itemworkk.selectedValue.split(" ", 2);
        itemworkk['splitedvalueb'] = itemworkk.splitedvaluea[0];
        itemworkk['splitedvalued'] = itemworkk.splitedvaluea[1];
        itemworkk['splitedvaluec'] = itemworkk.splitedvalueb.split(":", 2);
        itemworkk['splitedvalue'] = parseInt(itemworkk.splitedvaluec[0] + itemworkk.splitedvaluec[1]);
      });
      console.log("time", val);

      this.timevalues = val;
      this.timevalues.sort((a: { splitedvalue: any; }, b: { splitedvalue: any; }) => a.splitedvalue - b.splitedvalue);
      this.sortera = {
        "am": 0,
        "pm": 1,
      }

      this.timevalues.sort((a: { splitedvalued: any; }, b: { splitedvalued: any; }) => {
        let day1 = a.splitedvalued.toLowerCase();
        let day2 = b.splitedvalued.toLowerCase();
        return this.sortera[day1] - this.sortera[day2];
      });
    });

  }
  addupdatehour() {
    this.hourvalues = [];
    this.library.getworksettinghour().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['hournumber'] = 0;

        itemworkk['hoursWorking'] = itemworkk.selectedValue;
        if (itemworkk.hoursWorking == '1 Hours') {
          itemworkk.hournumber = 1;
        } else if (itemworkk.hoursWorking == '2 Hours') {
          itemworkk.hournumber = 2;
        } else if (itemworkk.hoursWorking == '3 Hours') {
          itemworkk.hournumber = 3;
        } else if (itemworkk.hoursWorking == '4 Hours') {
          itemworkk.hournumber = 4;
        } else if (itemworkk.hoursWorking == '5 Hours') {
          itemworkk.hournumber = 5;
        } else if (itemworkk.hoursWorking == '6 Hours') {
          itemworkk.hournumber = 6;
        } else if (itemworkk.hoursWorking == '7 Hours') {
          itemworkk.hournumber = 7;
        } else if (itemworkk.hoursWorking == '8 Hours') {
          itemworkk.hournumber = 8;
        } else if (itemworkk.hoursWorking == '9 Hours') {
          itemworkk.hournumber = 9;
        } else if (itemworkk.hoursWorking == '10 Hours') {
          itemworkk.hournumber = 10;
        } else if (itemworkk.hoursWorking == '11 Hours') {
          itemworkk.hournumber = 11;
        } else if (itemworkk.hoursWorking == '12 Hours') {
          itemworkk.hournumber = 12;
        } else if (itemworkk.hoursWorking == '13 Hours') {
          itemworkk.hournumber = 13;
        } else if (itemworkk.hoursWorking == '14 Hours') {
          itemworkk.hournumber = 14;
        } else if (itemworkk.hoursWorking == '15 Hours') {
          itemworkk.hournumber = 15;
        } else if (itemworkk.hoursWorking == '16 Hours') {
          itemworkk.hournumber = 16;
        } else if (itemworkk.hoursWorking == '17 Hours') {
          itemworkk.hournumber = 17;
        } else if (itemworkk.hoursWorking == '18 Hours') {
          itemworkk.hournumber = 18;
        } else if (itemworkk.hoursWorking == '19 Hours') {
          itemworkk.hournumber = 19;
        } else if (itemworkk.hoursWorking == '20 Hours') {
          itemworkk.hournumber = 20;
        } else if (itemworkk.hoursWorking == '21 Hours') {
          itemworkk.hournumber = 21;
        } else if (itemworkk.hoursWorking == '22 Hours') {
          itemworkk.hournumber = 22;
        } else if (itemworkk.hoursWorking == '23 Hours') {
          itemworkk.hournumber = 23;
        } else if (itemworkk.hoursWorking == '24 Hours') {
          itemworkk.hournumber = 24;
        }
      });

      console.log("hour", val);
      this.hourvalues = val;
      this.hourvalues.sort((a: { hournumber: any; }, b: { hournumber: any; }) => a.hournumber - b.hournumber);
    });

  }
  addupdatelunch() {
    this.lunchevalues = [];
    this.library.getworksettinglunch().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        this.lunchevalues.push(itemworkk);
      });
    });
    console.log("lunchvalues", this.lunchevalues);
  }
  tabfunctionality() {
    if (this.addpopup == true) {
      // this.child.tabfunctionalityadd();
    } else if (this.editpopup == true) {
      console.log('tab id2 popup', this.tabnumber);
      if (this.tabnumber == 1) {
        this.tab4enter = false;
        this.tab5enter = true;
        this.tab6enter = false;
        this.tab7enter = false;
        this.tab8enter = false;
        this.tab9enter = false;
        this.tab10enter = false;
        document.getElementById('vprev')?.classList.remove('vprev1');
        document.getElementById('vnext')?.classList.add('vnext1');
      } else if (this.tabnumber == 2) {
        if (this.activetab == true) {
          this.tab7enter = false;
          this.tab8enter = false;
          this.tab9enter = false;
          this.tab10enter = false;
          document.getElementById('vcancel')?.classList.remove('B16');
          this.viewrecords.forEach((val: any) => {
            this.edit6(val.id, val.vname, val.vdays);
          });
        } else {
          this.tab4enter = false;
          this.tab5enter = false;
          this.tab6enter = false;
          document.getElementById('vnext')?.classList.remove('vnext1');
          this.viewrecords.forEach((val: any) => {
            this.edit6(val.id, val.vname, val.vdays);
          });
        }
      } else if (this.tabnumber == 3) {
        this.tab4enter = false;
        this.tab5enter = false;
        this.tab6enter = false;
        this.viewrecords.forEach((val: any) => {
          this.done6(val.id);
          this.edit7(val.id, val.vname, val.vdayvalue);
        });
      } else if (this.tabnumber == 4) {
        this.tab4enter = false;
        this.tab5enter = false;
        this.tab6enter = false;
        this.tab7enter = false;
        this.tab8enter = false;
        this.tab9enter = false;
        this.tab10enter = false;
        this.done7();
        this.viewrecords.forEach((val: any) => {
          this.edit8(val.id, val.vname, val.vtime);
        });
      } else if (this.tabnumber == 5) {
        this.tab4enter = false;
        this.tab5enter = false;
        this.tab6enter = false;
        this.tab7enter = false;
        this.tab8enter = false;
        this.tab9enter = false;
        this.tab10enter = false;
        this.done8();
        this.viewrecords.forEach((val: any) => {
          this.edit9(val.id, val.vname, val.vhour);
        });
      } else if (this.tabnumber == 6) {
        if (this.activetab == true) {
          this.tab7enter = true;
          this.tab8enter = false;
          this.tab9enter = false;
          this.tab10enter = false;
          this.done9();
          document.getElementById('vsaves')?.classList.add('B15');
        } else {
          this.done9();
          document.getElementById('vclose')?.classList.add('B15');
          this.tab4enter = true;
          this.tab5enter = false;
          this.tab6enter = false;
        }
      } else if (this.tabnumber == 7) {
        if (this.activetab == true) {
          this.tab7enter = false;
          this.tab8enter = true;
          this.tab9enter = false;
          this.tab10enter = false;
          document.getElementById('vsaves')?.classList.remove('B15');
          document.getElementById('vsavennexts')?.classList.add('B16');
        } else {
          document.getElementById('vclose')?.classList.remove('B15');
          document.getElementById('vprev')?.classList.add('vprev1');
          this.tabnumber = 0;
          this.tab4enter = false;
          this.tab5enter = false;
          this.tab6enter = true;
        }
      } else if (this.tabnumber == 8) {
        this.tab7enter = false;
        this.tab8enter = false;
        this.tab9enter = true;
        this.tab10enter = false;
        document.getElementById('vsavennexts')?.classList.remove('B16');
        document.getElementById('vsavencloses')?.classList.add('B16');
      } else if (this.tabnumber == 9) {
        this.tab7enter = false;
        this.tab8enter = false;
        this.tab9enter = false;
        this.tab10enter = true;
        document.getElementById('vsavencloses')?.classList.remove('B16');
        document.getElementById('vcancel')?.classList.add('B16');
        this.tabnumber = 1;
      }
    } else {
      console.log('tab id2', this.tabnumber);
      if (this.tabnumber == 1) {
        this.tab1enter = false;
        this.tab2enter = false;
        this.tab3enter = false;
        document.getElementById('activehover2add')?.classList.add('hide');
        document.getElementById('activehoveradd')?.classList.remove('hide');
        if (this.tabfunc != this.workimports.length) {
          this.tabnumber = 0;
          // if (this.tabfunc2 == 0) {
          //   this.workimports.forEach((val: any) => {
          //     if (val.sequence == this.tabfunc) {
          //       this.edit(val.id);
          //     }
          //   });
          //   this.tabfunc2++
          // } else 
          if (this.tabfunc2 == 0) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.done(val.id);
                this.workdaysswitch(val.id, val.days);
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 1) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.workdaysswitch(val.id, val.days);
                this.workweekswitch(val.id, val.dayvalue);
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 2) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.workweekswitch(val.id, val.dayvalue);
                this.worktimeswich(val.id, val.time);
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 3) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.worktimeswich(val.id, val.time);
                this.workhourswitch(val.id, val.hour);
              }
            });
            this.tabfunc++;
            this.tabfunc2 = 0;
          }
        } else {
          this.tabnumber = 0;
          // if (this.tabfunc2 == 0) {
          //   this.workimports.forEach((val: any) => {
          //     if (val.sequence == this.tabfunc) {
          //       this.edit(val.id);
          //     }
          //   });
          //   this.tabfunc2++
          // } else 
          if (this.tabfunc2 == 0) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.done(val.id);
                this.workdaysswitch(val.id, val.days);
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 1) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.workdaysswitch(val.id, val.days);
                this.workweekswitch(val.id, val.dayvalue);
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 2) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.workweekswitch(val.id, val.dayvalue);
                this.worktimeswich(val.id, val.time);
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 3) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.worktimeswich(val.id, val.time);
                this.workhourswitch(val.id, val.hour);
              }
            });
            this.tabfunc2 = 0;
            this.tabnumber = 1;
          }
        }
      } else if (this.tabnumber == 2) {
        this.tab1enter = true;
        this.tab2enter = false;
        this.tab3enter = false;
        this.workimports.forEach((val: any) => {
          if (val.sequence == this.tabfunc) {
            this.workhourswitch(val.id, val.hour);
          }
        });
        this.closeall();
        this.tabfunc = 1;
        this.tabfunc2 = 0;
        document.getElementById('btn1')?.classList.add('vimporthover');
      } else if (this.tabnumber == 3) {
        this.tab1enter = false;
        this.tab2enter = true;
        this.tab3enter = false;
        document.getElementById('btn1')?.classList.remove('vimporthover');
        document.getElementById('btn2')?.classList.add('cimporthover');
      } else if (this.tabnumber == 4) {
        this.tab1enter = false;
        this.tab2enter = false;
        this.tab3enter = true;
        this.tabnumber = 0;
        document.getElementById('btn2')?.classList.remove('cimporthover');
        document.getElementById('activehoveradd')?.classList.add('hide');
        document.getElementById('activehover2add')?.classList.remove('hide');
      }
    }
  }
  enter1button() {
    if (this.tab1enter == true) {
      this.tab1enter = false;
      document.getElementById('btn1')?.click();
      document.getElementById('btn1')?.classList.remove('vimporthover');
    }
  }
  enter2button() {
    if (this.tab2enter == true) {
      this.tab2enter = false;
      document.getElementById('btn2')?.click();
      document.getElementById('btn2')?.classList.remove('cimporthover');
    }
  }
  enter3button() {
    if (this.tab3enter == true) {
      this.tab3enter = false;
      document.getElementById('activeadd')?.click();
      document.getElementById('activehover2add')?.classList.add('hide');
      document.getElementById('activehoveradd')?.classList.remove('hide');
    }
  }
  enter4button() {
    if (this.tab4enter == true) {
      this.tab4enter = false;
      document.getElementById('vclose')?.classList.remove('B15');
      document.getElementById('vclose')?.click();
    }
  }
  enter5button() {
    if (this.tab5enter == true) {
      this.tab5enter = false;
      document.getElementById('vnext')?.classList.remove('vnext1');
      document.getElementById('vnext')?.click();
    }
  }
  enter6button() {
    if (this.tab6enter == true) {
      this.tab6enter = false;
      document.getElementById('vprev')?.classList.remove('vprev1');
      document.getElementById('vprev')?.click();
    }
  }
  enter7button() {
    if (this.tab7enter == true) {
      this.tab7enter = false;
      document.getElementById('vsaves')?.classList.remove('B15');
      document.getElementById('vsaves')?.click();
    }
  }
  enter8button() {
    if (this.tab8enter == true) {
      this.tab8enter = false;
      document.getElementById('vsavennexts')?.classList.remove('B16');
      document.getElementById('vsavennexts')?.click();
    }
  }
  enter9button() {
    if (this.tab9enter == true) {
      this.tab9enter = false;
      document.getElementById('vsavencloses')?.classList.remove('B16');
      document.getElementById('vsavencloses')?.click();
    }
  }
  enter10button() {
    if (this.tab10enter == true) {
      this.tab10enter = false;
      document.getElementById('vcancel')?.classList.remove('B16');
      document.getElementById('vcancel')?.click();
    }
  }
  editpopupclick() {
    this.tabnumber = 1;
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    document.getElementById('vclose')?.classList.remove('B15');
    document.getElementById('vprev')?.classList.remove('vprev1');
    document.getElementById('vnext')?.classList.remove('vnext1');
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    this.tab4enter = false;
    this.tab5enter = false;
    this.tab6enter = false;
    this.tab7enter = false;
    this.tab8enter = false;
    this.tab9enter = false;
    this.tab10enter = false;
  }
  editpopup2click() {
    this.tabnumber = 2;
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    document.getElementById('vclose')?.classList.remove('B15');
    document.getElementById('vprev')?.classList.remove('vprev1');
    document.getElementById('vnext')?.classList.remove('vnext1');
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    this.tab4enter = false;
    this.tab5enter = false;
    this.tab6enter = false;
    this.tab7enter = false;
    this.tab8enter = false;
    this.tab9enter = false;
    this.tab10enter = false;
  }
  editpopup3click() {
    this.tabnumber = 3;
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    document.getElementById('vclose')?.classList.remove('B15');
    document.getElementById('vprev')?.classList.remove('vprev1');
    document.getElementById('vnext')?.classList.remove('vnext1');
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    this.tab4enter = false;
    this.tab5enter = false;
    this.tab6enter = false;
    this.tab7enter = false;
    this.tab8enter = false;
    this.tab9enter = false;
    this.tab10enter = false;
  }
  editpopup4click() {
    this.tabnumber = 4;
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    document.getElementById('vclose')?.classList.remove('B15');
    document.getElementById('vprev')?.classList.remove('vprev1');
    document.getElementById('vnext')?.classList.remove('vnext1');
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    this.tab4enter = false;
    this.tab5enter = false;
    this.tab6enter = false;
    this.tab7enter = false;
    this.tab8enter = false;
    this.tab9enter = false;
    this.tab10enter = false;
  }
  editpopup5click() {
    this.tabnumber = 5;
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    document.getElementById('vclose')?.classList.remove('B15');
    document.getElementById('vprev')?.classList.remove('vprev1');
    document.getElementById('vnext')?.classList.remove('vnext1');
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    if (this.activetab == true) {
      this.tab7enter = true;
      this.tab8enter = false;
      this.tab9enter = false;
      this.tab10enter = false;

    } else {

      this.tab4enter = true;
      this.tab5enter = false;
      this.tab6enter = false;
    }
  }
  editclick(id: any) {
    document.getElementById('btn1')?.classList.remove('vimporthover');
    document.getElementById('btn2')?.classList.remove('cimporthover');
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
    this.tab1enter = false;
    this.tab2enter = false;
    this.tab3enter = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc2 = 1;
        this.tabfunc = val.sequence;
        this.tabnumber = 0;
      }
    });
  }
  edit2click(id: any) {
    document.getElementById('btn1')?.classList.remove('vimporthover');
    document.getElementById('btn2')?.classList.remove('cimporthover');
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
    this.tab1enter = false;
    this.tab2enter = false;
    this.tab3enter = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc2 = 2;
        this.tabfunc = val.sequence;
        this.tabnumber = 0;
      }
    });
  }
  edit3click(id: any) {
    document.getElementById('btn1')?.classList.remove('vimporthover');
    document.getElementById('btn2')?.classList.remove('cimporthover');
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
    this.tab1enter = false;
    this.tab2enter = false;
    this.tab3enter = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc2 = 3;
        this.tabfunc = val.sequence;
        this.tabnumber = 0;
      }
    });
  }
  edit4click(id: any) {
    document.getElementById('btn1')?.classList.remove('vimporthover');
    document.getElementById('btn2')?.classList.remove('cimporthover');
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
    this.tab1enter = false;
    this.tab2enter = false;
    this.tab3enter = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc2 = 4;
        this.tabfunc = val.sequence;
        this.tabnumber = 0;
      }
    });
  }
  edit5click(id: any) {
    document.getElementById('btn1')?.classList.remove('vimporthover');
    document.getElementById('btn2')?.classList.remove('cimporthover');
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
    this.tab1enter = false;
    this.tab2enter = false;
    this.tab3enter = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc2 = 0;
        this.tabfunc = val.sequence + 1;
        if (val.sequence == this.workimports.length) {
          this.tabnumber = 1;
        } else {
          this.tabnumber = 0;
        }
      }
    });
  }

  hoverbuttonclick() {
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 2;
    document.getElementById('btn1')?.classList.remove('vimporthover');
    document.getElementById('btn2')?.classList.remove('cimporthover');
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
  }
  hoverbutton2click() {
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 3;
    document.getElementById('btn1')?.classList.remove('vimporthover');
    document.getElementById('btn2')?.classList.remove('cimporthover');
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
  }
  hoverbutton3click() {
    document.getElementById('btn1')?.classList.remove('vimporthover');
    document.getElementById('btn2')?.classList.remove('cimporthover');
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 0;
  }
  hoverbutton4click() {
    document.getElementById('vclose')?.classList.remove('B15');
    document.getElementById('vprev')?.classList.remove('vprev1');
    document.getElementById('vnext')?.classList.remove('vnext1');
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 6;
  }
  hoverbutton5click() {
    document.getElementById('vclose')?.classList.remove('B15');
    document.getElementById('vprev')?.classList.remove('vprev1');
    document.getElementById('vnext')?.classList.remove('vnext1');
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 0;
  }

  hoverbutton6click() {
    document.getElementById('vclose')?.classList.remove('B15');
    document.getElementById('vprev')?.classList.remove('vprev1');
    document.getElementById('vnext')?.classList.remove('vnext1');
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 1;
  }
  hoverbutton7click() {
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 6;
  }
  hoverbutton8click() {
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 7;
  }
  hoverbutton9click() {
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 8;
  }
  hoverbutton10click() {
    document.getElementById('vsaves')?.classList.remove('B15');
    document.getElementById('vsavennexts')?.classList.remove('B16');
    document.getElementById('vsavencloses')?.classList.remove('B16');
    document.getElementById('vcancel')?.classList.remove('B16');
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 1;
  }
  autonamingdays(id: any) {
    this.workimports.forEach((work: any) => {
      if (work.id == id) {
        if (work.lunch == undefined || work.lunch == 'N/A' || work.lunch == '') {
          this.lunuchtime1 = 0;
          this.lunuchtime2 = 0;
          this.lunuchtime3 = 0;
          this.lunuchtime4 = 0;
        } else {
          var lunchnumber = work.lunch.split(' ')[0];
          var lunchtext = work.lunch.split(' ')[1];
          if (lunchtext == 'Hour' || lunchtext == 'Hours') {
            if (lunchnumber.length == 1) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = lunchnumber;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            } else if (lunchnumber.length == 2) {
              var lunchnumber1 = lunchnumber.toString().split('')[0];
              var lunchnumber2 = lunchnumber.toString().split('')[1];
              this.lunuchtime1 = lunchnumber1;
              this.lunuchtime2 = lunchnumber2;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            } else {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            }
          } else if (lunchtext == 'Minutes' || lunchtext == 'Minute') {
            if (lunchnumber.length == 1) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = lunchnumber;
            } else if (lunchnumber.length == 2) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              var lunchnumber1 = lunchnumber.toString().split('')[0];
              var lunchnumber2 = lunchnumber.toString().split('')[1];
              this.lunuchtime3 = lunchnumber1;
              this.lunuchtime4 = lunchnumber2;
            } else {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            }
          } else {
            this.lunuchtime1 = 0;
            this.lunuchtime2 = 0;
            this.lunuchtime3 = 0;
            this.lunuchtime4 = 0;
          }
        }
        this.setStartHour = work.timeDayStarts;
        this.workScheduleForm = work.hoursWorking.split(' ');
        this.checkedDayInString = this.checkedList.toString();
        // this.checkedList = [];
        // this.checkedLists = [];
        // var week = work.workingDays;
        // var weeksplit = week.split(',');
        // for (var a in weeksplit) {
        //   this.options.forEach((val: any) => {
        //     if (val.value == weeksplit[a]) {
        //       this.checkedLists.push(val);
        //       this.checkedList.push(val.value);
        //       this.checkedDayInString = this.checkedList.toString();
        //     }
        //   });
        // }
      }
    });
    let arr2: any = [];
    this.checkedLists.forEach((val: any) => {
      arr2.push(parseInt(val.id));
    });
    let arr3 = arr2.pop();
    let arr4 = arr2[0];
    let arr1: any = [];
    for (var i = arr4; i < arr3; i++) {
      arr1.push(i);
    }
    let difference = arr1.filter((x: any) => arr2.indexOf(x) === -1);
    let enddate: number = 0;
    let mindate: any;
    let min1date = 0;
    let min2date = 0;
    let min3date = 0;
    let min4date: any;
    min4date = this.setStartHour.split(':')[1];
    this.selectMeridiem = min4date.split(' ')[1];
    min1date = parseInt(min4date.split(' ')[0]) + parseInt(this.lunuchtime3 + this.lunuchtime4);
    if (min1date >= 60) {
      if (min1date == 120) {
        mindate = 0;
        min2date = 2;
      } else {
        min3date = min1date - 60;
        min2date = 1;
        console.log('min:', min3date)
        if (min3date <= 9) {
          mindate = '0' + min3date;

        } else {
          mindate = min3date;
        }
      }
    } else {
      if (min1date <= 9) {
        mindate = '0' + min1date;
      } else {
        mindate = min1date;
      }
      min2date = 0;
    }
    enddate = parseInt(this.setStartHour.split(':')[0]) + parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date;
    if (enddate >= 12) {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " PM";
        } else if ((enddate - 12) <= -1) {
          a = (enddate - 12) + ":" + mindate + " PM"
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " AM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " PM";
        }
      } else {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " AM";
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " PM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " AM";
        }
      }
      if (difference.length == 0) {
        let value1 = '';
        let value2 = '';
        this.checkedLists.forEach((val: any) => {
          if (arr4 == val.id) {
            value1 = val.value;
          }

          if (arr3 == val.id) {
            value2 = val.value;
          }
        });
        this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
      } else {
        this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
      }
    } else {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        a = enddate + ":" + mindate + " AM";
      } else {
        a = enddate + ":" + mindate + " PM";
      }

      if (difference.length == 0) {
        let value1 = '';
        let value2 = '';
        this.checkedLists.forEach((val: any) => {
          if (arr4 == val.id) {
            value1 = val.value;
          }

          if (arr3 == val.id) {
            value2 = val.value;
          }
        });
        this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
      } else {
        this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
      }
    }
    console.log(this.naming);

  }
  autonamingtime(id: any, time: any) {
    this.workimports.forEach((work: any) => {
      if (work.id == id) {
        if (work.lunch == undefined || work.lunch == 'N/A' || work.lunch == '') {
          this.lunuchtime1 = 0;
          this.lunuchtime2 = 0;
          this.lunuchtime3 = 0;
          this.lunuchtime4 = 0;
        } else {
          var lunchnumber = work.lunch.split(' ')[0];
          var lunchtext = work.lunch.split(' ')[1];
          if (lunchtext == 'Hour' || lunchtext == 'Hours') {
            if (lunchnumber.length == 1) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = lunchnumber;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            } else if (lunchnumber.length == 2) {
              var lunchnumber1 = lunchnumber.toString().split('')[0];
              var lunchnumber2 = lunchnumber.toString().split('')[1];
              this.lunuchtime1 = lunchnumber1;
              this.lunuchtime2 = lunchnumber2;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            } else {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            }
          } else if (lunchtext == 'Minutes' || lunchtext == 'Minute') {
            if (lunchnumber.length == 1) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = lunchnumber;
            } else if (lunchnumber.length == 2) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              var lunchnumber1 = lunchnumber.toString().split('')[0];
              var lunchnumber2 = lunchnumber.toString().split('')[1];
              this.lunuchtime3 = lunchnumber1;
              this.lunuchtime4 = lunchnumber2;
            } else {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            }
          } else {
            this.lunuchtime1 = 0;
            this.lunuchtime2 = 0;
            this.lunuchtime3 = 0;
            this.lunuchtime4 = 0;
          }
        }
        this.setStartHour = time;
        this.workScheduleForm = work.hoursWorking.split(' ');
        this.checkedList = [];
        this.checkedLists = [];
        var week = work.workingDays;
        var weeksplit = week.split(',');
        for (var a in weeksplit) {
          this.options.forEach((val: any) => {
            if (val.value == weeksplit[a]) {
              this.checkedLists.push(val);
              this.checkedList.push(val.value);
              this.checkedDayInString = this.checkedList.toString();
            }
          });
        }
      }
    });

    let arr2: any = [];
    this.checkedLists.forEach((val: any) => {
      arr2.push(parseInt(val.id));
    });
    let arr3 = arr2.pop();
    let arr4 = arr2[0];
    let arr1: any = [];
    for (var i = arr4; i < arr3; i++) {
      arr1.push(i);
    }
    let difference = arr1.filter((x: any) => arr2.indexOf(x) === -1);
    let enddate: number = 0;
    let mindate: any;
    let min1date = 0;
    let min2date = 0;
    let min3date = 0;
    let min4date: any;
    min4date = this.setStartHour.split(':')[1];
    this.selectMeridiem = min4date.split(' ')[1];
    min1date = parseInt(min4date.split(' ')[0]) + parseInt(this.lunuchtime3 + this.lunuchtime4);
    if (min1date >= 60) {
      if (min1date == 120) {
        mindate = 0;
        min2date = 2;
      } else {
        min3date = min1date - 60;
        min2date = 1;
        console.log('min:', min3date)
        if (min3date <= 9) {
          mindate = '0' + min3date;

        } else {
          mindate = min3date;
        }
      }
    } else {
      if (min1date <= 9) {
        mindate = '0' + min1date;
      } else {
        mindate = min1date;
      }
      min2date = 0;
    }
    enddate = parseInt(this.setStartHour.split(':')[0]) + parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date;
    if (enddate >= 12) {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " PM";
        } else if ((enddate - 12) <= -1) {
          a = (enddate - 12) + ":" + mindate + " PM"
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " AM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " PM";
        }
      } else {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " AM";
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " PM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " AM";
        }
      }
      if (difference.length == 0) {
        let value1 = '';
        let value2 = '';
        this.checkedLists.forEach((val: any) => {
          if (arr4 == val.id) {
            value1 = val.value;
          }

          if (arr3 == val.id) {
            value2 = val.value;
          }
        });
        this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
      } else {
        this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
      }
    } else {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        a = enddate + ":" + mindate + " AM";
      } else {
        a = enddate + ":" + mindate + " PM";
      }

      if (difference.length == 0) {
        let value1 = '';
        let value2 = '';
        this.checkedLists.forEach((val: any) => {
          if (arr4 == val.id) {
            value1 = val.value;
          }

          if (arr3 == val.id) {
            value2 = val.value;
          }
        });
        this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
      } else {
        this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
      }
    }
    console.log(this.naming);
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.workScheduleName = this.naming;
        val.name = this.naming;
        val.vname = this.naming;
        val.tname = this.naming;
      }
    });
    //console.log("id",id,workname)
    let updateCon = {
      "id": id,
      "workScheduleName": this.naming,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.workimports=val;
    });
  }
  autonaminghour(id: any) {
    this.workimports.forEach((work: any) => {
      if (work.id == id) {
        if (work.lunch == undefined || work.lunch == 'N/A' || work.lunch == '') {
          this.lunuchtime1 = 0;
          this.lunuchtime2 = 0;
          this.lunuchtime3 = 0;
          this.lunuchtime4 = 0;
        } else {
          var lunchnumber = work.lunch.split(' ')[0];
          var lunchtext = work.lunch.split(' ')[1];
          if (lunchtext == 'Hour' || lunchtext == 'Hours') {
            if (lunchnumber.length == 1) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = lunchnumber;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            } else if (lunchnumber.length == 2) {
              var lunchnumber1 = lunchnumber.toString().split('')[0];
              var lunchnumber2 = lunchnumber.toString().split('')[1];
              this.lunuchtime1 = lunchnumber1;
              this.lunuchtime2 = lunchnumber2;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            } else {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            }
          } else if (lunchtext == 'Minutes' || lunchtext == 'Minute') {
            if (lunchnumber.length == 1) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = lunchnumber;
            } else if (lunchnumber.length == 2) {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              var lunchnumber1 = lunchnumber.toString().split('')[0];
              var lunchnumber2 = lunchnumber.toString().split('')[1];
              this.lunuchtime3 = lunchnumber1;
              this.lunuchtime4 = lunchnumber2;
            } else {
              this.lunuchtime1 = 0;
              this.lunuchtime2 = 0;
              this.lunuchtime3 = 0;
              this.lunuchtime4 = 0;
            }
          } else {
            this.lunuchtime1 = 0;
            this.lunuchtime2 = 0;
            this.lunuchtime3 = 0;
            this.lunuchtime4 = 0;
          }
        }
        this.setStartHour = work.time;
        this.workScheduleForm = work.hour.split(' ');
        this.checkedList = [];
        this.checkedLists = [];
        var week = work.workingDays;
        var weeksplit = week.split(',');
        for (var a in weeksplit) {
          this.options.forEach((val: any) => {
            if (val.value == weeksplit[a]) {
              this.checkedLists.push(val);
              this.checkedList.push(val.value);
              this.checkedDayInString = this.checkedList.toString();
            }
          });
        }
      }
    });
    let arr2: any = [];
    this.checkedLists.forEach((val: any) => {
      arr2.push(parseInt(val.id));
    });
    let arr3 = arr2.pop();
    let arr4 = arr2[0];
    let arr1: any = [];
    for (var i = arr4; i < arr3; i++) {
      arr1.push(i);
    }
    let difference = arr1.filter((x: any) => arr2.indexOf(x) === -1);
    let enddate: number = 0;
    let mindate: any;
    let min1date = 0;
    let min2date = 0;
    let min3date = 0;
    let min4date: any;
    min4date = this.setStartHour.split(':')[1];
    this.selectMeridiem = min4date.split(' ')[1];
    min1date = parseInt(min4date.split(' ')[0]) + parseInt(this.lunuchtime3 + this.lunuchtime4);
    if (min1date >= 60) {
      if (min1date == 120) {
        mindate = 0;
        min2date = 2;
      } else {
        min3date = min1date - 60;
        min2date = 1;
        console.log('min:', min3date)
        if (min3date <= 9) {
          mindate = '0' + min3date;

        } else {
          mindate = min3date;
        }
      }
    } else {
      if (min1date <= 9) {
        mindate = '0' + min1date;
      } else {
        mindate = min1date;
      }
      min2date = 0;
    }
    enddate = parseInt(this.setStartHour.split(':')[0]) + parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date;
    if (enddate >= 12) {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " PM";
        } else if ((enddate - 12) <= -1) {
          a = (enddate - 12) + ":" + mindate + " PM"
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " AM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " PM";
        }
      } else {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " AM";
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " PM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " AM";
        }
      }
      if (difference.length == 0) {
        let value1 = '';
        let value2 = '';
        this.checkedLists.forEach((val: any) => {
          if (arr4 == val.id) {
            value1 = val.value;
          }

          if (arr3 == val.id) {
            value2 = val.value;
          }
        });
        this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
      } else {
        this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
      }
    } else {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        a = enddate + ":" + mindate + " AM";
      } else {
        a = enddate + ":" + mindate + " PM";
      }

      if (difference.length == 0) {
        let value1 = '';
        let value2 = '';
        this.checkedLists.forEach((val: any) => {
          if (arr4 == val.id) {
            value1 = val.value;
          }

          if (arr3 == val.id) {
            value2 = val.value;
          }
        });
        this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
      } else {
        this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
      }
    }
    console.log(this.naming);
    this.workimports.forEach((val: any) => {
      if (val.id == id) {
        val.workScheduleName = this.naming;
        val.name = this.naming;
        val.vname = this.naming;
        val.tname = this.naming;
      }
    });
    //console.log("id",id,workname)
    let updateCon = {
      "id": id,
      "workScheduleName": this.naming,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.workimports=val;
    });
  }
  autonamingview() {
    this.viewrecords.forEach((work: any) => {

      if (work.vlunch == undefined || work.vlunch == 'N/A' || work.vlunch == '') {
        this.lunuchtime1 = 0;
        this.lunuchtime2 = 0;
        this.lunuchtime3 = 0;
        this.lunuchtime4 = 0;
      } else {
        var lunchnumber = work.vlunch.split(' ')[0];
        var lunchtext = work.vlunch.split(' ')[1];
        if (lunchtext == 'Hour' || lunchtext == 'Hours') {
          if (lunchnumber.length == 1) {
            this.lunuchtime1 = 0;
            this.lunuchtime2 = lunchnumber;
            this.lunuchtime3 = 0;
            this.lunuchtime4 = 0;
          } else if (lunchnumber.length == 2) {
            var lunchnumber1 = lunchnumber.toString().split('')[0];
            var lunchnumber2 = lunchnumber.toString().split('')[1];
            this.lunuchtime1 = lunchnumber1;
            this.lunuchtime2 = lunchnumber2;
            this.lunuchtime3 = 0;
            this.lunuchtime4 = 0;
          } else {
            this.lunuchtime1 = 0;
            this.lunuchtime2 = 0;
            this.lunuchtime3 = 0;
            this.lunuchtime4 = 0;
          }
        } else if (lunchtext == 'Minutes' || lunchtext == 'Minute') {
          if (lunchnumber.length == 1) {
            this.lunuchtime1 = 0;
            this.lunuchtime2 = 0;
            this.lunuchtime3 = 0;
            this.lunuchtime4 = lunchnumber;
          } else if (lunchnumber.length == 2) {
            this.lunuchtime1 = 0;
            this.lunuchtime2 = 0;
            var lunchnumber1 = lunchnumber.toString().split('')[0];
            var lunchnumber2 = lunchnumber.toString().split('')[1];
            this.lunuchtime3 = lunchnumber1;
            this.lunuchtime4 = lunchnumber2;
          } else {
            this.lunuchtime1 = 0;
            this.lunuchtime2 = 0;
            this.lunuchtime3 = 0;
            this.lunuchtime4 = 0;
          }
        } else {
          this.lunuchtime1 = 0;
          this.lunuchtime2 = 0;
          this.lunuchtime3 = 0;
          this.lunuchtime4 = 0;
        }
      }
      this.setStartHour = work.vtime;
      this.workScheduleForm = work.vhour.split(' ');
      this.checkedList = [];
      this.checkedLists = [];
      var week = work.vdays;
      var weeksplit = week.split(',');
      for (var a in weeksplit) {
        this.options.forEach((val: any) => {
          if (val.value == weeksplit[a]) {
            this.checkedLists.push(val);
            this.checkedList.push(val.value);
            this.checkedDayInString = this.checkedList.toString();
          }
        });
      }
    });
    let arr2: any = [];
    this.checkedLists.forEach((val: any) => {
      arr2.push(parseInt(val.id));
    });
    let arr3 = arr2.pop();
    let arr4 = arr2[0];
    let arr1: any = [];
    for (var i = arr4; i < arr3; i++) {
      arr1.push(i);
    }
    let difference = arr1.filter((x: any) => arr2.indexOf(x) === -1);
    let enddate: number = 0;
    let mindate: any;
    let min1date = 0;
    let min2date = 0;
    let min3date = 0;
    let min4date: any;
    min4date = this.setStartHour.split(':')[1];
    this.selectMeridiem = min4date.split(' ')[1];
    min1date = parseInt(min4date.split(' ')[0]) + parseInt(this.lunuchtime3 + this.lunuchtime4);
    if (min1date >= 60) {
      if (min1date == 120) {
        mindate = 0;
        min2date = 2;
      } else {
        min3date = min1date - 60;
        min2date = 1;
        console.log('min:', min3date)
        if (min3date <= 9) {
          mindate = '0' + min3date;

        } else {
          mindate = min3date;
        }
      }
    } else {
      if (min1date <= 9) {
        mindate = '0' + min1date;
      } else {
        mindate = min1date;
      }
      min2date = 0;
    }
    enddate = parseInt(this.setStartHour.split(':')[0]) + parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date;
    if (enddate >= 12) {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " PM";
        } else if ((enddate - 12) <= -1) {
          a = (enddate - 12) + ":" + mindate + " PM"
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " AM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " PM";
        }
      } else {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " AM";
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " PM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " AM";
        }
      }
      if (difference.length == 0) {
        let value1 = '';
        let value2 = '';
        this.checkedLists.forEach((val: any) => {
          if (arr4 == val.id) {
            value1 = val.value;
          }

          if (arr3 == val.id) {
            value2 = val.value;
          }
        });
        this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
      } else {
        this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
      }
    } else {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        a = enddate + ":" + mindate + " AM";
      } else {
        a = enddate + ":" + mindate + " PM";
      }

      if (difference.length == 0) {
        let value1 = '';
        let value2 = '';
        this.checkedLists.forEach((val: any) => {
          if (arr4 == val.id) {
            value1 = val.value;
          }

          if (arr3 == val.id) {
            value2 = val.value;
          }
        });
        this.naming = this.checkedLists.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' to ' + a;
      } else {
        this.naming = this.checkedLists.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' to ' + a;
      }
    }
    console.log(this.naming);
    this.viewrecords.forEach((val: any) => {
      val.vname = this.naming;
    });
    // console.log("id",id,workname)
    // let updateCon = {
    //   "id": id,
    //   "workScheduleName": this.naming,
    // };
    // this.library.update(updateCon).subscribe((val) => {
    //   console.log("updated");
    //   this.workimports=val;
    // });
  }
  onworkaddclick() {
    this.addpopup = false;
  }
  vweekswitch() {
    if (this.viewweekswitch == false) {
      this.viewweekswitch = true;
      this.viewrecords.forEach((val: any) => {
        this.edit7(val.id, val.vname, val.vdayvalue);
      });
    } else {
      this.viewweekswitch = false;
      this.done7();
    }
  }
  vdayswitch() {
    if (this.viewdayswitch == false) {
      this.viewdayswitch = true;
      this.viewrecords.forEach((val: any) => {
        this.edit6(val.id, val.vname, val.vdays);
      });
    } else {
      this.viewdayswitch = false;
      this.viewrecords.forEach((val: any) => {
        this.done6(val.id);
      });
    }
  }
  vtimeswitch() {
    if (this.viewtimeswitch == false) {
      this.viewtimeswitch = true;
      this.viewrecords.forEach((val: any) => {
        this.edit8(val.id, val.vname, val.vtime);
      });
    } else {
      this.viewtimeswitch = false;
      this.done8();
    }
  }
  vhourswitch() {
    if (this.viewhourswitch == false) {
      this.viewhourswitch = true;
      this.viewrecords.forEach((val: any) => {
        this.edit9(val.id, val.vname, val.vhour);
      });
    } else {
      this.viewhourswitch = false;
      this.done9();
    }
  }
  vlunchswitch() {
    if (this.viewlunchswitch == false) {
      this.viewlunchswitch = true;
      this.viewrecords.forEach((val: any) => {
        this.edit11(val.id, val.vname, val.vlunch);
      });
    } else {
      this.viewlunchswitch = false;
      this.done11();
    }
  }


  // viewpopup
  viewweekdown() {
    if (this.viewmovingup == true) {
      this.viewrecords.forEach((view: any) => {
        // this.movingup2 = false;
        this.viewdaysnumber++;
        document.getElementById('vcanbtn' + view.id)?.classList.remove('canbtnhover');
        document.getElementById('vappbtn' + view.id)?.classList.remove('clobtnhover');
        document.getElementById('vclobtn' + view.id)?.classList.remove('canbtnhover');
        document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.classList.add('subli1checkboxweek');
        document.getElementById('viewweektext' + view.id + this.viewdaysnumber)?.classList.add('subli1textdownarrow');
        this.options.forEach((val: any) => {
          if (val.id != this.viewdaysnumber) {
            document.getElementById('viewweekcheckbox' + view.id + val.id)?.classList.remove('subli1checkboxweek');
            document.getElementById('viewweektext' + view.id + val.id)?.classList.remove('subli1textdownarrow');
          }
        });

        if (this.viewweekactive == false) {
          if (this.viewdaysnumber == 8) {
            this.options.forEach((val: any) => {
              document.getElementById('viewweekcheckbox' + view.id + val.id)?.classList.remove('subli1checkboxweek');
              document.getElementById('viewweektext' + view.id + val.id)?.classList.remove('subli1textdownarrow');
              document.getElementById('selectallviewcheckbox' + view.id)?.classList.add('subli1checkboxweek');
              document.getElementById('selectallviewtext' + view.id)?.classList.add('subli1textdownarrow');

            });

          }
          if (this.viewdaysnumber >= 9) {
            this.viewdaysnumber = 0;
            document.getElementById('selectallviewcheckbox' + view.id)?.classList.remove('subli1checkboxweek');
            document.getElementById('selectallviewtext' + view.id)?.classList.remove('subli1textdownarrow');
            document.getElementById('vclobtn' + view.id)?.classList.add('canbtnhover');
          }
        } else {
          if (this.viewdaysnumber == 8) {
            this.viewdaysnumber = 9;
            document.getElementById('selectallviewcheckbox' + view.id)?.classList.remove('subli1checkboxweek');
            document.getElementById('selectallviewtext' + view.id)?.classList.remove('subli1textdownarrow');
            document.getElementById('vappbtn' + view.id)?.classList.add('clobtnhover');
          }
          if (this.viewdaysnumber >= 9) {
            this.viewdaysnumber = 0;
            document.getElementById('selectallviewcheckbox' + view.id)?.classList.remove('subli1checkboxweek');
            document.getElementById('selectallviewtext' + view.id)?.classList.remove('subli1textdownarrow');
            document.getElementById('vappbtn' + view.id)?.classList.add('clobtnhover');
          }

        }
      });
      console.log(this.viewdaysnumber)
    }
  }
  viewweekup() {
    if (this.viewmovingup == true) {
      this.viewrecords.forEach((view: any) => {
        // this.movingup2 = false;
        this.viewdaysnumber--;
        document.getElementById('vcanbtn' + view.id)?.classList.remove('canbtnhover');
        document.getElementById('vappbtn' + view.id)?.classList.remove('clobtnhover');
        document.getElementById('vclobtn' + view.id)?.classList.remove('canbtnhover');
        document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.classList.add('subli1checkboxweek');
        document.getElementById('viewweektext' + view.id + this.viewdaysnumber)?.classList.add('subli1textdownarrow');
        this.options.forEach((val: any) => {
          if (val.id != this.viewdaysnumber) {
            document.getElementById('viewweekcheckbox' + view.id + val.id)?.classList.remove('subli1checkboxweek');
            document.getElementById('viewweektext' + view.id + val.id)?.classList.remove('subli1textdownarrow');
            document.getElementById('selectallviewcheckbox' + view.id)?.classList.remove('subli1checkboxweek');
            document.getElementById('selectallviewtext' + view.id)?.classList.remove('subli1textdownarrow');
          }
        });

        if (this.viewweekactive == false) {
          if (this.viewdaysnumber < 1) {
            document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.classList.add('subli1checkboxweek');
            document.getElementById('viewweektext' + view.id + this.viewdaysnumber)?.classList.add('subli1textdownarrow');
            this.viewdaysnumber = 9;
          }
          if (this.viewdaysnumber == 8 || this.viewdaysnumber == 0) {
            document.getElementById('selectallviewcheckbox' + view.id)?.classList.add('subli1checkboxweek');
            document.getElementById('selectallviewtext' + view.id)?.classList.add('subli1textdownarrow');
            document.getElementById('vclobtn' + view.id)?.classList.remove('canbtnhover');
            document.getElementById('vappbtn' + view.id)?.classList.remove('clobtnhover');
          }
          if (this.viewdaysnumber == 9) {
            document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.classList.remove('subli1checkboxweek');
            document.getElementById('viewweektext' + view.id + this.viewdaysnumber)?.classList.remove('subli1textdownarrow');
            document.getElementById('vclobtn' + view.id)?.classList.add('canbtnhover');
          }
        } else {
          if (this.viewdaysnumber < 1) {
            document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.classList.add('subli1checkboxweek');
            document.getElementById('viewweektext' + view.id + this.viewdaysnumber)?.classList.add('subli1textdownarrow');
            this.viewdaysnumber = 9;
          }
          if (this.viewdaysnumber == 8) {
            document.getElementById('selectallviewcheckbox' + view.id)?.classList.add('subli1checkboxweek');
            document.getElementById('selectallviewtext' + view.id)?.classList.add('subli1textdownarrow');
            document.getElementById('vclobtn' + view.id)?.classList.remove('canbtnhover');
            document.getElementById('vappbtn' + view.id)?.classList.remove('clobtnhover');
            document.getElementById('vcanbtn' + view.id)?.classList.remove('canbtnhover');
          }
          if (this.viewdaysnumber == 9) {
            document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.classList.remove('subli1checkboxweek');
            document.getElementById('viewweektext' + view.id + this.viewdaysnumber)?.classList.remove('subli1textdownarrow');
            document.getElementById('vappbtn' + view.id)?.classList.add('clobtnhover');
          }
        }
      });
      console.log(this.viewdaysnumber)
    }

  }
  viewweekright() {
    if (this.viewmovingup == true && this.viewweekactive == true) {
      this.viewrecords.forEach((view: any) => {
        this.viewdaysnumber = 8;
        document.getElementById('vappbtn' + view.id)?.classList.add('clobtnhover');
        document.getElementById('vcanbtn' + view.id)?.classList.remove('canbtnhover');
      });
    }
  }
  viewweekleft() {
    if (this.viewmovingup == true && this.viewweekactive == true) {
      this.viewrecords.forEach((view: any) => {
        this.viewdaysnumber = 9;
        document.getElementById('vappbtn' + view.id)?.classList.remove('clobtnhover');
        document.getElementById('vcanbtn' + view.id)?.classList.add('canbtnhover');
      });
    }
  }
  viewapplyweek() {
    if (this.viewmovingup == true) {
      this.viewrecords.forEach((view: any) => {
        if (this.viewdaysnumber == 1) {
          document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.click();
        } else if (this.viewdaysnumber == 2) {
          document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.click();
        } else if (this.viewdaysnumber == 3) {
          document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.click();
        } else if (this.viewdaysnumber == 4) {
          document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.click();
        } else if (this.viewdaysnumber == 5) {
          document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.click();
        } else if (this.viewdaysnumber == 6) {
          document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.click();
        } else if (this.viewdaysnumber == 7) {
          document.getElementById('viewweekcheckbox' + view.id + this.viewdaysnumber)?.click();
        } else if (this.viewdaysnumber == 8 || this.viewdaysnumber == 0) {
          if (this.viewweekactive == true && this.viewmovingup == true) {
            document.getElementById('vappbtn' + view.id)?.click();
            console.log('apply clicked')
          } else {
            document.getElementById('selectallviewcheckbox' + view.id)?.click();
          }
        } else if (this.viewdaysnumber == 9) {
          console.log('its 9')
          if (this.viewweekactive == true && this.viewmovingup == true) {
            document.getElementById('vcanbtn' + view.id)?.click();
            console.log('cancel clicked')
            document.getElementById('vclobtn' + view.id)?.classList.add('canbtnhover');
          } else {
            console.log('close clicked')
            document.getElementById('vclobtn' + view.id)?.click();
          }
        } else {

        }
      });
    }

  }
  viewedittime() {
    this.close1 = true;
    this.close2 = false;
    this.viewtime1switch = true;
    this.viewmoving2up = false;
    this.activeon = true;
    document.getElementById('viewcreatetime')?.classList.remove('hide');
    document.getElementById('viewrowtime')?.classList.add('extraheight');
    this.clocktext = '';
    this.hoursvalue2 = '';
    this.hoursvalue3 = '';
    this.hoursvalue1 = '';
    this.hoursvalue4 = '';
    this.hoursvalue5 = '';
    this.hoursvalue6 = '';
    this.hoursvalue7 = '';
    var idvalue = 0;
    this.viewrecords.forEach((value: any) => {
      value.id = idvalue;
    });
    this.workimports.forEach((val: any) => {
      if (val.id == idvalue) {
        val.clocktext = '';
        val.clockhour = '';
        val.clockmin = '';
      }
    });
    document.getElementById('viewrow1time')?.focus();
  }
  viewedithour() {
    this.activeon = true;
    this.close1 = true;
    this.close2 = false;
    this.viewhour1switch = true;
    this.viewmoving3up = false;
    document.getElementById('viewcreatehour')?.classList.remove('hide');
    var idvalue = 0;
    this.viewrecords.forEach((value: any) => {
      value.id = idvalue;
    });
    this.hournumberings = 0;
    this.hourssnumber = [];
    this.hourssnumbera = [];
    this.hourssnumberb = [];
    for (let i = 1; i <= 24; i++) {
      this.hourvalues.forEach((val: any) => {
        if (val.hournumber == i) {
          this.hourssnumbera.push(i);
        }
      });
    }
    for (let i = 1; i <= 24; i++) {
      this.hourssnumberb.push(i);
    }

    this.hourssnumber = this.hourssnumberb.filter((x: any) => !this.hourssnumbera.includes(x))
    this.activeon = true;
    this.hournumber = idvalue;
    document.getElementById('viewrow1hour')?.focus();
    this.workimports.forEach((val: any) => {
      if (val.id == idvalue) {
        val.hoursnumber = this.hourssnumber[0];
      }
    });
  }
  vieweditlunch() {
    this.close1 = true;
    this.close2 = false;
    this.viewlunch1switch = true;
    this.activeon = true;
    this.hoursvalue4 = '';
    this.clocktext = '';
    this.hoursvalue2 = '';
    this.hoursvalue1 = '';
    this.hoursvalue3 = '';
    document.getElementById('viewcreatelunch')?.classList.remove('hide');
    document.getElementById('viewrow1lunch')?.focus();
  }
  viewedittimeclose() {
    this.close1 = false;
    this.viewtime3switch = false;
    this.close2 = true;
    this.viewtime1switch = false;
    this.viewtime2switch = false;
    this.viewmoving2up = true;
    this.activeon = false;
    document.getElementById('viewcreatetime')?.classList.add('hide');
    document.getElementById('viewrowtime')?.classList.remove('extraheight');
  }
  viewedithourclose() {
    this.close1 = false;
    this.close2 = true;
    this.activeon = false;
    this.viewhour1switch = false;
    this.viewmoving3up = true;
    document.getElementById('viewcreatehour')?.classList.add('hide');
  }
  vieweditlunchclose() {
    this.close1 = false;
    this.close2 = true;
    this.activeon = false;
    this.viewlunch1switch = false;
    this.viewlunch2switch = false;
    document.getElementById('viewcreatelunch')?.classList.add('hide');
  }
  viewdaysup() {
    if (this.viewmoving1up == true) {
      this.viewdaystartnumber--;
      console.log(this.viewdaystartnumber);
      if (this.viewdaystartnumber < 1) {
        this.viewdaystartnumber = 7;
      }
      this.viewrecords.forEach((value: any) => {
        this.days.forEach((val) => {
          if (this.viewdaystartnumber == val.idday) {
            document.getElementById('vhoverday' + value.id + val.idday)?.classList.add('hoverday');
          } else {
            document.getElementById('vhoverday' + value.id + val.idday)?.classList.remove('hoverday');
            document.getElementById('vworkingday' + value.id + val.idday)?.classList.add('active1');
          }
        });
      });

    } else {

    }

  }
  viewdaysdown() {
    if (this.viewmoving1up == true) {

      this.viewdaystartnumber++;
      console.log(this.viewdaystartnumber);
      if (this.viewdaystartnumber > 7) {
        this.viewdaystartnumber = 1;
      }
      this.viewrecords.forEach((value: any) => {
        this.days.forEach((val) => {
          if (this.viewdaystartnumber == val.idday) {
            document.getElementById('vhoverday' + value.id + val.idday)?.classList.add('hoverday');
          } else {
            document.getElementById('vhoverday' + value.id + val.idday)?.classList.remove('hoverday');
            document.getElementById('vworkingday' + value.id + val.idday)?.classList.add('active1');
          }
        });
      });
    } else {

    }

  }
  viewdayclick() {
    if (this.viewmoving1up == true) {
      this.viewrecords.forEach((value: any) => {
        this.days.forEach((val: any) => {
          if (this.viewdaystartnumber == val.idday) {
            this.viewactive();
            this.vupdatedayvalue(value.id, val.day)
            this.done7();
          }
        });
      });
    }
  }
  viewtimeup() {
    if (this.viewmoving2up == true) {
      this.viewtimenumber--;
      console.log(this.viewtimenumber);
      this.viewrecords.forEach((value: any) => {
        if (this.viewtimenumber < 1) {
          this.viewtimenumber = 0;
          if (this.viewtimenumber == 0) {
            document.getElementById('viewaddnewtime')?.classList.add('hoverday');
            this.timevalues.forEach((val: any) => {
              if (val.sequence == 1) {
                document.getElementById('vhovertime' + value.id + val.id)?.classList.remove('hoverday');
              }
              document.getElementById('vtime' + value.id + val.id)?.classList.add('active1');
            });
          }
        }

        this.timevalues.forEach((val: any) => {
          if (this.viewtimenumber == val.sequence) {
            document.getElementById('vhovertime' + value.id + val.id)?.classList.add('hoverday');
          } else {
            document.getElementById('vhovertime' + value.id + val.id)?.classList.remove('hoverday');
            document.getElementById('vtime' + value.id + val.id)?.classList.add('active1');
          }
        });
      });
    } else {

    }

  }
  viewtimedown() {
    if (this.viewmoving2up == true) {
      this.viewtimenumber++;
      console.log(this.viewtimenumber);
      this.viewrecords.forEach((value: any) => {
        if (this.viewtimenumber > this.timevalues.length) {
          this.viewtimenumber = this.timevalues.length;
        }
        this.timevalues.forEach((val: any) => {
          if (this.viewtimenumber == val.sequence) {
            document.getElementById('vhovertime' + value.id + val.id)?.classList.add('hoverday');
          } else {
            document.getElementById('vhovertime' + value.id + val.id)?.classList.remove('hoverday');
            document.getElementById('vtime' + value.id + val.id)?.classList.add('active1');
            document.getElementById('viewaddnewtime')?.classList.remove('hoverday');
          }
        });
      });
    } else {

    }
  }
  viewtimeclick() {
    if (this.viewmoving2up == true) {
      this.viewrecords.forEach((value: any) => {
        this.timevalues.forEach((val: any) => {
          if (this.viewtimenumber == val.sequence) {
            this.viewactive();
            this.vupdatetime(value.id, val.selectedValue)
            this.done8();
          }
        });
      });
    }
  }
  viewhovertimeclick() {
    if (this.viewmoving2up == true && this.viewtimenumber == 0) {
      this.viewedittime();
    }
  }
  viewhourup() {
    if (this.viewmoving3up == true) {
      this.viewhournumber--;
      console.log(this.viewhournumber);
      this.viewrecords.forEach((value: any) => {
        if (this.viewhournumber < 1) {
          this.viewhournumber = 0;
          if (this.viewhournumber == 0) {
            document.getElementById('viewaddnewhour')?.classList.add('hoverday');
            this.hourvalues.forEach((val: any) => {
              if (val.sequence == 1) {
                document.getElementById('vhoverhour' + value.id + val.id)?.classList.remove('hoverday');
              }
              document.getElementById('vhour' + value.id + val.id)?.classList.add('active1');
            });
          }
        }
        this.hourvalues.forEach((val: any) => {
          if (this.viewhournumber == val.sequence) {
            document.getElementById('vhoverhour' + value.id + val.id)?.classList.add('hoverday');
          } else {
            document.getElementById('vhoverhour' + value.id + val.id)?.classList.remove('hoverday');
            document.getElementById('vhour' + value.id + val.id)?.classList.add('active1');
          }
        });
      });
    }

  }
  viewhourdown() {
    if (this.viewmoving3up == true) {
      this.viewhournumber++;
      console.log(this.viewhournumber);
      this.viewrecords.forEach((value: any) => {
        if (this.viewhournumber > this.hourvalues.length) {
          this.viewhournumber = this.hourvalues.length;
        }
        this.hourvalues.forEach((val: any) => {
          if (this.viewhournumber == val.sequence) {
            document.getElementById('vhoverhour' + value.id + val.id)?.classList.add('hoverday');
          } else {
            document.getElementById('viewaddnewhour')?.classList.remove('hoverday');
            document.getElementById('vhoverhour' + value.id + val.id)?.classList.remove('hoverday');
            document.getElementById('vhour' + value.id + val.id)?.classList.add('active1');
          }
        });
      });
    }

  }

  viewhourclick() {
    if (this.viewmoving3up == true) {
      this.viewrecords.forEach((value: any) => {
        this.hourvalues.forEach((val: any) => {
          if (this.viewhournumber == val.sequence) {
            this.viewactive();
            this.vupdatehour(value.id, val.selectedValue)
            this.done9();
          }
        });
      });
    }
  }
  viewhoverhourclick() {
    if (this.viewmoving3up == true && this.viewhournumber == 0) {
      this.viewedithour();
    }
  }
  viewincrementkey() {
    if (this.viewhour1switch == true) {
      var idvalue = 0;
      this.viewrecords.forEach((value: any) => {
        value.id = idvalue;
      });
      this.increment(idvalue);
      this.newhour();
    }

  }

  viewdecrementkey() {
    if (this.viewhour1switch == true) {
      var idvalue = 0;
      this.viewrecords.forEach((value: any) => {
        value.id = idvalue;
      });
      this.decrement(idvalue);
      this.newhour();
    }

  }
  viewlunchup() {
    if (this.viewmoving4up == true) {
      this.viewlunchnumber--;
      console.log(this.viewlunchnumber);
      this.viewrecords.forEach((value: any) => {
        if (this.viewlunchnumber <= 0) {
          if (this.viewlunchnumber <= -1) {
            this.viewlunchnumber = -1;
            document.getElementById('viewaddnewlunch')?.classList.add('hoverday');
            document.getElementById('viewaddnewlunch')?.classList.remove('active1');
            document.getElementById('naviewlunch')?.classList.remove('hoverday');
            document.getElementById('naviewlunch')?.classList.add('active1');
          } else if (this.viewlunchnumber == 0) {
            document.getElementById('viewaddnewlunch')?.classList.remove('hoverday');
            document.getElementById('naviewlunch')?.classList.add('hoverday');
            document.getElementById('naviewlunch')?.classList.remove('active1');
            document.getElementById('viewaddnewlunch')?.classList.add('active1');
            this.lunchevalues.forEach((val: any) => {
              if (val.sequence == 1) {
                document.getElementById('vhoverlunch' + value.id + val.id)?.classList.remove('hoverday');
              }
              document.getElementById('vlunch' + value.id + val.id)?.classList.add('active1');
            });
          }
        } else {
          this.lunchevalues.forEach((val: any) => {
            if (this.viewlunchnumber == val.sequence) {

              document.getElementById('vhoverlunch' + value.id + val.id)?.classList.add('hoverday');
            } else {
              document.getElementById('naviewlunch')?.classList.remove('hoverday');
              document.getElementById('naviewlunch')?.classList.add('active1');
              document.getElementById('vhoverlunch' + value.id + val.id)?.classList.remove('hoverday');
              document.getElementById('vlunch' + value.id + val.id)?.classList.add('active1');
            }
          });
        }


      });
    } else {

    }

  }
  viewlunchdown() {
    if (this.viewmoving4up == true) {
      this.viewlunchnumber++;
      console.log(this.viewlunchnumber);
      this.viewrecords.forEach((value: any) => {
        if (this.viewlunchnumber == 0) {
          document.getElementById('viewaddnewlunch')?.classList.remove('hoverday');
          document.getElementById('naviewlunch')?.classList.add('hoverday');
          document.getElementById('naviewlunch')?.classList.remove('active1');
          document.getElementById('viewaddnewlunch')?.classList.add('active1');
          this.lunchevalues.forEach((val: any) => {
            if (val.sequence == 1) {
              document.getElementById('vhoverlunch' + value.id + val.id)?.classList.remove('hoverday');
            }
            document.getElementById('vlunch' + value.id + val.id)?.classList.add('active1');
          });
        }
        if (this.viewlunchnumber > this.lunchevalues.length) {
          this.viewlunchnumber = this.lunchevalues.length;
        }
        this.lunchevalues.forEach((val: any) => {
          if (this.viewlunchnumber == val.sequence) {
            document.getElementById('naviewlunch')?.classList.remove('hoverday');
            document.getElementById('naviewlunch')?.classList.add('active1');
            document.getElementById('vhoverlunch' + value.id + val.id)?.classList.add('hoverday');
          } else {
            document.getElementById('vhoverlunch' + value.id + val.id)?.classList.remove('hoverday');
            document.getElementById('vlunch' + value.id + val.id)?.classList.add('active1');
            document.getElementById('naviewlunch')?.classList.remove('hoverday');
          }
        });
      });
    } else {

    }

  }
  viewlunchclick() {
    if (this.viewmoving4up == true) {
      this.viewrecords.forEach((value: any) => {
        this.lunchevalues.forEach((val: any) => {
          if (this.viewlunchnumber == val.sequence) {
            this.viewactive();
            this.vupdatelunch(value.id, val.selectedValue)
            this.done11();
          } else if (this.viewlunchnumber == 0) {
            this.viewactive();
            this.vupdatelunch(value.id, 'N/A')
            this.done11();
          }
        });
      });
    }
  }
  viewhoverlunchclick() {
    if (this.viewmoving4up == true && this.viewlunchnumber == -1) {
      this.vieweditlunch();
    }
  }
  lunchup() {
    if (this.viewmoving5up == true) {
      this.viewlunchnumber--;
      console.log(this.viewlunchnumber);
      if (this.viewlunchnumber <= 0) {
        if (this.viewlunchnumber <= -1) {
          this.viewlunchnumber = -1;
          document.getElementById('adddnewlunch' + this.lunchnumber)?.classList.add('hoverday');
          document.getElementById('adddnewlunch' + this.lunchnumber)?.classList.remove('active1');
          document.getElementById('hovernalunch' + this.lunchnumber)?.classList.remove('hoverday');
          document.getElementById('hovernalunch' + this.lunchnumber)?.classList.add('active1');
        } else if (this.viewlunchnumber == 0) {
          document.getElementById('adddnewlunch' + this.lunchnumber)?.classList.remove('hoverday');
          document.getElementById('hovernalunch' + this.lunchnumber)?.classList.add('hoverday');
          document.getElementById('hovernalunch' + this.lunchnumber)?.classList.remove('active1');
          document.getElementById('adddnewlunch' + this.lunchnumber)?.classList.add('active1');
          this.lunchevalues.forEach((val: any) => {
            if (val.sequence == 1) {
              document.getElementById('hoverlunch' + this.lunchnumber + val.id)?.classList.remove('hoverday');
            }
            document.getElementById('mworkinglunch' + this.lunchnumber + val.id)?.classList.add('active1');
          });
        }
      } else {
        this.lunchevalues.forEach((val: any) => {
          if (this.viewlunchnumber == val.sequence) {

            document.getElementById('hoverlunch' + this.lunchnumber + val.id)?.classList.add('hoverday');
          } else {
            document.getElementById('hovernalunch' + this.lunchnumber)?.classList.remove('hoverday');
            document.getElementById('hovernalunch' + this.lunchnumber)?.classList.add('active1');
            document.getElementById('hoverlunch' + this.lunchnumber + val.id)?.classList.remove('hoverday');
            document.getElementById('mworkinglunch' + this.lunchnumber + val.id)?.classList.add('active1');
          }
        });
      }
    } else {

    }

  }
  lunchdown() {
    if (this.viewmoving5up == true) {
      this.viewlunchnumber++;
      console.log(this.viewlunchnumber);
      if (this.viewlunchnumber == 0) {
        document.getElementById('adddnewlunch' + this.lunchnumber)?.classList.remove('hoverday');
        document.getElementById('hovernalunch' + this.lunchnumber)?.classList.add('hoverday');
        document.getElementById('hovernalunch' + this.lunchnumber)?.classList.remove('active1');
        document.getElementById('adddnewlunch' + this.lunchnumber)?.classList.add('active1');
        this.lunchevalues.forEach((val: any) => {
          if (val.sequence == 1) {
            document.getElementById('hoverlunch' + + this.lunchnumber + val.id)?.classList.remove('hoverday');
          }
          document.getElementById('mworkinglunch' + + this.lunchnumber + val.id)?.classList.add('active1');
        });
      }
      if (this.viewlunchnumber > this.lunchevalues.length) {
        this.viewlunchnumber = this.lunchevalues.length;
      }
      this.lunchevalues.forEach((val: any) => {
        if (this.viewlunchnumber == val.sequence) {
          document.getElementById('hovernalunch' + this.lunchnumber)?.classList.remove('hoverday');
          document.getElementById('hovernalunch' + this.lunchnumber)?.classList.add('active1');
          document.getElementById('hoverlunch' + this.lunchnumber + val.id)?.classList.add('hoverday');
        } else {
          document.getElementById('hoverlunch' + this.lunchnumber + val.id)?.classList.remove('hoverday');
          document.getElementById('mworkinglunch' + this.lunchnumber + val.id)?.classList.add('active1');
          // document.getElementById('hovernalunch' + this.lunchnumber)?.classList.remove('hoverday');
        }
      });
    } else {

    }

  }
  lunchclick() {
    if (this.viewmoving5up == true) {
      this.lunchevalues.forEach((val: any) => {
        if (this.viewlunchnumber == val.sequence) {
          this.updatework10(this.lunchnumber, val.selectedValue);
          this.done10(this.lunchnumber);
        } else if (this.viewlunchnumber == 0) {
          this.updatework11(this.lunchnumber);
          this.done10(this.lunchnumber);
        }
      });
    }
  }
  hoverlunchclick() {
    if (this.viewmoving5up == true && this.viewlunchnumber == -1) {
      this.editlunch(this.lunchnumber);
    }
  }
  createlunch() {
    if (this.editpopup == true) {
      if (this.viewlunch2switch == true) {
        this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
        var a = this.hoursvalue1 + this.hoursvalue3;
        if (parseInt(this.hoursvalue5) == 0) {
          if (parseInt(a) == 0) {

          } else if (parseInt(a) == 1) {
            this.viewrecords.forEach((value: any) => {
              this.viewactive();
              value.vlunch = a + ' Minute';
              this.done11();
            });
            let createCon = {
              "settingId": 15,
              "optionValue": a + ' Minute',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonamingview();
              this.addupdatelunch()
            });
          } else {
            this.viewrecords.forEach((value: any) => {
              this.viewactive();
              value.vlunch = a + ' Minutes';
              this.done11();
            });
            let createCon = {
              "settingId": 15,
              "optionValue": a + ' Minutes',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonamingview();
              this.addupdatelunch()
            });
          }
        } else if (parseInt(this.hoursvalue5) == 1) {
          if (parseInt(a) == 0) {
            this.viewrecords.forEach((value: any) => {
              this.viewactive();
              value.vlunch = parseInt(this.hoursvalue5) + ' Hour';
              this.done11();
            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hour',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonamingview();
              this.addupdatelunch()
            });
          } else if (parseInt(a) == 1) {
            this.viewrecords.forEach((value: any) => {
              this.viewactive();
              value.vlunch = parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minute';
              this.done11();
            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minute',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonamingview();
              this.addupdatelunch()
            });
          } else {
            this.viewrecords.forEach((value: any) => {
              this.viewactive();
              value.vlunch = parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minutes';
              this.done11();
            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minutes',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonamingview();
              this.addupdatelunch()
            });
          }
        } else {
          if (parseInt(a) == 0) {
            this.viewrecords.forEach((value: any) => {
              this.viewactive();
              value.vlunch = parseInt(this.hoursvalue5) + ' Hours';
              this.done11();
            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hours',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonamingview();
              this.addupdatelunch()
            });
          } else if (parseInt(a) == 1) {
            this.viewrecords.forEach((value: any) => {
              this.viewactive();
              value.vlunch = parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minute';
              this.done11();
            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minute',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonamingview();
              this.addupdatelunch()
            });
          } else {
            this.viewrecords.forEach((value: any) => {
              this.viewactive();
              value.vlunch = parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minutes';
              this.done11();
            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minutes',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonamingview();
              this.addupdatelunch()
            });
          }
        }
        this.vieweditlunchclose();
      }
    } else {
      if (this.viewlunch2switch == true) {
        this.hoursvalue5 = this.hoursvalue4 + this.hoursvalue2;
        var a = this.hoursvalue1 + this.hoursvalue3;
        if (parseInt(this.hoursvalue5) == 0) {
          if (parseInt(a) == 0) {

          } else if (parseInt(a) == 1) {
            this.workimports.forEach((value: any) => {
              if (value.id == this.lunchnumber) {
                value.lunch = a + ' Minute';
                value.vlunch = a + ' Minute';
                value.hoursWorking = value.hour + "," + a + ' Minute';
                let updateCon = {
                  "id": value.id,
                  "hoursWorking": value.hour + "," + a + ' Minute',
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                });
              }

            });

            let createCon = {
              "settingId": 15,
              "optionValue": a + ' Minute',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonaminghour(this.lunchnumber);
              this.addupdatelunch()
            });
          } else {
            this.workimports.forEach((value: any) => {
              if (value.id == this.lunchnumber) {
                value.lunch = a + ' Minutes';
                value.vlunch = a + ' Minutes';
                value.hoursWorking = value.hour + "," + a + ' Minutes';
                let updateCon = {
                  "id": value.id,
                  "hoursWorking": value.hour + "," + a + ' Minutes',
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                });
              }

            });
            let createCon = {
              "settingId": 15,
              "optionValue": a + ' Minutes',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonaminghour(this.lunchnumber);
              this.addupdatelunch()
            });
          }
        } else if (parseInt(this.hoursvalue5) == 1) {
          if (parseInt(a) == 0) {
            this.workimports.forEach((value: any) => {
              if (value.id == this.lunchnumber) {
                value.lunch = parseInt(this.hoursvalue5) + ' Hour';
                value.vlunch = parseInt(this.hoursvalue5) + ' Hour';
                value.hoursWorking = value.hour + "," + parseInt(this.hoursvalue5) + ' Hour';
                let updateCon = {
                  "id": value.id,
                  "hoursWorking": value.hour + "," + parseInt(this.hoursvalue5) + ' Hour',
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                });
              }

            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hour',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonaminghour(this.lunchnumber);
              this.addupdatelunch()
            });
          } else if (parseInt(a) == 1) {
            this.workimports.forEach((value: any) => {
              if (value.id == this.lunchnumber) {
                value.lunch = parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minute';
                value.vlunch = parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minute';
                value.hoursWorking = value.hour + "," + parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minute';
                let updateCon = {
                  "id": value.id,
                  "hoursWorking": value.hour + "," + parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minute',
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                });
              }

            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minute',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonaminghour(this.lunchnumber);
              this.addupdatelunch()
            });
          } else {
            this.workimports.forEach((value: any) => {
              if (value.id == this.lunchnumber) {
                value.lunch = parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minutes';
                value.vlunch = parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minutes';
                value.hoursWorking = value.hour + "," + parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minutes';
                let updateCon = {
                  "id": value.id,
                  "hoursWorking": value.hour + "," + parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minutes',
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                });
              }

            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hour ' + a + ' Minutes',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonaminghour(this.lunchnumber);
              this.addupdatelunch()
            });
          }
        } else {
          if (parseInt(a) == 0) {
            this.workimports.forEach((value: any) => {
              if (value.id == this.lunchnumber) {
                value.lunch = parseInt(this.hoursvalue5) + ' Hours';
                value.vlunch = parseInt(this.hoursvalue5) + ' Hours';
                value.hoursWorking = value.hour + "," + parseInt(this.hoursvalue5) + ' Hours';
                let updateCon = {
                  "id": value.id,
                  "hoursWorking": value.hour + "," + parseInt(this.hoursvalue5) + ' Hours',
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                });
              }

            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hours',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonaminghour(this.lunchnumber);
              this.addupdatelunch()
            });
          } else if (parseInt(a) == 1) {
            this.workimports.forEach((value: any) => {
              if (value.id == this.lunchnumber) {
                value.lunch = parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minute';
                value.vlunch = parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minute';
                value.hoursWorking = value.hour + "," + parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minute';
                let updateCon = {
                  "id": value.id,
                  "hoursWorking": value.hour + "," + parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minute',
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                });
              }

            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minute',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonaminghour(this.lunchnumber);
              this.addupdatelunch()
            });
          } else {
            this.workimports.forEach((value: any) => {
              if (value.id == this.lunchnumber) {
                value.lunch = parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minutes';
                value.vlunch = parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minutes';
                value.hoursWorking = value.hour + "," + parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minutes';
                let updateCon = {
                  "id": value.id,
                  "hoursWorking": value.hour + "," + parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minutes',
                };
                this.library.update(updateCon).subscribe((val) => {
                  console.log("updated");
                });
              }

            });
            let createCon = {
              "settingId": 15,
              "optionValue": parseInt(this.hoursvalue5) + ' Hours ' + a + ' Minutes',
            };
            this.library.createtime(createCon).subscribe((val) => {
              console.log("Created", val);
              this.autonaminghour(this.lunchnumber);
              this.addupdatelunch()
            });
          }
        }
      }

      this.closeall();
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.UP_ARROW) {
      this.moveup();
      this.moveup1();
      this.moveup2();
      this.incrementkey();
      this.viewincrementkey();
      this.closeweekUPselect(this.weeknumber);
      this.clockdone(this.timenumber);
      this.viewweekup();
      this.viewdaysup();
      this.viewtimeup();
      this.viewhourup();
      this.viewlunchup();
      this.lunchup();
    }
    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.closeweekLEFTselect(this.weeknumber);
      this.viewweekleft();
    }
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.closeweekRIGHTselect(this.weeknumber);
      this.viewweekright();
    }

    if (event.key === KEY_CODE.DOWN_ARROW) {
      this.movedown();
      this.movedown1();
      this.movedown2();
      this.decrementkey();
      this.viewdecrementkey();
      this.closeweekselect(this.weeknumber);
      this.clockedit(this.timenumber);
      this.viewweekdown();
      this.viewdaysdown();
      this.viewtimedown();
      this.viewhourdown();
      this.viewlunchdown();
      this.lunchdown();
    }
    if (event.key === KEY_CODE.MINUS) {
      this.decrementkey();
      this.viewdecrementkey();
    }
    if (event.key === KEY_CODE.PLUS) {
      this.incrementkey();
      this.viewincrementkey();
    }
    if (event.key === KEY_CODE.ESCAPE) {
      if (this.editpopup == true) {
        if (this.close2 == true) {
          this.workimports.forEach((value: any) => {
            this.closealldrop(value.id);
          });
        }
        if (this.close1 == true) {
          this.viewrecords.forEach((value: any) => {
            this.vcanbtn(value.id);
          });
          this.viewedittimeclose();
          this.viewedithourclose();
          this.vieweditlunchclose();
        }
      } else {
        if (this.close2 == true) {
          console.log('Entered close all')
          this.closeall();
        }
        if (this.close1 == true) {
          this.closeedittime();
          this.closeedithours();
          this.closecheckboxdrop();
          this.closeeditlunch();
        }
      }


    }
    if (event.key === KEY_CODE.ENTER) {
      this.viewdayclick();
      this.hoverclick();
      this.hoverclick1();
      this.hovertimeclick();
      this.hoverhourclick();
      this.hoverclick2();
      this.createhour(this.hournumber);
      this.createtime(this.timenumber);
      this.applyselecetdweek(this.weeknumber);
      this.enter1button();
      this.enter2button();
      this.enter3button();
      this.enter4button();
      this.enter5button();
      this.enter6button();
      this.enter7button();
      this.enter8button();
      this.enter9button();
      this.enter10button();
      this.viewapplyweek();
      this.viewhovertimeclick();
      this.viewhoverhourclick();
      this.viewhourclick();
      this.viewtimeclick();
      this.viewlunchclick();
      this.viewhoverlunchclick();
      this.lunchclick();
      this.hoverlunchclick();
      this.createlunch();
    }
    if (event.key === KEY_CODE.ONE) {
      if (this.movingup7 == true) {
        this.clocktext = 1;
        this.hoursvalue4 = 1;
        this.movingup7 = false;
        this.movingup7a = true;
        document.getElementById('row2time' + this.timenumber)?.focus();
      }
      if (this.viewtime1switch == true) {
        this.clocktext = 1;
        this.hoursvalue4 = 1;
        this.viewtime1switch = false;
        document.getElementById('viewrow2time')?.focus();
      }
      if (this.viewlunch1switch == true) {
        this.clocktext = 1;
        this.hoursvalue4 = 1;
        this.viewlunch1switch = false;
        document.getElementById('viewrow2lunch')?.focus();
      }
    }
    if (event.key === KEY_CODE.ZERO) {
      if (this.movingup7 == true) {
        this.clocktext = 0;
        this.hoursvalue4 = 0;
        this.movingup7 = false;
        this.movingup7a = true;
        document.getElementById('row2time' + this.timenumber)?.focus();
      }
      if (this.viewtime1switch == true) {
        this.clocktext = 0;
        this.hoursvalue4 = 0;
        this.viewtime1switch = false;
        document.getElementById('viewrow2time')?.focus();
      }
      if (this.viewlunch1switch == true) {
        this.clocktext = 0;
        this.hoursvalue4 = 0;
        this.viewlunch1switch = false;
        document.getElementById('viewrow2lunch')?.focus();
      }
    }
    if (event.key === KEY_CODE.A) {
      if (this.movingup8 == true) {
        this.hoursvalue6 = 'AM';
        this.movingup7a = true;
        document.getElementById('clocksub1list' + this.timenumber)?.classList.add('arrow2opacity');
        document.getElementById('clocksublist' + this.timenumber)?.classList.remove('arrow1opacity');
      }
      if (this.viewtime2switch == true) {
        this.hoursvalue6 = 'AM';
        document.getElementById('viewclocksub1list')?.classList.add('arrow2opacity');
        document.getElementById('viewclocksublist')?.classList.remove('arrow1opacity');
      }
    }
    if (event.key === KEY_CODE.P) {
      if (this.movingup8 == true) {
        this.hoursvalue6 = 'PM';
        this.movingup7a = true;
        document.getElementById('clocksublist' + this.timenumber)?.classList.add('arrow1opacity');
        document.getElementById('clocksub1list' + this.timenumber)?.classList.remove('arrow2opacity');
      }
      if (this.viewtime2switch == true) {
        this.hoursvalue6 = 'PM';
        document.getElementById('viewclocksublist')?.classList.add('arrow1opacity');
        document.getElementById('viewclocksub1list')?.classList.remove('arrow2opacity');
      }
    }
    if (event.key === KEY_CODE.a) {
      if (this.movingup8 == true) {
        this.hoursvalue6 = 'AM';
        this.movingup7a = true;
        document.getElementById('clocksub1list' + this.timenumber)?.classList.add('arrow2opacity');
        document.getElementById('clocksublist' + this.timenumber)?.classList.remove('arrow1opacity');
      }
      if (this.viewtime2switch == true) {
        this.hoursvalue6 = 'AM';
        document.getElementById('viewclocksub1list')?.classList.add('arrow2opacity');
        document.getElementById('viewclocksublist')?.classList.remove('arrow1opacity');
      }
    }
    if (event.key === KEY_CODE.p) {
      if (this.movingup8 == true) {
        this.hoursvalue6 = 'PM';
        this.movingup7a = true;
        document.getElementById('clocksublist' + this.timenumber)?.classList.add('arrow1opacity');
        document.getElementById('clocksub1list' + this.timenumber)?.classList.remove('arrow2opacity');
      }
      if (this.viewtime2switch == true) {
        this.hoursvalue6 = 'PM';
        document.getElementById('viewclocksublist')?.classList.add('arrow1opacity');
        document.getElementById('viewclocksub1list')?.classList.remove('arrow2opacity');
      }
    }
    if (event.key === KEY_CODE.TAB) {
      this.tabnumber++;
      this.tabfunctionality();
    }
  }
  @HostListener('window:keydown', ['$event'])
  key1Event(event: KeyboardEvent) {
    if (event.key === KEY_CODE.TAB) {
      event.preventDefault();

    }
    if (event.key === KEY_CODE.ESCAPE) {
      event.preventDefault();

    }
  }
}

