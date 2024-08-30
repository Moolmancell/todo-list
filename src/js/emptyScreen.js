export function emptyScreen() {
    const addTaskButton = document.getElementById("AddTaskButtonModal");
    addTaskButton.classList.add("d-none");

    const projName = document.getElementById("projectNameID")
    projName.className = "position-absolute top-50 start-50 translate-middle";
    projName.style.opacity = "0.5"
    projName.textContent = "Empty please choose a project :)"
}

export function showScreen() {
    const addTaskButton = document.getElementById("AddTaskButtonModal");
    addTaskButton.classList.remove("d-none");

    const projName = document.getElementById("projectNameID")
    projName.className = "mt-5 fw-bold d-inline-block";
    projName.style.opacity = "1"
    projName.textContent = ""
}