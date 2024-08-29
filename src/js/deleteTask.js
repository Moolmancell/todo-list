import { removeTodo } from "./logic";
import { generateTasks } from "./ui";
import { LocalStorageAdaptor } from "./logic";
import { currentProject } from "./ui";

export function removeTasks(project, title) {
    removeTodo(project, title);
    generateTasks(LocalStorageAdaptor.getKey(project))
}