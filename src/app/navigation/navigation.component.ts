import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../service/user/signup.service';
import { Z_ERRNO } from 'zlib';
import { ProductService } from '../service/product/product.service';
import { GuardGuard } from '../service/guard/guard.guard';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  loginBtnState = false
  signupBtnState = false
  showLoginBtn = true
  showViewOrdersBtn=false
  showSignupBtn = true
  showEditMyProfileBtn = false
  showLogoutBtn = false
  showListUsersBtn = false
  showViewProductsBtn = false
  viewAddProductState = false
  showAddProductBtn = false
  showViewCartBtn = false
  showCheckOutBtn = false
  viewCheckOutState = false
  showWishListBtn=false
  viewWishListBtn=false
  cartQuantity = 0;
  returnUrl: any

  modelRefLogin: MdbModalRef<LoginComponent> | null = null;
  constructor(
    private modalService: MdbModalService,
    private userService: UserService,
    public router: Router,
    public route: ActivatedRoute,
    public productService: ProductService,
    public checkAuthorization: GuardGuard
  ) {


  }

  reload() { this.ngOnInit(); }


  ngOnInit(): void {
    this.viewOrders()
    this.cartQuantity = 0;
    this.getCartDetails()
    console.log(this.router.url + "lll")
    let params = this.route.snapshot.queryParams;
    if (this.router.url == "/viewProducts") {
      this.showViewProductsBtn = false
    } else if (this.router.url == "/") {
      this.showViewProductsBtn = false
    } else {
      this.showViewProductsBtn = true
    }
    if (this.router.url == "/viewCart") {
      this.showViewCartBtn = false
    } else {
      this.showViewCartBtn = true
    }
    if (this.router.url == "/viewOrders") {
      this.showViewOrdersBtn = false
    } else {
      this.showViewOrdersBtn = true
    }
    if (this.router.url == "/checkout") {
      this.showCheckOutBtn = false
    }else{
      this.showCheckOutBtn = true
    }
    console.log(localStorage.length)
    if (localStorage.length > 0) {

      console.log(localStorage.length + " is grater than zero")
      this.showLoginBtn = false
      this.showSignupBtn = false
      this.showEditMyProfileBtn = true
      this.showLogoutBtn = true
      this.showViewCartBtn = true
      if (localStorage.getItem('role') == "ADMIN") {
        this.showViewCartBtn = false
        this.showListUsersBtn = true
        this.showAddProductBtn = true
        this.showCheckOutBtn = false
        this.showWishListBtn=false
        
      this.showViewOrdersBtn=false
      } else {
        this.showCheckOutBtn = true
        this.showViewCartBtn = true
        this.showListUsersBtn = false
        this.showAddProductBtn = false
        this.showWishListBtn=true
        this.showViewOrdersBtn=true
        if (this.router.url == "/viewCart") {
          this.showViewCartBtn = false
        }
        if (this.router.url == "/checkout") {
          this.showCheckOutBtn = false
        }
        if (this.router.url == "/viewOrders") {
          this.showViewOrdersBtn = false
        }
        if (this.router.url == "/viewWishlist") {
          this.showWishListBtn = false
        }
        if (this.router.url == "/checkout") {
          this.showWishListBtn = false
        }
      }
    } else {

      console.log(localStorage.length + " is less than zero")
      this.showLoginBtn = true
      this.showViewCartBtn = false
      this.showSignupBtn = true
      this.showEditMyProfileBtn = false
      this.showLogoutBtn = false
      this.showListUsersBtn = false
      this.showAddProductBtn = false
      this.showViewOrdersBtn=false
    }
  }

  public refreshNav() {
    this.ngOnInit();
    return true
  }

  addProduct() {
    this.router.navigate(['addProduct']);
  }


  openLogin() {
    this.loginBtnState = true;
    this.modelRefLogin = this.modalService.open(LoginComponent)
    this.modelRefLogin.onClose.subscribe(data => {
      this.loginBtnState = false
      if (localStorage.getItem('jwt').length > 0) {
        this.ngOnInit()
        let params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
          this.returnUrl = params['redirectURL'];
        }
        this.router.navigateByUrl(this.returnUrl)
        window.location.href="https://eaglestore-frontend.herokuapp.com/"+this.returnUrl
      }
    })

  }

  openSignup() {
    this.signupBtnState = true;
    this.modelRefLogin = this.modalService.open(SignupComponent)
    this.modelRefLogin.onClose.subscribe(data => {
      this.signupBtnState = false
    })
  }

  listUsers() {
    this.showListUsersBtn = false
    this.router.navigate(['userList']);
    this.showListUsersBtn = false
  }

  viewProducts() {
    this.router.navigate(['viewProducts']);
  }

  viewCart() {
    this.router.navigate(['viewCart']);
  }

  editMyProfile() {
    this.modelRefLogin = this.modalService.open(EditProfileComponent)
  }

  logout() {
    localStorage.clear();
    this.ngOnInit();
    this.router.navigate(['/']);
    window.location.href="https://eaglestore-frontend.herokuapp.com"
  }


  getCartDetails() {
    if (!this.checkAuthorization.isAdmin()) {
      this.productService.getCartDetails(this.checkAuthorization.getToken()).subscribe(res => {
        res.forEach(cart => {
          this.cartQuantity = this.cartQuantity + cart.quantity
        })
      }, error => {

      })
    }
  }

  viewOrders(){
    if(!this.checkAuthorization.isAdmin()){
      this.userService.getOrders(this.checkAuthorization.getToken()).subscribe(res=>{
        if(res.length>0){
          this.showViewOrdersBtn=true
        }else{
          this.showViewOrdersBtn=false
        }
        if (this.router.url == "/viewOrders") {
          this.showViewOrdersBtn = false
        }
      })
    }
  }
}
