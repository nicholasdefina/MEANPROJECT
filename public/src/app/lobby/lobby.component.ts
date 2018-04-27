import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { GameComponent } from '../game/game.component';
import { ListComponent } from '../list/list.component';
import * as io from "socket.io-client";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  typing;
  joined;
  users;
  scores;
  session;
  userid;
  gameOn;
  username;
  user: String;
  room: String;
  messageText: String;
  messageArray: Array<{ user: String, message: String }> = [];

  constructor(private _userService:UserService, private _router:Router) { 
    this._userService.newUserJoined()
    .subscribe(data => this.messageArray.push(data));

  this._userService.userLeftRoom()
    .subscribe(data => this.messageArray.push(data));

  this._userService.newMessageReceived()
    .subscribe(data => this.messageArray.push(data));

  this._userService.type(this.user)
    .subscribe(data => this.messageArray.push(data));

    this._userService.removeTyping().subscribe(data=>this.messageArray.pop())
   }

  ngOnInit() {
    this.user='';
    this.messageText='';
    this.typing = false;
    this.joined = false;
    this.room = "Lobby Chat";
    this.gameOn = false;
    this.getUsers();
    this.getScores();
    this.userid = localStorage.getItem("userid")
    this.session = localStorage.getItem("username")
    console.log(this.session)
  }
  getUsers(){
    let observable = this._userService.getUsers();
    observable.subscribe(data => {
    console.log(JSON.parse(data['_body'])['data'])  //turns whole string into json object
    console.log("This get users$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"),
    this.users = JSON.parse(data['_body'])['data']})
  }
  getScores(){
    let observable = this._userService.getScores();
    observable.subscribe(data => {
    console.log(JSON.parse(data['_body'])['data']),
    this.scores = JSON.parse(data['_body'])['data']})
  }

  logout(){
    console.log("session cleared!!!!!!")
    let observable = this._userService.logout(this.session);
    observable.subscribe(data => {
      console.log(data, "****************************"),
      this.scores = data})
      localStorage.clear();
    this._router.navigateByUrl('')
    
    }
    openGame(){
      this.gameOn = true;
    }
    closeGame(){
      this.gameOn = false;
    }

    join() {
      this.joined = true;
      this._userService.joinRoom({ user: this.user, room: this.room });
    }
  
    leave() {
      this.joined = false;
      this._userService.leaveRoom({ user: this.user, room: this.room });
    }
  
    sendMessage() {
      this._userService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
      this.messageText = "";
    }
    type(){
      this._userService.type({user:this.user});
    }
  }


