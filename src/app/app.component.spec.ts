import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title in the navbar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navbarBrand = compiled.querySelector('.navbar-brand');
    expect(navbarBrand?.textContent).toContain('Task Manager App');
  });

  it('should render TaskInputComponent and TaskListComponent', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const taskInputEl = compiled.querySelector('app-task-input');
    const taskListEl = compiled.querySelector('app-task-list');

    expect(taskInputEl).toBeTruthy();
    expect(taskListEl).toBeTruthy();
  });
});
