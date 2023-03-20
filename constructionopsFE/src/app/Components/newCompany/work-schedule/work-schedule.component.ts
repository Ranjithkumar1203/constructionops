import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { KEY_CODE } from 'src/app/app.component';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { LibraryService } from 'src/app/Services/library.service';
import Swal from 'sweetalert2';
import { CreateWorkScheduleComponent } from './create-work-schedule/create-work-schedule.component';

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent implements OnInit {
  public works: any;
  showText = false;
  public libraryworks: any;
  loading: boolean = false;
  shiftkey: boolean = false;
  tabnetwork: boolean = false;
  tabnet2work: boolean = false;
  tabkeyactive: boolean = false;
  selecttext: any;
  public test: any;
  status: boolean = false;
  status1: boolean = false;
  tabnumber: number = 0;
  tabdownnumber: number = 1;
  tabfunc: number = 1;
  tabfunc3: number = 1;
  tabfunc2: number = 0;
  selected = false;
  importtext: any;
  public checkedList: any;
  checked: boolean = false;
  tab1enter: boolean = false;
  tab2enter: boolean = false;
  tab3enter: boolean = false;
  tab4enter: boolean = false;
  tab5enter: boolean = false;
  isToogle: boolean = true;
  isToogle1: boolean = true;
  data: number = 0;
  idtab: number = 0;
  idnumber: number = 0;
  toogletext: any;
  toogletext1: any;
  sorter: any;
  sortera: any;
  removeTabKeyListener: any;
  renderer: any;
  checkedDataArray: any[] = [];
  dataArray: any[] = [];
  textOnPlus: any
  allWorkLibrary: any
  softwareNameString: any
  applyButtonDisable = true
  closeBtn = true
  lunuchtime1: any;
  lunuchtime2: any;
  lunuchtime3: any;
  lunuchtime4: any;
  componentload: any;

  options = [
    { id: 1, name: 'Buildrops', checked: false, ischecked: false, }
  ];
  constructor(private library: LibraryService, private dialog: MatDialog, private apiservice: ApiServiceService) { }


  editsoftware(data: any,) {

    this.allWorkLibrary.map((ele: any) => {

      document.getElementById('editweek' + ele.id)?.classList.remove('hide');
      document.getElementById('doneweek' + ele.id)?.classList.add('hide');
      document.getElementById('listweek' + ele.id)?.classList.add('hide');
    })
    this.applyButtonDisable = true
    this.closeBtn = true
    this.options.map((ele) => {
      ele.checked = false
    })
    document.getElementById('editweek' + data.id)?.classList.add('hide');
    document.getElementById('doneweek' + data.id)?.classList.remove('hide');
    document.getElementById('listweek' + data.id)?.classList.remove('hide');
    const softwareArray = data.softwareName.split(',')
    this.options.map((ele) => {
      if (softwareArray.includes(ele.name) == true) {
        ele.checked = true
      }
      softwareArray.map((soft: any) => {
        if (ele.name == soft) {
          ele.checked = true
        }
      })
    })
    this.checkedDataArray = this.options
  }
  doneweek(id: any) {
    document.getElementById('editweek' + id)?.classList.remove('hide');
    document.getElementById('doneweek' + id)?.classList.add('hide');
    document.getElementById('listweek' + id)?.classList.add('hide');
    this.applyButtonDisable = true
    this.closeBtn = true

    this.dataArray = []
  }
  onCheckBoxChange = (event: any, softName: any, optionName: string) => {
    this.checkedDataArray.map((ele) => {
      if (event.target.checked == true) {
        if (ele.name == optionName) {
          ele.checked = true

        }
      } else {
        if (ele.name == optionName) {
          ele.checked = false
        }
      }
    })
    this.applyButtonDisable = false
    this.closeBtn = false
    const trueData = this.checkedDataArray.filter(ele =>
      ele.checked == true
    ).map(a => a.name)
    this.softwareNameString = trueData.toString()
  }
  showWork = () => {
    this.textOnPlus = true
  }
  hideWork = () => {
    this.textOnPlus = false
  }
  
  updateweek = (data: any) => {
    const apidata = {
      libraryId: data.id,
      libraryName: data.libraryName,
      workingDays: data.workingDays,
      numberOfDays: data.numberOfDays,
      softwareName: this.softwareNameString,
      WeekStart: data.weekStart,
      DayStart: data.dayStart,
      HoursWorked: data.hoursWorked,
      LunchBreak: data.lunchBreak,
    }
    this.apiservice.updateWorkLibrary(apidata).subscribe((res) => {
      this.apiservice.getWorkLibrary().subscribe((res) => {
        console.log(res)
        this.allWorkLibrary = res
        this.allWorkLibrary.reverse()
      })
      document.getElementById('listweek' + data.id)?.classList.add('hide');
      this.dataArray.splice(0, this.dataArray.length);
    })

  }


  selectAllSoft = () => {
    const mappedData = this.options.map((ele) => {
      ele.checked = true
      if (ele.checked == true) {
        return ele.name
      } else {
        return ele
      }

    })
    this.dataArray = mappedData
  }
  openAddWordscheduleDialog = () => {
    const dialogRef = this.dialog.open(CreateWorkScheduleComponent, {
      panelClass: 'app-full-bleed-dialog',
    })
    dialogRef.afterClosed().subscribe(res => {
      this.apiservice.getWorkLibrary().subscribe((resp) => {
        this.allWorkLibrary = resp
        this.allWorkLibrary.reverse()
      })

    })
  }

  editWorkHandler(id: any) {
    this.toggle2Text();
    this.library.idnumber = id;
    console.log(id)
    this.showText = false;
  }


  deleteWorkHandler = (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const apidata = {
          libraryId: id
        }
        this.apiservice.deleteWorkLibrary(apidata).subscribe((res => {
          this.apiservice.getWorkLibrary().subscribe((resp) => {
            this.allWorkLibrary = resp
            this.allWorkLibrary.reverse()
          })
        }))
      }
    })

  }

  ngOnInit(): void {

    this.apiservice.getWorkLibrary().subscribe((res) => {
      this.allWorkLibrary = res
      this.allWorkLibrary.reverse()

    })

    // this.getworks();
    //this.library.getworks();
    //     this.library.getworks().then((val)=>{
    // console.log("val",val);
    //     });
    //     console.log('tetete : ',this.library.getworks())
    this.loading = true;
    this.toogletext = 'ON';
    this.toogletext1 = 'ON';
    this.importtext = '';
    this.works = [];
    this.test = [];
    this.library.getworks().subscribe((val) => {

      val.forEach((itemworkk: any) => {
        itemworkk['itemChecked'] = false;
        itemworkk['checked'] = false;
        itemworkk['name'] = itemworkk.workScheduleName;
        itemworkk['sequence'] = 0;
        itemworkk['splitedvaluea'] = itemworkk.timeDayStarts.split(" ", 2);
        itemworkk['splitedvalueb'] = itemworkk.splitedvaluea[0];
        itemworkk['splitedvalued'] = itemworkk.splitedvaluea[1];
        itemworkk['splitedvaluec'] = itemworkk.splitedvalueb.split(":", 2);
        itemworkk['splitedvalue'] = parseInt(itemworkk.splitedvaluec[0] + itemworkk.splitedvaluec[1]);
        if (itemworkk.isImported == false && itemworkk.isLibrary == true) {
          this.works.push(itemworkk);
          this.works.sort((a: { splitedvalue: any; }, b: { splitedvalue: any; }) => a.splitedvalue - b.splitedvalue);
          this.sortera = {
            "am": 0,
            "pm": 1,
          }

          this.works.sort((a: { splitedvalued: any; }, b: { splitedvalued: any; }) => {
            let day1 = a.splitedvalued;
            let day2 = b.splitedvalued;
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
      //this.test=val;
      // this.works.forEach((itemwork:any) => {
      //   itemwork['itemChecked']=false;
      //   console.log('item ', itemwork);
      // })

    });
    console.log("val", this.works);
    document.getElementById('colourchange')?.classList.remove('hide');
    document.getElementById('colourchanges')?.classList.add('hide');
    let i = 1;
    const interval2 = setInterval(() => {
      if (this.works.length != 0) {
        clearInterval(interval2);
        this.works.forEach((val: any) => {
          val.sequence = i++;
        });
        this.tabfunc3 = this.works.length;
        this.luncktimeHandler();
      } else {

      }
    }, 400);

    let b = 1;
    const interval = setInterval(() => {
      b++;
      if (b == 4) {
        clearInterval(interval);

        if (this.works.length == 0) {

          document.getElementById('hover4')?.classList.add('hide');
          document.getElementById('checkedhover')?.classList.add('colour1');
          document.getElementById('checkedhover')?.classList.remove('colour4');
        } else {

          document.getElementById('hover4')?.classList.remove('hide');
          document.getElementById('checkedhover')?.classList.remove('colour1');
          document.getElementById('checkedhover')?.classList.add('colour4');
        }
      } else {
        if (this.works.length == 0) {

          document.getElementById('hover4')?.classList.add('hide');
          document.getElementById('checkedhover')?.classList.add('colour1');
          document.getElementById('checkedhover')?.classList.remove('colour4');
        } else {

          document.getElementById('hover4')?.classList.remove('hide');
          document.getElementById('checkedhover')?.classList.remove('colour1');
          document.getElementById('checkedhover')?.classList.add('colour4');
        }
      }
    }, 400);

    setInterval(() => {
      if (this.status1 == true) {
        this.selecttext = 'Unselect All'
      } else {
        this.selecttext = 'Select All'
      }
      this.luncktimeHandler();
    }, 400);
  }
  toggle2Text() {
    this.showText = !this.showText;
    this.library.toggle.next(this.showText)
  }
  luncktimeHandler() {
    this.allWorkLibrary.forEach((val: any) => {
      val['lunchbreaknumber'] = '';
      val['hoursworkednumber'] = '';
      let a = [];
      let b = [];
      let c = 0;
      let d = 0;
      let e = 0;
      let f = 0;
      a = val.lunchBreak.toString();
      if (a.length == 1) {
        this.lunuchtime1 = 0;
        this.lunuchtime2 = 0;
        this.lunuchtime3 = 0;
        this.lunuchtime4 = a;
        if(a == 1){
          val.lunchbreaknumber = '0' + a + ' Minute';
        }else {
          val.lunchbreaknumber = '0' + a + ' Minutes';
        }
      } else if (a.length == 2) {
        b = val.lunchBreak.toString().split('');
        c = b[0];
        d = b[1];
        this.lunuchtime1 = 0;
        this.lunuchtime2 = 0;
        this.lunuchtime3 = c;
        this.lunuchtime4 = d;
        val.lunchbreaknumber = c + d  + ' Minutes';
      } else if (a.length == 3) {
        b = val.lunchBreak.toString().split('');
        c = b[0];
        d = b[1];
        e = b[2];
        this.lunuchtime1 = 0;
        this.lunuchtime2 = c;
        this.lunuchtime3 = d;
        this.lunuchtime4 = e;
        
        if(e == 1){
          if(c == 1){
            val.lunchbreaknumber = c + ' Hour ' + d + e + ' Minute';
          }else {
            val.lunchbreaknumber = c + ' Hours ' + d + e + ' Minute';
          }
        }else if(e == 0){
          if(c == 1){
            val.lunchbreaknumber = c + ' Hour';
          }else {
            val.lunchbreaknumber = c + ' Hours';
          }
        }else {
          val.lunchbreaknumber = c + ' Hours ' + d + e + ' Minutes';
        }
      } else {
        b = val.lunchBreak.toString().split('');
        c = b[0];
        d = b[1];
        e = b[2];
        f = b[3];
        this.lunuchtime1 = c;
        this.lunuchtime2 = d;
        this.lunuchtime3 = e;
        this.lunuchtime4 = f;
       
        if(f == 1){
          val.lunchbreaknumber = c + d + 'Hours ' + e + f  + ' Minute';
        }else if(f == 0){
          val.lunchbreaknumber = c + d + ' Hours';
        }else {
          val.lunchbreaknumber = c + d + 'Hours ' + e + f  + ' Minutes';
        }
      }
      if(val.hoursWorked == 1){
        val.hoursworkednumber = val.hoursWorked + ' Hour';
      }else {
        val.hoursworkednumber = val.hoursWorked + ' Hours';
      }
    });
  }
  refreshdata(){
    this.apiservice.getWorkLibrary().subscribe((res) => {
      this.allWorkLibrary = res
      this.allWorkLibrary.reverse()

    })

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
    }, 150);
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




  toogle() {
    if (this.isToogle1 == true) {
      this.toogletext1 = 'ON';
    } else {
      this.toogletext1 = 'OFF';

    }
  }
  hoverout2toggle() {
    if (this.toogletext1 == 'OFF') {
      document.getElementById('switch1')?.classList.add('hide');
    }
  }
  toogle2() {
    if (this.isToogle == true) {
      this.toogletext = 'ON';
    } else {
      this.toogletext = 'OFF';
    }
  }

  hoverouttoggle() {
    if (this.toogletext == 'OFF') {
      document.getElementById('switch2')?.classList.add('hide');
    }
  }
  onSomeAction(event: any, id: any, workname: any) {
    console.log('triggered', id);
    if (event.keyCode === 13) {
      this.updatework(id, workname);
      this.done(id);
    }
  }
  onSomeActions(event: any) {
    if (event.keyCode === 13) {
      console.log('triggered');
    }

  }
  updatework(id: any, workname: any) {
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

  clickEvent() {
    this.status = !this.status;
  }

  selectall(worksItem: any) {
    if (this.works.length == 0) {
      for (let i = 0; i < this.works.length; i++) {
        this.works[i].checked = false;
      }
    } else {
      this.tabfunc2 = 0;
      this.tabfunc = 1;
      this.tabnumber = 1;
      this.tab1enter = true;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = false;
      this.checkedList = [];
      this.test = [];
      for (let i = 0; i < this.works.length; i++)
        this.works[i].checked = true;
      if (this.works.checked == true) {
        for (let i = 0; i < this.works.length; i++) {
          this.works[i].itemChecked = true;
          this.test.push(this.works);
        }
        document.getElementById('colourchange')?.classList.add('hide');
        document.getElementById('colourchanges')?.classList.remove('hide');
        console.log('alltrue', worksItem);
      } else {
        for (let i = 0; i < this.works.length; i++) {
          this.works[i].itemChecked = false;
          this.works[i].checked = false;
          this.test.splice(this.works);
        }
        document.getElementById('colourchange')?.classList.remove('hide');
        document.getElementById('colourchanges')?.classList.add('hide');
        console.log('alltrue', worksItem);
      }

    }



  }



  selectItem(workItem: any, id: any) {
    this.idtab = id;
    this.works.forEach((val: any) => {
      document.getElementById('check' + val.id)?.click();
    });
    this.works.checked = false;
    this.status1 = false;
    console.log('ssss ', workItem);
    if (workItem.itemChecked == true) {
      this.test.push(workItem);
      document.getElementById('colourchange')?.classList.add('hide');
      document.getElementById('colourchanges')?.classList.remove('hide');
    } else {
      this.test.splice(workItem, 1);
    }

    if (this.test.length == this.works.length) {
      this.works.checked = true;
      this.status1 = true;
    }
    if (this.test.length == 0) {
      document.getElementById('colourchange')?.classList.remove('hide');
      document.getElementById('colourchanges')?.classList.add('hide');
    }
  }
  check4click() {
    let b = 1;
    const interval = setInterval(() => {
      b++;
      if (b == 3) {
        clearInterval(interval);
        if (this.test.length == 0) {

        } else {
          this.tabnetwork = true;
          this.tabnet2work = true;
          this.tabnumber = 4;
          this.tabdownnumber = 3;
        }
      } else {

      }
    }, 400);

  }
  importItems() {

    if (this.test.length == 0) { }
    else {
      this.tabfunc2 = 0;
      this.tabfunc = 1;
      this.tabnumber = 0;
      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = true;
      this.checkedList = [];
      console.log('checkedList :', this.works);
      for (let i = 0; i < this.works.length; i++) {
        if (this.works[i].itemChecked == true) {
          //console.log('ssaaa',this.works[i])
          this.checkedList.push(this.works[i])
        }
      }
      console.log('dddd - ', this.checkedList);
      if (this.checkedList.length == 1) {
        this.importtext = 'Work Schedule';
      } else {
        this.importtext = 'Work Schedules';
      }
      document.getElementById('colourchangess')?.click();
    }

  }
  countdown() {
    document.getElementById('countdownbegins')?.click();
  }

  confirmImport() {
    this.checkedList.forEach((checkedItem: any) => {
      console.log('checkedItem ', checkedItem);
      let updateisImport = {
        "id": checkedItem.id,
        "isImported": true,
      };
      this.library.update(updateisImport).subscribe((val) => {
        console.log("updated");
        //this.works=val;
      });

    })
  }



  edit(id: any) {
    //this.clickEvent();
    //console.log('id = ', id);
    //console.log('ddd ',document.getElementById('workele'+id))
    document.getElementById('workele' + id)?.classList.remove('hideupdatedata');
    document.getElementById('workele' + id)?.classList.add('updatedata');
    document.getElementById('workeletext' + id)?.classList.remove('update');
    document.getElementById('workeletext' + id)?.classList.add('hideupdate');
    document.getElementById('button' + id)?.classList.remove('edit');
    document.getElementById('button' + id)?.classList.add('hideedit');
    document.getElementById('check' + id)?.classList.remove('hidecheck');
    document.getElementById('check' + id)?.classList.add('check');
    // const el:any = document.querySelector('.edit');
    // el.onclick = function() {
    //   el.classList.toggle('.hideedit');
    // }
    this.works.forEach((val: any) => {
      if (val.id != id) {
        this.done(val.id);
      }
    });
  }
  editclick(id: any) {
    console.log('called')
    this.edit(id);
    this.tab1enter = false;
    this.tab2enter = true;
    this.tab3enter = false;
    this.tab4enter = false;
    this.works.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc2 = 0;
        this.tabfunc = val.sequence + 1;
        console.log(this.tabfunc);
        if (val.sequence == this.works.length) {
          this.tabnumber = 2;
        } else {
          this.tabnumber = 1;
        }
      }
    });
  }
  done(id: any) {
    //this.clickEvent();
    //console.log('id = ', id);
    //console.log('ddd ',document.getElementById('workele'+id))
    document.getElementById('workele' + id)?.classList.remove('updatedata');
    document.getElementById('workele' + id)?.classList.add('hideupdatedata');
    document.getElementById('workeletext' + id)?.classList.remove('hideupdate');
    document.getElementById('workeletext' + id)?.classList.add('update');
    document.getElementById('button' + id)?.classList.remove('hideedit');
    document.getElementById('button' + id)?.classList.add('edit');
    document.getElementById('check' + id)?.classList.remove('check');
    document.getElementById('check' + id)?.classList.add('hidecheck');
    // const el:any = document.querySelector('.edit');
    // el.onclick = function() {
    //   el.classList.toggle('.hideedit');
    // }

  }

  toggleText() {
    this.status1 = !this.status1
  }
  shiftfunctionality() {
    console.log(this.tabdownnumber);
    if (this.tabdownnumber == 0) {
      this.mouse1enter();

      if (this.status1 == true) {
        document.getElementById('hover3')?.classList.add('hover3');
        document.getElementById('hover3')?.classList.remove('hover5');
      } else {

        document.getElementById('hover3')?.classList.add('hover3');
        document.getElementById('hover3')?.classList.remove('hover5');
      }
      document.getElementById('checkedhover')?.classList.add('colour4');
      document.getElementById('checkedhover')?.classList.remove('colour7');
      if (this.toogletext == 'OFF') {
        this.tabnumber = 0;
      } else {
        this.tabnumber = 3;
      }

      this.tabfunc3 = this.works.length;
      this.tabfunc = 1;
      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = false;
      this.tab5enter = false;
      if (this.toogletext == 'OFF') {
        document.getElementById('switch2')?.classList.add('hide');
      } else {
        document.getElementById('switch2')?.classList.add('hover6');
        document.getElementById('switch2')?.classList.remove('hover2');
      }
      document.getElementById('colourchanges')?.classList.remove('colour9');
      document.getElementById('colourchanges')?.classList.add('colour6');

      document.getElementById('buttonhover')?.classList.add('colour10');
      document.getElementById('buttonhover')?.classList.remove('colour3');
      if (this.test.length == 0) {
        this.tabdownnumber = 2;
      } else {
        this.tabdownnumber = 3;
      }
      this.tabnet2work = false;
    } else if (this.tabdownnumber == 4) {
      this.mouse1enter();

      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = true;
      this.tab4enter = false;
      this.tab5enter = false;
      document.getElementById('sliderroundhover')?.classList.add('sliderhover');
      console.log('entered 4')
      if (this.toogletext == 'OFF') {
        document.getElementById('switch2')?.classList.add('hide');
      } else {
        document.getElementById('switch2')?.classList.add('hover6');
        document.getElementById('switch2')?.classList.remove('hover2');
      }
      document.getElementById('colourchanges')?.classList.remove('colour9');
      document.getElementById('colourchanges')?.classList.add('colour6');

      document.getElementById('buttonhover')?.classList.add('colour3');

      if (this.test.length == 0) {
        if (this.toogletext == 'OFF') {
          this.tabdownnumber = 2;
        } else {
          this.tabdownnumber = 0;
        }
      } else {
        if (this.toogletext == 'OFF') {
          this.tabdownnumber = 3;
        } else {
          this.tabdownnumber = 0;
        }

      }
      this.tabnet2work = false;
      this.tabnumber = 0;
    } else if (this.tabdownnumber == 3) {
      this.mouse1enter();
      this.tabfunc3 = this.works.length;
      this.tabfunc = 1;
      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = true;
      this.tab5enter = false;
      if (this.toogletext == 'OFF') {
        document.getElementById('switch2')?.classList.add('hide');
      } else {
        document.getElementById('switch2')?.classList.remove('hover6');
        document.getElementById('switch2')?.classList.add('hover2');
      }

      document.getElementById('buttonhover')?.classList.add('colour3');
      document.getElementById('buttonhover')?.classList.remove('colour10');
      document.getElementById('colourchanges')?.classList.add('colour9');
      document.getElementById('colourchanges')?.classList.remove('colour6');
      this.tabnumber = 2;

      if (this.tabnet2work == true) {
        if (this.test.length == this.works.length) {
          this.tabdownnumber = 1;
        } else {
          this.tabdownnumber = 2;
          this.tabnet2work = false;
        }
      } else {
        this.tabdownnumber = 2;
      }
    } else if (this.tabdownnumber == 2) {
      this.mouse1enter();
      document.getElementById('colourchanges')?.classList.remove('colour9');
      document.getElementById('colourchanges')?.classList.add('colour6');
      if (this.toogletext == 'OFF') {
        document.getElementById('switch2')?.classList.add('hide');
      } else {
        document.getElementById('switch2')?.classList.add('hover2');
        document.getElementById('switch2')?.classList.remove('hover6');
      }
      document.getElementById('sliderroundhover')?.classList.remove('sliderhover');

      document.getElementById('buttonhover')?.classList.add('colour3');
      document.getElementById('buttonhover')?.classList.remove('colour10');
      this.works.forEach((val: any) => {
        document.getElementById('workItem' + val.id)?.classList.remove('colour8');
        document.getElementById('workItem' + val.id)?.classList.add('colour2');
      });
      this.tab1enter = false;
      this.tab5enter = true;
      this.tab3enter = false;
      this.tab4enter = false;
      this.tab2enter = false;
      this.tabdownnumber = 2;
      if (this.test.length == this.works.length) {
        this.tabnet2work = true;
      }
      if (this.tabfunc3 == 1) {
        if (this.tabnet2work == true) {
          if (this.test.length == this.works.length) {
            this.tabdownnumber = 3;
            this.tabnumber = 2;
          } else {
            this.tabdownnumber = 1;
            this.tabnumber = 1;
            this.tabnet2work = false;
          }
        } else {
          this.tabdownnumber = 1;
          this.tabnumber = 1;
        }
        if (this.tabfunc2 == 0) {
          this.works.forEach((val: any) => {
            if (val.sequence == this.tabfunc3) {
              this.idnumber = val.id;
              document.getElementById('workItem' + val.id)?.classList.add('colour8');
              document.getElementById('workItem' + val.id)?.classList.remove('colour2');
            }
          });
          this.tabfunc = 2;
          this.tabfunc2 = 0;
          this.tabnumber = 1;
        }
      } else {

        this.tabdownnumber = 2;
        if (this.tabfunc2 == 0) {
          this.works.forEach((val: any) => {
            if (val.sequence == this.tabfunc3) {
              this.idnumber = val.id;
              document.getElementById('workItem' + val.id)?.classList.add('colour8');
              document.getElementById('workItem' + val.id)?.classList.remove('colour2');
            }
          });
          this.tabnumber = 1;
          this.tabfunc = this.tabfunc3 + 1;
          if (this.tabfunc3 == this.works.length) {

            if (this.test.length == 0) {
              this.tabnumber = 2;
            } else {
              this.tabnumber = 4;
            }
            this.tabfunc = this.works.length;
          }
          this.tabfunc3--;
          this.tabfunc2 = 0;
        }

      }
    } else if (this.tabdownnumber == 1) {
      this.mouse1enter();
      this.tabnumber = 1;
      this.tabfunc = 1;
      this.tabfunc3 = this.works.length;
      this.works.forEach((val: any) => {
        document.getElementById('workItem' + val.id)?.classList.remove('colour8');
        document.getElementById('workItem' + val.id)?.classList.add('colour2');
      });
      this.tab1enter = true;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = false;
      this.tab5enter = false;
      if (this.status1 == true) {
        document.getElementById('hover3')?.classList.remove('hover3');
        document.getElementById('hover3')?.classList.add('hover5');
      } else {
        document.getElementById('checkedhover')?.classList.remove('colour4');
        document.getElementById('checkedhover')?.classList.add('colour7');

        document.getElementById('hover3')?.classList.remove('hover3');
        document.getElementById('hover3')?.classList.add('hover5');
      }

      if (this.toogletext == 'OFF') {
        this.tabdownnumber = 0;
      } else {
        this.tabdownnumber = 4;
      }
    }
  }
  tabfunctionality() {
    console.log('tab id', this.tabnumber)
    if (this.tabnumber == 1) {
      this.mouse1enter();
      this.tabfunc = 1;
      this.tab1enter = true;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = false;
      this.tab5enter = false;
      if (this.toogletext == 'OFF') {
        document.getElementById('switch2')?.classList.add('hide');
      } else {
        document.getElementById('switch2')?.classList.remove('hover6');
        document.getElementById('switch2')?.classList.add('hover2');
      }
      document.getElementById('sliderroundhover')?.classList.remove('sliderhover');
      document.getElementById('colourchanges')?.classList.add('colour6');
      document.getElementById('colourchanges')?.classList.remove('colour9');

      document.getElementById('buttonhover')?.classList.add('colour3');
      document.getElementById('buttonhover')?.classList.remove('colour10');
      if (this.status1 == true) {
        document.getElementById('checkedhover')?.classList.remove('colour4');
        document.getElementById('checkedhover')?.classList.add('colour7');
        document.getElementById('hover3')?.classList.remove('hover3');
        document.getElementById('hover3')?.classList.add('hover5');
      } else {
        console.log('enter hover')
        document.getElementById('checkedhover')?.classList.remove('colour4');
        document.getElementById('checkedhover')?.classList.add('colour7');

        document.getElementById('hover3')?.classList.remove('hover3');
        document.getElementById('hover3')?.classList.add('hover5');
      }
      if (this.toogletext == 'OFF') {
        this.tabdownnumber = 0;
      } else {
        this.tabdownnumber = 4;
      }

      if (this.test.length == this.works.length) {
        this.tabnumber = 4;
      } else {
        this.tabnumber = 1;
      }
    } else if (this.tabnumber == 2) {
      this.mouse1enter();

      if (this.tabfunc == 1) {
        if (this.test.length == this.works.length) {
          this.tabdownnumber = 3;
        } else {
          this.tabdownnumber = 1;
        }
      } else {
        this.tabdownnumber = 2;
      }

      this.tab1enter = false;
      this.tab2enter = true;
      this.tab3enter = false;
      this.tab4enter = false;
      this.tab5enter = false;
      if (this.tabnumber == 2) {
        this.tabnumber = 1;
        console.log(this.tabfunc)
        if (this.tabfunc != this.works.length) {
          if (this.tabfunc2 == 0) {
            this.works.forEach((val: any) => {
              document.getElementById('workItem' + val.id)?.classList.remove('colour8');
              document.getElementById('workItem' + val.id)?.classList.add('colour2');
            });
            if (this.status1 == true) {
              document.getElementById('hover3')?.classList.add('hover3');
              document.getElementById('hover3')?.classList.remove('hover5');
            } else {

              document.getElementById('hover3')?.classList.add('hover3');
              document.getElementById('hover3')?.classList.remove('hover5');
            }

            document.getElementById('checkedhover')?.classList.add('colour4');
            document.getElementById('checkedhover')?.classList.remove('colour7');

            this.works.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.idnumber = val.id;
                document.getElementById('workItem' + val.id)?.classList.add('colour8');
                document.getElementById('workItem' + val.id)?.classList.remove('colour2');
              }
            });
            if (this.tabfunc == 1) {
              this.tabfunc3 = 1;
            } else {
              this.tabfunc3 = this.tabfunc - 1;
            }
            this.tabfunc++;
            this.tabfunc2 = 0;
          }

        } else {
          if (this.tabfunc2 == 0) {
            this.works.forEach((val: any) => {
              document.getElementById('workItem' + val.id)?.classList.remove('colour8');
              document.getElementById('workItem' + val.id)?.classList.add('colour2');
            });
            if (this.status1 == true) {
              document.getElementById('hover3')?.classList.add('hover3');
              document.getElementById('hover3')?.classList.remove('hover5');
            } else {
              document.getElementById('hover3')?.classList.add('hover3');
              document.getElementById('hover3')?.classList.remove('hover5');
            }
            document.getElementById('checkedhover')?.classList.add('colour4');
            document.getElementById('checkedhover')?.classList.remove('colour7');
            this.works.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                this.idnumber = val.id;
                document.getElementById('workItem' + val.id)?.classList.add('colour8');
                document.getElementById('workItem' + val.id)?.classList.remove('colour2');
              }
            });
            this.tabfunc3 = this.tabfunc - 1;
            this.tabfunc2 = 0;

            if (this.test.length == 0) {
              this.tabnumber = 2;
            } else {
              this.tabnumber = 4;
            }
            this.tabnetwork = false;
          }
        }
      }
    } else if (this.tabnumber == 3) {
      this.mouse1enter();
      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = false;
      this.tab5enter = false;
      this.works.forEach((val: any) => {
        document.getElementById('workItem' + val.id)?.classList.remove('colour8');
        document.getElementById('workItem' + val.id)?.classList.add('colour2');
      });
      if (this.toogletext == 'OFF') {
        document.getElementById('switch2')?.classList.add('hide');
      } else {
        document.getElementById('switch2')?.classList.add('hover6');
        document.getElementById('switch2')?.classList.remove('hover2');
      }

      document.getElementById('buttonhover')?.classList.add('colour10');
      document.getElementById('buttonhover')?.classList.remove('colour3');
      this.tabfunc2 = 0;
      this.tabfunc = 1;
      if (this.test.length == 0) {
        this.tabdownnumber = 2;
      } else {
        this.tabdownnumber = 3;
      }
      this.tabfunc3 = this.works.length;
      console.log(this.test)
      if (this.toogletext == 'OFF') {
        if (this.test.length == 0) {
          this.tabnumber = 0;
        } else {
          this.tabnumber = 0;
        }
      } else {
        this.tabnumber = 3;
      }
      this.tabnet2work = false;
    } else if (this.tabnumber == 4) {
      this.mouse1enter();
      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = true;
      this.tab4enter = false;
      this.tab5enter = false;
      this.tabnumber = 0;
      document.getElementById('sliderroundhover')?.classList.add('sliderhover');
      this.tabdownnumber = 0;
      if (this.toogletext == 'OFF') {
        document.getElementById('switch2')?.classList.add('hide');
      } else {
        document.getElementById('switch2')?.classList.add('hover6');
        document.getElementById('switch2')?.classList.remove('hover2');
      }
      document.getElementById('buttonhover')?.classList.add('colour3');
      this.tabnet2work = false;
    } else if (this.tabnumber == 5) {
      this.mouse1enter();

      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = true;
      this.tab5enter = false;
      if (this.toogletext == 'OFF') {
        document.getElementById('switch2')?.classList.add('hide');
      } else {
        document.getElementById('switch2')?.classList.remove('hover6');
        document.getElementById('switch2')?.classList.add('hover2');
      }
      document.getElementById('sliderroundhover')?.classList.remove('sliderhover');
      document.getElementById('buttonhover')?.classList.add('colour3');
      document.getElementById('buttonhover')?.classList.remove('colour10');
      document.getElementById('colourchanges')?.classList.add('colour9');
      document.getElementById('colourchanges')?.classList.remove('colour6');

      if (this.tabnetwork == true) {

        if (this.test.length == this.works.length) {
          this.tabnumber = 1;
          this.tabdownnumber = 1;
        } else {
          this.tabnumber = 0;
          this.tabdownnumber = 2;
          this.tabfunc3 = this.works.length;
          this.tabnetwork = false;
        }
      } else {
        this.tabnumber = 2;
        this.tabdownnumber = 2;
        this.tabfunc3 = this.works.length;
        this.tabnetwork = true;
      }


    }

  }
  enter1click() {
    if (this.tab1enter == true) {
      document.getElementById('checkedhover')?.click();
      if (this.test.length == 0) {

      } else {
        this.tabnetwork = true;
        this.tabnet2work = true;
        this.tabnumber = 4;
        this.tabdownnumber = 3;
      }

    }
  }
  enter2click() {
    if (this.tab2enter == true && this.tabfunc2 == 0) {
      document.getElementById('workItem' + this.idnumber)?.click();
      this.tabfunc2 = 0;
      this.works.forEach((val: any) => {
        if (val.id == this.idnumber) {
          if (val.sequence == this.works.length) {
            console.log('tab final')
            if (this.test.length == 0) {
              this.tabnumber = 2;
            } else {
              this.tabnumber = 4;
            }
          } else {
            console.log('tab rows')
            this.tabnumber = 1;
          }
        }
      });

    }
  }
  enter5click() {
    if (this.tab5enter == true && this.tabfunc2 == 0) {
      document.getElementById('workItem' + this.idnumber)?.click();
      this.tabfunc2 = 0;
      this.works.forEach((val: any) => {
        if (val.id == this.idnumber) {
          if (val.sequence == 1) {
            console.log('tab final')
            this.tabnumber = 1;
          } else {
            console.log('tab rows')
            this.tabnumber = 2;
          }
        }
      });
    }
  }
  enter3click() {
    if (this.tab3enter == true) {
      document.getElementById('togglecheckbox')?.click();
    }
  }
  enter4click() {
    if (this.tab4enter == true) {
      document.getElementById('colourchanges')?.click();
    }
  }
  mouse1enter() {
    document.getElementById('sliderroundhover')?.classList.remove('sliderhover');
    document.getElementById('hover3')?.classList.remove('hover5');
    document.getElementById('colourchanges')?.classList.remove('colour9');
    document.getElementById('switch2')?.classList.remove('hover6');
    document.getElementById('switch2')?.classList.add('hover2');
    document.getElementById('buttonhover')?.classList.add('colour3');
    document.getElementById('buttonhover')?.classList.remove('colour10');
    document.getElementById('checkedhover')?.classList.remove('colour7');
    if (this.works.length == 0) {
      document.getElementById('checkedhover')?.classList.add('colour1');

      document.getElementById('hover3')?.classList.add('hover3');
    } else {
      document.getElementById('checkedhover')?.classList.add('colour4');
      document.getElementById('colourchanges')?.classList.add('colour6');
      document.getElementById('hover3')?.classList.add('hover3');

    }


    this.works.forEach((val: any) => {
      document.getElementById('workItem' + val.id)?.classList.remove('colour8');
      document.getElementById('workItem' + val.id)?.classList.add('colour2');
    });

  }

  checkclick(id: any) {
    this.works.forEach((val: any) => {
      if (id == val.id) {
        if (val.sequence == 1) {
          if (this.test.length == this.works.length) {
            this.tabdownnumber = 3;
          } else {
            this.tabdownnumber = 1;
          }
          this.tabnumber = 1;
          this.tabfunc = val.sequence + 1;
          this.tabfunc3 = this.works.length;
        } else if (val.sequence != this.works.length) {
          this.tabnumber = 1;
          this.tabdownnumber = 2;
          this.tabfunc = val.sequence + 1;
          this.tabfunc3 = val.sequence - 1;
        } else if (val.sequence == this.works.length) {
          if (this.test.length == 0) {
            this.tabnumber = 2;
          } else {
            this.tabnumber = 4;
          }
        } else {
          this.tabfunc = 1
          this.tabdownnumber = 2;
          this.tabfunc3 = val.sequence - 1;
          this.tabfunc2 = 0;
          if (this.test.length == this.works.length) {
            this.tabnumber = 0;
          } else {
            this.tabnumber = 1;
          }
        }
      }
    });

  }
  check2click() {
    this.tabfunc = 1;
    this.tabfunc3 = this.works.length;
    if (this.toogletext == 'OFF') {
      if (this.test.length == 0) {
        this.tabnumber = 0;
      } else {
        this.tabnumber = 4;
      }
    } else {
      if (this.test.length == 0) {
        this.tabnumber = 0;
      } else {
        this.tabnumber = 4;
      }
    }
    if (this.test.length == 0) {
      if (this.toogletext == 'OFF') {
        this.tabdownnumber = 2;
      } else {
        this.tabdownnumber = 4;
      }
    } if (this.test.length == this.works.length) {
      if (this.toogletext == 'OFF') {
        this.tabdownnumber = 1;
      } else {
        this.tabdownnumber = 4;
      }
    } else {
      if (this.toogletext == 'OFF') {
        this.tabdownnumber = 3;
      } else {
        this.tabdownnumber = 4;
      }
    }
  }
  check3click() {
    if (this.tabnetwork == true) {

      if (this.test.length == this.works.length) {
        this.tabnumber = 1;
        this.tabdownnumber = 1;
      } else {
        this.tabnumber = 0;
        this.tabdownnumber = 2;
        this.tabfunc3 = this.works.length;
        this.tabnetwork = false;
      }
    } else {
      this.tabnumber = 2;
      this.tabdownnumber = 2;
      this.tabfunc3 = this.works.length;
    }
    this.tabkeyactive = true;
  }
  closetab() {
    this.tabkeyactive = false;
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == KEY_CODE.ENTER) {
      this.enter1click();
      this.enter2click();
      this.enter3click();
      this.enter4click();
      this.enter5click();
    }
    if (event.key === KEY_CODE.SHIFT) {
      this.shiftkey = false;
    }
  }
  @HostListener('window:keydown', ['$event'])
  key1Event(event: KeyboardEvent) {

    if (event.key === KEY_CODE.TAB) {
      event.preventDefault();
      if (this.tabkeyactive == false) {
        if (this.shiftkey == false) {
          this.tabnumber++;
          this.tabfunctionality();
        } else {
          this.shiftfunctionality();

        }
      }


    }
    if (event.key === KEY_CODE.SHIFT) {
      this.shiftkey = true;
    }

  }

}
