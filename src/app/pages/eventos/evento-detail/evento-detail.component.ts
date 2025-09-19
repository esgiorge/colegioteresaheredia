import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, ArrowLeft, Calendar, Clock, MapPin, DollarSign } from 'lucide-angular';

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  contenido: string;
  imagen: string;
  fecha: string;
  hora: string;
  lugar: string;
  categoria: string;
  precio?: string;
}

@Component({
  selector: 'app-evento-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="evento-detail">
      @if (evento(); as eventoData) {
        <!-- Header -->
        <section class="hero">
          <div class="container">
            <button class="back-btn" (click)="volver()">
              <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
              Volver a Eventos
            </button>
            
            <div class="hero-content">
              <div class="event-badges">
                <span class="category-badge" [class]="'category-' + eventoData.categoria.toLowerCase()">
                  {{ eventoData.categoria }}
                </span>
                @if (eventoData.precio) {
                  <span class="price-badge">
                    <lucide-icon [img]="DollarSignIcon" size="16"></lucide-icon>
                    {{ eventoData.precio }}
                  </span>
                }
              </div>
              <h1 class="hero-title">{{ eventoData.titulo }}</h1>
              <div class="event-meta">
                <div class="meta-item">
                  <lucide-icon [img]="CalendarIcon" size="20"></lucide-icon>
                  <span>{{ eventoData.fecha }}</span>
                </div>
                <div class="meta-item">
                  <lucide-icon [img]="ClockIcon" size="20"></lucide-icon>
                  <span>{{ eventoData.hora }}</span>
                </div>
                <div class="meta-item">
                  <lucide-icon [img]="MapPinIcon" size="20"></lucide-icon>
                  <span>{{ eventoData.lugar }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Content -->
        <section class="content-section">
          <div class="container">
            <div class="event-layout">
              <article class="event-content">
                <div class="content-image">
                  <img [src]="eventoData.imagen" [alt]="eventoData.titulo" class="featured-image">
                </div>
                
                <div class="content-body">
                  <div class="content" [innerHTML]="eventoData.contenido"></div>
                </div>
              </article>
              
              <aside class="event-sidebar">
                <div class="info-card">
                  <h3 class="info-title">Detalles del Evento</h3>
                  <div class="info-details">
                    <div class="info-item">
                      <lucide-icon [img]="CalendarIcon" size="18" class="info-icon"></lucide-icon>
                      <div class="info-content">
                        <span class="info-label">Fecha</span>
                        <span class="info-value">{{ eventoData.fecha }}</span>
                      </div>
                    </div>
                    <div class="info-item">
                      <lucide-icon [img]="ClockIcon" size="18" class="info-icon"></lucide-icon>
                      <div class="info-content">
                        <span class="info-label">Hora</span>
                        <span class="info-value">{{ eventoData.hora }}</span>
                      </div>
                    </div>
                    <div class="info-item">
                      <lucide-icon [img]="MapPinIcon" size="18" class="info-icon"></lucide-icon>
                      <div class="info-content">
                        <span class="info-label">Lugar</span>
                        <span class="info-value">{{ eventoData.lugar }}</span>
                      </div>
                    </div>
                    @if (eventoData.precio) {
                      <div class="info-item">
                        <lucide-icon [img]="DollarSignIcon" size="18" class="info-icon"></lucide-icon>
                        <div class="info-content">
                          <span class="info-label">Precio</span>
                          <span class="info-value">{{ eventoData.precio }}</span>
                        </div>
                      </div>
                    }
                  </div>
                  
                  <div class="action-buttons">
                    <button class="btn btn-primary full-width">
                      Confirmar Asistencia
                    </button>
                    <button class="btn btn-outline full-width">
                      Agregar al Calendario
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      } @else {
        <section class="not-found">
          <div class="container">
            <h1>Evento no encontrado</h1>
            <p>Lo sentimos, el evento que buscas no existe o ha sido removido.</p>
            <button class="btn btn-primary" (click)="volver()">
              <lucide-icon [img]="ArrowLeftIcon" size="20"></lucide-icon>
              Volver a Eventos
            </button>
          </div>
        </section>
      }
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--secondary-color) 0%, #dc2626 100%);
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

    .event-badges {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .category-badge {
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--white);
    }

    .category-cultural {
      background-color: rgba(245, 158, 11, 0.8);
    }

    .category-deportivo {
      background-color: rgba(30, 64, 175, 0.8);
    }

    .category-académico {
      background-color: rgba(220, 38, 38, 0.8);
    }

    .category-social {
      background-color: rgba(16, 185, 129, 0.8);
    }

    .price-badge {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--white);
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .event-meta {
      display: flex;
      gap: 2rem;
      font-size: 1rem;
      opacity: 0.9;
      flex-wrap: wrap;
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

    .event-layout {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 3rem;
    }

    .event-content {
      min-width: 0;
    }

    .content-image {
      margin-bottom: 3rem;
    }

    .featured-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 1rem;
      box-shadow: var(--shadow-lg);
    }

    .content-body {
      font-size: 1.125rem;
      line-height: 1.8;
      color: var(--text-dark);
    }

    .content :global(h2) {
      font-size: 2rem;
      font-weight: 700;
      color: var(--secondary-color);
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

    .event-sidebar {
      position: sticky;
      top: 2rem;
      height: fit-content;
    }

    .info-card {
      background: var(--white);
      border-radius: 1rem;
      box-shadow: var(--shadow-lg);
      padding: 2rem;
      border: 1px solid var(--border-color);
    }

    .info-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--border-color);
    }

    .info-details {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 2rem;
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .info-icon {
      color: var(--secondary-color);
      margin-top: 0.125rem;
      flex-shrink: 0;
    }

    .info-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .info-label {
      font-size: 0.875rem;
      color: var(--text-light);
      font-weight: 500;
    }

    .info-value {
      font-weight: 600;
      color: var(--text-dark);
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .full-width {
      width: 100%;
      justify-content: center;
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

      .event-meta {
        flex-direction: column;
        gap: 0.75rem;
      }

      .event-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .event-sidebar {
        position: static;
        order: -1;
      }

      .featured-image {
        height: 250px;
      }

      .content-body {
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
export class EventoDetailComponent implements OnInit {
  readonly ArrowLeftIcon = ArrowLeft;
  readonly CalendarIcon = Calendar;
  readonly ClockIcon = Clock;
  readonly MapPinIcon = MapPin;
  readonly DollarSignIcon = DollarSign;

  evento = signal<Evento | undefined>(undefined);

  // Datos de ejemplo (en una aplicación real, estos vendrían de un servicio)
  private eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Festival Cultural 2025',
      descripcion: 'Celebración de nuestras tradiciones venezolanas.',
      contenido: `
        <h2>Festival Cultural 2025: Celebrando Nuestras Tradiciones</h2>
        <p>Te invitamos a participar en nuestro tradicional Festival Cultural, un evento que celebra la riqueza de nuestras tradiciones venezolanas y la diversidad cultural de nuestra región.</p>
        
        <h3>Programa de Actividades</h3>
        <h4>9:00 AM - Apertura del Festival</h4>
        <ul>
          <li>Himno Nacional y del Estado</li>
          <li>Palabras de bienvenida de la Directora</li>
          <li>Inauguración de stands gastronómicos</li>
        </ul>
        
        <h4>10:00 AM - Presentaciones Culturales</h4>
        <ul>
          <li>Danzas tradicionales del Estado Lara</li>
          <li>Grupo de gaitas estudiantil</li>
          <li>Presentación del Coro Institucional</li>
        </ul>
      `,
      imagen: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fecha: '15 de Febrero, 2025',
      hora: '9:00 AM - 4:00 PM',
      lugar: 'Instalaciones del Colegio',
      categoria: 'Cultural'
    },
    {
      id: 2,
      titulo: 'Torneo Intercolegial de Fútbol',
      descripcion: 'Competencia deportiva entre colegios de la región.',
      contenido: `
        <h2>Torneo Intercolegial de Fútbol 2025</h2>
        <p>Competencia deportiva entre los mejores equipos de la región.</p>
      `,
      imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      fecha: '22 de Febrero, 2025',
      hora: '8:00 AM - 6:00 PM',
      lugar: 'Cancha del Colegio',
      categoria: 'Deportivo'
    }
    // Más eventos aquí...
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const eventoEncontrado = this.eventos.find(e => e.id === id);
    this.evento.set(eventoEncontrado);
  }

  volver(): void {
    this.router.navigate(['/eventos']);
  }
}
