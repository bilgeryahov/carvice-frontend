import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthRole } from '../auth-shared-form/auth-role.enum';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authRole: AuthRole;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.authRole = AuthRole.SIGNUP;
  }

  onSubmitted(form: FormGroup) {
    this._authService.registerUser(form.value.email, form.value.password);
  }
}
