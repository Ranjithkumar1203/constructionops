import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';
import { HolidaysimportedComponent } from '../holidaysimported.component';
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
@Component({
  selector: 'app-holidaysadd',
  templateUrl: './holidaysadd.component.html',
  styleUrls: ['./holidaysadd.component.css']
})
export class HolidaysaddComponent implements OnInit {
  add1tab: boolean = false;
  add2tab: boolean = false;
  add3tab: boolean = false;
  add4tab: boolean = false;
  add5tab: boolean = false;
  add6tab: boolean = false;
  add7tab: boolean = false;
  public sequences: any;
  public holidays: any;
  public test: any;
  status: boolean = false;
  selected = false;
  number: number = 0;
  isSelectall: boolean = false;
  selecttext: any;
  activelowerbutton: boolean = false;
  numberid: number = 0;
  public checkedList: any;
  checkedListed: any;
  public add: any;
  sorter: any;
  sortera: any;
  addid: number = 0;
  tabnumber: number = 1;
  tabfunc: number = 1;
  tabfunc2: number = 0;
  idnumber: number = 0;
  options = [
    { id: "1", name: 'Sunday', value: 'Sun', checked: false },
    { id: "2", name: 'Monday', value: 'Mon', checked: false },
    { id: "3", name: 'Tuesday', value: 'Tue', checked: false },
    { id: "4", name: 'Wednesday', value: 'Wed', checked: false },
    { id: "5", name: 'Thursday', value: 'Thu', checked: false },
    { id: "6", name: 'Friday', value: 'Fri', checked: false },
    { id: "7", name: 'Saturday', value: 'Sat', checked: false },
  ]
  constructor(private httpClient: HttpClient, private library: HolidayLibraryService, private method: HolidaysimportedComponent) { }

  ngOnInit(): void {
    this.add = [];

    this.holidays = [];
    this.library.getholidays().subscribe((val) => {
      console.log("valadd", val);
      val.forEach((itemworkk: any) => {
        itemworkk['isChecked'] = false;
        itemworkk['itemChecked'] = false;
        itemworkk['sequence'] = 0;
        if (itemworkk.isImported == false) {
          this.holidays.push(itemworkk);

        }
      });
    });
    this.checkedListed = [];

    setInterval(() => {
      if (this.isSelectall == true) {
        this.selecttext = 'Unselect All';
      } else {
        this.selecttext = 'Select All';
      }

      document.getElementById('addbtn' + this.addid)?.classList.add('active');

    }, 400);

    this.show();
    const interval = setInterval(() => {
      if (this.addid == 0) {
        document.getElementById('addbtn' + this.addid)?.classList.add('active');
      } else {
        clearInterval(interval);
        document.getElementById('addbtn' + this.addid)?.classList.add('active');
      }
    }, 200);

    this.show();

  }

  checkempty() {
    if (this.holidays.length == 0) {
      document.getElementById('exampleModaladd')?.classList.add('modal1');
      this.method.opencreate();
    } else if (this.holidays.length >= 1) {
      this.method.openadd();
      document.getElementById('exampleModaladd')?.classList.remove('modal1');
    }

  }

  clickEvent() {
    this.status = !this.status;
  }

  show() {
    this.add = [];
    this.number = 0;
    this.holidays.forEach((val: any) => {
      if (val.isAdded == true) {
        this.add.push(val);
        this.activebutton();
        this.addid = val.holidayId
        this.activebuttonadd();
      }
    });
    this.number = this.add.length;
  }
  activebuttonadd() {
    this.holidays.forEach((val: any) => {
      if (val.isAdded == true) {
        val.isChecked = true;
        if (val.isChecked == true) {
          console.log(val.holidayId);
          document.getElementById('addbtn' + val.holidayId)?.classList.add('active');
        } else {
          document.getElementById('addbtn' + val.holidayId)?.classList.remove('active');
        }
      }
    });
  }
  addwork() {
    this.add = [];
    this.holidays = [];
    this.library.getholidays().subscribe((val) => {
      console.log("valadd", val);
      val.forEach((itemworkk: any) => {
        itemworkk['isChecked'] = false;
        itemworkk['itemChecked'] = false;
        itemworkk['sequence'] = 0;
        if (itemworkk.isImported == false) {
          this.holidays.push(itemworkk);
        }
      });
    });
    this.checkedListed = [];
    this.show();
    let c = 1;
    const interval1 = setInterval(() => {
      c++;
      if (c == 4) {
        clearInterval(interval1);
        this.show();
      } else {

      }
    }, 400);
  }
  addactiving() {
    this.holidays.forEach((val: any) => {
      if (val.isChecked == true) {
        console.log(val.holidayId);
        document.getElementById('addbtn' + val.holidayId)?.classList.add('active');
      } else {
        document.getElementById('addbtn' + val.holidayId)?.classList.remove('active');
      }
    });
  }
  activatingadd() {
    this.holidays.forEach((val: any) => {
      if (val.isChecked == true) {
        document.getElementById('addbtn' + val.holidayId)?.classList.add('active');
        this.addsingle(val.holidayId);
        this.number = this.add.length;
      } else {
        document.getElementById('addbtn' + val.holidayId)?.classList.remove('active');
        let item = this.add.filter(function (item: any) {
          return item.holidayId === val.holidayId;
        })[0];
        let index = this.add.indexOf(item);
        this.add.splice(index, 1);
        this.number = this.add.length;
      }


    });

  }


  selectItem(workItem: any) {
    console.log('ssss ', workItem);
    // if(workItem.itemChecked==true){
    //   this.checkedList.push(workItem);
    // }

  }

  importItems() {
    this.checkedList = [];
    console.log('checkedList :', this.holidays);
    for (let i = 0; i < this.holidays.length; i++) {
      if (this.holidays[i].itemChecked == true) {
        //console.log('ssaaa',this.holidays[i])
        this.checkedList.push(this.holidays[i])
      }
    }

    console.log('dddd - ', this.checkedList)
  }


  confirmImport() {
    this.checkedListed = [];
    console.log('checkedList :', this.holidays);
    for (let i = 0; i < this.holidays.length; i++) {
      if (this.holidays[i].itemChecked == true) {
        //console.log('ssaaa',this.holidays[i])
        this.checkedListed.push(this.holidays[i])
      }
    }
    console.log('dddd - ', this.checkedListed)
    this.checkedListed.forEach((checkedItem: any) => {
      console.log('checkedItem ', checkedItem);
      let updateisImport = {
        "holidayId": checkedItem.holidayId,
        "isImported": true,
        "isAdded": false
      };
      this.library.update(updateisImport).subscribe((val) => {
        console.log("updated");
        //this.holidays=val;
      });

    })
  }


  activebutton() {
    this.activelowerbutton = true;
    document.getElementById('close')?.classList.add('hide');
    document.getElementById('add2')?.classList.add('hide');
    document.getElementById('cancel')?.classList.remove('hide');
    document.getElementById('add')?.classList.remove('hide');
  }
  inactivebutton() {
    this.activelowerbutton = false;
    this.isSelectall = false;
    document.getElementById('close')?.classList.remove('hide');
    document.getElementById('add2')?.classList.remove('hide');
    document.getElementById('cancel')?.classList.add('hide');
    document.getElementById('add')?.classList.add('hide');
  }
  cancelbtn() {
    this.activelowerbutton = false;
    this.holidays.forEach((val: any) => {
      val.isChecked = false;
      document.getElementById('addbtn' + val.holidayId)?.classList.remove('active');
      this.add = [];
      this.addid = 0;
      let updateCon = {
        "holidayId": val.holidayId,
        "isAdded": false,
      };
      this.library.update(updateCon).subscribe((val) => {
        console.log("updated");
        //this.holidays=val;
      });
    });

  }
  activecreate() {
    this.method.opencreate();
    document.getElementById('close')?.click();
  }
  addactive(id: any) {
    let a = 0;
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (val.isChecked == true) {
          document.getElementById('addbtn' + id)?.classList.add('active');
          this.addsingle(id);
          this.number = this.add.length;
        } else {
          this.addid = 0;
          let updateCon = {
            "holidayId": val.holidayId,
            "isAdded": false,
          };
          this.library.update(updateCon).subscribe((val) => {
            console.log("updated");
          });
          document.getElementById('addbtn' + id)?.classList.remove('active');
          let item = this.add.filter(function (item: any) {
            return item.holidayId === id;
          })[0];
          let index = this.add.indexOf(item);
          this.add.splice(index, 1);
          this.number = this.add.length;
        }
        if (this.add.length == 0) {
          this.inactivebutton();
        } else {

        }
      }

      if (val.isChecked == true) {
        a++;
      } else {

      }
      console.log(a, this.holidays.length);
      if (a == this.holidays.length) {
        this.isSelectall = true;
      } else {
        this.isSelectall = false;
      }

    });
  }

  selectall() {
    if (this.isSelectall) {
      this.add = [];
      this.holidays.forEach((val: any) => {
        val.isChecked = true;
        document.getElementById('addbtn' + val.holidayId)?.classList.add('active');
        this.add.push(val);
        this.number = this.add.length;
        this.activebutton();
      });
    } else {
      this.holidays.forEach((val: any) => {
        val.isChecked = false;
        this.add = [];
        this.inactivebutton();
        document.getElementById('addbtn' + val.holidayId)?.classList.remove('active');
      });
    }
    console.log(this.number);
  }
  addsingle(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        this.add.push(val);
      }
    });
  }
  closebtn() {
    this.method.onworkaddclick();
  }
  addmultiple() {
    this.method.onworkaddclick();
    this.numberid = 0;
    this.holidays.forEach((val1: any) => {
      let item = this.holidays.filter(function (item: any) {
        return item.holidayId === val1.holidayId;
      })[0];
      let index = this.holidays.indexOf(item);
      if (val1.isChecked == true) {
        let updateisImport = {
          "holidayId": val1.holidayId,
          "isImported": true,
          "isAdded": false
        };
        this.library.update(updateisImport).subscribe((val) => {
          this.numberid++;
          console.log("updated");
          this.holidays.splice(index, this.number);
          this.isSelectall = false;
          if (this.numberid == this.number) {
            this.method.addwork();
          }
        });

      } else {
        console.log('Its Not working', val1.holidayId);
      }
    });

    this.add = [];
    this.inactivebutton();
    document.getElementById('close')?.click();
  }

  confirmadd(id: any) {
    this.holidays.forEach((val: any) => {
      let item = this.holidays.filter(function (item: any) {
        return item.holidayId === id;
      })[0];
      let index = this.holidays.indexOf(item);
      if (val.holidayId == id) {
        if (val.isChecked == true) {
          let updateisImport = {
            "holidayId": id,
            "isImported": true,
            "isAdded": false
          };
          this.library.update(updateisImport).subscribe((val) => {
            console.log("updated");
            this.holidays.splice(index, 1);
            let item = this.add.filter(function (item: any) {
              return item.holidayId === val.holidayId;
            })[0];
            let index1 = this.add.indexOf(item);
            this.add.splice(index1, 1);
            this.number = this.add.length;
            this.method.addwork();
            if (this.add.length == 0) {
              this.inactivebutton();
              this.add = [];
            }
          });


        } else {
          console.log('Its Not working', id);
        }
      }
    });

  }

  tabfunctionalityadd() {
    console.log('work add', this.tabnumber);
    if (this.tabnumber == 1) {
      this.add1tab = true;
      this.add2tab = false;
      this.add3tab = false;
      this.add4tab = false;
      this.add5tab = false;
      this.add6tab = false;
      this.add7tab = false;
      this.holidays.forEach((val: any) => {
        document.getElementById('checkbox' + val.holidayId)?.classList.remove('subli2checkbox');
        document.getElementById('addbtn' + val.holidayId)?.classList.remove('active1');
      });
      document.getElementById('createnew')?.classList.remove('btn1hover');
      document.getElementById('selectall')?.classList.add('colour5');
      this.updaesequence();
    } else if (this.tabnumber == 2) {
      this.tabnumber = 1;
      document.getElementById('selectall')?.classList.remove('colour5');
      if (this.tabfunc != this.holidays.length) {
        if (this.tabfunc2 == 0) {
          this.add1tab = false;
          this.add2tab = true;
          this.add3tab = false;
          this.add4tab = false;
          this.add5tab = false;
          this.add6tab = false;
          this.add7tab = false;
          this.holidays.forEach((val: any) => {
            document.getElementById('checkbox' + val.holidayId)?.classList.remove('subli2checkbox');
            document.getElementById('addbtn' + val.holidayId)?.classList.remove('active1');

            if (this.tabfunc == val.sequence) {
              document.getElementById('checkbox' + val.holidayId)?.classList.add('subli2checkbox');
              this.idnumber = val.holidayId;
            }
          });
          this.holidays.forEach((val: any) => {
            if (val.holidayId == this.idnumber) {
              if (val.isChecked == true) {
                this.tabfunc = val.sequence;
                this.tabfunc2 = 1;
                this.tabnumber = 1;
              } else {
                this.tabfunc2 = 0;
                this.tabfunc++;
                this.tabnumber = 1;
              }
            }
          });
        } else if (this.tabfunc2 == 1) {
          this.add1tab = false;
          this.add2tab = false;
          this.add3tab = true;
          this.add4tab = false;
          this.add5tab = false;
          this.add6tab = false;
          this.add7tab = false;
          this.holidays.forEach((val: any) => {
            if (val.holidayId == this.idnumber) {
              document.getElementById('checkbox' + val.holidayId)?.classList.remove('subli2checkbox');
              document.getElementById('addbtn' + val.holidayId)?.classList.add('active1');
              this.tabfunc++;
              this.tabnumber = 1;
              this.tabfunc2 = 0;
            }
          });
        }

      } else {
        this.tabnumber = 1;
        if (this.tabfunc2 == 0) {
          this.add1tab = false;
          this.add2tab = true;
          this.add3tab = false;
          this.add4tab = false;
          this.add5tab = false;
          this.add6tab = false;
          this.add7tab = false;
          this.holidays.forEach((val: any) => {
            document.getElementById('checkbox' + val.holidayId)?.classList.remove('subli2checkbox');
            document.getElementById('addbtn' + val.holidayId)?.classList.remove('active1');

            if (this.tabfunc == val.sequence) {
              document.getElementById('checkbox' + val.holidayId)?.classList.add('subli2checkbox');
              this.idnumber = val.holidayId;
              if (val.holidayId == this.idnumber) {
                if (val.isChecked == true) {
                  this.tabfunc2 = 1;
                  this.tabfunc = val.sequence;
                  this.tabnumber = 1;
                } else {
                  this.tabfunc2 = 0;
                  this.tabfunc = 1;
                  this.tabnumber = 2;
                }
              }
            }
          });

        } else if (this.tabfunc2 == 1) {
          this.add1tab = false;
          this.add2tab = false;
          this.add3tab = true;
          this.add4tab = false;
          this.add5tab = false;
          this.add6tab = false;
          this.add7tab = false;
          this.holidays.forEach((val: any) => {
            if (val.holidayId == this.idnumber) {
              document.getElementById('checkbox' + val.holidayId)?.classList.remove('subli2checkbox');
              document.getElementById('addbtn' + val.holidayId)?.classList.add('active1');
              this.tabfunc = 1;
              this.tabnumber = 2;
              this.tabfunc2 = 0;
            }
          });
        }

      }
    } else if (this.tabnumber == 3) {
      this.holidays.forEach((val: any) => {
        document.getElementById('checkbox' + val.holidayId)?.classList.remove('subli2checkbox');
        document.getElementById('addbtn' + val.holidayId)?.classList.remove('active1');
        this.tabfunc2 = 0;
        this.tabfunc = 1;
      });
      if (this.activelowerbutton == true) {
        this.add1tab = false;
        this.add2tab = false;
        this.add3tab = false;
        this.add4tab = false;
        this.add5tab = true;
        this.add6tab = false;
        this.add7tab = false;
        document.getElementById('add')?.classList.add('bottombutton1hover');
        this.tabnumber = 3;
        this.tabfunc2 = 0;
        this.tabfunc = 1;
      } else {
        this.add1tab = false;
        this.add2tab = false;
        this.add3tab = false;
        this.add4tab = true;
        this.add5tab = false;
        this.add6tab = false;
        this.add7tab = false;
        document.getElementById('close')?.classList.add('bottombutton1hover');
        this.tabfunc2 = 0;
        this.tabfunc = 1;
        this.tabnumber = 4;
      }
    } else if (this.tabnumber == 4) {
      this.add1tab = false;
      this.add2tab = false;
      this.add3tab = false;
      this.add4tab = false;
      this.add5tab = false;
      this.add6tab = true;
      this.add7tab = false;
      document.getElementById('add')?.classList.remove('bottombutton1hover');
      document.getElementById('cancel')?.classList.add('bottombutton1hover');
    } else if (this.tabnumber == 5) {
      this.add1tab = false;
      this.add2tab = false;
      this.add3tab = false;
      this.add4tab = false;
      this.add5tab = false;
      this.add6tab = false;
      this.add7tab = true;
      document.getElementById('cancel')?.classList.remove('bottombutton1hover');
      document.getElementById('close')?.classList.remove('bottombutton1hover');
      document.getElementById('createnew')?.classList.add('btn1hover');
      this.tabnumber = 0;
    }
  }

  hoveraddbutton() {
    document.getElementById('add')?.classList.remove('bottombutton1hover');
    document.getElementById('cancel')?.classList.remove('bottombutton1hover');
    document.getElementById('close')?.classList.remove('bottombutton1hover');
    document.getElementById('createnew')?.classList.remove('btn1hover');
    document.getElementById('selectall')?.classList.remove('colour5');
    this.holidays.forEach((val: any) => {
      document.getElementById('checkbox' + val.holidayId)?.classList.remove('subli2checkbox');
      document.getElementById('addbtn' + val.holidayId)?.classList.remove('active1');
    });
  }
  enterselectall() {
    if (this.add1tab == true) {
      document.getElementById('selectall')?.click();
    }
  }
  entercheckbox() {
    if (this.add2tab == true) {
      this.holidays.forEach((val: any) => {
        if (val.holidayId == this.idnumber) {
          document.getElementById('checkbox' + this.idnumber)?.click();
          if (val.isChecked == true) {
            this.tabfunc2 = 1;
            this.tabfunc = val.sequence;
            this.tabnumber = 2;
          } else {
            if (this.tabfunc != this.holidays.length) {
              this.tabfunc2 = 0;
              this.tabfunc = val.sequence + 1;
              this.tabnumber = 2;
            } else {
              this.tabfunc2 = 0;
              this.tabfunc = 1;
              this.tabnumber = 3;
            }

          }
        }
      });
    }

  }
  enteraddbutton() {
    if (this.add3tab == true) {
      this.add3tab = false;
      document.getElementById('addbtn' + this.idnumber)?.click();
      this.tabfunc2 = 0;
      this.tabfunc = 1;
      this.tabnumber = 3;
    }
  }
  entercancelbutton() {
    if (this.add6tab == true) {
      this.add6tab = false;
      document.getElementById('cancel')?.click();
      document.getElementById('cancel')?.classList.remove('bottombutton1hover');
    }
  }
  enterclosebutton() {
    if (this.add4tab == true) {
      this.add4tab = false;
      document.getElementById('close')?.click();
      document.getElementById('close')?.classList.remove('bottombutton1hover');
    }
  }
  enteraddallbutton() {
    if (this.add5tab == true) {
      this.add5tab = false;
      document.getElementById('add')?.click();
      document.getElementById('add')?.classList.remove('bottombutton1hover');
    }
  }
  entercreatebutton() {
    if (this.add7tab == true) {
      this.add7tab = false;
      document.getElementById('createnew')?.click();
      document.getElementById('createnew')?.classList.remove('btn1hover');
    }
  }
  hover1follow() {
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 2;
  }
  updaesequence() {
    this.sequences = [];
    let a = 1;
    this.holidays.forEach((val: any) => {
      if (val.isLibrary == true) {
        val.sequence = a++;
        this.sequences.push(val);
      }
    });
    let b = this.sequences.length + 1;
    this.holidays.forEach((val: any) => {
      if (val.isLibrary == false) {
        val.sequence = b++;
      }
    });
    console.log(this.holidays)
  }
  hover2follow(event: any, id: any) {
    this.tabfunc2 = 1;
    this.tabnumber = 2;
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        this.idnumber = id;
        if (event.target.checked) {
          this.tabfunc2 = 1;
          this.tabfunc = val.sequence;
          this.tabnumber = 2;
        } else {
          if (this.tabfunc != this.holidays.length) {
            this.tabfunc2 = 0;
            this.tabfunc = val.sequence + 1;
            this.tabnumber = 2;
          } else {
            this.tabfunc2 = 0;
            this.tabfunc = 1;
            this.tabnumber = 3;
          }

        }
      }
    });
  }
  hover3follow(id: any) {
    this.holidays.forEach((val: any) => {
      if (val.holidayId == id) {
        if (this.tabfunc != this.holidays.length) {
          this.tabfunc2 = 0;
          this.tabnumber = 2;
        } else {
          this.tabfunc2 = 0;
          this.tabnumber = 3;
        }
      }
    });
  }
  hover4follow() {
    this.tabfunc2 = 0;
    this.tabfunc = 1;
    this.tabnumber = 5;
  }
  hover5follow() {
    this.tabnumber = 5;
    this.tabfunc2 = 0;
    this.tabfunc = 1;
  }
  hover6follow() {
    this.tabnumber = 4;
    this.tabfunc2 = 0;
    this.tabfunc = 1;
  }
  hover7follow() {
    this.tabnumber = 1;
    this.tabfunc2 = 0;
    this.tabfunc = 1;
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.TAB) {
      this.tabnumber++;
    }
    if (event.key == KEY_CODE.ENTER) {
      this.enterselectall();
      this.entercheckbox();
      this.enteraddbutton();
      this.entercancelbutton();
      this.enterclosebutton();
      this.enteraddallbutton();
      this.entercreatebutton();
    }
  }
  @HostListener('window:keydown', ['$event'])
  key1Event(event: KeyboardEvent) {
    if (event.key === KEY_CODE.TAB) {
      event.preventDefault();
    }

  }

}
