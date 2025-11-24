import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleForm } from '../../../core/services/forms/role-form';
import { Alerts } from '../../../core/services/global/alerts';
import { Subscription } from 'rxjs';

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

  roleForm: FormGroup = new FormGroup({
    rolename: new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    roledesc: new FormControl<string | null>(null, [Validators.maxLength(255)]),
    rolecode: new FormControl<string | null>(null, [Validators.maxLength(50)]),
  });

  private roleFormService = inject(RoleForm);
  private alertService = inject(Alerts);

  constructor() { }

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private subscription!: Subscription;

  private onConfirmCallback: () => void = () => { };
  private onCancelCallback: () => void = () => { };
  private isEditRole: boolean = false;

  ngOnInit(): void {
    this.subscription = this.roleFormService.form$.subscribe(({ onConfirm, onCancel }) => {
      this.onConfirmCallback = onConfirm;
      this.onCancelCallback = onCancel;
      // this.isEditRole = isEditRole;
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
    this.onConfirmCallback();
    this.onClose();
  }

  onCancel() {
    this.onClose();
  }

  addNewRole() {
    this.loading = true;
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.onClose();
    }
  }
}


//  Todo completar el form de creacion de rol
// todo fix edicion role en back
