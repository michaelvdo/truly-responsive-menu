var run = function run() {
  var options = {
    container: 'ul',
    children: '[data-menu-children]',
    toggleClasses: ['mobile', 'foo']
  };

  trulyResponsiveMenu(options);
};

// in case the document is already rendered
if (document.readyState!='loading') run();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', run);
// IE <= 8
else document.attachEvent('onreadystatechange', function(){
  if (document.readyState=='complete') run();
});
