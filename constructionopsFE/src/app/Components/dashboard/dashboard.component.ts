import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryService } from 'src/app/Services/library.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { SidepanelComponent } from '../sidepanel/sidepanel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  status: boolean = false;
  showInput: boolean | undefined;
  content?: string;
  constructor(private userService: UserService, private service: LibraryService,private tokenStorageService: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.service.toggle$.subscribe(
      toggle => this.showInput = toggle
    )
  }

  toggle() {
    
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }
 
}
