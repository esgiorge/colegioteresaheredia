import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideAngularModule, MapPin, Mail, Phone, Send } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <!-- Información de Contacto -->
          <div class="footer-section">
            <h3 class="footer-title">Información de Contacto</h3>
            <div class="contact-info">
              <div class="contact-item">
                <lucide-icon [img]="MapPinIcon" size="20" class="contact-icon"></lucide-icon>
                <p>Yucatan via a Duaca KM 13, al lado de la urb. Don Jeúsy</p>
              </div>
              <div class="contact-item">
                <lucide-icon [img]="MailIcon" size="20" class="contact-icon"></lucide-icon>
                <p>colegio@gmail.com</p>
              </div>
              <div class="contact-item">
                <lucide-icon [img]="PhoneIcon" size="20" class="contact-icon"></lucide-icon>
                <p>+58 251 123-4567</p>
              </div>
            </div>
          </div>

          <!-- Mapa -->
          <div class="footer-section">
            <h3 class="footer-title">Nuestra Ubicación</h3>
            <div class="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31363.68205!2d-69.3293855!3d10.0646737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8760157f7fffff%3A0x8b6c35ff52d2a8c6!2sYucatan%2C%20Lara%2C%20Venezuela!5e0!3m2!1ses!2sve!4v1234567890"
                width="100%" 
                height="200" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                title="Ubicación del U.E. Colegio Teresa Heredia">
              </iframe>
            </div>
          </div>

          <!-- Formulario de Contacto -->
          <div class="footer-section">
            <h3 class="footer-title">Contáctanos</h3>
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              @if (showSuccessMessage()) {
                <div class="alert alert-success">
                  ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.
                </div>
              }

              <div class="form-row">
                <div class="form-group">
                  <input 
                    type="text"
                    formControlName="nombres"
                    placeholder="Nombres y Apellidos"
                    class="form-input"
                    [class.error]="contactForm.get('nombres')?.invalid && contactForm.get('nombres')?.touched">
                </div>
                <div class="form-group">
                  <input 
                    type="email"
                    formControlName="email"
                    placeholder="Email"
                    class="form-input"
                    [class.error]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <input 
                    type="tel"
                    formControlName="telefono"
                    placeholder="Teléfono"
                    class="form-input"
                    [class.error]="contactForm.get('telefono')?.invalid && contactForm.get('telefono')?.touched">
                </div>
                <div class="form-group">
                  <input 
                    type="text"
                    formControlName="titulo"
                    placeholder="Título del mensaje"
                    class="form-input"
                    [class.error]="contactForm.get('titulo')?.invalid && contactForm.get('titulo')?.touched">
                </div>
              </div>

              <div class="form-group">
                <textarea 
                  formControlName="mensaje"
                  placeholder="Mensaje"
                  class="form-textarea"
                  [class.error]="contactForm.get('mensaje')?.invalid && contactForm.get('mensaje')?.touched">
                </textarea>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary"
                [disabled]="contactForm.invalid || isSubmitting()">
                @if (isSubmitting()) {
                  <span class="loading"></span>
                } @else {
                  <lucide-icon [img]="SendIcon" size="16"></lucide-icon>
                }
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2025 U.E. Colegio Teresa Heredia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--text-dark);
      color: var(--white);
      padding: 3rem 0 1rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section {
      display: flex;
      flex-direction: column;
    }

    .footer-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--white);
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .contact-icon {
      color: var(--accent-color);
      margin-top: 0.125rem;
      flex-shrink: 0;
    }

    .contact-item p {
      margin: 0;
      color: #d1d5db;
      line-height: 1.5;
    }

    .map-container {
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: var(--shadow);
    }

    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-input,
    .form-textarea {
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--white);
      border-radius: 0.375rem;
      padding: 0.75rem;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--accent-color);
      background-color: rgba(255, 255, 255, 0.15);
    }

    .form-input.error,
    .form-textarea.error {
      border-color: var(--secondary-color);
    }

    .form-textarea {
      min-height: 100px;
      resize: vertical;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1rem;
      text-align: center;
    }

    .footer-bottom p {
      margin: 0;
      color: #9ca3af;
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .form-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .footer {
        padding: 2rem 0 1rem;
      }
    }
  `]
})
export class FooterComponent {
  readonly MapPinIcon = MapPin;
  readonly MailIcon = Mail;
  readonly PhoneIcon = Phone;
  readonly SendIcon = Send;

  isSubmitting = signal(false);
  showSuccessMessage = signal(false);

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]+$/)]],
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      
      // Simular envío del formulario
      setTimeout(() => {
        this.isSubmitting.set(false);
        this.showSuccessMessage.set(true);
        this.contactForm.reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          this.showSuccessMessage.set(false);
        }, 5000);
      }, 2000);
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
}
