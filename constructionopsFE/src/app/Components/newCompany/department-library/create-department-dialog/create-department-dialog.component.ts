import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-create-department-dialog',
  templateUrl: './create-department-dialog.component.html',
  styleUrls: ['./create-department-dialog.component.css'],
})
export class CreateDepartmentDialogComponent implements OnInit {
  closeAfterApi:any
  constructor( private apiservice: ApiServiceService, public dialogRef: MatDialogRef<CreateDepartmentDialogComponent>) { }


  departmentCreate = new FormGroup({
    departmentName: new FormControl('',Validators.required),
    departmentDetail: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
  }
  createDepartment=()=>{
    const data = {
      departmentName: this.departmentCreate.controls.departmentName.value,
      departmentDetails: this.departmentCreate.controls.departmentDetail.value,
      softwareName: ""
    }
    this.apiservice.createDepartmentLibrary(data).subscribe((res)=>{
      this.dialogRef.close()
     
    },(error)=>{
      window.alert(error)
    })
    
  }
}
