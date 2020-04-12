import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  private _signInForm: FormGroup = null;

  public get signInForm(): FormGroup {
    return this._signInForm;
  }

  constructor(
    private _authService: AuthService
  ) { }

  public ngOnInit() {
    this._signInForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  public onSignIn(): void {
    this._authService.signIn(this._signInForm.value.email, this._signInForm.value.password);
  }
}
