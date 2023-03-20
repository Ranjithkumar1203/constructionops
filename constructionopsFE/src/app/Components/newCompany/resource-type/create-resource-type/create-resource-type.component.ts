import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-create-resource-type',
  templateUrl: './create-resource-type.component.html',
  styleUrls: ['./create-resource-type.component.css']
})
export class CreateResourceTypeComponent implements OnInit {
  closeAfterApi:any
  constructor(private apiservice:ApiServiceService,public dialogRef: MatDialogRef<CreateResourceTypeComponent>) { }
  ResourceCreate = new FormGroup({
    resourceType: new FormControl('',Validators.required),
    resourceTypeDetails: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
  }

  createResource=()=>{
    const data = {
      resourceType: this.ResourceCreate.controls.resourceType.value,
      resourceTypeDetails: this.ResourceCreate.controls.resourceTypeDetails.value,
      softwareName:" "
    }
    this.apiservice.createResourceLibrary(data).subscribe((res)=>{
        this.dialogRef.close()
    },(error)=>{
      window.alert(error)
    })
    
  }
}
