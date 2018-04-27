import { Injectable } from '@angular/core';
import {Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class UserService {
  userid;
  typing_timer_length = 400;
  fade_time = 150;
  typing = false;
  lastTypingTime;
  typingTimer;
  timeDiff;
  constructor(private _http: Http) { }
  private socket = io('http://localhost:8000')
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

  logout(username){
    console.log(username)
    console.log("in the service for logout")
  return this._http.get('/api/users/logout/'+username)
  }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  type(data){
    this.updateTyping();
    this.socket.emit('type', data)
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }

  newMessageReceived() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });

    return observable;
  }
  updateTyping(){
    if(!this.typing){
      this.typing = true;
      this.socket.emit('type')
    }
    this.lastTypingTime = (new Date().getTime());

    setTimeout(function(){
      this.typingTimer = (new Date().getTime());
      this.timeDiff = this.typingTimer - this.lastTypingTime;

      if(this.timeDiff >= this.typing_timer_length && this.typing){
        this.socket.emit('stop typing');
        this.typing = false;
      }
    }, this.typing_timer_length)
  }
  removeTyping(){
    console.log("removeType!!")
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('stop typing', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }
}
