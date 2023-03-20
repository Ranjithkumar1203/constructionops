import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-deprtment',
  templateUrl: './edit-deprtment.component.html',
  styleUrls: ['./edit-deprtment.component.css']
})
export class EditDeprtmentComponent implements OnInit {

  closeAfterApi: any
  constructor(private apiservice: ApiServiceService,public dialogRef: MatDialogRef<EditDeprtmentComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  departmentEdit = new FormGroup({
    departmentName: new FormControl(this.data.departmentName),
    departmentDetail: new FormControl(this.data.departmentDetails),
  });

  ngOnInit(): void {
  }


  EditDepartment = () => {
    const data = {
      id: this.data.id,
      departmentName: this.departmentEdit.controls.departmentName.value,
      departmentDetails: this.departmentEdit.controls.departmentDetail.value,
      softwareName:this.data.softwareName
    }
    this.apiservice.updateDepartmentLibrary(data).subscribe((res) => {
        this.dialogRef.close()
    }, (error) => {
      window.alert(error)
    })
  }
}
