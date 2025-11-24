import { Component, inject } from '@angular/core';
import { SpinnerComponent } from '../../../shared/components/spinner-component/spinner-component';
import { AssignFormComponent } from '../../../shared/forms/assign-form-component/assign-form-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignForm } from '../../../core/services/forms/assign-form';
import { Modal } from '../../../core/services/components/modal';
import { Role } from '../../../core/services/role';
import { GetRolesInterface } from '../../../core/interfaces/role.interface';
import { Alerts } from '../../../core/services/global/alerts';
import { RoleForm } from '../../../core/services/forms/role-form';
import { RoleFormComponent } from '../../../shared/forms/role-form-component/role-form-component';

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

  private roleService = inject(Role);
  private assignFormService = inject(AssignForm);
  private modalService = inject(Modal);
  private alertService = inject(Alerts);
  private roleFormService = inject(RoleForm);

  ngOnInit(): void {
    this.loading = true;
    this.laodRoles();
  }

  laodRoles() {
    this.roleService.getRolesActive().subscribe({
      next: (res: unknown) => {
        this.roles = res as GetRolesInterface[];
        console.log(this.roles);
        this.loading = false;
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

  addNewRole() {
    this.roleFormService.openForm(
      () => {
        this.laodRoles();
      },
      () => { },
      false
    );
  }

}
