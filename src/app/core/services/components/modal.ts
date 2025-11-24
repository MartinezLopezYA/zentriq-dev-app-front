import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalOptions } from '../../interfaces/global/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class Modal {
  private modalEvents = new Subject<{
    options: ModalOptions;
    onConfirm: () => void;
    onCancel: () => void;
  }>();

  get modal$() {
    return this.modalEvents.asObservable();
  }

  openModal(options: ModalOptions, onConfirm: () => void, onCancel: () => void) {
    this.modalEvents.next({ options, onConfirm, onCancel });
  }

}
