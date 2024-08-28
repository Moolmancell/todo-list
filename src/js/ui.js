import * as bootstrap from 'bootstrap' 

import {LocalStorageAdaptor} from "./logic"

export let currentProject = "_inbox";
export function changeCurrentProject(value) {
    currentProject = value;
}

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

    if (document.querySelector(".accordion-item")) {
        document.querySelectorAll(".accordion-item").forEach(element => {
            element.remove()
        });
    }

    let todos = project["todo"];
    if (sort === "default") {
        todos.sort(function(a,b) {return a.priority - b.priority})
    }
    

    const container = document.getElementById("accordionContainer");

    const projectName = document.getElementById("projectNameID");
    if (project.name === "_inbox") {
        projectName.textContent = "Tasks";
    } else {
        projectName.textContent = project.name;
    }

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

        editButton.addEventListener("click", () => {
            
        })

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
    
}