import { Component,OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from './user.model';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1: number, v2: number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable!: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

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
    this.router.navigate(['edit'])

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
  
  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '') {
      this.userData = this.userData;
    } else {
      this.userData = [...this.userData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
