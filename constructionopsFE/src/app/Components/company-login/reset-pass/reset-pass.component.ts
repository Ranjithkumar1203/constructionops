import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  confirmPasswordError: any
  resetBox = true

  constructor(private apiService: ApiServiceService, private router: Router) { }

  resetForm = new FormGroup({
    password: new FormControl('', [Validators.required,
    Validators.minLength(8),
    this.patternValidator(/\d/, { hasNumber: true }),
    this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
    this.patternValidator(/[a-z]/, { hasSmallCase: true }),
    this.patternValidator(/[!@#$%^&*()_+\-=\[\]{};:\\|<>\/?]/, { hasSpecialCharacters: true })]),
    confirmPassword: new FormControl('', Validators.required)
  })

  resetHandler = () => {
    if (this.resetForm.controls.password.value === this.resetForm.controls.confirmPassword.value) {
      this.confirmPasswordError = false
      const key = localStorage.getItem('forgetKey');
      const data = {
        emailKey: key,
        newPassword: this.resetForm.controls.password.value,
      }
      this.apiService.resetPassword(data).subscribe((res) => {
        if (res.isSuccess == true) {
          localStorage.removeItem('forgetKey')
          this.resetBox = false
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 4000);
        }

      })

    } else {
      console.log("password not match");
      this.confirmPasswordError = true
    }
  }



  private patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }







  ngOnInit(): void {

  }








}
