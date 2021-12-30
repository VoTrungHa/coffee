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
      "cardHeader",
      "cardBody",
      "ui.bootstrap",
      "formControl",
      "formInputSearch",
      "angularModalService",
      "ngSanitize",
      "ngAnimate",
      "toastr",
      "cardFooter",
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
