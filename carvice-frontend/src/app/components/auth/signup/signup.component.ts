import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthRole } from '../auth-shared-form/auth-role.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authRole: AuthRole;

  ngOnInit(): void {
    this.authRole = AuthRole.SIGNUP;
  }

  onSubmitted(form: FormGroup) {
    console.log(form);
  }
}
