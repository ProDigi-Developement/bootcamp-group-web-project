import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeService.getData();
    this.resetForm();
  }
  onSubmit(employeeForm:NgForm){
    console.log(employeeForm.value.$key);
    if(employeeForm.value.$key==null)
      this.employeeService.insertEmployee(employeeForm.value);
    else
      this.employeeService.updateEmployee(employeeForm.value);
    this.resetForm(employeeForm);    
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
