import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  scrolled: number = 0;
  sorts = [
    {
      id: "1", value: 'Name', Index: '1', isSelected: false
    },
    {
      id: "2", value: 'Start', Index: '2', isSelected: false
    },
    {
      id: "3", value: 'Complete', Index: '3', isSelected: false
    },
    {
      id: "4", value: 'Number', Index: '4', isSelected: false
    },
    {
      id: "5", value: 'Status', Index: '5', isSelected: false
    },
    {
      id: "6", value: 'Local', Index: '6', isSelected: false
    }

  ]
  constructor() { }

  ngOnInit(): void {

  }

  sortclick(id: any) {
    document.getElementById('sortitem'+id)?.classList.add('active1');
    this.sortclcikclose(id);
  }
  sortclcikclose(id:any){
    this.sorts.forEach((itemworkk: any) => {
      if (itemworkk.id != id) {
        document.getElementById('sortitem'+itemworkk.id)?.classList.remove('active1');
      }
    });
    
  }

  scrolll() {
    document.getElementById('cont')!.scrollLeft -= document.getElementById('cont')!.scrollWidth;
  }
  scrollr() {
    document.getElementById('cont')!.scrollLeft += document.getElementById('cont')!.scrollWidth;
  }

  scrolledr() {
    document.getElementById('leftArrow')?.classList.remove('opacity2');
    document.getElementById('rightArrow')?.classList.remove('opacity1');
  }
  scrolledl() {
    document.getElementById('leftArrow')?.classList.add('opacity2');
    document.getElementById('rightArrow')?.classList.add('opacity1');
  }
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollLeft >= event.target.scrollHeight) {
      console.log("End");
    }
  }
}
