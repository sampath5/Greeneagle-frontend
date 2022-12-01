import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/app/Constants';
import { Cart } from 'src/app/model/cart.model';
import { Product } from 'src/app/model/product.model';
import { WishList } from 'src/app/model/wislist.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(Constants.endPoint.user.getProducts)
  }

  getAllProducts(token){
    return this.http.get<Product[]>(Constants.endPoint.admin.getAllProducts, {
      headers: { 'Authorization': token }
    })
  }

  getProductForAdmin(token,id){
    return this.http.get<Product>(Constants.endPoint.admin.getProductById+id,{
      headers: { 'Authorization': token }
    })
  }

  getProductById(token,id){
    return this.http.get<Product>(Constants.endPoint.user.getProductById+id,{
      headers: { 'Authorization': token }
    })
  }

  activateProduct(token,id){
    return this.http.post(Constants.endPoint.admin.activateProduct+id,{
      headers: { 'Authorization': token }
    })
  }

  inActivateProduct(token,id){
    return this.http.post(Constants.endPoint.admin.inActivateProduct+id,{
      headers: { 'Authorization': token }
    })
  }

  addToCart(token,id){
    return this.http.post(Constants.endPoint.user.addToCart+id,null,{
      headers: { 'Authorization': token }
    })
  }

  removeFromCart(token,id){
    return this.http.post(Constants.endPoint.user.removeFromCart+id,null,{
      headers: { 'Authorization': token }
    })
  }

  removeProductFromCart(token,id){
    return this.http.post(Constants.endPoint.user.removeProductFromCart+id,null,{
      headers: { 'Authorization': token }
    })
  }

  getCartCount(token){
    return this.http.get<number>(Constants.endPoint.user.getCartCount,{
      headers: { 'Authorization': token }
    })
  }
  
  getCartDetails(token){
    return this.http.post<Cart[]>(Constants.endPoint.user.getCartList,null,{
      headers: { 'Authorization': token }
    })
  }

  getWishlist(token){
    return this.http.post<WishList[]>(Constants.endPoint.user.viewWishList,null,{
      headers: { 'Authorization': token }
    })
  }

  addToWishList(token,id){
    return this.http.post<Cart[]>(Constants.endPoint.user.addToWishList+id,null,{
      headers: { 'Authorization': token }
    })
  }

  removeFromWishList(token,id){
    return this.http.post(Constants.endPoint.user.removeFromWishList+id,null,{
      headers: { 'Authorization': token }
    })
  }

  addProduct(token,product){
    return this.http.post(Constants.endPoint.admin.addProduct,product,{
      headers: { 'Authorization': token }
    })
  }
}
