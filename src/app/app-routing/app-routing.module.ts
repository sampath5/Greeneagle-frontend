import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { LoginComponent } from '../login/login.component';
import { ListUsersComponent } from '../list-users/list-users.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { HomeComponent } from '../home/home.component';
import { GuardGuard } from '../service/guard/guard.guard';
import { ViewProductsComponent } from '../view-products/view-products.component';
import { ViewCartComponent } from '../view-cart/view-cart.component';
import { ViewProductComponent } from '../view-product/view-product.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { ViewWishlistComponent } from '../view-wishlist/view-wishlist.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { PaypalComponent } from '../paypal/paypal.component';
import { ViewOrdersComponent } from '../view-orders/view-orders.component';

const routes: Routes = [

  { path: 'userList', component: ListUsersComponent, canActivate: [GuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'editProfile/:id', component: EditProfileComponent, canActivate: [GuardGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'viewProducts', component:ViewProductsComponent, canActivate: [GuardGuard]},
  { path: '', component: ViewProductsComponent },
  { path: 'viewCart', component: ViewCartComponent, canActivate: [GuardGuard] },
  { path: 'viewWishlist', component: ViewWishlistComponent , canActivate: [GuardGuard]},
  {path:'paypal/success',component:PaypalComponent,canActivate:[GuardGuard]},
  { path: 'checkout', component: CheckoutComponent , canActivate: [GuardGuard]},
  { path: 'addProduct', component: AddProductComponent , canActivate: [GuardGuard]},
  { path: 'viewProduct/:productId', component: ViewProductComponent },
  { path: 'viewOrders/:id', component:ViewOrdersComponent, canActivate: [GuardGuard]},
  { path: 'viewOrders', component:ViewOrdersComponent, canActivate: [GuardGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
