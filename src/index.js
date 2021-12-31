(function () {
  "use strict";

  angular
    .module("index", [
      "ngRoute",
      "ngCookies",
      "core",
      "account",
      "layout",
      "avatar",
      "card",
      "ui.bootstrap",
      "formControl",
      "formInputSearch",
      "angularModalService",
      "ngSanitize",
      "ngAnimate",
      "toastr",
      "login",
      "register",
      "coffee",
      "tableheader",
      "tablebody",
      "pagination",
      "modal",
    ])
    .controller("indexcontroller", indexcontroller);
  indexcontroller.$inject = ["$scope", "Account", "ModalService", "toastr"];
  function indexcontroller($scope, Account) {
    Account.getListAccount();
  }
})();
