import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private _signUpForm: FormGroup = null;

  public get signUpForm(): FormGroup {
    return this._signUpForm;
  }

  constructor(
    private _authService: AuthService,
    private _alertService: AlertService
  ) { }

  public ngOnInit() {
    this._signUpForm = new FormGroup({
      fullName: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] }),
      rePassword: new FormControl('', { validators: [Validators.required] })
    });
  }

  public onSignUp(): void {
    if (this._signUpForm.value.password !== this._signUpForm.value.rePassword) {
      this._alertService.error('Passwords do not match.');
      return;
    }
    this._authService.signUp(this._signUpForm.value.email, this._signUpForm.value.password, this._signUpForm.value.fullName);
  }
}
