import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.scss']
})
export class FormAddComponent implements OnInit {
  myCreatedForm!: FormGroup;
  userList: Array<User> = new Array<User>();
  isNew: Boolean = true;
  editIndex: number = -1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.myCreatedForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  saveData() {
    this.userList.push(this.myCreatedForm.value as User);
    this.myCreatedForm.reset();
  }

  editData(_i: number) {
    // this.userList[index].name = this.userList[index].name + 'EDITADO'
    // this.userList[index].email = this.userList[index].email + 'EDITADO'
    // this.userList[index].password = this.userList[index].password + 'EDITADO'
    this.editIndex = _i;

    this.myCreatedForm.setValue({
      name: this.userList[_i].name,
      email: this.userList[_i].email,
      password: this.userList[_i].password
    });

    this.isNew = false;
  }
  saveEdit() {
    this.userList[this.editIndex].name = this.myCreatedForm.value.name;
    this.userList[this.editIndex].email = this.myCreatedForm.value.email;
    this.userList[this.editIndex].password = this.myCreatedForm.value.password;
    this.myCreatedForm.reset();
    this.isNew = true;
    this.editIndex = -1;
  }
  deleteData(_i:number){
    this.userList.splice(_i, 1);
  }
}