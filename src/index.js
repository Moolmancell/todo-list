import "./logic"
import "./ui"

import { LocalStorageAdaptor } from "./logic";

const createDefault = (function() {
    if (LocalStorageAdaptor.getKey("MyLists")) {
        console.log("MyLists already exists in local storage");
        return;
    }
    LocalStorageAdaptor.setKey("MyLists", { name: "MyLists", description: "", todo: [] });
})();