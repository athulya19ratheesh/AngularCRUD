import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData !: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      age: [''],
      statusMessage: [''],
      isPublic: [''],
      createdAt: ['']
    })

    this.getUsersById();
  }

  getUsersById() {
    this.api.getUserById(this.route.snapshot.params['id'])
      .subscribe(res => {
        this.userData = res;
        this.userModelObj.id = this.userData.id
        this.formValue.controls['name'].setValue(this.userData.name);
        this.formValue.controls['age'].setValue(this.userData.age);
        this.formValue.controls['email'].setValue(this.userData.email);
        this.formValue.controls['isPublic'].setValue(this.userData.isPublic);
        this.formValue.controls['statusMessage'].setValue(this.userData.statusMessage);
        this.formValue.controls['createdAt'].setValue(this.userData.createdAt);
      })
  }

  editUserDetails() {
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.age = this.formValue.value.age;
    this.userModelObj.statusMessage = this.formValue.value.statusMessage;

    this.api.updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe(res => {
        alert("Successfully Updated")
        this.router.navigate(['users'])
      })
  }

  onCancel() {
    this.router.navigate(['users'])
  }

  changeUserActiveStatus(e: any) {
    this.userModelObj.isPublic = e.target.value;
  }

}
