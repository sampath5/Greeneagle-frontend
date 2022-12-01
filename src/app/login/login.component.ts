import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginUser } from '../model/login.model';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../service/user/signup.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modalRefLogin: MdbModalRef<LoginComponent> | null = null;
  modelRefSignup: MdbModalRef<SignupComponent> | null = null;
  user: LoginUser;
  loginForm: any;
  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  returnUrl: any

  constructor(
    public modalRef: MdbModalRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: ToastrService,
    public router: Router,
    public route: ActivatedRoute,
    private modalService: MdbModalService) {

    this.user = new LoginUser("", "");
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16), Validators.pattern(this.strongRegex)]],
      });
  }

  openSignup() {
    this.modalRef.close()
    this.modelRefSignup = this.modalService.open(SignupComponent)
  }

  login() {
    this.user.email = this.loginForm.get('email').value;
    this.user.password = this.loginForm.get('password').value;
    this.userService.login(this.user).subscribe(data => {
      if (data.statusCode == 'ACCEPTED') {
        this.toast.success('Sucessfully Logged In!!', 'User Login')
        localStorage.clear();
        localStorage.setItem('jwt', data.jwtToken);
        localStorage.setItem('role', data.role);
        this.modalRef.close()
        let params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
          this.returnUrl = params['redirectURL'];
        }
        this.router.navigateByUrl(this.returnUrl,)
      }
    }, error => {
      this.toast.error("Please Enter Valid User Credientials", 'User Login')
    })
  }
}
