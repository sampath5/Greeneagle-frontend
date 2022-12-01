import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaypalSuccess } from '../model/paypal.model';
import { GuardGuard } from '../service/guard/guard.guard';
import { UserService } from '../service/user/signup.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private userService:UserService,
    private authCheck:GuardGuard,
    public router: Router,
  ) { }

  paypal:PaypalSuccess
  ngOnInit(): void {
    let paymentId:any
    let payerId:any
    let token:any
    this.route.queryParams.subscribe(p=>{
      paymentId=p.paymentId;
      payerId=p.PayerID;
      token=p.token
      this.userService.paypalSuccess(this.authCheck.getToken(),paymentId,payerId,token).subscribe(res=>{
        console.log(res)
        if(res){
          this.router.navigate(['viewOrders']);
        }
      },error=>{
        console.log(error)
      })
    })
    console.log(payerId)
    console.log(paymentId)
    console.log(token)
    
    // console.log( this.route.snapshot.queryParamMap);
    // this.route.queryParams.subscribe(res=>{
    //   this.paypal.paymentId=res.paymentId
    //   this.paypal.PayerID=res.PayerID
    //   this.paypal.token=res.token
    //   console.log(this.paypal) //will give query params as an object
    // })
    // console.log(this.route.snapshot.paramMap.get('param1'));
    // console.log(this.route.snapshot.paramMap.get('param2'));
    // console.log(this.route.snapshot.paramMap.get('param3'));
    // this.route.queryParams.forEach(params=>param{
    //   console.log(params)
    // })
    // this.route.queryParams.filter(params => params.category)
    //   .subscribe(params => {
    //     console.log(params); // { category: "fiction" }
    //     this.category = params.category;
    //     console.log(this.category); // fiction
    //   }
    //   );
  }



}
