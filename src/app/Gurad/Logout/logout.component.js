(function () {
  "use strict";

  angular.module("logout").component("logoutComponent", logoutComponent());

  function logoutComponent() {
    return {
      templateUrl: "app/Gurad/Logout/logout.template.html",
      controller: "logoutController",
    };
  }
})();
