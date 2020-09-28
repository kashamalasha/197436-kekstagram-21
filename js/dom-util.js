'use strict';

(function () {

  let removeChildren = function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  window.domUtil = {
    removeChildren
  };

})();
