import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private employeeService:EmployeeService,private toastr:ToastrService) { }

  ngOnInit() {
    this.employeeService.getData();
    this.resetForm();
  }
  onSubmit(employeeForm:NgForm){
    if(employeeForm.valid){
    if(employeeForm.value.$key==null){
      this.employeeService.insertEmployee(employeeForm.value);
      this.toastr.success("Submitted Successfully","Employee Registerd");
    }  
    else
    { 
      this.employeeService.updateEmployee(employeeForm.value);
      this.toastr.success("Edited Successfully","Employee Edited.");
    } 
    this.resetForm(employeeForm); 
  }
  else{
    this.toastr.warning("Failed","Please Provide All Required Information.");
  }   
  }

  resetForm(employeeForm?:NgForm){
   if(employeeForm!=null)
   employeeForm.reset();

   this.employeeService.selectedEmployee = {
     $key:null,
     name:'',
     position:'',
     office:'',
     salary:0
   };
  }
}
