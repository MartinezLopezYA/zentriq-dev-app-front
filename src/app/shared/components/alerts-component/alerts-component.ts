import { Component, inject, OnInit } from '@angular/core';
import { Alerts } from '../../../core/services/global/alerts';
import { AlertInterface } from '../../../core/interfaces/global/alert.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-3 right-3 flex flex-col gap-0.5 z-2000">
      @for (alert of alerts; track alert.id) {
        <div class="alert border {{ alert.type === 'success' ? 'bg-(--success)/80 border-(--success)/80 text-(--neutral-text)' : alert.type === 'error' ? 'border-(--danger)/80 bg-(--danger)/80 text-(--neutral-text)' : alert.type === 'info' ? 'border-(--info)/80 bg-(--info)/80 text-(--neutral-text)' : 'border-(--warning)/80 bg-(--warning)/80 text-(--neutral-text)' }}" [ngClass]="alert.type">
          <i class="pi text-lg text-(--neutral-text)"
            [ngClass]="{
              'pi-check-circle': alert.type === 'success',
              'pi-times-circle': alert.type === 'error',
              'pi-info-circle': alert.type === 'info',
              'pi-exclamation-triangle': alert.type === 'warning'
            }">
          </i>
          <div class="w-px h-[30px] border border-(--neutral-text)"></div>
          <div class="flex flex-col">
            <h6 class="text-(--neutral-text)">
              {{
                alert.type === 'success' ? 'Exitoso'
                : alert.type === 'error' ? 'Error'
                : alert.type === 'info' ? 'Información'
                : 'Advertencia'
              }}
            </h6>
            <p class="text-(--neutral-text)">{{ alert.message }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: `
    .alert {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      border-radius: 4px;
      color: white;
      min-width: 200px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      animation: fadeInOut 3s ease-in-out forwards;
    }

    @keyframes fadeInOut {
      0%   { opacity: 0; transform: translateY(-10px); }
      10%  { opacity: 1; transform: translateY(0); }
      90%  { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(-10px); }
    }

  `
})
export class AlertsComponent implements OnInit {

  alerts: AlertInterface[] = [];

  private alertsService = inject(Alerts);

  constructor() { }

  ngOnInit(): void {
    this.alertsService.alerts$.subscribe(alerts => {
      this.alerts = alerts;
    });
  }

}
