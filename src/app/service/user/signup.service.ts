import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupUser } from '../../model/signup.compoment';
import { Constants } from '../../Constants';
import { Response } from '../../model/response.model';
import { LoginUser } from '../../model/login.model';
import { LoginResponse } from '../../model/loginResponse.model';
import { User } from '../../model/user.model';

import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address.model';
import { UserOrders } from 'src/app/model/userOrders.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  signUp(user: SignupUser) {
    return this.http.post<Response>(Constants.endPoint.user.signup, user);
  }

  login(user: LoginUser) {
    return this.http.post<LoginResponse>(Constants.endPoint.user.login, user);
  }

  getUserList(token) {
    return this.http.get<User[]>(Constants.endPoint.admin.getUsersList, {
      headers: { 'Authorization': token }
    });
  }
  getUserDetails(token) {
    return this.http.get<User>(Constants.endPoint.user.getUserDetails, {
      headers: { 'Authorization': token }
    });
  }

  editUserDetails(token,user){
    return this.http.put(Constants.endPoint.user.updatedetails,user, {
      headers: { 'Authorization': token }
    })
  }
  async validateUser(token):Promise<User> {
    return new Promise((resolve,reject)=>{
      return this.http.get<User>(Constants.endPoint.user.getUserDetails, {
        headers: { 'Authorization': token }
      }).subscribe(res=>{
        return resolve(res)
      },error=>{
        reject(error)
      })
    })
  }

  getAddress(token){
    return this.http.get<Address[]>(Constants.endPoint.user.getUserAddresses, {
      headers: { 'Authorization': token }
    });
  }

  addUserAdddress(token,address){
    return this.http.post<Address>(Constants.endPoint.user.addAddress,address, {
      headers: { 'Authorization': token }
    })
  }

  payment(token,addressId){
    return this.http.post<string>(Constants.endPoint.user.payment+addressId,null, {
      headers: { 'Authorization': token }
    })
  }

  paypalSuccess(userToken,paymentId,PayerId,token){
    return this.http.post<boolean>(Constants.endPoint.user.paypalSuccess+'?paymentId='+paymentId+'&token='+token+'&PayerID='+PayerId,null, {
      headers: { 'Authorization': userToken }
    })
  }

  getOrders(token){
    return this.http.get<UserOrders[]>(Constants.endPoint.user.getorders, {
      headers: { 'Authorization': token }
    })
  }

  getOrdersByUserId(token,id){
    return this.http.get<UserOrders[]>(Constants.endPoint.admin.getOrdersByUserId+id, {
      headers: { 'Authorization': token }
    })
  }

  cancelOrders(token,cancel){
    return this.http.post<any>(Constants.endPoint.user.cancelOrder,cancel, {
      headers: { 'Authorization': token }
    })
  }
}
