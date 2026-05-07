#  Todo List App

A fully modular Todo List web application built with **JavaScript (ES6)** and **Webpack**, following clean architecture and SOLID principles.

##  Features

- Create, edit, and delete todos
- Multiple projects (with default project)
- View todos by project
- Todo details:
  - Title
  - Description
  - Due date
  - Priority (low, medium, high)
- Color-coded priorities
- Data persistence using `localStorage`
- Responsive design (mobile + desktop)

##  Tech Stack

- JavaScript (ES6 Modules)
- Webpack
- Babel
- CSS (custom styling)
- `date-fns` (for date handling)

##  Architecture

This project follows **clean architecture principles**:

- **todo.js** → Todo entity (data model)
- **project.js** → Project manager (handles todos)
- **storage.js** → Persistence layer (localStorage)
- **dom.js** → UI rendering layer
- **index.js** → Application controller (connects everything)

##  Installation

1. Clone the repository:

## Installation

Clone the repository and Install dependencies

```bash
git clone https://github.com/your-username/todo-list.git
cd todo-list
npm install
npm run dev
