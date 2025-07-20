import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Category } from '../../models/lesson.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="lessons-page">
      <div class="container">
        <div class="page-header">
          <h1>📚 Angular Learning Path</h1>
          <p>Master Angular through our comprehensive, hands-on curriculum</p>
        </div>
        
        <div class="categories" *ngFor="let category of categories$ | async">
          <div class="category-header">
            <h2>{{ category.icon }} {{ category.name }}</h2>
            <p>{{ category.description }}</p>
          </div>
          
          <div class="lessons-grid">
            <div 
              *ngFor="let lesson of category.lessons" 
              class="lesson-card"
              [class.completed]="isCompleted(lesson.id)"
              routerLink="/lesson/{{ lesson.id }}"
            >
              <div class="lesson-header">
                <h3>{{ lesson.title }}</h3>
                <span class="difficulty" [class]="lesson.difficulty">
                  {{ lesson.difficulty }}
                </span>
              </div>
              
              <p class="lesson-description">{{ lesson.description }}</p>
              
              <div class="lesson-footer">
                <div class="lesson-meta">
                  <span class="category-tag">{{ lesson.category }}</span>
                </div>
                <div class="completion-status">
                  <span *ngIf="isCompleted(lesson.id)" class="completed-badge">
                    ✅ Completed
                  </span>
                  <span *ngIf="!isCompleted(lesson.id)" class="start-badge">
                    🚀 Start
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="progress-section">
          <h3>🎯 Your Progress</h3>
          <div class="progress-stats">
            <div class="stat-card">
              <div class="stat-number">{{ getCompletedCount() }}</div>
              <div class="stat-label">Lessons Completed</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ getTotalLessons() }}</div>
              <div class="stat-label">Total Lessons</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ getProgressPercentage() }}%</div>
              <div class="stat-label">Progress</div>
            </div>
          </div>
          
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              [style.width.%]="getProgressPercentage()"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .lessons-page {
      min-height: 100vh;
      background: #f8fafc;
      padding: 2rem 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .page-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .page-header h1 {
      font-size: 3rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }
    
    .page-header p {
      font-size: 1.2rem;
      color: #4a5568;
    }
    
    .categories {
      margin-bottom: 4rem;
    }
    
    .category-header {
      margin-bottom: 2rem;
    }
    
    .category-header h2 {
      font-size: 2rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }
    
    .category-header p {
      color: #4a5568;
      font-size: 1.1rem;
    }
    
    .lessons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }
    
    .lesson-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      color: inherit;
      border: 2px solid transparent;
    }
    
    .lesson-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      border-color: #667eea;
    }
    
    .lesson-card.completed {
      border-color: #48bb78;
      background: linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%);
    }
    
    .lesson-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .lesson-header h3 {
      font-size: 1.3rem;
      color: #2d3748;
      margin: 0;
      flex: 1;
    }
    
    .difficulty {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-left: 1rem;
    }
    
    .difficulty.beginner {
      background: #c6f6d5;
      color: #22543d;
    }
    
    .difficulty.intermediate {
      background: #feebc8;
      color: #c05621;
    }
    
    .difficulty.advanced {
      background: #fed7d7;
      color: #c53030;
    }
    
    .lesson-description {
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .lesson-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .category-tag {
      background: #edf2f7;
      color: #4a5568;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .completed-badge {
      color: #22543d;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .start-badge {
      color: #667eea;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .progress-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      text-align: center;
    }
    
    .progress-section h3 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 2rem;
    }
    
    .progress-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
    }
    
    .stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
    }
    
    .stat-label {
      color: #4a5568;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }
    
    .progress-bar {
      background: #edf2f7;
      height: 12px;
      border-radius: 6px;
      overflow: hidden;
    }
    
    .progress-fill {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 100%;
      transition: width 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .lessons-grid {
        grid-template-columns: 1fr;
      }
      
      .lesson-header {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .difficulty {
        margin-left: 0;
        align-self: flex-start;
      }
    }
  `]
})
export class LessonListComponent implements OnInit {
  categories$: Observable<Category[]>;
  completedLessons: Set<string> = new Set();

  constructor(private lessonService: LessonService) {
    this.categories$ = this.lessonService.categories$;
  }

  ngOnInit() {
    this.lessonService.completedLessons$.subscribe(completed => {
      this.completedLessons = completed;
    });
  }

  isCompleted(lessonId: string): boolean {
    return this.lessonService.isLessonCompleted(lessonId);
  }

  getCompletedCount(): number {
    return this.completedLessons.size;
  }

  getTotalLessons(): number {
    let total = 0;
    this.lessonService.categories$.subscribe(categories => {
      total = categories.reduce((sum, category) => sum + category.lessons.length, 0);
    }).unsubscribe();
    return total;
  }

  getProgressPercentage(): number {
    const total = this.getTotalLessons();
    const completed = this.getCompletedCount();
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }
}