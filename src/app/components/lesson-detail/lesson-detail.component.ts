import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="lesson-detail" *ngIf="lesson">
      <div class="container">
        <div class="lesson-header">
          <button routerLink="/lessons" class="back-btn">
            ← Back to Lessons
          </button>
          
          <div class="lesson-meta">
            <h1>{{ lesson.title }}</h1>
            <div class="meta-info">
              <span class="difficulty" [class]="lesson.difficulty">
                {{ lesson.difficulty }}
              </span>
              <span class="category">{{ lesson.category }}</span>
              <span *ngIf="isCompleted" class="completed-status">
                ✅ Completed
              </span>
            </div>
          </div>
        </div>
        
        <div class="lesson-content">
          <div class="content-section">
            <div class="lesson-text" [innerHTML]="getFormattedContent()"></div>
            
            <div *ngIf="lesson.codeExample" class="code-section">
              <h3>💻 Code Example</h3>
              <div class="code-container">
                <div class="code-header">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                  <span class="file-name">example.ts</span>
                </div>
                <pre class="code-content">{{ lesson.codeExample }}</pre>
              </div>
            </div>
            
            <div class="lesson-actions">
              <button 
                *ngIf="!isCompleted" 
                (click)="markComplete()" 
                class="btn btn-primary"
              >
                ✅ Mark as Complete
              </button>
              
              <button 
                *ngIf="isCompleted" 
                (click)="markIncomplete()" 
                class="btn btn-secondary"
              >
                🔄 Mark as Incomplete
              </button>
              
              <button routerLink="/playground" class="btn btn-accent">
                🎮 Try in Playground
              </button>
            </div>
          </div>
          
          <div class="sidebar">
            <div class="progress-card">
              <h3>📊 Your Progress</h3>
              <div class="progress-info">
                <div class="progress-stat">
                  <span class="number">{{ getCompletedCount() }}</span>
                  <span class="label">Completed</span>
                </div>
                <div class="progress-stat">
                  <span class="number">{{ getTotalLessons() }}</span>
                  <span class="label">Total</span>
                </div>
              </div>
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  [style.width.%]="getProgressPercentage()"
                ></div>
              </div>
            </div>
            
            <div class="tips-card">
              <h3>💡 Learning Tips</h3>
              <ul>
                <li>Take your time to understand each concept</li>
                <li>Try modifying the code examples</li>
                <li>Practice in the playground</li>
                <li>Don't hesitate to revisit previous lessons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="!lesson" class="not-found">
      <div class="container">
        <h1>Lesson Not Found</h1>
        <p>The lesson you're looking for doesn't exist.</p>
        <button routerLink="/lessons" class="btn btn-primary">
          Back to Lessons
        </button>
      </div>
    </div>
  `,
  styles: [`
    .lesson-detail {
      min-height: 100vh;
      background: #f8fafc;
      padding: 2rem 0;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .lesson-header {
      margin-bottom: 2rem;
    }
    
    .back-btn {
      background: none;
      border: none;
      color: #667eea;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 1rem;
      padding: 0.5rem 0;
      text-decoration: none;
    }
    
    .back-btn:hover {
      text-decoration: underline;
    }
    
    .lesson-meta h1 {
      font-size: 2.5rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }
    
    .meta-info {
      display: flex;
      gap: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }
    
    .difficulty {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
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
    
    .category {
      background: #edf2f7;
      color: #4a5568;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .completed-status {
      color: #22543d;
      font-weight: 600;
    }
    
    .lesson-content {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 2rem;
    }
    
    .content-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    
    .lesson-text {
      line-height: 1.8;
      color: #2d3748;
    }
    
    .lesson-text h1 {
      color: #2d3748;
      border-bottom: 2px solid #667eea;
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .lesson-text h2 {
      color: #4a5568;
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    
    .lesson-text p {
      margin-bottom: 1rem;
    }
    
    .lesson-text ul, .lesson-text ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }
    
    .lesson-text li {
      margin-bottom: 0.5rem;
    }
    
    .lesson-text strong {
      color: #667eea;
      font-weight: 600;
    }
    
    .code-section {
      margin-top: 2rem;
    }
    
    .code-section h3 {
      color: #2d3748;
      margin-bottom: 1rem;
    }
    
    .code-container {
      background: #1a202c;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .code-header {
      background: #2d3748;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    
    .dot.red { background: #fc8181; }
    .dot.yellow { background: #f6e05e; }
    .dot.green { background: #68d391; }
    
    .file-name {
      color: #a0aec0;
      font-size: 0.9rem;
      margin-left: auto;
    }
    
    .code-content {
      padding: 1.5rem;
      color: #e2e8f0;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0;
      overflow-x: auto;
      white-space: pre-wrap;
    }
    
    .lesson-actions {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transition: all 0.2s ease;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    .btn-secondary {
      background: #edf2f7;
      color: #4a5568;
    }
    
    .btn-secondary:hover {
      background: #e2e8f0;
    }
    
    .btn-accent {
      background: #48bb78;
      color: white;
    }
    
    .btn-accent:hover {
      background: #38a169;
      transform: translateY(-2px);
    }
    
    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .progress-card, .tips-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    
    .progress-card h3, .tips-card h3 {
      color: #2d3748;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    
    .progress-stat {
      text-align: center;
    }
    
    .progress-stat .number {
      display: block;
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
    }
    
    .progress-stat .label {
      font-size: 0.8rem;
      color: #4a5568;
    }
    
    .progress-bar {
      background: #edf2f7;
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-fill {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 100%;
      transition: width 0.3s ease;
    }
    
    .tips-card ul {
      list-style: none;
      padding: 0;
    }
    
    .tips-card li {
      padding: 0.5rem 0;
      color: #4a5568;
      border-bottom: 1px solid #edf2f7;
    }
    
    .tips-card li:last-child {
      border-bottom: none;
    }
    
    .not-found {
      min-height: 50vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .not-found h1 {
      color: #2d3748;
      margin-bottom: 1rem;
    }
    
    .not-found p {
      color: #4a5568;
      margin-bottom: 2rem;
    }
    
    @media (max-width: 768px) {
      .lesson-content {
        grid-template-columns: 1fr;
      }
      
      .lesson-actions {
        flex-direction: column;
      }
      
      .btn {
        text-align: center;
      }
    }
  `]
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson | undefined;
  isCompleted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonService
  ) {}

  ngOnInit() {
    const lessonId = this.route.snapshot.paramMap.get('id');
    if (lessonId) {
      this.lesson = this.lessonService.getLessonById(lessonId);
      this.isCompleted = this.lessonService.isLessonCompleted(lessonId);
    }
  }

  markComplete() {
    if (this.lesson) {
      this.lessonService.markLessonComplete(this.lesson.id);
      this.isCompleted = true;
    }
  }

  markIncomplete() {
    // For demo purposes, we'll just toggle the local state
    this.isCompleted = false;
  }

  getFormattedContent(): string {
    if (!this.lesson) return '';
    
    return this.lesson.content
      .replace(/\n/g, '<br>')
      .replace(/#{1}\s(.+)/g, '<h1>$1</h1>')
      .replace(/#{2}\s(.+)/g, '<h2>$1</h2>')
      .replace(/#{3}\s(.+)/g, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/- (.+)/g, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  }

  getCompletedCount(): number {
    let count = 0;
    this.lessonService.completedLessons$.subscribe(completed => {
      count = completed.size;
    }).unsubscribe();
    return count;
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