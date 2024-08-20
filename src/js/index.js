import '../scss/styles.scss'

import * as bootstrap from 'bootstrap'

import "./logic"
import "./ui"

import { LocalStorageAdaptor } from "./logic";
import { generateProjectsSelection } from './ui';
import { generateTasks } from './ui';

const initialize = (function() {
    if (LocalStorageAdaptor.getKey("MyLists")) {
        console.log("MyLists already exists in local storage");
        return;
    }
    LocalStorageAdaptor.setKey("_inbox", { name: "_inbox", todo: [] });

    if (LocalStorageAdaptor.getKey("_mode")) {
        return
    } else {
        LocalStorageAdaptor.setKey("_mode", "");
    }

    if (LocalStorageAdaptor.getKey("_projects")) {
        console.log("projects already exists in local storage");
        return;
    } else {
        LocalStorageAdaptor.setKey("_projects", {projects: []});
    }

    generateProjectsSelection("_projects")
})();