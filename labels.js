

class Labels {
    constructor(data, userLabels) {
        this.userLabels = userLabels;
        this.baseLabels = getObjectFromStorage('baseLabels');

        this.createBaseLabels(data);
    }

    getAllLabels() {
        return Object.assign({}, this.userLabels, this.baseLabels);
    }

    getLabelDesign(label) {
        var clickEvent = 'onclick="labelClicked(&apos;' + label + '&apos;)"';
        var hidden = "";

        if (label == "All")
            hidden = " style='display: none;'";

        return '<div id="' + label + '" class="label notselected" ' + clickEvent + hidden + '>' + label + '</div>';
    }

    getLabelValue(label) {
        var labels = null;
        var returnValue = [];

        // select the container to fetch
        if (this.userLabels != null && this.userLabels.hasOwnProperty(label))
            labels = this.userLabels;
        else
            labels = this.baseLabels;

        // get all values from label
        returnValue = labels[label];
        returnValue.splice(0, 0, "All");
        return returnValue;
    }

    displayLabels() {
        var labelsHtml = "";

        if (this.userLabels != null)
            for (var label in this.userLabels)
                labelsHtml += this.getLabelDesign(label);

        if (this.baseLabels != null)
            for (var label in this.baseLabels)
                labelsHtml += this.getLabelDesign(label);

        return labelsHtml;
    }

    createBaseLabels(data) {
        if (this.baseLabels == null) {
            this.baseLabels = {};
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].factions.length; j++) {
                    if (this.baseLabels.hasOwnProperty(data[i].factions[j]) == false)
                        this.baseLabels[data[i].factions[j]] = [];
                    this.baseLabels[data[i].factions[j]].push(data[i].uniqueName);
                }
            }

            this.baseLabels["All"] = [];
            storeObjectInStorage('baseLabels', this.baseLabels);
        }
    }

    createLabel(label, pool) {
        if (this.userLabels == null)
            this.userLabels = {};

        this.userLabels[label] = pool;
        storeObjectInStorage('userLabels', this.userLabels);
        return this.getLabelDesign(label);
    }
}