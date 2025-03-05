import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskManagerService } from '../../../services/task.service';
import { of } from 'rxjs';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { TaskListComponent } from '../task-list/task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskManagerServiceSpy: jasmine.SpyObj<TaskManagerService>;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      completed: false,
      dueDate: new Date('2025-03-12T00:00:00Z'),
      priority: 'Medium',
    },
    {
      id: '2',
      title: 'Task 2',
      completed: true,
      dueDate: new Date('2025-03-11T00:00:00Z'),
      priority: 'High',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskManagerService', ['getTasksObservable', 'undoDelete']);
    spy.getTasksObservable.and.returnValue(of(mockTasks));

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, CommonModule, TaskItemComponent, TaskFilterComponent],
      providers: [{ provide: TaskManagerService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskManagerServiceSpy = TestBed.inject(TaskManagerService) as jasmine.SpyObj<TaskManagerService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks from the service and display all by default', () => {
    expect(component.tasks.length).toBe(2);
    expect(component.filteredTasks.length).toBe(2);
  });

  it('should filter tasks to show only completed tasks', () => {
    component.onFilterChange('completed');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Task 2');
  });

  it('should filter tasks to show only incomplete tasks', () => {
    component.onFilterChange('incomplete');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Task 1');
  });

  it('should sort tasks by dueDate (earliest first)', () => {
    component.onSortChange('dueDate');
    expect(component.filteredTasks[0].id).toBe('2');
    expect(component.filteredTasks[1].id).toBe('1');
  });

  it('should sort tasks by priority (High before Medium)', () => {
    component.onSortChange('priority');
    expect(component.filteredTasks[0].id).toBe('2');
    expect(component.filteredTasks[1].id).toBe('1');
  });

  it('should sort tasks by title alphabetically', () => {
    component.onSortChange('title');
    expect(component.filteredTasks[0].title).toBe('Task 1');
    expect(component.filteredTasks[1].title).toBe('Task 2');
  });

  it('should call undoDelete when undoDeletion is triggered', () => {
    component.undoDeletion();
    expect(taskManagerServiceSpy.undoDelete).toHaveBeenCalled();
  });
});
