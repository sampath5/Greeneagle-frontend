import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginComponent } from '../login/login.component';
import { SignupUser } from '../model/signup.compoment';
import { MustMatch } from '../MustMach.component';
import { UserService } from '../service/user/signup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  modalRefLogin: MdbModalRef<LoginComponent> | null = null;
  user: SignupUser;
  regForm: any;
  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  emailFormat = new RegExp("^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

  constructor(
    public modalRef: MdbModalRef<SignupComponent>,
    private modalService: MdbModalService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: ToastrService
  ) {
    this.user = new SignupUser("", "", "", "", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
        lastName: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[a-zA-Z \-\']+')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.strongRegex)]],
        confirmPassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[1-9][0-9 \-\']+')]],
        aptNo: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9a-zA-Z \-\']+')]],
        street: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
        city: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
        state: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
        zipcode: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9][0-9 \-\']+')]]

      }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  openLogin() {
    this.modalRef.close()
    this.modalService.open(LoginComponent)
  }

  get passwordInput() { return this.regForm.get('password'); }
  get confirmPasswordInput() { return this.regForm.get('confirmPassword'); }

  onSubmit() {
    console.log(this.regForm)
    this.user.email = this.regForm.get('email').value;
    this.user.firstName = this.regForm.get('firstName').value;
    this.user.lastName = this.regForm.get('lastName').value;
    this.user.password = this.regForm.get('password').value;
    this.user.phone = this.regForm.get('phone').value;
    this.user.aptNo = this.regForm.get('aptNo').value;
    this.user.street = this.regForm.get('street').value;
    this.user.city = this.regForm.get('city').value;
    this.user.state = this.regForm.get('state').value;
    this.user.zipcode = this.regForm.get('zipcode').value;
    this.userService.signUp(this.user).subscribe(data => {
      if (data.message == "User successfully registered!") {
        this.toast.success('User Registered Successfully', 'User Registation')
        this.openLogin()
      } else {
        this.toast.error('User Email already existing!', 'User Registration');
      }
      console.log(data.message);
    })

  }
}
