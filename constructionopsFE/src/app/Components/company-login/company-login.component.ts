import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-company-login',
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.css']
})
export class CompanyLoginComponent implements OnInit {
company:any

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private apiService: ApiServiceService) {
    this.apiService.findCompany().subscribe(res =>{
      this.company=res;
      console.log(this.company.companyName)
    })
   }
  forgetPassDiv = false
  loginDiv = true
  isEmailAvailable: any

  emailForm = new FormGroup({
    emailaddress: new FormControl('', Validators.email)
  })

  companyLogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  })
  forgotPasswordhandle = () => {
    this.forgetPassDiv = true;
    this.loginDiv = false;
  }
  backhandler = () => {
    this.forgetPassDiv = false
    this.loginDiv = true
  }
  sendEmailHandler = () => {
    const data = {
      emailId: this.emailForm.controls.emailaddress.value
    }
    this.apiService.forgetPassword(data).subscribe((res) => {
      if (res.isEmailAvailable == false) {
        console.log(res.isEmailAvailable);
        this.isEmailAvailable = false
      } else {
        window.alert("Password reset link send to your register EmailId")
      }

    })


  }


  onLogin = () => {
  
    this.authService.login(this.companyLogin.controls.username.value, this.companyLogin.controls.password.value, this.company.companyName).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.router.navigate(['newcompany']);
      },
      err => {
        window.alert(err.error.message)
      }
    );

  }

  ngOnInit(): void {
    window.sessionStorage.clear();
  }

}
