(function () {
  "use strict";

  angular.module("core.account").factory("Account", function ($http) {
    return {
      getListAccount: function () {
        return $http({
          method: "GET",
          url: "http://localhost:3000/db/accounts.json",
        }).then(function (response) {
          localStorage.setItem("Accounts", JSON.stringify(response.data));
        });
      },
    };
  });
})();
