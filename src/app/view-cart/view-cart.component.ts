import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Cart } from '../model/cart.model';
import { Product } from '../model/product.model';
import { GuardGuard } from '../service/guard/guard.guard';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  cartDetails: Cart[]
  cartCount:number
  constructor(
    public checkAuthorization: GuardGuard,
    private productService: ProductService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.cartCount=0
    this.viewCart()
  }

  viewCart() {
    this.productService.getCartDetails(this.checkAuthorization.getToken()).subscribe(res => {
      console.log(res)
      res.forEach(cart => {
        this.cartCount=this.cartCount+cart.quantity
        let objectURL = 'data:image/jpeg;base64,' + cart.prod.primaryImage;
        cart.prod.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
      })
      this.cartDetails = res
    }, error => {

    })
  }

  addToCart(product: Product) {
    this.productService.addToCart(this.checkAuthorization.getToken(), product.productId).subscribe(res => {
      this.ngOnInit()
    }, error => {

    })
  }

  removeFromCart(cart: Cart) {
    this.productService.removeFromCart(this.checkAuthorization.getToken(), cart.cartId).subscribe(res => {
      this.ngOnInit()
    }, error => {

    })
  }

  removeProduct(cart:Cart){
    this.productService.removeProductFromCart(this.checkAuthorization.getToken(),cart.cartId).subscribe(res=>{
      this.ngOnInit()
    },error=>{

    })
  }

}
