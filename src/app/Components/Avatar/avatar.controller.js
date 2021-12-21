(function () {
  "use strict";

  angular.module("avatar", []).directive("avatar", function () {
    return {
      templateUrl: "app/Components/Avatar/avatar.template.html",
      restrict: "E",
      transclude: true,
      scope: {
        src: "=",
      },
    };
  });
})();
