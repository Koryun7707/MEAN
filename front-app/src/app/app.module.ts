import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AdduserService} from './adduser.service'
import {HttpModule} from "@angular/http";
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';
import {FlashMessagesModule} from "angular2-flash-messages";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgxDropzoneModule} from "ngx-dropzone";
import { LoginComponent } from './login/login.component';
import {RouterModule,Routes} from "@angular/router";
import { ProfileComponent } from './profile/profile.component';
import {IsLoggedIn} from "./isLogged.guard";

const appRoute:Routes = [
  {path:'',component:ProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
    NgxDropzoneModule,
    RouterModule.forRoot(appRoute),




  ],
  providers: [AdduserService,IsLoggedIn,],
  bootstrap: [AppComponent]
})
export class AppModule { }
