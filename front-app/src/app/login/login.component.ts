import { Component, OnInit } from '@angular/core';
import {AdduserService} from '../adduser.service'
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup
  // private token = null;
  constructor(private userService : AdduserService,
              private router :Router,
              private route :ActivatedRoute,
              private flashMessages:FlashMessagesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name:     new FormControl(null,[Validators.required,Validators.minLength(3)]),
      email:    new FormControl(null,[Validators.required,Validators.email]),

    })
  }
  sendData(){
    this.form.disable()
    this.userService.auth(this.form.value).subscribe(data =>{
      if(!data.success){
        this.flashMessages.show(data.message,{
          cssClass:'alert-danger',
          timeout:4000
        });
      } else {
        this.flashMessages.show('Auth Completed',{
          cssClass:'alert-success',
          timeout:4000
        })
        this.router.navigate(['/profile']);
        this.userService.storeUser(data.token,data.user)
      }
      // this.setToken(data.data)
      // localStorage.setItem('auth-token',this.token)
      // console.log(this.token)
    });
    // console.log(this.form.value)
  }
  // setToken(token:string){
  //   this.token = token;
  // }
  // getToken(token:string){
  //   return this.token;
  // }
  // isAuthenticated():boolean{
  //   return !!this.token
  // }
  // logOut(){
  //   this.setToken(null)
  //   localStorage.clear()
  // }
}
