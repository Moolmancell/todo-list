function addProject(name, description) {
    if (localStorage.getItem(name)) {
        console.log("Please change Project Name");
        return;
    } 
    localStorage.setItem(name, JSON.stringify({name, description, todo: []}));
    //return {name, description, todo: };
}

function addToDo(title, description, duedate, priority, proj = "default") {
    let newList = JSON.parse(localStorage.getItem(proj));
    newList["todo"].push({
        title, 
        description, 
        duedate, 
        priority
    });
    localStorage.setItem(proj, JSON.stringify(newList))
    //return {title, description, duedate, priority};
}

function checkProject(name) {
    console.log(JSON.parse(localStorage.getItem(name)))
}