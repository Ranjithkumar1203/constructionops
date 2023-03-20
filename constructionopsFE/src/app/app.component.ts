import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LibraryService } from './Services/library.service';
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
  SHIFT = "SHIFT"
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buildrOps';
loading:boolean;
  constructor(private router: Router, private httpClient: HttpClient,private service: LibraryService) {
    this.loading = false;
    router.events.subscribe((event: any) => {
      if (event instanceof RouteConfigLoadStart) {
        this.loading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loading = false;
      }
  })
}
// @HostListener('window:keydown', ['$event'])
//   keyEvent(event: KeyboardEvent) {
//     if (event.key === KEY_CODE.TAB) {
//       event.preventDefault();

//     }

//   }
}
