import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/product.model';
import { NavigationComponent } from '../navigation/navigation.component';
import { GuardGuard } from '../service/guard/guard.guard';
import { ProductService } from '../service/product/product.service';
import { ViewChild } from "@angular/core";

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  @ViewChild(NavigationComponent, { static: false }) nav: NavigationComponent;

  products: Product[]
  constructor(
    private productService: ProductService,
    public checkAuthService: GuardGuard,
    private sanitizer: DomSanitizer,
    private toast: ToastrService,
    public router: Router
  ) {
    console.log('working ')
  }

  ngOnInit(): void {
    if (localStorage.length > 0) {
      if (localStorage.getItem('role') == "ADMIN") {
        this.productService.getAllProducts(this.checkAuthService.getToken()).subscribe(res => {
          this.products = this.changeImageFormat(res)
        }, error => {

        })
      } else {
        this.productService.getProducts().subscribe(res => {
          this.products = this.changeImageFormat(res)
        }, error => {

        })
      }
    } else {
      this.productService.getProducts().subscribe(res => {
        this.products = this.changeImageFormat(res)
      }, error => {

      })
    }

  }

  changeImageFormat(res: Product[]) {
    res.forEach(product => {
      let objectURL = 'data:image/jpeg;base64,' + product.primaryImage;
      product.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
    })
    return res
  }

  addToCart(product:Product){
    this.productService.addToCart(this.checkAuthService.getToken(), product.productId).subscribe(res => {
      // console.log("asdasd" + res)

      this.toast.success('Successfully added to cart!!!','EagleStore Cart')
      this.nav.reload();
      this.ngOnInit()
      
    }, error => {
      // console.log(error)
      this.ngOnInit()
    })
  }

  addToWishList(product:Product){
    this.productService.addToWishList(this.checkAuthService.getToken(),product.productId).subscribe(res=>{
      this.toast.success('Successfully added to WishList!!!','EagleStore WishList')
    },error=>{

    })
  }

  makeInActivate(product:Product){
    this.productService.inActivateProduct(this.checkAuthService.getToken(),product.productId).subscribe(res=>{
      this.toast.success("Product InActivated Successfully","Product Update")
      this.ngOnInit();
    },error=>{
      this.toast.error("Error while InActivating the Product","Product Update")
    })
  }

  makeActivate(product:Product){
    this.productService.activateProduct(this.checkAuthService.getToken(),product.productId).subscribe(res=>{
      this.toast.success("Product Activated Successfully","Product Update")
      this.ngOnInit();
    },error=>{
      this.toast.error("Error while Activating the Product","Product Update")
    })
  }


  openProduct(product:Product){    
    this.router.navigate(['viewProduct/'+product.productId]);
  }

  onKey(event: any) {
    // without type info
    var value= event.target.value;
    this.products=this.products.filter(p=>{
      // p.includes(value)
      p.productName.toLocaleLowerCase().includes(value)
      // p.productName.search
      // p.productName.search(value)
    })
    console.log(this.products)
  }
  
}
