import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { LessonDetailComponent } from './components/lesson-detail/lesson-detail.component';
import { PlaygroundComponent } from './components/playground/playground.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lessons', component: LessonListComponent },
  { path: 'lesson/:id', component: LessonDetailComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: '**', redirectTo: '' }
];