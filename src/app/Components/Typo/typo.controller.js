(function () {
  "use strict";

  angular.module("typo", []).directive("typo", function () {
    return {
      templateUrl: "app/Components/Typo/typo.template.html",
      restrict: "EA",
      transclude: true,
      scope: {
        tag: "=",
        content: "=",
      },
    };
  });
})();
