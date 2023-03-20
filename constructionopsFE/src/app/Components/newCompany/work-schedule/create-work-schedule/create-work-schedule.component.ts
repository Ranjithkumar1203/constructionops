import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-create-work-schedule',
  templateUrl: './create-work-schedule.component.html',
  styleUrls: ['./create-work-schedule.component.css']
})
export class CreateWorkScheduleComponent implements OnInit {
  checkBoxes = false
  checkedLists: any;
  lunuchtime1: any;
  lunuchtime2: any;
  lunuchtime3: any;
  lunuchtime4: any;
  checkedList: any;
  checkedDays: any[] = []
  oneToTwelveArray: any[] = []
  oneToFiftynineArray: any[] = []
  checkedDayInString: any
  naming: any;
  selectWeekStart: any
  selctWeekOpen = false
  hourTableOpen = false
  selectMeridiem = "AM"
  setStartHour: any

  selectDays = [
    { id: "1", name: 'Sunday', value: 'Sun', checked: false },
    { id: "2", name: 'Monday', value: 'Mon', checked: false },
    { id: "3", name: 'Tuesday', value: 'Tue', checked: false },
    { id: "4", name: 'Wednesday', value: 'Wed', checked: false },
    { id: "5", name: 'Thursday', value: 'Thu', checked: false },
    { id: "6", name: 'Friday', value: 'Fri', checked: false },
    { id: "7", name: 'Saturday', value: 'Sat', checked: false },
  ]

  constructor(public dialogRef: MatDialogRef<CreateWorkScheduleComponent>, private apiservice: ApiServiceService) { }

  workScheduleForm = new FormGroup({
    workScheduleLibrary: new FormControl(''),
    selectdays: new FormControl(''),
    startWeek: new FormControl(''),
    startDay: new FormControl(''),
    hoursworked: new FormControl(''),
    lunchbreak: new FormControl(''),
    lunuchtime1: new FormControl(''),
    lunuchtime2: new FormControl(''),
    lunuchtime3: new FormControl(''),
    lunuchtime4: new FormControl('')
  })

  ngOnInit(): void {
    this.printOneToTwelve();
    this.printOneToFiftynine();
    this.checkedLists = [];
    this.lunuchtime1 = 0;
    this.lunuchtime2 = 0;
    this.lunuchtime3 = 0;
    this.lunuchtime4 = 0;
  }

  openCheckBox = () => {
    this.selctWeekOpen = false
    this.hourTableOpen = false

    this.selectDays.map((e) => {
      const dataConatin = this.checkedDays.includes(e.name)
      if (dataConatin == true) {
        e.checked = true
      }
    })
    this.checkBoxes = !this.checkBoxes
  }

  checkBoxHandler = (event: any, days: any) => {
    if (event.target.checked == true) {
      this.selectDays.forEach((optionvalue: any) => {
        if (optionvalue.value == days) {
          this.checkedLists.push(optionvalue);
        }
      });
      let a = this.checkedLists.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
      this.checkedList = [];
      this.checkedDays = [];
      this.checkedLists.forEach((val: any) => {
        this.checkedList.push(val.value);
        this.checkedDays.push(val.value)
        this.checkedDayInString = this.checkedDays.toString()
      });
    }
    else {
      for (var i = 0; i < this.selectDays.length; i++) {
        if (this.checkedList[i] == days) {
          this.checkedList.splice(i, 1);
        }

      }

      this.checkedLists = [];
      this.checkedDays = [];
      this.checkedList.forEach((val3: any) => {
        this.selectDays.forEach((optionvalue: any) => {
          if (optionvalue.value == val3) {
            this.checkedLists.push(optionvalue);
            this.checkedDays.push(optionvalue.value)
            this.checkedDayInString = this.checkedDays.toString()
          }
        });
      });
    }
    console.log('ok', this.checkedLists);
    console.log('ok', this.checkedList);
  }

  createWorkSchedule = () => {
    this.autonaming();
    const data = {
      LibraryName: this.naming,
      WorkingDays: this.checkedDayInString,
      NumberOfDays: this.checkedDays.length,
      WeekStart: this.workScheduleForm.controls.startWeek.value,
      DayStart: this.workScheduleForm.controls.startDay.value + ' ' + this.selectMeridiem,
      HoursWorked: parseInt(this.workScheduleForm.controls.hoursworked.value),
      LunchBreak: parseInt(this.workScheduleForm.controls.lunuchtime1.value + this.workScheduleForm.controls.lunuchtime2.value + this.workScheduleForm.controls.lunuchtime3.value + this.workScheduleForm.controls.lunuchtime4.value),
      SoftwareName: ''
    }
    console.log(data)
    this.apiservice.createWorkLibrary(data).subscribe((res) => {
      this.dialogRef.close()
    }, (error) => {
      window.alert(error)
    })



  }
  changeMeridiem = (meridiem: string) => {
    console.log(meridiem)
    if (meridiem == "AM") {
      this.selectMeridiem = "PM"
    } else {
      this.selectMeridiem = "AM"
    }
  }
  hourTableHandler = () => {
    this.checkBoxes = false
    this.selctWeekOpen = false
    this.hourTableOpen = !this.hourTableOpen
  }
  changeStartHour = (hour: any) => {
    this.setStartHour = hour + ":" + "00"
  }
  onMinuteHandler = (min: any) => {
    const onlyHour = this.setStartHour.split(":")
    this.setStartHour = onlyHour[0] + ":" + min
  }
  openSelectBoxHandler = () => {
    this.checkBoxes = false
    this.hourTableOpen = false
    this.selctWeekOpen = !this.selctWeekOpen;
  }

  onWeekStartHandler = (name: any) => {
    this.selectWeekStart = name
    this.selctWeekOpen = !this.selctWeekOpen;
  }

  autonaming() {
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
    min1date = parseInt(this.setStartHour.split(':')[1]) + parseInt(this.lunuchtime3 + this.lunuchtime4);
    console.log(min1date)
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
    enddate = parseInt(this.setStartHour.split(':')[0]) + parseInt(this.workScheduleForm.controls.hoursworked.value) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date;
    if (enddate >= 12) {
      let a = '';
      if (this.selectMeridiem == 'AM') {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " PM";
        } else if ((enddate - 12) <= -1) {
          a = (enddate - 12) + ":" + mindate + " PM"
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm.controls.hoursworked.value) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
          a = "0" + (enddate - 12) + ":" + mindate + " AM"
        } else {
          a = "0" + (enddate - 12) + ":" + mindate + " PM";
        }
      } else {
        if ((enddate - 12) == 0) {
          a = "12" + ":" + mindate + " AM";
        } else if ((enddate - 12) == (parseInt(this.workScheduleForm.controls.hoursworked.value) + parseInt(this.lunuchtime1 + this.lunuchtime2) + min2date)) {
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
        this.naming = this.checkedDays.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' ' + this.selectMeridiem + ' to ' + a;
      } else {
        this.naming = this.checkedDays.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' ' + this.selectMeridiem + ' to ' + a;
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
        this.naming = this.checkedDays.length + ' Day Workweek, ' + value1 + ' - ' + value2 + ', ' + this.setStartHour + ' ' + this.selectMeridiem + ' to ' + a;
      } else {
        this.naming = this.checkedDays.length + ' Day Workweek, ' + this.checkedDayInString + ', ' + this.setStartHour + ' ' + this.selectMeridiem + ' to ' + a;
      }
    }

  }
  printOneToTwelve = () => {
    for (var value = 1; value <= 12; value++) {
      if (value < 10) {
        const data = { "Hour": "0" + value }
        this.oneToTwelveArray.push(data);
      } else {
        const data = { "Hour": value }
        this.oneToTwelveArray.push(data);
      }

    }
  }
  printOneToFiftynine = () => {
    for (var value = 1; value <= 59; value++) {
      if (value < 10) {
        const data = { "minute": "0" + value }
        this.oneToFiftynineArray.push(data);
      } else {
        const data = { "minute": value }
        this.oneToFiftynineArray.push(data);
      }

    }
  }

}
