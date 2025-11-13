import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Role } from '../../../core/services/role';
import { Subscription } from 'rxjs';
import { GetRolesInterface, RoleInUsersInterface } from '../../../core/interfaces/role.interface';
import { Alerts } from '../../../core/services/global/alerts';
import { AssignForm } from '../../../core/services/global/assign-form';
import { AssignEnum } from '../../../core/enums/assign.enum';
import { User } from '../../../core/services/user';

@Component({
  selector: 'app-assign-form-component',
  imports: [],
  templateUrl: './assign-form-component.html',
  styleUrl: './assign-form-component.scss',
})
export class AssignFormComponent {

  isOpen: boolean = false;
  closing: boolean = false;
  entered: boolean = true;

  loading: boolean = false;
  useruuid: string = '';
  roles: GetRolesInterface[] = [];
  uuids: string[] = [];

  private roleService = inject(Role);
  private userService = inject(User);
  private alertService = inject(Alerts);
  private assignFormService = inject(AssignForm);

  constructor() { }

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private subscription!: Subscription;

  private onConfirmCallback: () => void = () => { };
  private onCancelCallback: () => void = () => { };
  private data: { uuid: string, type: AssignEnum, roles: RoleInUsersInterface[] } = { uuid: '', type: AssignEnum.ROLES, roles: [] };


  ngOnInit(): void {
    this.subscription = this.assignFormService.form$.subscribe(({ onConfirm, onCancel, data: { uuid, type, roles } }) => {
      this.onConfirmCallback = onConfirm;
      this.onCancelCallback = onCancel;
      this.data = { uuid, type, roles };
      this.onOpen();
      if (this.isOpen) {
        this.useruuid = this.data.uuid;
        if (this.data.type === AssignEnum.ROLES) {
          this.loadRoles();
        } else {
          this.alertService.showAlert('Opción no disponible.', 'error')
        }

        if (roles.length > 0) {
          roles.forEach((role: RoleInUsersInterface) => {
            this.uuids.push(role.roleuuid);
          })
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadRoles() {
    this.loading = true;
    this.roleService.getRolesActive().subscribe({
      next: (res: unknown) => {
        this.roles = res as GetRolesInterface[];
        console.log(this.roles)
        this.loading = false
      },
      error: (error: any) => {
        if (error.error.errorCode === 'NFA_ROLE_ERROR') {
          this.alertService.showAlert('No hay roles activos disponibles.', 'error');
          this.loading = false
          return;
        }
        this.alertService.showAlert('No se pudieron cargar los roles.', 'error');
        this.loading = false
      }
    })
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
      this.roles = [];
      this.uuids = [];
    }, 500);
  }

  onConfirm() {
    this.onConfirmCallback();
    this.onClose();
  }

  assignRoelsToUser() {
    this.loading = true;
    this.userService.assignRoles(this.useruuid, this.uuids).subscribe({
      next: () => {
        this.alertService.showAlert('Roles asignados correctamente.', 'success');
        this.onConfirmCallback();
        this.onClose();
      },
      error: (err) => {
        this.alertService.showAlert('No se pudieron asignar los roles.', 'error');
        this.loading = false;
      }
    });
  }

  onCancel() {
    this.onClose();
  }

  addRole(uuid: string) {
    if (this.uuids.includes(uuid)) {
      this.uuids = this.uuids.filter(item => item !== uuid);
    } else {
      this.uuids.push(uuid);
    }
  }
}

