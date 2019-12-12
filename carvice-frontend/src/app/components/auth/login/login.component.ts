import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthRole } from '../auth-shared-form/auth-role.enum';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authRole: AuthRole;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.authRole = AuthRole.LOGIN;
  }

  onSubmitted(form: FormGroup) {
    this._authService.login(form.value.email, form.value.password);
  }
}
