import { Component, inject } from '@angular/core';
import { SpinnerComponent } from '../../../shared/components/spinner-component/spinner-component';
import { AssignFormComponent } from '../../../shared/forms/assign-form-component/assign-form-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignForm } from '../../../core/services/forms/assign-form';
import { Modal } from '../../../core/services/components/modal';
import { Role } from '../../../core/services/role';
import { GetRolesInterface, RoleInUsersInterface } from '../../../core/interfaces/role.interface';
import { Alerts } from '../../../core/services/global/alerts';
import { RoleForm } from '../../../core/services/forms/role-form';
import { RoleFormComponent } from '../../../shared/forms/role-form-component/role-form-component';
import { GetPermissionssInterface } from '../../../core/interfaces/permission.interface';
import { AssignEnum } from '../../../core/enums/assign.enum';

const COMPONENTS = [RoleFormComponent, AssignFormComponent, SpinnerComponent];

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, ...COMPONENTS, FormsModule],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles {

  loading: boolean = false;
  roles: GetRolesInterface[] = [];
  rolesCopy: GetRolesInterface[] = [];
  filterValue: string = '';
  roleuuid: string = '';

  private roleService = inject(Role);
  private assignFormService = inject(AssignForm);
  private modalService = inject(Modal);
  private alertService = inject(Alerts);
  private roleFormService = inject(RoleForm);

  ngOnInit(): void {
    this.loading = true;
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe({
      next: (res: unknown) => {
        this.roles = res as GetRolesInterface[];
        this.rolesCopy = res as GetRolesInterface[];
        this.loading = false;
      },
      error: (err: any) => {
        this.alertService.showAlert(err.error.message, 'error');
        this.loading = false
      }
    })
  }

  onGlobalFilter() {
    this.roles = this.rolesCopy.filter((role: GetRolesInterface) => {
      return role.rolename.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        role.roledesc.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        role.rolecode.toLowerCase().includes(this.filterValue.toLowerCase());
    })
  }

  addNewRole(roleuuid: GetRolesInterface | null, isEditRole: boolean) {
    this.roleFormService.openForm(
      () => {
        this.loadRoles();
      },
      () => { },
      roleuuid,
      isEditRole
    );
  }

  assignPermissionsToRole(roleuuid: string) {
    this.roleuuid = roleuuid;
    this.assignFormService.openForm(
      () => {
        this.loadRoles();
        this.roleuuid = '';
      },
      () => {
        this.roleuuid = '';
      },
      { uuid: this.roleuuid, type: AssignEnum.PERMISSIONS, options: [] }
    );
  }

  onChangeStatus(role: GetRolesInterface) {
    this.roleuuid = role.roleuuid;
    const status = role.isActive
    const name = role.rolename;
    this.modalService.openModal(
      {
        title: 'Cambiar estado',
        type: 'warning',
        icon: 'pi pi-exclamation-triangle',
        message: status ? `¿Está seguro de que quiere desactivar el rol ${name}?` : `¿Estás seguro de que quiere activar el rol ${name}?`,
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
      },
      () => {
        this.changeStatus(this.roleuuid);
      },
      () => { }
    )
  }

  changeStatus(roleuuid: string) {
    this.loading = true;
    this.roleService.changeStatus(roleuuid).subscribe({
      next: () => {
        this.alertService.showAlert('Rol actualizado correctamente.', 'success');
        this.roleuuid = '';
        this.loadRoles();
      },
      error: (err) => {
        this.alertService.showAlert(err.error.message, 'error');
        this.loading = false;
      }
    })
  }

  onRemoveRole(role: GetRolesInterface) {
    this.roleuuid = role.roleuuid;
    const name = role.rolename;
    this.modalService.openModal(
      {
        title: 'Eliminar rol',
        type: 'danger',
        icon: 'pi pi-exclamation-circle',
        message: `¿Está seguro de que quiere eliminar el rol ${name}?. No podra deshacer esta acción.`,
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
      },
      () => {
        this.removeRole(this.roleuuid);
      },
      () => { }
    )
  }

  removeRole(roleuuid: string) {
    this.loading = true;
    this.roleService.removeRole(roleuuid).subscribe({
      next: () => {
        this.alertService.showAlert('Usuario eliminado correctamente.', 'success');
        this.roleuuid = '';
        this.loadRoles();
      },
      error: (err) => {
        this.alertService.showAlert(err.error.message, 'error');
        this.loading = false;
      }
    })
  }

}
