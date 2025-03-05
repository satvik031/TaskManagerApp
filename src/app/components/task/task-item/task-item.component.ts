import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { TaskManagerService } from '../../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  editing: boolean = false;
  editTitle: string = '';
  editDueDate: string = '';
  editPriority: string = '';

  constructor(private taskManagerService: TaskManagerService) {}

  toggleCompletion(): void {
    this.taskManagerService.toggleTaskCompletion(this.task);
  }

  deleteTask(): void {
    this.taskManagerService.deleteTask(this.task.id);
  }

  startEditing(): void {
    this.editing = true;
    this.editTitle = this.task.title;
    // Format the due date as YYYY-MM-DD for the date input
    if (this.task.dueDate) {
      const d = new Date(this.task.dueDate);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      this.editDueDate = `${yyyy}-${mm}-${dd}`;
    } else {
      this.editDueDate = '';
    }
    this.editPriority = this.task.priority || 'Medium';
  }

  cancelEditing(): void {
    this.editing = false;
  }

  saveTask(): void {
    // Return if title is empty OR if nothing changed (title, due date, and priority)
    if (
      !this.editTitle.trim() ||
      (this.editTitle === this.task.title &&
        this.editDueDate === this.formatDate(this.task.dueDate) &&
        this.editPriority === this.task.priority)
    ) {
      return;
    }
    const updatedTask: Task = {
      ...this.task,
      title: this.editTitle,
      dueDate: this.editDueDate ? new Date(this.editDueDate) : this.task.dueDate,
      priority: this.editPriority,
    };
    this.taskManagerService.updateTask(updatedTask);
    this.task = updatedTask;
    this.editing = false;
  }

  private formatDate(date: Date | undefined): string {
    if (!date) return '';
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
}
