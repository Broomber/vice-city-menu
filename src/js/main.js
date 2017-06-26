;(function() {

  // Get random Integer num function
  function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min) ) + min;
  }

  // Construct and get string for <polygon> 'points' property
  function getClipPathString(offsetX, offsetY) {
    var clipPathCoord11 = getRandomInt(0, (offsetX + 1))+ ' ' + getRandomInt(0, (offsetY + 1)),
        clipPathCoord12 = getRandomInt((101 - offsetX), 101)+ ' ' + getRandomInt(0, (offsetY + 1)),
        clipPathCoord21 = getRandomInt((101 - offsetX), 101)+ ' ' + getRandomInt((101 - offsetY), 101),
        clipPathCoord22 = getRandomInt(0, (offsetX + 1))+ ' ' + getRandomInt((101 - offsetY), 101),
        clipPathString;

    clipPathString = clipPathCoord11 + ', ' + clipPathCoord12 + ', ' + clipPathCoord21 + ', ' + clipPathCoord22;
    return clipPathString;
  }

  // DOM Content Loaded
  document.addEventListener("DOMContentLoaded", function(event) {

    // Define required variables
    var menuEl = document.getElementsByClassName('menu'),
        menuBg = document.getElementsByClassName('menu-bg'),
        menuBgPath = document.getElementsByClassName('menu-bg-path'),
        menu = menuEl[0],
        menuList = menu.getElementsByClassName('menu__list'),
        menuItems = menu.getElementsByClassName('menu__item'),
        menuLinks = menu.getElementsByClassName('menu__link'),
        menuWalker = menu.getElementsByClassName('menu__walker'),
        menuWalkerPath = menu.getElementsByClassName('menu__walker-path');

    // Set walker styles (top, width, height, points) function
    function setWalkerStyles(relativeItem) {
      var clipPath = getClipPathString(7, 21);

      menuWalker[0].style.top = relativeItem.offsetTop + 'px';
      menuWalker[0].setAttribute('width', relativeItem.offsetWidth + 'px');
      menuWalker[0].setAttribute('height', Math.floor(relativeItem.offsetHeight * 1.1) + 'px');
      menuWalkerPath[0].setAttribute('points', clipPath);
    }

    // Clip-path background item
    if ( menuBg.length > 0 ) {
      var clipPath = getClipPathString(7, 10);
      menuBgPath[0].setAttribute('points', clipPath);
    }

    // Set walker styles on page load
    setWalkerStyles(menuItems[0]);

    // Set walker styles on hover menu items
    if ( menuEl.length > 0 ) {
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('mouseenter', function() {
          setWalkerStyles(this);
        });
      }
    }

  });

})();