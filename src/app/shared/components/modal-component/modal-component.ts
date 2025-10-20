import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [],
  templateUrl: './modal-component.html',
})
export class ModalComponent {

  constructor() {}

  @Input() title: string = '¿Estás seguro?';
  @Input() message: string = 'Esta acción no se puede revertir';
  @Input() icon: string = 'pi pi-exclamation-triangle';
  @Input() type: string = 'info';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmIcon: string = 'pi pi-check-circle';
  @Input() cancelIcon: string = 'pi pi-times-circle';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  isOpen: boolean = false;

  @ViewChild('confirmBtn') confirmBtn!: ElementRef<HTMLButtonElement>;

  onOpen() {
    this.isOpen = true;
    setTimeout(() => {
      this.confirmBtn?.nativeElement?.focus();
    }, 0);
  }

  onClose() {
    this.isOpen = false;
  }

  onConfirm() {
    this.confirm.emit();
    this.onClose();
  }

  onCancel() {
    this.cancel.emit();
    this.onClose();
  }

}
