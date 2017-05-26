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
    var clipPathCoord11 = getRandomInt(0, (offsetX + 1))+ '% ' + getRandomInt(0, (offsetY + 1)) + '%',
        clipPathCoord12 = getRandomInt((101 - offsetX), 101)+ '% ' + getRandomInt(0, (offsetY + 1)) + '%',
        clipPathCoord21 = getRandomInt((101 - offsetX), 101)+ '% ' + getRandomInt((101 - offsetY), 101) + '%',
        clipPathCoord22 = getRandomInt(0, (offsetX + 1))+ '% ' + getRandomInt((101 - offsetY), 101) + '%',
        clipPathString;

    clipPathString = clipPathCoord11 + ', ' + clipPathCoord12 + ', ' + clipPathCoord21 + ', ' + clipPathCoord22;
    clipPathString = 'polygon(' + clipPathString + ')';

    return clipPathString;
  }

  var menuEl = document.getElementsByClassName('menu'),
      menu = menuEl[0],
      menuList = menu.getElementsByClassName('menu__list'),
      menuItems = menu.getElementsByClassName('menu__item'),
      menuLinks = menu.getElementsByClassName('menu__link'),
      menuWalker = menu.getElementsByClassName('menu__walker');

  if ( menuEl.length > 0 ) {
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].addEventListener('mouseenter', function() {
        var clipPath = getClipPathString(5, 20);

        menuWalker[0].style.top = this.offsetTop + 'px';
        menuWalker[0].style.width = this.offsetWidth + 'px';

        menuWalker[0].style.clipPath = clipPath;
      });
    }
  }

})();