(function () {
  "use strict";

  angular.module("login").component("loginComponent", loginComponent());

  function loginComponent() {
    return {
      templateUrl: "app/Gurad/Login/login.template.html",
      controller: "loginController",
    };
  }
})();
