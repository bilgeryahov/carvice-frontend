import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthRole } from '../auth-shared-form/auth-role.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authRole: AuthRole;

  ngOnInit(): void {
    this.authRole = AuthRole.LOGIN;
  }

  onSubmitted(form: FormGroup) {
    console.log(form);
  }
}
