import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Theme } from '../../../core/services/global/theme';
import { ThemeComponet } from '../../../shared/components/theme/theme';

const COMPONENTS = [ThemeComponet];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ...COMPONENTS],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  showPassword: boolean = false;
  theme: 'light' | 'dark' = 'light';


  loginForm: FormGroup = new FormGroup({
    useremail: new FormControl<string | null>(null, [ Validators.required, Validators.email ]),
    userpassword: new FormControl<string | null>(null, [ Validators.required, Validators.minLength(8) ])
  });

  constructor(
    private authService: Auth,
    private themeService: Theme
  ) {}

  ngOnInit(): void {
    this.themeService.theme$.subscribe((theme: 'light' | 'dark') => {
      this.theme = theme;
    })
  }

  login() {
    // TODO : Add loading state
  }

  checkConnection() {
    this.authService.checkConextion().subscribe({
      next: (res) => {
        console.log('Response from backend:', res);
      }, error: (err) => {
        console.error('Error connecting to backend:', err);
      }
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
