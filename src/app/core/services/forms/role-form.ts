import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GetRolesInterface } from '../../interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleForm {
  private formEvents = new Subject<{
    onConfirm: () => void;
    onCancel: () => void;
    role: GetRolesInterface | null;
    isEditRole?: boolean;
  }>();

  get form$() {
    return this.formEvents.asObservable();
  }

  openForm(onConfirm: () => void, onCancel: () => void, role: GetRolesInterface | null, isEditRole: boolean = false) {
    this.formEvents.next({ onConfirm, onCancel, role, isEditRole });
  }
}
