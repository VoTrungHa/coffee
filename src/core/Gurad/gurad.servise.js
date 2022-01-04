(function () {
  "use strict";

  angular
    .module("core.gurad")
    .factory("AuthenticationService", AuthenticationService);

  AuthenticationService.$inject = ["$rootScope", "publicService"];

  function AuthenticationService($rootScope, publicService) {
    var service = {};
    service.Login = function (data, callback) {
      var account = JSON.parse(localStorage.getItem("Accounts")) || [];
      var response = { message: "", status: undefined, id: "" };

      var result = account.filter(
        (item, index) =>
          item.email === data.email && item.password === data.password
      );
      if (result.length > 0) {
        response.message = "Đăng nhập thành công !";
        response.status = true;
        response.id = result[0].id;
      } else {
        response.message = "Email hoặc mật khẩu không đúng !";
        response.status = false;
      }
      callback(response);
    };

    service.SetCredentials = function (id) {
      $rootScope.globals = {
        id: id,
        auth: publicService.Makeid(100),
      };
      localStorage.setItem("globals", JSON.stringify($rootScope.globals));
    };

    service.ClearCredentials = function () {
      $rootScope.globals = null;
      localStorage.removeItem("globals");
    };
    return service;
  }
})();
