(function () {
  "use strict";

  angular
    .module("account.created")
    .component("accountCreatedComponent", accountDetailComponent());

  function accountDetailComponent() {
    return {
      templateUrl: "app/Account/AccountCreated/accountCreated.template.html",
      controller: "accountCreatedController",
    };
  }
})();
