import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="nav-brand">
          <h1 routerLink="/" class="logo">🅰️ Angular Academy</h1>
          <p class="tagline">Master Angular Step by Step</p>
        </div>
        
        <nav class="nav-menu">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link">
            🏠 Home
          </a>
          <a routerLink="/lessons" routerLinkActive="active" class="nav-link">
            📚 Lessons
          </a>
          <a routerLink="/playground" routerLinkActive="active" class="nav-link">
            🎮 Playground
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .nav-brand {
      display: flex;
      flex-direction: column;
    }
    
    .logo {
      font-size: 1.8rem;
      font-weight: bold;
      margin: 0;
      cursor: pointer;
      text-decoration: none;
      color: white;
      transition: transform 0.2s ease;
    }
    
    .logo:hover {
      transform: scale(1.05);
    }
    
    .tagline {
      font-size: 0.9rem;
      opacity: 0.9;
      margin: 0;
    }
    
    .nav-menu {
      display: flex;
      gap: 2rem;
    }
    
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.2s ease;
      font-weight: 500;
    }
    
    .nav-link:hover {
      background: rgba(255,255,255,0.1);
      transform: translateY(-1px);
    }
    
    .nav-link.active {
      background: rgba(255,255,255,0.2);
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
        gap: 1rem;
      }
      
      .nav-menu {
        gap: 1rem;
      }
    }
  `]
})
export class HeaderComponent {}