import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any = FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService : UserService, private router : Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      title: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword : ['',Validators.required]
    });
  }

  onSubmit() {
    console.log(this.registerForm.value.title)
    this.submitted = true;
    var formData = this.registerForm.value;
    var data = {
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      email: formData.email,
      contactNumber: formData.contact,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    }
    console.log(data)
    this.userService.register(data).subscribe((response:any) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: response.message,
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate([""])

    },(error:any) =>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error.message
      })
      console.log(error.error.message)
    })
  }

}
