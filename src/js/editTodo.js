import { formatDate } from "./date";

export function editTodo(project, title) {
    const _title = document.getElementById("edit-task-title");
    const _description = document.getElementById("edit-task-description");
    const _date = document.getElementById("edit-task-date");
    const _priority = document.getElementById("edit-task-priority");

    // Find the todo item by title
    const item = project.todo.find(todoItem => todoItem.title === title);

    if (item) {
        // Set the values of the input fields
        _title.value = item.title;
        _description.value = item.description;
        
        // Format the date to YYYY-MM-DD
        const formattedDate = formatDate(item.duedate);
        _date.value = formattedDate;
        
        _priority.value = item.priority;
    }
}