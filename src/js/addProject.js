import * as bootstrap from 'bootstrap'
import { addProject } from "./logic";
import { generateProjectsSelection } from "./ui";

const addProjectModal = new bootstrap.Modal(
    document.getElementById("AddProjectModal"));

const addProjectButton = document.getElementById("AddProjectButton");
addProjectButton.addEventListener("click", () => {
    
    const title = document.getElementById("add-project-title")

    if (!title.value) {
        alert("Please fill the required information")
    } else if (title.value) {
        addProject(title.value);
        title.value = "";
        addProjectModal.hide()
        generateProjectsSelection("_projects")
    }
})