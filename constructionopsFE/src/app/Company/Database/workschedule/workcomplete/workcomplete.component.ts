import { DOCUMENT } from '@angular/common';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/Services/library.service';
import { WorkaddComponent } from './workadd/workadd.component';
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
  selector: 'app-workcomplete',
  templateUrl: './workcomplete.component.html',
  styleUrls: ['./workcomplete.component.css']
})
export class WorkcompleteComponent implements OnInit {
  public works: any;
  tabnumber: number = 0;
  tabfunc2:number =0;
  addpopup: boolean = false;
  activeon: boolean = false;
  tabfunc: number = 1;
  public activeedit: any;
  public activeedits: any;
  add: number = 0;
  headerword1: any;
  headerword2: any;
  headerword3: any;
  headerword4: any;
  headerword5: any;
  headerword6: any;
  checkedlist: any;
  deletetext: any;
  deletetext2: any;
  deleteselected: boolean = false;
  deletenotselected: boolean = false;
  delettrue: boolean = false;
  isselectall: boolean = false;
  isunselectall: boolean = false;
  hourswitch: boolean = false;
  timeswitch: boolean = false;
  dayswitch: boolean = false;
  weekwitch: boolean = false;
  public viewmodals: any;
  public viewrecords: any;
  public timevalues: any;
  public hourvalues: any;
  public deleterecords: any;
  public viewdeleterecords: any;
  public deletearray: any;
  public delete2array: any;
  activedelete: boolean = false;
  activededit: boolean = false;
  sequenceview: any;
  workimports: any;
  selecttext: any;
  checkedLists: any;
  deletingnumber: number = 0;
  deletevariable: number = 0;
  checkedList: any;
  sorter: any;
  sortera: any
  status: boolean = false;
  disabledouble: boolean = true;
  options = [
    { id: 1, name: 'Sunday', value: 'Sun', checked: false, ischecked: false, weekchecked: false },
    { id: 2, name: 'Monday', value: 'Mon', checked: false, ischecked: false, weekchecked: false },
    { id: 3, name: 'Tuesday', value: 'Tue', checked: false, ischecked: false, weekchecked: false },
    { id: 4, name: 'Wednesday', value: 'Wed', checked: false, ischecked: false, weekchecked: false },
    { id: 5, name: 'Thursday', value: 'Thu', checked: false, ischecked: false, weekchecked: false },
    { id: 6, name: 'Friday', value: 'Fri', checked: false, ischecked: false, weekchecked: false },
    { id: 7, name: 'Saturday', value: 'Sat', checked: false, ischecked: false, weekchecked: false },
  ];
  times = [
    { idtime: 1, time: '6:00 AM' },
    { idtime: 2, time: '7:00 AM' },
    { idtime: 3, time: '8:00 AM' },
    { idtime: 4, time: '9:00 AM' },
  ];

  hours = [
    { idhour: 1, hour: '8 Hours' },
    { idhour: 2, hour: '9 Hours' },
    { idhour: 3, hour: '10 Hours' },
    { idhour: 4, hour: '12 Hours' },
  ]

  days = [
    { idday: 1, day: 'Sunday', value: 44, },
    { idday: 2, day: 'Monday', value: 48, },
    { idday: 3, day: 'Tuesday', value: 49, },
    { idday: 4, day: 'Wednesday', value: 67, },
    { idday: 5, day: 'Thursday', value: 54, },
    { idday: 6, day: 'Friday', value: 37, },
    { idday: 7, day: 'Saturday', value: 52, },
  ];
  deletedays = [
    { id: 1, value: 24, },
    { id: 2, value: 52, },
    { id: 3, value: 76, },
    { id: 4, value: 104, },
    { id: 5, value: 125, },
    { id: 6, value: 146, },
    { id: 7, value: 167, },
  ]
  @ViewChild(WorkaddComponent) child!: WorkaddComponent;
  constructor(private library: LibraryService, private router: Router) { }
  ngOnInit(): void {
    this.activeedit = [];
    this.activeedits = [];
    this.workimports = [];
    this.headerword1 = 'WORK SCHEDULE';
    this.headerword2 = 'WORKING DAYS';
    this.headerword3 = 'NO. OF DAYS';
    this.headerword4 = 'DAY WEEK STARTS';
    this.headerword5 = 'TIME DAY STARTS';
    this.headerword6 = 'HOURS WORKING';
    this.viewmodals = [];
    this.add = 0;
    this.viewdeleterecords = [];
    this.deleterecords = [];
    this.viewrecords = [];
    this.checkedLists = [];
    this.checkedList = [];
    this.works = [];
    let i = 1;
    this.library.getworks().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['vname'] = itemworkk.workScheduleName,
          itemworkk['tname'] = itemworkk.workScheduleName,
          itemworkk['vdayvalue'] = itemworkk.dayWeekStarts,
          itemworkk['vdays'] = itemworkk.workingDays,
          itemworkk['vdaynumber'] = itemworkk.numberOfDays,
          itemworkk['vtime'] = itemworkk.timeDayStarts,
          itemworkk['vhour'] = itemworkk.hoursWorking,
          itemworkk['checked'] = false;
        itemworkk['sequencedelete'] = 0;
        itemworkk['splitedvaluea'] = itemworkk.timeDayStarts.split(" ", 2);
        itemworkk['splitedvalueb'] = itemworkk.splitedvaluea[0];
        itemworkk['splitedvalued'] = itemworkk.splitedvaluea[1];
        itemworkk['splitedvaluec'] = itemworkk.splitedvalueb.split(":", 2);
        itemworkk['splitedvalue'] = parseInt(itemworkk.splitedvaluec[0] + itemworkk.splitedvaluec[1]);
        if (itemworkk.isImported == true) {
          itemworkk['sequence'] = i++;
          itemworkk['sequenceing'] = itemworkk.sequence;
          this.works.push(itemworkk);
          this.works.sort((a: { splitedvalue: any; }, b: { splitedvalue: any; }) => a.splitedvalue - b.splitedvalue);
          this.sortera = {
            "am": 0,
            "pm": 1,
          }

          this.works.sort((a: { splitedvalued: any; }, b: { splitedvalued: any; }) => {
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

          this.works.sort((a: { dayWeekStarts: any; }, b: { dayWeekStarts: any; }) => {
            let day1 = a.dayWeekStarts.toLowerCase();
            let day2 = b.dayWeekStarts.toLowerCase();
            return this.sorter[day1] - this.sorter[day2];
          });
          this.works = this.works.sort((a: { numberOfDays: number; }, b: { numberOfDays: number; }) => a.numberOfDays - b.numberOfDays);
        }
      });
    });
    this.checkedlist = [];
    this.isunselectall = true;
    document.getElementById('unselectall')?.classList.add('subli1checkbox4');
    document.getElementById('unselectall')?.classList.remove('subli1checkbox3');
    console.log('works', this.works);
    let a = 1;
    let b = 1;
    const interval = setInterval(() => {
      b++;
      if (b == 4) {
        clearInterval(interval);
        this.works.forEach((val: any) => {
          val.sequence = a++;
          this.workimports.push(val);
        });
        console.log('false', this.workimports);
      } else {

      }
    }, 400);
    let c = 1;
    const interval1 = setInterval(() => {
      c++;
      if (c == 3) {
        clearInterval(interval1);
        this.workimports.forEach((val: any) => {
          this.works.push(val);
        });
      } else {

      }
    }, 400);
    setInterval(() => {
      if (this.status == true) {
        this.selecttext = "Unselect All"
      } else {
        this.selecttext = "Select All"
      }
    }, 400);
    this.timevalues = [];
    this.library.getworksettingtime().subscribe((val) => {
      console.log("time", val);

      this.timevalues = val;

    });

    this.hourvalues = [];
    console.log("timevalues", this.timevalues);
    this.library.getworksettinghour().subscribe((val) => {
      console.log("hour", val);

      this.hourvalues = val;

    });


  }
  deleteselect() {
    if (this.deleteselected == false) {
      this.deleteselected = true;
    } else {
      this.deleteselected = false;
    }
  }


  deletebtn() {
    this.deleterecords = [];
    this.activeedits.forEach((val: any) => {
      this.deleterecords.push(val);
      this.sequencedelete();
    });
    this.deletetext = 'Work Schedule';
    this.deletetext2 = 'this Work Schedule';
  }
  deletenumber() {
    if (this.activedelete == true) {
      this.deleterecords = [];
      this.viewdeleterecords.forEach((val: any) => {
        this.deleterecords.push(val);
        this.sequencedelete();
      });

      if (this.deleterecords.length == 1) {
        this.deletetext = 'Work Schedule';
        this.deletetext2 = 'this Work Schedule';
      } else {
        this.deletetext = 'Work Schedule';
        this.deletetext2 = 'these Work Schedules';
      }
      document.getElementById('viewdelete')?.click();
    } else {
      console.log('no')
    }

  }

  deletecomfirm() {
    if (this.activededit == true) {
      this.add = 0;
      let a = 0;
      this.deleterecords.forEach((val: any) => {
        a = val.id;
        this.add++;
        console.log(this.add);
        let updateCon = {
          "id": val.id,
          "isImported": false
        };
        this.library.update(updateCon).subscribe((val) => {
          console.log("updated");

          if (this.deleterecords.length == this.add) {
            console.log('it entered')
            this.child.addwork();

          }

        });
      });
      let item = this.works.filter(function (item: any) {
        return item.id === a;
      })[0];
      let index = this.works.indexOf(item);
      this.works.splice(index, 1);
      let i = 1;
      this.works.forEach((val: any) => {
        if (val.isImported == true) {
          val.sequence = i++;
          val.sequenceing = val.sequence;
        }
      });
      console.log('Updated list', this.works)
    } else {
      this.add = 0;
      this.deleterecords.forEach((val: any) => {
        this.add++;
        console.log(this.add);
        let updateCon = {
          "id": val.id,
          "isImported": false
        };
        this.library.update(updateCon).subscribe((val) => {
          console.log("updated");
          if (this.deleterecords.length == this.add) {
            this.unselectall();
            this.child.addwork();
            this.delettrue = true;
          }
          if (this.delettrue == true) {
            this.delettrue = false;
            this.addwork();
          }
        });
      });
    }


  }

  sequencedelete() {
    let t = 1;
    this.deleterecords.forEach((val1: any) => {
      val1.sequencedelete = t++;
    });
  }
  addwork() {
    this.workimports = [];
    this.works = [];
    let i = 1;
    this.library.getworks().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['vname'] = itemworkk.workScheduleName,
          itemworkk['tname'] = itemworkk.workScheduleName,
          itemworkk['vdayvalue'] = itemworkk.dayWeekStarts,
          itemworkk['vdays'] = itemworkk.workingDays,
          itemworkk['vdaynumber'] = itemworkk.numberOfDays,
          itemworkk['vtime'] = itemworkk.timeDayStarts,
          itemworkk['vhour'] = itemworkk.hoursWorking,
          itemworkk['checked'] = false;
        itemworkk['sequencedelete'] = 0;
        itemworkk['splitedvaluea'] = itemworkk.timeDayStarts.split(" ", 2);
        itemworkk['splitedvalueb'] = itemworkk.splitedvaluea[0];
        itemworkk['splitedvalued'] = itemworkk.splitedvaluea[1];
        itemworkk['splitedvaluec'] = itemworkk.splitedvalueb.split(":", 2);
        itemworkk['splitedvalue'] = parseInt(itemworkk.splitedvaluec[0] + itemworkk.splitedvaluec[1]);
        if (itemworkk.isImported == true) {
          itemworkk['sequence'] = i++;
          itemworkk['sequenceing'] = itemworkk.sequence;
          this.works.push(itemworkk);
          this.works.sort((a: { splitedvalue: any; }, b: { splitedvalue: any; }) => a.splitedvalue - b.splitedvalue);
          this.sortera = {
            "am": 0,
            "pm": 1,
          }

          this.works.sort((a: { splitedvalued: any; }, b: { splitedvalued: any; }) => {
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

          this.works.sort((a: { dayWeekStarts: any; }, b: { dayWeekStarts: any; }) => {
            let day1 = a.dayWeekStarts.toLowerCase();
            let day2 = b.dayWeekStarts.toLowerCase();
            return this.sorter[day1] - this.sorter[day2];
          });
          this.works = this.works.sort((a: { numberOfDays: number; }, b: { numberOfDays: number; }) => a.numberOfDays - b.numberOfDays);
        }
      });
    });
    let a = 1;
    let b = 1;
    const interval = setInterval(() => {
      b++;
      if (b == 4) {
        clearInterval(interval);
        this.works.forEach((val: any) => {
          val.sequence = a++;
          this.workimports.push(val);
        });
        console.log('false', this.works);
      } else {

      }
    }, 400);
    let c = 1;
    const interval1 = setInterval(() => {
      c++;
      if (c == 3) {
        clearInterval(interval1);
        this.workimports.forEach((val: any) => {
          this.works.push(val);
        });
      } else {

      }
    }, 400);
  }
  addedwork() {
    this.workimports = [];
    this.works = [];
    let i = 1;
    this.library.getworks().subscribe((val) => {
      val.forEach((itemworkk: any) => {
        itemworkk['vname'] = itemworkk.workScheduleName,
          itemworkk['tname'] = itemworkk.workScheduleName,
          itemworkk['vdayvalue'] = itemworkk.dayWeekStarts,
          itemworkk['vdays'] = itemworkk.workingDays,
          itemworkk['vdaynumber'] = itemworkk.numberOfDays,
          itemworkk['vtime'] = itemworkk.timeDayStarts,
          itemworkk['vhour'] = itemworkk.hoursWorking,
          itemworkk['checked'] = false;
        itemworkk['sequencedelete'] = 0;
        itemworkk['splitedvaluea'] = itemworkk.timeDayStarts.split(" ", 2);
        itemworkk['splitedvalueb'] = itemworkk.splitedvaluea[0];
        itemworkk['splitedvalued'] = itemworkk.splitedvaluea[1];
        itemworkk['splitedvaluec'] = itemworkk.splitedvalueb.split(":", 2);
        itemworkk['splitedvalue'] = parseInt(itemworkk.splitedvaluec[0] + itemworkk.splitedvaluec[1]);
        if (itemworkk.isImported == true) {
          itemworkk['sequence'] = i++;
          itemworkk['sequenceing'] = itemworkk.sequence;
          this.works.push(itemworkk);
          this.works.sort((a: { splitedvalue: any; }, b: { splitedvalue: any; }) => a.splitedvalue - b.splitedvalue);
          this.sortera = {
            "am": 0,
            "pm": 1,
          }

          this.works.sort((a: { splitedvalued: any; }, b: { splitedvalued: any; }) => {
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

          this.works.sort((a: { dayWeekStarts: any; }, b: { dayWeekStarts: any; }) => {
            let day1 = a.dayWeekStarts.toLowerCase();
            let day2 = b.dayWeekStarts.toLowerCase();
            return this.sorter[day1] - this.sorter[day2];
          });
          this.works = this.works.sort((a: { numberOfDays: number; }, b: { numberOfDays: number; }) => a.numberOfDays - b.numberOfDays);
        }
      });
    });
    let a = 1;
    let b = 1;
    const interval = setInterval(() => {
      b++;
      if (b == 4) {
        clearInterval(interval);
        this.works.forEach((val: any) => {
          val.sequence = a++;
          this.workimports.push(val);
        });
        console.log('false', this.works);
      } else {

      }
    }, 400);
    let c = 1;
    const interval1 = setInterval(() => {
      c++;
      if (c == 3) {
        clearInterval(interval1);
        this.workimports.forEach((val: any) => {
          this.works.push(val);
        });
      } else {

      }
    }, 400);

  }

  opencreate() {
    console.log('start all')
    document.getElementById('createmodal')?.click();
  }
  activeadd() {
    this.child.addwork();
    document.getElementById('activeadded')?.click()
  }
  check() {
    this.unselectall();
    this.child.checkempty();
  }
  workchecked(id: any) {
    this.disabledouble = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        if (val.checked == false) {
          val.checked = true;
          this.activedelete = true
          this.isunselectall = false;
          this.isselectall = false;
          this.checkedlist.push(id);
          document.getElementById('unselectall')?.classList.remove('opacitycheck');
          document.getElementById('unselectalltext')?.classList.remove('opacitycheck');
          document.getElementById('editbutton')?.classList.add('editbtnactive');
          document.getElementById('deletebutton')?.classList.add('deletebtnactive');
          document.getElementById('editimg')?.classList.add('hide');
          document.getElementById('unselectall')?.classList.remove('subli1checkbox4');
          document.getElementById('unselectall')?.classList.add('subli1checkbox3');
          document.getElementById('editimgb')?.classList.remove('hide');
          document.getElementById('deleteimg')?.classList.add('hide');
          document.getElementById('deleteimgb')?.classList.remove('hide');
          document.getElementById('deleteimgw')?.classList.remove('hide');
          document.getElementById('editimgw')?.classList.remove('hide');
          this.works.forEach((val: any) => {
            if (val.id == id) {
              this.viewdeleterecords.push(val);
            }
          });
          console.log('delete', this.viewdeleterecords);
        } else {
          val.checked = false;
          this.isunselectall = false;
          this.isselectall = false;
          let item = this.checkedlist.filter(function (item: any) {
            return item.id === id;
          })[0];
          let index = this.checkedlist.indexOf(item);
          this.checkedlist.splice(index, 1);
          document.getElementById('selectallrows')?.classList.add('subli1checkbox1');
          document.getElementById('selectallrows')?.classList.remove('subli1checkbox2');
          document.getElementById('selectallrows')?.classList.remove('opacitycheck');
          document.getElementById('selectalltext')?.classList.remove('opacitycheck');

          let item1 = this.viewdeleterecords.filter(function (item1: any) {
            return item1.id === id;
          })[0];
          let index1 = this.viewdeleterecords.indexOf(item1);
          this.viewdeleterecords.splice(index1, 1);
          console.log('delete', this.viewdeleterecords);
        }
      }
    });
    if (this.checkedlist.length == 0) {
      this.unselectall();
      this.isunselectall = true;
      this.disabledouble = true;
      this.activedelete = false;
    }
  }
  select(event: any, id: any) {

    this.disabledouble = false;
    if (event.target.checked) {

      this.activedelete = true
      this.isunselectall = false;
      this.isselectall = false;
      this.checkedlist.push(id);
      document.getElementById('unselectall')?.classList.remove('opacitycheck');
      document.getElementById('unselectalltext')?.classList.remove('opacitycheck');
      document.getElementById('editbutton')?.classList.add('editbtnactive');
      document.getElementById('deletebutton')?.classList.add('deletebtnactive');
      document.getElementById('editimg')?.classList.add('hide');
      document.getElementById('unselectall')?.classList.remove('subli1checkbox4');
      document.getElementById('unselectall')?.classList.add('subli1checkbox3');
      document.getElementById('editimgb')?.classList.remove('hide');
      document.getElementById('deleteimg')?.classList.add('hide');
      document.getElementById('deleteimgb')?.classList.remove('hide');
      document.getElementById('deleteimgw')?.classList.remove('hide');
      document.getElementById('editimgw')?.classList.remove('hide');
      this.works.forEach((val: any) => {
        if (val.id == id) {
          this.viewdeleterecords.push(val);
          this.activeedit.push(val);
        }
      });
      console.log('delete', this.viewdeleterecords);
    } else {
      this.isunselectall = false;
      this.isselectall = false;
      let item = this.checkedlist.filter(function (item: any) {
        return item.id === id;
      })[0];
      let index = this.checkedlist.indexOf(item);
      this.checkedlist.splice(index, 1);
      document.getElementById('selectallrows')?.classList.add('subli1checkbox1');
      document.getElementById('selectallrows')?.classList.remove('subli1checkbox2');
      document.getElementById('selectallrows')?.classList.remove('opacitycheck');
      document.getElementById('selectalltext')?.classList.remove('opacitycheck');

      let item1 = this.viewdeleterecords.filter(function (item1: any) {
        return item1.id === id;
      })[0];
      let index1 = this.viewdeleterecords.indexOf(item1);
      this.viewdeleterecords.splice(index1, 1);
      this.activeedit.splice(index1, 1);
      console.log('delete', this.viewdeleterecords);
    }

    console.log(this.checkedlist.length);
    if (this.checkedlist.length == this.works.length) {
      this.works.forEach((val: any) => {
        if (val.checked == true) {
          this.selectall();
          this.isunselectall = false;
          this.activedelete = true;
        }
      });
    }

    if (this.checkedlist.length == 0) {
      this.unselectall();
      this.isunselectall = true;
      this.disabledouble = true;
      this.activedelete = false;
    }

    console.log(this.activeedit);
  }

  selectall() {
    this.activedelete = true;
    this.deleterecords = [];
    this.activeedit = [];
    this.viewdeleterecords = [];
    this.disabledouble = false
    this.isselectall = true;
    this.isunselectall = false;
    this.checkedlist = [];
    document.getElementById('unselectall')?.classList.remove('opacitycheck');
    document.getElementById('unselectall')?.classList.remove('subli1checkbox4');
    document.getElementById('unselectall')?.classList.add('subli1checkbox3');
    document.getElementById('unselectalltext')?.classList.remove('opacitycheck');
    document.getElementById('selectallrows')?.classList.add('subli1checkbox2');
    document.getElementById('selectallrows')?.classList.remove('subli1checkbox1');
    document.getElementById('selectalltext')?.classList.add('opacitycheck');
    document.getElementById('selectallrows')?.classList.add('opacitycheck');
    document.getElementById('editbutton')?.classList.add('editbtnactive');
    document.getElementById('deletebutton')?.classList.add('deletebtnactive');
    document.getElementById('editimg')?.classList.add('hide');
    document.getElementById('editimgb')?.classList.remove('hide');
    document.getElementById('deleteimg')?.classList.add('hide');
    document.getElementById('deleteimgb')?.classList.remove('hide');
    document.getElementById('deleteimgw')?.classList.remove('hide');
    document.getElementById('editimgw')?.classList.remove('hide');
    if (this.isselectall) {
      this.works.forEach((val: any) => {
        val.checked = true;
        this.checkedlist.push(val.id);
      });
    }
    this.works.forEach((val: any) => {
      this.activeedit.push(val);
      this.viewdeleterecords.push(val);
      console.log('delete', this.viewdeleterecords);
    });
  }

  unselectall() {

    this.activedelete = false;
    this.deleterecords = [];
    this.activeedit = [];
    this.disabledouble = true;
    this.checkedlist = [];
    this.viewdeleterecords = [];
    console.log('delete', this.viewdeleterecords);
    this.isunselectall = true;
    this.isselectall = false;
    document.getElementById('unselectall')?.classList.add('subli1checkbox4');
    document.getElementById('unselectall')?.classList.add('opacitycheck');
    document.getElementById('unselectalltext')?.classList.add('opacitycheck');
    document.getElementById('selectallrows')?.classList.remove('opacitycheck');
    document.getElementById('selectallrows')?.classList.remove('subli1checkbox2');
    document.getElementById('selectallrows')?.classList.add('subli1checkbox1');
    document.getElementById('unselectall')?.classList.remove('subli1checkbox3');
    document.getElementById('selectalltext')?.classList.remove('opacitycheck');
    document.getElementById('editbutton')?.classList.remove('editbtnactive');
    document.getElementById('deletebutton')?.classList.remove('deletebtnactive');
    document.getElementById('editimg')?.classList.remove('hide');
    document.getElementById('editimgb')?.classList.add('hide');
    document.getElementById('deleteimg')?.classList.remove('hide');
    document.getElementById('deleteimgb')?.classList.add('hide');
    document.getElementById('deleteimgw')?.classList.add('hide');
    document.getElementById('editimgw')?.classList.add('hide');
    if (!this.isselectall) {
      this.works.forEach((val: any) => {
        val.checked = false;
      });
    }
  }
  editbtn() {
    let a = 0;
    this.activeedits.forEach((val1: any) => {
      a = val1.id;
      this.activeedit.push(val1);
    });
    this.works.forEach((val2: any) => {
      if (val2.id == a) {
        val2.checked = true;
      }
    });
    document.getElementById('editrow2name' + a)?.classList.remove('hide');
    document.getElementById('editrow4name' + a)?.classList.add('hide');
    document.getElementById('editrow2week' + a)?.classList.remove('hide');
    document.getElementById('editrow4week' + a)?.classList.add('hide');
    document.getElementById('editrow2noday' + a)?.classList.remove('hide');
    document.getElementById('editrow4noday' + a)?.classList.add('hide');
    document.getElementById('editrow2days' + a)?.classList.remove('hide');
    document.getElementById('editrow4days' + a)?.classList.add('hide');
    document.getElementById('editrow2times' + a)?.classList.remove('hide');
    document.getElementById('editrow4times' + a)?.classList.add('hide');
    document.getElementById('editrow2hour' + a)?.classList.remove('hide');
    document.getElementById('editrow4hour' + a)?.classList.add('hide');
  }
  editbutton() {
    console.log('works', this.works);
    this.works.forEach((val: any) => {
      if (val.sequenceing == 1) {
        this.activeedits = [];
        this.activeedits.push(val);
        if (val.checked == true) {
          document.getElementById('vieweditmodaledit')?.click();
        } else {

          document.getElementById('viewmodaleditview')?.click();
        }
      } else {

      }
    });

  }
  editsinglebutton(id: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        this.activeedits = [];
        this.activeedits.push(val);

      }

    });
  }
  edit2btn() {
    document.getElementById('vieweditmodaledit')?.click();
  }
  doubletap(event: MouseEvent, id: any) {
    if (this.disabledouble) {
      if (event.type === 'dblclick') {
        this.viewmodals = [];
        this.activeedits = [];
        this.works.forEach((val: any) => {
          if (val.id == id) {
            this.viewmodals.push(val);
            this.activeedits.push(val);
          }
        });
        document.getElementById('viewmodal')?.click();
      }
    } else {

    }

  }

  vnext() {
    this.viewmodals.forEach((val: any) => {
      this.sequenceview = val.sequence;
    });
    let a = this.sequenceview + 1;

    this.works.forEach((val: any) => {
      if (val.sequence == a) {
        this.viewmodals = [];
        this.viewrecords = [];
        this.viewmodals.push(val);
      } else if (a > this.works.length) {
        a = 1;
        if (val.sequence == a) {
          this.viewmodals = [];
          this.viewrecords = [];
          this.viewmodals.push(val);
        }
      }
    });
  }
  enext() {
    this.activeedits.forEach((val1: any) => {
      this.sequenceview = val1.sequence;
    });
    let a = this.sequenceview + 1;

    this.works.forEach((val: any) => {
      if (val.sequence == a) {
        this.activeedits = [];
        this.activeedits.push(val);
        if (val.checked == true) {
          document.getElementById('vieweditmodaledit')?.click();
        } else {

          document.getElementById('viewmodaleditview')?.click();
        }
      } else if (a > this.works.length) {
        a = 1;
        if (val.sequence == a) {
          this.activeedits = [];
          this.activeedits.push(val);
        }
      }
    });
  }
  next() {
    this.viewrecords.forEach((val: any) => {
      this.sequenceview = val.sequence;
    });
    let a = this.sequenceview + 1;

    this.works.forEach((val: any) => {
      if (val.sequence == a) {
        this.viewmodals = [];
        this.viewrecords = [];
        this.viewrecords.push(val);
        this.viewmodals.push(val);
      } else if (a > this.works.length) {
        a = 1;
        if (val.sequence == a) {
          this.viewmodals = [];
          this.viewrecords = [];
          this.viewrecords.push(val);
          this.viewmodals.push(val);
        }
      }
    });
  }
  prev() {
    this.viewrecords.forEach((val: any) => {
      this.sequenceview = val.sequence;
    });
    let a = this.sequenceview - 1;

    this.works.forEach((val: any) => {
      if (val.sequence == a) {
        this.viewmodals = [];
        this.viewrecords = [];
        this.viewrecords.push(val);
        this.viewmodals.push(val);
      } else if (a < 1) {
        a = this.workimports.length;
        if (val.sequence == a) {
          this.viewmodals = [];
          this.viewrecords = [];
          this.viewrecords.push(val);
          this.viewmodals.push(val);
        }
      }
    });
  }
  vprev() {
    this.viewmodals.forEach((val: any) => {
      this.sequenceview = val.sequence;
    });
    let a = this.sequenceview - 1;

    this.works.forEach((val: any) => {
      if (val.sequence == a) {
        this.viewmodals = [];
        this.viewrecords = [];
        this.viewmodals.push(val);
      } else if (a < 1) {
        a = this.workimports.length;
        if (val.sequence == a) {
          this.viewmodals = [];
          this.viewrecords = [];
          this.viewmodals.push(val);
        }
      }
    });
  }
  eprev() {
    this.activeedits.forEach((val1: any) => {
      this.sequenceview = val1.sequence;
    });
    let a = this.sequenceview - 1;

    this.works.forEach((val: any) => {
      if (val.sequence == a) {
        this.activeedits = [];
        this.activeedits.push(val);
        if (val.checked == true) {
          document.getElementById('vieweditmodaledit')?.click();
        } else {

          document.getElementById('viewmodaleditview')?.click();
        }
      } else if (a < 1) {
        a = this.workimports.length;
        if (val.sequence == a) {
          this.activeedits = [];
          this.activeedits.push(val);
        }
      }
    });
  }

  worknameactive(event: any, workname: any, id: any, workweek: any) {
    if (event.keyCode === 13) {
      this.works.forEach((val: any) => {
        if (val.id == id) {
          if (workname != val.tname) {
            this.viewactive();
          } else {
            this.viewinactive();
            console.log('not workig');
          }
        }
      });

    } else {

    }

  }

  worknameid(event: any, workname: any, id: any) {
    this.activeon = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.name = workname;
        val.vname = workname;
        val.tname = workname;
        val.workScheduleName = workname;
      }
    });
    if (event.keyCode === 13) {
      console.log('Enter1');
      let updateCon = {
        "id": id,
        "workScheduleName": workname,
      };
      this.library.update(updateCon).subscribe((val) => {
        console.log("updated");
      });
    }
    //console.log("id",id,workname)
  }

  viewactive() {
    document.getElementById('eprev')?.classList.add('hide');
    document.getElementById('enext')?.classList.add('hide');
    document.getElementById('dprev')?.classList.add('hide');
    document.getElementById('dnext')?.classList.add('hide');
    document.getElementById('viewclose1')?.classList.add('hide');
    document.getElementById('viewclose2')?.classList.remove('hide');
    document.getElementById('viewsave1')?.classList.add('hide');
    document.getElementById('viewsave2')?.classList.remove('hide');
    document.getElementById('viewsave3')?.classList.add('hide');
    document.getElementById('viewsave4')?.classList.remove('hide');
    document.getElementById('viewsave5')?.classList.add('hide');
    document.getElementById('viewsave6')?.classList.remove('hide');
  }

  viewinactive() {
    document.getElementById('eprev')?.classList.remove('hide');
    document.getElementById('enext')?.classList.remove('hide');
    document.getElementById('dprev')?.classList.remove('hide');
    document.getElementById('dnext')?.classList.remove('hide');
    document.getElementById('viewclose1')?.classList.remove('hide');
    document.getElementById('viewclose2')?.classList.add('hide');
    document.getElementById('viewsave2')?.classList.add('hide');
    document.getElementById('viewsave1')?.classList.remove('hide');
    document.getElementById('viewsave4')?.classList.add('hide');
    document.getElementById('viewsave3')?.classList.remove('hide');
    document.getElementById('viewsave6')?.classList.add('hide');
    document.getElementById('viewsave5')?.classList.remove('hide');
  }
  cancelbtn() {
    this.viewrecords.forEach((val: any) => {
      val.vname = val.workScheduleName
      val.tname = val.workScheduleName
      val.vdayvalue = val.dayWeekStarts;
      val.vdays = val.workingDays;
      val.vdaynumber = val.numberOfDays;
      val.vtime = val.timeDayStarts;
      val.vhour = val.hoursWorking;
    });
    this.viewinactive();
  }

  closebtn() {
    document.getElementById('viewmodal')?.click();
    this.viewrecords = [];
  }
  closebutton() {

    document.getElementById('viewclose3')?.click();

    this.activeedits = [];
    // let a = 0;
    // this.activeedits.forEach((val1: any) => {
    //   a = val1.id;
    // });
    // this.works.forEach((val: any) => {
    //   if (val.id == a) {
    //     if (val.checked == false) {
    //       document.getElementById('viewclose3')?.click();
    //       if (this.activeedits.length == 1) {
    //         document.getElementById('viewmodaleditview')?.click();
    //       }
    //     } else {
    //       this.activeedits = [];
    //       document.getElementById('viewclose3')?.click();
    //     }
    //   }
    // });
  }
  vupdatedayvalue(id: any, vworkweek: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.vdayvalue = vworkweek;
      }
    });
  }
  vupdatetime(id: any, vworktime: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.vtime = vworktime;
      }
    });
  }

  vupdatehour(id: any, vworkhours: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.vhour = vworkhours;
      }
    });
  }
  workhoursedit() {
    document.getElementById('workhoursedit')?.classList.remove('edit');
    document.getElementById('workhoursedit')?.classList.add('hideedit');
    document.getElementById('workhourscheck')?.classList.remove('hidecheck');
    document.getElementById('workhourscheck')?.classList.add('check');
    document.getElementById('workhourslist')?.classList.remove('hidelist');
    document.getElementById('workhourslist')?.classList.add('list');
  }
  workhoursdone() {
    document.getElementById('workhoursedit')?.classList.add('edit');
    document.getElementById('workhoursedit')?.classList.remove('hideedit');
    document.getElementById('workhourscheck')?.classList.add('hidecheck');
    document.getElementById('workhourscheck')?.classList.remove('check');
    document.getElementById('workhourslist')?.classList.add('hidelist');
    document.getElementById('workhourslist')?.classList.remove('list');
  }
  workhourswitch() {
    if (this.hourswitch == false) {
      this.workhoursedit();
      this.hourswitch = true;
    } else {
      this.workhoursdone();
      this.hourswitch = false;
    }
  }
  worktimeswitch() {
    if (this.timeswitch == false) {
      this.worktimesedit();
      this.timeswitch = true;
    } else {
      this.worktimesdone();
      this.timeswitch = false;
    }
  }
  workdayswitch() {
    if (this.dayswitch == false) {
      this.workedit();
      this.dayswitch = true;
    } else {
      this.workdone();
      this.dayswitch = false;
    }
  }
  workweekswitch(workweek: any, id: any) {
    if (this.weekwitch == false) {
      this.workdayedit(workweek, id);
      this.weekwitch = true;
    } else {
      this.workdaydone();
      this.weekwitch = false;
    }
  }
  worktimesedit() {
    document.getElementById('edit2')?.classList.remove('edit');
    document.getElementById('edit2')?.classList.add('hideedit');
    document.getElementById('check2')?.classList.remove('hidecheck');
    document.getElementById('check2')?.classList.add('check');
    document.getElementById('list2')?.classList.remove('hidelist');
    document.getElementById('list2')?.classList.add('list2');
  }
  worktimesdone() {
    document.getElementById('edit2')?.classList.add('edit');
    document.getElementById('edit2')?.classList.remove('hideedit');
    document.getElementById('check2')?.classList.add('hidecheck');
    document.getElementById('check2')?.classList.remove('check');
    document.getElementById('list2')?.classList.add('hidelist');
    document.getElementById('list2')?.classList.remove('list2');
  }
  workedit() {
    document.getElementById('edit')?.classList.remove('edit');
    document.getElementById('edit')?.classList.add('hideedit');
    document.getElementById('check')?.classList.remove('hidecheck');
    document.getElementById('check')?.classList.add('check');
    document.getElementById('list')?.classList.remove('hidelist');
    document.getElementById('list')?.classList.add('list');
  }
  workdone() {
    document.getElementById('edit')?.classList.add('edit');
    document.getElementById('edit')?.classList.remove('hideedit');
    document.getElementById('check')?.classList.add('hidecheck');
    document.getElementById('check')?.classList.remove('check');
    document.getElementById('list')?.classList.add('hidelist');
    document.getElementById('list')?.classList.remove('list');
  }
  workdayedit(workweek: any, id: any) {
    document.getElementById('edit3')?.classList.remove('edit');
    document.getElementById('edit3')?.classList.add('hideedit');
    document.getElementById('check3')?.classList.remove('hidecheck');
    document.getElementById('check3')?.classList.add('check');
    document.getElementById('list3')?.classList.remove('hidelist');
    document.getElementById('list3')?.classList.add('list');
    this.activeworkweek(workweek, id);

  }
  workdaydone() {
    document.getElementById('edit3')?.classList.add('edit');
    document.getElementById('edit3')?.classList.remove('hideedit');
    document.getElementById('check3')?.classList.add('hidecheck');
    document.getElementById('check3')?.classList.remove('check');
    document.getElementById('list3')?.classList.add('hidelist');
    document.getElementById('list3')?.classList.remove('list');
  }
  onCheckboxChange(option: any, event: any, id: any) {
    console.log(option);
    if (event.target.checked) {
      this.options.forEach((optionvalue: any) => {
        if (optionvalue.value == option) {
          this.checkedLists.push(optionvalue);
        }
      });
      this.checkedactive();
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
      this.checkedactive();
    }
    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
      console.log('true');
    } else {
      this.status = false;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
      console.log('false');
    }

  }
  eonCheckboxChange(option: any, event: any, id: any) {
    this.activeon = true;
    console.log(option);
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
    console.log('ok', this.checkedLists);
    console.log('ok', this.checkedList);
    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
      console.log('true');
    } else {
      this.status = false;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
      console.log('false');
    }
  }
  selectallday(id: any) {
    this.checkedLists = [];
    this.checkedList = [];
    this.status = !this.status;
    console.log(this.status)
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
  }
  checkedvalues(id: any) {
    document.getElementById('clobtn' + id)?.classList.add('hide');
    document.getElementById('canbtn' + id)?.classList.remove('hide');
    document.getElementById('appbtns' + id)?.classList.add('hide');
    document.getElementById('appbtn' + id)?.classList.remove('hide');
  }
  selectalldays() {
    this.checkedLists = [];
    this.checkedList = [];
    this.status = !this.status;
    console.log(this.status)
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
    this.checkedactive();
  }
  checkedactive() {
    document.getElementById('vclobtn')?.classList.add('hide');
    document.getElementById('vcanbtn')?.classList.remove('hide');
    document.getElementById('vappbtns')?.classList.add('hide');
    document.getElementById('vappbtn')?.classList.remove('hide');
  }
  checkedinactive() {
    document.getElementById('vclobtn')?.classList.remove('hide');
    document.getElementById('vcanbtn')?.classList.add('hide');
    document.getElementById('vappbtns')?.classList.remove('hide');
    document.getElementById('vappbtn')?.classList.add('hide');
  }
  canbtn(id: any) {
    this.checkedinactive();
    this.options.forEach((val3: any) => {
      val3.checked = false;
    });
    this.checkedList = [];
    this.checkedLists = [];
    this.works.forEach((val2: any) => {
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
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
      console.log('true');
    } else {
      this.status = false;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
      console.log('false');
    }

  }
  checkedvaluess(id: any) {
    document.getElementById('clobtn' + id)?.classList.remove('hide');
    document.getElementById('canbtn' + id)?.classList.add('hide');
    document.getElementById('appbtns' + id)?.classList.remove('hide');
    document.getElementById('appbtn' + id)?.classList.add('hide');
  }
  canbutton(id: any) {
    this.checkedvaluess(id);
    this.activeon = false;
    this.options.forEach((val3: any) => {
      val3.checked = false;
    });
    this.checkedList = [];
    this.checkedLists = [];
    this.works.forEach((val2: any) => {
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
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
      console.log('true');
    } else {
      this.status = false;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
      console.log('false');
    }

  }
  activeworkweek(workweek: any, id: any) {
    this.checkedList = [];
    this.checkedLists = [];
    this.options.forEach((val: any) => {
      val.checked = false;
    });
    var week = workweek;
    console.log(week);
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

    console.log(this.checkedLists.length);
    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
      console.log('true');
    } else {
      this.status = false;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
      console.log('false');
    }
  }


  vupdateapply(id: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.vdays = this.checkedList.toString();
        val.vdaynumber = this.checkedList.length;
      }
    });
  }


  savenextbtn(id: any, vworkname: any, vworkdays: any, vworkdayssss: any, vworkweek: any, vworktime: any, vworkhours: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        if (this.checkedList == '') {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;
        } else {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdays = this.checkedList.toString();
          val.vdaynumber = this.checkedList.length;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;

        }
      }
    });
    let updateCon = {
      "id": id,
      "workScheduleName": vworkname,
      "workingDays": vworkdays,
      "numberOfDays": vworkdayssss,
      "dayWeekStarts": vworkweek,
      "timeDayStarts": vworktime,
      "hoursWorking": vworkhours,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.works=val;
    });
    this.next();
  }
  vsavenextbtn(id: any, vworkname: any, vworkdays: any, vworkdayssss: any, vworkweek: any, vworktime: any, vworkhours: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        if (this.checkedList == '') {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;
        } else {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdays = this.checkedList.toString();
          val.vdaynumber = this.checkedList.length;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;

        }
      }
    });
    let updateCon = {
      "id": id,
      "workScheduleName": vworkname,
      "workingDays": vworkdays,
      "numberOfDays": vworkdayssss,
      "dayWeekStarts": vworkweek,
      "timeDayStarts": vworktime,
      "hoursWorking": vworkhours,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.works=val;
    });
    this.enext();
  }
  saveclose(id: any, vworkname: any, vworkdays: any, vworkdayssss: any, vworkweek: any, vworktime: any, vworkhours: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        if (this.checkedList == '') {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;
        } else {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdays = this.checkedList.toString();
          val.vdaynumber = this.checkedList.length;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;

        }
      }
    });
    let updateCon = {
      "id": id,
      "workScheduleName": vworkname,
      "workingDays": vworkdays,
      "numberOfDays": vworkdayssss,
      "dayWeekStarts": vworkweek,
      "timeDayStarts": vworktime,
      "hoursWorking": vworkhours,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.works=val;
    });
    this.viewupdateclose();
  }
  savebtn(id: any, vworkname: any, vworkdays: any, vworkdayssss: any, vworkweek: any, vworktime: any, vworkhours: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        if (this.checkedList == '') {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;
        } else {
          val.vname = vworkname;
          val.tname = vworkname;
          val.vdays = this.checkedList.toString();
          val.vdaynumber = this.checkedList.length;
          val.vdayvalue = vworkweek;
          val.vtime = vworktime;
          val.vhour = vworkhours;

        }
      }
    });
    let updateCon = {
      "id": id,
      "workScheduleName": vworkname,
      "workingDays": vworkdays,
      "numberOfDays": vworkdayssss,
      "dayWeekStarts": vworkweek,
      "timeDayStarts": vworktime,
      "hoursWorking": vworkhours,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.works=val;
    });
  }
  viewupdateclose() {
    this.works.forEach((val: any) => {
      val.workScheduleName = val.vname;
      val.workingDays = val.vdays;
      val.numberOfDays = val.vdaynumber;
      val.dayWeekStarts = val.vdayvalue;
      val.timeDayStarts = val.vtime;
      val.hoursWorking = val.vhour;
    });
    this.viewinactive();
  }

  viewclosemodal() {
    document.getElementById('viewmodal')?.click();
    this.viewrecords = [];
  }
  viewclosemodal1() {
    if (this.disabledouble == false) {
      if (this.activeedits.length == 1) {
        console.log('enter1')
        document.getElementById('viewmodaleditview')?.click();
      } else {
        console.log('enter2')
        this.viewrecords = [];
      }

    } else {
      console.log('enter3')
      document.getElementById('viewmodal')?.click();
      this.viewrecords = [];
    }

  }


  activeweek(workweek: any, id: any) {
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

    console.log(this.checkedLists.length);
    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = true;
        }
      });
      console.log('true');
    } else {
      this.status = false;
      this.works.forEach((val: any) => {
        if (val.id == id) {
          val.ischeckedvalue = false;
        }
      });
      console.log('false');
    }
  }
  editweek(id: any, workweek: any) {
    if (this.activeon == false) {
      this.activeon = true;
      document.getElementById('editweek' + id)?.classList.add('hide');
      document.getElementById('doneweek' + id)?.classList.remove('hide');
      document.getElementById('listweek' + id)?.classList.remove('hide');
      this.activeworkweek(workweek, id);
    } else {

    }

  }
  updateweek(id: any) {
    this.activeon = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.days = this.checkedList.toString();
        val.vdays = this.checkedList.toString();
        val.workingDays = this.checkedList.toString();
        val.daynumber = this.checkedList.length;
        val.vdaynumber = this.checkedList.length;
        val.numberOfDays = this.checkedList.length;
      }
    });
    //console.log("id",id,workname)
    let updateCon = {
      "id": id,
      "workingDays": this.checkedList.toString(),
      "numberOfDays": this.checkedList.length
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.works=val;
      // window.location.reload();
    });

  }
  doneweek(id: any) {
    this.activeon = false;
    document.getElementById('editweek' + id)?.classList.remove('hide');
    document.getElementById('doneweek' + id)?.classList.add('hide');
    document.getElementById('listweek' + id)?.classList.add('hide');
    this.options.forEach((val: any) => {
      val.checked = false;
    });
    this.checkedList = [];
    this.checkedLists = [];
    this.status = false;
    this.checkedvaluess(id);
  }
  editdays(id: any, workday: any) {
    if (this.activeon == false) {
      this.activeon = true;
      document.getElementById('editdays' + id)?.classList.add('hide');
      document.getElementById('donedays' + id)?.classList.remove('hide');
      document.getElementById('listdays' + id)?.classList.remove('hide');
      this.days.forEach((val2: any) => {
        if (val2.day == workday) {
          document.getElementById('mworkingday' + id + val2.idday)?.classList.add('active');
        }
      });
    } else {

    }

  }

  donedays(id: any) {
    this.activeon = false;
    document.getElementById('editdays' + id)?.classList.remove('hide');
    document.getElementById('donedays' + id)?.classList.add('hide');
    document.getElementById('listdays' + id)?.classList.add('hide');
    this.days.forEach((val2: any) => {
      document.getElementById('mworkingday' + id + val2.idday)?.classList.remove('active');
    });
  }
  updatedays(id: any, workweek: any) {
    this.activeon = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.dayWeekStarts = workweek;
        val.dayvalue = workweek;
        val.vdayvalue = workweek;
      }
    });
    //console.log("id",id,workname)
    let updateCon = {
      "id": id,
      "dayWeekStarts": workweek,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.works=val;
    });
  }
  edittimes(id: any, worktime: any) {
    if (this.activeon == false) {
      this.activeon = true;
      document.getElementById('edittimes' + id)?.classList.add('hide');
      document.getElementById('donetimes' + id)?.classList.remove('hide');
      document.getElementById('listtimes' + id)?.classList.remove('hide');
      this.timevalues.forEach((val2: any) => {
        if (val2.optionValue == worktime) {
          document.getElementById('mworkingtime' + id + val2.id)?.classList.add('active');
        }
      });
    }

  }

  donetimes(id: any) {
    this.activeon = false;
    document.getElementById('edittimes' + id)?.classList.remove('hide');
    document.getElementById('donetimes' + id)?.classList.add('hide');
    document.getElementById('listtimes' + id)?.classList.add('hide');
    this.timevalues.forEach((val2: any) => {
      document.getElementById('mworkingtime' + id + val2.id)?.classList.remove('active');
    });
  }
  updatetimes(id: any, worktime: any) {
    this.activeon = false;
    this.works.forEach((val: any) => {
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
      //this.works=val;
    });

  }
  edithour(id: any, workhour: any) {
    if (this.activeon == false) {
      document.getElementById('edithour' + id)?.classList.add('hide');
      document.getElementById('donehour' + id)?.classList.remove('hide');
      document.getElementById('listhour' + id)?.classList.remove('hide');
      this.hourvalues.forEach((val2: any) => {
        if (val2.optionValue == workhour) {
          document.getElementById('mworkinghour' + id + val2.id)?.classList.add('active');

        }
      });
    }

  }

  donehour(id: any) {
    this.activeon = false;
    document.getElementById('edithour' + id)?.classList.remove('hide');
    document.getElementById('donehour' + id)?.classList.add('hide');
    document.getElementById('listhour' + id)?.classList.add('hide');
    this.hourvalues.forEach((val2: any) => {
      document.getElementById('mworkinghour' + id + val2.id)?.classList.remove('active');
    });
  }
  updatehour(id: any, workhours: any) {
    this.activeon = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.hour = workhours;
        val.vhour = workhours;
        val.hoursWorking = workhours;
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
      "hoursWorking": workhours,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.works=val;
    });

  }
  editbuttinactive() {
    if (this.activedelete == true) {
      this.activededit = true;
      this.works.forEach((val: any) => {
        this.activeditrow(val.id);
        if (val.sequence == 1) {
          document.getElementById('workele' + val.id)?.focus();
        }

      });
      this.activeedit.forEach((val1: any) => {
        document.getElementById('doubletabrow' + val1.id)?.classList.remove('opacitytr');
        document.getElementById('editrow1name' + val1.id)?.classList.add('hide');
        document.getElementById('editrow2name' + val1.id)?.classList.remove('hide');
        document.getElementById('editrow1week' + val1.id)?.classList.add('hide');
        document.getElementById('editrow2week' + val1.id)?.classList.remove('hide');
        document.getElementById('editrow1noday' + val1.id)?.classList.add('hide');
        document.getElementById('editrow2noday' + val1.id)?.classList.remove('hide');
        document.getElementById('editrow1days' + val1.id)?.classList.add('hide');
        document.getElementById('editrow2days' + val1.id)?.classList.remove('hide');
        document.getElementById('editrow1times' + val1.id)?.classList.add('hide');
        document.getElementById('editrow2times' + val1.id)?.classList.remove('hide');
        document.getElementById('editrow1hour' + val1.id)?.classList.add('hide');
        document.getElementById('editrow2hour' + val1.id)?.classList.remove('hide');
      });

      this.works.forEach((valchecked: any) => {
        if (valchecked.checked == false) {
          document.getElementById('doubletabrow' + valchecked.id)?.classList.remove('opacitytr');
          document.getElementById('editrow1name' + valchecked.id)?.classList.add('hide');
          document.getElementById('editrow4name' + valchecked.id)?.classList.remove('hide');
          document.getElementById('editrow1week' + valchecked.id)?.classList.add('hide');
          document.getElementById('editrow4week' + valchecked.id)?.classList.remove('hide');
          document.getElementById('editrow1noday' + valchecked.id)?.classList.add('hide');
          document.getElementById('editrow4noday' + valchecked.id)?.classList.remove('hide');
          document.getElementById('editrow1days' + valchecked.id)?.classList.add('hide');
          document.getElementById('editrow4days' + valchecked.id)?.classList.remove('hide');
          document.getElementById('editrow1times' + valchecked.id)?.classList.add('hide');
          document.getElementById('editrow4times' + valchecked.id)?.classList.remove('hide');
          document.getElementById('editrow1hour' + valchecked.id)?.classList.add('hide');
          document.getElementById('editrow4hour' + valchecked.id)?.classList.remove('hide');
        } else {
        }
      });

    }

  }
  editallbuttonactive() {
    this.works.forEach((val: any) => {
      val.checked = true;
      this.activeditrow(val.id);
      if (val.sequence == 1) {
        document.getElementById('workele' + val.id)?.focus();
      }

    });
    this.activeedit = [];
    this.works.forEach((valchecked: any) => {
      this.activeedit.push(valchecked);
      document.getElementById('editrow1name' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow2name' + valchecked.id)?.classList.remove('hide');
      document.getElementById('editrow4name' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow1week' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow4week' + valchecked.id)?.classList.add('hide')
      document.getElementById('editrow2week' + valchecked.id)?.classList.remove('hide');
      document.getElementById('editrow1noday' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow4noday' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow2noday' + valchecked.id)?.classList.remove('hide');
      document.getElementById('editrow1days' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow4days' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow2days' + valchecked.id)?.classList.remove('hide');
      document.getElementById('editrow1times' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow4times' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow2times' + valchecked.id)?.classList.remove('hide');
      document.getElementById('editrow1hour' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow4hour' + valchecked.id)?.classList.add('hide');
      document.getElementById('editrow2hour' + valchecked.id)?.classList.remove('hide');
    });

  }
  activeditrow(id: any) {
    document.getElementById('eheader1')?.classList.add('hide');
    document.getElementById('eheader2')?.classList.remove('hide');
    document.getElementById('eheader3')?.classList.add('hide');
    document.getElementById('eheader4')?.classList.remove('hide');
    document.getElementById('eheader5')?.classList.add('hide');
    document.getElementById('eheader6')?.classList.remove('hide');
    document.getElementById('eheader7')?.classList.add('hide');
    document.getElementById('eheader8')?.classList.remove('hide');
    document.getElementById('eheader9')?.classList.add('hide');
    document.getElementById('eheader10')?.classList.remove('hide');

    document.getElementById('checkhover1')?.classList.add('hide');
    document.getElementById('checkhover2')?.classList.add('hide');
    document.getElementById('editbutton')?.classList.add('hide');
    document.getElementById('deletebutton')?.classList.add('hide');
    document.getElementById('bottomimg')?.classList.add('hide');
    document.getElementById('viewallbutton')?.classList.remove('hide');
    document.getElementById('doneallbutton')?.classList.remove('hide');
    document.getElementById('editallbutton')?.classList.remove('hide');
    this.works.forEach((val: any) => {
      if (val.id != id) {
        document.getElementById('checkboxrow' + val.id)?.classList.add('hide');
        document.getElementById('checkboxrows' + val.id)?.classList.remove('hide');
      }
    });
  }
  inactiveditrow(id: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.checked = false;
        this.isunselectall = false;
        this.isselectall = false;
        let item = this.checkedlist.filter(function (item: any) {
          return item.id === id;
        })[0];
        let index = this.checkedlist.indexOf(item);
        this.checkedlist.splice(index, 1);
        document.getElementById('selectallrows')?.classList.add('subli1checkbox1');
        document.getElementById('selectallrows')?.classList.remove('subli1checkbox2');
        document.getElementById('selectallrows')?.classList.remove('opacitycheck');
        document.getElementById('selectalltext')?.classList.remove('opacitycheck');

        let item1 = this.viewdeleterecords.filter(function (item1: any) {
          return item1.id === id;
        })[0];
        let index1 = this.viewdeleterecords.indexOf(item1);
        this.viewdeleterecords.splice(index1, 1);
        this.activeedit.splice(index1, 1);
        console.log('delete', this.viewdeleterecords);
      }
    });
    if (this.checkedlist.length == 0) {
      this.unselectall();
      this.isunselectall = true;
      this.disabledouble = true;
      this.activedelete = false;
    }

    document.getElementById('editrow1name' + id)?.classList.remove('hide');
    document.getElementById('editrow2name' + id)?.classList.add('hide');
    document.getElementById('editrow1week' + id)?.classList.remove('hide');
    document.getElementById('editrow2week' + id)?.classList.add('hide');
    document.getElementById('editrow1noday' + id)?.classList.remove('hide');
    document.getElementById('editrow2noday' + id)?.classList.add('hide');
    document.getElementById('editrow1days' + id)?.classList.remove('hide');
    document.getElementById('editrow2days' + id)?.classList.add('hide');
    document.getElementById('editrow1times' + id)?.classList.remove('hide');
    document.getElementById('editrow2times' + id)?.classList.add('hide');
    document.getElementById('editrow1hour' + id)?.classList.remove('hide');
    document.getElementById('editrow2hour' + id)?.classList.add('hide');

    if (this.activeedit.length == 0) {
      this.activededit = false;
      document.getElementById('eheader1')?.classList.remove('hide');
      document.getElementById('eheader2')?.classList.add('hide');
      document.getElementById('checkhover1')?.classList.remove('hide');
      document.getElementById('checkhover2')?.classList.remove('hide');
      document.getElementById('editbutton')?.classList.remove('hide');
      document.getElementById('deletebutton')?.classList.remove('hide');
      document.getElementById('bottomimg')?.classList.remove('hide');
      document.getElementById('viewallbutton')?.classList.add('hide');
      document.getElementById('doneallbutton')?.classList.add('hide');
      document.getElementById('editallbutton')?.classList.add('hide');
      this.works.forEach((val1: any) => {
        document.getElementById('checkboxrow' + val1.id)?.classList.remove('hide');
        document.getElementById('checkboxrows' + val1.id)?.classList.add('hide');
      });
    }

  }
  inactivedoneall() {
    this.activededit = false;
    this.activeedits = [];
    this.works.forEach((val: any) => {
      this.unselectall();
      this.isunselectall = true;
      this.disabledouble = true;
      this.activedelete = false;
      document.getElementById('eheader1')?.classList.remove('hide');
      document.getElementById('eheader2')?.classList.add('hide');
      document.getElementById('eheader3')?.classList.remove('hide');
      document.getElementById('eheader4')?.classList.add('hide');
      document.getElementById('eheader5')?.classList.remove('hide');
      document.getElementById('eheader6')?.classList.add('hide');
      document.getElementById('eheader7')?.classList.remove('hide');
      document.getElementById('eheader8')?.classList.add('hide');
      document.getElementById('eheader9')?.classList.remove('hide');
      document.getElementById('eheader10')?.classList.add('hide');
      document.getElementById('doubletabrow' + val.id)?.classList.add('opacitytr');
      document.getElementById('editrow1name' + val.id)?.classList.remove('hide');
      document.getElementById('editrow2name' + val.id)?.classList.add('hide');
      document.getElementById('editrow4name' + val.id)?.classList.add('hide');
      document.getElementById('editrow1week' + val.id)?.classList.remove('hide');
      document.getElementById('editrow2week' + val.id)?.classList.add('hide');
      document.getElementById('editrow4week' + val.id)?.classList.add('hide');
      document.getElementById('editrow1noday' + val.id)?.classList.remove('hide');
      document.getElementById('editrow2noday' + val.id)?.classList.add('hide');
      document.getElementById('editrow4noday' + val.id)?.classList.add('hide');
      document.getElementById('editrow1days' + val.id)?.classList.remove('hide');
      document.getElementById('editrow2days' + val.id)?.classList.add('hide');
      document.getElementById('editrow4days' + val.id)?.classList.add('hide');
      document.getElementById('editrow1times' + val.id)?.classList.remove('hide');
      document.getElementById('editrow2times' + val.id)?.classList.add('hide');
      document.getElementById('editrow4times' + val.id)?.classList.add('hide');
      document.getElementById('editrow1hour' + val.id)?.classList.remove('hide');
      document.getElementById('editrow2hour' + val.id)?.classList.add('hide');
      document.getElementById('editrow4hour' + val.id)?.classList.add('hide');
      document.getElementById('checkhover1')?.classList.remove('hide');
      document.getElementById('checkhover2')?.classList.remove('hide');
      document.getElementById('editbutton')?.classList.remove('hide');
      document.getElementById('deletebutton')?.classList.remove('hide');
      document.getElementById('bottomimg')?.classList.remove('hide');
      document.getElementById('viewallbutton')?.classList.add('hide');
      document.getElementById('doneallbutton')?.classList.add('hide');
      document.getElementById('editallbutton')?.classList.add('hide');
    });
    this.works.forEach((val1: any) => {
      document.getElementById('checkboxrow' + val1.id)?.classList.remove('hide');
      document.getElementById('checkboxrows' + val1.id)?.classList.add('hide');
    });
  }
  checkboxhover(id: any) {
    document.getElementById('editrow1name' + id)?.classList.add('hide');
    document.getElementById('editrow3name' + id)?.classList.remove('hide');
    document.getElementById('editrow1week' + id)?.classList.add('hide');
    document.getElementById('editrow3week' + id)?.classList.remove('hide');
    document.getElementById('editrow1noday' + id)?.classList.add('hide');
    document.getElementById('editrow3noday' + id)?.classList.remove('hide');
    document.getElementById('editrow1days' + id)?.classList.add('hide');
    document.getElementById('editrow3days' + id)?.classList.remove('hide');
    document.getElementById('editrow1times' + id)?.classList.add('hide');
    document.getElementById('editrow3times' + id)?.classList.remove('hide');
    document.getElementById('editrow1hour' + id)?.classList.add('hide');
    document.getElementById('editrow3hour' + id)?.classList.remove('hide');
  }
  checkboxhoverleave(id: any) {
    document.getElementById('editrow3name' + id)?.classList.add('hide');
    document.getElementById('editrow1name' + id)?.classList.remove('hide');
    document.getElementById('editrow3week' + id)?.classList.add('hide');
    document.getElementById('editrow1week' + id)?.classList.remove('hide');
    document.getElementById('editrow3noday' + id)?.classList.add('hide');
    document.getElementById('editrow1noday' + id)?.classList.remove('hide');
    document.getElementById('editrow3days' + id)?.classList.add('hide');
    document.getElementById('editrow1days' + id)?.classList.remove('hide');
    document.getElementById('editrow3times' + id)?.classList.add('hide');
    document.getElementById('editrow1times' + id)?.classList.remove('hide');
    document.getElementById('editrow3hour' + id)?.classList.add('hide');
    document.getElementById('editrow1hour' + id)?.classList.remove('hide');
  }
  mousehoverincheckbox(id: any) {
    document.getElementById('doubletabrow' + id)?.classList.remove('opacitytr');
  }
  mousehoveroutcheckbox(id: any) {
    document.getElementById('doubletabrow' + id)?.classList.add('opacitytr');
  }
  updateworkname(id: any, workname: any) {
    this.activeon = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.name = workname;
        val.vname = workname;
        val.tname = workname;
        val.workScheduleName = workname;
      }
    });
    //console.log("id",id,workname)
    let updateCon = {
      "id": id,
      "workScheduleName": workname,
    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated");
      //this.works=val;
    });
  }
  mousinsave(id: any) {
    document.getElementById('save1csv' + id)?.classList.add('hide');
    document.getElementById('savecsv1hover' + id)?.classList.remove('hide')
  }
  mouseoutsave(id: any) {
    document.getElementById('save1csv' + id)?.classList.remove('hide');
    document.getElementById('savecsv1hover' + id)?.classList.add('hide')
  }
  mousinsaves(id: any) {
    document.getElementById('savecsv' + id)?.classList.add('hide');
    document.getElementById('savecsvhover' + id)?.classList.remove('hide')
  }
  mouseoutsaves(id: any) {
    document.getElementById('savecsv' + id)?.classList.remove('hide');
    document.getElementById('savecsvhover' + id)?.classList.add('hide')
  }
  mousinedit(id: any) {
    document.getElementById('editcsv' + id)?.classList.add('hide');
    document.getElementById('editcsvhover' + id)?.classList.remove('hide')
  }
  mouseoutedit(id: any) {
    document.getElementById('editcsv' + id)?.classList.remove('hide');
    document.getElementById('editcsvhover' + id)?.classList.add('hide')
  }
  mousinedits(id: any) {
    document.getElementById('edit1csv' + id)?.classList.add('hide');
    document.getElementById('edit1csvhover' + id)?.classList.remove('hide')
  }
  mouseoutedits(id: any) {
    document.getElementById('edit1csv' + id)?.classList.remove('hide');
    document.getElementById('edit1csvhover' + id)?.classList.add('hide')
  }

  editsinglerow(id: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.checked = true;
        this.activeedit.push(val);
      }
    });
    document.getElementById('workele' + id)?.focus();
    document.getElementById('editrow2name' + id)?.classList.remove('hide');
    document.getElementById('editrow4name' + id)?.classList.add('hide');
    document.getElementById('editrow2week' + id)?.classList.remove('hide');
    document.getElementById('editrow4week' + id)?.classList.add('hide');
    document.getElementById('editrow2noday' + id)?.classList.remove('hide');
    document.getElementById('editrow4noday' + id)?.classList.add('hide');
    document.getElementById('editrow2days' + id)?.classList.remove('hide');
    document.getElementById('editrow4days' + id)?.classList.add('hide');
    document.getElementById('editrow2times' + id)?.classList.remove('hide');
    document.getElementById('editrow4times' + id)?.classList.add('hide');
    document.getElementById('editrow2hour' + id)?.classList.remove('hide');
    document.getElementById('editrow4hour' + id)?.classList.add('hide');
  }

  savesinglerow(id: any) {
    this.works.forEach((val: any) => {
      if (val.id == id) {
        val.checked = false;
      }
    });
    let item = this.activeedit.filter(function (item: any) {
      return item.id === id;
    })[0];
    let index = this.activeedit.indexOf(item);
    this.activeedit.splice(index, 1);
    document.getElementById('editrow4name' + id)?.classList.remove('hide');
    document.getElementById('editrow2name' + id)?.classList.add('hide');
    document.getElementById('editrow4week' + id)?.classList.remove('hide');
    document.getElementById('editrow2week' + id)?.classList.add('hide');
    document.getElementById('editrow4noday' + id)?.classList.remove('hide');
    document.getElementById('editrow2noday' + id)?.classList.add('hide');
    document.getElementById('editrow4days' + id)?.classList.remove('hide');
    document.getElementById('editrow2days' + id)?.classList.add('hide');
    document.getElementById('editrow4times' + id)?.classList.remove('hide');
    document.getElementById('editrow2times' + id)?.classList.add('hide');
    document.getElementById('editrow4hour' + id)?.classList.remove('hide');
    document.getElementById('editrow2hour' + id)?.classList.add('hide');

    if (this.activeedit.length == 0) {
      this.inactivedoneall();
    }
  }
  deletepopupwidth() {
    this.deletearray = [];
    this.deleterecords.forEach((val: any) => {
      this.deletearray.push(val.numberOfDays);
    });
    var max = this.deletearray.reduce((a: number, b: number) => Math.max(a, b));
    if (max == 1) {
      document.documentElement.style.setProperty('--x', '0px');
      document.getElementById('addmargin1width')?.classList.add('deletepopup6margin');
      document.getElementById('addmargin2width')?.classList.add('deletepopup5margin');
      document.getElementById('addmargin3width')?.classList.add('deletepopup6margin');
      this.deleterecords.forEach((val: any) => {
        document.getElementById('addmargin4width' + val.id)?.classList.add('deletepopup6margin');
        document.getElementById('addmargin5width' + val.id)?.classList.add('deletepopup5margin');
        document.getElementById('addmargin6width' + val.id)?.classList.add('deletepopup6margin');
      });
    } else if (max == 2) {
      document.documentElement.style.setProperty('--x', '0px');
      document.getElementById('addmargin1width')?.classList.remove('deletepopup6margin');
      document.getElementById('addmargin2width')?.classList.remove('deletepopup5margin');
      document.getElementById('addmargin3width')?.classList.remove('deletepopup6margin');
      this.deleterecords.forEach((val: any) => {
        document.getElementById('addmargin4width' + val.id)?.classList.remove('deletepopup6margin');
        document.getElementById('addmargin5width' + val.id)?.classList.remove('deletepopup5margin');
        document.getElementById('addmargin6width' + val.id)?.classList.remove('deletepopup6margin');
      });
    } else if (max == 3) {
      document.documentElement.style.setProperty('--x', '0px');
      document.getElementById('addmargin1width')?.classList.add('deletepopup4margin');
      document.getElementById('addmargin2width')?.classList.add('deletepopup3margin');
      document.getElementById('addmargin3width')?.classList.add('deletepopup4margin');
      this.deleterecords.forEach((val: any) => {
        document.getElementById('addmargin4width' + val.id)?.classList.add('deletepopup4margin');
        document.getElementById('addmargin5width' + val.id)?.classList.add('deletepopup3margin');
        document.getElementById('addmargin6width' + val.id)?.classList.add('deletepopup4margin');
      });
    } else if (max == 4) {
      document.documentElement.style.setProperty('--x', '10px');
      document.getElementById('addmargin1width')?.classList.add('deletepopup1margin');
      document.getElementById('addmargin2width')?.classList.add('deletepopup2margin');
      document.getElementById('addmargin3width')?.classList.add('deletepopup1margin');
      this.deleterecords.forEach((val: any) => {
        document.getElementById('addmargin4width' + val.id)?.classList.add('deletepopup1margin');
        document.getElementById('addmargin5width' + val.id)?.classList.add('deletepopup2margin');
        document.getElementById('addmargin6width' + val.id)?.classList.add('deletepopup1margin');
      });
    } else if (max == 5) {
      document.documentElement.style.setProperty('--x', '35px');
      document.getElementById('addmargin1width')?.classList.add('deletepopup1margin');
      document.getElementById('addmargin2width')?.classList.add('deletepopup2margin');
      document.getElementById('addmargin3width')?.classList.add('deletepopup1margin');
      this.deleterecords.forEach((val: any) => {
        document.getElementById('addmargin4width' + val.id)?.classList.add('deletepopup1margin');
        document.getElementById('addmargin5width' + val.id)?.classList.add('deletepopup2margin');
        document.getElementById('addmargin6width' + val.id)?.classList.add('deletepopup1margin');
      });
    } else if (max == 6) {
      document.documentElement.style.setProperty('--x', '55px');
      document.getElementById('addmargin1width')?.classList.add('deletepopup1margin');
      document.getElementById('addmargin2width')?.classList.add('deletepopup2margin');
      document.getElementById('addmargin3width')?.classList.add('deletepopup1margin');
      this.deleterecords.forEach((val: any) => {
        document.getElementById('addmargin4width' + val.id)?.classList.add('deletepopup1margin');
        document.getElementById('addmargin5width' + val.id)?.classList.add('deletepopup2margin');
        document.getElementById('addmargin6width' + val.id)?.classList.add('deletepopup1margin');
      });
    } else if (max == 7) {
      document.documentElement.style.setProperty('--x', '75px');
      document.getElementById('addmargin1width')?.classList.add('deletepopup1margin');
      document.getElementById('addmargin2width')?.classList.add('deletepopup2margin');
      document.getElementById('addmargin3width')?.classList.add('deletepopup1margin');
      this.deleterecords.forEach((val: any) => {
        document.getElementById('addmargin4width' + val.id)?.classList.add('deletepopup1margin');
        document.getElementById('addmargin5width' + val.id)?.classList.add('deletepopup2margin');
        document.getElementById('addmargin6width' + val.id)?.classList.add('deletepopup1margin');
      });
    }
    this.delete2array = [];
    this.deleterecords.forEach((val: any) => {
      let a = val.workScheduleName
      this.delete2array.push(a.length);
    });
    var maxcha = this.delete2array.reduce((a: number, b: number) => Math.max(a, b));
    console.log(maxcha);
    if (maxcha <= 16) {
      document.documentElement.style.setProperty('--y', '0px');
    } else if (maxcha >= 17 && maxcha <= 25) {
      document.documentElement.style.setProperty('--y', '10px');
    } else if (maxcha >= 26 && maxcha <= 35) {
      document.documentElement.style.setProperty('--y', '65px');
    } else if (maxcha >= 36 && maxcha <= 45) {
      document.documentElement.style.setProperty('--y', '125px');
    } else if (maxcha >= 46 && maxcha <= 55) {
      document.documentElement.style.setProperty('--y', '185px');
    } else if (maxcha >= 56 && maxcha <= 65) {
      document.documentElement.style.setProperty('--y', '245px');
    } else if (maxcha >= 66 && maxcha <= 75) {
      document.documentElement.style.setProperty('--y', '305px');
    }

  }
  closedeletewidth() {
    document.documentElement.style.setProperty('--y', '0px');
    document.documentElement.style.setProperty('--x', '0px');
    document.getElementById('addmargin1width')?.classList.remove('deletepopup1margin');
    document.getElementById('addmargin2width')?.classList.remove('deletepopup2margin');
    document.getElementById('addmargin3width')?.classList.remove('deletepopup1margin');
    document.getElementById('addmargin1width')?.classList.remove('deletepopup4margin');
    document.getElementById('addmargin2width')?.classList.remove('deletepopup3margin');
    document.getElementById('addmargin3width')?.classList.remove('deletepopup4margin');
    document.getElementById('addmargin1width')?.classList.remove('deletepopup6margin');
    document.getElementById('addmargin2width')?.classList.remove('deletepopup5margin');
    document.getElementById('addmargin3width')?.classList.remove('deletepopup6margin');
    this.deleterecords.forEach((val: any) => {
      document.getElementById('addmargin4width' + val.id)?.classList.remove('deletepopup1margin');
      document.getElementById('addmargin5width' + val.id)?.classList.remove('deletepopup2margin');
      document.getElementById('addmargin6width' + val.id)?.classList.remove('deletepopup1margin');
      document.getElementById('addmargin4width' + val.id)?.classList.remove('deletepopup4margin');
      document.getElementById('addmargin5width' + val.id)?.classList.remove('deletepopup3margin');
      document.getElementById('addmargin6width' + val.id)?.classList.remove('deletepopup4margin');
      document.getElementById('addmargin4width' + val.id)?.classList.remove('deletepopup6margin');
      document.getElementById('addmargin5width' + val.id)?.classList.remove('deletepopup5margin');
      document.getElementById('addmargin6width' + val.id)?.classList.remove('deletepopup6margin');

    });
  }
  deletecolumn() {
    this.deletearray = [];
    this.deleterecords.forEach((val: any) => {
      this.deletearray.push(val.numberOfDays);
    });
    var max = this.deletearray.reduce((a: number, b: number) => Math.max(a, b));

    this.delete2array = [];
    this.deleterecords.forEach((val: any) => {
      let a = val.workScheduleName
      this.delete2array.push(a.length);
    });
    var maxcha = this.delete2array.reduce((a: number, b: number) => Math.max(a, b));
    console.log(maxcha);
    this.deleterecords.forEach((val: any) => {
      if (maxcha <= 25) {
        if (max == 4) {
          document.getElementById('adding1width')?.classList.add('width1adding');
          document.getElementById('adding2width')?.classList.add('width1adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width1column');
          document.getElementById('adding4width')?.classList.add('width1column');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 5) {
          document.getElementById('adding1width')?.classList.add('width2adding');
          document.getElementById('adding2width')?.classList.add('width2adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width2column');
          document.getElementById('adding4width')?.classList.add('width2column');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 6) {
          document.getElementById('adding1width')?.classList.add('width3adding');
          document.getElementById('adding2width')?.classList.add('width3adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width3column');
          document.getElementById('adding4width')?.classList.add('width3column');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 7) {
          document.getElementById('adding1width')?.classList.add('width4adding');
          document.getElementById('adding2width')?.classList.add('width4adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width4column');
          document.getElementById('adding4width')?.classList.add('width4column');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else {
          document.getElementById('adding1width')?.classList.remove('width3adding');
          document.getElementById('adding2width')?.classList.remove('width3adding');
          document.getElementById('adding1width')?.classList.remove('width1adding');
          document.getElementById('adding2width')?.classList.remove('width1adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width1column');
          document.getElementById('adding4width')?.classList.remove('width1column');
          document.getElementById('adding1width')?.classList.remove('width2adding');
          document.getElementById('adding2width')?.classList.remove('width2adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width2column');
          document.getElementById('adding4width')?.classList.remove('width2column');
          document.getElementById('adding1width')?.classList.remove('width3adding');
          document.getElementById('adding2width')?.classList.remove('width3adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width3column');
          document.getElementById('adding4width')?.classList.remove('width3column');
          document.getElementById('adding1width')?.classList.remove('width4adding');
          document.getElementById('adding2width')?.classList.remove('width4adding');
          document.getElementById('adding1width')?.classList.remove('width2adding');
          document.getElementById('adding2width')?.classList.remove('width2adding');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        }
      } else if (maxcha >= 26 && maxcha <= 30) {
        if (max == 4) {
          document.getElementById('adding1width')?.classList.add('width5adding');
          document.getElementById('adding2width')?.classList.add('width5adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width1column');
          document.getElementById('adding4width')?.classList.add('width1column');
          document.getElementById('adding5width')?.classList.add('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width1column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 5) {
          document.getElementById('adding1width')?.classList.add('width6adding');
          document.getElementById('adding2width')?.classList.add('width6adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width2column');
          document.getElementById('adding4width')?.classList.add('width2column');
          document.getElementById('adding5width')?.classList.add('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width1column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 6) {
          document.getElementById('adding1width')?.classList.add('width7adding');
          document.getElementById('adding2width')?.classList.add('width7adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width3column');
          document.getElementById('adding4width')?.classList.add('width3column');
          document.getElementById('adding5width')?.classList.add('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width1column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 7) {
          document.getElementById('adding1width')?.classList.add('width8adding');
          document.getElementById('adding2width')?.classList.add('width8adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width4column');
          document.getElementById('adding4width')?.classList.add('width4column');
          document.getElementById('adding5width')?.classList.add('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width1column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else {
          document.getElementById('adding1width')?.classList.remove('width3adding');
          document.getElementById('adding2width')?.classList.remove('width3adding');
          document.getElementById('adding1width')?.classList.remove('width2adding');
          document.getElementById('adding2width')?.classList.remove('width2adding');
          document.getElementById('adding1width')?.classList.add('width1adding');
          document.getElementById('adding2width')?.classList.add('width1adding');
          document.getElementById('adding1width')?.classList.remove('width5adding');
          document.getElementById('adding2width')?.classList.remove('width5adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width1column');
          document.getElementById('adding4width')?.classList.remove('width1column');
          document.getElementById('adding1width')?.classList.remove('width6adding');
          document.getElementById('adding2width')?.classList.remove('width6adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width2column');
          document.getElementById('adding4width')?.classList.remove('width2column');
          document.getElementById('adding1width')?.classList.remove('width7adding');
          document.getElementById('adding2width')?.classList.remove('width7adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width3column');
          document.getElementById('adding4width')?.classList.remove('width3column');
          document.getElementById('adding1width')?.classList.remove('width8adding');
          document.getElementById('adding2width')?.classList.remove('width8adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width4column');
          document.getElementById('adding4width')?.classList.remove('width4column');
          document.getElementById('adding5width')?.classList.add('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width1column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        }
      } else if (maxcha >= 31 && maxcha <= 35) {
        if (max == 4) {
          document.getElementById('adding1width')?.classList.add('width9adding');
          document.getElementById('adding2width')?.classList.add('width9adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width1column');
          document.getElementById('adding4width')?.classList.add('width1column');
          document.getElementById('adding5width')?.classList.add('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 5) {
          document.getElementById('adding1width')?.classList.add('width10adding');
          document.getElementById('adding2width')?.classList.add('width10adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width2column');
          document.getElementById('adding4width')?.classList.add('width2column');
          document.getElementById('adding5width')?.classList.add('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 6) {
          document.getElementById('adding1width')?.classList.add('width11adding');
          document.getElementById('adding2width')?.classList.add('width11adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width3column');
          document.getElementById('adding4width')?.classList.add('width3column');
          document.getElementById('adding5width')?.classList.add('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else if (max == 7) {
          document.getElementById('adding1width')?.classList.add('width12adding');
          document.getElementById('adding2width')?.classList.add('width12adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width4column');
          document.getElementById('adding4width')?.classList.add('width4column');
          document.getElementById('adding5width')?.classList.add('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        } else {
          document.getElementById('adding1width')?.classList.remove('width3adding');
          document.getElementById('adding2width')?.classList.remove('width3adding');
          document.getElementById('adding1width')?.classList.remove('width1adding');
          document.getElementById('adding2width')?.classList.remove('width1adding');
          document.getElementById('adding1width')?.classList.add('width2adding');
          document.getElementById('adding2width')?.classList.add('width2adding');
          document.getElementById('adding1width')?.classList.remove('width9adding');
          document.getElementById('adding2width')?.classList.remove('width9adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width1column');
          document.getElementById('adding4width')?.classList.remove('width1column');
          document.getElementById('adding1width')?.classList.remove('width10adding');
          document.getElementById('adding2width')?.classList.remove('width10adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width2column');
          document.getElementById('adding4width')?.classList.remove('width2column');
          document.getElementById('adding1width')?.classList.remove('width11adding');
          document.getElementById('adding2width')?.classList.remove('width11adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width3column');
          document.getElementById('adding4width')?.classList.remove('width3column');
          document.getElementById('adding1width')?.classList.remove('width12adding');
          document.getElementById('adding2width')?.classList.remove('width12adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width4column');
          document.getElementById('adding4width')?.classList.remove('width4column');
          document.getElementById('adding5width')?.classList.add('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
          document.getElementById('adding5width')?.classList.remove('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
        }
      } else if (maxcha >= 36 && maxcha <= 40) {
        if (max == 4) {
          document.getElementById('adding1width')?.classList.add('width13adding');
          document.getElementById('adding2width')?.classList.add('width13adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width1column');
          document.getElementById('adding4width')?.classList.add('width1column');
          document.getElementById('adding5width')?.classList.add('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width3column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
        } else if (max == 5) {
          document.getElementById('adding1width')?.classList.add('width14adding');
          document.getElementById('adding2width')?.classList.add('width14adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width2column');
          document.getElementById('adding4width')?.classList.add('width2column');
          document.getElementById('adding5width')?.classList.add('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width3column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
        } else if (max == 6) {
          document.getElementById('adding1width')?.classList.add('width15adding');
          document.getElementById('adding2width')?.classList.add('width15adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width3column');
          document.getElementById('adding4width')?.classList.add('width3column');
          document.getElementById('adding5width')?.classList.add('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width3column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
        } else if (max == 7) {
          document.getElementById('adding1width')?.classList.add('width16adding');
          document.getElementById('adding2width')?.classList.add('width16adding');
          document.getElementById('adding3width' + val.id)?.classList.add('width4column');
          document.getElementById('adding4width')?.classList.add('width4column');
          document.getElementById('adding5width')?.classList.add('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width3column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
        } else {
          document.getElementById('adding1width')?.classList.add('width3adding');
          document.getElementById('adding2width')?.classList.add('width3adding');
          document.getElementById('adding1width')?.classList.remove('width1adding');
          document.getElementById('adding2width')?.classList.remove('width1adding');
          document.getElementById('adding1width')?.classList.remove('width2adding');
          document.getElementById('adding2width')?.classList.remove('width2adding');
          document.getElementById('adding1width')?.classList.remove('width13adding');
          document.getElementById('adding2width')?.classList.remove('width13adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width1column');
          document.getElementById('adding4width')?.classList.remove('width1column');
          document.getElementById('adding1width')?.classList.remove('width14adding');
          document.getElementById('adding2width')?.classList.remove('width14adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width2column');
          document.getElementById('adding4width')?.classList.remove('width2column');
          document.getElementById('adding1width')?.classList.remove('width15adding');
          document.getElementById('adding2width')?.classList.remove('width15adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width3column');
          document.getElementById('adding4width')?.classList.remove('width3column');
          document.getElementById('adding1width')?.classList.remove('width16adding');
          document.getElementById('adding2width')?.classList.remove('width16adding');
          document.getElementById('adding3width' + val.id)?.classList.remove('width4column');
          document.getElementById('adding4width')?.classList.remove('width4column');
          document.getElementById('adding5width')?.classList.add('width3column2');
          document.getElementById('adding6width' + val.id)?.classList.add('width3column1');
          document.getElementById('adding5width')?.classList.remove('width2column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
          document.getElementById('adding5width')?.classList.remove('width1column2');
          document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
        }
      } else {
        document.getElementById('adding1width')?.classList.remove('width3adding');
        document.getElementById('adding2width')?.classList.remove('width3adding');
        document.getElementById('adding1width')?.classList.remove('width1adding');
        document.getElementById('adding2width')?.classList.remove('width1adding');
        document.getElementById('adding1width')?.classList.remove('width2adding');
        document.getElementById('adding2width')?.classList.remove('width2adding');
        document.getElementById('adding5width')?.classList.remove('width2column2');
        document.getElementById('adding6width' + val.id)?.classList.remove('width2column1');
        document.getElementById('adding5width')?.classList.remove('width1column2');
        document.getElementById('adding6width' + val.id)?.classList.remove('width1column1');
        document.getElementById('adding3width' + val.id)?.classList.remove('width4column');
        document.getElementById('adding4width')?.classList.remove('width4column');
        document.getElementById('adding5width')?.classList.remove('width3column2');
        document.getElementById('adding6width' + val.id)?.classList.remove('width3column1');
      }

    });

  }

  onworkaddclick() {
    this.addpopup = false;
  }

  tabfunctionality() {
    if (this.addpopup == true) {
      this.child.tabfunctionalityadd();
    } else if (this.activededit == true) {
      console.log('tab id2', this.tabnumber);
      if (this.tabnumber == 1) {
        document.getElementById('activehover2add')?.classList.add('hide');
        document.getElementById('activehoveradd')?.classList.remove('hide');
        if (this.tabfunc != this.workimports.length) {
          this.tabnumber = 0;
          if (this.tabfunc2 == 0) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
               
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 1) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 2) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 3) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 4) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                
              }
            });
            this.tabfunc++;
            this.tabfunc2 = 0;
          }
        } else {
          this.tabnumber = 0;
          if (this.tabfunc2 == 0) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
               
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 1) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 2) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
               
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 3) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                
              }
            });
            this.tabfunc2++
          } else if (this.tabfunc2 == 4) {
            this.workimports.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                
              }
            });
            this.tabfunc2 = 0;
            this.tabnumber = 1;
          }
        }
      } else if (this.tabnumber == 2) {
        this.works.forEach((val: any) => {
          if (val.sequence == this.tabfunc) {
            
          }
        });
        this.tabfunc = 1;
        this.tabfunc2 = 0;
        document.getElementById('btn1')?.classList.add('vimporthover');
      } else if (this.tabnumber == 3) {
        document.getElementById('btn1')?.classList.remove('vimporthover');
        document.getElementById('btn2')?.classList.add('cimporthover');
      } else if (this.tabnumber == 4) {
        this.tabnumber = 0;
        document.getElementById('btn2')?.classList.remove('cimporthover');
        document.getElementById('activehoveradd')?.classList.add('hide');
        document.getElementById('activehover2add')?.classList.remove('hide');
      }
    } else {
      if (this.tabnumber == 1) {
        document.getElementById('activehover2add')?.classList.add('hide');
        document.getElementById('activehoveradd')?.classList.remove('hide');
        this.tabnumber = 0;
        if (this.tabfunc == this.works.length) {
          this.works.forEach((val: any) => {
            if (this.tabfunc == val.sequence) {
              document.getElementById('checkboxrow' + val.id)?.classList.add('subli1checkboxhover');
              this.tabfunc = 1;
            } else {
              document.getElementById('checkboxrow' + val.id)?.classList.remove('subli1checkboxhover');
            }
          });
          this.tabnumber = 1;
          this.tabfunc = 1;
        } else {
          this.works.forEach((val: any) => {
            if (this.tabfunc == val.sequence) {
              document.getElementById('checkboxrow' + val.id)?.classList.add('subli1checkboxhover');

            } else {
              document.getElementById('checkboxrow' + val.id)?.classList.remove('subli1checkboxhover');
            }
          });
          this.tabfunc++;
          this.tabnumber = 0;
        }
      } else if (this.tabnumber == 2) {
        this.works.forEach((val: any) => {
          document.getElementById('checkboxrow' + val.id)?.classList.remove('subli1checkboxhover');
        });
        console.log('entered', this.viewdeleterecords.length, this.works.length)
        if (this.viewdeleterecords.length == 0) {
          document.getElementById('selectallrows')?.classList.add('subli1checkbox8');
          this.tabnumber = 5;
        } else if (this.viewdeleterecords.length == this.works.length) {
          document.getElementById('unselectall')?.classList.add('subli1checkbox8');
        } else {
          document.getElementById('selectallrows')?.classList.add('subli1checkbox8');
        }

      } else if (this.tabnumber == 3) {
        if (this.viewdeleterecords.length == this.works.length) {
          document.getElementById('unselectall')?.classList.remove('subli1checkbox8');
          document.getElementById('editbutton')?.classList.add('editbtnactivehover');
        } else {
          document.getElementById('selectallrows')?.classList.remove('subli1checkbox8');
          document.getElementById('unselectall')?.classList.add('subli1checkbox8');
        }
      } else if (this.tabnumber == 4) {
        if (this.viewdeleterecords.length == this.works.length) {
          document.getElementById('editbutton')?.classList.remove('editbtnactivehover');
          document.getElementById('deletebutton')?.classList.add('deletebtnactivehover')
          this.tabnumber=5;
        } else {
          document.getElementById('unselectall')?.classList.remove('subli1checkbox8');
          document.getElementById('editbutton')?.classList.add('editbtnactivehover');
        }
      } else if (this.tabnumber == 5) {
        document.getElementById('editbutton')?.classList.remove('editbtnactivehover');
        document.getElementById('deletebutton')?.classList.add('deletebtnactivehover')
      } else if (this.tabnumber == 6) {
        document.getElementById('deletebutton')?.classList.remove('deletebtnactivehover')
        document.getElementById('activehoveradd')?.classList.add('hide');
        document.getElementById('activehover2add')?.classList.remove('hide');
        this.tabnumber = 0;
        this.tabfunc = 1;
      }
    }
  }
  hoverbutton3click() {
    document.getElementById('activehover2add')?.classList.add('hide');
    document.getElementById('activehoveradd')?.classList.remove('hide');
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.TAB) {
      this.tabnumber++;
      this.tabfunctionality();
    }
    if (event.key === KEY_CODE.ENTER) {

    }

  }
  @HostListener('window:keydown', ['$event'])
  key1Event(event: KeyboardEvent) {
    if (event.key === KEY_CODE.TAB) {
      event.preventDefault();

    }

  }
}
