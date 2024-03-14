import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserModule } from '../../user.module';
import { User } from '../../../models/user.model';
import { UserService } from '../../user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public addForm!: FormGroup;
  private id: number = 10;
  private listUser: User[] = []
  constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private _userService: UserService, private elRef: ElementRef) { }
  ngOnInit(): void {
    this._userService.getUserFromServer().subscribe({
      next: (res) => {
        this.listUser = res
        console.log(this.listUser)
      },
      error: (err) => {
        console.log(err);
      }
    })
    const name = this.route.snapshot.queryParamMap.get('name');
    this.addForm = this.formBuilder.group({
      id: [this.id + 2], // Assuming id needs to be set based on some logic
      name: [name || '', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.id = this.id + 2;
  }
  save() {
    let u: User = this.addForm.value

    let f = this.listUser?.find(z => z.name == this.addForm.value.name &&  z.password == this.addForm.value.password) || null;
    if (f != null) {
      Swal.fire({
        title: "Error ",
        text: "The client already exists in the system",
        icon: "error",
        showConfirmButton: false,
        timer: 3000
      });
    }
    else {
      this._userService.addUser(u).subscribe({
        next: (res) => {
          sessionStorage.setItem('name', this.addForm.value.name);
          sessionStorage.setItem('password', this.addForm.value.password);
          this.router.navigate(['../'+'/all-recipes'], { 
            relativeTo: this.route,
          })
         
          console.log(res);
        },
        error: (err) => {
          console.log(err);

        }
      })
    }
  }
}

