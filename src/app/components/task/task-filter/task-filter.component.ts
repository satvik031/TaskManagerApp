import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent {
  @Output() filterChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();

  onFilterChangeEvent(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.filterChange.emit(target.value);
    }
  }

  onSortChangeEvent(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.sortChange.emit(target.value);
    }
  }
}
