;(function() {

  function hasClass(element, className) {
    if (element.classList)
      return element.classList.contains(className);
    else
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
  }

  function removeClass(element, className) {
    if (element.classList)
      element.classList.remove(className);
    else
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  function addClass(element, className) {
    if (element.classList)
      element.classList.add(className);
    else
      element.className += ' ' + className;
  }

  function toggleClass(element, className) {
    if (hasClass(element, className)) {
      removeClass(element, className);
    }
    else
      addClass(element, className)
  }

  function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min) ) + min;
  }


  // Toggle Navigation
  /*var navToggleBtn = document.getElementsByClassName('nav-toggle__btn')[0],
      navMain = document.getElementsByClassName('nav-main')[0];

  if (navToggleBtn.length && navMain.length) {
    navToggleBtn.addEventListener('click', function() {
      toggleClass(navMain, 'open');
    });
  }*/
  // END Toggle Navigation

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
    // --

    // Clip-path background item
    if ( menuBg.length > 0 ) {
      var clipPath = getClipPathString(7, 7);
      menuBgPath[0].setAttribute('points', clipPath);
    }
    // --

    // Set walker size & position
    menuWalker[0].style.top = menuItems[0].offsetTop + 'px';
    menuWalker[0].setAttribute('width', menuItems[0].offsetWidth + 'px');
    menuWalker[0].setAttribute('height', menuItems[0].offsetHeight + 'px');
    // --

    // Set walker size & position on hover menu items
    if ( menuEl.length > 0 ) {
      for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('mouseenter', function() {
          var clipPath = getClipPathString(5, 20);

          menuWalker[0].style.top = this.offsetTop + 'px';
          menuWalker[0].setAttribute('width', this.offsetWidth + 'px');
          menuWalker[0].setAttribute('height', Math.floor(this.offsetHeight * 1.1) + 'px');
          menuWalkerPath[0].setAttribute('points', clipPath);
        });
      }
    }
    // --

  });

})();