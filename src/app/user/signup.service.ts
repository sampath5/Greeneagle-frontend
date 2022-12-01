import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupUser } from '../model/signup.compoment';
import { Constants } from '../Constants';
import { Response } from '../model/response.model';
import { LoginUser } from '../model/login.model';
import { LoginResponse } from '../model/loginResponse.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  signUp(user:SignupUser){
    return this.http.post<Response>(Constants.endPoint.user.signup,user);
  }

  login(user:LoginUser){
    return this.http.post<LoginResponse>(Constants.endPoint.user.login,user);
  }

  getUserList(token){
    return this.http.get<User[]>(Constants.endPoint.admin.getUsersList,{
      headers: {'Authorization':token}
    });
  }
}
