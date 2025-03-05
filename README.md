# Task Manager App

A simple Task Manager web application built with Angular 17, SCSS, and Bootstrap. This project demonstrates core CRUD functionality for managing tasks, along with extra features such as filtering, sorting, inline editing, undo deletion, and toast notifications.

## Overview

TaskManagerApp allows users to:
- **Add Tasks:** Create tasks with a title, due date, and priority.
- **View Tasks:** Display tasks in a table (or card) view with details such as title, due date, priority, and completion status.
- **Edit Tasks:** Inline editing of task titles.
- **Toggle Completion:** Mark tasks as complete or incomplete using a checkbox.
- **Delete Tasks & Undo:** Remove tasks with the ability to undo the last deletion.
- **Filter and Sort:** Filter tasks by status (all, completed, incomplete) and sort by due date, priority, or title.

## Features

- **CRUD Operations:** Create, read, update, and delete tasks.
- **Due Date and Priority:** Assign a due date and priority (High, Medium, Low) to tasks.
- **Real-time Updates:** Uses Angular services and RxJS to ensure UI updates immediately upon changes.
- **Filtering & Sorting:** Easily filter tasks by status and sort by various criteria.
- **Responsive UI:** Built with Bootstrap 5 to ensure a mobile-friendly, responsive interface.

## Setup Instructions

### Prerequisites
- **Node.js & npm:** Ensure you have Node.js (v14 or above) and npm installed.

- **Angular CLI:** Install or update Angular CLI to v17 (or the desired version).

- npm install -g @angular/cli@17

### Clone the Repository
- git clone https://github.com/satvik031/TaskManagerApp.git 
- cd TaskManagerApp

### Install Dependencies
- npm install

### Bootstrap & Prettier Setup
- **Bootstrap:** The project uses Bootstrap 5 for styling. Its CSS and JS are included via the angular.json configuration.
- **Prettier:** Code formatting is managed with Prettier. Configuration details can be found in the .prettierrc file.

### Running Prettier
- To run the tests, execute: npm run prettier

### Running the Application
- Start the development server with the following command: ng serve

- Open your browser and navigate to http://localhost:4200 to view the application.

### Running Tests
- The application uses Jasmine/Karma for unit testing. 

- To run the tests, execute: ng test

### Link for Video Demonstartion

- https://www.loom.com/share/8262330fdb8b410e999f95bf38b6c4b5?sid=912b2742-d03f-484b-a879-a8f23af56199

