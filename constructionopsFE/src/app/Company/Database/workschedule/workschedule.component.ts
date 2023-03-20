import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/Services/library.service';

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
}
export class work {
  constructor(
    public companyId: number,
    public workScheduleName: string,
    public workingDays: string,
    public numberOfDays: number,
  ) {
  }
}

@Component({
  selector: 'app-workschedule',
  templateUrl: './workschedule.component.html',
  styleUrls: ['./workschedule.component.css']
})
export class WorkscheduleComponent implements OnInit {
  public works: any;
  public libraryworks: any;
  loading: boolean = false;
  public test: any;
  status: boolean = false;
  status1: boolean = false;
  tabnumber: number = 0;
  tabfunc: number = 1;
  tabfunc2: any = 0;
  selected = false;
  importtext: any;
  public checkedList: any;
  checked: boolean = false;
  tab1enter: boolean = false;
  tab2enter: boolean = false;
  tab3enter: boolean = false;
  tab4enter: boolean = false;
  isToogle: boolean = true;
  isToogle1: boolean = true;
  data: number = 0;
  idnumber: number = 0;
  toogletext: any;
  toogletext1: any;
  sorter: any;
  sortera: any;
  removeTabKeyListener: any;
  renderer: any;
  constructor(private httpClient: HttpClient, private library: LibraryService) {

  }

  ngOnInit(): void {

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
        itemworkk['name'] = '';
        if (itemworkk.id == '2') {
          itemworkk.name = '3 Day work schedule';
        } else if (itemworkk.id == '3') {
          itemworkk.name = '4 Day work schedule';
        } else if (itemworkk.id == '4') {
          itemworkk.name = '5 Day work schedule';
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


    let b = 1;
    const interval = setInterval(() => {
      b++;
      if (b == 4) {
        clearInterval(interval);
        let i = 1;
        this.works.forEach((itemworkk: any) => {
          itemworkk.sequence = i++;
        });
        console.log('false', this.works);
        if (this.works.length == 0) {
          document.getElementById('hover3')?.classList.add('hide');
          document.getElementById('hover4')?.classList.add('hide');
          document.getElementById('checkedhover')?.classList.add('colour1');
          document.getElementById('checkedhover')?.classList.remove('colour4');
        } else {
          document.getElementById('hover3')?.classList.remove('hide');
          document.getElementById('hover4')?.classList.remove('hide');
          document.getElementById('checkedhover')?.classList.remove('colour1');
          document.getElementById('checkedhover')?.classList.add('colour4');
        }
      } else {
        if (this.works.length == 0) {
          document.getElementById('hover3')?.classList.add('hide');
          document.getElementById('hover4')?.classList.add('hide');
          document.getElementById('checkedhover')?.classList.add('colour1');
          document.getElementById('checkedhover')?.classList.remove('colour4');
        } else {
          document.getElementById('hover3')?.classList.remove('hide');
          document.getElementById('hover4')?.classList.remove('hide');
          document.getElementById('checkedhover')?.classList.remove('colour1');
          document.getElementById('checkedhover')?.classList.add('colour4');
        }
      }
    }, 400);


    this.libraryworks = [];
    this.library.getworklibrary().subscribe((val2) => {
      console.log("val2", val2);
    });

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




  toogle() {
    if (this.isToogle1 == true) {
      this.toogletext1 = 'ON';
    } else {
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
    if(this.works.length == 0){
      for (let i = 0; i < this.works.length; i++) {
        this.works[i].checked = false;
      }
    }else {
      this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 1;
    this.tab1enter = true;
    this.tab2enter = false;
    this.tab3enter = false;
    this.tab4enter = false;
    this.checkedList = [];
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
    this.works.forEach((val: any) => {
      document.getElementById('check' + val.id)?.click();
    });
    this.works.checked = false;
    this.status1 = false;
    console.log('ssss ', workItem);
    this.works.forEach((val: any) => {
      if (val.id == id) {
        this.tabfunc2 = 1;
        this.tabfunc = val.sequence
        this.tabnumber = 1;
      }
    });
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

  tabfunctionality() {
    console.log('tab id', this.tabnumber)
    if (this.tabnumber == 1) {
      this.tab1enter = true;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = false;
      document.getElementById('colourchanges')?.classList.add('colour6');
      document.getElementById('colourchanges')?.classList.remove('colour9');
      document.getElementById('switch2')?.classList.remove('hover6');
      document.getElementById('switch2')?.classList.add('hover2');
      document.getElementById('buttonhover')?.classList.add('colour3');
      document.getElementById('buttonhover')?.classList.remove('colour10');
      if (this.status1 == true) {
        document.getElementById('checkedhover')?.classList.remove('colour4');
        document.getElementById('checkedhover')?.classList.add('colour7');
        document.getElementById('hover4')?.classList.remove('hover4');
        document.getElementById('hover4')?.classList.remove('hide');
        document.getElementById('hover4')?.classList.remove('hidehover4');
        document.getElementById('hover4')?.classList.add('hover7');
      } else {
        document.getElementById('checkedhover')?.classList.remove('colour4');
        document.getElementById('checkedhover')?.classList.add('colour7');
        document.getElementById('hover3')?.classList.remove('hover3');
        document.getElementById('hover3')?.classList.add('hover5');
      }
    } else if (this.tabnumber == 2) {
      this.tab1enter = false;
      this.tab2enter = true;
      this.tab3enter = false;
      this.tab4enter = false;
      if (this.tabnumber == 2) {
        this.tabnumber = 1;
        console.log(this.tabfunc)
        if (this.tabfunc != this.works.length) {
          if (this.tabfunc2 == 0) {
            this.works.forEach((val: any) => {
              document.getElementById('check' + val.id)?.click();
            });
            if (this.status1 == true) {
              document.getElementById('hover4')?.classList.add('hover4');
              document.getElementById('hover3')?.classList.add('hide');
              document.getElementById('hover3')?.classList.add('hidehover3');
              document.getElementById('hover4')?.classList.remove('hover7');
            } else {
              document.getElementById('hover4')?.classList.add('hide');
              document.getElementById('hover4')?.classList.add('hidehover4');
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

            this.tabfunc2++
          } else if (this.tabfunc2 == 1) {
            this.works.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                document.getElementById('workItem' + val.id)?.classList.remove('colour8');
                document.getElementById('workItem' + val.id)?.classList.add('colour2');
                this.edit(val.id);
                document.getElementById('workele' + val.id)?.focus();
              }
            });
            this.tabfunc++;
            this.tabfunc2 = 0;
          }
        } else {
          if (this.tabfunc2 == 0) {
            this.works.forEach((val: any) => {
              document.getElementById('check' + val.id)?.click();
            });
            if (this.status1 == true) {
              document.getElementById('hover4')?.classList.add('hover4');
              document.getElementById('hover3')?.classList.add('hide');
              document.getElementById('hover3')?.classList.add('hidehover3');
              document.getElementById('hover4')?.classList.remove('hover7');
            } else {
              document.getElementById('hover4')?.classList.add('hide');
              document.getElementById('hover4')?.classList.add('hidehover4');
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
            this.tabfunc2++
          } else if (this.tabfunc2 == 1) {
            this.works.forEach((val: any) => {
              if (val.sequence == this.tabfunc) {
                document.getElementById('workItem' + val.id)?.classList.remove('colour8');
                document.getElementById('workItem' + val.id)?.classList.add('colour2');
                this.edit(val.id);
                document.getElementById('workele' + val.id)?.focus();
              }
            });
            this.tabnumber = 2;
            this.tabfunc++;
            this.tabfunc2 = 0;
          }
        }
      }
    } else if (this.tabnumber == 3) {
      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = true;
      this.tab4enter = false;
      this.works.forEach((val: any) => {
        document.getElementById('check' + val.id)?.click();
      });
      document.getElementById('switch2')?.classList.add('hover6');
      document.getElementById('switch2')?.classList.remove('hover2');
      document.getElementById('buttonhover')?.classList.add('colour10');
      document.getElementById('buttonhover')?.classList.remove('colour3');
      this.tabfunc = 1;
      this.tabfunc2 = 0;
      console.log(this.test)
      if (this.test.length == 0) {
        this.tabnumber = 0;
      }
    } else if (this.tabnumber == 4) {
      this.tab1enter = false;
      this.tab2enter = false;
      this.tab3enter = false;
      this.tab4enter = true;
      document.getElementById('switch2')?.classList.remove('hover6');
      document.getElementById('switch2')?.classList.add('hover2');
      document.getElementById('buttonhover')?.classList.add('colour3');
      document.getElementById('buttonhover')?.classList.remove('colour10');
      document.getElementById('colourchanges')?.classList.add('colour9');
      document.getElementById('colourchanges')?.classList.remove('colour6');
      this.tabnumber = 0;
    }
  }
  enter1click() {
    if (this.tab1enter == true) {
      document.getElementById('checkedhover')?.click();
    }
  }
  enter2click() {
    if (this.tab2enter == true && this.tabfunc2 == 1) {
      document.getElementById('workItem' + this.idnumber)?.click();
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
    document.getElementById('hover4')?.classList.remove('hover7');
    document.getElementById('hover3')?.classList.remove('hover5');
    
    document.getElementById('colourchanges')?.classList.remove('colour9');
    document.getElementById('switch2')?.classList.remove('hover6');
    document.getElementById('switch2')?.classList.add('hover2');
    document.getElementById('buttonhover')?.classList.add('colour3');
    document.getElementById('buttonhover')?.classList.remove('colour10');
    document.getElementById('checkedhover')?.classList.remove('colour7');
    if(this.works.length == 0){
      document.getElementById('checkedhover')?.classList.add('colour1');
    }else {
      document.getElementById('checkedhover')?.classList.add('colour4');
      document.getElementById('colourchanges')?.classList.add('colour6');
    }

    if (this.status1 == true) {
      document.getElementById('hover4')?.classList.add('hover4');
      document.getElementById('hover3')?.classList.add('hide');
      document.getElementById('hover3')?.classList.add('hidehover3');
    } else {
      document.getElementById('hover4')?.classList.add('hide');
      document.getElementById('hover4')?.classList.add('hidehover4');
      document.getElementById('hover3')?.classList.add('hover3');
    }
    if (this.works.checked == true){
      document.getElementById('hover4')?.classList.remove('hide');
      document.getElementById('hover4')?.classList.remove('hidehover4');
    }else {
      document.getElementById('hover4')?.classList.add('hide');
      document.getElementById('hover3')?.classList.remove('hide');
      document.getElementById('hover3')?.classList.remove('hidehover3');
    }
    this.works.forEach((val: any) => {
      document.getElementById('workItem' + val.id)?.classList.remove('colour8');
      document.getElementById('workItem' + val.id)?.classList.add('colour2');
    });

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.TAB) {
      this.tabnumber++;
      this.tabfunctionality();
    }
    if (event.key == KEY_CODE.ENTER) {
      this.enter1click();
      this.enter2click();
      this.enter3click();
      this.enter4click();
    }
  }
  @HostListener('window:keydown', ['$event'])
  key1Event(event: KeyboardEvent) {
    if (event.key === KEY_CODE.TAB) {
      event.preventDefault();

    }

  }
}
