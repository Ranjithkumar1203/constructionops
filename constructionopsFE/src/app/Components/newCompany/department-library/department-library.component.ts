import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import Swal from 'sweetalert2';
import { CreateDepartmentDialogComponent } from './create-department-dialog/create-department-dialog.component';
import { EditDeprtmentComponent } from './edit-deprtment/edit-deprtment.component';

@Component({
  selector: 'app-department-library',
  templateUrl: './department-library.component.html',
  styleUrls: ['./department-library.component.css']
})
export class DepartmentLibraryComponent implements OnInit {
  textOnPlus: any
  allDepartment: any
  shortedDepartment: any
  openOption = false
  showSoftware: any
  dataArray: any[] = [];
  checkedDataArray: any[] = [];


  options = [
    { id: 1, name: 'Buildrops', checked: false, ischecked: false, },
  ];

  constructor(private dialog: MatDialog, private apiservice: ApiServiceService) { }
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
    const softwareArray = data.softwareName.split(',')
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

  showDropdown = (id: any) => {
    document.getElementById('listweek' + id)?.classList.remove('hide');
  }
  closeDropdown = (id: any) => {
    document.getElementById('listweek' + id)?.classList.add('hide');
    this.dataArray.splice(0, this.dataArray.length);
    console.log(this.dataArray)
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
  }

  updateweek = (data: any) => {
    const apidata = {
      id: data.id,
      departmentName: data.departmentName,
      departmentDetails: data.departmentDetails,
      softwareName: this.dataArray.toString()
    }
    console.log(apidata)
    this.apiservice.updateDepartmentLibrary(apidata).subscribe((res) => {
      this.apiservice.getDepartmentLibrary().subscribe((res) => {
        console.log(res)
        this.allDepartment = res
        this.allDepartment.reverse()
      })
      document.getElementById('listweek' + data.id)?.classList.add('hide');
      this.dataArray.splice(0, this.dataArray.length);
      this.showSoftware = " "
    })

  }

  sortAlphabetically = () => {
    this.allDepartment.sort((a: any, b: any) => a.departmentName.localeCompare(b.departmentName));
  }

  openAddDepartmentDialog = () => {
    const dialogRef = this.dialog.open(CreateDepartmentDialogComponent, {
      panelClass: 'app-full-bleed-dialog',
    })
    dialogRef.afterClosed().subscribe(res => {
      this.apiservice.getDepartmentLibrary().subscribe((resp) => {
        this.allDepartment = resp
        this.allDepartment.reverse()
      })

    })
  }


  editDepartment = (data: any) => {
    const dialogRef = this.dialog.open(EditDeprtmentComponent, {
      data: data,
      panelClass: 'app-full-bleed-dialog',
    })
    dialogRef.afterClosed().subscribe(res => {
      this.apiservice.getDepartmentLibrary().subscribe((resp) => {
        this.allDepartment = resp
        this.allDepartment.reverse()
      })

    })
  }

  deleteDepartment = (data: any) => {
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
        this.apiservice.deleteDepartmentLibrary(apidata).subscribe((res => {
          this.apiservice.getDepartmentLibrary().subscribe((resp) => {
            this.allDepartment = resp
            this.allDepartment.reverse()
          })
        }))
      }
    })
  }

  ngOnInit(): void {
    this.apiservice.getDepartmentLibrary().subscribe((res) => {
      console.log(res)
      this.allDepartment = res
      this.allDepartment.reverse()
    })
  }

}
