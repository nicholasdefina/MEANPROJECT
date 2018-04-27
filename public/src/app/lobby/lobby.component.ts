import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  users;
  scores;
  session;
  username;

  constructor(private _userService:UserService, private _router:Router) { }

  ngOnInit() {
    this.getUsers();
    this.getScores();
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
    console.log(data),
    this.scores = data})
  }

  logout(){
    console.log("session cleared!!!!!!")
    let observable = this._userService.logout();
    observable.subscribe(data => {
      console.log(data, "****************************"),
      this.scores = data})
      localStorage.clear();
    this._router.navigateByUrl('')
    
    }

  }


