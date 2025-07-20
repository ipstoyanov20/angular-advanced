export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  content: string;
  codeExample?: string;
  completed?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}