import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData !: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      age: [''],
      status: [''],
      isPublic: [''],
      createdat: [''],
      statusMessage: [''],
      avatarUrl: ['']
    })
  }

  postUserDetails() {
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.age = this.formValue.value.age;
    this.userModelObj.avatarUrl = this.formValue.value.avatarUrl;
    this.userModelObj.isPublic = this.formValue.value.isPublic;
    this.userModelObj.statusMessage = this.formValue.value.statusMessage;
    this.userModelObj.createdAt = new Date();

    this.api.postUser(this.userModelObj)
      .subscribe(res => {
        console.log("res", res)
        alert("User added successfully")
        this.formValue.reset();
        this.router.navigate(['users'])
      },
        err => {
          alert("An Error Occured")
        })
  }

  onCancel() {
    this.router.navigate(['users'])
  }
}
