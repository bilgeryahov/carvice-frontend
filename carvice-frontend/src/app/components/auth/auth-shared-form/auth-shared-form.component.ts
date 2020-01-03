import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthRole } from './auth-role.enum';
import { UIService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-auth-shared-form',
  templateUrl: './auth-shared-form.component.html',
  styleUrls: ['./auth-shared-form.component.css']
})
export class AuthSharedFormComponent implements OnInit, OnDestroy {
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input() authRole: AuthRole;
  authSharedForm: FormGroup;
  authRoles = AuthRole;
  isLoading: boolean = false;
  private _isLoadingSub: Subscription;

  constructor(private _uiService: UIService) { }

  ngOnInit(): void {
    this.authSharedForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
    });

    if (this.authRole === AuthRole.SIGNUP) {
      this.authSharedForm.addControl('fullName', new FormControl('', { validators: [Validators.required] }))
    }

    this._isLoadingSub = this._uiService.loadingStateChanged.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy(): void {
    this._isLoadingSub.unsubscribe();
  }

  onSubmit() {
    this.submitted.emit(this.authSharedForm);
  }
}
