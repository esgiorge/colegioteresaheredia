import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, User, Lock, Mail, Eye, EyeOff, UserPlus, Key } from 'lucide-angular';

type FormularioActivo = 'login' | 'registro' | 'recuperar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <div class="login-page">
      <div class="container">
        <div class="login-container">
          <!-- Header -->
          <div class="login-header">
            <h1 class="login-title">Acceso al Sistema</h1>
            <p class="login-subtitle">Portal educativo U.E. Colegio Teresa Heredia</p>
          </div>

          <!-- Formulario de Login -->
          @if (formularioActivo() === 'login') {
            <form [formGroup]="loginForm" (ngSubmit)="onLogin()" class="login-form">
              <h2 class="form-title">
                <lucide-icon [img]="UserIcon" size="24"></lucide-icon>
                Iniciar Sesión
              </h2>

              @if (mensaje()) {
                <div class="alert" [class.alert-success]="!mensajeError()" [class.alert-error]="mensajeError()">
                  {{ mensaje() }}
                </div>
              }

              <div class="form-group">
                <label class="form-label">Usuario (Email)</label>
                <div class="input-group">
                  <lucide-icon [img]="MailIcon" size="20" class="input-icon"></lucide-icon>
                  <input 
                    type="email"
                    formControlName="email"
                    placeholder="tu-email@ejemplo.com"
                    class="form-input"
                    [class.error]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                </div>
                @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
                  <span class="error-message">Por favor ingresa un email válido</span>
                }
              </div>

              <div class="form-group">
                <label class="form-label">Contraseña</label>
                <div class="input-group">
                  <lucide-icon [img]="LockIcon" size="20" class="input-icon"></lucide-icon>
                  <input 
                    [type]="mostrarPassword() ? 'text' : 'password'"
                    formControlName="password"
                    placeholder="Tu contraseña"
                    class="form-input"
                    [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                  <button 
                    type="button" 
                    class="toggle-password"
                    (click)="togglePassword()">
                    <lucide-icon [img]="mostrarPassword() ? EyeOffIcon : EyeIcon" size="20"></lucide-icon>
                  </button>
                </div>
                @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                  <span class="error-message">La contraseña es requerida</span>
                }
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-full"
                [disabled]="loginForm.invalid || cargando()">
                @if (cargando()) {
                  <span class="loading"></span>
                } @else {
                  <lucide-icon [img]="UserIcon" size="20"></lucide-icon>
                }
                Iniciar Sesión
              </button>

              <div class="form-links">
                <button 
                  type="button" 
                  class="link-btn"
                  (click)="cambiarFormulario('recuperar')">
                  ¿Olvidaste tu contraseña?
                </button>
                <button 
                  type="button" 
                  class="link-btn"
                  (click)="cambiarFormulario('registro')">
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </form>
          }

          <!-- Formulario de Registro -->
          @if (formularioActivo() === 'registro') {
            <form [formGroup]="registroForm" (ngSubmit)="onRegistro()" class="login-form">
              <div class="form-header">
                <h2 class="form-title">
                  <lucide-icon [img]="UserPlusIcon" size="24"></lucide-icon>
                  Registrarse
                </h2>
                <button 
                  type="button" 
                  class="back-btn"
                  (click)="cambiarFormulario('login')">
                  ← Volver al Login
                </button>
              </div>

              @if (mensaje()) {
                <div class="alert" [class.alert-success]="!mensajeError()" [class.alert-error]="mensajeError()">
                  {{ mensaje() }}
                </div>
              }

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Cédula</label>
                  <input 
                    type="text"
                    formControlName="cedula"
                    placeholder="12345678"
                    class="form-input"
                    [class.error]="registroForm.get('cedula')?.invalid && registroForm.get('cedula')?.touched">
                  @if (registroForm.get('cedula')?.invalid && registroForm.get('cedula')?.touched) {
                    <span class="error-message">La cédula es requerida</span>
                  }
                </div>
                <div class="form-group">
                  <label class="form-label">Teléfono</label>
                  <input 
                    type="tel"
                    formControlName="telefono"
                    placeholder="0414-1234567"
                    class="form-input"
                    [class.error]="registroForm.get('telefono')?.invalid && registroForm.get('telefono')?.touched">
                  @if (registroForm.get('telefono')?.invalid && registroForm.get('telefono')?.touched) {
                    <span class="error-message">El teléfono es requerido</span>
                  }
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Nombres</label>
                  <input 
                    type="text"
                    formControlName="nombres"
                    placeholder="Juan Carlos"
                    class="form-input"
                    [class.error]="registroForm.get('nombres')?.invalid && registroForm.get('nombres')?.touched">
                  @if (registroForm.get('nombres')?.invalid && registroForm.get('nombres')?.touched) {
                    <span class="error-message">Los nombres son requeridos</span>
                  }
                </div>
                <div class="form-group">
                  <label class="form-label">Apellidos</label>
                  <input 
                    type="text"
                    formControlName="apellidos"
                    placeholder="Pérez González"
                    class="form-input"
                    [class.error]="registroForm.get('apellidos')?.invalid && registroForm.get('apellidos')?.touched">
                  @if (registroForm.get('apellidos')?.invalid && registroForm.get('apellidos')?.touched) {
                    <span class="error-message">Los apellidos son requeridos</span>
                  }
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <div class="input-group">
                  <lucide-icon [img]="MailIcon" size="20" class="input-icon"></lucide-icon>
                  <input 
                    type="email"
                    formControlName="email"
                    placeholder="tu-email@ejemplo.com"
                    class="form-input"
                    [class.error]="registroForm.get('email')?.invalid && registroForm.get('email')?.touched">
                </div>
                @if (registroForm.get('email')?.invalid && registroForm.get('email')?.touched) {
                  <span class="error-message">Por favor ingresa un email válido</span>
                }
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Contraseña</label>
                  <div class="input-group">
                    <lucide-icon [img]="LockIcon" size="20" class="input-icon"></lucide-icon>
                    <input 
                      [type]="mostrarPassword() ? 'text' : 'password'"
                      formControlName="password"
                      placeholder="Mínimo 6 caracteres"
                      class="form-input"
                      [class.error]="registroForm.get('password')?.invalid && registroForm.get('password')?.touched">
                  </div>
                  @if (registroForm.get('password')?.invalid && registroForm.get('password')?.touched) {
                    <span class="error-message">La contraseña debe tener al menos 6 caracteres</span>
                  }
                </div>
                <div class="form-group">
                  <label class="form-label">Confirmar Contraseña</label>
                  <div class="input-group">
                    <lucide-icon [img]="LockIcon" size="20" class="input-icon"></lucide-icon>
                    <input 
                      [type]="mostrarConfirmPassword() ? 'text' : 'password'"
                      formControlName="confirmarPassword"
                      placeholder="Repite la contraseña"
                      class="form-input"
                      [class.error]="registroForm.get('confirmarPassword')?.invalid && registroForm.get('confirmarPassword')?.touched">
                    <button 
                      type="button" 
                      class="toggle-password"
                      (click)="toggleConfirmPassword()">
                      <lucide-icon [img]="mostrarConfirmPassword() ? EyeOffIcon : EyeIcon" size="20"></lucide-icon>
                    </button>
                  </div>
                  @if (registroForm.get('confirmarPassword')?.invalid && registroForm.get('confirmarPassword')?.touched) {
                    <span class="error-message">Las contraseñas no coinciden</span>
                  }
                </div>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-full"
                [disabled]="registroForm.invalid || cargando()">
                @if (cargando()) {
                  <span class="loading"></span>
                } @else {
                  <lucide-icon [img]="UserPlusIcon" size="20"></lucide-icon>
                }
                Registrarse
              </button>
            </form>
          }

          <!-- Formulario de Recuperar Contraseña -->
          @if (formularioActivo() === 'recuperar') {
            <form [formGroup]="recuperarForm" (ngSubmit)="onRecuperar()" class="login-form">
              <div class="form-header">
                <h2 class="form-title">
                  <lucide-icon [img]="KeyIcon" size="24"></lucide-icon>
                  Recuperar Contraseña
                </h2>
                <button 
                  type="button" 
                  class="back-btn"
                  (click)="cambiarFormulario('login')">
                  ← Volver al Login
                </button>
              </div>

              @if (mensaje()) {
                <div class="alert" [class.alert-success]="!mensajeError()" [class.alert-error]="mensajeError()">
                  {{ mensaje() }}
                </div>
              }

              <div class="recovery-info">
                <p>Ingresa tu email y te enviaremos las instrucciones para restablecer tu contraseña.</p>
              </div>

              <div class="form-group">
                <label class="form-label">Email</label>
                <div class="input-group">
                  <lucide-icon [img]="MailIcon" size="20" class="input-icon"></lucide-icon>
                  <input 
                    type="email"
                    formControlName="email"
                    placeholder="tu-email@ejemplo.com"
                    class="form-input"
                    [class.error]="recuperarForm.get('email')?.invalid && recuperarForm.get('email')?.touched">
                </div>
                @if (recuperarForm.get('email')?.invalid && recuperarForm.get('email')?.touched) {
                  <span class="error-message">Por favor ingresa un email válido</span>
                }
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-full"
                [disabled]="recuperarForm.invalid || cargando()">
                @if (cargando()) {
                  <span class="loading"></span>
                } @else {
                  <lucide-icon [img]="KeyIcon" size="20"></lucide-icon>
                }
                Solicitar Recuperación
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: calc(100vh - 80px);
      background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
      display: flex;
      align-items: center;
      padding: 2rem 0;
    }

    .login-container {
      max-width: 500px;
      margin: 0 auto;
      background: var(--white);
      border-radius: 1rem;
      box-shadow: var(--shadow-lg);
      overflow: hidden;
    }

    .login-header {
      background: var(--primary-color);
      color: var(--white);
      padding: 2rem;
      text-align: center;
    }

    .login-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .login-subtitle {
      opacity: 0.9;
      margin: 0;
    }

    .login-form {
      padding: 2rem;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .form-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-dark);
      margin: 0 0 1.5rem 0;
    }

    .back-btn {
      background: none;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      font-weight: 500;
      padding: 0.5rem;
      border-radius: 0.25rem;
      transition: background-color 0.3s ease;
    }

    .back-btn:hover {
      background: var(--bg-light);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      color: var(--text-light);
      z-index: 1;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 2px solid var(--border-color);
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .input-group .form-input {
      padding-right: 3rem;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .form-input.error {
      border-color: var(--secondary-color);
    }

    .toggle-password {
      position: absolute;
      right: 1rem;
      background: none;
      border: none;
      color: var(--text-light);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.25rem;
      transition: color 0.3s ease;
    }

    .toggle-password:hover {
      color: var(--text-dark);
    }

    .error-message {
      color: var(--secondary-color);
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }

    .btn-full {
      width: 100%;
      justify-content: center;
      margin-top: 1rem;
    }

    .form-links {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-top: 1.5rem;
      text-align: center;
    }

    .link-btn {
      background: none;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.5rem;
      border-radius: 0.25rem;
      transition: all 0.3s ease;
    }

    .link-btn:hover {
      background: var(--bg-light);
      color: var(--text-dark);
    }

    .recovery-info {
      background: var(--bg-light);
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .recovery-info p {
      margin: 0;
      color: var(--text-light);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .login-page {
        padding: 1rem 0;
      }

      .login-container {
        margin: 0 1rem;
      }

      .login-header {
        padding: 1.5rem;
      }

      .login-title {
        font-size: 1.5rem;
      }

      .login-form {
        padding: 1.5rem;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .form-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .form-title {
        margin-bottom: 0;
      }
    }
  `]
})
export class LoginComponent {
  readonly UserIcon = User;
  readonly LockIcon = Lock;
  readonly MailIcon = Mail;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;
  readonly UserPlusIcon = UserPlus;
  readonly KeyIcon = Key;

  formularioActivo = signal<FormularioActivo>('login');
  mostrarPassword = signal(false);
  mostrarConfirmPassword = signal(false);
  cargando = signal(false);
  mensaje = signal('');
  mensajeError = signal(false);

  loginForm: FormGroup;
  registroForm: FormGroup;
  recuperarForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registroForm = this.fb.group({
      cedula: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[\d\-\+\(\)\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmarPassword = group.get('confirmarPassword');
    
    if (password && confirmarPassword && password.value !== confirmarPassword.value) {
      confirmarPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  cambiarFormulario(formulario: FormularioActivo): void {
    this.formularioActivo.set(formulario);
    this.mensaje.set('');
    this.mensajeError.set(false);
  }

  togglePassword(): void {
    this.mostrarPassword.update(current => !current);
  }

  toggleConfirmPassword(): void {
    this.mostrarConfirmPassword.update(current => !current);
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.cargando.set(true);
      this.mensaje.set('');

      // Simular autenticación
      setTimeout(() => {
        this.cargando.set(false);
        this.mensaje.set('¡Inicio de sesión exitoso! Redirigiendo...');
        this.mensajeError.set(false);
        
        // En una aplicación real, aquí se redirigiría al dashboard
        setTimeout(() => {
          console.log('Redirigiendo al dashboard...');
        }, 2000);
      }, 2000);
    } else {
      this.marcarCamposComoTocados(this.loginForm);
    }
  }

  onRegistro(): void {
    if (this.registroForm.valid) {
      this.cargando.set(true);
      this.mensaje.set('');

      // Simular registro
      setTimeout(() => {
        this.cargando.set(false);
        this.mensaje.set('¡Registro exitoso! Ahora puedes iniciar sesión.');
        this.mensajeError.set(false);
        
        // Cambiar al formulario de login después del registro exitoso
        setTimeout(() => {
          this.cambiarFormulario('login');
        }, 2000);
      }, 2000);
    } else {
      this.marcarCamposComoTocados(this.registroForm);
    }
  }

  onRecuperar(): void {
    if (this.recuperarForm.valid) {
      this.cargando.set(true);
      this.mensaje.set('');

      // Simular envío de email de recuperación
      setTimeout(() => {
        this.cargando.set(false);
        this.mensaje.set('Se han enviado las instrucciones de recuperación a tu email.');
        this.mensajeError.set(false);
        
        // Volver al login después de enviar
        setTimeout(() => {
          this.cambiarFormulario('login');
        }, 3000);
      }, 2000);
    } else {
      this.marcarCamposComoTocados(this.recuperarForm);
    }
  }

  private marcarCamposComoTocados(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.markAsTouched();
    });
  }
}
