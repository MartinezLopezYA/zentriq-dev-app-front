import { Component, ViewChild } from '@angular/core';
import { Login } from './modules/auth/login/login';
import { MainLayout } from './layouts/main-layout/main-layout';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './shared/components/alerts-component/alerts-component';
import { Auth } from './core/services/auth';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { SpinnerComponent } from './shared/components/spinner/spinner';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';
import { ModalComponent } from './shared/components/modal-component/modal-component';
import { ModalOptions } from './core/interfaces/global/modal.interface';
import { Modal } from './core/services/global/modal';

const COMPONENTS = [AlertsComponent, MainLayout, ModalComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Login, ...COMPONENTS],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  authStatus;
  loading: boolean = true;

  @ViewChild('globalModal') modal!: ModalComponent

  modalOptions: ModalOptions = {
    title: '',
    message: '',
    icon: '',
    type: '',
    confirmText: '',
    cancelText: '',
    confirmIcon: '',
    cancelIcon: '',
  }

  private confirmCallback!: () => void;
  private cancelCallback?: () => void;

  constructor(
    public authService: Auth,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private modalService: Modal,
  ) {
    this.authStatus = this.authService.authStatus;
    this.setDynamicTitle();

    // Funcionamiento del modal

    this.modalService.modal$.subscribe(({ options, onConfirm, onCancel }) => {
      this.modalOptions = {
        title: options.title ?? '¿Estás seguro?',
        message: options.message ?? 'Esta acción no se puede revertir',
        icon: options.icon ?? 'pi pi-exclamation-triangle',
        type: options.type ?? 'info',
        confirmText: options.confirmText ?? 'Confirmar',
        cancelText: options.cancelText ?? 'Cancelar',
        confirmIcon: options.confirmIcon ?? 'pi pi-check-circle',
        cancelIcon: options.cancelIcon ?? 'pi pi-times-circle',
      };
      this.confirmCallback = onConfirm;
      this.cancelCallback = onCancel;
      this.modal.onOpen();
    })
  }

  ngOnInit() {
    this.authService.initializeSession().subscribe({
      next: (isAuthenticated) => {
        this.loading = false;
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
        } else {
          this.router.navigate(['/pages/main']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }

  setDynamicTitle() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap((route) => route.data)
    )
    .subscribe((data) => {
      const title = data['title'] || 'ZentriqDev';
      this.titleService.setTitle(title);
    })
  }

  handleConfirm() {
    if (this.confirmCallback) {
      this.confirmCallback();
    }
  }

  handleCancel() {
    if (this.cancelCallback) {
      this.cancelCallback();
    }
  }

}
