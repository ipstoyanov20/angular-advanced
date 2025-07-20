import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home">
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">
              Master Angular with 
              <span class="highlight">Interactive Learning</span>
            </h1>
            <p class="hero-description">
              Learn Angular from basics to advanced concepts through hands-on examples, 
              interactive tutorials, and real-world projects. Perfect for developers at any level.
            </p>
            <div class="hero-actions">
              <button routerLink="/lessons" class="btn btn-primary">
                🚀 Start Learning
              </button>
              <button routerLink="/playground" class="btn btn-secondary">
                🎮 Try Playground
              </button>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="code-preview">
              <div class="code-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <pre class="code-content">
<span class="keyword">import</span> { <span class="class">Component</span> } <span class="keyword">from</span> <span class="string">'@angular/core'</span>;

<span class="decorator">@Component</span>({
  <span class="property">selector</span>: <span class="string">'app-hello'</span>,
  <span class="property">template</span>: <span class="template">\`
    &lt;h1&gt;Hello {{ name }}!&lt;/h1&gt;
    &lt;button (click)="greet()"&gt;
      Say Hello
    &lt;/button&gt;
  \`</span>
})
<span class="keyword">export class</span> <span class="class">HelloComponent</span> {
  <span class="property">name</span> = <span class="string">'Angular'</span>;
  
  <span class="method">greet</span>() {
    <span class="keyword">alert</span>(<span class="template">\`Hello \${this.name}!\`</span>);
  }
}
              </pre>
            </div>
          </div>
        </div>
      </section>
      
      <section class="features">
        <div class="container">
          <h2 class="section-title">Why Choose Angular Academy?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">📚</div>
              <h3>Comprehensive Curriculum</h3>
              <p>From basic components to advanced patterns, covering everything you need to become an Angular expert.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">💻</div>
              <h3>Interactive Examples</h3>
              <p>Learn by doing with live code examples and interactive exercises that run in your browser.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🎯</div>
              <h3>Progressive Learning</h3>
              <p>Structured learning path that builds knowledge step by step, from beginner to advanced.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🚀</div>
              <h3>Modern Practices</h3>
              <p>Learn the latest Angular features, best practices, and industry-standard development patterns.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">🎮</div>
              <h3>Hands-on Playground</h3>
              <p>Experiment with Angular concepts in a safe, interactive environment with instant feedback.</p>
            </div>
            
            <div class="feature-card">
              <div class="feature-icon">📈</div>
              <h3>Track Progress</h3>
              <p>Monitor your learning journey with progress tracking and completion badges.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="cta">
        <div class="container">
          <h2>Ready to Start Your Angular Journey?</h2>
          <p>Join thousands of developers who have mastered Angular with our interactive platform.</p>
          <button routerLink="/lessons" class="btn btn-primary btn-large">
            Begin Learning Now 🎯
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home {
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .hero {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 4rem 0;
      min-height: 80vh;
      display: flex;
      align-items: center;
    }
    
    .hero .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: bold;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: #2d3748;
    }
    
    .highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .hero-description {
      font-size: 1.2rem;
      color: #4a5568;
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
    }
    
    .btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
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
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
    
    .btn-secondary {
      background: white;
      color: #667eea;
      border: 2px solid #667eea;
    }
    
    .btn-secondary:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }
    
    .code-preview {
      background: #1a202c;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    
    .code-header {
      background: #2d3748;
      padding: 1rem;
      display: flex;
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
    
    .code-content {
      padding: 1.5rem;
      color: #e2e8f0;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0;
      overflow-x: auto;
    }
    
    .keyword { color: #9f7aea; }
    .class { color: #4fd1c7; }
    .string { color: #68d391; }
    .property { color: #f6e05e; }
    .decorator { color: #fc8181; }
    .template { color: #fbb6ce; }
    .method { color: #63b3ed; }
    
    .features {
      padding: 5rem 0;
      background: white;
    }
    
    .section-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
      color: #2d3748;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      text-align: center;
      transition: transform 0.2s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .feature-card h3 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: #2d3748;
    }
    
    .feature-card p {
      color: #4a5568;
      line-height: 1.6;
    }
    
    .cta {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
    }
    
    .cta h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .cta p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .btn-large {
      padding: 1.2rem 3rem;
      font-size: 1.2rem;
    }
    
    @media (max-width: 768px) {
      .hero .container {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-actions {
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}