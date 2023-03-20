import { Component, OnInit, Output, ViewChild, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/Services/header.service';
import { HolidayLibraryService } from 'src/app/Services/holiday-library.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';



@Component({
  selector: 'app-companyheader',
  templateUrl: './companyheader.component.html',
  styleUrls: ['./companyheader.component.scss']
})
export class CompanyheaderComponent implements OnInit,OnChanges {
  @Input() libraryNameChange:any
  @Output() dropdownchange = new EventEmitter<string>();

  libraryName = "Company"
  changeColor: any
  // status: boolean = false;
  // showText = false;
  // public favs: any;
  // showInput = false;
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private service: HolidayLibraryService, private service2: HeaderService) { }

  showDropdown = () => {
    document.getElementById("dropdownMenuButton1")?.classList.add('show')
    document.getElementById('dropdownUl')?.classList.add('show')
  }

  
  hideDropDown = () => {
    document.getElementById("dropdownMenuButton1")?.classList.remove('show')
    document.getElementById('dropdownUl')?.classList.remove('show')
  }
  sendToParent = (id: any) => {
    this.dropdownchange.emit(id);
    document.getElementById("1")?.classList.remove('selected')
    document.getElementById("2")?.classList.remove('selected')
    document.getElementById("3")?.classList.remove('selected')
    document.getElementById("4")?.classList.remove('selected')
    document.getElementById("5")?.classList.remove('selected')
    document.getElementById("6")?.classList.remove('selected')
    document.getElementById("7")?.classList.remove('selected')


    if (id == "department") {
      this.libraryName = "Company-Department Library"
      document.getElementById("1")?.classList.add('selected')
      this.changeColor = "#07b9ec"
      document.getElementById("dropdownMenuButton1")?.classList.remove('show')
      document.getElementById('dropdownUl')?.classList.remove('show')
    } else if (id == "resource") {
      this.libraryName = "Company-Resource Type Library"
      this.changeColor = "#07b9ec"
      document.getElementById("2")?.classList.add('selected')
      document.getElementById("dropdownMenuButton1")?.classList.remove('show')
      document.getElementById('dropdownUl')?.classList.remove('show')
    } else if (id == "workschedule") {
      this.libraryName = "Company-Work Schedule Library"
      this.changeColor = "#07b9ec"
      document.getElementById("3")?.classList.add('selected')
      document.getElementById("dropdownMenuButton1")?.classList.remove('show')
      document.getElementById('dropdownUl')?.classList.remove('show')
    } else if (id == "holiday") {
      this.libraryName = "Company-Holiday Library"
      this.changeColor = "#07b9ec"
      document.getElementById("4")?.classList.add('selected')
      document.getElementById("dropdownMenuButton1")?.classList.remove('show')
      document.getElementById('dropdownUl')?.classList.remove('show')
    } else if (id == "position") {
      this.libraryName = "Company-Position/Title Library"
      this.changeColor = "#07b9ec"
      document.getElementById("5")?.classList.add('selected')
      document.getElementById("dropdownMenuButton1")?.classList.remove('show')
      document.getElementById('dropdownUl')?.classList.remove('show')
    } else if (id == "constraint") {
      this.libraryName = "Company-Constraint Library"
      this.changeColor = "#07b9ec"
      document.getElementById("6")?.classList.add('selected')
      document.getElementById("dropdownMenuButton1")?.classList.remove('show')
      document.getElementById('dropdownUl')?.classList.remove('show')
    } else {
      this.libraryName = "Company-Trade/Service Type Library"
      this.changeColor = "#07b9ec"
      document.getElementById("7")?.classList.add('selected')
      document.getElementById("dropdownMenuButton1")?.classList.remove('show')
      document.getElementById('dropdownUl')?.classList.remove('show')
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.libraryNameChange==null){
      this.libraryName="Company"
      this.changeColor = "#edeeef"
      document.getElementById("1")?.classList.remove('selected')
      document.getElementById("2")?.classList.remove('selected')
      document.getElementById("3")?.classList.remove('selected')
      document.getElementById("4")?.classList.remove('selected')
      document.getElementById("5")?.classList.remove('selected')
      document.getElementById("6")?.classList.remove('selected')
      document.getElementById("7")?.classList.remove('selected')
  
    }
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    
  }


  ngOnInit(): void {

    // this.service2.toggle2$.subscribe(
    //   toggle2 => this.showInput = toggle2
    // )
    // this.favs = [];
    // this.service2.getfav().subscribe((val2) => {
    //   val2.forEach((itemworkk: any) => {
    //     itemworkk['name'] = "";
    //     itemworkk['routing'] = "";
    //     itemworkk.name = itemworkk.selectedValue;
    //     if (itemworkk.selectedValue == "  Database-Work Schedules") {
    //       itemworkk.routing = "/company/workschedule";
    //       console.log('id', itemworkk.id);
    //       document.getElementById('workfavstar')?.classList.add('hide');
    //       document.getElementById('workfavstar2')?.classList.remove('hide');
    //       document.getElementById('workfavstar3')?.classList.add('hide');
    //     }
    //     if (itemworkk.selectedValue == "  Database-Holidays") {
    //       console.log('id', itemworkk.id);
    //       itemworkk.routing = "/company/holiday";
    //       document.getElementById('holifavstar')?.classList.add('hide');
    //       document.getElementById('holifavstar2')?.classList.remove('hide');
    //       document.getElementById('holifavstar3')?.classList.add('hide');
    //     }
    //   });
    //   this.favs = val2;
    //   console.log(this.favs)
    // });
    // if (this.service.navstatus == true) {
    //   this.router.navigate(['/company/workimported']);
    // }
    // if (this.service.navstatus2 == true) {
    //   this.router.navigate(['/company/holidaysimported']);
    // }
    // setInterval(() => {
    //   if (this.router.url == '/company/workschedule') {
    //     document.getElementById('database')?.classList.remove('database');
    //     document.getElementById('database')?.classList.remove('holidays');
    //     document.getElementById('database')?.classList.add('workschedule');
    //     document.getElementById('database')?.classList.add('active');
    //     document.getElementById('holiday')?.classList.remove('active1');
    //     document.getElementById('workschedule')?.classList.add('active1');
    //   } else if (this.router.url == '/company/holiday') {
    //     document.getElementById('database')?.classList.remove('database');
    //     document.getElementById('database')?.classList.remove('workschedule');
    //     document.getElementById('database')?.classList.add('holidays');
    //     document.getElementById('database')?.classList.add('active');
    //     document.getElementById('holiday')?.classList.add('active1');
    //     document.getElementById('workschedule')?.classList.remove('active1');
    //   } else if (this.router.url == '/company/workimported') {
    //     document.getElementById('database')?.classList.remove('database');
    //     document.getElementById('database')?.classList.remove('holidays');
    //     document.getElementById('database')?.classList.add('workschedule');
    //     document.getElementById('database')?.classList.add('active');
    //     document.getElementById('holiday')?.classList.remove('active1');
    //     document.getElementById('workschedule')?.classList.add('active1');
    //   } else if (this.router.url == '/company/workcomplete') {
    //     document.getElementById('database')?.classList.remove('database');
    //     document.getElementById('database')?.classList.remove('holidays');
    //     document.getElementById('database')?.classList.add('workschedule');
    //     document.getElementById('database')?.classList.add('active');
    //     document.getElementById('holiday')?.classList.remove('active1');
    //     document.getElementById('workschedule')?.classList.add('active1');
    //   } else if (this.router.url == '/company/holidaysimported') {
    //     document.getElementById('database')?.classList.remove('database');
    //     document.getElementById('database')?.classList.remove('workschedule');
    //     document.getElementById('database')?.classList.add('holidays');
    //     document.getElementById('database')?.classList.add('active');
    //     document.getElementById('holiday')?.classList.add('active1');
    //     document.getElementById('workschedule')?.classList.remove('active1');
    //   } else if (this.router.url == '/company/holidayscomplete') {
    //     document.getElementById('database')?.classList.remove('database');
    //     document.getElementById('database')?.classList.remove('workschedule');
    //     document.getElementById('database')?.classList.add('holidays');
    //     document.getElementById('database')?.classList.add('active');
    //     document.getElementById('holiday')?.classList.add('active1');
    //     document.getElementById('workschedule')?.classList.remove('active1');
    //   }
    // }, 400);
    // setInterval(() => {
    //   this.mousein();
    // }, 400);
  }
  // toggle() {
  //   this.showInput = !this.showInput;
  // }
  // toggleText() {
  //   this.showText = !this.showText;
  //   this.service2.toggle.next(this.showText);
  // }
  // clickworkschedule() {
  //   document.getElementById('database')?.classList.remove('database');
  //   document.getElementById('database')?.classList.remove('holidays');
  //   document.getElementById('database')?.classList.add('workschedule');
  //   this.mousein();
  // }
  // clickholidays() {
  //   document.getElementById('database')?.classList.remove('database');
  //   document.getElementById('database')?.classList.remove('workschedule');
  //   document.getElementById('database')?.classList.add('holidays');
  //   this.mousein();
  // }
  // favopen() {
  //   this.addworkfav();
  //   document.getElementById('workfavstar')?.classList.add('hide');
  //   document.getElementById('workfavstar2')?.classList.remove('hide');
  //   document.getElementById('workfavstar3')?.classList.add('hide');
  // }
  // favclose() {
  //   this.removeworkfav();
  //   document.getElementById('workfavstar2')?.classList.add('hide');
  //   document.getElementById('workfavstar')?.classList.remove('hide');
  //   document.getElementById('workfavstar3')?.classList.remove('hide');
  // }
  // favopen1() {
  //   this.addholifav();
  //   document.getElementById('holifavstar')?.classList.add('hide');
  //   document.getElementById('holifavstar2')?.classList.remove('hide');
  //   document.getElementById('holifavstar3')?.classList.add('hide');
  // }
  // favclose1() {
  //   this.removeholifav();
  //   document.getElementById('holifavstar2')?.classList.add('hide');
  //   document.getElementById('holifavstar')?.classList.remove('hide');
  //   document.getElementById('holifavstar3')?.classList.remove('hide');
  // }
  // addworkfav() {
  //   let favwork = {
  //     "selectedValue": "  Database-Work Schedules",
  //     "sequence": this.favs.length + 1,
  //     "route": "/company/workschedule",
  //   }
  //   this.service2.createfav(favwork).subscribe((val) => {
  //     console.log('created');
  //     this.toggleText();
  //     this.showText = false;
  //   });
  // }
  // removeworkfav() {
  //   let a = 0;
  //   this.favs.forEach((val: any) => {
  //     if (val.selectedValue == "  Database-Work Schedules") {
  //       a = val.id;
  //     }
  //   });
  //   let favwork = {
  //     "id": a,
  //   }
  //   this.service2.deletefav(a).subscribe((val) => {
  //     console.log('delete');
  //     this.toggleText();
  //     this.showText = false;
  //   });
  // }
  // addholifav() {
  //   let favwork = {
  //     "selectedValue": "  Database-Holidays",
  //     "sequence": this.favs.length + 1,
  //     "route": "/company/holiday",
  //   }
  //   this.service2.createfav(favwork).subscribe((val) => {
  //     console.log('created');
  //     this.toggleText();
  //     this.showText = false;
  //   });
  // }
  // removeholifav() {
  //   let a = 0;
  //   this.favs.forEach((val: any) => {
  //     if (val.selectedValue == "  Database-Holidays") {
  //       a = val.id;
  //     }
  //   });
  //   let favwork = {
  //     "id": a,
  //   }
  //   this.service2.deletefav(a).subscribe((val) => {
  //     console.log('delete');
  //     this.toggleText();
  //     this.showText = false;
  //   });
  // }
  // mousein() {
  //   if (this.showInput == true) {
  //     console.log('entered');
  //     this.favs = [];
  //     this.service2.getfav().subscribe((val2) => {
  //       val2.forEach((itemworkk: any) => {
  //         itemworkk['name'] = "";
  //         itemworkk.name = itemworkk.selectedValue;
  //       });
  //       this.favs = val2;
  //       console.log('favs', this.favs)
  //       this.favs.forEach((val: any) => {
  //         if (val.name == "  Database-Work Schedules") {
  //           console.log('id', val.id);
  //           val.routing = "/company/workschedule";
  //           document.getElementById('workfavstar')?.classList.add('hide');
  //           document.getElementById('workfavstar2')?.classList.remove('hide');
  //           document.getElementById('workfavstar3')?.classList.add('hide');
  //         } else {
  //           document.getElementById('workfavstar2')?.classList.add('hide');
  //           document.getElementById('workfavstar')?.classList.remove('hide');
  //           document.getElementById('workfavstar3')?.classList.remove('hide');
  //         }
  //         if (val.name == "  Database-Holidays") {
  //           console.log('id', val.id);
  //           val.routing = "/company/holiday";
  //           document.getElementById('holifavstar')?.classList.add('hide');
  //           document.getElementById('holifavstar2')?.classList.remove('hide');
  //           document.getElementById('holifavstar3')?.classList.add('hide');
  //         } else {
  //           document.getElementById('holifavstar2')?.classList.add('hide');
  //           document.getElementById('holifavstar')?.classList.remove('hide');
  //           document.getElementById('holifavstar3')?.classList.remove('hide');
  //         }
  //       });
  //       if (this.favs.length == 0) {
  //         document.getElementById('workfavstar2')?.classList.add('hide');
  //         document.getElementById('workfavstar')?.classList.remove('hide');
  //         document.getElementById('workfavstar3')?.classList.remove('hide');
  //         document.getElementById('holifavstar2')?.classList.add('hide');
  //         document.getElementById('holifavstar')?.classList.remove('hide');
  //         document.getElementById('holifavstar3')?.classList.remove('hide');
  //       }
  //     });
  //     this.showInput = false;
  //   }
  // }
}
