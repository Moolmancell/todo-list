import {
    LocalStorageAdaptor,
    addProject,
    addToDo,
    checkProject,
    removeTodo,
    removeProject
} from "./logic"

const colorTheme = (()=>{
    if (LocalStorageAdaptor.getKey("_mode") === "dark") {
        document.querySelector("body").setAttribute("data-bs-theme", "dark")
    } else {
        document.querySelector("body").setAttribute("data-bs-theme", "light")
    }   
})();

document.querySelector(".dropdown-item.light").addEventListener("click", () => {
    LocalStorageAdaptor.setKey("_mode", "light");
    document.querySelector("body").setAttribute("data-bs-theme", "")
})

document.querySelector(".dropdown-item.dark").addEventListener("click", () => {
    LocalStorageAdaptor.setKey("_mode", "dark");
    document.querySelector("body").setAttribute("data-bs-theme", "dark")
})

export function generateProjectsSelection(project) {
    /*<button type="button" class="list-group-item list-group-item-action" data-bs-dismiss="offcanvas">
    <span>The current button</span>
    </button>*/
    if (!project) {
        console.log("project not found at generateProjectsSelection(project)")
        return;
    }
    if (LocalStorageAdaptor.getKey(project)["projects"]) {
        LocalStorageAdaptor.getKey(project)["projects"].forEach(project => {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.classList.add("list-group-item");
            button.classList.add("list-group-item-action");
            button.setAttribute("data-bs-dismiss", "offcanvas");
            button.textContent = project;   
    
            document.querySelector(".list-group._project-group").appendChild(button)
            });
    }
}

export function generateTasks(project) {
    
}