import '../scss/styles.scss'

import * as bootstrap from 'bootstrap'

import "./ui"
import "./logic"
import "./addTask"
import "./addProject"

import { LocalStorageAdaptor } from "./logic";
import { generateProjectsSelection } from './ui';
import { generateTasks } from './ui';

generateProjectsSelection("_projects");
generateTasks(LocalStorageAdaptor.getKey("_inbox"));