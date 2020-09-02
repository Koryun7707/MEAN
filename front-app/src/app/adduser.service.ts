import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers} from '@angular/http'
import {map} from 'rxjs/operators'
// import {tokenNotExpired} from "angular2-jwt";


const uri = 'http://localhost:3000/api/user'
const headers = new Headers({'Content-Type': 'application/json'})


@Injectable({
  providedIn: 'root'
})
export class AdduserService {
 token:String;
 user:Object;
  constructor(private http: Http) {
  }
  storeUser(token,user){
      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify(user));
      this.token = token;
      this.user = user;
  }
  logout(){
    this.token = null;
    this.user = null;
    localStorage.clear()
  }
  isLoggedIn(){
    return true
    // return tokenNotExpired();
  }
  getFile(userId){
    const params = new URLSearchParams()
    params.append('userId',userId)
    return this.http.get(uri+'/getFile',{headers,params})
      .pipe(map(res => res.json()))
  }

  uploadFile(file,userId){
    const formData = new FormData()
    formData.append('file',file)
    formData.append('userId',userId)
    console.log(userId)
    return this.http.post(uri+'/fileupload',formData)
      .pipe(map(res => res.json()))
  }

  addUser(user) {
    return this.http.post(uri, user, {headers: headers})
      .pipe(map(res => res.json()))
  }
  auth(user){
    return this.http.post(uri+'/auth',user,{headers:headers})
      .pipe(map(res => res.json()))
  }

  getUser(event, sortCurrentName, sortCurrentState ,selectedLevel ,filter,role) {
    console.log(event,selectedLevel)
    const skip = event
    let params = new URLSearchParams();
    console.log(role)
    params.append('skip', "" + skip)
    params.append('sortName', sortCurrentName)
    params.append('sortState', sortCurrentState)
    params.append('limit',selectedLevel)
    params.append('filter',filter)
    params.append('role',role)
    return this.http.get(uri, {headers, params})
      .pipe(map(res => res.json()))
  }

  deleteUser(userId) {
    return this.http.delete(uri + `/${userId}`, {headers: headers})
      .pipe(map(res => res.json()))
  }

  updateUser(user) {
    return this.http.put(uri, user, {headers: headers})
      .pipe(map(res => res.json()))
  }
}
