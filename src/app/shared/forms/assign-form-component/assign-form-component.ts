import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { Role } from '../../../core/services/role';
import { Subscription } from 'rxjs';
import { GetRolesInterface, GetRolesWithPermissionsInterface, RoleInUsersInterface } from '../../../core/interfaces/role.interface';
import { Alerts } from '../../../core/services/global/alerts';
import { AssignForm } from '../../../core/services/forms/assign-form';
import { AssignEnum } from '../../../core/enums/assign.enum';
import { User } from '../../../core/services/user';
import { GetPermissionssInterface } from '../../../core/interfaces/permission.interface';
import { Permission } from '../../../core/services/permission';

@Component({
  selector: 'app-assign-form-component',
  standalone: true,
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
  permissions: GetPermissionssInterface[] = [];
  uuids: string[] = [];

  private roleService = inject(Role);
  private permissionService = inject(Permission);
  private userService = inject(User);
  private alertService = inject(Alerts);
  private assignFormService = inject(AssignForm);

  constructor() { }

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private subscription!: Subscription;

  private onConfirmCallback: () => void = () => { };
  private onCancelCallback: () => void = () => { };
  data: { uuid: string, type: AssignEnum, options: any } = { uuid: '', type: AssignEnum.ROLES, options: [] };

  ngOnInit(): void {
    this.subscription = this.assignFormService.form$.subscribe(({ onConfirm, onCancel, data: { uuid, type, options } }) => {
      this.onConfirmCallback = onConfirm;
      this.onCancelCallback = onCancel;
      this.data = { uuid, type, options };
      this.onOpen();
      if (this.isOpen) {
        this.useruuid = this.data.uuid;
        this.loadOptions();
        if (options.length > 0) {
          options.forEach((role: RoleInUsersInterface) => {
            this.uuids.push(role.roleuuid);
          })
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadOptions() {
    this.loading = true;
    if (this.data.type === AssignEnum.ROLES) {
      this.roleService.getRolesActive().subscribe({
        next: (res: unknown) => {
          const roles = res as GetRolesInterface[];
          this.roles = roles.filter(role => role.rolecode !== 'SUPERADMIN');
          this.loading = false
        },
        error: (error: any) => {
          this.alertService.showAlert(error.error.message, 'error');
          this.loading = false
        }
      })
    } else {
      this.permissionService.getPermissions().subscribe({
        next: (res: unknown) => {
          this.roleService.getRoleWithPermissions(this.data.uuid).subscribe({
            next: (roleRes: unknown) => {
              const role = roleRes as GetRolesWithPermissionsInterface;
              const assignedPermissions = role.permissions.map(permission => permission.permissionuuid);
              this.uuids = assignedPermissions;
            },
            error: (error: any) => {
              this.alertService.showAlert(error.error.message, 'error');
            }
          });
          const permissions = res as GetPermissionssInterface[];
          this.permissions = permissions;
          this.loading = false
        },
        error: (error: any) => {
          this.alertService.showAlert(error.error.message, 'error');
          this.loading = false
        }
      })
    }
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
    if (this.data.type === 'ROLES') {

      this.userService.assignRoles(this.useruuid, this.uuids).subscribe({
        next: () => {
          this.alertService.showAlert('Roles asignados correctamente.', 'success');
          this.onConfirmCallback();
          this.onClose();
        },
        error: (err) => {
          this.alertService.showAlert(err.error.message, 'error');
          this.loading = false;
        }
      });
    } else {
      this.roleService.assignPermissions(this.data.uuid, this.uuids).subscribe({
        next: () => {
          this.alertService.showAlert('Permisos asignados correctamente.', 'success');
          this.onConfirmCallback();
          this.onClose();
        },
        error: (err) => {
          this.alertService.showAlert(err.error.message, 'error');
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.onClose();
  }

  addOptions(uuid: string) {
    if (this.uuids.includes(uuid)) {
      this.uuids = this.uuids.filter(item => item !== uuid);
    } else {
      this.uuids.push(uuid);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.onClose();
    }
  }
}

