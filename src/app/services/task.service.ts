import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  private storageKey = 'taskManagerAppData';
  private tasks: Task[] = [];
  private lastDeletedTask: Task | null = null;
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );

  constructor() {
    this.loadTasks();
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem(this.storageKey);
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.tasksSubject.next(this.tasks);
  }

  private saveTasks(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    this.tasksSubject.next(this.tasks);
  }

  getTasksObservable(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(title: string, dueDateStr?: string, priority?: string): void {
    if (!title.trim()) return;

    const dueDate = dueDateStr
      ? new Date(dueDateStr)
      : new Date(new Date().setDate(new Date().getDate() + 7));

    const newTask: Task = {
      id: this.generateUniqueId(),
      title,
      completed: false,
      dueDate,
      priority: priority || 'Medium',
    };

    this.tasks.push(newTask);
    this.saveTasks();
  }

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((t) => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.saveTasks();
    }
  }

  deleteTask(taskId: string): void {
    const index = this.tasks.findIndex((t) => t.id === taskId);
    if (index !== -1) {
      this.lastDeletedTask = this.tasks[index];
      this.tasks.splice(index, 1);
      this.saveTasks();
    }
  }

  undoDelete(): void {
    if (this.lastDeletedTask) {
      this.tasks.push(this.lastDeletedTask);
      this.saveTasks();
      this.lastDeletedTask = null;
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}
