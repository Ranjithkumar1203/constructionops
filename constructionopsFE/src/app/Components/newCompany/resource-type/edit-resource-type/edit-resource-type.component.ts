import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-resource-type',
  templateUrl: './edit-resource-type.component.html',
  styleUrls: ['./edit-resource-type.component.css']
})
export class EditResourceTypeComponent implements OnInit {
  closeAfterApi:any
  constructor(private apiservice:ApiServiceService, public dialogRef: MatDialogRef<EditResourceTypeComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }
  ResourceTypeEdit = new FormGroup({
    resourceType: new FormControl(this.data.resourceType),
    resourceTypeDetail: new FormControl(this.data.resourceTypeDetails),
  });




  EditResourceType=()=>{
    const data = {
      Id: this.data.id,
      resourceType: this.ResourceTypeEdit.controls.resourceType.value,
      resourceTypeDetails:this.ResourceTypeEdit.controls.resourceTypeDetail.value,
      softwareName:this.data.softwareName
    }
    this.apiservice.updateResourceLibrary(data).subscribe((res)=>{
      this.dialogRef.close()
    },(error)=>{
      window.alert(error)
    })
  }
}
