import * as bootstrap from 'bootstrap';
import { formatDate } from "./date";
import { currentProject } from "./ui";
import { LocalStorageAdaptor } from "./logic";
import { generateTasks } from "./ui";
import { removeTodo, addToDo } from './logic';

const editModal = document.getElementById("editTaskModal");
const editTaskModal = new bootstrap.Modal(editModal);
const saveEditButton = document.getElementById("save-edit-button-modal");

function setFormValues(item) {
    document.getElementById("edit-task-title").value = item.title;
    document.getElementById("edit-task-description").value = item.description;
    document.getElementById("edit-task-date").value = formatDate(item.duedate);
    document.getElementById("edit-task-priority").value = item.priority;
}

function validateForm() {
    const title = document.getElementById("edit-task-title").value;
    const description = document.getElementById("edit-task-description").value;
    const date = document.getElementById("edit-task-date").value;
    const priority = document.getElementById("edit-task-priority").value;
    return title && description && date && priority;
}

function updateTask(project, title) {
    const newTitle = document.getElementById("edit-task-title").value;
    const newDescription = document.getElementById("edit-task-description").value;
    const newDate = document.getElementById("edit-task-date").value;
    const newPriority = +document.getElementById("edit-task-priority").value;

    removeTodo(project, title);
    addToDo(newTitle, newDescription, newDate, newPriority, project);
    generateTasks(LocalStorageAdaptor.getKey(project));
}

export function editTodo(project, title) {
    const item = project.todo.find(todoItem => todoItem.title === title);

    if (item) {
        setFormValues(item);
    }

    const handleSaveEdit = () => {
        if (validateForm()) {
            updateTask(currentProject, title);
            editTaskModal.hide();
        } else {
            alert("Fill all the required fields");
        }
    };

    saveEditButton.addEventListener("click", handleSaveEdit);

    editModal.addEventListener("hide.bs.modal", () => {
        saveEditButton.removeEventListener("click", handleSaveEdit);
    });
}
