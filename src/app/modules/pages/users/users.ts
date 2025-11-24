import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from '../../../core/services/user';
import { Alerts } from '../../../core/services/global/alerts';
import { GetUserInterface } from '../../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../../../shared/forms/user-form-component/user-form-component';
import { UserForm } from '../../../core/services/forms/user-form';
import { inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Modal } from '../../../core/services/components/modal';
import { SpinnerComponent } from '../../../shared/components/spinner-component/spinner-component';
import { AssignForm } from '../../../core/services/forms/assign-form';
import { AssignEnum } from '../../../core/enums/assign.enum';
import { AssignFormComponent } from '../../../shared/forms/assign-form-component/assign-form-component';
import { RoleInUsersInterface } from '../../../core/interfaces/role.interface';

const COMPONENTS = [UserFormComponent, AssignFormComponent, SpinnerComponent];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ...COMPONENTS, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  loading: boolean = false;
  useruuid: string = '';

  users: GetUserInterface[] = [];
  paginatedUsers: GetUserInterface[] = [];
  filteredUsers: GetUserInterface[] = [];
  filter: string = '';
  rows = 10;
  currentPage = 1;
  totalPages = 1;
  Math = Math;

  private userService = inject(User);
  private alertService = inject(Alerts);
  private userFormService = inject(UserForm);
  private assignFormService = inject(AssignForm);
  private modalService = inject(Modal);

  ngOnInit(): void {
    this.loading = true;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.filter(user =>
          !user.roles?.some(role => role.rolecode === 'SUPERADMIN')
        );

        this.filteredUsers = [...this.users];
        this.updatePagination();
        this.loading = false;
      },
      error: (err) => {
        this.alertService.showAlert('No se pudieron cargar los usuarios.', 'error');
        this.loading = false;
      }
    });
  }

  addNewUser() {
    this.userFormService.openForm(
      () => {
        this.loadUsers();
      },
      () => { }
    );
  }

  onGlobalFilter() {
    const filterValue = this.filter.trim().toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      [user.firstname, user.lastname, user.useremail, user.useridentificationnumber].join(' ').toLowerCase().includes(filterValue)
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.max(1, Math.ceil(this.filteredUsers.length / this.rows));
    this.updatePage();
  }

  updatePage() {
    const start = (this.currentPage - 1) * this.rows;
    const end = start + this.rows;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePage();
  }

  get totalPagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get showingRange() {
    const start = this.filteredUsers.length === 0 ? 0 : (this.currentPage - 1) * this.rows + 1;
    const end = Math.min(this.currentPage * this.rows, this.filteredUsers.length);
    return { start, end };
  }

  onChangeStatus(user: GetUserInterface) {
    this.useruuid = user.useruuid;
    const status = user.isActive
    const name = user.firstname + ' ' + user.lastname;
    this.modalService.openModal(
      {
        title: 'Cambiar estado',
        type: 'warning',
        icon: 'pi pi-exclamation-triangle',
        message: status ? `¿Está seguro de que quiere desactivar a ${name}?` : `¿Estás seguro de que quiere activar a ${name}?`,
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
      },
      () => {
        this.changeStatus(this.useruuid);
      },
      () => { }
    )
  }

  changeStatus(useruuid: string) {
    this.loading = true;
    this.userService.changeStatus(useruuid).subscribe({
      next: () => {
        this.alertService.showAlert('Usuario actualizado correctamente.', 'success');
        this.useruuid = '';
        this.loadUsers();
      },
      error: () => {
        this.alertService.showAlert('No se pudo cambiar el estado del usuario.', 'error');
      }
    })
  }

  assignRolesToUser(useruuid: string, roles: RoleInUsersInterface[]) {
    this.useruuid = useruuid;
    this.assignFormService.openForm(
      () => {
        this.loadUsers();
        this.useruuid = '';
      },
      () => {
        this.useruuid = '';
      },
      { uuid: this.useruuid, type: AssignEnum.ROLES, roles: roles }
    );
  }

  onRemoveUser(user: any) {
    this.useruuid = user.useruuid;
    const name = user.firstname + ' ' + user.lastname;
    this.modalService.openModal(
      {
        title: 'Eliminar usuario',
        type: 'danger',
        icon: 'pi pi-exclamation-circle',
        message: `¿Está seguro de que quiere eliminar a ${name}?. No podra deshacer esta acción.`,
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
      },
      () => {
        this.removeUser(this.useruuid);
      },
      () => { }
    )
  }

  removeUser(useruuid: string) {
    this.loading = true;
    this.userService.removeUser(useruuid).subscribe({
      next: () => {
        this.alertService.showAlert('Usuario eliminado correctamente.', 'success');
        this.useruuid = '';
        this.loadUsers();
      },
      error: () => {
        this.alertService.showAlert('No se pudo cambiar el estado del usuario.', 'error');
      }
    })
  }

}
