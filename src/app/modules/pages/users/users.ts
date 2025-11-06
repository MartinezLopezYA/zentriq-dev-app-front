import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from '../../../core/services/user';
import { Alerts } from '../../../core/services/global/alerts';
import { GetUserInterface } from '../../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../../../shared/forms/user-form-component/user-form-component';
import { UserForm } from '../../../core/services/global/user-form';
import { inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { FormsModule } from "@angular/forms";

const COMPONENTS = [UserFormComponent];
const PRIMENG_COMPONENTS = [TableModule, TooltipModule, TagModule];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ...COMPONENTS, ...PRIMENG_COMPONENTS, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  loading: boolean = false;
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

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
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
        this.getUsers();
      },
      () => { }
    );
  }

  onGlobalFilter() {
    const filterValue = this.filter.trim().toLowerCase();
    console.log(filterValue);
    this.filteredUsers = this.users.filter((user) =>
      [user.firstname, user.lastname, user.useremail, user.useridentificationnumber].join(' ').toLowerCase().includes(filterValue)
    );
    console.log(this.filteredUsers);
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

  editUser(user: any) {
    console.log('Editar usuario:', user);
  }

  deleteUser(user: any) {
    console.log('Eliminar usuario:', user);
  }

}
