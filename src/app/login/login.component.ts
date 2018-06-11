import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() id: string;
  @Input() password: string;

  constructor(private authService: AuthService) { }

  login() {
    if (this.id && this.password) {
      this.authService.login(this.id, this.password);
      console.log(this.id+" "+this.password)
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