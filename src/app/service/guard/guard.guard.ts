import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { UserService } from '../user/signup.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  modelRefLogin: MdbModalRef<LoginComponent> | null = null;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<any | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      return this.userService.validateUser(this.getToken()).then(res => {
        // cons

        resolve(true)
      }).catch(error => {
        localStorage.clear()
        resolve(false)
        // this.nav.refreshNav()
        // this.router.navigate([''])
        this.router.navigate(['home'], { queryParams: { 'redirectURL': state.url } });
        console.log(error)

        resolve(false)
        //this.modelRefLogin = this.modalService.open(LoginComponent)
        //this.modelRefLogin.onClose.subscribe(res=>{

        // this.router.navigate([state.url]);
        // },error=>{
        //   resolve(false)
        // })
      })
    })
  }
  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: MdbModalService,
  ) { }
  validateToken() {
    const storageItem = this.getToken().substring(7)
    return this.userService.getUserDetails(this.getToken).subscribe(res => {
      return true
    }, error => {
      return false
    })
  }


  getToken(): string {
    let token = localStorage.getItem("jwt");
    if (token != null) {
      return "Bearer " + token;
    }
    return '';
  }
  isAdmin(): boolean {
    if (localStorage.length > 0) {
      if (localStorage.getItem("role") == "ADMIN") {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  isLogin(){
    if(localStorage.length>0){
      return true
    }
    return false
  }
  logout(): void {
    localStorage.clear()
  }
}
