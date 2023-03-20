import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import * as modal from 'bootstrap';

export class holiday {
  constructor(
    public holidayId: number,
    public holidayName: string,
    public alternateObservation: string,
  ) {
  }
}

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  public holidays: any;
  public test: any;
  loading: boolean = false;
  status1: boolean = false;
  selected = false;
  public checkedList: any;
  checked: boolean = false;
  status: boolean = false;
  isToogle: boolean = true;
  isToogle1: boolean = true;
  toogletext: any;
  toogletext1: any;
  importtext:any;
  data: number = 0;
  constructor(private library: HolidayLibraryService) { }

  ngOnInit(): void {
    this.loading = true;
    this.holidays = [];
    this.importtext = '';
    this.test = [];
    this.toogletext1 = 'ON';
    this.toogletext = 'ON';
    this.library.getholidays().subscribe((val) => {
      console.log(val);
      val.forEach((itemworkk: any) => {
        itemworkk['checked'] = false;
        if (itemworkk.isImported == false) {
          this.holidays.push(itemworkk);
          
        }
        
        itemworkk['name'] = '';
        if (itemworkk.holidayId == '1') {
          itemworkk.name = 'New year';
        } else if (itemworkk.holidayId == '2') {
          itemworkk.name = 'Holiday';
        }



      });
      
    });

    console.log('val2',this.holidays);
    document.getElementById('colourchange')?.classList.remove('hide');
    document.getElementById('colourchanges')?.classList.add('hide');
    setInterval(() => {
      if (this.holidays.length == 0) {
        document.getElementById('hover3')?.classList.add('hide');
        document.getElementById('hover4')?.classList.add('hide');
        document.getElementById('checkedhover')?.classList.add('colour1');
        document.getElementById('checkedhover')?.classList.remove('colour4');
      } else if(this.holidays.length > 0)  {
        document.getElementById('hover3')?.classList.remove('hide');
        document.getElementById('hover4')?.classList.remove('hide');
        document.getElementById('checkedhover')?.classList.remove('colour1');
        document.getElementById('checkedhover')?.classList.add('colour4');
      }
  }, 400);



  }
  countdown() {
    document.getElementById('countdownbegins')?.click();
  }
  setimeout() {
    // const count = interval(50);
    // count.subscribe((d) => {
    //   console.log('d', d);
    //   this.data = d;
    // });
    // if (this.data == 1) {
    //   clearInterval();
    //  document.getElementById('loadingModal')?.classList.add('hide');
    // }
    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      this.data = a;
      if (a == 100) {
        clearInterval(interval);
        document.getElementById("confirm")?.click();
      }
    }, 310);
    this.confirmImport();
  }

  setout() {
    document.getElementById("settime")?.click();
    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 100) {
        clearInterval(interval);
        document.getElementById("cancel")?.click();
      }
    }, 15);
  }

  onSomeAction(event: any, holidayId: any, holidayName: any) {
    if (event.keyCode === 13) {
      this.updateholidays(holidayId, holidayName);
      this.done(holidayId);
    }
  }

  toogle() {
    if (this.isToogle1 == true) {
      this.toogletext1 = 'ON';
    }else {
      this.toogletext1 = 'OFF';
      document.getElementById('switch1')?.classList.add('hide');
    }
  }

  toogle2() {
    if (this.isToogle == true) {
      this.toogletext = 'ON';
    } else {
      this.toogletext = 'OFF';
      document.getElementById('switch2')?.classList.add('hide');
    }
  }

  updateholidays(holidayId: any, holidayName: any) {
    let updateCon = {
      "holidayId": holidayId,
      "holidayName": holidayName,

    };
    this.library.update(updateCon).subscribe((val) => {
      console.log("updated",val);
    });

  }
  selectall(holidaysItem: any) {
    this.checkedList = [];
    for (let i = 0; i < this.holidays.length; i++)
      this.holidays[i].checked = true;
    if (this.holidays.checked == true) {
      for (let i = 0; i < this.holidays.length; i++) {
        this.holidays[i].itemChecked = true;
        this.test.push(this.holidays);
      }
      document.getElementById('colourchange')?.classList.add('hide');
      document.getElementById('colourchanges')?.classList.remove('hide');
      console.log('alltrue', holidaysItem);
    } else {
      for (let i = 0; i < this.holidays.length; i++) {
        this.holidays[i].itemChecked = false;
        this.holidays[i].checked = false;
        this.test.splice(this.holidays);
      }
      document.getElementById('colourchange')?.classList.remove('hide');
      document.getElementById('colourchanges')?.classList.add('hide');
      console.log('alltrue', holidaysItem);
    }

  }

  selectItem(workItem: any) {
    this.holidays.checked = false;
    this.status1 = false;
    console.log('ssss ', workItem);
    if (workItem.itemChecked == true) {
      this.test.push(workItem);
      document.getElementById('colourchange')?.classList.add('hide');
      document.getElementById('colourchanges')?.classList.remove('hide');
    } else {
        this.test.splice(workItem,1);
    }

    if(this.test.length == this.holidays.length){
      this.holidays.checked = true;
      this.status1 = true;
    }
    if(this.test.length == 0){
      document.getElementById('colourchange')?.classList.remove('hide');
      document.getElementById('colourchanges')?.classList.add('hide');
    }
  }
  edit(id: any) {
    document.getElementById('holidayname' + id)?.classList.remove('hideupdatedata');
    document.getElementById('holidayname' + id)?.classList.add('updatedata');
    document.getElementById('holidaynametext' + id)?.classList.remove('update');
    document.getElementById('holidaynametext' + id)?.classList.add('hideupdate');
    document.getElementById('button' + id)?.classList.remove('edit');
    document.getElementById('button' + id)?.classList.add('hideedit');
    document.getElementById('check' + id)?.classList.remove('hidecheck');
    document.getElementById('check' + id)?.classList.add('check');
  }

  done(id: any) {
    document.getElementById('holidayname' + id)?.classList.remove('updatedata');
    document.getElementById('holidayname' + id)?.classList.add('hideupdatedata');
    document.getElementById('holidaynametext' + id)?.classList.remove('hideupdate');
    document.getElementById('holidaynametext' + id)?.classList.add('update');
    document.getElementById('button' + id)?.classList.remove('hideedit');
    document.getElementById('button' + id)?.classList.add('edit');
    document.getElementById('check' + id)?.classList.remove('check');
    document.getElementById('check' + id)?.classList.add('hidecheck');
  }

  toggleText() {
    this.status1 = !this.status1
  }

  importItems() {
    if (this.test.length == 0) { }
    else {
      this.checkedList = [];
      console.log('checkedList :', this.holidays);
      for (let i = 0; i < this.holidays.length; i++) {
        if (this.holidays[i].itemChecked == true) {
          //console.log('ssaaa',this.works[i])
          this.checkedList.push(this.holidays[i])
        }
      }
      console.log('dddd - ', this.checkedList);
      if(this.checkedList.length == 1){
        this.importtext = 'Holiday';
      }else {
        this.importtext = 'Holidays';
      }
      document.getElementById('colourchangess')?.click();
    }

  }

  clickEvent() {
    this.status = !this.status;
  }
  confirmImport() {
    this.checkedList.forEach((checkedItem: any) => {
      console.log('checkedItem ', checkedItem);
      let updateisImport = {
        "holidayId": checkedItem.holidayId,
        "isImported": true,
      };
      this.library.update(updateisImport).subscribe((val) => {
        console.log("updated",val);
      });

    })
  }
}
