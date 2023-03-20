import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import Swal from 'sweetalert2';
import { CreateResourceTypeComponent } from './create-resource-type/create-resource-type.component';
import { EditResourceTypeComponent } from './edit-resource-type/edit-resource-type.component';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css']
})
export class ResourceTypeComponent implements OnInit {
  textOnPlus: any
  allResources: any
  showSoftware: any
  dataArray: any[] = [];
  checkedDataArray: any[] = [];

  constructor(private dialog: MatDialog, private apiservice: ApiServiceService) { }

  options = [
    { id: 1, name: 'Buildrops', checked: false, ischecked: false, },
  ];

  ngOnInit(): void {
    this.apiservice.getResourcesLibrary().subscribe((res) => {
      this.allResources = res
      this.allResources.reverse()
    })
  }

  sortAlphabetically = () => {
    this.allResources.sort((a: any, b: any) => a.resourceType.localeCompare(b.resourceType));
  }


  showWork = () => {
    this.textOnPlus = true
  }
  hideWork = () => {
    this.textOnPlus = false
  }
  editsoftware(data: any,) {
    this.options.map((ele) => {
      ele.checked = false
    })
    document.getElementById('editweek' + data.id)?.classList.add('hide');
    document.getElementById('doneweek' + data.id)?.classList.remove('hide');
    document.getElementById('listweek' + data.id)?.classList.remove('hide');
    const softwareArray  = data.softwareName.split(',')
    this.options.map((ele) => {
      softwareArray.map((soft: any) => {
        if (ele.name == soft) {
          ele.checked = true
        }
      })
    })
    this.checkedDataArray = this.options
  }
  doneweek(id: any) {
    document.getElementById('editweek' + id)?.classList.remove('hide');
    document.getElementById('doneweek' + id)?.classList.add('hide');
    document.getElementById('listweek' + id)?.classList.add('hide');
    this.dataArray = []
  }

  onCheckBoxChange = (event: any, data: any, value: string) => {
    const mappedData = this.checkedDataArray.map((ele) => {
      if (ele.checked == true) {
        return ele.name
      }
    })
    
    const filterData = mappedData.filter((element) => {
      if (element != undefined) {
        return element
      }
    })
    this.dataArray = filterData
    console.log(filterData)
  }
  updateweek = (data: any) => {
    const apidata = {
      id: data.id,
      resourceType: data.resourceType,
      resourceTypeDetails: data.resourceTypeDetails,
      softwareName: this.dataArray.toString()
    }
    console.log(apidata)

    this.apiservice.updateResourceLibrary(apidata).subscribe((res) => {
      this.apiservice.getResourcesLibrary().subscribe((res) => {
        console.log(res)
        this.allResources = res
        this.allResources.reverse()
      })
      document.getElementById('listweek' + data.id)?.classList.add('hide');
      this.dataArray.splice(0, this.dataArray.length);
      this.showSoftware = " "
    })

  }
  selectAll=()=>{
    const mappedData = this.checkedDataArray.map((ele) => {
      ele.checked = true
      if(ele.checked==true){
        return ele.name
      }
     
    })
    this.dataArray = mappedData
  }



  openAddResourceDialog = () => {
    const dialogRef = this.dialog.open(CreateResourceTypeComponent, {
      panelClass: 'app-full-bleed-dialog'
    })
    dialogRef.afterClosed().subscribe(res => {
      this.apiservice.getResourcesLibrary().subscribe((resp) => {
        this.allResources = resp
        this.allResources.reverse()


      })
    })
  }
  editResource = (data: any) => {
    const dialogRef = this.dialog.open(EditResourceTypeComponent, {
      data: data,
      panelClass: 'app-full-bleed-dialog',
    })
    dialogRef.afterClosed().subscribe(res => {
      this.apiservice.getResourcesLibrary().subscribe((resp) => {
        this.allResources = resp
        this.allResources.reverse()


      })

    })
  }
  deleteResource = (data: any) => {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const apidata = {
          id: data.id
        }
        this.apiservice.deleteResourceLibrary(apidata).subscribe((res => {
          this.apiservice.getResourcesLibrary().subscribe((resp) => {
            this.allResources = resp
            this.allResources.reverse()


          })
        }))
      }
    })
  }
}
