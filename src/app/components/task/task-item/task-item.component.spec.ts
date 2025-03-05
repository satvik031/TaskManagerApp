import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { Task } from '../../../models/task.model';
import { TaskManagerService } from '../../../services/task.service';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  let taskManagerServiceSpy: jasmine.SpyObj<TaskManagerService>;

  const mockTask: Task = {
    id: 'abc123',
    title: 'Test Task',
    completed: false,
    dueDate: new Date('2025-03-12'),
    priority: 'Medium',
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskManagerService', [
      'toggleTaskCompletion',
      'deleteTask',
      'updateTask',
    ]);
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
      providers: [{ provide: TaskManagerService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = { ...mockTask };
    taskManagerServiceSpy = TestBed.inject(TaskManagerService) as jasmine.SpyObj<TaskManagerService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call toggleTaskCompletion when toggleCompletion is triggered', () => {
    component.toggleCompletion();
    expect(taskManagerServiceSpy.toggleTaskCompletion).toHaveBeenCalledWith(component.task);
  });

  it('should call deleteTask when deleteTask is triggered', () => {
    component.deleteTask();
    expect(taskManagerServiceSpy.deleteTask).toHaveBeenCalledWith(component.task.id);
  });

  it('should enter editing mode when startEditing is called', () => {
    component.startEditing();
    expect(component.editing).toBeTrue();
    expect(component.editTitle).toEqual(component.task.title);
  });

  it('should exit editing mode without saving when cancelEditing is called', () => {
    component.startEditing();
    component.cancelEditing();
    expect(component.editing).toBeFalse();
  });

  it('should update task title and call updateTask when saveTask is called with a changed title', () => {
    component.startEditing();
    component.editTitle = 'Updated Task';
    component.saveTask();
    expect(taskManagerServiceSpy.updateTask).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Updated Task' }));
    expect(component.task.title).toBe('Updated Task');
    expect(component.editing).toBeFalse();
  });

  it('should not call updateTask if editTitle is empty or unchanged', () => {
    component.startEditing();
    component.editTitle = '   ';
    component.saveTask();
    expect(taskManagerServiceSpy.updateTask).not.toHaveBeenCalled();

    component.editing = true; 
    component.editTitle = component.task.title;
    component.saveTask();
    expect(taskManagerServiceSpy.updateTask).not.toHaveBeenCalled();
  });
});
