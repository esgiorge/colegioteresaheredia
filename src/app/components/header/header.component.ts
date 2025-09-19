import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <header class="header">
      <div class="container">
        <nav class="navbar">
          <div class="nav-brand">
            <a routerLink="/" class="brand-link">
              <img src="data:image/gif;base64,R0lGODlhgACAAHAAACH5BAEAAPwALAAAAACAAIAAAAL/jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8AAwocSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AgwsfTry48ePIkytfzry58+fQo0ufTr269evYs2vfzr279+/gw4sfT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26OGHIIYo4ogklmjiiSimqOKKLLbo4oswxijjjDTWaOONOOao44489ujjj0AGKeSQRBZp5JFIJqnkkkw26eSTUEYp5ZRUVmnllVhmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMYq66y01mrrrbjmquuuvPbq66/ABivssMQWa+yxyCar7LLMNuvss9BGK+201FZr7bXYZqvtttx26+234IYr7rjklmvuueimq+667Lbr7rvwxivvvPTWa++9+Oar77789uvvvwAHLPDABBds8MEIJ6zwwgw37PDDEEcs8cQUV2zxxRhnrPHGHHfs8ccghyzyyCSXbPLJKKes8sost+zyyzDHLPPMNNds880456zzzjz37PPPQAct9NBEF2300UgnrfTSTDft9NNQRy311FRXbfXVWGet9dZcd+3112CHLfbYZJdt9tlop6322my37fbbcMct99x012333XjnrffefPft99+ABy744IQXbvjhiCeu+OKMN+7445BHLvnklFdu+eWYZ6755px37vnnoIcu+uikl2766ainrvrqrLfu+uuwxy777LTXbvvtXAAAOw==" 
                   alt="Logo U.E. Colegio Teresa Heredia" 
                   class="logo">
              <div class="brand-text">
                <h1 class="brand-title">U.E. Colegio Teresa Heredia</h1>
                <p class="brand-subtitle">Excelencia Educativa</p>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="nav-menu desktop-menu">
            <a routerLink="/" 
               routerLinkActive="active" 
               [routerLinkActiveOptions]="{exact: true}"
               class="nav-link">Home</a>
            <a routerLink="/institucion" 
               routerLinkActive="active" 
               class="nav-link">Institución</a>
            <a routerLink="/avisos" 
               routerLinkActive="active" 
               class="nav-link">Avisos</a>
            <a routerLink="/eventos" 
               routerLinkActive="active" 
               class="nav-link">Eventos</a>
            <a routerLink="/documentos" 
               routerLinkActive="active" 
               class="nav-link">Documentos</a>
            <a routerLink="/login" 
               routerLinkActive="active" 
               class="nav-link login-link">Login</a>
          </div>

          <!-- Mobile Menu Toggle -->
          <button class="mobile-toggle" 
                  (click)="toggleMobileMenu()"
                  [attr.aria-label]="isMobileMenuOpen() ? 'Cerrar menú' : 'Abrir menú'">
            <lucide-icon [name]="isMobileMenuOpen() ? 'x' : 'menu'" size="24"></lucide-icon>
          </button>
        </nav>

        <!-- Mobile Navigation -->
        @if (isMobileMenuOpen()) {
          <div class="mobile-menu">
            <a routerLink="/" 
               routerLinkActive="active" 
               [routerLinkActiveOptions]="{exact: true}"
               class="mobile-nav-link"
               (click)="closeMobileMenu()">Home</a>
            <a routerLink="/institucion" 
               routerLinkActive="active" 
               class="mobile-nav-link"
               (click)="closeMobileMenu()">Institución</a>
            <a routerLink="/avisos" 
               routerLinkActive="active" 
               class="mobile-nav-link"
               (click)="closeMobileMenu()">Avisos</a>
            <a routerLink="/eventos" 
               routerLinkActive="active" 
               class="mobile-nav-link"
               (click)="closeMobileMenu()">Eventos</a>
            <a routerLink="/documentos" 
               routerLinkActive="active" 
               class="mobile-nav-link"
               (click)="closeMobileMenu()">Documentos</a>
            <a routerLink="/login" 
               routerLinkActive="active" 
               class="mobile-nav-link login-link"
               (click)="closeMobileMenu()">Login</a>
          </div>
        }
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: var(--white);
      box-shadow: var(--shadow);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }

    .nav-brand {
      flex-shrink: 0;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      color: var(--text-dark);
    }

    .logo {
      width: 50px;
      height: 50px;
      border-radius: 0.5rem;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--primary-color);
      line-height: 1.2;
    }

    .brand-subtitle {
      font-size: 0.875rem;
      color: var(--text-light);
      margin: 0;
    }

    .desktop-menu {
      display: none;
      align-items: center;
      gap: 2rem;
    }

    .nav-link {
      text-decoration: none;
      color: var(--text-dark);
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      color: var(--primary-color);
      background-color: var(--bg-light);
    }

    .nav-link.active {
      color: var(--primary-color);
      font-weight: 600;
    }

    .login-link {
      background-color: var(--primary-color);
      color: var(--white) !important;
    }

    .login-link:hover {
      background-color: #1d4ed8;
      color: var(--white) !important;
    }

    .mobile-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: var(--text-dark);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: background-color 0.3s ease;
    }

    .mobile-toggle:hover {
      background-color: var(--bg-light);
    }

    .mobile-menu {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem 0;
      border-top: 1px solid var(--border-color);
      margin-top: 1rem;
    }

    .mobile-nav-link {
      text-decoration: none;
      color: var(--text-dark);
      font-weight: 500;
      padding: 0.75rem 1rem;
      border-radius: 0.375rem;
      transition: all 0.3s ease;
    }

    .mobile-nav-link:hover {
      color: var(--primary-color);
      background-color: var(--bg-light);
    }

    .mobile-nav-link.active {
      color: var(--primary-color);
      font-weight: 600;
      background-color: var(--bg-light);
    }

    @media (min-width: 768px) {
      .desktop-menu {
        display: flex;
      }

      .mobile-toggle {
        display: none;
      }

      .brand-title {
        font-size: 1.5rem;
      }

      .brand-subtitle {
        font-size: 1rem;
      }
    }

    @media (max-width: 767px) {
      .brand-title {
        font-size: 1rem;
      }

      .brand-subtitle {
        font-size: 0.75rem;
      }

      .logo {
        width: 40px;
        height: 40px;
      }
    }
  `]
})
export class HeaderComponent {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(current => !current);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
