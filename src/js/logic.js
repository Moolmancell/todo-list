const LocalStorageAdaptor = (function() {

    function getKey(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    function setKey(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function removeKey(key) {
        localStorage.removeItem(key);
    }

    return {
        getKey,
        setKey,
        removeKey
    }
})();

function addProject(name) {
    if (LocalStorageAdaptor.getKey(name)) {
        console.log("Project already exists. Please choose a different name.");
        return;
    }
    
    let newArray = LocalStorageAdaptor.getKey("_projects")["projects"];
    newArray.push(name)

    LocalStorageAdaptor.setKey("_projects", { projects: newArray});
    LocalStorageAdaptor.setKey(name, { name, todo: [] });
}

function addToDo(title, description, duedate, priority, proj = "_inbox") {

    let todoExist = false;

    let project = LocalStorageAdaptor.getKey(proj);
    if (!project) {
        console.log("Project does not exist.");
        return;
    }

    project.todo.forEach(element => {
        if (element.title === title) {
            todoExist = true;
            console.log("todo title already given")
            return
        } 
    });

    if (!todoExist) {
        project.todo.push({ title, description, duedate, priority });
        LocalStorageAdaptor.setKey(proj, project);
    }
}

function checkProject(name) {
    const project = LocalStorageAdaptor.getKey(name);
    if (project) {
        console.log(project);
    } else {
        console.log("Project does not exist.");
    }
}

function removeTodo(projectName, todoIndex) {
    let project = LocalStorageAdaptor.getKey(projectName);
    if (!project) {
        console.log("Project does not exist");
        return;
    }
    if (todoIndex < 0 || todoIndex >= project.todo.length) {
        console.log("Invalid to-do index");
        return;
    }
    project.todo.splice(todoIndex, 1);
    LocalStorageAdaptor.setKey(projectName, project);
}

function removeProject(projectName) {
    if (!LocalStorageAdaptor.getKey(projectName)) {
        console.log("Project does not exist");
        return;
    }
    LocalStorageAdaptor.removeKey(projectName);
}

export {
    LocalStorageAdaptor,
    addProject,
    addToDo,
    checkProject,
    removeTodo,
    removeProject
}

addToDo("money", "moeny", "today", 2)
addToDo("no", "asd", "asd", 1)
addToDo("23", "asd", "asd", 3)