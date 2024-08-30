const addTaskButton = document.getElementById("AddTaskButtonModal");
const projName = document.getElementById("projectNameID")

export function emptyScreen() {
    addTaskButton.classList.add("d-none");

    projName.className = "position-absolute top-50 start-50 translate-middle";
    projName.style.opacity = "0.5"
    projName.textContent = "Empty please choose a project :)"
}

export function showScreen() {
    addTaskButton.classList.remove("d-none");

    projName.className = "mt-5 fw-bold d-inline-block";
    projName.style.opacity = "1"
    projName.textContent = ""
}