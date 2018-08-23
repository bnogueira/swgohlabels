

class Labels {
    constructor(objects) {
        this.objects = objects;
        this.userLabels = getObjectFromStorage('userLabels');
        this.baseLabels = getObjectFromStorage('baseLabels');

        this.createBaseLabels(objects.objectsList);

        if (this.userLabels != null)
        {
            delete this.userLabels[""];
            Labels.completeCollectionHierarchy(this.userLabels);
        }
    }

    getAllLabels() {
        return Object.assign({}, this.userLabels, this.baseLabels);
    }

    getLabelDesign(label) {
        var clickEvent = 'onclick="labelClicked(&apos;' + label + '&apos;)"';
        var hidden = "";
        var hierarchy = label.split('.');

        return '<div id="' + label + '" class="label notselected" ' + clickEvent + hidden + '>' + hierarchy[hierarchy.length - 1] + '</div>';
    }

    getLabelEditDesign(label, dataCollection) {

        var labelToons = this.getLabelValue(label);
        var design = "";

        for (var i = 0; i < labelToons.length; i++)
            design += this.objects.getObjectEditDesign(labelToons[i]);

        return design;
    }

    getLabelValue(label) {
        var labels = null;
        var returnValue = [];

        if (this.userLabels != null && this.userLabels.hasOwnProperty(label))
            returnValue = returnValue.concat(this.userLabels[label]);

        if (this.baseLabels != null && this.baseLabels.hasOwnProperty(label))
            returnValue = returnValue.concat(this.baseLabels[label]);

        return returnValue;
    }

    displayLabels() {
        var labelsHtml = "";

        if (this.userLabels != null)
            for (var label in this.userLabels)
                if (label != "")
                    labelsHtml += this.getLabelDesign(label);

        if (this.baseLabels != null)
            for (var label in this.baseLabels)
                if (label != "")
                    labelsHtml += this.getLabelDesign(label);

        return labelsHtml;
    }

    createBaseLabels(objectsList) {
        if (this.baseLabels == null) {
            var root = "Categories."
            this.baseLabels = {};

            // dig objectsList and create labels
            for (var i = 0; i < objectsList.length; i++) {
                for (var j = 0; j < objectsList[i].factions.length; j++) {
                    var labelName = root + objectsList[i].factions[j];

                    if (this.baseLabels.hasOwnProperty(labelName) == false)
                        this.baseLabels[labelName] = [];
                    this.baseLabels[labelName].push(objectsList[i].uniqueName);
                }
            }

            // complete labels hierarchy
            Labels.completeCollectionHierarchy(this.baseLabels);
            storeObjectInStorage('baseLabels', this.baseLabels);
        }
    }

    static completeCollectionHierarchy(labels) {
        for (var labelName in labels) {
            Labels.completeHierarchy(labels, labelName);
        }
    }

    static completeHierarchy(collection, labelName) {
        var hierarchy = labelName.split('.');
        var son = labelName;
        var parent;
        for (var h = 0; h < hierarchy.length; h++) {
            parent = son.substring(0, son.lastIndexOf("."))
            if (collection.hasOwnProperty(parent) == false)
                collection[parent] = [];

            if (collection[parent].includes(son) == false)
                collection[parent].push(son);

            son = parent;
        }
    }


    createLabel(label, pool) {
        if (this.userLabels == null)
            this.userLabels = {};

        this.userLabels[label] = pool;
        Labels.completeHierarchy(this.userLabels, label);
        storeObjectInStorage('userLabels', this.userLabels);
        return this.getLabelDesign(label);
    }

    deleteLabel(label) {
        delete this.userLabels[label];
        storeObjectInStorage('baseLabels', this.baseLabels);
    }

    renameLabel(from, to) {
        this.userLabels[to] = this.userLabels[from];
        delete this.userLabels[from];
        storeObjectInStorage('userLabels', this.userLabels);
    }

    isUserLabel(label) {
        return (this.userLabels != null) && this.userLabels.hasOwnProperty(label) && (label!="");
    }
}