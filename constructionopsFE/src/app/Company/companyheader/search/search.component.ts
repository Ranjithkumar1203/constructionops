import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dropdownclickclose: boolean = false;
  showlistinterval: any;
  searchitem1: any;
  onclickmouse: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  focusoutfor(event: any) {
    
    if (event.keyCode === 27) {
    // document.getElementById('searchinput1')?.blur();
    }
  }
  addclass1() {
    this.dropdownclickclose = false;
    document.getElementById('buttonsearch1')?.classList.add('selectedbutton1');
  }
  closepopup1(event: any) {
    if (event.keyCode === 27) {
      this.searchadvancedclose1();
    }
  }
  searchadvancedclose1() {
    this.searchitem1 = '';
    document.getElementById('dropdownsearchsimple')?.classList.add('hide');
  }
  searchclickclose1() {
    if (this.onclickmouse == true) {
      console.log('clickedout')
      this.searchitem1 = '';
      document.getElementById('dropdownsearchsimple')?.classList.add('hide');
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


  searchadvanced() {
    this.dropdownclickclose = false;
    document.getElementById('searchremove')?.classList.remove('hide');
    document.getElementById('dropdownsearchsimple')?.classList.remove('hide');
    document.getElementById('searchinputtext1')?.focus();
  }

  readytosearch() {
    this.searchitem1 = '';
  }


  entersearch1(event: any) {
    if (event.keyCode == 13) {
      this.searchadvanced();
    }
  }
  focusout(event: any) {
    if (event.keyCode === 27) {
     // document.getElementById('searchinput')?.blur();
    }
  }

  @HostListener('window:click', ['$event.target'])
  onClick() {
    if (this.dropdownclickclose == true) {
      this.dropdownclickclose = false;
      clearInterval(this.showlistinterval);
      this.searchclickclose1();
    }

  }


}


