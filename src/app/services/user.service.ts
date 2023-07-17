import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  getUser(username){
    return this.http.get(`${baseUrl}/user/${username}`);
   }

  public updatePassword(username:string,password:string){
    //console.log(username);
    return this.http.put(`${baseUrl}/user/updatePassword/${username}/${password}`,null);
  }

  // public sendOTP(email:email){
  //   return this.http.post(`{baseUrl}/forgot/`,email);
  // }
}
