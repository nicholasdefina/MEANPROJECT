import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  userid;
  constructor(private _http: Http) { }

  createUser(first,last,email,username,password, confirm){
    console.log("at user service")
    return this._http.post('/api/users/register', {first:first, last:last, email:email, username:username, password:password, confirm:confirm}).map(data =>data.json()).toPromise();
  }
  setID(id){
    this.userid = id;
  }
  getID(){
    return this.userid;
  }
  checkID(id){
    return this._http.get('/api/active/'+id)
  }
  getUsers(){
    return this._http.get('/api/users')
  }
  getScores(){
    return this._http.get('/api/users/scores')
  }

  login(username,password){
    console.log("at user service for login")
    return this._http.post('/api/users/login', {username:username, password:password}).map(data =>data.json()).toPromise();
  }

  logout(){
    console.log("in the service for logout")
  return this._http.delete('/api/users/logout', this.userid)
  }

}
