
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { RightPanelService } from 'src/app/Services/right-panel.service';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';
import { CdkDragDrop, CdkDragEnd, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { AssignmnettabComponent } from './assignmnettab/assignmnettab.component';
import { AssignmenttabService } from 'src/app/Services/assignmenttab.service';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.scss']
})


export class RightpanelComponent implements OnInit {
  public items: any;
  public heighttab: Number = 16.667;
  public heighttab1: Number = 16.667;
  public itemtabs: any;
  public rightsidetabs: any;
  public newitems: any;
  public newitemss: any;
  public newseq: any;
  public optionss: any;
  public tabs: any;
  hoverboolean: boolean = false;
  public options: any;
  public optionsorts: any;
  positionOptions: TooltipPosition[] = ['left'];
  position = new FormControl(this.positionOptions[0]);
  showInput: boolean | undefined;
  status: boolean = false;
  status1: boolean = false;
  showText: boolean = false;
  showText1: boolean = false;
  showText2: boolean = false;
  wasclicked: boolean = false;
  public movies: any;
  singleclick: boolean = false;
  changesize: boolean = false;
  timer: any;
  delay: Number = 0;
  tabnumber: any;
  alltabs: any;
  colour: any;
  isDragging: boolean = false;
  constructor(private todoService: AssignmenttabService, private service: RightPanelService, private service2: HolidayLibraryService, private router: Router) {
  }
  @ViewChild(AssignmnettabComponent) myChild!: AssignmnettabComponent;
  ngOnInit(): void {

    // // var mainscroll = document.getElementById('scrollbar');
    // // console.log('scroll', mainscroll.addEventListener("scroll", function () { console.log(this.scrollY) }));
    // console.log('scroll', window.addEventListener("scroll", function () { console.log(this.scrollX) }));
    this.itemtabs = [];
    this.rightsidetabs = [];

    this.options = [];

    this.service.gettaboptions().subscribe((val2) => {
      val2.forEach((itemworkk: any) => {
        itemworkk['name'] = "";
        itemworkk['setname'] = "";
        itemworkk['fakename'] = "";
        itemworkk['disabled'] = true;
        itemworkk.sequencetab = itemworkk.sequence;
        if (itemworkk.selectedValue == 'Task List') {
          itemworkk.name = 'Task List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == 'Project List') {
          itemworkk.name = 'Project List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == 'User List') {
          itemworkk.name = 'User List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == 'Customer List') {
          itemworkk.name = 'Customer List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == 'Internal Resource List') {
          itemworkk.name = 'Internal Resource List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == 'External Resource List') {
          itemworkk.name = 'External Resource List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == 'Superintendent List') {
          itemworkk.name = 'Superintendent List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == 'Subcontractor List') {
          itemworkk.name = 'Subcontractor List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == 'Supplier List') {
          itemworkk.name = 'Supplier List';
          itemworkk.disabled = false;
        } else if (itemworkk.selectedValue == '') {
          itemworkk.name = 'Assign';
          itemworkk.disabled = true;
        } else {
          itemworkk.name = 'Assign';
          itemworkk.disabled = true;
        }

      });
      this.options = val2;
      console.log('val', this.options);
      this.alltabs = val2.length;
      this.service.tablength = this.alltabs;
      this.options = this.options.sort((a: { sequence: number; }, b: { sequence: number; }) => a.sequence - b.sequence);
      this.options.forEach((element: any) => {
        if (element.id == this.service.idtab) {
          element.name = this.service.name;
        }
      });



      this.optionss = []
      this.options.forEach((itemworkk: any) => {
        if (itemworkk.disabled == false) {
          this.optionss.push(itemworkk);
        }

      });
      this.tabnumber = this.optionss.length;
      this.service.length = this.tabnumber;
    });

    var timesRun1 = 0;
    var interval1 = setInterval(() => {
      timesRun1 += 1;
      if (timesRun1 === 4) {
        clearInterval(interval1);
      }

      console.log(document.getElementById('scrollbar')!.clientHeight)
      this.loadsize();
      this.sizetab();
    }, 200);




    this.singleclick = false;
    this.changesize = false;
    if (this.changesize == false) {
      this.router.navigate(['/home']);
      this.service.gettaboptions().subscribe((val2) => {
        val2.forEach((itemworkk: any) => {
          document.getElementById('buttontabtext' + itemworkk.id)?.classList.remove('active');
          document.getElementById('buttontab' + itemworkk.id)?.classList.remove('active1');
        });
      });
    }
    this.routingtigger();
    this.loadsize();
    setInterval(() => {
      this.routingtigger();
    }, 400);

    const interval = setInterval(() => {
      if (this.router.url == '/company') {
        clearInterval(interval);
        this.loadsize();

      } else {
        this.loadsize();
      }
    }, 200);

  }
  boundaryheight() {
    //   const test = Array.from(document.getElementsByClassName('example-boundary'));
    // test.forEach((element) => {
    //     element.style.padding = '10px';
    //     element.style.borderTop = '0';
    // });

  }
  createnewtab() {
    this.f1().then(() => this.f2());
    // this.newitems = [];
    // console.log(this.service.righttab);
    // this.service.righttab.forEach((val:any) => {
    //   this.newitems.push(val);
    // });
    this.endscroll();
  }
  f1() {
    return new Promise((resolve, reject) => {
      this.options = [];

      this.service.gettaboptions().subscribe((val2) => {
        val2.forEach((itemworkk: any) => {
          itemworkk['name'] = "";
          itemworkk['setname'] = "";
          itemworkk['fakename'] = "";
          itemworkk['disabled'] = true;
          itemworkk.sequencetab = itemworkk.sequence;
          if (itemworkk.selectedValue == 'Task List') {
            itemworkk.name = 'Task List';
            itemworkk.disabled = false;
          } else if (itemworkk.selectedValue == 'Project List') {
            itemworkk.name = 'Project List';
            itemworkk.disabled = false;
          } else if (itemworkk.selectedValue == 'User List') {
            itemworkk.name = 'User List';
            itemworkk.disabled = false;
          } else if (itemworkk.selectedValue == 'Customer List') {
            itemworkk.name = 'Customer List';
            itemworkk.disabled = false;
          } else if (itemworkk.selectedValue == 'Internal Resource List') {
            itemworkk.name = 'Internal Resource List';
            itemworkk.disabled = false;
          } else if (itemworkk.selectedValue == 'External Resource List') {
            itemworkk.name = 'External Resource List';
            itemworkk.disabled = false;
          } else if (itemworkk.selectedValue == 'Superintendent List') {
            itemworkk.name = 'Superintendent List';
            itemworkk.disabled = false;
          } else if (itemworkk.selectedValue == 'Subcontractor List') {
            itemworkk.name = 'Subcontractor List';
            itemworkk.disabled = false;
          } else if (itemworkk.selectedValue == 'Supplier List') {
            itemworkk.name = 'Supplier List';
            itemworkk.disabled = false;
          } else {
            itemworkk.name = 'Assign';
            itemworkk.disabled = true;
          }

        });
        this.options = val2;
        console.log('val', this.options);
        this.alltabs = val2.length;
        this.service.tablength = this.alltabs;

        this.options = this.options.sort((a: { sequence: number; }, b: { sequence: number; }) => a.sequence - b.sequence);
      });
      resolve(console.log('Ready', document.getElementById('scrollbar')!.clientHeight));
    });
  }

  f2() {
    this.endscroll();
    document.getElementById('scrollbar')!.scrollTop = document.getElementById('scrollbar')!.clientHeight;
  }
  endscroll() {
    var a = 1;
    document.getElementById('scrollbar')!.scrollTop = document.getElementById('scrollbar')!.clientHeight;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 2) {
        clearInterval(interval);
        document.getElementById('scrollbar')!.scrollTop = document.getElementById('scrollbar')!.clientHeight;
      }
    }, 1000);

  }
  routingtigger() {
    if (this.router.url == '/home') {
      this.changesize = false;
      this.options.forEach((itemworkk: any) => {
        document.getElementById('buttontabtext' + itemworkk.id)?.classList.remove('active');
        document.getElementById('buttontab' + itemworkk.id)?.classList.remove('active1');
      });
    } else if (this.router.url == '/home/task') {
      this.changesize = true;
      this.options.forEach((itemworkk: any) => {
        if (itemworkk.selectedValue == 'Task List') {
          document.getElementById('buttontabtext' + itemworkk.id)?.classList.add('active');
          document.getElementById('buttontab' + itemworkk.id)?.classList.add('active1');
        }
      });
    } else if (this.router.url == '/home/project') {
      this.changesize = true;
      this.options.forEach((itemworkk: any) => {
        if (itemworkk.selectedValue == 'Project List') {
          document.getElementById('buttontabtext' + itemworkk.id)?.classList.add('active');
          document.getElementById('buttontab' + itemworkk.id)?.classList.add('active1');
        }
      });
    } else if (this.router.url == '/home/user') {
      this.changesize = true;
      this.options.forEach((itemworkk: any) => {
        if (itemworkk.selectedValue == 'User List') {
          document.getElementById('buttontabtext' + itemworkk.id)?.classList.add('active');
          document.getElementById('buttontab' + itemworkk.id)?.classList.add('active1');
        }
      });
    } else if (this.router.url == '/home/customer') {
      this.changesize = true;
      this.options.forEach((itemworkk: any) => {
        if (itemworkk.selectedValue == 'Customer List') {
          document.getElementById('buttontabtext' + itemworkk.id)?.classList.add('active');
          document.getElementById('buttontab' + itemworkk.id)?.classList.add('active1');
        }
      });
    }
  }
  sorting() {
    this.items = [];
    let k = 1;
    let e = this.service.length + 1;
    this.options.forEach((item: any) => {
      if (item.selectedValue == 'Unassigned' || item.selectedValue == '' || item.selectedValue == 'Assign') {

        let tabopions = {
          'id': item.id,
          'sequence': e++,
        };
        this.service.update(tabopions).subscribe((val) => {
        });

      }

      else {
        let tabopions1 = {
          'id': item.id,
          'sequence': k++,
        };
        this.service.update(tabopions1).subscribe((val1) => {
        });

      }
    });

  }

  sorttabs() {
    console.log('sorting');
    let e = this.options.length;
    let k = 1;
    this.options.forEach((item: any) => {
      if (item.selectedValue == 'Unassigned' || item.selectedValue == '' || item.selectedValue == 'Assign') {
        item.sequencetab = e--;
        item.sequence = item.sequencetab;
        let tabs = {
          'id': item.id,
          'sequence': item.sequence,
          'selectedValue': item.selectedValue,
        }
        this.service.update(tabs).subscribe((val) => {
        });
      } else {
        item.sequencetab = k++;
        item.sequence = item.sequencetab;
        let tab1s = {
          'id': item.id,
          'sequence': item.sequence,
          'selectedValue': item.selectedValue,
        }
        this.service.update(tab1s).subscribe((val1) => {
        });
      }
    });



    this.options = this.options.sort((a: { sequencetab: number; }, b: { sequencetab: number; }) => a.sequencetab - b.sequencetab);
  }
  addnewtab() {
    console.log(this.newitems);
    this.newitems.forEach((itemworkk: any) => {
      if (itemworkk.sequencetab == 1) {
        document.getElementById('scrollbar')!.scrollTo({ top: 0 });
      } else if (itemworkk.sequencetab == 2) {
        document.getElementById('scrollbar')!.scrollTo({ top: (1 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 3) {
        document.getElementById('scrollbar')!.scrollTo({ top: (2 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 4) {
        document.getElementById('scrollbar')!.scrollTo({ top: (3 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 5) {
        document.getElementById('scrollbar')!.scrollTo({ top: (4 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 6) {
        document.getElementById('scrollbar')!.scrollTo({ top: (5 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 7) {
        document.getElementById('scrollbar')!.scrollTo({ top: (6 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 8) {
        document.getElementById('scrollbar')!.scrollTo({ top: (7 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 9) {
        document.getElementById('scrollbar')!.scrollTo({ top: (8 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 10) {
        document.getElementById('scrollbar')!.scrollTo({ top: (9 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 11) {
        document.getElementById('scrollbar')!.scrollTo({ top: (10 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 12) {
        document.getElementById('scrollbar')!.scrollTo({ top: (11 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 13) {
        document.getElementById('scrollbar')!.scrollTo({ top: (12 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 14) {
        document.getElementById('scrollbar')!.scrollTo({ top: (13 * document.getElementById('addbutton')!.clientHeight) });
      } else {
        document.getElementById('scroll')!.scrollTo({ top: (14 * document.getElementById('addbutton')!.clientHeight) });
      }
    });
  }
  clearaddnewtab() {
    this.newitems = [];
    this.service.righttab = [];
  }
  scroll() {
    document.getElementById('scrollbar')!.scrollTop += document.getElementById('scrollbar')!.scrollHeight;
  }

  doropdownclick() {
    this.options.forEach((itemworkk: any) => {
      if (itemworkk.id == this.service.idtab) {
        itemworkk.selectedValue = this.service.name;
        this.itemtabs.push(itemworkk);
      }
    });
    console.log('triggers value stre', this.itemtabs);


  }
  dropdwonroute() {
    console.log('triggers value stre2', this.itemtabs);
    this.itemtabs.forEach((itemworkk: any) => {
      if (itemworkk.sequencetab == 1) {
        document.getElementById('scrollbar')!.scrollTo({ top: 0 });
      } else if (itemworkk.sequencetab == 2) {
        document.getElementById('scrollbar')!.scrollTo({ top: (1 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 3) {
        document.getElementById('scrollbar')!.scrollTo({ top: (2 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 4) {
        document.getElementById('scrollbar')!.scrollTo({ top: (3 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 5) {
        document.getElementById('scrollbar')!.scrollTo({ top: (4 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 6) {
        document.getElementById('scrollbar')!.scrollTo({ top: (5 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 7) {
        document.getElementById('scrollbar')!.scrollTo({ top: (6 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 8) {
        document.getElementById('scrollbar')!.scrollTo({ top: (7 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 9) {
        document.getElementById('scrollbar')!.scrollTo({ top: (8 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 10) {
        document.getElementById('scrollbar')!.scrollTo({ top: (9 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 11) {
        document.getElementById('scrollbar')!.scrollTo({ top: (10 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 12) {
        document.getElementById('scrollbar')!.scrollTo({ top: (11 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 13) {
        document.getElementById('scrollbar')!.scrollTo({ top: (12 * document.getElementById('addbutton')!.clientHeight) });
      } else if (itemworkk.sequencetab == 14) {
        document.getElementById('scrollbar')!.scrollTo({ top: (13 * document.getElementById('addbutton')!.clientHeight) });
      } else {
        document.getElementById('scroll')!.scrollTo({ top: (14 * document.getElementById('addbutton')!.clientHeight) });
      }
    });
  }


  dropdownfinalclick() {
    this.itemtabs.forEach((itemworkk: any) => {
      this.options.forEach((item: any) => {
        if (item.id == itemworkk.id) {
          item.name = itemworkk.selectedValue;
          if (item.selectedValue == '') {
            item.name = "Assign";
          }
        }
      });
    });

  }
  doropdownclickcancel() {
    this.options.forEach((itemworkk: any) => {
      itemworkk.setname = itemworkk.name;
      itemworkk.selectedValue = itemworkk.setname;
    });

  }

  sizetab() {
    document.documentElement.style.setProperty('--x', 'RED');
    document.documentElement.style.setProperty('--y', 'BLUE');
  }


  drop(event: CdkDragDrop<string[]>) {
    // console.log('options',this.options);
    // this.options.forEach((tab1: any) => {
    //     if (tab1.disabled == false) {
    //       console.log('options2',tab1);
    //       moveItemInArray(this.options, event.previousIndex, event.currentIndex);
    //       console.log(this.options)
    //     }
    //   });
    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
    this.options = [...this.options]
    let i = 1;
    this.options.forEach((tab: any) => {
      let tabopions = {
        'id': tab.id,
        'sequence': i++,
      };
      // console.log('work', tabopions);
      this.service.update(tabopions).subscribe((val) => {
        // console.log("updated", val);
      });
    });

  }
  opentab(id: any) {
    document.getElementById('buttontabtext' + id)?.classList.add('active');
    document.getElementById('buttontab' + id)?.classList.add('active1');

  }
  closetab(id: any) {
    this.options.forEach((itemworkk: any) => {
      if (itemworkk.id != id) {
        document.getElementById('buttontabtext' + itemworkk.id)?.classList.remove('active');
        document.getElementById('buttontab' + itemworkk.id)?.classList.remove('active1');
      }
    });
  }

  closebutton() {
    this.options.forEach((itemworkk: any) => {
      document.getElementById('buttontabs' + itemworkk.id)?.classList.add('hide');
      document.getElementById('buttontabtexts' + itemworkk.id)?.classList.add('hide');
      document.getElementById('buttontab' + itemworkk.id)?.classList.remove('hide');
      document.getElementById('buttontabtext' + itemworkk.id)?.classList.remove('hide');
      document.getElementById('buttontab' + itemworkk.id)?.classList.add('buttonnew');
      document.getElementById('buttontabtext' + itemworkk.id)?.classList.add('buttontext');
      document.getElementById('buttontab' + itemworkk.id)?.classList.remove('expand');
      document.getElementById('buttontabtext' + itemworkk.id)?.classList.remove('buttontext1');
    });
  }

  opendropdown(id: any) {
    document.getElementById('buttontab' + id)?.classList.remove('active');
    document.getElementById('buttontab' + id)?.classList.remove('buttonnew');
    document.getElementById('buttontabtext' + id)?.classList.remove('buttontext');
    document.getElementById('buttontab' + id)?.classList.add('expand');
    document.getElementById('buttontabtext' + id)?.classList.add('buttontext1');
  }
  closedropdown(id: any) {
    this.options.forEach((itemworkk: any) => {
      if (itemworkk.id != id) {
        document.getElementById('buttontab' + itemworkk.id)?.classList.add('buttonnew');
        document.getElementById('buttontabtext' + itemworkk.id)?.classList.add('buttontext');
        document.getElementById('buttontab' + itemworkk.id)?.classList.remove('expand');
        document.getElementById('buttontabtext' + itemworkk.id)?.classList.remove('buttontext1');
      }
    });
  }
  // let a = id
  // this.optionsorts = []
  // this.service.gettaboptions().subscribe((val3) => {
  //   val3.forEach((itemworkk: any) => {
  //     if (itemworkk.isSelected == false) {
  //       document.getElementById('buttontab' + itemworkk.id)?.classList.remove('expand');
  //       document.getElementById('buttontabtext' + itemworkk.id)?.classList.remove('buttontext1');
  //       console.log('cancel', itemworkk);
  //     }

  //   });

  // });
  // routeing(id: any, option: any) {
  //   console.log(option.selectedValue);
  //   if (option.selectedValue == 'Task List') {
  //     this.router.navigate(['/home/task']);
  //   }
  //   else if (option.selectedValue == 'Project List') {
  //     this.router.navigate(['/home/project']);
  //   }
  // }

  // tabRoute(id: any, option: any) {
  //   this.options = []
  //   this.options = option;
  //   if (this.options.selectedValue == 'Task List') {
  //     this.router.navigate(['/home/tab']);
  //   } else if (this.options.selectedValue == 'Project List') {
  //     this.router.navigate(['/home/tab']);
  //   }
  // }
  routeing(event: MouseEvent, id: any, option: any) {
    this.singleclick = false;
    const delay = 400;
    this.timer = setTimeout(() => {
      if (event.type === 'click' && this.singleclick == false) {
        if (option.selectedValue == 'Task List') {
          this.router.navigate(['/home/task']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == 'Project List') {
          this.router.navigate(['/home/project']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == 'User List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == 'Customer List') {
          this.router.navigate(['/home/customer']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == 'Internal Resource List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == 'External Resource List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == 'Superintendent List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == 'Subcontractor List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == 'Supplier List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.selectedValue == '' || option.selectedValue == 'Unassigned' || option.selectedValue == 'Assign') {
          this.router.navigate(['/home/tab']);
          this.changesize = true;
          this.isclick();
          this.opendropdown(id);
          this.closedropdown(id);
          this.openonclick(id);
        }
      }
    }, delay);
  }

  tabRoute(event: MouseEvent, id: any, option: any) {
    this.singleclick = true;
    if (event.type === 'dblclick' && this.singleclick == true) {
      if (option.selectedValue == 'Task List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.selectedValue == 'Project List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.selectedValue == 'Internal Resource List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.selectedValue == 'User List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.selectedValue == 'Customer List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.selectedValue == 'External Resource List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.selectedValue == 'Superintendent List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.selectedValue == 'Subcontractor List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.selectedValue == 'Supplier List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      }
    }
  }
  deletetab() {
    let a = this.service.deletetab;
    let item = this.options.filter(function (item: any) {
      return item.id === a;
    })[0];
    let index = this.options.indexOf(item);
    this.options.splice(index, 1);
  }
  loadsize() {
    if (document.getElementById('scrollbar')!.scrollHeight == document.getElementById('col1')!.scrollHeight) {
      document.getElementById('containerup')?.classList.add('hide');
      document.getElementById('containerdown')?.classList.add('hide');
      document.getElementById('scrollbar')?.classList.add('leftsidebar');
      if (this.alltabs == 6) {
        this.options.forEach((val: any) => {

          if (val.sequence == 6) {
            document.getElementById('fullresizebtn' + val.id)?.classList.add('resizefull');
            document.getElementById('fullresize1btn' + val.id)?.classList.add('auto1space')
          }

        });
      } else if (this.alltabs == 7) {
        this.options.forEach((val: any) => {

          if (val.sequence == 7) {
            document.getElementById('fullresizebtn' + val.id)?.classList.add('resizefull');
            document.getElementById('fullresize1btn' + val.id)?.classList.add('auto1space')
          }

        });
      } else if (this.alltabs == 8) {
        this.options.forEach((val: any) => {

          if (val.sequence == 8) {
            document.getElementById('fullresizebtn' + val.id)?.classList.add('resizefull');
            document.getElementById('fullresize1btn' + val.id)?.classList.add('auto1space')
          }

        });
      } else if (this.alltabs == 9) {
        this.options.forEach((val: any) => {

          if (val.sequence == 9) {
            document.getElementById('fullresizebtn' + val.id)?.classList.add('resizefull');
            document.getElementById('fullresize1btn' + val.id)?.classList.add('auto1space')
          }

        });
      } else {
        this.options.forEach((val: any) => {


          document.getElementById('fullresizebtn' + val.id)?.classList.remove('resizefull');
          document.getElementById('fullresize1btn' + val.id)?.classList.remove('auto1space')


        });
      }
    } else if (document.getElementById('scrollbar')!.scrollHeight < document.getElementById('col1')!.scrollHeight) {
      document.getElementById('containerup')?.classList.add('hide');
      document.getElementById('containerdown')?.classList.add('hide');
      document.getElementById('scrollbar')?.classList.add('leftsidebar');
      if (this.alltabs == 6) {
        this.options.forEach((val: any) => {

          if (val.sequence == 6) {
            document.getElementById('fullresizebtn' + val.id)?.classList.add('resizefull');
            document.getElementById('fullresize1btn' + val.id)?.classList.add('auto1space')
          }

        });
      } else if (this.alltabs == 7) {
        this.options.forEach((val: any) => {

          if (val.sequence == 7) {
            document.getElementById('fullresizebtn' + val.id)?.classList.add('resizefull');
            document.getElementById('fullresize1btn' + val.id)?.classList.add('auto1space')
          }

        });
      } else if (this.alltabs == 8) {
        this.options.forEach((val: any) => {

          if (val.sequence == 8) {
            document.getElementById('fullresizebtn' + val.id)?.classList.add('resizefull');
            document.getElementById('fullresize1btn' + val.id)?.classList.add('auto1space')
          }

        });
      } else if (this.alltabs == 9) {
        this.options.forEach((val: any) => {

          if (val.sequence == 9) {
            document.getElementById('fullresizebtn' + val.id)?.classList.add('resizefull');
            document.getElementById('fullresize1btn' + val.id)?.classList.add('auto1space')
          }

        });
      } else {
        this.options.forEach((val: any) => {


          document.getElementById('fullresizebtn' + val.id)?.classList.remove('resizefull');
          document.getElementById('fullresize1btn' + val.id)?.classList.remove('auto1space')


        });
      }
    } else if (document.getElementById('scrollbar')!.scrollHeight > document.getElementById('col1')!.scrollHeight) {
      document.getElementById('containerup')?.classList.remove('hide');
      document.getElementById('containerdown')?.classList.remove('hide');
      document.getElementById('scrollbar')?.classList.remove('leftsidebar');

    }
    if (this.alltabs == 7 && document.getElementById('scrollbar')!.clientHeight > 701) {
      this.heighttab = 14.2857;
    } else if (this.alltabs == 8 && document.getElementById('scrollbar')!.clientHeight > 801) {
      this.heighttab = 12.5;
    } else if (this.alltabs == 9 && document.getElementById('scrollbar')!.clientHeight > 901) {
      this.heighttab = 11.111;
    } else if (this.alltabs == 10 && document.getElementById('scrollbar')!.clientHeight > 1001) {
      this.heighttab = 10;
    } else {
      this.heighttab = 16.667;
    }
  }
  onclick(event: any) {
    event.srcElement.classList.add("expand");
  }
  isclick() {
    this.status = false;
  }
  click() {
    this.status = !this.status;
  }
  toggleText() {
    this.showText = !this.showText;
    this.service.toggle.next(this.showText)
  }

  toggleOpen() {
    this.showText1 = !this.showText1;
    this.service2.toggle.next(this.showText1)
  }

  toggleText1() {
    this.showText2 = !this.showText2;
    this.service.toggle1.next(this.showText2)
  }

  subclick() {
    document.getElementById('col1')?.classList.remove('col1');
    document.getElementById('col1')?.classList.add('mincol1');
    document.getElementById('col3')?.classList.remove('maxcol3');
    document.getElementById('col3')?.classList.add('mincol3');
    document.getElementById('expandbutton')?.classList.remove('buttoncollapse');
    document.getElementById('expandbutton')?.classList.add('hidebuttoncollapse');
    document.getElementById('hidebtn')?.classList.remove('hidehidebtn');
    document.getElementById('hidebtn')?.classList.add('hide');
    document.getElementById('hidebtn1')?.classList.remove('hide');
  }
  subclickhover() {
    document.getElementById('hidebtn')?.classList.remove('hide');
    document.getElementById('hidebtn')?.classList.add('hidebtn');
    document.getElementById('hidebtn1')?.classList.add('hide');
  }



  normal() {
    document.getElementById('col1')?.classList.add('col1');
    document.getElementById('col1')?.classList.remove('mincol1');
    document.getElementById('col3')?.classList.add('maxcol3');
    document.getElementById('col3')?.classList.remove('mincol3');
    document.getElementById('expandbutton')?.classList.add('buttoncollapse');
    document.getElementById('expandbutton')?.classList.remove('hidebuttoncollapse');
    document.getElementById('hidebtn')?.classList.add('hidehidebtn');
    document.getElementById('hidebtn')?.classList.remove('hidebtn');
    document.getElementById('showidbtn')?.classList.remove('showbtn');
    document.getElementById('showidbtn')?.classList.add('hide');
    document.getElementById('showidbtn1')?.classList.remove('hide');
  }
  normalhover() {
    document.getElementById('showidbtn')?.classList.remove('hide');
    document.getElementById('showidbtn1')?.classList.add('hide');
    document.getElementById('showidbtn')?.classList.add('showbtn');
  }

  up() {
    document.getElementById('scrollbar')!.scrollTop -= document.getElementById('addbutton')!.clientHeight;
  }
  down() {
    document.getElementById('scrollbar')!.scrollTop += document.getElementById('addbutton')!.clientHeight;


  }
  myScroll() {
    const elmnt: any = document.getElementById("scrollbar");
    let y = elmnt.scrollTop;
    let z = elmnt.scrollHeight;
    let x = document.getElementById('col1')!.scrollHeight;
    let w = z - y
    if (y == 0) {
      document.getElementById('toparrow')?.classList.remove('toparrowchange');
      document.getElementById('bottomarrow')?.classList.remove('bottomarrowchange');
      document.getElementById('bottomarrow')?.classList.add('bottomarrow');
    } else if (w <= x) {
      document.getElementById('toparrow')?.classList.add('toparrowchange');
      document.getElementById('bottomarrow')?.classList.add('bottomarrowchange');
      document.getElementById('bottomarrow')?.classList.remove('bottomarrow');
      document.getElementById('bottomarrow')?.classList.remove('minbottomarrow');
    } else {
      document.getElementById('toparrow')?.classList.add('toparrowchange');
      document.getElementById('bottomarrow')?.classList.remove('bottomarrowchange');
      document.getElementById('bottomarrow')?.classList.add('bottomarrow');
      document.getElementById('bottomarrow')?.classList.remove('minbottomarrow');
    }
  }

  // createtab() {
  //   let tab = {
  //     "id": Number('1'),
  //     settingId: Number('8'),
  //     userId: Number('1'),
  //     SettingType: "RightPanelTabs",
  //     sequence: this.options.length + 1,
  //     selectedValue: "Task List"
  //   };
  //   console.log('ready', tab);
  //   this.service.create(tab).subscribe((val4) => {
  //     console.log('created', val4);
  //   });
  // }


  //New code

  openexpand(id: any) {
    document.getElementById('buttontab' + id)?.classList.add('hide');
    document.getElementById('buttontabs' + id)?.classList.remove('hide');
    document.getElementById('buttontabtext' + id)?.classList.add('hide');
    document.getElementById('buttontabtexts' + id)?.classList.remove('hide');
  }

  openonclick(id: any) {
    this.service.iddrop = id;
    this.showText2 = true;
    this.service.toggle1.next(this.showText2)
  }


  routeings(event: MouseEvent, id: any, option: any) {
    this.singleclick = false;
    const delay = 400;
    this.timer = setTimeout(() => {
      if (event.type === 'click' && this.singleclick == false) {
        if (option.tab == 'Task List') {
          this.router.navigate(['/home/task']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == 'Project List') {
          this.router.navigate(['/home/project']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == 'User List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == 'Customer List') {
          this.router.navigate(['/home/customer']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == 'Internal Resource List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == 'External Resource List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == 'Superintendent List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == 'Subcontractor List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == 'Supplier List') {
          this.router.navigate(['/home/user']);
          this.changesize = true;
          this.isclick();
          document.getElementById('buttontab' + id)?.classList.add('buttonnew');
          document.getElementById('buttontabtext' + id)?.classList.add('buttontext');
          document.getElementById('buttontab' + id)?.classList.remove('expand');
          document.getElementById('buttontabtext' + id)?.classList.remove('buttontext1');
          this.opentab(id);
          this.closetab(id);
          this.closedropdown(id);
        } else if (option.tab == '' || option.selectedValue == 'Unassigned' || option.selectedValue == 'Assign') {
          this.router.navigate(['/home/tab']);
          this.changesize = true;
          this.isclick();
          this.opendropdown(id);
          this.closedropdown(id);
          this.openonclick(id);
        }
      }
    }, delay);
  }

  tabRoutes(event: MouseEvent, id: any, option: any) {
    this.singleclick = true;
    if (event.type === 'dblclick' && this.singleclick == true) {
      if (option.tab == 'Task List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.tab == 'Project List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.tab == 'Internal Resource List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.tab == 'User List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.tab == 'Customer List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.tab == 'External Resource List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.tab == 'Superintendent List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.tab == 'Subcontractor List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      } else if (option.tab == 'Supplier List') {
        this.router.navigate(['/home/tab']);
        this.changesize = true;
        this.isclick();
        this.openexpand(id);
        this.closedropdown(id);
        this.openonclick(id);
      }
    }
  }

}
