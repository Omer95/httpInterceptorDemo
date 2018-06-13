import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  logout() {
    this.auth.logout();
    if (!(localStorage.getItem('id_token'))) {
      console.log('Logged Out')
      this.router.navigate(['login'])
    }
  }

  ngOnInit() {
  }

}
