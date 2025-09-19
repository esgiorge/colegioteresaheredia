import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Calendar, Tag, ChevronRight } from 'lucide-angular';

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
  selector: 'app-avisos',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="avisos">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">Avisos Importantes</h1>
          <p class="hero-subtitle">
            Mantente informado sobre las últimas novedades, comunicados y anuncios de nuestra institución
          </p>
        </div>
      </section>

      <!-- Filtros -->
      <section class="filters-section">
        <div class="container">
          <div class="filters">
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'todos'"
              (click)="filtrarPorCategoria('todos')">
              Todos los Avisos
            </button>
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'Académico'"
              (click)="filtrarPorCategoria('Académico')">
              Académicos
            </button>
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'Administrativo'"
              (click)="filtrarPorCategoria('Administrativo')">
              Administrativos
            </button>
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'Evento'"
              (click)="filtrarPorCategoria('Evento')">
              Eventos
            </button>
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'Inscripciones'"
              (click)="filtrarPorCategoria('Inscripciones')">
              Inscripciones
            </button>
          </div>
        </div>
      </section>

      <!-- Lista de Avisos -->
      <section class="section">
        <div class="container">
          <div class="avisos-grid">
            @for (aviso of avisosFiltrados(); track aviso.id) {
              <div class="card aviso-card">
                <div class="card-header">
                  <img [src]="aviso.imagen" [alt]="aviso.titulo" class="card-image">
                  <div class="card-badges">
                    <span class="category-badge" [class]="'category-' + aviso.categoria.toLowerCase()">
                      <lucide-icon [img]="TagIcon" size="14"></lucide-icon>
                      {{ aviso.categoria }}
                    </span>
                  </div>
                </div>
                <div class="card-body">
                  <h3 class="card-title">{{ aviso.titulo }}</h3>
                  <div class="card-meta">
                    <span class="meta-item">
                      <lucide-icon [img]="CalendarIcon" size="16"></lucide-icon>
                      {{ aviso.fecha }}
                    </span>
                    <span class="meta-author">Por {{ aviso.autor }}</span>
                  </div>
                  <p class="card-text">{{ aviso.resumen }}</p>
                  <a [routerLink]="['/avisos', aviso.id]" class="btn btn-primary">
                    Leer Más
                    <lucide-icon [img]="ChevronRightIcon" size="16"></lucide-icon>
                  </a>
                </div>
              </div>
            } @empty {
              <div class="no-results">
                <p>No se encontraron avisos para la categoría seleccionada.</p>
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
      text-align: center;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      opacity: 0.9;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .filters-section {
      background-color: var(--bg-light);
      padding: 2rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .filters {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .filter-btn {
      padding: 0.75rem 1.5rem;
      border: 2px solid var(--border-color);
      background: var(--white);
      color: var(--text-dark);
      border-radius: 2rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .filter-btn:hover {
      border-color: var(--primary-color);
      color: var(--primary-color);
    }

    .filter-btn.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--white);
    }

    .avisos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .aviso-card {
      transition: all 0.3s ease;
    }

    .aviso-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }

    .card-badges {
      position: absolute;
      top: 1rem;
      left: 1rem;
      display: flex;
      gap: 0.5rem;
    }

    .category-badge {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.375rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--white);
    }

    .category-académico {
      background-color: var(--primary-color);
    }

    .category-administrativo {
      background-color: var(--secondary-color);
    }

    .category-evento {
      background-color: var(--accent-color);
    }

    .category-inscripciones {
      background-color: #10b981;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      color: var(--text-light);
    }

    .meta-author {
      color: var(--primary-color);
      font-weight: 600;
    }

    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-light);
      font-size: 1.125rem;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .filters {
        flex-direction: column;
        align-items: center;
      }

      .filter-btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
      }

      .avisos-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .card-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export class AvisosComponent {
  readonly CalendarIcon = Calendar;
  readonly TagIcon = Tag;
  readonly ChevronRightIcon = ChevronRight;

  filtroActivo = signal<string>('todos');

  todosLosAvisos = signal<Aviso[]>([
    {
      id: 1,
      titulo: 'Inicio del Nuevo Año Escolar 2025',
      resumen: 'Te damos la bienvenida al nuevo período académico. Conoce los horarios, fechas importantes y nuevas modalidades educativas que implementaremos este año.',
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
      imagen: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '15 de Enero, 2025',
      categoria: 'Académico',
      autor: 'Dirección General'
    },
    {
      id: 2,
      titulo: 'Proceso de Inscripciones Abiertas',
      resumen: 'Ya están abiertas las inscripciones para el período 2025-2026. Conoce los requisitos y fechas límite para completar tu proceso de inscripción.',
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
      imagen: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '10 de Enero, 2025',
      categoria: 'Inscripciones',
      autor: 'Dpto. de Admisiones'
    },
    {
      id: 3,
      titulo: 'Suspensión de Clases - Día de la Educación',
      resumen: 'Informamos que el día 28 de enero no habrá actividades académicas en conmemoración del Día Nacional de la Educación.',
      contenido: `
        <h2>Suspensión de Actividades Académicas</h2>
        <p>De acuerdo con el calendario escolar nacional y en conmemoración del <strong>Día Nacional de la Educación</strong>, informamos a toda la comunidad educativa que:</p>
        
        <h3>Fecha de Suspensión</h3>
        <p><strong>Lunes, 28 de enero de 2025</strong> - No habrá actividades académicas presenciales.</p>
        
        <h3>Actividades Programadas</h3>
        <p>Aunque no habrá clases regulares, se realizarán las siguientes actividades especiales:</p>
        <ul>
          <li>Ceremonia virtual de reconocimiento a docentes destacados</li>
          <li>Conferencia magistral sobre innovación educativa</li>
          <li>Talleres opcionales para padres sobre acompañamiento académico</li>
        </ul>
        
        <h3>Reanudación de Actividades</h3>
        <p>Las actividades académicas regulares se reanudarán normalmente el <strong>martes, 29 de enero de 2025</strong> según el horario establecido.</p>
        
        <p>Agradecemos su comprensión y los invitamos a participar en las actividades conmemorativas programadas.</p>
      `,
      imagen: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '20 de Enero, 2025',
      categoria: 'Administrativo',
      autor: 'Coordinación Académica'
    },
    {
      id: 4,
      titulo: 'Festival Cultural 2025 - Celebrando Tradiciones',
      resumen: 'Te invitamos a participar en nuestro tradicional Festival Cultural donde celebraremos la diversidad y las tradiciones venezolanas.',
      contenido: `
        <h2>Festival Cultural 2025</h2>
        <p>Con gran alegría invitamos a toda la comunidad educativa a participar en nuestro <strong>Festival Cultural 2025</strong>, un evento que celebra la riqueza de nuestras tradiciones venezolanas y la diversidad cultural de nuestra región.</p>
        
        <h3>Fecha y Horario</h3>
        <ul>
          <li><strong>Fecha:</strong> Sábado, 15 de febrero de 2025</li>
          <li><strong>Horario:</strong> 9:00 AM - 4:00 PM</li>
          <li><strong>Lugar:</strong> Instalaciones del colegio</li>
        </ul>
        
        <h3>Actividades Programadas</h3>
        <ul>
          <li>Presentaciones de danzas tradicionales</li>
          <li>Exposición de gastronomía venezolana</li>
          <li>Muestras de artesanías regionales</li>
          <li>Concurso de talentos estudiantiles</li>
          <li>Obra teatral "Florentino y el Diablo"</li>
          <li>Presentación del Coro Institucional</li>
        </ul>
        
        <h3>Participación</h3>
        <p>Invitamos a estudiantes, padres y representantes a participar activamente en este evento. Los estudiantes interesados en participar en las presentaciones deben inscribirse con su profesor de educación artística antes del 5 de febrero.</p>
        
        <h3>Información Adicional</h3>
        <ul>
          <li>Entrada libre para toda la familia</li>
          <li>Habrá venta de comidas típicas</li>
          <li>Estacionamiento disponible</li>
        </ul>
        
        <p>¡Los esperamos para vivir juntos una jornada llena de cultura, tradición y alegría!</p>
      `,
      imagen: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '18 de Enero, 2025',
      categoria: 'Evento',
      autor: 'Coordinación Cultural'
    },
    {
      id: 5,
      titulo: 'Actualización de Protocolos de Bioseguridad',
      resumen: 'Informamos sobre las nuevas medidas de bioseguridad que se implementarán en las instalaciones del colegio para garantizar la salud de todos.',
      contenido: `
        <h2>Protocolos de Bioseguridad Actualizados</h2>
        <p>En nuestro compromiso continuo con la salud y seguridad de toda la comunidad educativa, hemos actualizado nuestros protocolos de bioseguridad de acuerdo con las últimas recomendaciones de las autoridades sanitarias.</p>
        
        <h3>Medidas Implementadas</h3>
        
        <h4>Para el Ingreso al Plantel:</h4>
        <ul>
          <li>Toma de temperatura en todas las entradas</li>
          <li>Uso obligatorio de mascarilla en espacios cerrados</li>
          <li>Desinfección de manos con gel antibacterial</li>
          <li>Distanciamiento social de 1 metro en filas</li>
        </ul>
        
        <h4>En las Aulas:</h4>
        <ul>
          <li>Ventilación constante de los espacios</li>
          <li>Limpieza y desinfección de superficies cada 2 horas</li>
          <li>Capacidad reducida al 80% en aulas pequeñas</li>
          <li>Rotación de estudiantes en laboratorios</li>
        </ul>
        
        <h4>En Áreas Comunes:</h4>
        <ul>
          <li>Señalización de distanciamiento social</li>
          <li>Dispensadores de gel antibacterial disponibles</li>
          <li>Limpieza profunda de cafetería y baños</li>
          <li>Horarios escalonados para el recreo</li>
        </ul>
        
        <h3>Responsabilidades de la Comunidad</h3>
        <p>Solicitamos la colaboración de todos para:</p>
        <ul>
          <li>Reportar cualquier síntoma de enfermedad</li>
          <li>Mantener la higiene personal</li>
          <li>Respetar las medidas de distanciamiento</li>
          <li>Colaborar con los protocolos establecidos</li>
        </ul>
        
        <p>Estas medidas entrarán en vigencia a partir del 22 de enero de 2025. Agradecemos su comprensión y colaboración.</p>
      `,
      imagen: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '16 de Enero, 2025',
      categoria: 'Administrativo',
      autor: 'Dpto. de Bienestar Estudiantil'
    }
  ]);

  avisosFiltrados = signal<Aviso[]>([]);

  constructor() {
    this.avisosFiltrados.set(this.todosLosAvisos());
  }

  filtrarPorCategoria(categoria: string): void {
    this.filtroActivo.set(categoria);
    
    if (categoria === 'todos') {
      this.avisosFiltrados.set(this.todosLosAvisos());
    } else {
      const avisosFiltrados = this.todosLosAvisos().filter(aviso => aviso.categoria === categoria);
      this.avisosFiltrados.set(avisosFiltrados);
    }
  }
}
