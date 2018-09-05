

class Labels {
    constructor(objects) {
        this.objects = objects;
        this.userLabels = getObjectFromStorage('userLabels');
        this.baseLabels = getObjectFromStorage('baseLabels');

        this.createBaseLabels(objects.objectsList);
        this.baseLabels = this.sortLabels(this.baseLabels);

        if (this.userLabels != null) {
            delete this.userLabels[""];
            Labels.completeCollectionHierarchy(this.userLabels);
            this.userLabels = this.sortLabels(this.userLabels);
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

    updateLabel(label, newName, objectsList) {
        if (label != null) {
            this.renameLabelSons(label, newName);
            this.deleteLabelAndChilds(label);
            Labels.completeCollectionHierarchy(this.userLabels);
        }

        this.createLabel(newName, objectsList);
        this.userLabels = this.sortLabels(this.userLabels);
    }

    getLabelEditDesign(label, dataCollection) {
        var labelToons = this.getLabelValue(label);

        return this.getLabelCreateDesign(labelToons);
    }

    getLabelCreateDesign(objectsList) {
        var design = "";

        for (var i = 0; i < objectsList.length; i++)
            design += this.objects.getObjectEditDesign(objectsList[i]);

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
                for (var j = 0; j < objectsList[i].categoryIdList.length; j++) {
                    var labelName = root + objectsList[i].categoryIdList[j];

                    if (this.baseLabels.hasOwnProperty(labelName) == false)
                        this.baseLabels[labelName] = [];
                    this.baseLabels[labelName].push(objectsList[i].baseId);
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
        //Labels.completeHierarchy(this.userLabels, label);
        Labels.completeCollectionHierarchy(this.userLabels);
        this.useLabels = this.sortLabels(this.userLabels);
        storeObjectInStorage('userLabels', this.userLabels);
        return this.getLabelDesign(label);
    }

    deleteLabel(labelName) {
        delete this.userLabels[labelName];

        // delete parent hieranchy
        var ln = labelName.substring(0, labelName.lastIndexOf("."));

        if (ln != "") {
            var hierarchy = ln.split('.');
            var son = ln;
            var parent;
            for (var h = 0; h < hierarchy.length; h++) {
                parent = son.substring(0, son.lastIndexOf("."))

                if (this.hasObjects(son) == false)
                    this.deleteLabelAndChilds(son);

                son = parent;
            }
        }

        storeObjectInStorage('userLabels', this.userLabels);
    }

    deleteLabelAndChilds(labelName) {
        for (var label in this.userLabels) {
            if (label == labelName || label.startsWith(labelName + '.'))
                delete this.userLabels[label];
        }
    }

    hasObjects(labelName) {
        if (this.userLabels.hasOwnProperty(labelName) == false) 
            return false;

        var labelContent = this.userLabels[labelName];
        var hasObject = false;

        // check if label has toon objects
        for (var j = 0; j < labelContent.length; j++) {
            // return true if item is an object or its son has an object
            var son = labelContent[j];
            if (this.objects.hasObject(son) || this.hasObjects(son))
                return true;
        }

        return false;
    }

    renameLabelSons(from, to) {
        from = from + ".";
        var newLabels = new Object();

        // remove all the labels that start with 'from.' in key
        for (var label in this.userLabels) {
            if (label.startsWith(from)) {
                var key = to + "." + label.substring(from.length);
                newLabels[key] = this.userLabels[label];

                delete this.userLabels[label];
            }
        }

        // index the removed labels with key starting with 'to.'
        for (var newLabel in newLabels)
            this.userLabels[newLabel] = newLabels[newLabel];
    }

    isUserLabel(label) {
        return (this.userLabels != null) && this.userLabels.hasOwnProperty(label) && (label != "");
    }

    sortLabels(labels) {
        var sorted = {},
            key, a = [];

        for (key in labels) {
            if (labels.hasOwnProperty(key)) {
                a.push(key);
            }
        }

        a.sort();

        for (key = 0; key < a.length; key++) {
            sorted[a[key]] = labels[a[key]];
        }
        return sorted;
    }

}