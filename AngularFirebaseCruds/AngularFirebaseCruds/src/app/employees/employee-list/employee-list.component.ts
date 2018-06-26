import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
 employeeList:Employee[];
  constructor(private employeeService:EmployeeService,private toastr:ToastrService) { }

  ngOnInit() {
    var x = this.employeeService.getData();
    x.snapshotChanges().subscribe(item=>{
      this.employeeList = [];
      item.forEach(element=>{
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }

  OnEdit(emp:Employee){
   this.employeeService.selectedEmployee = Object.assign({ },emp);
  }

  OnDelete(key:string){
    console.log("key",key);
    this.employeeService.deleteEmployee(key);
    this.toastr.warning("Employee Deleted Successfully");

   }

}
