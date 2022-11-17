import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  firstName:any;
  lastName:any;


  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {


    const token = localStorage.getItem('userId');
    if(!token) {
      this.router.navigate([""])
    }



    var id = localStorage.getItem('userId')

     this.userService.findById(id).subscribe((response:any)=>{
      this.firstName = response.firstName;
      this.lastName = response.lastName;

      console.log(this.firstName)
     },(error:any)=>{

     })

  }

}
