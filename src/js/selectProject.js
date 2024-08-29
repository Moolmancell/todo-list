import { generateTasks } from "./ui";
import { LocalStorageAdaptor } from "./logic";
import { changeCurrentProject } from "./ui";

export function selectProject(project) {
    const projectName = document.getElementById("projectNameID");
    projectName.textContent = project;
    changeCurrentProject(project)
    generateTasks(LocalStorageAdaptor.getKey(project));
}

const inbox = document.getElementById("inboxButtonID");
inbox.addEventListener("click", () => {
    const projectName = document.getElementById("projectNameID");
    projectName.textContent = "Tasks";
    changeCurrentProject("_inbox")
    generateTasks(LocalStorageAdaptor.getKey("_inbox"));
})