(function () {
  "use strict";

  angular.module("account").component("accountComponent", accountComponent());

  function accountComponent() {
    return {
      templateUrl: "app/Account/account.template.html",
      controller: "accountcontroller",
    };
  }
})();
