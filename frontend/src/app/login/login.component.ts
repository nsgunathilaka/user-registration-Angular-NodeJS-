import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:any = FormGroup;
  submitted = false;
  responseMessage: any;


  constructor(private formBuilder : FormBuilder, private userService : UserService, private router : Router) { }

  ngOnInit(): void {

    const token = localStorage.getItem('userId');
    if(token) {
      this.router.navigate(["/dashboard"])
    }


    this.loginForm = this.formBuilder.group({
      username : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
    })
  }

  onSubmit() {
     this.submitted = true;

     if(this.loginForm.invalid) {
      return
     }

     var formData = this.loginForm.value;
     var data = {
      email : formData.username,
      password : formData.password
     }


     console.log(data)

     this.userService.login(data).subscribe((response:any) => {
      localStorage.setItem('userId',response.id)
      this.router.navigate(['/dashboard'])

        console.log(response)
     },(error:any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error?.error
      })
     })
  }

}
