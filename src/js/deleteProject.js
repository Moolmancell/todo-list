import { removeProject } from "./logic";
import { currentProject } from "./ui";
import { generateProjectsSelection } from "./ui";
import { emptyScreen } from "./screens";

const deleteProjectButton = document.getElementById("deleteProjectButton")

function deleteProject() {
    const deleteButton = document.getElementById("deleteProjectButton")
    deleteButton.classList.add("d-none")
    removeProject(currentProject, "_projects");
    emptyScreen();
    generateProjectsSelection("_projects");
}

deleteProjectButton.addEventListener("click", deleteProject);
