import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Calendar, Users, BookOpen, ChevronRight } from 'lucide-angular';

interface Anuncio {
  id: number;
  titulo: string;
  resumen: string;
  imagen: string;
  fecha: string;
  categoria: string;
}

interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  imagen: string;
  fecha: string;
  autor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">
                Bienvenidos al <span class="highlight">U.E. Colegio Teresa Heredia</span>
              </h1>
              <p class="hero-subtitle">
                Formando líderes del futuro con excelencia académica, valores sólidos y compromiso social. 
                Más de 20 años educando con calidad y dedicación.
              </p>
              <div class="hero-actions">
                <a routerLink="/institucion" class="btn btn-primary">
                  Conoce Nuestra Institución
                  <lucide-icon [img]="ChevronRightIcon" size="20"></lucide-icon>
                </a>
                <a routerLink="/login" class="btn btn-outline">Acceso Estudiantes</a>
              </div>
            </div>
            <div class="hero-image">
              <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                   alt="Estudiantes del U.E. Colegio Teresa Heredia"
                   class="hero-img">
            </div>
          </div>
        </div>
      </section>

      <!-- Estadísticas -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <lucide-icon [img]="UsersIcon" size="40" class="stat-icon"></lucide-icon>
              <h3 class="stat-number">500+</h3>
              <p class="stat-label">Estudiantes</p>
            </div>
            <div class="stat-card">
              <lucide-icon [img]="BookOpenIcon" size="40" class="stat-icon"></lucide-icon>
              <h3 class="stat-number">45+</h3>
              <p class="stat-label">Docentes</p>
            </div>
            <div class="stat-card">
              <lucide-icon [img]="CalendarIcon" size="40" class="stat-icon"></lucide-icon>
              <h3 class="stat-number">20+</h3>
              <p class="stat-label">Años de Experiencia</p>
            </div>
            <div class="stat-card">
              <lucide-icon [img]="BookOpenIcon" size="40" class="stat-icon"></lucide-icon>
              <h3 class="stat-number">15+</h3>
              <p class="stat-label">Programas Académicos</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Anuncios Importantes -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">Anuncios Importantes</h2>
          <p class="section-subtitle">Mantente informado sobre las últimas novedades de nuestra institución</p>
          
          <div class="grid grid-cols-3">
            @for (anuncio of anuncios(); track anuncio.id) {
              <div class="card announcement-card">
                <div class="card-header">
                  <img [src]="anuncio.imagen" [alt]="anuncio.titulo" class="card-image">
                  <div class="card-badge">{{ anuncio.categoria }}</div>
                </div>
                <div class="card-body">
                  <h3 class="card-title">{{ anuncio.titulo }}</h3>
                  <p class="card-date">{{ anuncio.fecha }}</p>
                  <p class="card-text">{{ anuncio.resumen }}</p>
                  <a [routerLink]="['/avisos', anuncio.id]" class="btn btn-primary">
                    Leer Más
                    <lucide-icon [img]="ChevronRightIcon" size="16"></lucide-icon>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Noticias -->
      <section class="section news-section">
        <div class="container">
          <h2 class="section-title">Noticias Destacadas</h2>
          <p class="section-subtitle">Las últimas noticias y eventos de nuestra comunidad educativa</p>
          
          <div class="grid grid-cols-3">
            @for (noticia of noticias(); track noticia.id) {
              <div class="card news-card">
                <div class="card-header">
                  <img [src]="noticia.imagen" [alt]="noticia.titulo" class="card-image">
                </div>
                <div class="card-body">
                  <h3 class="card-title">{{ noticia.titulo }}</h3>
                  <div class="news-meta">
                    <span class="news-date">{{ noticia.fecha }}</span>
                    <span class="news-author">Por {{ noticia.autor }}</span>
                  </div>
                  <p class="card-text">{{ noticia.resumen }}</p>
                  <a [routerLink]="['/avisos', noticia.id]" class="btn btn-outline">
                    Leer Más
                    <lucide-icon [img]="ChevronRightIcon" size="16"></lucide-icon>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
      color: var(--white);
      padding: 4rem 0;
      overflow: hidden;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .highlight {
      color: var(--accent-color);
    }

    .hero-subtitle {
      font-size: 1.125rem;
      line-height: 1.7;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .hero-image {
      position: relative;
    }

    .hero-img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 1rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }

    .stats-section {
      background-color: var(--bg-light);
      padding: 3rem 0;
      margin-top: -2rem;
      position: relative;
      z-index: 10;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .stat-card {
      background: var(--white);
      padding: 2rem;
      border-radius: 0.75rem;
      text-align: center;
      box-shadow: var(--shadow);
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
    }

    .stat-icon {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: var(--text-light);
      font-weight: 500;
      margin: 0;
    }

    .announcement-card {
      border-left: 4px solid var(--primary-color);
    }

    .card-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background-color: var(--accent-color);
      color: var(--white);
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .card-date {
      color: var(--text-light);
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
      font-weight: 500;
    }

    .news-section {
      background-color: var(--bg-light);
    }

    .news-card {
      border-left: 4px solid var(--secondary-color);
    }

    .news-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
    }

    .news-date {
      color: var(--text-light);
      font-weight: 500;
    }

    .news-author {
      color: var(--primary-color);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        gap: 2rem;
        text-align: center;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .hero-actions {
        justify-content: center;
      }

      .hero-img {
        height: 250px;
      }

      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .stat-card {
        padding: 1.5rem;
      }

      .stat-number {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent {
  readonly CalendarIcon = Calendar;
  readonly UsersIcon = Users;
  readonly BookOpenIcon = BookOpen;
  readonly ChevronRightIcon = ChevronRight;

  anuncios = signal<Anuncio[]>([
    {
      id: 1,
      titulo: 'Inicio del Nuevo Año Escolar 2025',
      resumen: 'Te damos la bienvenida al nuevo período académico. Conoce los horarios, fechas importantes y nuevas modalidades educativas.',
      imagen: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '15 de Enero, 2025',
      categoria: 'Académico'
    },
    {
      id: 2,
      titulo: 'Proceso de Inscripciones Abiertas',
      resumen: 'Ya están abiertas las inscripciones para el período 2025-2026. Conoce los requisitos y fechas límite para completar tu proceso.',
      imagen: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '10 de Enero, 2025',
      categoria: 'Inscripciones'
    },
    {
      id: 3,
      titulo: 'Nuevas Becas de Excelencia Académica',
      resumen: 'Presentamos nuestro programa de becas para estudiantes destacados. Descubre cómo aplicar y los beneficios disponibles.',
      imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '8 de Enero, 2025',
      categoria: 'Becas'
    }
  ]);

  noticias = signal<Noticia[]>([
    {
      id: 4,
      titulo: 'Estudiantes Ganan Primer Lugar en Olimpiadas de Matemáticas',
      resumen: 'Nuestro equipo de matemáticas obtuvo el primer lugar en las Olimpiadas Regionales, demostrando la excelencia de nuestro programa académico.',
      imagen: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '12 de Enero, 2025',
      autor: 'Prof. María González'
    },
    {
      id: 5,
      titulo: 'Inauguración del Nuevo Laboratorio de Ciencias',
      resumen: 'Hemos inaugurado nuestro moderno laboratorio de ciencias, equipado con la última tecnología para potenciar el aprendizaje práctico.',
      imagen: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '9 de Enero, 2025',
      autor: 'Dirección General'
    },
    {
      id: 6,
      titulo: 'Festival Cultural 2025: Celebrando Nuestras Tradiciones',
      resumen: 'El próximo mes realizaremos nuestro tradicional Festival Cultural donde estudiantes y familias celebrarán la diversidad y tradiciones venezolanas.',
      imagen: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '7 de Enero, 2025',
      autor: 'Coordinación Cultural'
    }
  ]);
}
