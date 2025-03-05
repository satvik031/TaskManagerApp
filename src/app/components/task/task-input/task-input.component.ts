import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskManagerService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss'],
})
export class TaskInputComponent {
  @ViewChild('f') form!: NgForm;
  newTask: { title: string; dueDate: string; priority: string } = {
    title: '',
    dueDate: '',
    priority: 'Medium',
  };

  constructor(private taskManagerService: TaskManagerService) {}

  onSubmitTask(): void {
    if (!this.newTask.title.trim()) return;
    this.taskManagerService.addTask(
      this.newTask.title,
      this.newTask.dueDate,
      this.newTask.priority
    );
    this.form.resetForm();
  }
}
