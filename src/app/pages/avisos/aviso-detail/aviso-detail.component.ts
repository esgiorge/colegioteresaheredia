import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Calendar, User, Tag } from 'lucide-angular';

interface Aviso {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  imagen: string;
  fecha: string;
  categoria: string;
  autor: string;
}

@Component({
  selector: 'app-aviso-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="aviso-detail">
      @if (aviso(); as avisoData) {
        <!-- Header -->
        <section class="hero">
          <div class="container">
            <button class="back-btn" (click)="volver()">
              <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
              Volver a Avisos
            </button>
            
            <div class="hero-content">
              <div class="category-badge" [class]="'category-' + avisoData.categoria.toLowerCase()">
                <lucide-icon [img]="TagIcon" size="16"></lucide-icon>
                {{ avisoData.categoria }}
              </div>
              <h1 class="hero-title">{{ avisoData.titulo }}</h1>
              <div class="hero-meta">
                <span class="meta-item">
                  <lucide-icon [img]="CalendarIcon" size="18"></lucide-icon>
                  {{ avisoData.fecha }}
                </span>
                <span class="meta-item">
                  <lucide-icon [img]="UserIcon" size="18"></lucide-icon>
                  {{ avisoData.autor }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Content -->
        <section class="content-section">
          <div class="container">
            <article class="article">
              <div class="article-image">
                <img [src]="avisoData.imagen" [alt]="avisoData.titulo" class="featured-image">
              </div>
              
              <div class="article-content">
                <div class="content" [innerHTML]="avisoData.contenido"></div>
              </div>
            </article>
          </div>
        </section>
      } @else {
        <section class="not-found">
          <div class="container">
            <h1>Aviso no encontrado</h1>
            <p>Lo sentimos, el aviso que buscas no existe o ha sido removido.</p>
            <button class="btn btn-primary" (click)="volver()">
              <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
              Volver a Avisos
            </button>
          </div>
        </section>
      }
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--primary-color) 0%, #3b82f6 100%);
      color: var(--white);
      padding: 2rem 0 4rem;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: var(--white);
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-bottom: 2rem;
      font-weight: 500;
    }

    .back-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateX(-4px);
    }

    .hero-content {
      max-width: 800px;
    }

    .category-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--white);
    }

    .category-académico {
      background-color: rgba(30, 64, 175, 0.8);
    }

    .category-administrativo {
      background-color: rgba(220, 38, 38, 0.8);
    }

    .category-evento {
      background-color: rgba(245, 158, 11, 0.8);
    }

    .category-inscripciones {
      background-color: rgba(16, 185, 129, 0.8);
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .hero-meta {
      display: flex;
      gap: 2rem;
      font-size: 1rem;
      opacity: 0.9;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .content-section {
      padding: 4rem 0;
      background: var(--white);
    }

    .article {
      max-width: 800px;
      margin: 0 auto;
    }

    .article-image {
      margin-bottom: 3rem;
    }

    .featured-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 1rem;
      box-shadow: var(--shadow-lg);
    }

    .article-content {
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--text-dark);
    }

    .content :global(h2) {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 2rem 0 1rem;
    }

    .content :global(h3) {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 1.5rem 0 0.75rem;
    }

    .content :global(h4) {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-dark);
      margin: 1rem 0 0.5rem;
    }

    .content :global(p) {
      margin-bottom: 1.5rem;
      color: var(--text-light);
    }

    .content :global(ul) {
      margin: 1rem 0 1.5rem 2rem;
      color: var(--text-light);
    }

    .content :global(li) {
      margin-bottom: 0.5rem;
    }

    .content :global(strong) {
      color: var(--text-dark);
      font-weight: 600;
    }

    .not-found {
      padding: 6rem 0;
      text-align: center;
      background: var(--bg-light);
      min-height: 60vh;
      display: flex;
      align-items: center;
    }

    .not-found h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 1rem;
    }

    .not-found p {
      font-size: 1.125rem;
      color: var(--text-light);
      margin-bottom: 2rem;
    }

    @media (max-width: 768px) {
      .hero {
        padding: 1.5rem 0 3rem;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-meta {
        flex-direction: column;
        gap: 0.75rem;
      }

      .featured-image {
        height: 250px;
      }

      .article-content {
        font-size: 1rem;
      }

      .content :global(h2) {
        font-size: 1.5rem;
      }

      .content :global(h3) {
        font-size: 1.25rem;
      }

      .not-found h1 {
        font-size: 2rem;
      }

      .not-found p {
        font-size: 1rem;
      }
    }
  `]
})
export class AvisoDetailComponent implements OnInit {
  readonly ArrowLeftIcon = ArrowLeft;
  readonly CalendarIcon = Calendar;
  readonly UserIcon = User;
  readonly TagIcon = Tag;

  aviso = signal<Aviso | undefined>(undefined);

  // Datos de ejemplo (en una aplicación real, estos vendrían de un servicio)
  private avisos: Aviso[] = [
    {
      id: 1,
      titulo: 'Inicio del Nuevo Año Escolar 2025',
      resumen: 'Te damos la bienvenida al nuevo período académico.',
      contenido: `
        <h2>Bienvenidos al Año Escolar 2025</h2>
        <p>Es un placer darles la bienvenida a todos nuestros estudiantes, padres y representantes al nuevo año escolar 2025. Este período trae consigo nuevas oportunidades, desafíos y experiencias de aprendizaje que contribuirán al crecimiento integral de nuestros estudiantes.</p>
        
        <h3>Fechas Importantes</h3>
        <ul>
          <li><strong>Inicio de clases:</strong> 22 de enero de 2025</li>
          <li><strong>Primera reunión de padres:</strong> 30 de enero de 2025</li>
          <li><strong>Período de adaptación:</strong> Del 22 al 29 de enero</li>
        </ul>
        
        <h3>Nuevas Modalidades Educativas</h3>
        <p>Este año implementaremos nuevas metodologías de enseñanza que incluyen:</p>
        <ul>
          <li>Aulas virtuales complementarias</li>
          <li>Proyectos interdisciplinarios</li>
          <li>Talleres de habilidades del siglo XXI</li>
        </ul>
        
        <p>Esperamos que este año escolar sea exitoso y enriquecedor para toda nuestra comunidad educativa.</p>
      `,
      imagen: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fecha: '15 de Enero, 2025',
      categoria: 'Académico',
      autor: 'Dirección General'
    },
    {
      id: 2,
      titulo: 'Proceso de Inscripciones Abiertas',
      resumen: 'Ya están abiertas las inscripciones para el período 2025-2026.',
      contenido: `
        <h2>Inscripciones Período 2025-2026</h2>
        <p>Nos complace anunciar que ya están abiertas las inscripciones para el próximo período académico 2025-2026. Te invitamos a formar parte de nuestra familia educativa.</p>
        
        <h3>Requisitos para Inscripción</h3>
        <h4>Estudiantes Nuevos:</h4>
        <ul>
          <li>Planilla de inscripción completa</li>
          <li>Partida de nacimiento (original y copia)</li>
          <li>Cédula de identidad del estudiante (si aplica)</li>
          <li>Cédula de identidad de los padres</li>
          <li>Certificado médico reciente</li>
          <li>Boletín de calificaciones del último año cursado</li>
          <li>2 fotos tipo carnet</li>
        </ul>
        
        <h4>Estudiantes Regulares:</h4>
        <ul>
          <li>Planilla de renovación</li>
          <li>Constancia de paz y salvo</li>
          <li>Actualización de datos de contacto</li>
        </ul>
        
        <h3>Fechas Importantes</h3>
        <ul>
          <li><strong>Inicio del proceso:</strong> 10 de enero de 2025</li>
          <li><strong>Cierre de inscripciones:</strong> 15 de marzo de 2025</li>
          <li><strong>Publicación de lista de admitidos:</strong> 20 de marzo de 2025</li>
        </ul>
        
        <p>Para más información, contacta a nuestro departamento de admisiones.</p>
      `,
      imagen: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fecha: '10 de Enero, 2025',
      categoria: 'Inscripciones',
      autor: 'Dpto. de Admisiones'
    }
    // Más avisos aquí...
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const avisoEncontrado = this.avisos.find(a => a.id === id);
    this.aviso.set(avisoEncontrado);
  }

  volver(): void {
    this.router.navigate(['/avisos']);
  }
}
