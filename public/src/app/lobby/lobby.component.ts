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

  constructor(private _userService:UserService, private _router:Router) { }

  ngOnInit() {
    this.getUsers();
    this.getScores();
    this.session = localStorage.getItem("email")
    console.log(this.session)
  }
  getUsers(){
    let observable = this._userService.getUsers();
    observable.subscribe(data => {
    console.log(JSON.parse(data['_body']))  //turns whole string into json object
    console.log("This get users$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"),
    this.users = data})
  }
  getScores(){
    let observable = this._userService.getScores();
    observable.subscribe(data => {
    console.log(data),
    this.scores = data})
  }

  logout(){
    localStorage.clear();
    console.log("session cleared!!!!!!")
    this._router.navigateByUrl('')
    
    }

    // get user(): any{
    //   return sessionStorage.getItem("email");
    // }
  }

