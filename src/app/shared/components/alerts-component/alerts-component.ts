import { Component, OnInit } from '@angular/core';
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
        <div class="alert border {{ alert.type === 'success' ? 'border-(--success)' : alert.type === 'error' ? 'border-(--danger)' : alert.type === 'info' ? 'border-(--info)' : 'border-(--warning)' }}" [ngClass]="alert.type">
          <i class="pi text-lg"
            [ngClass]="{
              'pi-check-circle': alert.type === 'success',
              'pi-times-circle': alert.type === 'error',
              'pi-info-circle': alert.type === 'info',
              'pi-exclamation-triangle': alert.type === 'warning'
            }">
          </i>
          <div class="w-px h-[30px] border border-(--white)"></div>
          <div class="flex flex-col">
            <h6 class="{{ alert.type === 'success' ? 'text-(--success)'
              : alert.type === 'error' ? 'text-(--danger)'
              : alert.type === 'info' ? 'text-(--info)'
              : 'text-(--warning)'
            }}">
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

    .success {
      background-color: var(--card-bg);
      color: var(--success);
    }
    .error {
      background-color: var(--card-bg);
      color: var(--danger);

    }
    .info {
      background-color: var(--card-bg);
      color: var(--info);
    }
    .warning {
      background-color: var(--card-bg);
      color: var(--warning);
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

  constructor(
    private alertsService: Alerts
  ) { }

  ngOnInit(): void {
    this.alertsService.alerts$.subscribe(alerts => {
      this.alerts = alerts;
    });
  }

}
