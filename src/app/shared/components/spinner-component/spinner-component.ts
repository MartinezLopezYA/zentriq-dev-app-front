import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner-component',
  standalone: true,
  imports: [],
  template: `
    <div class="w-full h-full">
      <div class="text-[var(--neutral-text)] fixed bottom-3 right-3 flex flex-col items-center justify-center gap-2">
        <i class="pi pi-spin pi-spinner"></i>
        <span class="text-flama">Cargando...</span>
      </div>
    </div>
  `,
})
export class SpinnerComponent {

}
