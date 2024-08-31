const accordion = document.getElementById("accordionContainer");
const emptyText = document.getElementById("emptyh1");

export function emptyScreen() {
    accordion.classList.add("d-none");
    emptyText.classList.remove("d-none");
}

export function showScreen() {
    accordion.classList.remove("d-none");
    emptyText.classList.add("d-none");
}