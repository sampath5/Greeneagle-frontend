import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product.model';
import { GuardGuard } from '../service/guard/guard.guard';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  cartCount = 0
  addTocartBtn: boolean
  productId: number
  product: Product
  constructor(
    private activatedRoute: ActivatedRoute,
    public checkAuthorization: GuardGuard,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private toast: ToastrService
  ) {
    this.addTocartBtn = false
  }

  ngOnInit(): void {
    // this.getCartCount()
    if(this.checkAuthorization.isLogin()){
      this.activatedRoute.params.subscribe((params: Params) => {
        this.productId = params['productId'];
        if (this.productId != undefined) {
          if (this.checkAuthorization.isAdmin()) {
            this.productService.getProductForAdmin(this.checkAuthorization.getToken(), this.productId).subscribe(res => {
              this.product = res
              let objectURL = 'data:image/jpeg;base64,' + this.product.primaryImage;
              this.product.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
  
              console.log(res)
            }, error => {
  
            })
          } else {
            this.productService.getProductById(this.checkAuthorization.getToken(), this.productId).subscribe(res=>{
              let objectURL = 'data:image/jpeg;base64,' + res.primaryImage;
              res.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
              this.product=res
            },error=>{
  
            })
            this.productService.getCartDetails(this.checkAuthorization.getToken()).subscribe(res => {
              console.log()
              res.forEach(cart => {
                if (cart.prod.productId == this.productId) {
  
                  if (cart.prod.quantity <= cart.quantity) {
                    cart.prod.active = false
                  } else {
                    cart.prod.active = true
                  }
                  this.product = cart.prod
                  console.log(cart.prod)
                  let objectURL = 'data:image/jpeg;base64,' + this.product.primaryImage;
                  this.product.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
                }
              })
            }, error => {
              console.log(error)
            })
          }
        }
      })
      this.getCartDetails()
    }else{
      window.location.href='https://eaglestore-frontend.herokuapp.com/';
    }
    
  }

  addToCart(product: Product) {
    console.log("dsdsds")
    this.productService.addToCart(this.checkAuthorization.getToken(), product.productId).subscribe(res => {
      console.log("asdasd" + res)

      this.toast.success("Product added to Cart!!", "Cart Details")
      this.ngOnInit()
    }, error => {
      console.log(error)
      this.ngOnInit()
    })
  }

  getCartCount() {
    this.productService.getCartCount(this.checkAuthorization.getToken()).subscribe(res => {
      // this.cartCount=res
    }, error => {

    })
  }

  getCartDetails() {
    this.productService.getCartDetails(this.checkAuthorization.getToken()).subscribe(res => {
      console.log()
      res.forEach(cart => {
        if (cart.prod.productId == this.productId) {
          if (cart.prod.quantity <= cart.quantity) {
            this.addTocartBtn = true
          } else {
            this.addTocartBtn = false
          }
        }
      })
    }, error => {
      console.log(error)
    })
  }

  addToWishList(product:Product){
    this.productService.addToWishList(this.checkAuthorization.getToken(),product.productId).subscribe(res=>{
      this.toast.success('Successfully added to WishList!!!','EagleStore WishList')
    },error=>{

    })
  }

}
