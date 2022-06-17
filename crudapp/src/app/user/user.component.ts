import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData !: any;
  userDataList !: any;
  searchTerm ='';

  constructor(private formbuilder: FormBuilder, private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      age: [''],
      status:[''],
      ispublic:[''],
      createdat:['']
    })
    this.getUsers();
  }

  clickAddUser() {
    this.formValue.reset();
    this.router.navigate(['create'])
  }

  getUsers() {
    this.api.getUser()
      .subscribe(res => {
        this.userData = res;
      })
  }

  deleteUser(row: any) {
    this.api.deleteUser(row.id)
      .subscribe(res => {
        alert("User Deleted!!!");
        this.getUsers();
      })
  }

  onEdit(row: any) {
    this.userModelObj.id = row.id
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['email'].setValue(row.email);
  }

  search(value: string): void {
    this.userDataList = this.userData.filter((val: { name: string; }) =>
      val.name.toLowerCase().includes(value)
    );
  }
}
