import {
    LocalStorageAdaptor,
    addProject,
    addToDo,
    checkProject,
    removeTodo,
    removeProject
} from "./logic"

const colorTheme = (()=>{
    if (LocalStorageAdaptor.getKey("Mode") === "dark") {
        document.querySelector("body").setAttribute("data-bs-theme", "dark")
    } else {
        document.querySelector("body").setAttribute("data-bs-theme", "light")
    }   
})();

document.querySelector(".dropdown-item.light").addEventListener("click", () => {
    LocalStorageAdaptor.setKey("Mode", "light");
    document.querySelector("body").setAttribute("data-bs-theme", "")
})

document.querySelector(".dropdown-item.dark").addEventListener("click", () => {
    LocalStorageAdaptor.setKey("Mode", "dark");
    document.querySelector("body").setAttribute("data-bs-theme", "dark")
})

function generateProjects() {
    
}