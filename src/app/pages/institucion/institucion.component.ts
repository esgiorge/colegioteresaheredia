import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Target, Eye, Award, Users } from 'lucide-angular';

@Component({
  selector: 'app-institucion',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="institucion">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <h1 class="hero-title">Nuestra Institución</h1>
          <p class="hero-subtitle">
            Conoce la historia, misión y visión que nos define como una institución educativa comprometida con la excelencia
          </p>
        </div>
      </section>

      <!-- Misión y Visión -->
      <section class="section">
        <div class="container">
          <div class="mission-vision-grid">
            <!-- Misión -->
            <div class="mission-vision-card">
              <div class="card-icon">
                <lucide-icon [img]="TargetIcon" size="48" class="icon"></lucide-icon>
              </div>
              <div class="card-content">
                <h2 class="card-title">Nuestra Misión</h2>
                <p class="card-text">
                  Formar ciudadanos íntegros, críticos y creativos, mediante una educación de calidad que promueva 
                  el desarrollo de competencias académicas, valores humanos y habilidades para la vida, contribuyendo 
                  al progreso de la sociedad venezolana y la construcción de un futuro próspero para nuestros estudiantes.
                </p>
                <div class="card-image">
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                       alt="Misión del colegio - Estudiantes en clase" 
                       class="image">
                </div>
              </div>
            </div>

            <!-- Visión -->
            <div class="mission-vision-card">
              <div class="card-icon">
                <lucide-icon [img]="EyeIcon" size="48" class="icon vision-icon"></lucide-icon>
              </div>
              <div class="card-content">
                <h2 class="card-title">Nuestra Visión</h2>
                <p class="card-text">
                  Ser reconocidos como una institución educativa líder en la región, caracterizada por la excelencia 
                  académica, la innovación pedagógica y la formación integral de ciudadanos comprometidos con los 
                  valores democráticos, el respeto a la diversidad y el desarrollo sostenible de nuestro país.
                </p>
                <div class="card-image">
                  <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                       alt="Visión del colegio - Graduación" 
                       class="image">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Valores Institucionales -->
      <section class="section values-section">
        <div class="container">
          <h2 class="section-title">Nuestros Valores</h2>
          <p class="section-subtitle">Los principios que guían nuestro quehacer educativo</p>
          
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <lucide-icon [img]="AwardIcon" size="32"></lucide-icon>
              </div>
              <h3 class="value-title">Excelencia</h3>
              <p class="value-text">Buscamos la calidad en todo lo que hacemos, promoviendo el mejoramiento continuo en nuestros procesos educativos.</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <lucide-icon [img]="UsersIcon" size="32"></lucide-icon>
              </div>
              <h3 class="value-title">Respeto</h3>
              <p class="value-text">Valoramos la dignidad de todas las personas, promoviendo un ambiente de tolerancia y comprensión mutua.</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <lucide-icon [img]="TargetIcon" size="32"></lucide-icon>
              </div>
              <h3 class="value-title">Responsabilidad</h3>
              <p class="value-text">Asumimos nuestros compromisos con seriedad y dedicación, formando ciudadanos responsables y comprometidos.</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <lucide-icon [img]="EyeIcon" size="32"></lucide-icon>
              </div>
              <h3 class="value-title">Honestidad</h3>
              <p class="value-text">Practicamos la transparencia y la sinceridad en todas nuestras acciones y relaciones interpersonales.</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <lucide-icon [img]="UsersIcon" size="32"></lucide-icon>
              </div>
              <h3 class="value-title">Solidaridad</h3>
              <p class="value-text">Fomentamos el apoyo mutuo y la cooperación, construyendo una comunidad educativa unida y colaborativa.</p>
            </div>

            <div class="value-card">
              <div class="value-icon">
                <lucide-icon [img]="AwardIcon" size="32"></lucide-icon>
              </div>
              <h3 class="value-title">Innovación</h3>
              <p class="value-text">Adoptamos nuevas metodologías y tecnologías para enriquecer el proceso de enseñanza-aprendizaje.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Historia -->
      <section class="section history-section">
        <div class="container">
          <div class="history-content">
            <div class="history-text">
              <h2 class="section-title text-left">Nuestra Historia</h2>
              <p class="history-paragraph">
                El U.E. Colegio Teresa Heredia fue fundado en el año 2005 con la visión de brindar educación de calidad 
                a la comunidad de Yucatán y sus alrededores. Desde sus inicios, la institución se ha caracterizado por 
                su compromiso con la excelencia académica y la formación integral de sus estudiantes.
              </p>
              <p class="history-paragraph">
                A lo largo de más de 20 años, hemos logrado posicionarnos como una de las instituciones educativas 
                más respetadas de la región, graduando generaciones de profesionales exitosos que han contribuido 
                al desarrollo de nuestro país en diversas áreas del conocimiento.
              </p>
              <p class="history-paragraph">
                Nuestro crecimiento ha sido constante, expandiendo nuestras instalaciones, modernizando nuestros 
                laboratorios y bibliotecas, e incorporando las últimas tecnologías educativas para brindar a 
                nuestros estudiantes las mejores herramientas para su desarrollo académico y personal.
              </p>
            </div>
            <div class="history-image">
              <img src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                   alt="Historia del colegio" 
                   class="image">
            </div>
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

    .mission-vision-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 4rem;
    }

    .mission-vision-card {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 2rem;
      align-items: start;
      background: var(--white);
      padding: 3rem;
      border-radius: 1rem;
      box-shadow: var(--shadow-lg);
      position: relative;
      overflow: hidden;
    }

    .mission-vision-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--primary-color);
    }

    .mission-vision-card:nth-child(even)::before {
      background: var(--secondary-color);
    }

    .card-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, var(--primary-color), #3b82f6);
      border-radius: 1rem;
      flex-shrink: 0;
    }

    .vision-icon {
      color: var(--white);
    }

    .icon {
      color: var(--white);
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .card-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-dark);
      margin: 0;
    }

    .card-text {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-light);
      margin: 0;
    }

    .card-image {
      margin-top: 1rem;
    }

    .image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 0.75rem;
      box-shadow: var(--shadow);
    }

    .values-section {
      background-color: var(--bg-light);
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .value-card {
      background: var(--white);
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: var(--shadow);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .value-card:hover {
      transform: translateY(-5px);
    }

    .value-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--primary-color), #3b82f6);
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      color: var(--white);
    }

    .value-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 1rem;
    }

    .value-text {
      color: var(--text-light);
      line-height: 1.6;
      margin: 0;
    }

    .history-section {
      background-color: var(--white);
    }

    .history-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .text-left {
      text-align: left;
    }

    .history-paragraph {
      font-size: 1.125rem;
      line-height: 1.7;
      color: var(--text-light);
      margin-bottom: 1.5rem;
    }

    .history-paragraph:last-child {
      margin-bottom: 0;
    }

    .history-image .image {
      height: 400px;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .hero-subtitle {
        font-size: 1rem;
      }

      .mission-vision-card {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 2rem;
        text-align: center;
      }

      .card-title {
        font-size: 1.5rem;
      }

      .card-text {
        font-size: 1rem;
      }

      .values-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .value-card {
        padding: 1.5rem;
      }

      .history-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .history-image .image {
        height: 250px;
      }
    }
  `]
})
export class InstitucionComponent {
  readonly TargetIcon = Target;
  readonly EyeIcon = Eye;
  readonly AwardIcon = Award;
  readonly UsersIcon = Users;
}
