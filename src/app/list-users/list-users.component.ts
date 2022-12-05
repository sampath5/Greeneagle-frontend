import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user.model';
import { Users } from '../model/users.model';
import { GuardGuard } from '../service/guard/guard.guard';
import { UserService } from '../service/user/signup.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  showUserList = false
  users: User[]
  constructor(
    private userService: UserService,
    private toast: ToastrService,
    public router: Router,
    public auth:GuardGuard
  ) {
    if (localStorage.getItem('role').toString() == "ADMIN") {
      this.showUserList = true
    }
    var token = "Bearer " + localStorage.getItem('jwt')
    this.getUsersList(token)
  }

  ngOnInit(): void {
    if (localStorage.getItem('ADMIN')) {
      this.showUserList = true
    }
  }

  getUsersList(token) {
    this.userService.getUserList(token).subscribe(data => {
      console.log(data)
      this.users = data
    },error=>{
      if(error["status"]==401){
        this.toast.error("Please Logout and login Again...")
      }
    })
  }

  fetchOrdrs(user: Users) {
    console.log(user)
    this.router.navigate(['viewOrders/'+user.userId]);
  }
  getUserDetails(token){
    this.userService.getUserDetails(token).subscribe(data => {
      console.log(data)
    })
  }

  enableUser(user:Users){
    console.log(user)
    this.userService.activateUser(this.auth.getToken(),user.userId).subscribe(res=>{      
      this.getUsersList(this.auth.getToken());
    },error=>{

    })
  }

  disableUser(user:Users){
    this.userService.inActivateUser(this.auth.getToken(),user.userId).subscribe(res=>{      
      this.getUsersList(this.auth.getToken());
    },error=>{

    })
  }
}
