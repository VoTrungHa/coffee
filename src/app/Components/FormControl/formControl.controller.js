(function () {
  "use strict";

  angular.module("formControl", []).directive("modFormControl", function () {
    return {
      templateUrl: "app/Components/FormControl/formControl.template.html",
      restrict: "E",
      transclude: true,
      scope: {
        lable: "=",
        required: "=",
      },
    };
  });
})();
