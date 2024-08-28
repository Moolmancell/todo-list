import * as bootstrap from 'bootstrap'
import { addToDo } from './logic';
import { LocalStorageAdaptor } from './logic';
import { generateTasks } from './ui';
import { currentProject } from './ui';

/* start modal */

const addTaskModal = new bootstrap.Modal(
    document.getElementById("AddModal"));

const AddTaskButtonModal = document.getElementById("AddTaskButtonModal");
AddTaskButtonModal.addEventListener("click", (e) => {
    document.getElementById("AddTaskButton").dataset.target = currentProject;
});

const modal = document.getElementById("AddModal");
modal.addEventListener("hide.bs.modal", () => {
    document.body.querySelectorAll("form .form-control").forEach(element => {
        element.value = "";
    });
})

const AddTaskButton = document.getElementById("AddTaskButton");
AddTaskButton.addEventListener("click", () => {
    const title = document.getElementById("add-task-title");
    const description = document.getElementById("add-task-description")
    const due = document.getElementById("add-task-date")
    const priority = document.getElementById("add-task-priority")

    if (title.value && description.value &&
        due.value && priority.value) {
            addToDo(title.value, description.value, due.value, +priority.value, currentProject)
            addTaskModal.hide()
            generateTasks(LocalStorageAdaptor.getKey(currentProject));
        } else {
            alert("Fill all the required fields")
        }
});  