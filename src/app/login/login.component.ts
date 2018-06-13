import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() id: string;
  @Input() password: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.id && this.password) {
      this.authService.login(this.id, this.password);
      console.log(this.id+" "+this.password)
      this.router.navigate(['dashboard'])
    }
  }

  randGet() {
    if (this.id && this.password) {
      this.authService.randGet();
    }
  }

  ngOnInit() {
  }

}