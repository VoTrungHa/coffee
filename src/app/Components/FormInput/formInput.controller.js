(function () {
  "use strict";

  angular.module("forminput", []).directive("modFormInput", function () {
    return {
      templateUrl: "app/Components/FormInput/formInput.template.html",
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
