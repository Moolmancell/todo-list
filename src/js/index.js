import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import "./logic"
import "./ui"

import { LocalStorageAdaptor } from "./logic";

const createDefault = (function() {
    if (LocalStorageAdaptor.getKey("MyLists")) {
        console.log("MyLists already exists in local storage");
        return;
    }
    LocalStorageAdaptor.setKey("MyLists", { name: "MyLists", todo: [] });

    if (LocalStorageAdaptor.getKey("Mode")) {
        return
    } else {
        LocalStorageAdaptor.setKey("Mode", "default");
    }
})();