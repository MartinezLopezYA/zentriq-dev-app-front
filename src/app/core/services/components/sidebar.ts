import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Sidebar {

  private _sidebarVisible = new BehaviorSubject<boolean>(true);
  sidebarVisible$ = this._sidebarVisible.asObservable();

  toggleSidebar() {
    this._sidebarVisible.next(!this._sidebarVisible.value);
  }

  openSidebar() {
    this._sidebarVisible.next(true);
  }

  closeSidebar() {
    this._sidebarVisible.next(false);
  }

  get value() {
    return this._sidebarVisible.value;
  }
}
