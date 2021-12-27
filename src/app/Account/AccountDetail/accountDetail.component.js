(function () {
  "use strict";

  angular
    .module("account.detail")
    .component("accountDetailComponent", accountDetailComponent());

  function accountDetailComponent() {
    return {
      templateUrl: "app/Account/AccountDetail/accountDetail.template.html",
      controller: "accountDetailController",
    };
  }
})();
