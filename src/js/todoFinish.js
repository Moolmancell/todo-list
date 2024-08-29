import { LocalStorageAdaptor } from "./logic";
import { generateTasks } from "./ui";

export function todoFinish(small, project, title) {
    // Find the item with the matching title
    const item = project.todo.find(todoItem => todoItem.title === title);
    
    // If the item is found, update its status
    if (item) {
        if (item.status === "undone") {
            item.status = "done";
        }   else {
            item.status = "undone";
        }
        // Save the updated object back to localStorage
        LocalStorageAdaptor.setKey(project.name, project);
        generateTasks(project)
    } else {
        console.log(`Item with title "${title}" not found.`);
    }
}