import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  showAdd !: boolean;
  showEdit !: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      age: ['']
    })
    this.getUsers();
  }

  clickAddUser() {
    this.formValue.reset();
    this.showAdd = true;
    this.showEdit = false;
  }

  postUserDetails() {
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.age = this.formValue.value.age;

    this.api.postUser(this.userModelObj)
      .subscribe(res => {
        console.log("res", res)
        alert("User added successfully")
        let ref = document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      },
        err => {
          alert("An Error Occured")
        })
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
    this.showAdd = false;
    this.showEdit = true;
    this.userModelObj.id = row.id
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['email'].setValue(row.email);
  }

  editUserDetails() {
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.age = this.formValue.value.age;
    this.api.updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe(res => {
        alert("Successufully Updated")
        let ref = document.getElementById("cancel")
        ref?.click();
        this.formValue.reset();
        this.getUsers();
      })
  }
}
