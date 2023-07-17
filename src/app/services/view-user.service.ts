import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';


@Injectable({
  providedIn: 'root'
})
export class ViewUserService {

  constructor(private _http:HttpClient) {
   }
   users(){
    return this._http.get(`${baseUrl}/user/get-all`);
   }
   getuser(id){
    return this._http.get(`${baseUrl}/user/id/${id}`);
   }
   deleteUser(id){
    return this._http.delete(`${baseUrl}/user/${id}`);

   }
   updateUser(user:any){
    // console.log(user)
    return this._http.put(`${baseUrl}/user/up`,user);
   }
   getUserExamDetails(id){
    return this._http.get(`${baseUrl}/userquiz/${id}`);
   }
}
