import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../model/product.model';
import { WishList } from '../model/wislist.model';
import { GuardGuard } from '../service/guard/guard.guard';
import { ProductService } from '../service/product/product.service';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss']
})
export class ViewWishlistComponent implements OnInit {

  wishList:WishList[]
  products: Product[]
  constructor(
    private productService:ProductService,
    private authService:GuardGuard,
    private sanitizer: DomSanitizer,
    public checkAuthService:GuardGuard
  ) { }

  ngOnInit(): void {
    this.getWishList()
  }

  getWishList(){
    this.productService.getWishlist(this.authService.getToken()).subscribe(res=>{
      console.log(res)
      // this.wishList=res
      
      res.forEach(data=>{

        let objectURL = 'data:image/jpeg;base64,' + data.product.primaryImage;
      data.product.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
        

       
      })
      
      this.wishList=res
      this.products=this.products
    },error=>{

    })
  }

  changeImageFormat(res: Product) {
    // res.forEach(product => {
      let objectURL = 'data:image/jpeg;base64,' + res.primaryImage;
      res.primaryImage = this.sanitizer.bypassSecurityTrustUrl(objectURL)
    // })
    return res
  }

  removeFromWishList(wislist:WishList){
    this.productService.removeFromWishList(this.authService.getToken(),wislist.wishlistId).subscribe(res=>{
      this.ngOnInit();
    },error=>{

    })
  }

  editWish(){

  }
  deleteWish(){

  }
}
