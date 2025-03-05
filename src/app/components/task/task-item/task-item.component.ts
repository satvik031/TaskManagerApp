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

  constructor(private taskManagerService: TaskManagerService) {}

  toggleCompletion(): void {
    this.taskManagerService.toggleTaskCompletion(this.task);
  }

  deleteTask(): void {
    console.log('this.task.id', this.task.id);

    this.taskManagerService.deleteTask(this.task.id);
  }

  startEditing(): void {
    this.editing = true;
    this.editTitle = this.task.title;
  }

  cancelEditing(): void {
    this.editing = false;
  }

  saveTask(): void {
    if (!this.editTitle.trim()) 
     {  
      return;
     }
     if (this.editTitle === this.task.title) 
      {  this.editing = false;
       return
      }
  
    const updatedTask: Task = { ...this.task, title: this.editTitle };
    this.taskManagerService.updateTask(updatedTask);
    this.task = updatedTask;
    this.editing = false;
  }
  
}
