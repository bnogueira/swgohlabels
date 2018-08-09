function getObjectDesign(dataObject, deffered) {
    var gearImage = "";
    var levelAndStars = "";
    var image = $images[dataObject.uniqueName].src;
    var deferredTag = "";

    // defer images 
    if (deffered)
        deferredTag = "data-";

    // prepare design for user objects info        
    if (dataObject.hasOwnProperty("instance")) {
        stars = getStarsFor(dataObject.instance.rarity);
        gearImage = deferredTag + 'src="img/gear-icon-g' + dataObject.instance.gear_level + '.svg" ';
        levelAndStars = '<div class="level">' + dataObject.instance.level + '</div>' + stars;
    }

    // design objects
    return '<div class="player-char-portrait char-portrait-full notselected"' +
        'onclick="objectClicked(this, &apos;' + dataObject.uniqueName + '&apos;)" id="' + dataObject.uniqueName + '">' +
        '<image ' + deferredTag +
        'style="background:url(' + image + '); background-size: 60px 60px; border-radius: 50%" ' +
        gearImage + 'width="60" height="60"' + '>' +
        levelAndStars +
        '</div>';
}

function getStarsFor(rarity) {
    var stars = "";
    for (let i = 1; i <= 7; i++)
      if (i <= rarity)
        stars += '<div class="star star' + i + '"></div>';
      else
        stars += '<div class="star star' + i + ' star-inactive"></div>';

    return stars;
  }