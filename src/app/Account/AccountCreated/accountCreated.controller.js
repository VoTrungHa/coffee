(function () {
  "use strict";

  angular
    .module("account.created")
    .controller("accountCreatedController", accountCreatedController);

  accountCreatedController.$inject = [
    "$scope",
    "toastr",
    "ModalService",
    "publicService",
  ];

  function accountCreatedController(
    $scope,
    toastr,
    ModalService,
    publicService
  ) {
    $scope.account = {
      email: "",
      password: "",
    };

    $scope.handleCreated = function (form) {
      var data = JSON.parse(localStorage.getItem("Accounts"));
      var newAccount = {
        id: publicService.Makeid(8),
        email: $scope.account.email,
        avatar: "http://localhost:3000/public/images/user-avatar.png",
        nickName: "",
        createdAt: new Date().toLocaleDateString(),
        status: true,
        role: "USER",
        password: $scope.account.password,
      };

      if (form.$valid) {
        data.push(newAccount);
        localStorage.setItem("Accounts", JSON.stringify(data));
        toastr.success("Thành công !", "Thêm người dùng", {
          closeButton: true,
        });
      }
    };
  }
})();
