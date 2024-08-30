import * as bootstrap from 'bootstrap';
import { addToDo } from './logic';
import { LocalStorageAdaptor } from './logic';
import { generateTasks } from './ui';
import { currentProject } from './ui';

const addTaskModal = new bootstrap.Modal(document.getElementById("AddModal"));

function clearForm() {
    document.body.querySelectorAll("form .form-control").forEach(element => {
        element.value = "";
    });
}

function getFormValues() {
    return {
        title: document.getElementById("add-task-title").value,
        description: document.getElementById("add-task-description").value,
        due: document.getElementById("add-task-date").value,
        priority: +document.getElementById("add-task-priority").value
    };
}

function validateForm(values) {
    return values.title && values.description && values.due && values.priority;
}

function handleAddTask() {
    const values = getFormValues();
    
    if (validateForm(values)) {
        addToDo(values.title, values.description, values.due, values.priority, currentProject);
        addTaskModal.hide();
        generateTasks(LocalStorageAdaptor.getKey(currentProject));
    } else {
        alert("Fill all the required fields");
    }
}

function setupEventListeners() {
    const addTaskButtonModal = document.getElementById("AddTaskButtonModal");
    addTaskButtonModal.addEventListener("click", () => {
        document.getElementById("AddTaskButton").dataset.target = currentProject;
    });

    const modal = document.getElementById("AddModal");
    modal.addEventListener("hide.bs.modal", clearForm);

    const addTaskButton = document.getElementById("AddTaskButton");
    addTaskButton.addEventListener("click", handleAddTask);
}

setupEventListeners();
