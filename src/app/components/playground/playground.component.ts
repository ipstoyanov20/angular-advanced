import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="playground">
      <div class="container">
        <div class="playground-header">
          <h1>🎮 Angular Playground</h1>
          <p>Experiment with Angular concepts in real-time</p>
        </div>
        
        <div class="playground-content">
          <div class="editor-section">
            <div class="editor-tabs">
              <button 
                *ngFor="let tab of tabs" 
                [class.active]="activeTab === tab.id"
                (click)="setActiveTab(tab.id)"
                class="tab-button"
              >
                {{ tab.name }}
              </button>
            </div>
            
            <div class="editor-container">
              <div *ngIf="activeTab === 'component'" class="editor">
                <h3>Component Code</h3>
                <textarea 
                  [(ngModel)]="componentCode" 
                  (input)="updatePreview()"
                  class="code-editor"
                  placeholder="Write your Angular component code here..."
                ></textarea>
              </div>
              
              <div *ngIf="activeTab === 'template'" class="editor">
                <h3>Template</h3>
                <textarea 
                  [(ngModel)]="templateCode" 
                  (input)="updatePreview()"
                  class="code-editor"
                  placeholder="Write your HTML template here..."
                ></textarea>
              </div>
              
              <div *ngIf="activeTab === 'styles'" class="editor">
                <h3>Styles</h3>
                <textarea 
                  [(ngModel)]="stylesCode" 
                  (input)="updatePreview()"
                  class="code-editor"
                  placeholder="Write your CSS styles here..."
                ></textarea>
              </div>
            </div>
            
            <div class="editor-actions">
              <button (click)="runCode()" class="btn btn-primary">
                ▶️ Run Code
              </button>
              <button (click)="resetCode()" class="btn btn-secondary">
                🔄 Reset
              </button>
              <button (click)="loadExample()" class="btn btn-accent">
                📝 Load Example
              </button>
            </div>
          </div>
          
          <div class="preview-section">
            <div class="preview-header">
              <h3>🖥️ Live Preview</h3>
              <div class="preview-controls">
                <button 
                  (click)="togglePreview()" 
                  class="btn btn-small"
                  [class.active]="showPreview"
                >
                  {{ showPreview ? 'Hide' : 'Show' }} Preview
                </button>
              </div>
            </div>
            
            <div *ngIf="showPreview" class="preview-container">
              <div class="preview-frame" [innerHTML]="getPreviewHTML()"></div>
            </div>
            
            <div *ngIf="!showPreview" class="preview-placeholder">
              <div class="placeholder-content">
                <div class="placeholder-icon">👨‍💻</div>
                <h4>Preview Hidden</h4>
                <p>Click "Show Preview" to see your code in action</p>
              </div>
            </div>
            
            <div class="console-section">
              <h4>📋 Console Output</h4>
              <div class="console">
                <div *ngFor="let log of consoleLogs" class="console-line">
                  <span class="console-timestamp">{{ log.timestamp }}</span>
                  <span class="console-message">{{ log.message }}</span>
                </div>
                <div *ngIf="consoleLogs.length === 0" class="console-empty">
                  No output yet. Run your code to see results here.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="examples-section">
          <h3>📚 Quick Examples</h3>
          <div class="examples-grid">
            <div 
              *ngFor="let example of examples" 
              class="example-card"
              (click)="loadExampleCode(example)"
            >
              <h4>{{ example.title }}</h4>
              <p>{{ example.description }}</p>
              <div class="example-tags">
                <span *ngFor="let tag of example.tags" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .playground {
      min-height: 100vh;
      background: #f8fafc;
      padding: 2rem 0;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .playground-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .playground-header h1 {
      font-size: 3rem;
      color: #2d3748;
      margin-bottom: 1rem;
    }
    
    .playground-header p {
      font-size: 1.2rem;
      color: #4a5568;
    }
    
    .playground-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }
    
    .editor-section, .preview-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    
    .editor-tabs {
      display: flex;
      background: #f7fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .tab-button {
      padding: 1rem 1.5rem;
      border: none;
      background: none;
      cursor: pointer;
      font-weight: 500;
      color: #4a5568;
      transition: all 0.2s ease;
    }
    
    .tab-button:hover {
      background: #edf2f7;
    }
    
    .tab-button.active {
      background: white;
      color: #667eea;
      border-bottom: 2px solid #667eea;
    }
    
    .editor-container {
      padding: 1.5rem;
    }
    
    .editor h3 {
      color: #2d3748;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    
    .code-editor {
      width: 100%;
      height: 300px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      font-family: 'Fira Code', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
      resize: vertical;
      background: #1a202c;
      color: #e2e8f0;
    }
    
    .code-editor:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .editor-actions {
      padding: 1rem 1.5rem;
      background: #f7fafc;
      display: flex;
      gap: 1rem;
    }
    
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
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
    }
    
    .btn-small {
      padding: 0.25rem 0.75rem;
      font-size: 0.8rem;
    }
    
    .preview-header {
      padding: 1rem 1.5rem;
      background: #f7fafc;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .preview-header h3 {
      color: #2d3748;
      margin: 0;
    }
    
    .preview-container {
      padding: 1.5rem;
      min-height: 300px;
      background: white;
    }
    
    .preview-frame {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      min-height: 250px;
      background: #f8fafc;
    }
    
    .preview-placeholder {
      padding: 3rem 1.5rem;
      text-align: center;
      color: #4a5568;
    }
    
    .placeholder-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .placeholder-content h4 {
      margin-bottom: 0.5rem;
      color: #2d3748;
    }
    
    .console-section {
      border-top: 1px solid #e2e8f0;
      padding: 1rem 1.5rem;
      background: #f7fafc;
    }
    
    .console-section h4 {
      color: #2d3748;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
    
    .console {
      background: #1a202c;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.8rem;
      max-height: 150px;
      overflow-y: auto;
    }
    
    .console-line {
      margin-bottom: 0.5rem;
    }
    
    .console-timestamp {
      color: #a0aec0;
      margin-right: 0.5rem;
    }
    
    .console-message {
      color: #e2e8f0;
    }
    
    .console-empty {
      color: #a0aec0;
      font-style: italic;
    }
    
    .examples-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    }
    
    .examples-section h3 {
      color: #2d3748;
      margin-bottom: 2rem;
      text-align: center;
    }
    
    .examples-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }
    
    .example-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .example-card:hover {
      border-color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    .example-card h4 {
      color: #2d3748;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
    
    .example-card p {
      color: #4a5568;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .example-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .tag {
      background: #edf2f7;
      color: #4a5568;
      padding: 0.2rem 0.5rem;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 500;
    }
    
    @media (max-width: 1024px) {
      .playground-content {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .editor-actions {
        flex-wrap: wrap;
      }
      
      .examples-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PlaygroundComponent {
  activeTab = 'component';
  showPreview = true;
  
  componentCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  template: \`
    <div class="demo-container">
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <button (click)="changeMessage()">
        Click me!
      </button>
    </div>
  \`,
  styles: [\`
    .demo-container {
      padding: 20px;
      text-align: center;
    }
  \`]
})
export class DemoComponent {
  title = 'Hello Angular!';
  message = 'Welcome to the playground';
  
  changeMessage() {
    this.message = 'Button clicked!';
  }
}`;

  templateCode = `<div class="demo-container">
  <h2>{{ title }}</h2>
  <p>{{ message }}</p>
  <button (click)="changeMessage()">
    Click me!
  </button>
</div>`;

  stylesCode = `.demo-container {
  padding: 20px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

button {
  background: white;
  color: #667eea;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
}

button:hover {
  background: #f7fafc;
}`;

  consoleLogs: Array<{timestamp: string, message: string}> = [];

  tabs = [
    { id: 'component', name: 'Component' },
    { id: 'template', name: 'Template' },
    { id: 'styles', name: 'Styles' }
  ];

  examples = [
    {
      title: 'Data Binding',
      description: 'Learn about property and event binding',
      tags: ['binding', 'events', 'beginner'],
      component: `import { Component } from '@angular/core';

@Component({
  selector: 'app-binding',
  template: \`
    <div class="binding-demo">
      <h3>Data Binding Example</h3>
      <input [(ngModel)]="name" placeholder="Enter your name">
      <p>Hello, {{ name }}!</p>
      <button (click)="greet()">Greet</button>
    </div>
  \`
})
export class BindingComponent {
  name = 'Angular Developer';
  
  greet() {
    alert(\`Hello, \${this.name}!\`);
  }
}`,
      template: `<div class="binding-demo">
  <h3>Data Binding Example</h3>
  <input [(ngModel)]="name" placeholder="Enter your name">
  <p>Hello, {{ name }}!</p>
  <button (click)="greet()">Greet</button>
</div>`,
      styles: `.binding-demo {
  padding: 20px;
  border: 2px solid #667eea;
  border-radius: 8px;
}

input {
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}`
    },
    {
      title: 'Component Communication',
      description: 'Parent-child component interaction',
      tags: ['components', 'input', 'output'],
      component: `import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: \`
    <div class="child-component">
      <h4>Child Component</h4>
      <p>Message from parent: {{ message }}</p>
      <button (click)="sendToParent()">Send to Parent</button>
    </div>
  \`
})
export class ChildComponent {
  @Input() message = '';
  @Output() messageEvent = new EventEmitter<string>();
  
  sendToParent() {
    this.messageEvent.emit('Hello from child!');
  }
}`,
      template: `<div class="parent-child-demo">
  <h3>Parent Component</h3>
  <app-child 
    [message]="parentMessage" 
    (messageEvent)="receiveMessage($event)">
  </app-child>
  <p>Message from child: {{ childMessage }}</p>
</div>`,
      styles: `.parent-child-demo {
  padding: 20px;
  background: #f0f8ff;
  border-radius: 8px;
}

.child-component {
  background: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 6px;
  border-left: 4px solid #667eea;
}`
    }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  runCode() {
    this.addConsoleLog('Code executed successfully!');
    this.addConsoleLog('Component rendered in preview');
  }

  resetCode() {
    this.componentCode = '';
    this.templateCode = '';
    this.stylesCode = '';
    this.consoleLogs = [];
    this.addConsoleLog('Code reset to empty state');
  }

  loadExample() {
    this.loadExampleCode(this.examples[0]);
  }

  loadExampleCode(example: any) {
    this.componentCode = example.component;
    this.templateCode = example.template;
    this.stylesCode = example.styles;
    this.addConsoleLog(`Loaded example: ${example.title}`);
  }

  updatePreview() {
    // In a real implementation, this would compile and render the Angular code
    this.addConsoleLog('Preview updated');
  }

  getPreviewHTML(): string {
    // This is a simplified preview - in a real implementation, 
    // you'd need to compile and render the Angular code
    return `
      <div style="${this.stylesCode.replace(/\.demo-container|\.binding-demo|\.parent-child-demo/g, 'div')}">
        <h2>Live Preview</h2>
        <p>This is a simplified preview. In a full implementation, your Angular code would be compiled and rendered here.</p>
        <button onclick="alert('Button clicked!')">Interactive Button</button>
      </div>
    `;
  }

  private addConsoleLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.consoleLogs.push({ timestamp, message });
    
    // Keep only last 10 logs
    if (this.consoleLogs.length > 10) {
      this.consoleLogs = this.consoleLogs.slice(-10);
    }
  }
}