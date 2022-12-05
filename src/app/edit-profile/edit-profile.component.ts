import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user.model';
import { GuardGuard } from '../service/guard/guard.guard';
import { UserService } from '../service/user/signup.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userId: string
  user: any
  updateForm: any;
  modalRefEditProfile: MdbModalRef<EditProfileComponent> | null = null;

  constructor(
    public modalRef: MdbModalRef<EditProfileComponent>,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private checkAuthorization:GuardGuard,
    private toast: ToastrService
  ) {
    this.user = new User("", "", "", "", "", "", "", "", "", "", false,false);
    var token = "Bearer " + localStorage.getItem('jwt')
    this.getUserDetails(token)
    this.userService.validateUser(token).then(res => {
      this.updateForm = this.formBuilder.group({
        firstName: [res.firstName, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
        lastName: [res.lastName, [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z \-\']+')]],
        phone: [res.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9 \-\']+')]],
      })
    }).catch(error => {

    })
    this.updateForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z \-\']+')]],
      // email: ['', [Validators.required, Validators.email]],
      //password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.strongRegex)]],
      //confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9 \-\']+')]],
      // aptNo: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9a-zA-Z \-\']+')]],
      // street: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
      // city: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
      // state: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
      // zipcode: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9][0-9 \-\']+')]]
    })
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id']
    if (this.userId != null) {
      // this.userService.
    }
  }
  getUserDetails(token) {
    this.userService.getUserDetails(token).subscribe(data => {
      console.log(data);
      this.user = data
    })

  }
  editProfile() {
    this.userService.editUserDetails(this.checkAuthorization.getToken(),this.updateForm.value).subscribe(res=>{
      console.log(this.updateForm.value)
      this.toast.success("Profile updated successfully","Update My Profile")
      this.modalRef.close()
    },error=>{
      console.log(this.updateForm.value)
      console.log(error)
      this.toast.error("Error While Updating Profile","Update My Profile")
    })
  }
}
