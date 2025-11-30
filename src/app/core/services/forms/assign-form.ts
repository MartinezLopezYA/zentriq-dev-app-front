import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AssignEnum } from '../../enums/assign.enum';

@Injectable({
  providedIn: 'root'
})
export class AssignForm {
  private formEvents = new Subject<{
    onConfirm: () => void;
    onCancel: () => void;
    data: { uuid: string, type: AssignEnum, options: any}
  }>();

  get form$() {
    return this.formEvents.asObservable();
  }

  openForm(onConfirm: () => void, onCancel: () => void, data: { uuid: string, type: AssignEnum, options: any}) {
    this.formEvents.next({ onConfirm, onCancel, data: { uuid: data.uuid, type: data.type, options: data.options }});
  }
}
