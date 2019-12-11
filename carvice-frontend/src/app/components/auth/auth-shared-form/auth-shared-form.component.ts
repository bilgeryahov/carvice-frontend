import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthRole } from './auth-role.enum';

@Component({
  selector: 'app-auth-shared-form',
  templateUrl: './auth-shared-form.component.html',
  styleUrls: ['./auth-shared-form.component.css']
})
export class AuthSharedFormComponent implements OnInit {
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() authRole: AuthRole;
  authSharedForm: FormGroup;
  authRoles = AuthRole;

  ngOnInit(): void {
    this.authSharedForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
    });

    if (this.authRole === AuthRole.SIGNUP) {
      this.authSharedForm.addControl('fullName', new FormControl('', { validators: [Validators.required] }))
    }
  }

  onSubmit() {
    this.submitted.emit(this.authSharedForm);
  }
}
