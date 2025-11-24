import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserForm {
  private formEvents = new Subject<{
    onConfirm: () => void;
    onCancel: () => void;
  }>();

  get form$() {
    return this.formEvents.asObservable();
  }

  openForm(onConfirm: () => void, onCancel: () => void) {
    this.formEvents.next({ onConfirm, onCancel });
  }
}
