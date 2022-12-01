import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginComponent } from '../login/login.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  modelRefLogin: MdbModalRef<LoginComponent> | null = null;

  constructor(
    public route: ActivatedRoute,
    private modalService: MdbModalService,
    public router: Router,
    private nav: NavigationComponent
  ) {
    this.nav.refreshNav()
    let params = this.route.snapshot.queryParams;
    if (params['redirectURL']) {
      if (this.nav.refreshNav()) {
        this.openLogin();
      }
    }
  }

  ngOnInit(): void {
  }

  openLogin() {
    let params = this.route.snapshot.queryParams;
    this.modelRefLogin = this.modalService.open(LoginComponent)
    this.modelRefLogin.onClose.subscribe(data => {
      this.nav.refreshNav()
      if (localStorage.length > 0) {
        this.router.navigateByUrl(params['redirectURL'],)
      }
    }, error => {

    })
  }

}
