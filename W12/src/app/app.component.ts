import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  newTask: string = '';
  tasks: string[] = [];
  isEditing: boolean = false;
  currentIndex: number = -1;

  addTask() {
    if (this.newTask.trim()) {
      if (this.isEditing) {
        this.tasks[this.currentIndex] = this.newTask.trim();
        this.isEditing = false;
        this.currentIndex = -1;
      } else {
        this.tasks.push(this.newTask.trim());
      }
      this.newTask = '';
    }
  }

  editTask(index: number) {
    this.newTask = this.tasks[index];
    this.isEditing = true;
    this.currentIndex = index;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}