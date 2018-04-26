import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  first;
  last;
  email;
  password;
  message;
  confirm;
  userid;
  logemail;
  logpassword;
  session;

  constructor(private _userService:UserService, private _router:Router) { }

  ngOnInit() 
  {
    this.checksession();
  }


  checksession(){
    this.session = localStorage.getItem("email")
    console.log(this.session)
    if(this.session != null && this.session !="undefined")
    {
      this._router.navigateByUrl('lobby');
    }
  }


  

  createUser(){
    console.log(this.password)
    console.log(this.confirm)
    this._userService.createUser(this.first, this.last, this.email, this.password, this.confirm).then((data=>{
      console.log(data, "this is component data")
      if(data['message']=='success'){
        this.userid = data['user']['_id'];
        this._userService.setID(this.userid);
        var temp = this._userService.getID();
        var check = this._userService.checkID(this.userid);
        localStorage.setItem("email", this.email )
        // this.session = sessionStorage.getItem("email")
        console.log(this.session)
        check.subscribe(data => {
          console.log(data);
          console.log(data['_body']);
        })
        
        this._router.navigateByUrl('lobby')
      }
      else
      {
        this.message = "Could not be saved. Please try again."
      }
    }))
  }

  logout(){
    localStorage.clear();
    
    }

  login(){
    this._userService.login(this.logemail, this.logpassword).then((data=>{
      console.log(data, "this is component data for login")
      if(data['message']=='success'){
        this.userid = data['user']['id'];
        this._userService.setID(this.userid);
        var temp = this._userService.getID();
        var check = this._userService.checkID(this.userid);
        localStorage.setItem("email", this.logemail)
        console.log(this.session)
        check.subscribe(data => {
          console.log(data);
          console.log(data['_body'])
        })
        this._router.navigateByUrl('lobby')
      }
      else
      {
        this.message = "Could not be logged in. Please try again."
      }
    }))
  }



}
