import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleForm {
  private formEvents = new Subject<{
    onConfirm: () => void;
    onCancel: () => void;
    isEditRole: boolean;
  }>();

  get form$() {
    return this.formEvents.asObservable();
  }

  openForm(onConfirm: () => void, onCancel: () => void, isEditRole: boolean) {
    this.formEvents.next({ onConfirm, onCancel, isEditRole });
  }
}
