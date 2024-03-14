import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { User } from '../../../models/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public addForm!: FormGroup;
  private usersList!: User[];
  constructor(private router: Router,private _userService: UserService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.addForm = new FormGroup({
      "name": new FormControl("", [Validators.required, Validators.minLength(3)]),
      "password": new FormControl("", [Validators.required, Validators.minLength(5)]),
    })

    this._userService.getUserFromServer().subscribe({
      next: (res) => {
        this.usersList = res
        console.log(this.usersList)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  onSubmit() {
    const newUser = this.usersList?.find(u => u.name === this.addForm.value.name) || null;
    if (newUser != null) {
      if (this.addForm.value.password == newUser.password) {
        sessionStorage.setItem('name', newUser.name);
        sessionStorage.setItem('password', newUser.password);
        Swal.fire({
          icon: "success",
          title: "Successfully identified",
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['../'+'/all-recipes'], { 
          relativeTo: this.activatedRoute
        })
      this.addForm.controls['name'].setValue('');
        this.addForm.controls['password'].setValue('');
      }
      else {
        console.log("error password");
        Swal.fire({
          title: "wrong password ",
          text: "please try again",
          icon: "error",
          showConfirmButton: false,
          timer: 3000
        });
        this.addForm.controls['password'].setValue('');
      }
    }
    else {
      this.router.navigate(['../'+'/register'], { 
        relativeTo: this.activatedRoute,
        queryParams: { name: this.addForm.value.name } 
      })
      this.addForm.controls['name'].setValue('');
      this.addForm.controls['password'].setValue('');
    }

  }
}


