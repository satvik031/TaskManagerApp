import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Task } from '../../../models/task.model';
import { TaskManagerService } from '../../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskFilterComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  currentFilter: string = 'all';
  currentSort: string = 'none';
  private subscription!: Subscription;

  constructor(private taskManagerService: TaskManagerService) {}

  ngOnInit(): void {
    this.subscription = this.taskManagerService
      .getTasksObservable()
      .subscribe((tasks) => {
        this.tasks = tasks;
        this.applyFilterAndSort();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  undoDeletion(): void {
    this.taskManagerService.undoDelete();
  }

  onFilterChange(filter: string): void {
    this.currentFilter = filter;
    this.applyFilterAndSort();
  }

  onSortChange(sort: string): void {
    this.currentSort = sort;
    this.applyFilterAndSort();
  }

  private applyFilterAndSort(): void {
    // Filter tasks
    let tempTasks: Task[] = [];
    switch (this.currentFilter) {
      case 'completed':
        tempTasks = this.tasks.filter((task) => task.completed);
        break;
      case 'incomplete':
        tempTasks = this.tasks.filter((task) => !task.completed);
        break;
      default:
        tempTasks = [...this.tasks];
    }
    // Sort tasks
    if (this.currentSort === 'dueDate') {
      tempTasks.sort((a, b) => {
        const aTime = a.dueDate
          ? new Date(a.dueDate).getTime()
          : Number.MAX_SAFE_INTEGER;
        const bTime = b.dueDate
          ? new Date(b.dueDate).getTime()
          : Number.MAX_SAFE_INTEGER;
        return aTime - bTime;
      });
    } else if (this.currentSort === 'priority') {
      const priorityOrder: { [key: string]: number } = {
        High: 1,
        Medium: 2,
        Low: 3,
      };
      tempTasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priority || 'Medium'];
        const bPriority = priorityOrder[b.priority || 'Medium'];
        return aPriority - bPriority;
      });
    } else if (this.currentSort === 'title') {
      tempTasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    this.filteredTasks = tempTasks;
  }
}
