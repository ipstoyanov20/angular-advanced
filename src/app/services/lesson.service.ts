import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category, Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private categoriesSubject = new BehaviorSubject<Category[]>(this.getInitialCategories());
  public categories$ = this.categoriesSubject.asObservable();

  private completedLessonsSubject = new BehaviorSubject<Set<string>>(new Set());
  public completedLessons$ = this.completedLessonsSubject.asObservable();

  markLessonComplete(lessonId: string): void {
    const completed = this.completedLessonsSubject.value;
    completed.add(lessonId);
    this.completedLessonsSubject.next(new Set(completed));
  }

  isLessonCompleted(lessonId: string): boolean {
    return this.completedLessonsSubject.value.has(lessonId);
  }

  getLessonById(id: string): Lesson | undefined {
    const categories = this.categoriesSubject.value;
    for (const category of categories) {
      const lesson = category.lessons.find(l => l.id === id);
      if (lesson) return lesson;
    }
    return undefined;
  }

  private getInitialCategories(): Category[] {
    return [
      {
        id: 'basics',
        name: 'Angular Basics',
        description: 'Learn the fundamentals of Angular',
        icon: '🎯',
        lessons: [
          {
            id: 'what-is-angular',
            title: 'What is Angular?',
            description: 'Introduction to Angular framework and its core concepts',
            difficulty: 'beginner',
            category: 'basics',
            content: `
# What is Angular?

Angular is a powerful, open-source web application framework developed by Google. It's built with TypeScript and provides a comprehensive solution for building dynamic, single-page applications (SPAs).

## Key Features:

- **Component-Based Architecture**: Build encapsulated components that manage their own state
- **TypeScript Support**: Enhanced development experience with static typing
- **Dependency Injection**: Powerful DI system for managing dependencies
- **Reactive Programming**: Built-in support for RxJS observables
- **CLI Tools**: Powerful command-line interface for project scaffolding and management

## Why Choose Angular?

1. **Enterprise-Ready**: Robust architecture suitable for large-scale applications
2. **Rich Ecosystem**: Extensive library of tools and packages
3. **Strong Community**: Large, active community and excellent documentation
4. **Performance**: Optimized for speed with features like lazy loading and tree shaking
5. **Testing**: Built-in testing utilities and best practices

Angular follows the MVC (Model-View-Controller) pattern and emphasizes separation of concerns, making your code more maintainable and testable.
            `,
            codeExample: `
// A simple Angular component
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: \\\`
    <h1>Hello, {{ '{' }}{{ '{' }} name {{ '}' }}{{ '}' }}!</h1>
    <button (click)="changeName()">Change Name</button>
  \\\`
})
export class HelloComponent {
  name = 'Angular Developer';
  
  changeName() {
    this.name = 'Amazing Developer';
  }
}
            `
          },
          {
            id: 'components',
            title: 'Components',
            description: 'Understanding Angular components and their lifecycle',
            difficulty: 'beginner',
            category: 'basics',
            content: `
# Angular Components

Components are the building blocks of Angular applications. Each component controls a patch of screen called a view and consists of:

- **Template**: HTML with Angular markup
- **Class**: TypeScript code that defines behavior
- **Metadata**: Decorator that tells Angular how to process the class

## Component Lifecycle

Angular components have a well-defined lifecycle managed by Angular:

1. **ngOnInit**: Initialize the component
2. **ngOnChanges**: Respond to input property changes
3. **ngDoCheck**: Custom change detection
4. **ngOnDestroy**: Cleanup before destruction

## Best Practices:

- Keep components small and focused
- Use OnPush change detection when possible
- Implement lifecycle hooks appropriately
- Follow naming conventions
            `,
            codeExample: `
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: \\\`
    <div class="user-card">
      <h3>{{ '{' }}{{ '{' }} user.name {{ '}' }}{{ '}' }}</h3>
      <p>{{ '{' }}{{ '{' }} user.email {{ '}' }}{{ '}' }}</p>
      <button (click)="sendMessage()">Send Message</button>
    </div>
  \\\`,
  styles: [\\\`
    .user-card {
      border: 1px solid #ddd;
      padding: 16px;
      border-radius: 8px;
      margin: 8px;
    }
  \\\`]
})
export class UserCardComponent implements OnInit, OnDestroy {
  @Input() user: any;
  
  ngOnInit() {
    console.log('Component initialized');
  }
  
  ngOnDestroy() {
    console.log('Component destroyed');
  }
  
  sendMessage() {
    alert(\\\`Sending message to \\\${this.user.name}\\\`);
  }
}
            `
          }
        ]
      },
      {
        id: 'advanced',
        name: 'Advanced Concepts',
        description: 'Deep dive into advanced Angular features',
        icon: '🚀',
        lessons: [
          {
            id: 'services-di',
            title: 'Services & Dependency Injection',
            description: 'Learn about Angular services and dependency injection system',
            difficulty: 'intermediate',
            category: 'advanced',
            content: `
# Services & Dependency Injection

Services are a great way to share information among classes that don't know each other. Angular's dependency injection (DI) system provides dependencies to a class upon instantiation.

## Benefits of Services:

- **Separation of Concerns**: Keep components focused on the view
- **Reusability**: Share logic across multiple components
- **Testability**: Easy to mock and test
- **Maintainability**: Centralized business logic

## Dependency Injection

Angular's DI system is hierarchical and provides dependencies at different levels:

1. **Root Level**: Available throughout the application
2. **Module Level**: Available to all components in the module
3. **Component Level**: Available to the component and its children

## Injectable Decorator

The @Injectable() decorator marks a class as available for injection and allows Angular to optimize the service.
            `,
            codeExample: `
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes service available app-wide
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();
  
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
  
  addUser(user: User): void {
    const currentUsers = this.usersSubject.value;
    this.usersSubject.next([...currentUsers, user]);
  }
  
  updateUser(id: string, updates: Partial<User>): void {
    const users = this.usersSubject.value.map(user => 
      user.id === id ? { ...user, ...updates } : user
    );
    this.usersSubject.next(users);
  }
}

// Using the service in a component
@Component({...})
export class UserListComponent implements OnInit {
  users$ = this.userService.users$;
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    this.userService.getUsers().subscribe();
  }
}
            `
          },
          {
            id: 'rxjs-observables',
            title: 'RxJS & Observables',
            description: 'Master reactive programming with RxJS in Angular',
            difficulty: 'advanced',
            category: 'advanced',
            content: `
# RxJS & Observables

RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables. Angular heavily uses RxJS for handling asynchronous operations.

## Key Concepts:

- **Observable**: A stream of data that can be observed
- **Observer**: Consumes the data from an observable
- **Subscription**: Represents the execution of an observable
- **Operators**: Functions that transform observables

## Common RxJS Operators:

- **map**: Transform emitted values
- **filter**: Filter emitted values
- **switchMap**: Switch to a new observable
- **combineLatest**: Combine multiple observables
- **debounceTime**: Delay emissions
- **distinctUntilChanged**: Emit only when value changes

## Best Practices:

- Always unsubscribe to prevent memory leaks
- Use async pipe when possible
- Prefer declarative approach over imperative
- Use operators to transform data streams
            `,
            codeExample: `
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: \`
    <input [formControl]="searchControl" placeholder="Search users...">
    <select [formControl]="filterControl">
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
    
    <div *ngFor="let user of filteredUsers$ | async">
      {{ user.name }} - {{ user.status }}
    </div>
  \`
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');
  filterControl = new FormControl('');
  
  private destroy$ = new Subject<void>();
  
  // Reactive data stream
  filteredUsers$ = combineLatest([
    this.userService.users$,
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith('')
    ),
    this.filterControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([users, search, filter]) => {
      return users.filter(user => {
        const matchesSearch = !search || 
          user.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = !filter || user.status === filter;
        return matchesSearch && matchesFilter;
      });
    }),
    takeUntil(this.destroy$)
  );
  
  constructor(private userService: UserService) {}
  
  ngOnInit() {
    // Component initialization
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
            `
          }
        ]
      },
      {
        id: 'routing',
        name: 'Routing & Navigation',
        description: 'Learn Angular Router for navigation',
        icon: '🗺️',
        lessons: [
          {
            id: 'basic-routing',
            title: 'Basic Routing',
            description: 'Set up routing and navigation in Angular applications',
            difficulty: 'intermediate',
            category: 'routing',
            content: `
# Angular Routing

The Angular Router enables navigation from one view to the next as users perform application tasks. It's a powerful feature that allows you to build single-page applications with multiple views.

## Key Concepts:

- **Routes**: Configuration that defines URL patterns and components
- **Router Outlet**: Placeholder for routed components
- **Router Link**: Directive for creating navigation links
- **Route Guards**: Control access to routes
- **Route Parameters**: Pass data through URLs

## Setting Up Routing:

1. Import RouterModule in your app module
2. Define routes configuration
3. Add router-outlet to your template
4. Use routerLink for navigation

## Route Configuration:

Routes are defined as an array of route objects, each mapping a URL path to a component.
            `,
            codeExample: `
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: '**', component: PageNotFoundComponent } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// app.component.html
\\\`
<nav>
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
</nav>

<router-outlet></router-outlet>
\\\`

// user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({...})
export class UserDetailComponent implements OnInit {
  userId: string;
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    // Or reactive approach:
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }
}
            `
          }
        ]
      }
    ];
  }
}