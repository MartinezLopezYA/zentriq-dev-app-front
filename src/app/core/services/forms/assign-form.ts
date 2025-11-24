import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AssignEnum } from '../../enums/assign.enum';
import { RoleInUsersInterface } from '../../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class AssignForm {
  private formEvents = new Subject<{
    onConfirm: () => void;
    onCancel: () => void;
    data: { uuid: string, type: AssignEnum, roles: RoleInUsersInterface[]}
  }>();

  get form$() {
    return this.formEvents.asObservable();
  }

  openForm(onConfirm: () => void, onCancel: () => void, data: { uuid: string, type: AssignEnum, roles: RoleInUsersInterface[]}) {
    this.formEvents.next({ onConfirm, onCancel, data: { uuid: data.uuid, type: data.type, roles: data.roles }});
  }
}
