import { generateTasks } from "./ui";
import { LocalStorageAdaptor } from "./logic";
import { changeCurrentProject } from "./ui";

// Function to update the project display
function updateProjectDisplay(projectName) {
    const projectNameElement = document.getElementById("projectNameID");
    projectNameElement.textContent = projectName;
}

// Function to handle project selection
export function selectProject(project) {
    updateProjectDisplay(project);
    changeCurrentProject(project);
    generateTasks(LocalStorageAdaptor.getKey(project));
}

// Function to handle inbox button click
function handleInboxClick() {
    updateProjectDisplay("Tasks");
    changeCurrentProject("_inbox");
    generateTasks(LocalStorageAdaptor.getKey("_inbox"));
}

// Event listener for the inbox button
const inbox = document.getElementById("inboxButtonID");
inbox.addEventListener("click", handleInboxClick);
