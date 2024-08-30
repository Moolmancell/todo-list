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

function todoExist(project, title) {
    let todoExist = false;
    project.todo.forEach(element => {
        if (element.title === title) {
            todoExist = true;
            console.log("todo title already given")
            return
        } 
    });

    return !todoExist
}

function addToDo(title, description, duedate, priority, proj = "_inbox", status = "undone") {

    let project = LocalStorageAdaptor.getKey(proj);
    if (!project) {
        console.log("Project does not exist.");
        return;
    }

    if (todoExist(project, title)) {
        project.todo.push({ title, description, duedate, priority, status});
        LocalStorageAdaptor.setKey(proj, project);
    }
}

function editTodo(title, new_title, new_description, new_duedate, new_priority, proj = "_inbox") {
    let project = LocalStorageAdaptor.getKey(proj);
    const index = project.todo.findIndex(obj => obj.title === title);

    if (todoExist(project, new_title)) {
        if (index !== -1) {
        project.todo[index] = {
        ...project.todo[index],
        ...{
            title: new_title,
            description: new_description,
            duedate: new_duedate,
            priority: new_priority
        }
        };
    }
        LocalStorageAdaptor.setKey(proj, project)
    }
}

function checkProject(name) {
    const project = LocalStorageAdaptor.getKey(name);
    if (project) {
        console.log(project);
        return true
    } else {
        console.log("Project does not exist.");
        return false
    }
}

function removeTodo(projectName, title) {
    let project = LocalStorageAdaptor.getKey(projectName);
    const index = project.todo.findIndex(obj => obj.title === title)
    if (!project) {
        console.log("Project does not exist");
        return;
    }
    if (todoExist(project, title)) {
        console.log("Invalid to-do");
        return;
    }
    project.todo.splice(index, 1);
    LocalStorageAdaptor.setKey(projectName, project);
}

function removeProject(projectName) {
    let project = LocalStorageAdaptor.getKey(projectName)
    if (checkProject(projectName)) {
        console.log("Project does not exist");
        return;
    }
    LocalStorageAdaptor.removeKey(projectName);
}

export {
    LocalStorageAdaptor,
    addProject,
    todoExist,
    addToDo,
    editTodo,
    checkProject,
    removeTodo,
    removeProject
}

const initialize = (function() {
    if (LocalStorageAdaptor.getKey("_inbox")) {
        console.log("_inbox already exists in local storage");
        return;
    }
    LocalStorageAdaptor.setKey("_inbox", { name: "_inbox", todo: [] });

    if (LocalStorageAdaptor.getKey("_mode")) {
        console.log("_mode already exists in local storage")
        return
    } else {
        LocalStorageAdaptor.setKey("_mode", "");
    }

    if (LocalStorageAdaptor.getKey("_projects")) {
        console.log("_projects already exists in local storage");
        return;
    } else {
        LocalStorageAdaptor.setKey("_projects", {projects: []});
    }

})();