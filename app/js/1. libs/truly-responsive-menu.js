var trulyResponsiveMenu = function trulyResponsiveMenu(options) {

  'use strict';

  // Extend objects function
  var extend = function extend(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
  };

  var settings = {
    container: '[data-menu-container]',
    children: '',
    toggleClasses: ['is-mobile']
  };

  extend(settings, options || {});

  var selectors = {
    container: document.querySelector(settings.container),
    children: settings.children === '' ? document.querySelector(settings.container).children : document.querySelectorAll(settings.children)
  };

  // Debounce function
  var debounce = function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  var equalOffsetTop = function equalOffsetTop(htmlCollection) {
    var i = 1,
        bool = true;

    while (i < htmlCollection.length && bool) {
      bool = htmlCollection[0].offsetTop === htmlCollection[i].offsetTop;
      i++;
    }
    return bool;
  };

  var toggleWrappingClass = function toggleWrappingClass(bool) {
    if (bool) {
      settings.toggleClasses.forEach(function(key) {
        selectors.container.classList.add(key);
      });
    } else {
      settings.toggleClasses.forEach(function(key) {
        selectors.container.classList.remove(key);
      });
    }
  };

  var toggleCheck = debounce (function() {
    toggleWrappingClass(false);
    if (!equalOffsetTop(selectors.children)) {
      toggleWrappingClass(true);
    } else {
      toggleWrappingClass(false);
    }
  }, 20);

  window.addEventListener('resize', toggleCheck);

};
