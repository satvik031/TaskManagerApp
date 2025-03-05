import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from '../../../models/task.model';
import { TaskListComponent } from './task-list.component';
import { TaskManagerService } from '../../../services/task.service';

const mockTasks: Task[] = [
  { id: '1', title: 'Task A', completed: false, dueDate: new Date('2025-03-15'), priority: 'Medium' },
  { id: '2', title: 'Task B', completed: true,  dueDate: new Date('2025-03-10'), priority: 'High' },
  { id: '3', title: 'Task C', completed: false, dueDate: new Date('2025-03-20'), priority: 'Low' },
];

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskManagerServiceSpy: jasmine.SpyObj<TaskManagerService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskManagerService', ['getTasksObservable', 'undoDelete']);
    spy.getTasksObservable.and.returnValue(of(mockTasks));
    
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [{ provide: TaskManagerService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskManagerServiceSpy = TestBed.inject(TaskManagerService) as jasmine.SpyObj<TaskManagerService>;
    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init and apply default filter (all)', () => {
    expect(component.tasks.length).toBe(3);
    expect(component.filteredTasks.length).toBe(3);
  });

  it('should filter tasks to only completed ones', () => {
    component.onFilterChange('completed');
    expect(component.filteredTasks.length).toBe(1);
    expect(component.filteredTasks[0].title).toBe('Task B');
  });

  it('should filter tasks to only incomplete ones', () => {
    component.onFilterChange('incomplete');
    expect(component.filteredTasks.length).toBe(2);
    const titles = component.filteredTasks.map(task => task.title);
    expect(titles).toContain('Task A');
    expect(titles).toContain('Task C');
  });

  it('should sort tasks by dueDate', () => {
    component.onSortChange('dueDate');
    expect(component.filteredTasks[0].title).toBe('Task B');
  });

  it('should sort tasks by priority', () => {
    component.onSortChange('priority');
    expect(component.filteredTasks[0].title).toBe('Task B');
    expect(component.filteredTasks[1].title).toBe('Task A');
    expect(component.filteredTasks[2].title).toBe('Task C');
  });

  it('should sort tasks by title', () => {
    component.onSortChange('title');
    expect(component.filteredTasks[0].title).toBe('Task A');
    expect(component.filteredTasks[1].title).toBe('Task B');
    expect(component.filteredTasks[2].title).toBe('Task C');
  });

  it('should call undoDelete on undoDeletion', () => {
    component.undoDeletion();
    expect(taskManagerServiceSpy.undoDelete).toHaveBeenCalled();
  });
});
