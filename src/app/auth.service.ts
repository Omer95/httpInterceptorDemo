import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(id:string, password:string) {
    return this.http.post('/api/login', {id, password}).subscribe(res=> this.setSession);
  }
  private setSession(authResult) {
    const expiresAt=moment().add(authResult.expiredIn, 'second');
    localStorage.setItem('id_token', authResult.idToken); //assuming the server's token key is called idToken and the server sends the JWT in the response body
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    console.log(localStorage.getItem('id_token'));
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