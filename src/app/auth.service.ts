import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  response: string;

  constructor(private http: HttpClient) { }

  login(id:string, password:string) {
    return this.http.post('http://localhost:8000/api/login', {id, password}).pipe(
      tap(res=> {
        console.log('received response for post request')
        this.setSession(res)
        this.response = JSON.stringify(res.valueOf())
        console.log(this.response)
      })
    )
  }

  randGet() {
    return this.http.get('http://localhost:8000/api/random').subscribe(res=>console.log(res))
  }

  private setSession(authResult) {
    console.log('setSession method is running')
    const expiresAt=moment().add(authResult.expires, 'second');
    localStorage.setItem('id_token', JSON.stringify(authResult.token.valueOf())); 
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    console.log(JSON.parse(localStorage.getItem('expires_at')));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration=localStorage.getItem('expires_at');
    const expiresAt=JSON.parse(expiration);
    return moment(expiresAt);
  }
}