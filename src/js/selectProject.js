import { generateTasks } from "./ui";
import { LocalStorageAdaptor } from "./logic";
import { changeCurrentProject } from "./ui";
import { showScreen } from "./screens";
// Function to update the project display
function updateProjectDisplay(projectName) {
    const projectNameElement = document.getElementById("projectNameID");
    projectNameElement.textContent = projectName;
}

function showDeleteProjectButton() {
    const button = document.getElementById("deleteProjectButton")
    button.classList.remove("d-none")
}

function hideDeleteProjectButton() {
    const button = document.getElementById("deleteProjectButton")
    button.classList.add("d-none")
}

// Function to handle project selection
export function selectProject(project) {
    updateProjectDisplay(project);
    changeCurrentProject(project);
    showDeleteProjectButton();
    showScreen()
    generateTasks(LocalStorageAdaptor.getKey(project));
}

// Function to handle inbox button click
function handleInboxClick() {
    updateProjectDisplay("Tasks");
    changeCurrentProject("_inbox");
    hideDeleteProjectButton();
    showScreen();
    generateTasks(LocalStorageAdaptor.getKey("_inbox"));
}

// Event listener for the inbox button
const inbox = document.getElementById("inboxButtonID");
inbox.addEventListener("click", handleInboxClick);
