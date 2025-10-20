import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertInterface } from '../../interfaces/global/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class Alerts {

  private alertsSubject = new BehaviorSubject<AlertInterface[]>([]);
  public alerts$ = this.alertsSubject.asObservable();

  private idCounter = 0;

  showAlert(message: string, type: AlertInterface['type'] = 'info') {
    const id = this.idCounter++;
    const alert: AlertInterface = { id, type, message };

    const currentAlerts = this.alertsSubject.getValue();
    this.alertsSubject.next([...currentAlerts, alert]);

    setTimeout(() => {
      this.removeAlert(id);
    }, 3000);
  }

  private removeAlert(id: number) {
    const updated = this.alertsSubject.getValue().filter(alert => alert.id !== id);
    this.alertsSubject.next(updated);
  }
}
