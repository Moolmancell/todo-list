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

export function generateTasks(project, sort = "default") {
    /* 
    <div class="tasks_container accordion mt-3 w-75 m-auto" id="accordionExample">
        <h1 class="project_name mt-5 fw-bold">Tasks</h1>
        <button type="button" class="add_task btn btn-primary mb-4 mt-5 d-flex align-items-center justify-content-between" data-bs-toggle="modal" data-bs-target="#AddModal" data-bs-whatever="">
            <span>Add Task</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg>
        </button>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button fs-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
              <span class="task_title">Task 1</span>
              <span class="priority_task_badge badge text-bg-info ms-5">Low</span>
            </button>
          </h2>
          <!--the ID, data-bs-target, aria-controls of the container below should be unique-->
          <div id="collapse1" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <p class="task_description">Description</p>
                <p class="task_deadline">Deadline</p>
                <br>
                <button type="button" class="delete_task_button btn btn-danger btn-block mt-3 ms-right-2">Delete</button>
                <button type="button" class="edit_task_button btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#EditModal" data-bs-whatever="@mdo">Edit</button>
                <button type="button" class="done_task_button btn btn-success mt-3">Done</button>
            </div>
          </div>
        </div>
    </div>
    */

    // Create main container div
    let todos = project["todo"];
    todos.sort(function(a,b) {return a.priority - b.priority})
    console.log(todos);
    

    const container = document.createElement('div');
    container.className = 'tasks_container accordion mt-3 w-75 m-auto';
    container.id = 'accordionExample';

    // Create and append the project name header
    const projectName = document.createElement('h1');
    projectName.className = 'project_name mt-5 fw-bold';
    if (project.name === "_inbox") {
        projectName.textContent = "Tasks";
    } else {
        projectName.textContent = project.name;
    }
    container.appendChild(projectName);

    // Create and append the add task button
    const addTaskButton = document.createElement('button');
    addTaskButton.type = 'button';
    addTaskButton.className = 'add_task btn btn-primary mb-4 mt-5 d-flex align-items-center justify-content-between';
    addTaskButton.dataset.bsToggle = 'modal';
    addTaskButton.dataset.bsTarget = '#AddModal';
    addTaskButton.dataset.bsWhatever = '';

    // Create and append span for "Add Task"
    const addTaskSpan = document.createElement('span');
    addTaskSpan.textContent = 'Add Task';
    addTaskButton.appendChild(addTaskSpan);

    // Create and append SVG icon
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgIcon.setAttribute('width', '16');
    svgIcon.setAttribute('height', '16');
    svgIcon.setAttribute('fill', 'currentColor');
    svgIcon.classList.add('bi');
    svgIcon.classList.add('bi-plus');
    svgIcon.setAttribute('viewBox', '0 0 16 16');

    // Create and append path to SVG
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4');
    svgIcon.appendChild(path);
    addTaskButton.appendChild(svgIcon);

    container.appendChild(addTaskButton);

    let idNumber = 0;
    todos.forEach(todo => {
        // Create and append the accordion item
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';

        // Create and append the accordion header
        const accordionHeader = document.createElement('h2');
        accordionHeader.className = 'accordion-header';

        // Create and append the accordion button
        const accordionButton = document.createElement('button');
        accordionButton.className = 'accordion-button fs-4 collapsed';
        accordionButton.type = 'button';
        accordionButton.dataset.bsToggle = 'collapse';
        accordionButton.dataset.bsTarget = `#collapse${idNumber}`;
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionButton.setAttribute('aria-controls', `collapse${idNumber}`);

        // Create and append span for task title
        const taskTitleSpan = document.createElement('span');
        taskTitleSpan.className = 'task_title';
        taskTitleSpan.textContent = todo.title;
        accordionButton.appendChild(taskTitleSpan);

        // Create and append span for priority badge
        const priorityBadgeSpan = document.createElement('span');
        
        if (todo.priority === 1) {
            priorityBadgeSpan.className = 'priority_task_badge badge text-bg-danger ms-5';
            priorityBadgeSpan.textContent = "High";
        } else if (todo.priority === 2) {
            priorityBadgeSpan.className = 'priority_task_badge badge text-bg-warning ms-5';
            priorityBadgeSpan.textContent = "Med";
        } else if (todo.priority === 3) {
            priorityBadgeSpan.className = 'priority_task_badge badge text-bg-primary ms-5';
            priorityBadgeSpan.textContent = "Low";
        }
        accordionButton.appendChild(priorityBadgeSpan);
        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);

        // Create and append the accordion collapse
        const accordionCollapse = document.createElement('div');
        accordionCollapse.id = `collapse${idNumber}`;
        accordionCollapse.className = 'accordion-collapse collapse';
        accordionCollapse.dataset.bsParent = '#accordionExample';

        // Create and append the accordion body
        const accordionBody = document.createElement('div');
        accordionBody.className = 'accordion-body';

        // Create and append task description paragraph
        const taskDescription = document.createElement('p');
        taskDescription.className = 'task_description';
        taskDescription.textContent = todo.description;
        accordionBody.appendChild(taskDescription);

        // Create and append task deadline paragraph
        const taskDeadline = document.createElement('p');
        taskDeadline.className = 'task_deadline';
        taskDeadline.textContent = todo.duedate;
        accordionBody.appendChild(taskDeadline);

        // Create and append a line break
        accordionBody.appendChild(document.createElement('br'));

        // Create and append delete task button
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'delete_task_button btn btn-danger btn-block mt-3 ms-right-2';
        deleteButton.textContent = 'Delete';
        accordionBody.appendChild(deleteButton);

        // Create and append edit task button
        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.className = 'edit_task_button btn btn-primary mt-3 ms-2';
        editButton.dataset.bsToggle = 'modal';
        editButton.dataset.bsTarget = '#EditModal';
        editButton.dataset.bsWhatever = '@mdo';
        editButton.textContent = 'Edit';
        accordionBody.appendChild(editButton);

        // Create and append done task button
        const doneButton = document.createElement('button');
        doneButton.type = 'button';
        doneButton.className = 'done_task_button btn btn-success mt-3 ms-2';
        doneButton.textContent = 'Done';
        accordionBody.appendChild(doneButton);

        accordionCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionCollapse);

        container.appendChild(accordionItem)
        idNumber+=1;
    });
    

    // Append the container to the body (or another parent element as needed)
    document.body.appendChild(container);
}