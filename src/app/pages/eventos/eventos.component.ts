import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Calendar, MapPin, Clock, ChevronRight } from 'lucide-angular';

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
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="eventos">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">Eventos y Actividades</h1>
          <p class="hero-subtitle">
            Descubre todas las actividades, eventos especiales y celebraciones que realizamos durante el año escolar
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
              Todos los Eventos
            </button>
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'Cultural'"
              (click)="filtrarPorCategoria('Cultural')">
              Cultural
            </button>
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'Deportivo'"
              (click)="filtrarPorCategoria('Deportivo')">
              Deportivo
            </button>
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'Académico'"
              (click)="filtrarPorCategoria('Académico')">
              Académico
            </button>
            <button 
              class="filter-btn"
              [class.active]="filtroActivo() === 'Social'"
              (click)="filtrarPorCategoria('Social')">
              Social
            </button>
          </div>
        </div>
      </section>

      <!-- Lista de Eventos -->
      <section class="section">
        <div class="container">
          <div class="eventos-grid">
            @for (evento of eventosFiltrados(); track evento.id) {
              <div class="card evento-card">
                <div class="card-header">
                  <img [src]="evento.imagen" [alt]="evento.titulo" class="card-image">
                  <div class="card-badges">
                    <span class="category-badge" [class]="'category-' + evento.categoria.toLowerCase()">
                      {{ evento.categoria }}
                    </span>
                    @if (evento.precio) {
                      <span class="price-badge">{{ evento.precio }}</span>
                    }
                  </div>
                </div>
                <div class="card-body">
                  <h3 class="card-title">{{ evento.titulo }}</h3>
                  <div class="event-details">
                    <div class="detail-item">
                      <lucide-icon [img]="CalendarIcon" size="16" class="detail-icon"></lucide-icon>
                      <span>{{ evento.fecha }}</span>
                    </div>
                    <div class="detail-item">
                      <lucide-icon [img]="ClockIcon" size="16" class="detail-icon"></lucide-icon>
                      <span>{{ evento.hora }}</span>
                    </div>
                    <div class="detail-item">
                      <lucide-icon [img]="MapPinIcon" size="16" class="detail-icon"></lucide-icon>
                      <span>{{ evento.lugar }}</span>
                    </div>
                  </div>
                  <p class="card-text">{{ evento.descripcion }}</p>
                  <a [routerLink]="['/eventos', evento.id]" class="btn btn-primary">
                    Ver Detalles
                    <lucide-icon [img]="ChevronRightIcon" size="16"></lucide-icon>
                  </a>
                </div>
              </div>
            } @empty {
              <div class="no-results">
                <p>No se encontraron eventos para la categoría seleccionada.</p>
              </div>
            }
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--secondary-color) 0%, #dc2626 100%);
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
      border-color: var(--secondary-color);
      color: var(--secondary-color);
    }

    .filter-btn.active {
      background: var(--secondary-color);
      border-color: var(--secondary-color);
      color: var(--white);
    }

    .eventos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .evento-card {
      transition: all 0.3s ease;
      border-left: 4px solid var(--secondary-color);
    }

    .evento-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--shadow-lg);
    }

    .card-badges {
      position: absolute;
      top: 1rem;
      left: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .category-badge {
      padding: 0.375rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--white);
    }

    .category-cultural {
      background-color: var(--accent-color);
    }

    .category-deportivo {
      background-color: var(--primary-color);
    }

    .category-académico {
      background-color: var(--secondary-color);
    }

    .category-social {
      background-color: #10b981;
    }

    .price-badge {
      background-color: rgba(0, 0, 0, 0.8);
      color: var(--white);
      padding: 0.375rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .event-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-light);
    }

    .detail-icon {
      color: var(--secondary-color);
      flex-shrink: 0;
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

      .eventos-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .event-details {
        gap: 0.75rem;
      }
    }
  `]
})
export class EventosComponent {
  readonly CalendarIcon = Calendar;
  readonly MapPinIcon = MapPin;
  readonly ClockIcon = Clock;
  readonly ChevronRightIcon = ChevronRight;

  filtroActivo = signal<string>('todos');

  todosLosEventos = signal<Evento[]>([
    {
      id: 1,
      titulo: 'Festival Cultural 2025',
      descripcion: 'Celebración de nuestras tradiciones venezolanas con presentaciones de danzas, gastronomía y artesanías regionales.',
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
        
        <h4>12:00 PM - Actividades Interactivas</h4>
        <ul>
          <li>Talleres de artesanías</li>
          <li>Juegos tradicionales</li>
          <li>Concurso de talentos estudiantiles</li>
        </ul>
        
        <h4>2:00 PM - Espectáculo Principal</h4>
        <ul>
          <li>Obra teatral "Florentino y el Diablo"</li>
          <li>Presentación de grupos invitados</li>
          <li>Premiación del concurso de talentos</li>
        </ul>
        
        <h3>Stands Gastronómicos</h3>
        <p>Durante todo el evento tendremos disponibles stands con comidas típicas venezolanas:</p>
        <ul>
          <li>Arepas y cachapas</li>
          <li>Empanadas y tequeños</li>
          <li>Chicha y papelón con limón</li>
          <li>Dulces criollos</li>
        </ul>
        
        <h3>Información Importante</h3>
        <ul>
          <li><strong>Entrada:</strong> Libre para toda la familia</li>
          <li><strong>Estacionamiento:</strong> Disponible en las instalaciones</li>
          <li><strong>Recomendaciones:</strong> Traer sombrero y protector solar</li>
        </ul>
      `,
      imagen: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '15 de Febrero, 2025',
      hora: '9:00 AM - 4:00 PM',
      lugar: 'Instalaciones del Colegio',
      categoria: 'Cultural'
    },
    {
      id: 2,
      titulo: 'Torneo Intercolegial de Fútbol',
      descripcion: 'Competencia deportiva entre colegios de la región. Participan estudiantes de 1er año hasta 5to año de bachillerato.',
      contenido: `
        <h2>Torneo Intercolegial de Fútbol 2025</h2>
        <p>Nos complace invitar a toda la comunidad educativa a presenciar nuestro torneo anual de fútbol, donde nuestros estudiantes-atletas competirán contra otros colegios de la región.</p>
        
        <h3>Categorías de Competencia</h3>
        <ul>
          <li><strong>Categoría Sub-15:</strong> Estudiantes de 1er y 2do año</li>
          <li><strong>Categoría Sub-17:</strong> Estudiantes de 3er y 4to año</li>
          <li><strong>Categoría Juvenil:</strong> Estudiantes de 5to año</li>
        </ul>
        
        <h3>Equipos Participantes</h3>
        <ul>
          <li>U.E. Colegio Teresa Heredia (Local)</li>
          <li>U.E. Simón Bolívar</li>
          <li>Colegio San José</li>
          <li>U.E. República de Venezuela</li>
          <li>Colegio Nuestra Señora del Carmen</li>
          <li>U.E. Francisco de Miranda</li>
        </ul>
        
        <h3>Cronograma de Partidos</h3>
        <h4>Sábado 22 de Febrero</h4>
        <ul>
          <li>8:00 AM - Categoría Sub-15: Semifinales</li>
          <li>10:00 AM - Categoría Sub-17: Semifinales</li>
          <li>12:00 PM - Categoría Juvenil: Semifinales</li>
          <li>2:00 PM - Descanso y actividades recreativas</li>
          <li>3:00 PM - Finales de todas las categorías</li>
        </ul>
        
        <h3>Premiación</h3>
        <ul>
          <li>Trofeos para los equipos 1er, 2do y 3er lugar en cada categoría</li>
          <li>Reconocimientos individuales: Mejor jugador, Mejor portero, Máximo goleador</li>
          <li>Copa al Fair Play para el equipo más deportivo</li>
        </ul>
        
        <h3>Información para Asistentes</h3>
        <ul>
          <li><strong>Entrada:</strong> Gratuita</li>
          <li><strong>Hidratación:</strong> Stands de bebidas disponibles</li>
          <li><strong>Estacionamiento:</strong> Disponible en calles aledañas</li>
          <li><strong>Recomendaciones:</strong> Traer sombrilla o gorra</li>
        </ul>
      `,
      imagen: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '22 de Febrero, 2025',
      hora: '8:00 AM - 6:00 PM',
      lugar: 'Cancha del Colegio',
      categoria: 'Deportivo'
    },
    {
      id: 3,
      titulo: 'Feria de Ciencias e Innovación',
      descripcion: 'Exposición de proyectos científicos realizados por nuestros estudiantes. Incluye experimentos, investigaciones y propuestas innovadoras.',
      contenido: `
        <h2>Feria de Ciencias e Innovación 2025</h2>
        <p>La ciencia y la innovación toman protagonismo en nuestra institución. Te invitamos a conocer los increíbles proyectos que nuestros estudiantes han desarrollado durante este año escolar.</p>
        
        <h3>Áreas de Exposición</h3>
        <h4>Ciencias Naturales</h4>
        <ul>
          <li>Biología: Ecosistemas locales y biodiversidad</li>
          <li>Química: Experimentos con materiales reciclados</li>
          <li>Física: Energías renovables y mecánica</li>
        </ul>
        
        <h4>Tecnología e Innovación</h4>
        <ul>
          <li>Robótica educativa</li>
          <li>Aplicaciones móviles</li>
          <li>Automatización del hogar</li>
          <li>Proyectos de sostenibilidad ambiental</li>
        </ul>
        
        <h4>Matemáticas Aplicadas</h4>
        <ul>
          <li>Estadística y probabilidad en la vida cotidiana</li>
          <li>Geometría en la arquitectura</li>
          <li>Modelos matemáticos para problemas reales</li>
        </ul>
        
        <h3>Actividades Especiales</h3>
        <ul>
          <li><strong>10:00 AM:</strong> Conferencia magistral "El futuro de la ciencia en Venezuela"</li>
          <li><strong>11:30 AM:</strong> Taller de experimentos para niños</li>
          <li><strong>1:00 PM:</strong> Demostración de robots</li>
          <li><strong>2:30 PM:</strong> Premiación de mejores proyectos</li>
        </ul>
        
        <h3>Invitados Especiales</h3>
        <ul>
          <li>Dr. Carlos Mendoza - Investigador del IVIC</li>
          <li>Ing. María Torres - Especialista en energías renovables</li>
          <li>Prof. Luis Ramírez - Coordinador de robótica UCLA</li>
        </ul>
        
        <h3>Premios y Reconocimientos</h3>
        <ul>
          <li>Mejor proyecto de cada área</li>
          <li>Premio a la innovación</li>
          <li>Reconocimiento al impacto social</li>
          <li>Mención especial a la creatividad</li>
        </ul>
        
        <p><strong>Nota:</strong> Los proyectos ganadores representarán al colegio en la Feria Regional de Ciencias.</p>
      `,
      imagen: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '8 de Marzo, 2025',
      hora: '9:00 AM - 4:00 PM',
      lugar: 'Laboratorios y Aulas del Colegio',
      categoria: 'Académico'
    },
    {
      id: 4,
      titulo: 'Cena de Graduación 5to Año',
      descripcion: 'Elegante cena de gala para celebrar la graduación de nuestros estudiantes de 5to año de bachillerato.',
      contenido: `
        <h2>Cena de Graduación - Promoción 2025</h2>
        <p>Es un honor invitar a toda la comunidad educativa a celebrar junto a nuestros graduandos de 5to año en una velada especial que marcará el cierre de una etapa importante en sus vidas.</p>
        
        <h3>Programa de la Velada</h3>
        <h4>7:00 PM - Recepción y Coctel</h4>
        <ul>
          <li>Bienvenida a graduandos y familiares</li>
          <li>Sesión fotográfica oficial</li>
          <li>Música ambiental en vivo</li>
        </ul>
        
        <h4>8:00 PM - Ceremonia de Graduación</h4>
        <ul>
          <li>Entrada de graduandos</li>
          <li>Himno Nacional e Institucional</li>
          <li>Palabras de la Directora</li>
          <li>Discurso del padrino de promoción</li>
          <li>Entrega de certificados</li>
          <li>Juramento de graduandos</li>
        </ul>
        
        <h4>9:00 PM - Cena de Gala</h4>
        <ul>
          <li>Menú gourmet de tres tiempos</li>
          <li>Brindis oficial</li>
          <li>Presentación del video de recuerdos</li>
          <li>Reconocimientos especiales</li>
        </ul>
        
        <h4>10:30 PM - Celebración</h4>
        <ul>
          <li>Primer vals de graduandos</li>
          <li>Música y baile</li>
          <li>Actividades de entretenimiento</li>
        </ul>
        
        <h3>Código de Vestimenta</h3>
        <ul>
          <li><strong>Graduandos:</strong> Traje formal (smoking/vestido de gala)</li>
          <li><strong>Familiares:</strong> Vestimenta elegante</li>
          <li><strong>Docentes:</strong> Formal</li>
        </ul>
        
        <h3>Menú de la Cena</h3>
        <h4>Primer Tiempo</h4>
        <p>Ensalada tropical con vinagreta de maracuyá</p>
        
        <h4>Segundo Tiempo</h4>
        <p>Opción 1: Pechuga de pollo a la plancha con vegetales<br>
        Opción 2: Filete de pescado en salsa de mariscos<br>
        Opción vegetariana: Lasaña de vegetales</p>
        
        <h4>Postre</h4>
        <p>Torta de graduación y cafe</p>
        
        <h3>Información Importante</h3>
        <ul>
          <li><strong>Costo por persona:</strong> $25 (incluye cena y bebidas)</li>
          <li><strong>Reservaciones:</strong> Hasta el 20 de marzo</li>
          <li><strong>Estacionamiento:</strong> Valet parking disponible</li>
          <li><strong>Fotografía:</strong> Servicio profesional incluido</li>
        </ul>
      `,
      imagen: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '28 de Marzo, 2025',
      hora: '7:00 PM - 12:00 AM',
      lugar: 'Hotel Barquisimeto Plaza',
      categoria: 'Social',
      precio: '$25 por persona'
    },
    {
      id: 5,
      titulo: 'Olimpiadas Matemáticas Internas',
      descripcion: 'Competencia académica de matemáticas entre estudiantes de todos los niveles para seleccionar representantes regionales.',
      contenido: `
        <h2>Olimpiadas Matemáticas Internas 2025</h2>
        <p>Las matemáticas son la base del conocimiento científico. Te invitamos a participar en nuestra competencia interna de matemáticas donde podrás demostrar tus habilidades y conocimientos.</p>
        
        <h3>Categorías de Participación</h3>
        <ul>
          <li><strong>Categoría Primaria:</strong> 1er a 6to grado</li>
          <li><strong>Categoría Media General:</strong> 1er a 3er año</li>
          <li><strong>Categoría Diversificada:</strong> 4to y 5to año</li>
        </ul>
        
        <h3>Fases de la Competencia</h3>
        <h4>Fase 1: Prueba Clasificatoria (5 de Abril)</h4>
        <ul>
          <li>Examen escrito de 20 preguntas</li>
          <li>Duración: 2 horas</li>
          <li>Los 10 mejores de cada categoría avanzan</li>
        </ul>
        
        <h4>Fase 2: Semifinal (12 de Abril)</h4>
        <ul>
          <li>Prueba práctica de resolución de problemas</li>
          <li>Duración: 3 horas</li>
          <li>Los 3 mejores de cada categoría avanzan</li>
        </ul>
        
        <h4>Fase 3: Final (19 de Abril)</h4>
        <ul>
          <li>Competencia oral y escrita</li>
          <li>Presentación de soluciones</li>
          <li>Selección de ganadores</li>
        </ul>
        
        <h3>Temas de Evaluación</h3>
        <h4>Categoría Primaria</h4>
        <ul>
          <li>Aritmética básica</li>
          <li>Geometría elemental</li>
          <li>Lógica y razonamiento</li>
        </ul>
        
        <h4>Categoría Media General</h4>
        <ul>
          <li>Álgebra</li>
          <li>Geometría plana</li>
          <li>Teoría de números</li>
          <li>Combinatoria básica</li>
        </ul>
        
        <h4>Categoría Diversificada</h4>
        <ul>
          <li>Álgebra avanzada</li>
          <li>Geometría analítica</li>
          <li>Trigonometría</li>
          <li>Cálculo diferencial</li>
          <li>Combinatoria y probabilidad</li>
        </ul>
        
        <h3>Premios y Reconocimientos</h3>
        <ul>
          <li><strong>1er lugar:</strong> Medalla de oro + Beca parcial + Representación regional</li>
          <li><strong>2do lugar:</strong> Medalla de plata + Reconocimiento especial</li>
          <li><strong>3er lugar:</strong> Medalla de bronce + Certificado de participación</li>
          <li><strong>Todos los finalistas:</strong> Certificado de excelencia académica</li>
        </ul>
        
        <h3>Inscripciones</h3>
        <ul>
          <li><strong>Fecha límite:</strong> 30 de marzo de 2025</li>
          <li><strong>Requisitos:</strong> Ser estudiante regular del colegio</li>
          <li><strong>Costo:</strong> Gratuito</li>
          <li><strong>Inscripción:</strong> Con el coordinador de matemáticas</li>
        </ul>
      `,
      imagen: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      fecha: '5 de Abril, 2025',
      hora: '8:00 AM - 12:00 PM',
      lugar: 'Aulas 201-205',
      categoria: 'Académico'
    }
  ]);

  eventosFiltrados = signal<Evento[]>([]);

  constructor() {
    this.eventosFiltrados.set(this.todosLosEventos());
  }

  filtrarPorCategoria(categoria: string): void {
    this.filtroActivo.set(categoria);
    
    if (categoria === 'todos') {
      this.eventosFiltrados.set(this.todosLosEventos());
    } else {
      const eventosFiltrados = this.todosLosEventos().filter(evento => evento.categoria === categoria);
      this.eventosFiltrados.set(eventosFiltrados);
    }
  }
}
