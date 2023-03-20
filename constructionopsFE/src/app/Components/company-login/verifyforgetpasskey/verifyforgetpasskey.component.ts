import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-verifyforgetpasskey',
  templateUrl: './verifyforgetpasskey.component.html',
  styleUrls: ['./verifyforgetpasskey.component.css']
})
export class VerifyforgetpasskeyComponent implements OnInit {
  showError:any
  loading = true

  constructor(private actRoutes: ActivatedRoute, private apiservice: ApiServiceService,private router: Router) {
    let postid = this.actRoutes.snapshot.params.key;
    const data = {
      emailKey: postid
    }
    this.apiservice.findForgetPasswordKey(data).subscribe((res)=>{
      if(res.isKeyAvailable===false){
        this.loading=false
        this.showError=true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }else{
        localStorage.setItem('forgetKey',postid);
        this.router.navigate(['/resetpassword']);

      }
    })

   }

  ngOnInit(): void {
  }

}
