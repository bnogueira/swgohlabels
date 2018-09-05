
class Objects {
    constructor(objectsList, imagesIndex) {
        this.objectsList = objectsList;
        this.imagesIndex = imagesIndex;
        this.objectsIndex = new Object();

        // build objectsIndex
        for (var i = 0; i < this.objectsList.length; i++)
            this.objectsIndex[this.objectsList[i].baseId] = this.objectsList[i];
    }

    hasObject(key) {
        return this.objectsIndex.hasOwnProperty(key);
    }

    getObjectDesign(idx, isSelected, deffered) {
        var gearImage = "";
        var levelAndStars = "";
        var dataObject = this.objectsList[idx];
        var image = this.imagesIndex[dataObject.baseId].src;
        var deferredTag = "";
        var selected = "";

        if (isSelected)
            selected = "selected";
        else
            selected = "notselected";

        // defer images 
        if (deffered)
            deferredTag = "data-";

        // prepare design for user objects info        
        if (dataObject.hasOwnProperty("instance")) {
            var stars = this.getStarsFor(dataObject.instance.starLevel);
            gearImage = deferredTag + 'src="img/gear-icon-g' + dataObject.instance.gearLevel + '.svg" ';
            levelAndStars = '<div class="level">' + dataObject.instance.level + '</div>' + stars;
        }

        // design objects
        return '<div class="player-char-portrait char-portrait-full ' + selected + '"' +
            'onclick="objectClicked(this, &apos;' + dataObject.baseId + '&apos;)" id="' + dataObject.baseId + '">' +
            '<image ' + deferredTag +
            'style="background:url(' + image + '); background-size: 60px 60px; border-radius: 50%" ' +
            gearImage + 'width="60" height="60"' + '>' +
            levelAndStars +
            '</div>';
    }

    getObjectEditDesign(objectbaseId) {

        if (this.objectsIndex.hasOwnProperty(objectbaseId) == false)
            return ""

        var name = this.objectsIndex[objectbaseId].nameKey;
        var image = this.imagesIndex[objectbaseId].src;

        var design =
            "<div class=\"w3-container w3-bar w3-border w3-border-gray\" style=\"color: cyan; height: 60px;\" object-id=\"" + objectbaseId + "\">" +
            "<span onclick=\"this.parentElement.style.display='none'\" class=\"w3-bar-item w3-button w3-xlarge w3-right\">&times;</span>" +
            "<img src=\"" + image + "\" class=\"w3-bar-item\" style=\"width:50px; border-radius: 50%; padding: 5px 0\">" +
            "<div class=\"w3-bar-item\">" +
            "<span>" + name + "</span>" +
            "</div>" +
            "</div>";
        return design;
    }

    getStarsFor(rarity) {
        var stars = "";
        for (let i = 1; i <= 7; i++)
            if (i <= rarity)
                stars += '<div class="star star' + i + '"></div>';
            else
                stars += '<div class="star star' + i + ' star-inactive"></div>';

        return stars;
    }


}
