import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleForm } from '../../../core/services/forms/role-form';
import { Alerts } from '../../../core/services/global/alerts';
import { Subscription } from 'rxjs';
import { Role } from '../../../core/services/role';
import { GetRolesInterface } from '../../../core/interfaces/role.interface';

@Component({
  selector: 'app-role-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './role-form-component.html',
  styleUrl: './role-form-component.scss',
})
export class RoleFormComponent {

  isOpen: boolean = false;
  closing: boolean = false;
  entered: boolean = true;
  loading: boolean = false;
  roleuuid: string = '';

  roleForm: FormGroup = new FormGroup({
    rolename: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    roledesc: new FormControl<string | null>(null, [Validators.maxLength(255)]),
    rolecode: new FormControl<string | null>(null, [Validators.maxLength(50)]),
  });

  private roleFormService = inject(RoleForm);
  private roleService = inject(Role);
  private alertService = inject(Alerts);

  constructor() { }

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private subscription!: Subscription;

  private onConfirmCallback: () => void = () => { };
  private onCancelCallback: () => void = () => { };
  private role: GetRolesInterface | null = null;
  isEditRole?: boolean = false;

  ngOnInit(): void {
    this.subscription = this.roleFormService.form$.subscribe(({ onConfirm, onCancel, role, isEditRole }) => {
      this.onConfirmCallback = onConfirm;
      this.onCancelCallback = onCancel;
      this.role = role;
      this.isEditRole = isEditRole;
      this.onOpen();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onOpen() {
    this.isOpen = true;
    this.closing = false;
    this.entered = false;
    if (this.isEditRole && this.role) {
      this.roleuuid = this.role.roleuuid
      this.roleForm.patchValue({
        rolename: this.role.rolename,
        roledesc: this.role.roledesc,
        rolecode: this.role.rolecode,
      })
    } else {
      this.roleForm.reset();
    }

    setTimeout(() => {
      this.entered = true;
    }, 10);
  }

  onClose() {
    this.entered = false;
    this.closing = true;

    setTimeout(() => {
      this.isOpen = false;
      this.roleForm.reset();
    }, 500);
  }

  onConfirm() {
    this.submitRole();
    this.onClose();
  }

  submitRole() {
    this.loading = true;
    if (!this.isEditRole) {
      this.roleService.addRole(this.roleForm.value).subscribe({
        next: () => {
          this.alertService.showAlert('Rol agregado exitosamente.', 'success');
          this.onConfirmCallback();
          this.onClose();
          this.loading = false;
        },
        error: (err) => {
          const errorCode = err.error?.errorCode;
          if (errorCode) {
            this.validateError(errorCode);
            return;
          }
          this.alertService.showAlert('Error al agregar el rol.', 'error');
          this.loading = false;
        }
      })
    } else {
      this.roleService.updateRole(this.roleuuid, this.roleForm.value).subscribe({
        next: () => {
          this.alertService.showAlert('Rol actualizado exitosamente.', 'success');
          this.onConfirmCallback();
          this.onClose();
          this.loading = false;
        },
        error: (err) => {
          const errorCode = err.error?.errorCode;
          if (errorCode) {
            this.validateError(errorCode);
            return;
          }
          this.alertService.showAlert('Error al actualizar el rol.', 'warning');
          this.loading = false;
        }
      })
    }
  }

  validateError(errorCode: string) {
    if (errorCode === 'AEN_ROLE_ERROR') {
      this.alertService.showAlert('El nombre de rol ya existe.', 'warning');
      this.loading = false;
      return;
    }
    if (errorCode === 'AEC_ROLE_ERROR') {
      this.alertService.showAlert('El código de rol ya existe.', 'warning');
      this.loading = false;
      return;
    }
  }

  onCancel() {
    this.onClose();
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.onClose();
    }
  }
}
