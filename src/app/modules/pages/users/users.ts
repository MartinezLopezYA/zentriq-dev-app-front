import { Component } from '@angular/core';
import { User } from '../../../core/services/user';
import { Alerts } from '../../../core/services/global/alerts';
import { GetUserInterface } from '../../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../../../shared/forms/user-form-component/user-form-component';
import { UserForm } from '../../../core/services/global/user-form';

const COMPONENTS = [ UserFormComponent ];

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ...COMPONENTS],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  loading: boolean = false;
  users: GetUserInterface[] = [];

  constructor(
    private userService: User,
    private alertService: Alerts,
    private userFormService: UserForm,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
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
      () => {}
    );
  }

}
