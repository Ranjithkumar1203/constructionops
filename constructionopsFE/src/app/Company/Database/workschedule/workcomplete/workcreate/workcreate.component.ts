import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/Services/library.service';
import { WorkcompleteComponent } from '../workcomplete.component';

@Component({
  selector: 'app-workcreate',
  templateUrl: './workcreate.component.html',
  styleUrls: ['./workcreate.component.css']
})
export class WorkcreateComponent implements OnInit {
  checkedList: any;
  cnames: any;
  cdayinputs: any;
  cdaynumbers: any;
  cdayvalues: any;
  ctimes: any;
  chours: any;
  pname: any;
  pdayinput: any;
  pdaynumber: any;
  pdayvalue: any;
  ptime: any;
  phour: any;
  currentvalue: any;
  checkedLists: any;
  selecttext: any;
  status: any;
  itemChecked: boolean = false;
  selectedall: any;
  options = [
    { id: "1", name: 'Sunday', value: 'Sun', checked: false },
    { id: "2", name: 'Monday', value: 'Mon', checked: false },
    { id: "3", name: 'Tuesday', value: 'Tue', checked: false },
    { id: "4", name: 'Wednesday', value: 'Wed', checked: false },
    { id: "5", name: 'Thursday', value: 'Thu', checked: false },
    { id: "6", name: 'Friday', value: 'Fri', checked: false },
    { id: "7", name: 'Saturday', value: 'Sat', checked: false },
  ]
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
  constructor(private library: LibraryService, private method: WorkcompleteComponent, private router: Router) { }

  ngOnInit(): void {
    this.checkedList = [];
    this.checkedLists = [];
    this.cnames = "";
    this.cdayinputs = "Check all that Apply";
    this.cdaynumbers = "";
    this.cdayvalues = "Select";
    this.ctimes = "Select";
    this.chours = "Select";
    setInterval(() => {
      if (this.status == true) {
        this.selecttext = "Unselect All"
      } else {
        this.selecttext = "Select All"
      }
    }, 400);


  }

  creatework() {
    console.log(this.cnames);
    console.log(this.cdayinputs);
    console.log(this.cdaynumbers);
    console.log(this.cdayvalues);
    console.log(this.ctimes);
    console.log(this.chours);
    let createCon = {
      "workScheduleName": this.cnames,
      "workingDays": this.cdayinputs,
      "numberOfDays": this.cdaynumbers,
      "dayWeekStarts": this.cdayvalues,
      "timeDayStarts": this.ctimes,
      "hoursWorking": this.chours,
      "isImported": false,
      "isLibrary": false,
      "checked": true,
    };
    this.library.create(createCon).subscribe((val) => {
      console.log("Created", val);
      this.method.activeadd();
      this.workcancel();
    });

  }


  onCheckboxChange(option: any, event: any) {
    if (event.target.checked) {
      this.options.forEach((optionvalue: any) => {
        if (optionvalue.value == option) {
          this.checkedLists.push(optionvalue);
        }
      });
      this.checkedLists.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      this.checkedList = [];
      this.checkedLists.forEach((val: any) => {
        this.checkedList.push(val.value);

      });
      this.cdayinputs = this.checkedList.toString();
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
      this.cdayinputs = this.checkedList.toString();
    }

    if ((this.checkedLists.length == this.options.length) && (this.checkedLists.length != 0)) {
      this.status = true;
      this.selectedall = true;

    } else {
      this.status = false;
      this.selectedall = false;

    }


    this.activeworkdays();
  }

  selectall() {
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
      this.cdayinputs = this.checkedList.toString();
    } else {
      this.options.forEach((valoption: any) => {
        valoption.checked = false;
        this.checkedLists = [];
        this.checkedList = [];
      });
      this.cdayinputs = "Check all that Apply";
    }
    console.log(this.cdayinputs);
    this.activeworkdays();
  }

  edit() {
    this.worknameonactive();
    document.getElementById('workdaysedit')?.classList.add('hideedit1');
    document.getElementById('workdaysedit')?.classList.remove('edit1');
    document.getElementById('workdayscheck')?.classList.remove('hidecheck1');
    document.getElementById('workdayscheck')?.classList.add('check1');
    document.getElementById('workdayslist')?.classList.remove('hidelist2');
    document.getElementById('workdayslist')?.classList.add('list2');
  }

  done() {
    document.getElementById('workdaysedit')?.classList.remove('hideedit1');
    document.getElementById('workdaysedit')?.classList.add('edit1');
    document.getElementById('workdayscheck')?.classList.add('hidecheck1');
    document.getElementById('workdayscheck')?.classList.remove('check1');
    document.getElementById('workdayslist')?.classList.add('hidelist2');
    document.getElementById('workdayslist')?.classList.remove('list2');
  }

  activeworkdays() {
    document.getElementById('workdaysclose')?.classList.add('hide');
    document.getElementById('workdayscancel')?.classList.remove('hide');
    document.getElementById('workdaysapply')?.classList.add('hide');
    document.getElementById('workdayssubmit')?.classList.remove('hide');
  }

  inactiveworkdays() {
    document.getElementById('workdaysclose')?.classList.remove('hide');
    document.getElementById('workdayscancel')?.classList.add('hide');
    document.getElementById('workdaysapply')?.classList.remove('hide');
    document.getElementById('workdayssubmit')?.classList.add('hide');
    this.options.forEach((valoption: any) => {
      valoption.checked = false;
      this.checkedLists = [];
      this.checkedList = [];
    });
    this.status = false;
    this.selectedall = false;
    this.cdayinputs = "Check all that Apply";
    this.cdaynumbers = "";
  }
  submitworksdays() {
    this.cdayinputs = this.checkedList.toString();
    this.cdaynumbers = this.checkedList.length;
    this.cdayvalues = "Monday";
    this.done();
    this.activecancel();
    document.getElementById('workdaysclose')?.classList.remove('hide');
    document.getElementById('workdayscancel')?.classList.add('hide');
    document.getElementById('workdaysapply')?.classList.remove('hide');
    document.getElementById('workdayssubmit')?.classList.add('hide');
  }

  edit2() {
    this.worknameonactive();
    document.getElementById('dayvalueedit')?.classList.add('hideedit1');
    document.getElementById('dayvalueedit')?.classList.remove('edit1');
    document.getElementById('dayvaluecheck')?.classList.remove('hidecheck1');
    document.getElementById('dayvaluecheck')?.classList.add('check1');
    document.getElementById('dayvaluelist')?.classList.remove('hidelist2');
    document.getElementById('dayvaluelist')?.classList.add('list2');
  }

  done2() {
    document.getElementById('dayvalueedit')?.classList.remove('hideedit1');
    document.getElementById('dayvalueedit')?.classList.add('edit1');
    document.getElementById('dayvaluecheck')?.classList.add('hidecheck1');
    document.getElementById('dayvaluecheck')?.classList.remove('check1');
    document.getElementById('dayvaluelist')?.classList.add('hidelist2');
    document.getElementById('dayvaluelist')?.classList.remove('list2');
  }
  updatedayvalue(day: any) {
    this.cdayvalues = day;
    this.activecancel();
  }

  edit3() {
    this.worknameonactive();
    document.getElementById('worktimeedit')?.classList.add('hideedit1');
    document.getElementById('worktimeedit')?.classList.remove('edit1');
    document.getElementById('worktimecheck')?.classList.remove('hidecheck1');
    document.getElementById('worktimecheck')?.classList.add('check1');
    document.getElementById('worktimelist')?.classList.remove('hidelist2');
    document.getElementById('worktimelist')?.classList.add('list2');
  }

  done3() {
    document.getElementById('worktimeedit')?.classList.remove('hideedit1');
    document.getElementById('worktimeedit')?.classList.add('edit1');
    document.getElementById('worktimecheck')?.classList.add('hidecheck1');
    document.getElementById('worktimecheck')?.classList.remove('check1');
    document.getElementById('worktimelist')?.classList.add('hidelist2');
    document.getElementById('worktimelist')?.classList.remove('list2');
  }
  updateworktime(time: any) {
    this.ctimes = time;
    this.activecancel();
  }

  edit4() {
    this.worknameonactive();
    document.getElementById('workhouredit')?.classList.add('hideedit1');
    document.getElementById('workhouredit')?.classList.remove('edit1');
    document.getElementById('workhourcheck')?.classList.remove('hidecheck1');
    document.getElementById('workhourcheck')?.classList.add('check1');
    document.getElementById('workhourlist')?.classList.remove('hidelist2');
    document.getElementById('workhourlist')?.classList.add('list2');
  }

  done4() {
    document.getElementById('workhouredit')?.classList.remove('hideedit1');
    document.getElementById('workhouredit')?.classList.add('edit1');
    document.getElementById('workhourcheck')?.classList.add('hidecheck1');
    document.getElementById('workhourcheck')?.classList.remove('check1');
    document.getElementById('workhourlist')?.classList.add('hidelist2');
    document.getElementById('workhourlist')?.classList.remove('list2');
  }
  updateworkhour(hour: any) {
    this.chours = hour;
    this.activecancel();
  }

  workcancel() {
    this.inactivecancel();
    this.cnames = "";
    this.cdayinputs = "Check all that Apply";
    this.cdaynumbers = "";
    this.cdayvalues = "Select";
    this.ctimes = "Select";
    this.chours = "Select";
    this.options.forEach((valoption: any) => {
      valoption.checked = false;
      this.checkedLists = [];
      this.checkedList = [];
    });
    this.status = false;
    this.selectedall = false;
    this.inactivepreview();
  }

  activecancel() {
    document.getElementById('workclose')?.classList.add('hide');
    document.getElementById('workcancel')?.classList.remove('hide');
  }
  inactivecancel() {
    document.getElementById('workclose')?.classList.remove('hide');
    document.getElementById('workcancel')?.classList.add('hide');
  }
  worknameonactive() {
    this.currentvalue = "";
    if (this.cnames != this.currentvalue) {
      this.activecancel();
    } else {
      this.inactivecancel();
    }
  }
  worknameactive(event: any) {
    if (event.keyCode === 13) {
      this.currentvalue = "";
      if (this.cnames != this.currentvalue) {
        this.activecancel();
      } else {
        this.inactivecancel();
      }
      this.edit();
    } else {
    }


  }


  preview() {
    this.pname = this.cnames;
    this.pdayinput = this.cdayinputs;
    this.pdaynumber = this.cdaynumbers;
    this.pdayvalue = this.cdayvalues;
    this.ptime = this.ctimes;
    this.phour = this.chours;
  }

  activecreate() {
    this.method.opencreate();
  }

  activepreview() {
    document.getElementById('inactivepreview')?.classList.add('hide');
    document.getElementById('inactivecreate')?.classList.add('hide');
    document.getElementById('activepreview')?.classList.remove('hide');
    document.getElementById('activecreate')?.classList.remove('hide');
  }
  inactivepreview() {
    document.getElementById('inactivepreview')?.classList.remove('hide');
    document.getElementById('inactivecreate')?.classList.remove('hide');
    document.getElementById('activepreview')?.classList.add('hide');
    document.getElementById('activecreate')?.classList.add('hide');
  }


  activeall() {
    if (this.cnames != '' && this.cdayinputs != 'Check all that Apply' && this.cdaynumbers != '' && this.cdayvalues != "Select" && this.ctimes != "Select" && this.chours != "Select") {
      this.activepreview();
      console.log('entered')
    } else {
      this.inactivepreview();
      console.log('not entered')
    }
  }


  activeadd() {
    this.method.activeadd();
  }
}
