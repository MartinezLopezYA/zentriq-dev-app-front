import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner-component',
  standalone: true,
  imports: [],
  template: `
    <div class="fixed inset-0 z-1500 flex items-center justify-center backdrop-blur-sm bg-(--background)/30 overflow-hidden">
      <div class="text-(--neutral-text) flex flex-col items-center justify-center gap-2">
        <i class="pi pi-spin pi-spinner"></i>
        <span class="text-poppins">Cargando...</span>
      </div>
    </div>
  `,
})
export class SpinnerComponent {

}
