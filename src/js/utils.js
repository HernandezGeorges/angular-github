/**
 * Had/Remove a class that toggle visibility style of an element
 * @param  {obj} element        An html element
 * @param  {str} classString    An optional class to add or remove (default=undefined=show)
 */
function toggleVisibility(element, classString) {
    var c = classString || 'show';
    if (element.classList.contains(c)) {
        element.classList.remove(c);
    } else {
        element.classList.add(c);
    }
}


/**
 * Set of actions to execute on image loading/loaded
 * @param  {obj} image      image element on user profile
 */
function onImageLoaded(image) {
    // add backgroung image to block blurry
    image.previousSibling.style.backgroundImage = "url('" + image.src + "')";

    // show user info block
    var card = document.querySelector('.user-infos');
    toggleVisibility(card);
}


/**
 * Minimize/Maximize a search block
 * @param  {obj} element    html close/open button in a block containing user infos
 */
function toggleInfoBlock(element) {
    var block = getClosest(element.parentNode, '.user-infos');
    toggleVisibility(block, 'closed');
}


/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function ( elem, selector ) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }

    return null;

};
