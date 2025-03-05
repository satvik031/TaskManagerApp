import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { TaskManagerService } from './task.service';
import { Task } from '../models/task.model';

describe('TaskManagerService', () => {
  let service: TaskManagerService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new task with default due date and priority if not provided', async () => {
    service.addTask('New Task');
    const tasks = await firstValueFrom(service.getTasksObservable());
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('New Task');
    expect(tasks[0].completed).toBeFalse();
    expect(tasks[0].priority).toBe('Medium');
    expect(new Date(tasks[0].dueDate!).toString()).not.toBe('Invalid Date');
  });

  it('should add a new task with provided due date and priority', async () => {
    const dueDateStr = '2025-03-12';
    service.addTask('Task with Due Date', dueDateStr, 'High');
    const tasks = await firstValueFrom(service.getTasksObservable());
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Task with Due Date');
    expect(tasks[0].priority).toBe('High');
    const dueDate = new Date(tasks[0].dueDate!);
    expect(dueDate.toISOString().substring(0, 10)).toBe(dueDateStr);
  });

  it('should toggle task completion', async () => {
    service.addTask('Toggle Task');
    let tasks = await firstValueFrom(service.getTasksObservable());
    const task = tasks[0];
    expect(task.completed).toBeFalse();
    service.toggleTaskCompletion(task);
    tasks = await firstValueFrom(service.getTasksObservable());
    expect(tasks[0].completed).toBeTrue();
  });

  it('should update a task', async () => {
    service.addTask('Original Title');
    let tasks = await firstValueFrom(service.getTasksObservable());
    const task = tasks[0];
    const updatedTask: Task = { ...task, title: 'Updated Title' };
    service.updateTask(updatedTask);
    tasks = await firstValueFrom(service.getTasksObservable());
    expect(tasks[0].title).toBe('Updated Title');
  });

  it('should delete a task', async () => {
    service.addTask('Task to Delete');
    let tasks = await firstValueFrom(service.getTasksObservable());
    expect(tasks.length).toBe(1);
    const task = tasks[0];
    service.deleteTask(task.id);
    tasks = await firstValueFrom(service.getTasksObservable());
    expect(tasks.length).toBe(0);
  });

  it('should undo deletion of a task', async () => {
    service.addTask('Task to Delete');
    let tasks = await firstValueFrom(service.getTasksObservable());
    const task = tasks[0];
    service.deleteTask(task.id);
    tasks = await firstValueFrom(service.getTasksObservable());
    expect(tasks.length).toBe(0);
    service.undoDelete();
    tasks = await firstValueFrom(service.getTasksObservable());
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Task to Delete');
  });
});
