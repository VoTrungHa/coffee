(function () {
  "use strict";

  angular.module("modal", []).directive("modal", function () {
    return {
      restrict: "E",
      replace: true,
      transclude: true,
      scope: {
        title: "=",
      },
      templateUrl: "app/Components/Modal/modal.template.html",
    };
  });
})();
