(function () {
  "use strict";

  angular
    .module("account.edit")
    .component("accountEditComponent", accountEditComponent());

  function accountEditComponent() {
    return {
      templateUrl: "app/Account/AccountEdit/accountEdit.template.html",
      controller: "accountEditController",
    };
  }
})();
