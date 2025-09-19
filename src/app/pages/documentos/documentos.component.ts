import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, Download, Eye, Search, Filter } from 'lucide-angular';

interface Documento {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  fechaPublicacion: string;
  tamano: string;
  url: string;
}

@Component({
  selector: 'app-documentos',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="documentos">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">Documentos</h1>
          <p class="hero-subtitle">
            Accede a todos los documentos importantes, formularios, reglamentos y recursos educativos de nuestra institución
          </p>
        </div>
      </section>

      <!-- Filtros y Búsqueda -->
      <section class="controls-section">
        <div class="container">
          <div class="controls">
            <div class="search-box">
              <lucide-icon [name]="'search'" size="20" class="search-icon"></lucide-icon>
              <input 
                type="text" 
                placeholder="Buscar documentos..."
                class="search-input"
                #searchInput
                (input)="buscarDocumentos(searchInput.value)">
            </div>
            
            <div class="filters">
              <lucide-icon [name]="'filter'" size="20" class="filter-icon"></lucide-icon>
              <select class="filter-select" (change)="filtrarPorCategoria($event)">
                <option value="todos">Todas las categorías</option>
                <option value="Académico">Académicos</option>
                <option value="Administrativo">Administrativos</option>
                <option value="Normativo">Normativos</option>
                <option value="Formulario">Formularios</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- Lista de Documentos -->
      <section class="section">
        <div class="container">
          @if (documentosFiltrados().length > 0) {
            <div class="documentos-grid">
              @for (documento of documentosFiltrados(); track documento.id) {
                <div class="card documento-card">
                  <div class="card-header">
                    <div class="file-icon">
                      <lucide-icon [name]="'file-text'" size="48" class="icon"></lucide-icon>
                    </div>
                    <div class="category-badge" [class]="'category-' + documento.categoria.toLowerCase()">
                      {{ documento.categoria }}
                    </div>
                  </div>
                  
                  <div class="card-body">
                    <h3 class="card-title">{{ documento.nombre }}</h3>
                    <p class="card-text">{{ documento.descripcion }}</p>
                    
                    <div class="document-meta">
                      <span class="meta-item">
                        <strong>Fecha:</strong> {{ documento.fechaPublicacion }}
                      </span>
                      <span class="meta-item">
                        <strong>Tamaño:</strong> {{ documento.tamano }}
                      </span>
                    </div>
                    
                    <div class="card-actions">
                      <button 
                        class="btn btn-primary"
                        (click)="visualizarDocumento(documento)">
                        <lucide-icon [name]="'eye'" size="16"></lucide-icon>
                        Visualizar
                      </button>
                      <button 
                        class="btn btn-outline"
                        (click)="descargarDocumento(documento)">
                        <lucide-icon [name]="'download'" size="16"></lucide-icon>
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="no-results">
              <lucide-icon [name]="'file-text'" size="64" class="no-results-icon"></lucide-icon>
              <h3>No se encontraron documentos</h3>
              <p>No hay documentos que coincidan con tus criterios de búsqueda.</p>
              <button class="btn btn-primary" (click)="limpiarFiltros()">
                Mostrar Todos los Documentos
              </button>
            </div>
          }
        </div>
      </section>

      <!-- Modal para visualizar documento (simplificado) -->
      @if (documentoSeleccionado()) {
        <div class="modal-overlay" (click)="cerrarModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <h3>{{ documentoSeleccionado()!.nombre }}</h3>
              <button class="close-btn" (click)="cerrarModal()">×</button>
            </div>
            <div class="modal-body">
              <p>Vista previa del documento: {{ documentoSeleccionado()!.nombre }}</p>
              <p class="text-muted">
                En una implementación real, aquí se mostraría el contenido del PDF usando un visor de documentos.
              </p>
              <div class="modal-actions">
                <button class="btn btn-primary" (click)="descargarDocumento(documentoSeleccionado()!)">
                  <lucide-icon [name]="'download'" size="16"></lucide-icon>
                  Descargar Documento
                </button>
                <button class="btn btn-outline" (click)="cerrarModal()">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--accent-color) 0%, #f59e0b 100%);
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

    .controls-section {
      background-color: var(--bg-light);
      padding: 2rem 0;
      border-bottom: 1px solid var(--border-color);
    }

    .controls {
      display: flex;
      gap: 2rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-box {
      position: relative;
      flex: 1;
      min-width: 300px;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-light);
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 3rem;
      border: 2px solid var(--border-color);
      border-radius: 0.5rem;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    .filters {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-icon {
      color: var(--text-light);
    }

    .filter-select {
      padding: 0.75rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 0.5rem;
      font-size: 1rem;
      background: var(--white);
      cursor: pointer;
      transition: border-color 0.3s ease;
    }

    .filter-select:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    .documentos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .documento-card {
      transition: all 0.3s ease;
      height: fit-content;
    }

    .documento-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
      background: var(--bg-light);
      border-bottom: 1px solid var(--border-color);
    }

    .file-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, var(--accent-color), #f59e0b);
      border-radius: 0.75rem;
    }

    .icon {
      color: var(--white);
    }

    .category-badge {
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

    .category-normativo {
      background-color: #10b981;
    }

    .category-formulario {
      background-color: #8b5cf6;
    }

    .document-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }

    .meta-item {
      color: var(--text-light);
    }

    .meta-item strong {
      color: var(--text-dark);
    }

    .card-actions {
      display: flex;
      gap: 1rem;
    }

    .card-actions .btn {
      flex: 1;
      justify-content: center;
    }

    .no-results {
      text-align: center;
      padding: 4rem 2rem;
      color: var(--text-light);
    }

    .no-results-icon {
      color: var(--border-color);
      margin-bottom: 1rem;
    }

    .no-results h3 {
      font-size: 1.5rem;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }

    .no-results p {
      margin-bottom: 2rem;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: var(--white);
      border-radius: 1rem;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow: hidden;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .modal-header h3 {
      margin: 0;
      color: var(--text-dark);
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-light);
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.25rem;
      transition: all 0.3s ease;
    }

    .close-btn:hover {
      background: var(--bg-light);
      color: var(--text-dark);
    }

    .modal-body {
      padding: 2rem;
    }

    .text-muted {
      color: var(--text-light);
      font-style: italic;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .modal-actions .btn {
      flex: 1;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .controls {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }

      .search-box {
        min-width: auto;
      }

      .documentos-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .card-actions {
        flex-direction: column;
      }

      .modal-content {
        width: 95%;
        margin: 1rem;
      }

      .modal-body {
        padding: 1.5rem;
      }

      .modal-actions {
        flex-direction: column;
      }
    }
  `]
})
export class DocumentosComponent {
  documentoSeleccionado = signal<Documento | undefined>(undefined);
  terminoBusqueda = signal<string>('');
  categoriaSeleccionada = signal<string>('todos');

  todosLosDocumentos = signal<Documento[]>([
    {
      id: 1,
      nombre: 'Reglamento Interno Estudiantil',
      descripcion: 'Documento que establece las normas de convivencia, derechos y deberes de los estudiantes dentro de la institución.',
      categoria: 'Normativo',
      fechaPublicacion: '15 de Enero, 2025',
      tamano: '2.5 MB',
      url: '/documentos/reglamento-estudiantil.pdf'
    },
    {
      id: 2,
      nombre: 'Formulario de Inscripción',
      descripcion: 'Formulario oficial para el proceso de inscripción de estudiantes nuevos y renovación de matrícula.',
      categoria: 'Formulario',
      fechaPublicacion: '10 de Enero, 2025',
      tamano: '1.2 MB',
      url: '/documentos/formulario-inscripcion.pdf'
    },
    {
      id: 3,
      nombre: 'Manual de Convivencia',
      descripcion: 'Guía completa sobre las normas de convivencia escolar, procedimientos disciplinarios y protocolos de resolución de conflictos.',
      categoria: 'Normativo',
      fechaPublicacion: '8 de Enero, 2025',
      tamano: '3.1 MB',
      url: '/documentos/manual-convivencia.pdf'
    },
    {
      id: 4,
      nombre: 'Calendario Escolar 2025',
      descripcion: 'Cronograma oficial del año escolar con fechas importantes, períodos de evaluación, vacaciones y actividades especiales.',
      categoria: 'Académico',
      fechaPublicacion: '5 de Enero, 2025',
      tamano: '800 KB',
      url: '/documentos/calendario-escolar-2025.pdf'
    },
    {
      id: 5,
      nombre: 'Lista de Útiles Escolares',
      descripcion: 'Relación detallada de materiales y útiles escolares requeridos para cada grado y nivel educativo.',
      categoria: 'Académico',
      fechaPublicacion: '3 de Enero, 2025',
      tamano: '950 KB',
      url: '/documentos/lista-utiles-escolares.pdf'
    },
    {
      id: 6,
      nombre: 'Solicitud de Certificados',
      descripcion: 'Formulario para solicitar certificados de estudio, constancias de notas y otros documentos académicos.',
      categoria: 'Formulario',
      fechaPublicacion: '28 de Diciembre, 2024',
      tamano: '650 KB',
      url: '/documentos/solicitud-certificados.pdf'
    },
    {
      id: 7,
      nombre: 'Protocolo de Bioseguridad',
      descripcion: 'Medidas de seguridad sanitaria, protocolos de prevención y procedimientos en caso de emergencias de salud.',
      categoria: 'Normativo',
      fechaPublicacion: '20 de Diciembre, 2024',
      tamano: '1.8 MB',
      url: '/documentos/protocolo-bioseguridad.pdf'
    },
    {
      id: 8,
      nombre: 'Proyecto Educativo Institucional',
      descripcion: 'Documento que define la identidad, misión, visión y propuesta pedagógica de la institución educativa.',
      categoria: 'Académico',
      fechaPublicacion: '15 de Diciembre, 2024',
      tamano: '4.2 MB',
      url: '/documentos/proyecto-educativo-institucional.pdf'
    },
    {
      id: 9,
      nombre: 'Tarifas y Costos Educativos',
      descripcion: 'Estructura de costos de matrícula, mensualidades y servicios adicionales para el período académico 2025.',
      categoria: 'Administrativo',
      fechaPublicacion: '12 de Diciembre, 2024',
      tamano: '1.1 MB',
      url: '/documentos/tarifas-costos-educativos.pdf'
    },
    {
      id: 10,
      nombre: 'Autoriación de Salidas Pedagógicas',
      descripcion: 'Formulario de autorización que deben firmar los padres para que los estudiantes participen en actividades fuera del plantel.',
      categoria: 'Formulario',
      fechaPublicacion: '10 de Diciembre, 2024',
      tamano: '720 KB',
      url: '/documentos/autorizacion-salidas-pedagogicas.pdf'
    },
    {
      id: 11,
      nombre: 'Plan de Estudios Bachillerato',
      descripcion: 'Malla curricular completa del bachillerato con materias, cargas horarias y objetivos por año académico.',
      categoria: 'Académico',
      fechaPublicacion: '5 de Diciembre, 2024',
      tamano: '2.8 MB',
      url: '/documentos/plan-estudios-bachillerato.pdf'
    },
    {
      id: 12,
      nombre: 'Política de Evaluación',
      descripcion: 'Criterios, metodologías y procedimientos para la evaluación del rendimiento académico estudiantil.',
      categoria: 'Académico',
      fechaPublicacion: '1 de Diciembre, 2024',
      tamano: '1.9 MB',
      url: '/documentos/politica-evaluacion.pdf'
    }
  ]);

  documentosFiltrados = signal<Documento[]>([]);

  constructor() {
    this.documentosFiltrados.set(this.todosLosDocumentos());
  }

  buscarDocumentos(termino: string): void {
    this.terminoBusqueda.set(termino.toLowerCase());
    this.aplicarFiltros();
  }

  filtrarPorCategoria(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.categoriaSeleccionada.set(target.value);
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let documentos = this.todosLosDocumentos();

    // Filtrar por categoría
    if (this.categoriaSeleccionada() !== 'todos') {
      documentos = documentos.filter(doc => doc.categoria === this.categoriaSeleccionada());
    }

    // Filtrar por término de búsqueda
    if (this.terminoBusqueda()) {
      documentos = documentos.filter(doc =>
        doc.nombre.toLowerCase().includes(this.terminoBusqueda()) ||
        doc.descripcion.toLowerCase().includes(this.terminoBusqueda())
      );
    }

    this.documentosFiltrados.set(documentos);
  }

  limpiarFiltros(): void {
    this.terminoBusqueda.set('');
    this.categoriaSeleccionada.set('todos');
    this.documentosFiltrados.set(this.todosLosDocumentos());
    
    // Limpiar también los inputs del DOM
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    const filterSelect = document.querySelector('.filter-select') as HTMLSelectElement;
    if (searchInput) searchInput.value = '';
    if (filterSelect) filterSelect.value = 'todos';
  }

  visualizarDocumento(documento: Documento): void {
    this.documentoSeleccionado.set(documento);
  }

  descargarDocumento(documento: Documento): void {
    // En una implementación real, aquí se descargaría el archivo
    console.log('Descargando documento:', documento.nombre);
    alert(`Descargando: ${documento.nombre}\n\nEn una implementación real, aquí se iniciaría la descarga del archivo PDF.`);
  }

  cerrarModal(): void {
    this.documentoSeleccionado.set(undefined);
  }
}
