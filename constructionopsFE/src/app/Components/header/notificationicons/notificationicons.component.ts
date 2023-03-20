import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/Services/header.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-notificationicons',
  templateUrl: './notificationicons.component.html',
  styleUrls: ['./notificationicons.component.scss']
})
export class NotificationiconsComponent implements OnInit {
  public frequents: any;
  public favs: any;
  showdrop: boolean = false;
  data: number = 0;
  showlistinterval: any;
  changeText: boolean = false;
  dropdownclickclose: boolean = false;
  showInput = false;
  showText = false;
  searchitem: any;
  onclickmouse: boolean = false;
  closewithtext: boolean = false;
  closewithouttext: boolean = false;
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private service: HeaderService) { }

  ngOnInit(): void {
    this.service.toggle$.subscribe(
      toggle => this.showInput = toggle
    )
    this.frequents = [];
    this.service.getfrequent().subscribe((val2) => {
      val2.forEach((itemworkk: any) => {
        itemworkk['name'] = "";
        itemworkk.name = itemworkk.frequentName;

      });
      this.frequents = val2;
      console.log(val2);
    });
    this.searchitem = '';
    this.favs = [];
    this.service.getfav().subscribe((val2) => {
      val2.forEach((itemworkk: any) => {
        itemworkk['name'] = "";
        itemworkk['routing'] = "";
        itemworkk.name = itemworkk.selectedValue;
        if (itemworkk.selectedValue == "  Database-Work Schedules") {
          itemworkk.routing = "/company/workschedule";
        }

        if (itemworkk.selectedValue == "  Database-Holidays") {
          itemworkk.routing = "/company/holiday";
        }
      }); 
      
      this.favs = val2;
      if (this.favs.length == 0) {
        document.getElementById('ullifre2')?.classList.add('li1padding');
      } else {
        document.getElementById('ullifre2')?.classList.remove('li1padding');
      }

    });

    setInterval(() => {
      this.removefav2();
      this.sizetab();
    }, 400);

  }
  toggle() {
    this.showInput = !this.showInput;
  }
  sizetab() {
    document.documentElement.style.setProperty('--z', this.favs.length);
  }
  setout() {
    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 5) {
        clearInterval(interval);

        document.getElementById('dropdownopenitems')?.classList.add('hide');
        document.getElementById('openitemsremove')?.classList.remove('removehover');
      }
    }, 1000);
  }
  setout1() {
    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 5) {
        clearInterval(interval);
        document.getElementById('dropdownnotifications')?.classList.add('hide');
        document.getElementById('notificationsremove')?.classList.remove('removehover');

      }
    }, 1000);
  }
  setout2() {
    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 5) {
        clearInterval(interval);

        document.getElementById('dropdownwarnings')?.classList.add('hide');
        document.getElementById('warningsremove')?.classList.remove('removehover');


      }
    }, 1000);
  }
  setout3() {
    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 5) {
        clearInterval(interval);

        document.getElementById('dropdownmessages')?.classList.add('hide');
        document.getElementById('messagesremove')?.classList.remove('removehover');

      }
    }, 1000);
  }

  setoutnew() {
    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 5) {
        clearInterval(interval);

        document.getElementById('languages')?.classList.add('hide');
        document.getElementById('languagediv')?.classList.remove('hide');
        document.getElementById('languagearrowup')?.classList.add('hide');

      }
    }, 1000);
  }
  /*setout4() {
     var a = 1;
     const interval = setInterval(() => {
       console.log(a++)
       if (a == 5) {
         clearInterval(interval);
 
         document.getElementById('dropdownsearch')?.classList.add('hide');
         document.getElementById('searchremove')?.classList.remove('removehover');
 
       }
     }, 1000);
   }*/
  moveout() {
    var a = 1;
    this.showlistinterval = setInterval(() => {
      console.log(a++)
      if (a == 5) {
        clearInterval(this.showlistinterval);
        document.getElementById('dropdownMenuLink')?.classList.remove('hide');
        document.getElementById('dropdownMenuLink2')?.classList.add('hide');
        document.getElementById('dropdownMenuLink3')?.classList.add('hide');
        document.getElementById('adddropdown')?.classList.remove('radiusbottom');
        document.getElementById('languages')?.classList.add('hide');
        document.getElementById('languagediv')?.classList.remove('hide');
        document.getElementById('languagearrowup')?.classList.add('hide');
      }
    }, 1000);

  }
  readytosearch() {
    this.searchitem = '';
  }

  searchadvanced() {

    this.dropdownclickclose = false;
    document.getElementById('searchremove')?.classList.remove('hide');
    document.getElementById('dropdownsearch')?.classList.add('hide');
    document.getElementById('dropdownsearch')?.classList.remove('hide');
    document.getElementById('dropdownnotifications')?.classList.add('hide');
    document.getElementById('dropdownopenitems')?.classList.add('hide');
    document.getElementById('dropdownmessages')?.classList.add('hide');
    document.getElementById('dropdownwarnings')?.classList.add('hide');
    document.getElementById('dropdownMenuLink3')?.classList.add('hide');
    document.getElementById('dropdownMenuLink2')?.classList.add('hide');
    document.getElementById('dropdownMenuLink')?.classList.remove('hide');
    document.getElementById('searchinputtext')?.focus();
  }

  arrowup() {
    document.getElementById('languagediv')?.classList.add('hide');
    document.getElementById('languagearrowup')?.classList.remove('hide');
    document.getElementById('languages')?.classList.remove('hide');
  }

  arrowdown() {
    document.getElementById('languagediv')?.classList.remove('hide');
    document.getElementById('languagearrowup')?.classList.add('hide');
    document.getElementById('languages')?.classList.add('hide');
  }

  searchadvancedclose() {
    document.getElementById('dropdownsearch')?.classList.add('hide');
  }
  searchclickclose() {
    if (this.onclickmouse == true) {
      console.log('clickedout')
      document.getElementById('dropdownsearch')?.classList.add('hide');
    } else {
      console.log('clickedin')
    }
  }
  searchadvmousein() {
    this.onclickmouse = false;
    this.dropdownclickclose = false;
  }
  searchadvmousout() {
    this.onclickmouse = true;
    this.dropdownclickclose = true;
  }
  addclass() {
    this.dropdownclickclose = false;
    document.getElementById('buttonsearch')?.classList.add('selectedbutton');
  }

  warninglist() {
    this.dropdownclickclose = false;
    document.getElementById('warningsremove')?.classList.remove('hide');
    document.getElementById('warningsremove')?.classList.add('removehover');
    document.getElementById('dropdownwarnings')?.classList.add('hide');
    document.getElementById('dropdownwarnings')?.classList.remove('hide');
    document.getElementById('dropdownnotifications')?.classList.add('hide');
    document.getElementById('dropdownopenitems')?.classList.add('hide');
    document.getElementById('dropdownmessages')?.classList.add('hide');
    document.getElementById('dropdownsearch')?.classList.add('hide');
    document.getElementById('dropdownMenuLink3')?.classList.add('hide');
    document.getElementById('dropdownMenuLink2')?.classList.add('hide');
    document.getElementById('dropdownMenuLink')?.classList.remove('hide');

    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 3) {
        clearInterval(interval);
        this.dropdownclickclose = true;
      }
    }, 300);

  }

  warninglistclose() {
    document.getElementById('dropdownwarnings')?.classList.add('hide');
    document.getElementById('warningsremove')?.classList.remove('removehover');

  }

  notificationlist() {
    this.dropdownclickclose = false;
    document.getElementById('notificationsremove')?.classList.remove('hide');
    document.getElementById('notificationsremove')?.classList.add('removehover');
    document.getElementById('dropdownnotifications')?.classList.remove('hide');
    document.getElementById('dropdownwarnings')?.classList.add('hide');
    document.getElementById('dropdownopenitems')?.classList.add('hide');
    document.getElementById('dropdownmessages')?.classList.add('hide');
    document.getElementById('dropdownsearch')?.classList.add('hide');
    document.getElementById('dropdownMenuLink3')?.classList.add('hide');
    document.getElementById('dropdownMenuLink2')?.classList.add('hide');
    document.getElementById('dropdownMenuLink')?.classList.remove('hide');

    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 3) {
        clearInterval(interval);
        this.dropdownclickclose = true;
      }
    }, 300);

  }
  notificationlistclose() {
    document.getElementById('dropdownnotifications')?.classList.add('hide');
    document.getElementById('notificationsremove')?.classList.remove('removehover');
  }
  messageslist() {
    this.dropdownclickclose = false;
    document.getElementById('messagesremove')?.classList.remove('hide');
    document.getElementById('messagesremove')?.classList.add('removehover');
    document.getElementById('dropdownmessages')?.classList.add('hide');
    document.getElementById('dropdownmessages')?.classList.remove('hide');
    document.getElementById('dropdownwarnings')?.classList.add('hide');
    document.getElementById('dropdownopenitems')?.classList.add('hide');
    document.getElementById('dropdownnotifications')?.classList.add('hide');
    document.getElementById('dropdownsearch')?.classList.add('hide');
    document.getElementById('dropdownMenuLink3')?.classList.add('hide');
    document.getElementById('dropdownMenuLink2')?.classList.add('hide');
    document.getElementById('dropdownMenuLink')?.classList.remove('hide');

    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 3) {
        clearInterval(interval);
        this.dropdownclickclose = true;
      }
    }, 300);
  }

  messageslistclose() {
    document.getElementById('dropdownmessages')?.classList.add('hide');
    document.getElementById('messagesremove')?.classList.remove('removehover');
  }

  openitemslist() {
    this.dropdownclickclose = false;
    document.getElementById('openitemsremove')?.classList.remove('hide');
    document.getElementById('openitemsremove')?.classList.add('removehover');
    document.getElementById('dropdownopenitems')?.classList.remove('hide');
    document.getElementById('dropdownwarnings')?.classList.add('hide');
    document.getElementById('dropdownnotifications')?.classList.add('hide');
    document.getElementById('dropdownmessages')?.classList.add('hide');
    document.getElementById('dropdownsearch')?.classList.add('hide');
    document.getElementById('dropdownMenuLink3')?.classList.add('hide');
    document.getElementById('dropdownMenuLink2')?.classList.add('hide');
    document.getElementById('dropdownMenuLink')?.classList.remove('hide');

    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 3) {
        clearInterval(interval);
        this.dropdownclickclose = true;
      }
    }, 300);
  }

  openitemslistclose() {
    document.getElementById('dropdownopenitems')?.classList.add('hide');
    document.getElementById('openitemsremove')?.classList.remove('removehover');
  }

  showlist() {
    this.dropdownclickclose = false;
    document.getElementById('dropdownMenuLink')?.classList.add('hide');
    document.getElementById('adddropdown')?.classList.add('radiusbottom');
    document.getElementById('dropdownMenuLink2')?.classList.remove('hide');
    document.getElementById('dropdownMenuLink3')?.classList.remove('hide');
    document.getElementById('dropdownwarnings')?.classList.add('hide');
    document.getElementById('dropdownopenitems')?.classList.add('hide');
    document.getElementById('dropdownnotifications')?.classList.add('hide');
    document.getElementById('dropdownmessages')?.classList.add('hide');
    document.getElementById('dropdownsearch')?.classList.add('hide');


    var a = 1;
    const interval = setInterval(() => {
      console.log(a++)
      if (a == 3) {
        clearInterval(interval);
        this.dropdownclickclose = true;
      }
    }, 300);
  }

  

  showlist2() {
    document.getElementById('dropdownMenuLink')?.classList.remove('hide');
    document.getElementById('dropdownMenuLink2')?.classList.add('hide');
    document.getElementById('dropdownMenuLink3')?.classList.add('hide');
    document.getElementById('adddropdown')?.classList.remove('radiusbottom');
    document.getElementById('languages')?.classList.add('hide');
    document.getElementById('languagediv')?.classList.remove('hide');
    document.getElementById('languagearrowup')?.classList.add('hide');

  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }
  buttonfre() {
    document.getElementById('scrollbutton1')?.classList.remove('hide');
    document.getElementById('buttonfre')?.classList.remove('hide');
  }

  addbodyclass() {
    document.body.classList.add('remove');
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('val3', this.favs)
    moveItemInArray(this.favs, event.previousIndex, event.currentIndex);
    this.favs = [...this.favs]
    // let i = 0;
    // this.favs.forEach((tab: any) => {
    //   let tabopions = {
    //     'id': tab.id,
    //     'sequence': i++,
    //   };
    //   this.service.update(tabopions).subscribe((val) => {

    //   });
    // });

  }

  mousein() {
    this.favs = [];
    this.service.getfav().subscribe((val2) => {
      val2.forEach((itemworkk: any) => {
        itemworkk['name'] = "";
        itemworkk.name = itemworkk.selectedValue;
      });
      this.favs = val2;
      if (this.favs.length == 0) {
        document.getElementById('ullifre2')?.classList.add('li1padding');
      } else {
        document.getElementById('ullifre2')?.classList.remove('li1padding');
      }
    });
    console.log('r u serious working');

  }


  removefav(id: any) {
    this.service.deletefav(id).subscribe((val) => {
      console.log('delete');
      this.toggleText();
      this.mousein();
    });
    let item1 = this.favs.filter(function (item1: any) {
      return item1.id === id;
    })[0];
    let index1 = this.favs.indexOf(item1);
    this.favs.splice(index1, 1);
    console.log('delete', this.favs);
    this.showText = false;
  }
  removefav2() {
    if (this.showInput == true) {

      this.favs = [];
      this.service.getfav().subscribe((val2) => {
        val2.forEach((itemworkk: any) => {
          itemworkk['name'] = "";
          itemworkk['routing'] = "";
          itemworkk.name = itemworkk.selectedValue;
          if (itemworkk.selectedValue == "  Database-Work Schedules") {
             itemworkk.routing = "/company/workschedule";
          }

          if (itemworkk.selectedValue == "  Database-Holidays") {
            itemworkk.routing = "/company/holiday";
          }
        });
        this.favs = val2;
        if (this.favs.length == 0) {
          document.getElementById('ullifre2')?.classList.add('li1padding');
        } else {
          document.getElementById('ullifre2')?.classList.remove('li1padding');
        }
      });
      console.log('its deleted from favs bar');
      this.showInput = false;
    }
  }

  toggleText() {
    this.showText = !this.showText;
    this.service.toggle2.next(this.showText);
  }
  entersearch(event: any) {
    if (event.keyCode == 13) {
      this.searchadvanced();
    }
  }

  closepopup(event: any) {
    if (event.keyCode === 27) {
      this.searchadvancedclose();
    }
  }

  focusout(event: any) {
    if (event.keyCode === 27) {
      if (this.closewithtext == true) {
      }
      if (this.closewithouttext == true) {
      }
    }
  }
  
  onFocusOutEvent(event: any){

    console.log(event.target.value);
 
 }
  @HostListener('window:click', ['$event.target'])
  onClick() {
    if (this.dropdownclickclose == true) {
      this.dropdownclickclose = false;
      clearInterval(this.showlistinterval);
      this.openitemslistclose();
      this.notificationlistclose();
      this.warninglistclose();
      this.messageslistclose();
      this.searchclickclose();
    }

  }



}
