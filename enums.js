
class workingMode {
    constructor() {
        this.workModes = { "view": 0, "select": 1 };
        this.workModesDescriptions = ["view", "select"];
        this.value = this.workModes.view;
        this.description = this.workModesDescriptions[this.value];
    }

    toggle() {
        if (this.value == this.workModes.view)
            this.value = this.workModes.select;
        else
            this.value = this.workModes.view;

        this.description = this.workModesDescriptions[this.value];
    }
}

class context {
    constructor() {
        this.contexts = { "toons": 0, "labels": 1 };
        this.contextsDescriptions = ["Toons", "Labels"];
        this.value = this.contexts.toons;
        this.description = this.contextsDescriptions[this.contexts.labels];
    }

    toggle() {
        var oldValue = this.value;

        if (this.value == this.contexts.toons)
            this.value = this.contexts.labels;
        else
            this.value = this.contexts.toons;

        this.description = this.contextsDescriptions[oldValue];
    }
}