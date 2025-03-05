import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskInputComponent } from './task-input.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { TaskManagerService } from '../../../services/task.service';

describe('TaskInputComponent', () => {
  let component: TaskInputComponent;
  let fixture: ComponentFixture<TaskInputComponent>;
  let taskManagerServiceSpy: jasmine.SpyObj<TaskManagerService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskManagerService', ['addTask']);
    await TestBed.configureTestingModule({
      imports: [TaskInputComponent, FormsModule, CommonModule],
      providers: [{ provide: TaskManagerService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskInputComponent);
    component = fixture.componentInstance;
    taskManagerServiceSpy = TestBed.inject(TaskManagerService) as jasmine.SpyObj<TaskManagerService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTask with correct parameters on valid form submission', () => {
    const titleInput = fixture.debugElement.query(By.css('input#addTask')).nativeElement;
    const dueDateInput = fixture.debugElement.query(By.css('input#dueDate')).nativeElement;
    const prioritySelect = fixture.debugElement.query(By.css('select#priority')).nativeElement;

    titleInput.value = 'Test Task';
    titleInput.dispatchEvent(new Event('input'));

    dueDateInput.value = '2025-03-12';
    dueDateInput.dispatchEvent(new Event('input'));

    prioritySelect.value = 'High';
    prioritySelect.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    const formDebugEl = fixture.debugElement.query(By.css('form'));
    formDebugEl.triggerEventHandler('ngSubmit', {});
    fixture.detectChanges();

    expect(taskManagerServiceSpy.addTask).toHaveBeenCalledWith('Test Task', '2025-03-12', 'High');
  });

  it('should reset the form after valid submission', () => {
    const titleInput = fixture.debugElement.query(By.css('input#addTask')).nativeElement;
    const dueDateInput = fixture.debugElement.query(By.css('input#dueDate')).nativeElement;
    const prioritySelect = fixture.debugElement.query(By.css('select#priority')).nativeElement;

    titleInput.value = 'Another Task';
    titleInput.dispatchEvent(new Event('input'));

    dueDateInput.value = '2025-03-12';
    dueDateInput.dispatchEvent(new Event('input'));

    prioritySelect.value = 'Low';
    prioritySelect.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    const formDebugEl = fixture.debugElement.query(By.directive(NgForm));
    const ngFormInstance = formDebugEl.injector.get(NgForm);
    spyOn(ngFormInstance, 'resetForm');

    const formEl = fixture.debugElement.query(By.css('form'));
    formEl.triggerEventHandler('ngSubmit', {});
    fixture.detectChanges();

    expect(ngFormInstance.resetForm).toHaveBeenCalled();
  });
});
