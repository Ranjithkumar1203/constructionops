import { Component, HostListener, OnInit } from '@angular/core';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';
import { RightPanelService } from 'src/app/Services/right-panel.service';
import { CdkDragDrop, moveItemInArray, CdkDrag } from '@angular/cdk/drag-drop';
import { RightpanelComponent } from '../rightpanel.component';
import { Router, RouterLink } from '@angular/router';
import { AssignmenttabService } from 'src/app/Services/assignmenttab.service';
import { ThrowStmt, visitAll } from '@angular/compiler';
import { localizedString, THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-assignmnettab',
  templateUrl: './assignmnettab.component.html',
  styleUrls: ['./assignmnettab.component.css']
})
export class AssignmnettabComponent implements OnInit {
  public items: any;
  public finals: any;
  public newTask: any;
  public newTabs: any;
  public tabss: any;
  public tabsss: any;
  public routes: any;
  public options: any;
  public soutby: any;
  public selecetdoption: any;
  showInput: boolean = false;
  deleteswitch: boolean = false;
  showInput1: boolean = false;
  relaod: boolean = false;
  sequence: number | undefined;
  showcase: boolean = false;
dropdownclose:boolean = false;
  tabs = [
    {
      id: '1', tab: 'Task List'
    },
    {
      id: '2', tab: 'Project List'
    },
    {
      id: '3', tab: 'User List'
    },
    {
      id: '4', tab: 'Customer List'
    },
    {
      id: '5', tab: 'Internal Resource List'
    },
    {
      id: '6', tab: 'External Resource List'
    },
    {
      id: '7', tab: 'Superintendent List'
    },
    {
      id: '8', tab: 'Subcontractor List'
    },
    {
      id: '9', tab: 'Supplier List'
    }
  ]

  public addtabs: any;
  constructor(private todoService: AssignmenttabService, private service: HolidayLibraryService, private service2: RightPanelService, private method: RightpanelComponent, private router: Router) { }

  ngOnInit(): void {
    this.addtabs = this.todoService.getTodos();
    this.service.toggle$.subscribe(
      toggle => this.showInput = toggle
    )
    this.service2.toggle1$.subscribe(
      toggle1 => this.showInput1 = toggle1
    )
    this.addtabs = [];
    this.tabss = [];
    this.routes = [];
    this.service2.getroutes().subscribe((val2) => {
      this.routes = val2;
    });
    this.options = [];
    this.service2.gettaboptions().subscribe((val3) => {
      val3.forEach((itemworkk: any) => {
        itemworkk['setname'] = '';
        itemworkk['varname'] = '';
        itemworkk['name'] = '';
        itemworkk['isdeletable'] = false;
        if (itemworkk.selectedValue == 'Task List') {
          itemworkk.name = 'Task List';
          itemworkk.varname = 'Task List';
          itemworkk.route = '/home/task';
        } else if (itemworkk.selectedValue == 'Project List') {
          itemworkk.name = 'Project List';
          itemworkk.varname = 'Project List';
          itemworkk.route = '/home/project';
        } else if (itemworkk.selectedValue == 'User List') {
          itemworkk.name = 'User List';
          itemworkk.varname = 'User List';
          itemworkk.route = '/home/user';
        } else if (itemworkk.selectedValue == 'Customer List') {
          itemworkk.name = 'Customer List';
          itemworkk.varname = 'Customer List';
          itemworkk.route = '/home/customer';
        } else if (itemworkk.selectedValue == 'Internal Resource List') {
          itemworkk.name = 'Internal Resource List';
          itemworkk.varname = 'Internal Resource List';
          itemworkk.route = '/home/user';
        } else if (itemworkk.selectedValue == 'Supplier List') {
          itemworkk.name = 'Supplier List';
          itemworkk.varname = 'Supplier List';
          itemworkk.route = '/home/user';
        } else if (itemworkk.selectedValue == 'External Resource List') {
          itemworkk.name = 'External Resource List';
          itemworkk.varname = 'External Resource List';
          itemworkk.route = '/home/user';
        } else if (itemworkk.selectedValue == 'Superintendent List') {
          itemworkk.name = 'Superintendent List';
          itemworkk.varname = 'Superintendent List';
          itemworkk.route = '/home/user';
        } else if (itemworkk.selectedValue == 'Subcontractor List') {
          itemworkk.name = 'Subcontractor List';
          itemworkk.varname = 'Subcontractor List';
          itemworkk.route = '/home/user';
        } else {
          itemworkk.name = 'Unassigned';
          itemworkk.varname = 'Unassigned';
          itemworkk.route = '/home/tab';
        }
        itemworkk['number'] = "";
        itemworkk['sequencetab'] = itemworkk.sequence;
        if (itemworkk.sequencetab == '1') {
          itemworkk.number = 'One';
        } else if (itemworkk.sequencetab == '2') {
          itemworkk.number = 'Two';
        } else if (itemworkk.sequencetab == '3') {
          itemworkk.number = 'Three';
        } else if (itemworkk.sequencetab == '4') {
          itemworkk.number = 'Four';
        } else if (itemworkk.sequencetab == '5') {
          itemworkk.number = 'Five';
        } else if (itemworkk.sequencetab == '6') {
          itemworkk.number = 'Six';
        } else if (itemworkk.sequencetab == '7') {
          itemworkk.number = 'Seven';
        } else if (itemworkk.sequencetab == '8') {
          itemworkk.number = 'Eight';
        } else if (itemworkk.sequencetab == '9') {
          itemworkk.number = 'Nine';
        } else if (itemworkk.sequencetab == '10') {
          itemworkk.number = 'Ten';
        } else if (itemworkk.sequencetab == '11') {
          itemworkk.number = 'Eleven';
        } else if (itemworkk.sequencetab == '12') {
          itemworkk.number = 'Twelve';
        } else if (itemworkk.sequencetab == '13') {
          itemworkk.number = 'Thirteen';
        } else if (itemworkk.sequencetab == '14') {
          itemworkk.number = 'Fourteen';
        } else if (itemworkk.sequencetab == '15') {
          itemworkk.number = 'Fifteen';
        } else if (itemworkk.sequencetab == '16') {
          itemworkk.number = 'Sixteen';
        } else if (itemworkk.sequencetab == '17') {
          itemworkk.number = 'Seventeen';
        } else if (itemworkk.sequencetab == '18') {
          itemworkk.number = 'Eighteen';
        } else if (itemworkk.sequencetab == '19') {
          itemworkk.number = 'Nineteen';
        } else if (itemworkk.sequencetab == '20') {
          itemworkk.number = 'Twenty';
        } else if (itemworkk.sequencetab == '21') {
          itemworkk.number = 'Twenty One';
        } else if (itemworkk.sequencetab == '22') {
          itemworkk.number = 'Twenty Two';
        } else if (itemworkk.sequencetab == '23') {
          itemworkk.number = 'Twenty Three';
        } else if (itemworkk.sequencetab == '24') {
          itemworkk.number = 'Twenty Four';
        } else if (itemworkk.sequencetab == '25') {
          itemworkk.number = 'Twenty Five';
        } else if (itemworkk.sequencetab == '26') {
          itemworkk.number = 'Twenty Six';
        } else if (itemworkk.sequencetab == '27') {
          itemworkk.number = 'Twenty Seven';
        } else if (itemworkk.sequencetab == '28') {
          itemworkk.number = 'Twenty Eight';
        } else if (itemworkk.sequencetab == '29') {
          itemworkk.number = 'Twenty Nine';
        } else if (itemworkk.sequencetab == '30') {
          itemworkk.number = 'Thirty';
        } else if (itemworkk.sequencetab == '31') {
          itemworkk.number = 'Thirty One';
        } else if (itemworkk.sequencetab == '32') {
          itemworkk.number = 'Thirty Two';
        } else if (itemworkk.sequencetab == '33') {
          itemworkk.number = 'Thirty Three';
        } else if (itemworkk.sequencetab == '34') {
          itemworkk.number = 'Thirty Four';
        } else if (itemworkk.sequencetab == '35') {
          itemworkk.number = 'Thirty Five';
        } else if (itemworkk.sequencetab == '36') {
          itemworkk.number = 'Thirty Six';
        } else if (itemworkk.sequencetab == '37') {
          itemworkk.number = 'Thirty Seven';
        } else if (itemworkk.sequencetab == '38') {
          itemworkk.number = 'Thirty Eight';
        } else if (itemworkk.sequencetab == '39') {
          itemworkk.number = 'Thirty Nine';
        } else if (itemworkk.sequencetab == '40') {
          itemworkk.number = 'Forty';
        }

        if (itemworkk.sequence > 6) {
          itemworkk.isdeletable = true;
        }
        itemworkk['isName'] = true;
        if (itemworkk.name == '') {
          itemworkk.isName = false;
        }
      });

      this.options = val3;

      this.options = this.options.sort((a: { sequencetab: number; }, b: { sequencetab: number; }) => a.sequencetab - b.sequencetab)
      this.tabsss = [];
      console.log('value', this.options);
      this.tabs.forEach((itemtabs: any) => {
        itemtabs['isSelected'] = false;
        itemtabs['isMatch'] = false;
        this.options.forEach((item: any) => {
          if (item.selectedValue == 'Task List') {
            if (itemtabs.tab == 'Task List') {
              itemtabs.isSelected = true;
            }
          } else if (item.selectedValue == 'Project List') {
            if (itemtabs.tab == 'Project List') {
              itemtabs.isSelected = true;
            }
          } else if (item.selectedValue == 'Internal Resource List') {
            if (itemtabs.tab == 'Internal Resource List') {
              itemtabs.isSelected = true;
            }
          } else if (item.selectedValue == 'User List') {
            if (itemtabs.tab == 'User List') {
              itemtabs.isSelected = true;
            }
          } else if (item.selectedValue == 'Customer List') {
            if (itemtabs.tab == 'Customer List') {
              itemtabs.isSelected = true;
            }
          } else if (item.selectedValue == 'External Resource List') {
            if (itemtabs.tab == 'External Resource List') {
              itemtabs.isSelected = true;
            }
          } else if (item.selectedValue == 'Superintendent List') {
            if (itemtabs.tab == 'Superintendent List') {
              itemtabs.isSelected = true;
            }
          } else if (item.selectedValue == 'Subcontractor List') {
            if (itemtabs.tab == 'Subcontractor List') {
              itemtabs.isSelected = true;
            }
          } else if (item.selectedValue == 'Supplier List') {
            if (itemtabs.tab == 'Supplier List') {
              itemtabs.isSelected = true;
            }
          }
        });
        if (itemtabs.isSelected == false) {
          this.tabsss.push(itemtabs);
        }
        itemtabs.isMatch = itemtabs.isSelected;
      });
      console.log('tabsss', this.tabs);
      this.tabss = this.tabsss;
    });
    // console.log('id', this.service2.iddrop);
    // console.log('switch', this.showInput1);
    if (this.showInput1 == true) {
      var timesRun1 = 0;
      var interval1 = setInterval(() => {
        timesRun1 += 1;
        if (timesRun1 == 8) {
          clearInterval(interval1);
        }
        this.activeaddbutton();
        this.toggle1();
      }, 200);
    }

    var timesRun = 0;
    var interval = setInterval(() => {
      timesRun += 1;
      if (timesRun == 2) {
        clearInterval(interval);
      }
      this.sorting();
      console.log('triggered')
    }, 200);



    // this.addtabs.forEach((item: any) => {
    //   item['numbername'] = "";
    //   if (item.number == '1') {
    //     item.numbername = 'Seven';
    //   } else if (item.number == '2') {
    //     item.numbername = 'Eigth';
    //   } else if (item.number == '3') {
    //     item.numbername = 'Nine';
    //   } else if (item.number == '4') {
    //     item.numbername = 'Ten';
    //   } else if (item.number == '5') {
    //     item.numbername = 'Eleven';
    //   } else if (item.number == '6') {
    //     item.numbername = 'Twelve';
    //   }
    // });

  }
  activeaddbutton() {
    if (this.tabss.length == 0) {
      document.getElementById('colbtnactive')?.classList.add('hide');
      document.getElementById('colbtn')?.classList.remove('hide');
    } else {
      this.options.forEach((item: any) => {
        if ((item.selectedValue == 'Unassigned') || (item.selectedValue == '') || (item.selectedValue == 'Assign')) {
          document.getElementById('colbtnactive')?.classList.add('hide');
          document.getElementById('colbtn')?.classList.remove('hide');
        } else {
          document.getElementById('colbtnactive')?.classList.remove('hide');
          document.getElementById('colbtn')?.classList.add('hide');
        }
      });
    }

  }

  select(id: any, value: any, sequence: any) {
    this.tabss = [];

    this.newTask = [];
    this.showcase = true;


    this.options.forEach((itemworkk: any) => {
      if (itemworkk.id == id) {
        console.log(itemworkk.name)
        this.tabs.forEach((itemtab: any) => {
          if (itemtab.tab == itemworkk.name) {
            itemtab.isSelected = false;

          }

          if (itemtab.tab == value) {
            console.log(value)
            itemtab.isSelected = true;

          }
          if (itemtab.isSelected == false) {
            this.tabss.push(itemtab);
            console.log(this.tabss)
          }
        });
        itemworkk.name = value;
        itemworkk.isName = true;
        this.service2.name = value;
        this.service2.idtab = id;
        this.service2.seqid = sequence;
        this.newTask.push(itemworkk);
        console.log(this.newTask);
      }



    });
    this.activeaddbutton();

    this.dropdownsingle(id);
    this.applynclose();
    this.method.doropdownclick();
  }
  applynclose3() {
    document.getElementById('close')?.classList.add('hide');
    document.getElementById('cancel')?.classList.remove('hide');
  }

  selects(id: any, value: any, sequence: any) {
    this.tabss = [];
    this.newTask = [];
    this.showcase = true;
    this.addtabs.forEach((itemworkk: any) => {
      if (itemworkk.id == id) {
        console.log(itemworkk.name)
        this.tabs.forEach((itemtab: any) => {
          if (itemtab.tab == itemworkk.name) {
            itemtab.isSelected = false;

          }

          if (itemtab.tab == value) {
            console.log(value)
            itemtab.isSelected = true;

          }
          if (itemtab.isSelected == false) {
            this.tabss.push(itemtab);
            console.log(this.tabss)
          }
        });
        itemworkk.name = value;
        itemworkk.isName = true;
        this.service2.name = value;
        this.service2.idtab = id;
        this.service2.seqid = sequence;
        this.newTask.push(itemworkk);
      }



    });
    this.dropdownsingles(id);
    this.applynclose();
    this.method.doropdownclick();
    this.activeaddbutton();
  }
  dropdownlisttabs() {
    this.tabsss = [];
    this.tabss = [];
    this.tabs.forEach((itemtabs: any) => {
      itemtabs['isSelected'] = false;
      this.options.forEach((item: any) => {
        if (item.selectedValue == 'Task List') {
          if (itemtabs.tab == 'Task List') {
            itemtabs.isSelected = true;
          }
        } else if (item.selectedValue == 'Project List') {
          if (itemtabs.tab == 'Project List') {
            itemtabs.isSelected = true;
          }
        } else if (item.selectedValue == 'Internal Resource List') {
          if (itemtabs.tab == 'Internal Resource List') {
            itemtabs.isSelected = true;
          }
        } else if (item.selectedValue == 'User List') {
          if (itemtabs.tab == 'User List') {
            itemtabs.isSelected = true;
          }
        } else if (item.selectedValue == 'Customer List') {
          if (itemtabs.tab == 'Customer List') {
            itemtabs.isSelected = true;
          }
        } else if (item.selectedValue == 'External Resource List') {
          if (itemtabs.tab == 'External Resource List') {
            itemtabs.isSelected = true;
          }
        } else if (item.selectedValue == 'Superintendent List') {
          if (itemtabs.tab == 'Superintendent List') {
            itemtabs.isSelected = true;
          }
        } else if (item.selectedValue == 'Subcontractor List') {
          if (itemtabs.tab == 'Subcontractor List') {
            itemtabs.isSelected = true;
          }
        } else if (item.selectedValue == 'Supplier List') {
          if (itemtabs.tab == 'Supplier List') {
            itemtabs.isSelected = true;
          }
        }
      });
      if (itemtabs.isSelected == false) {
        this.tabsss.push(itemtabs);
      }
    });
    console.log('tabsss', this.tabsss);
    this.tabss = this.tabsss;
  }
  cancel() {
    this.options.forEach((itemworkk: any) => {
      itemworkk.name = itemworkk.varname;
      if (itemworkk.name == '') {
        itemworkk.isName = false;
      } else {
        itemworkk.isName = true;
      }
    });
    this.addtabs = [];
    this.applynclose2();
    this.method.doropdownclickcancel();
    this.method.clearaddnewtab();
    this.newTabs = [];
    this.tabss = [];
    this.tabss = this.tabsss;
    this.tabss.forEach((itemtab: any) => {
      itemtab.isSelected = false;
    });
  }

  applynclose() {
    document.getElementById('applyncancel')?.classList.add('hide');
    document.getElementById('applynclose')?.classList.remove('hide');
    document.getElementById('close')?.classList.add('hide');
    document.getElementById('cancel')?.classList.remove('hide');
  }
  applynclose2() {
    document.getElementById('applyncancel')?.classList.remove('hide');
    document.getElementById('applynclose')?.classList.add('hide');
    document.getElementById('close')?.classList.remove('hide');
    document.getElementById('cancel')?.classList.add('hide');
  }
  applyfinal() {
    this.f1().then(() => this.f2().then(() => this.f3().then(() => this.f4())));
    // this.create();
    // this.final();

  }
  f1() {
    return new Promise((resolve, reject) => {
      document.getElementById('loading')?.classList.remove('hide');
      document.getElementById('column1')?.classList.add('hide');

      resolve(console.log('F1 Value Update complete'));
    });
  }
  f2() {
    return new Promise((resolve, reject) => {
      if (this.addtabs == '') {
        resolve(console.log('F2 rejected'));
      } else {
        console.log('new tab values', this.addtabs)
        this.addtabs.forEach((createtab: any) => {
          let tab = {
            settingId: Number('8'),
            settingType: "RightPanelTabs",
            sequence: createtab.sequence,
            selectedValue: createtab.name,
          };
          this.service2.create(tab).subscribe((val4) => {
            resolve(console.log('F2 created complete', val4));
            this.method.createnewtab();
          });
        });

      }

    });
  }
  f3() {
    return new Promise((resolve, reject) => {
      this.method.sorttabs();

      resolve(console.log('f3 Move on', this.options));
    });

  }
  f4() {
    return new Promise((resolve, reject) => {
      this.method.dropdwonroute();
      document.getElementById('loading')?.classList.add('hide');
      document.getElementById('column1')?.classList.remove('hide');

      if (this.newTask != null) {
        this.addtabs = [];
        this.newTask.forEach((itemready: any) => {
          if (itemready.name == 'Task List') {
            this.router.navigate(['/home/task']);
            this.method.closebutton();
            this.method.opentab(itemready.id);
            this.method.closetab(itemready.id);
          } else if (itemready.name == 'Project List') {
            this.router.navigate(['/home/project']);
            this.method.closebutton();
            this.method.opentab(itemready.id);
            this.method.closetab(itemready.id);
          } else if (itemready.name == 'User List') {
            this.router.navigate(['/home/user']);
            this.method.closebutton();
            this.method.opentab(itemready.id);
            this.method.closetab(itemready.id);
          } else if (itemready.name == 'Customer List') {
            this.router.navigate(['/home/customer']);
            this.method.closebutton();
            this.method.opentab(itemready.id);
            this.method.closetab(itemready.id);
          } else {
            this.router.navigate(['/home']);
            this.method.closebutton();
            this.method.opentab(itemready.id);
            this.method.closetab(itemready.id);
          }

        });
        this.method.dropdownfinalclick();
        if (this.addtabs != '') {
          this.method.endscroll();
        }
      }
      else {
        this.method.closebutton();
        this.method.dropdownfinalclick();
        this.router.navigate(['/home']);
      }
      resolve(console.log('f4 Navigated'));
    });
  }

  finalroute(id: any) {

    this.newTask.forEach((itemworkk: any) => {

      if (itemworkk.selectedValue == id) {
        if (itemworkk.sequence == '1') {
          document.getElementById('scroll')!.scrollTo({ top: 0 });
        } else if (itemworkk.sequence == '2') {
          document.getElementById('scroll')!.scrollTo({ top: 15 });
        } else if (itemworkk.sequence == '3') {
          document.getElementById('scroll')!.scrollTo({ top: 25 });
        } else if (itemworkk.sequence == '4') {
          document.getElementById('scroll')!.scrollTo({ top: 50 });
        } else if (itemworkk.sequence == '5') {
          document.getElementById('scroll')!.scrollTo({ top: 130 });
        } else if (itemworkk.sequence == '6') {
          document.getElementById('scroll')!.scrollTo({ top: 200 });
        } else if (itemworkk.sequence == '7') {
          document.getElementById('scroll')!.scrollTo({ top: 280 });
        } else if (itemworkk.sequence == '8') {
          document.getElementById('scroll')!.scrollTo({ top: 380 });
        } else if (itemworkk.sequence == '9') {
          document.getElementById('scroll')!.scrollTo({ top: 480 });
        } else if (itemworkk.sequence == '10') {
          document.getElementById('scroll')!.scrollTo({ top: 580 });
        } else if (itemworkk.sequence == '11') {
          document.getElementById('scroll')!.scrollTo({ top: 680 });
        } else if (itemworkk.sequence == '12') {
          document.getElementById('scroll')!.scrollTo({ top: 780 });
        } else if (itemworkk.sequence == '13') {
          document.getElementById('scroll')!.scrollTo({ top: 980 });
        } else if (itemworkk.sequence == '14') {
          document.getElementById('scroll')!.scrollTo({ top: 1080 });
        } else {
          document.getElementById('scroll')!.scrollTo({ top: 1600 });
        }

      }
    });
  }
  apply() {
    this.options.forEach((itemworkk: any) => {
      let applytab = {
        'id': itemworkk.id,
        'selectedValue': itemworkk.name
      }
      this.service2.update(applytab).subscribe((val) => {
      });
    });

    console.log('value', this.options);

  }
  create() {
    if (this.addtabs == '') {
    } else {
      this.addtabs.forEach((createtab: any) => {
        let tab = {
          settingId: Number('8'),
          settingType: "RightPanelTabs",
          sequence: Number(this.options.length + this.addtabs.length + 1),
          selectedValue: createtab.tab,
        };
        this.service2.create(tab).subscribe((val4) => {
          console.log('created', val4);
        });
      });

    }

  }
  sorting() {
    this.items = [];
    let k = 1;
    let e = this.service2.length + 1;
    this.options.forEach((item: any) => {
      if (item.selectedValue == 'Unassigned' || item.selectedValue == '' || item.selectedValue == 'Assign') {

        let tabopions = {
          'id': item.id,
          'sequence': e++,
        };
        this.service2.update(tabopions).subscribe((val) => {
        });

      }

      else {
        let tabopions1 = {
          'id': item.id,
          'sequence': k++,
        };
        this.service2.update(tabopions1).subscribe((val1) => {
        });

      }
    });

  }
  final() {
    console.log('null', this.newTask);
    if (this.newTask != null) {
      this.newTask.forEach((itemready: any) => {
        if (itemready.name == 'Task List') {
          this.router.navigate(['/home/task']);
          this.method.closebutton();
          this.method.opentab(itemready.id);
          this.method.closetab(itemready.id);
        } else if (itemready.name == 'Project List') {
          this.router.navigate(['/home/project']);
          this.method.closebutton();
          this.method.opentab(itemready.id);
          this.method.closetab(itemready.id);
        } else if (itemready.name == 'User List') {
          this.router.navigate(['/home/user']);
          this.method.closebutton();
          this.method.opentab(itemready.id);
          this.method.closetab(itemready.id);
        } else if (itemready.name == 'Customer List') {
          this.router.navigate(['/home/customer']);
          this.method.closebutton();
          this.method.opentab(itemready.id);
          this.method.closetab(itemready.id);
        } else if (itemready.name == 'Supplier List') {
          this.router.navigate(['/home/customer']);
          this.method.closebutton();
          this.method.opentab(itemready.id);
          this.method.closetab(itemready.id);
        } else {
          this.router.navigate(['/home']);
          this.method.closebutton();
          this.method.opentab(itemready.id);
          this.method.closetab(itemready.id);
        }
      });
      this.method.dropdownfinalclick();
    }
    else {
      this.method.closebutton();
      this.method.dropdownfinalclick();
      this.router.navigate(['/home']);
    }
  }

  createtab() {

    this.addtabs.forEach((createtab: any) => {
      let tab = {
        settingId: Number('8'),
        settingType: "RightPanelTabs",
        sequence: Number(this.options.length + 1),
        selectedValue: createtab.tab,
      };
      this.service2.create(tab).subscribe((val4) => {
        console.log('created', val4);
      });
    });
  }


  createaddtab() {
    let tab = {
      id: Number(this.options.length + this.addtabs.length + 20),
      sequence: Number(this.options.length + this.addtabs.length + 1),
      tab: 'Unassigned',
      name: 'Unassigned',
      tabname: 'Assign',
      isName: true,
      number: Number(this.options.length + this.addtabs.length + 1),
    }
    this.addtabs.push(tab);
    this.todoService.addTodo(tab);
    this.tabnumber();
    // this.addtab(tab).subscribe((val4) => {
    //   console.log('created', val4);
    // });
    this.applynclose3();
    this.addtabs.forEach((val: any) => {
      if (val.sequence == 7) {
        document.getElementById('scroll')!.scrollTo({ top: 625 });
      } else if (val.sequence == 8) {
        document.getElementById('scroll')!.scrollTo({ top: 730 });
      } else if (val.sequence == 9) {
        document.getElementById('scroll')!.scrollTo({ top: 835 });
      } else if (val.sequence == 10) {
        document.getElementById('scroll')!.scrollTo({ top: 940 });
      } else if (val.sequence == 11) {
        document.getElementById('scroll')!.scrollTo({ top: 1045 });
      } else if (val.sequence == 12) {
        document.getElementById('scroll')!.scrollTo({ top: 1150 });
      } else if (val.sequence == 13) {
        document.getElementById('scroll')!.scrollTo({ top: 1255 });
      } else if (val.sequence == 14) {
        document.getElementById('scroll')!.scrollTo({ top: 1360 });
      } else {
        document.getElementById('scroll')!.scrollTo({ top: 1665 });
      }
    });
  }

  drop(event: CdkDragDrop<unknown>) {
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
  }
  sortPredicate(index: number, item: CdkDrag<number>) {
    return (index + 1) % 2 === item.data % 2;
  }

  toggle() {
    window.history.back();
    this.method.closebutton();

  }

  toggle1() {
    if (this.showInput1 == true) {
      this.dropopen(this.service2.iddrop);
    }
  }

  openclick() {
    this.showcase = true;
  }
  dropopen(id: any) {
    document.getElementById('tabsec' + id)?.classList.add('tab1');
    this.dropclose(id);
    this.options.forEach((itemworkk: any) => {

      if (itemworkk.id == id) {

        if ((itemworkk.selectedValue == 'Assign') || (itemworkk.selectedValue == 'Unassigned') || (itemworkk.selectedValue == '')) {
          document.getElementById('dropdownbor' + id)?.classList.add('dropdownbor');
          document.getElementById('dropdownimg' + id)?.classList.add('hide');
          document.getElementById('dropdownimgsss' + id)?.classList.remove('hide');
          document.getElementById('dropdownul' + id)?.classList.remove('hide');
        }


        if (itemworkk.sequence == '1') {
          document.getElementById('scroll')!.scrollTo({ top: 0 });
        } else if (itemworkk.sequence == '2') {
          document.getElementById('scroll')!.scrollTo({ top: 15 });
        } else if (itemworkk.sequence == '3') {
          document.getElementById('scroll')!.scrollTo({ top: 25 });
        } else if (itemworkk.sequence == '4') {
          document.getElementById('scroll')!.scrollTo({ top: 50 });
        } else if (itemworkk.sequence == '5') {
          document.getElementById('scroll')!.scrollTo({ top: 130 });
        } else if (itemworkk.sequence == '6') {
          document.getElementById('scroll')!.scrollTo({ top: 200 });
        } else if (itemworkk.sequence == '7') {
          document.getElementById('scroll')!.scrollTo({ top: 280 });
        } else if (itemworkk.sequence == '8') {
          document.getElementById('scroll')!.scrollTo({ top: 380 });
        } else if (itemworkk.sequence == '9') {
          document.getElementById('scroll')!.scrollTo({ top: 480 });
        } else if (itemworkk.sequence == '10') {
          document.getElementById('scroll')!.scrollTo({ top: 580 });
        } else if (itemworkk.sequence == '11') {
          document.getElementById('scroll')!.scrollTo({ top: 680 });
        } else if (itemworkk.sequence == '12') {
          document.getElementById('scroll')!.scrollTo({ top: 780 });
        } else if (itemworkk.sequence == '13') {
          document.getElementById('scroll')!.scrollTo({ top: 980 });
        } else if (itemworkk.sequence == '14') {
          document.getElementById('scroll')!.scrollTo({ top: 1080 });
        } else {
          document.getElementById('scroll')!.scrollTo({ top: 1600 });
        }

      }
    });
    // this.service2.iddrop = 0;
  }
  dropopenactive(id: any) {
    this.dropdownclose = false;
    if (this.tabss.length != 0) {
      
      document.getElementById('tabsec' + id)?.classList.remove('tab');
      document.getElementById('tabsec' + id)?.classList.add('tab1');
      document.getElementById('dropdownbor' + id)?.classList.add('dropdownbor');
      document.getElementById('dropdownimg' + id)?.classList.add('hide');
      document.getElementById('dropdownimgsss' + id)?.classList.remove('hide');
      document.getElementById('dropdownul' + id)?.classList.remove('hide');
      this.dropclose(id);
      this.options.forEach((itemworkk: any) => {


        if (itemworkk.id == id) {
          if (itemworkk.sequence == '1') {
            document.getElementById('scroll')!.scrollTo({ top: 0 });
          } else if (itemworkk.sequence == '2') {
            document.getElementById('scroll')!.scrollTo({ top: 15 });
          } else if (itemworkk.sequence == '3') {
            document.getElementById('scroll')!.scrollTo({ top: 25 });
          } else if (itemworkk.sequence == '4') {
            document.getElementById('scroll')!.scrollTo({ top: 50 });
          } else if (itemworkk.sequence == '5') {
            document.getElementById('scroll')!.scrollTo({ top: 130 });
          } else if (itemworkk.sequence == '6') {
            document.getElementById('scroll')!.scrollTo({ top: 200 });
          } else if (itemworkk.sequence == '7') {
            document.getElementById('scroll')!.scrollTo({ top: 280 });
          } else if (itemworkk.sequence == '8') {
            document.getElementById('scroll')!.scrollTo({ top: 380 });
          } else if (itemworkk.sequence == '9') {
            document.getElementById('scroll')!.scrollTo({ top: 480 });
          } else if (itemworkk.sequence == '10') {
            document.getElementById('scroll')!.scrollTo({ top: 580 });
          } else if (itemworkk.sequence == '11') {
            document.getElementById('scroll')!.scrollTo({ top: 680 });
          } else if (itemworkk.sequence == '12') {
            document.getElementById('scroll')!.scrollTo({ top: 780 });
          } else if (itemworkk.sequence == '13') {
            document.getElementById('scroll')!.scrollTo({ top: 980 });
          } else if (itemworkk.sequence == '14') {
            document.getElementById('scroll')!.scrollTo({ top: 1080 });
          } else {
            document.getElementById('scroll')!.scrollTo({ top: 1600 });
          }

        }
      });
      this.service2.iddrop = 0;
      var a = 1;
      const interval = setInterval(() => {
        console.log(a++)
        if (a == 3) {
          clearInterval(interval);
          this.dropdownclose = true;
        }
      }, 300);
    } else {

    }

  }
  dropdownsingle(id: any) {
    this.showcase = true;
    document.getElementById('dropdownbor' + id)?.classList.remove('dropdownbor');
    document.getElementById('tabsec' + id)?.classList.add('tab');
    document.getElementById('tabsec' + id)?.classList.remove('tab1');
    document.getElementById('dropdownimg' + id)?.classList.remove('hide');
    document.getElementById('dropdownimgsss' + id)?.classList.add('hide');
    document.getElementById('dropdownul' + id)?.classList.add('hide');
  }
  dropclose(id: any) {
    this.options.forEach((itemworkk: any) => {
      if (itemworkk.id != id) {
        this.showcase = true;
        document.getElementById('dropdownbor' + itemworkk.id)?.classList.remove('dropdownbor');
        document.getElementById('tabsec' + itemworkk.id)?.classList.add('tab');
        document.getElementById('tabsec' + itemworkk.id)?.classList.remove('tab1');
        document.getElementById('dropdownimg' + itemworkk.id)?.classList.remove('hide');
        document.getElementById('dropdownimgsss' + itemworkk.id)?.classList.add('hide');
        document.getElementById('dropdownul' + itemworkk.id)?.classList.add('hide');
      }
    });

  }



  tabnumber() {
    this.addtabs.forEach((item: any) => {
      item['numbername'] = "";
      if (item.number == '1') {
        item.numbername = 'One';
      } else if (item.number == '2') {
        item.numbername = 'Two';
      } else if (item.number == '3') {
        item.numbername = 'Three';
      } else if (item.number == '4') {
        item.numbername = 'Four';
      } else if (item.number == '5') {
        item.numbername = 'Five';
      } else if (item.number == '6') {
        item.numbername = 'Six';
      } else if (item.number == '7') {
        item.numbername = 'Seven';
      } else if (item.number == '8') {
        item.numbername = 'Eight';
      } else if (item.number == '9') {
        item.numbername = 'Nine';
      } else if (item.number == '10') {
        item.numbername = 'Ten';
      } else if (item.number == '11') {
        item.numbername = 'Eleven';
      } else if (item.number == '12') {
        item.numbername = 'Twelve';
      } else if (item.number == '13') {
        item.numbername = 'Thirteen';
      } else if (item.number == '14') {
        item.numbername = 'Fourteen';
      } else if (item.number == '15') {
        item.numbername = 'Fifteen';
      } else if (item.number == '16') {
        item.numbername = 'Sixteen';
      } else if (item.number == '17') {
        item.numbername = 'Seventeen';
      } else if (item.number == '18') {
        item.numbername = 'Eighteen';
      } else if (item.number == '19') {
        item.numbername = 'Nineteen';
      } else if (item.number == '20') {
        item.numbername = 'Twenty';
      } else if (item.number == '21') {
        item.numbername = 'Twenty One';
      } else if (item.number == '22') {
        item.numbername = 'Twenty Two';
      } else if (item.number == '23') {
        item.numbername = 'Twenty Three';
      } else if (item.number == '24') {
        item.numbername = 'Twenty Four';
      } else if (item.number == '25') {
        item.numbername = 'Twenty Five';
      } else if (item.number == '26') {
        item.numbername = 'Twenty Six';
      } else if (item.number == '27') {
        item.numbername = 'Twenty Seven';
      } else if (item.number == '28') {
        item.numbername = 'Twenty Eight';
      } else if (item.number == '29') {
        item.numbername = 'Twenty Nine';
      } else if (item.number == '30') {
        item.numbername = 'Thirty';
      } else if (item.number == '31') {
        item.numbername = 'Thirty One';
      } else if (item.number == '32') {
        item.numbername = 'Thirty Two';
      } else if (item.number == '33') {
        item.numbername = 'Thirty Three';
      } else if (item.number == '34') {
        item.numbername = 'Thirty Four';
      } else if (item.number == '35') {
        item.numbername = 'Thirty Five';
      } else if (item.number == '36') {
        item.numbername = 'Thirty Six';
      } else if (item.number == '37') {
        item.numbername = 'Thirty Seven';
      } else if (item.number == '38') {
        item.numbername = 'Thirty Eight';
      } else if (item.number == '39') {
        item.numbername = 'Thirty Nine';
      } else if (item.number == '40') {
        item.numbername = 'Forty';
      }
    });
  }


  dropopens(id: any) {
    this.dropdownclose = false;
    document.getElementById('dropdowntexts' + id)?.classList.add('dropdownbor');
    document.getElementById('tabsecs' + id)?.classList.remove('tab');
    document.getElementById('tabsecs' + id)?.classList.add('tab1');
    document.getElementById('dropdownimgs' + id)?.classList.add('hide');
    document.getElementById('dropdownimgss' + id)?.classList.remove('hide');
    document.getElementById('dropdownuls' + id)?.classList.remove('hide');
    this.dropcloses(id);
    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 3) {
        clearInterval(interval);
        this.dropdownclose = true;
      }
    }, 300);
  }
  dropdownsingles(id: any) {
    this.showcase = true;
    document.getElementById('dropdowntexts' + id)?.classList.remove('dropdownbor');
    document.getElementById('tabsecs' + id)?.classList.add('tab');
    document.getElementById('tabsecs' + id)?.classList.remove('tab1');
    document.getElementById('dropdownimgs' + id)?.classList.remove('hide');
    document.getElementById('dropdownimgss' + id)?.classList.add('hide');
    document.getElementById('dropdownuls' + id)?.classList.add('hide');
  }
  dropcloses(id: any) {
    this.options.forEach((itemworkk: any) => {
      if (itemworkk.id != id) {
        this.showcase = true;
        document.getElementById('dropdowntexts' + itemworkk.id)?.classList.remove('dropdownbor');
        document.getElementById('tabsecs' + itemworkk.id)?.classList.add('tab');
        document.getElementById('tabsecs' + itemworkk.id)?.classList.remove('tab1');
        document.getElementById('dropdownimgs' + itemworkk.id)?.classList.remove('hide');
        document.getElementById('dropdownimgss' + itemworkk.id)?.classList.add('hide');
        document.getElementById('dropdownuls' + itemworkk.id)?.classList.add('hide');
      }
    });
  }

  deletetab(id: any) {
    this.deleteswitch = true;
    this.method.deletetab();
    this.service2.deletetab = id;
    let item = this.options.filter(function (item: any) {
      return item.id === id;
    })[0];
    let index = this.options.indexOf(item);
    this.options.splice(index, 1);
    this.service2.delete(id).subscribe((val) => {
      console.log('deleted', id);
    });
  }
  deletetabs(id: any) {
    this.deleteswitch = true;
    let item = this.addtabs.filter(function (item: any) {
      return item.id === id;
    })[0];
    let index = this.addtabs.indexOf(item);
    this.addtabs.splice(index, 1);
  }

  deletetext(id: any) {
    this.tabss = [];
    this.applynclose();
    this.options.forEach((val: any) => {
      if (val.id == id) {
        this.tabs.forEach((itemtab: any) => {
          if (itemtab.tab == val.name) {
            itemtab.isSelected = false;

          }

          if (itemtab.isSelected == false) {
            this.tabss.push(itemtab);
            console.log(this.tabss)
          }
        });
        val.name = '';
        val.isName = false;
        this.service2.name = val.name;
        this.service2.idtab = id;
        this.service2.seqid = val.sequence;
        this.method.doropdownclick();
      }
    });

  }
  closetab() {
    if (this.deleteswitch == true) {
      this.deleteswitch = false;
      let k = 1;
      this.options.forEach((item: any) => {
        item.sequencetab = k++;
        item.sequence = item.sequencetab;
        let tab1s = {
          'id': item.id,
          'sequence': item.sequence,
        }
        this.service2.update(tab1s).subscribe((val1) => {
        });
      });
    } else {

    }
  }
  deletetexts(id: any) {
    this.tabss = [];
    this.applynclose();
    this.addtabs.forEach((val: any) => {
      if (val.id == id) {
        this.tabs.forEach((itemtab: any) => {
          if (itemtab.tab == val.name) {
            itemtab.isSelected = false;

          }

          if (itemtab.isSelected == false) {
            this.tabss.push(itemtab);
            console.log(this.tabss)
          }
        });
        val.name = '';
        val.isName = false;
        this.service2.name = val.name;
        this.service2.idtab = id;
        this.service2.seqid = val.sequence;
        this.method.doropdownclick();
      }
    });

  }
  onChange(valueupdate: any, id: any, value: any) {
    if (valueupdate != '') {
      this.options.forEach((val: any) => {
        if (val.id == id) {
          this.tabss = [];
          this.tabs.forEach((val1: any) => {
            if (val1.isSelected == false) {
              let a = val1.tab.slice(0, 1);
              let b = val1.tab.slice(0, 2);
              let c = val1.tab.slice(0, 3);
              let d = val1.tab.slice(0, 4);
              let e = val1.tab.slice(0, 5);
              let f = val1.tab.slice(0, 6);
              let g = val1.tab.slice(0, 7);
              let h = val1.tab.slice(0, 8);
              let i = val1.tab.slice(0, 9);
              let j = val1.tab.slice(0, 10);
              let k = val1.tab.slice(0, 11);
              let l = val1.tab.slice(0, 12);
              let m = val1.tab.slice(0, 13);
              let n = val1.tab.slice(0, 14);
              if (val.name.toLowerCase() == a.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == b.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == c.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == d.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == e.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == f.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == g.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == h.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == i.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == j.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == f.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == k.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == l.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == m.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == n.toLowerCase()) {
                val1.isMatch = false;
              } else if (val.name.toLowerCase() == val1.tab.toLowerCase()) {
                val1.isMatch = false;
              } else {
                val1.isMatch = true;
              }

              if (val1.isMatch == false) {
                this.tabss.push(val1);
                console.log(this.tabss)
                document.getElementById('dropdownimg' + val.id)?.click();
              }
            }


          });



        }
      });
    } else {
      this.tabss = [];
      this.newTask = [];
      this.options.forEach((val: any) => {
        if (val.id == id) {
          this.tabs.forEach((itemtab: any) => {
            if (itemtab.tab == val.selectedValue) {
              itemtab.isSelected = false;
            }
            if (itemtab.isSelected == false) {
              this.tabss.push(itemtab);
              console.log(this.tabss)
            }
          });
          val.name = value;
          val.isName = false;
          this.service2.name = value;
          this.service2.idtab = id;
          this.service2.seqid = val.sequence;
          this.newTask.push(val);
          console.log(this.newTask);
        }
      });
      this.activeaddbutton();
      this.dropdownsingle(id);
      this.applynclose();
      this.method.doropdownclick();
    }

  }

  @HostListener('window:click', ['$event.target'])
  onClick() {
    if(this.dropdownclose == true){
      this.dropdownclose = false;
      console.log('clicked');
      this.options.forEach((val:any) => {
        this.dropdownsingle(val.id);
        
      });
      this.addtabs.forEach((val1:any) => {
        this.dropdownsingles(val1.id);
      });
    }
 }
  // dropopen2() {
  //   document.getElementById('dropdownimg3')?.classList.add('hide');
  //   document.getElementById('dropdownimg4')?.classList.remove('hide');
  //   document.getElementById('dropdownul2')?.classList.remove('hide');
  //   document.getElementById('scroll')!.scrollTo({top:156});
  //   this.dropclose();
  //   this.dropclose3();
  //   this.dropclose4();
  //   this.dropclose5();
  //   this.dropclose6();
  // }

  // dropclose2() {
  //   document.getElementById('dropdownimg3')?.classList.remove('hide');
  //   document.getElementById('dropdownimg4')?.classList.add('hide');
  //   document.getElementById('dropdownul2')?.classList.add('hide');
  // }
  // dropopen3() {
  //   document.getElementById('dropdownimg5')?.classList.add('hide');
  //   document.getElementById('dropdownimg6')?.classList.remove('hide');
  //   document.getElementById('dropdownul3')?.classList.remove('hide');
  //   document.getElementById('scroll')!.scrollTo({top:156});
  //   this.dropclose();
  //   this.dropclose2();
  //   this.dropclose4();
  //   this.dropclose5();
  //   this.dropclose6();
  // }

  // dropclose3() {
  //   document.getElementById('dropdownimg5')?.classList.remove('hide');
  //   document.getElementById('dropdownimg6')?.classList.add('hide');
  //   document.getElementById('dropdownul3')?.classList.add('hide');
  // }
  // dropopen4() {
  //   document.getElementById('dropdownimg7')?.classList.add('hide');
  //   document.getElementById('dropdownimg8')?.classList.remove('hide');
  //   document.getElementById('dropdownul4')?.classList.remove('hide');
  //   document.getElementById('scroll')!.scrollTo({top:156});
  //   this.dropclose2();
  //   this.dropclose3();
  //   this.dropclose();
  //   this.dropclose5();
  //   this.dropclose6();
  // }

  // dropclose4() {
  //   document.getElementById('dropdownimg7')?.classList.remove('hide');
  //   document.getElementById('dropdownimg8')?.classList.add('hide');
  //   document.getElementById('dropdownul4')?.classList.add('hide');
  // }
  // dropopen5() {
  //   document.getElementById('dropdownimg9')?.classList.add('hide');
  //   document.getElementById('dropdownimg10')?.classList.remove('hide');
  //   document.getElementById('dropdownul5')?.classList.remove('hide');
  //   document.getElementById('scroll')!.scrollTo({top:156});
  //   this.dropclose2();
  //   this.dropclose3();
  //   this.dropclose4();
  //   this.dropclose();
  //   this.dropclose6();
  // }

  // dropclose5() {
  //   document.getElementById('dropdownimg9')?.classList.remove('hide');
  //   document.getElementById('dropdownimg10')?.classList.add('hide');
  //   document.getElementById('dropdownul5')?.classList.add('hide');
  // }
  // dropopen6() {
  //   document.getElementById('dropdownimg11')?.classList.add('hide');
  //   document.getElementById('dropdownimg12')?.classList.remove('hide');
  //   document.getElementById('dropdownul6')?.classList.remove('hide');
  //   document.getElementById('scroll')!.scrollTo({top:156});
  //   this.dropclose2();
  //   this.dropclose3();
  //   this.dropclose4();
  //   this.dropclose5();
  //   this.dropclose();
  // }

  // dropclose6() {
  //   document.getElementById('dropdownimg11')?.classList.remove('hide');
  //   document.getElementById('dropdownimg12')?.classList.add('hide');
  //   document.getElementById('dropdownul6')?.classList.add('hide');
  // }
  // dropopen7() {
  //   document.getElementById('dropdownimg13')?.classList.add('hide');
  //   document.getElementById('dropdownimg14')?.classList.remove('hide');
  //   document.getElementById('dropdownul7')?.classList.remove('hide');
  //   document.getElementById('scroll')!.scrollTo({top:156});
  //   this.dropclose2();
  //   this.dropclose3();
  //   this.dropclose4();
  //   this.dropclose5();
  //   this.dropclose();
  // }

  // dropclose7() {
  //   document.getElementById('dropdownimg13')?.classList.remove('hide');
  //   document.getElementById('dropdownimg14')?.classList.add('hide');
  //   document.getElementById('dropdownul7')?.classList.add('hide');
  // }


}
