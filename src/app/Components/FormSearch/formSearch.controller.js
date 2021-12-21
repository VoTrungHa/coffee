(function () {
  "use strict";

  angular.module("formInputSearch", []).directive("modFormSearch", function () {
    return {
      templateUrl: "app/Components/FormSearch/formSearch.template.html",
      restrict: "E",
      transclude: true,
      scope: {
        type: "=",
        placeholder: "=",
        formsearch: "=",
        value: "=",
      },
    };
  });
})();
