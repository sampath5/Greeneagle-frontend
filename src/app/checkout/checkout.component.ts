import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Address } from '../model/address.model';

import { Cart } from '../model/cart.model';
import { GuardGuard } from '../service/guard/guard.guard';
import { ProductService } from '../service/product/product.service';
import { UserService } from '../service/user/signup.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  addresses:Address[]
  regForm:any
  address
  showAddress:string
  cartDetails: Cart[]
  cartCount:number
  showAddressForm=false
  addressId
  constructor(
    public formBuilder: FormBuilder,
    public userService:UserService,
    public checkAuth:GuardGuard,
    public productService:ProductService,
    private sanitizer: DomSanitizer,
    // private m
  ) { }

  ngOnInit(): void {
    this.viewCart()
    this.getUserAddresses()
    this.regForm = this.formBuilder.group(
      {
        aptNo: ['', [Validators.required, Validators.minLength(1), Validators.pattern('^[0-9a-zA-Z \-\']+')]],
        street: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
        city: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
        state: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z \-\']+')]],
        zip: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^[1-9][0-9 \-\']+')]]

      }
      );
  }

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  getUserAddresses(){
    this.userService.getAddress(this.checkAuth.getToken()).subscribe(res=>{
      console.log(res)
      this.addresses=res
    })
  }

  addAddress(address){
    this.address=address
    console.log(this.regForm.get('aptNo').value)
    this.userService.addUserAdddress(this.checkAuth.getToken(),this.regForm.value).subscribe(res=>{
      // console.log(res)
      this.getUserAddresses()
      this.addressId=res.addressId
      console.log(this.addressId+"->>>>>")
      
      this.showAddress=this.regForm.get('aptNo').value+' ,'+this.regForm.get('street').value+' ,'+this.regForm.get('city').value+' ,'+this.regForm.get('state').value+' ,'+this.regForm.get('zip').value
      this.secondFormGroup.patchValue({secondCtrl:this.showAddress})
    },error=>{
      console.log(error)
    })
    // console.log(this.saddress)
  }
  selectAddress(){
    console.log(this.firstFormGroup.value.firstCtrl)
    if(this.firstFormGroup.value.firstCtrl=="addNewAddress"){

      this.showAddressForm=true;
    }else{
      this.address=this.firstFormGroup.value.firstCtrl
      this.addresses.forEach(data=>{
        if(data.addressId==this.address){
          this.addressId=data.addressId
          this.showAddress=data.aptNo+' ,'+data.street+' ,'+data.city+' ,'+data.state+' ,'+data.zip
          this.secondFormGroup.patchValue({secondCtrl:this.showAddress})
        }
      })
    this.showAddressForm=false;
    }
  }

  totalPrice:number
  viewCart() {
    this.totalPrice=0
    this.productService.getCartDetails(this.checkAuth.getToken()).subscribe(res => {
      console.log(res)
      res.forEach(cart => {
        this.totalPrice=this.totalPrice+(cart.quantity*cart.prod.price);
        this.cartCount=this.cartCount+cart.quantity
        let objectURL = 'data:image/jpeg;base64,' + cart.prod.primaryImage;
        cart.prod.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
      })
      this.cartDetails = res
    }, error => {

    })
  }

  payment(){
    this.userService.payment(this.checkAuth.getToken(),this.addressId).subscribe(res=>{
      console.log(res.link)
      var data=res.link
      window.location.href = data.toString()
    },error=>{
      console.log(error)
    })

  }
}
