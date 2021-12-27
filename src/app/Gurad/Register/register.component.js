(function () {
  "use strict";

  angular
    .module("register")
    .component("registerComponent", registerComponent());

  function registerComponent() {
    return {
      templateUrl: "app/Gurad/Register/register.template.html",

      controller: "registerController",
    };
  }
})();
