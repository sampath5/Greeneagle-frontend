import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CancelOrder } from '../model/orderCancel.model';
import { UserOrders } from '../model/userOrders.model';
import { UserTransaction } from '../model/userTransactions.module';
import { GuardGuard } from '../service/guard/guard.guard';
import { UserService } from '../service/user/signup.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    public authCheck: GuardGuard,
    public userService: UserService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  userOrders: UserOrders[]
  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });
  ngOnInit(): void {
    if (this.authCheck.isLogin()) {
      if (!this.authCheck.isAdmin()) {

        this.viewUserTransactions()
        this.userService.getOrders(this.authCheck.getToken()).subscribe(res => {
          res.forEach(data => {
            // if (data.status) {
            //   this.userOrders.push(data)
            // }
            data.productList.forEach(da => {
              let objectURL = 'data:image/jpeg;base64,' + da.product.primaryImage;
              da.product.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
            })
          })
          this.userOrders=res
          console.log(this.userOrders)
        }, error => {
          console.log(error)
        })
      } else {
        this.userService.getOrdersByUserId(this.authCheck.getToken(), this.activatedRoute.snapshot.params['id']).subscribe(res => {
          this.viewUserTransactionsById(this.activatedRoute.snapshot.params['id']);
          res.forEach(data => {
            // if (data.status) {
            //   this.userOrders.push(data)
            // }
            data.productList.forEach(da => {
              let objectURL = 'data:image/jpeg;base64,' + da.product.primaryImage;
              da.product.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
            })
          })
          this.userOrders=res
          console.log(this.userOrders)
        }, error => {
          console.log(error)
        })


      }
    } else {

    }

  }

  cancelOrder(invoice: UserOrders) {
    var cOrder: CancelOrder
    var c = { cancellationReason: 'sdsad', invoiceId: invoice.invoiceId }
    this.userService.cancelOrders(this.authCheck.getToken(), c).subscribe(res => {
      console.log(res)
      this.ngOnInit();
    }, error => {
      console.log(error)
    })
  }

  userTransactions:UserTransaction[]
  viewUserTransactions() {
    this.userService.viewUserTransactions(this.authCheck.getToken()).subscribe(res => {
      this.userTransactions=res
      this.userTransactions.forEach(rr=>{
        rr.productQuantity=0
        rr.orders.forEach(order=>{
          rr.productQuantity=rr.productQuantity+order.quantity
        })
      })
      console.log(res)
    }, error => {
      console.log(error)
    })
  }

  viewUserTransactionsById(id){
    this.userService.viewUserTransactionsById(this.authCheck.getToken(),id).subscribe(res => {
      this.userTransactions=res
      this.userTransactions.forEach(rr=>{
        rr.productQuantity=0
        rr.orders.forEach(order=>{
          rr.productQuantity=rr.productQuantity+order.quantity
        })
      })
      console.log(res)
    }, error => {
      console.log(error)
    })
  }
}
