(function () {
  "use strict";

  angular
    .module("account", ["ui.bootstrap"])
    .controller("accountcontroller", accountcontroller)
    .controller("ModalController", ModalController)
    .controller("ModalUpdateController", ModalUpdateController);

  ModalController.$inject = ["$scope", "close"];
  function ModalController($scope, close) {
    $scope.title = "Xóa người dùng";
    $scope.content = "Bạn có chắc muốn xóa tài khoản này không ?";
    $scope.close = function (result) {
      close(result);
    };
  }

  ModalUpdateController.$inject = ["$scope", "close", "account", "title"];
  function ModalUpdateController($scope, close, account, title) {
    $scope.user = account;
    $scope.title = title;
    $scope.close = function (result) {
      close(result);
    };
  }

  accountcontroller.$inject = ["$scope", "Account", "ModalService", "toastr"];
  function accountcontroller($scope, Account, ModalService, toastr) {
    $scope.initData = [];
    $scope.orderBy = "name";
    $scope.propertyName = "name"; // attribute use for the search
    $scope.reverse = true;
    $scope.items = [
      { name: "Tất cả", value: "" },
      { name: "Quản trị", value: "ADMIN" },
      { name: "Nhân viên", value: "USER" },
    ];
    $scope.CONTENTS_LIST_WIDTH = [
      { name: "Name", width: "140px", key: "nickName" },
      { name: "Gender", width: "140px", key: "gender" },
      { name: "Role", width: "140px", key: "role" },
      { name: "Phone", width: "120px", key: "phone" },
      { name: "Email", width: "120px", key: "email" },
      { name: "Action", width: "160px" },
    ];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.title = "Update Account";

    function getContent(page) {
      Account.getListAccount();
      $scope.initData = JSON.parse(localStorage.getItem("Accounts"));
      $scope.totalItems = $scope.initData.length;
      var begin = (page - 1) * $scope.numPerPage,
        end = begin + $scope.numPerPage;
      $scope.initData = $scope.initData.slice(begin, end);
    }
    getContent($scope.currentPage); // get list account .

    $scope.pageChanged = function (page) {
      getContent(page);
    };

    $scope.sortBy = function (propertyName) {
      $scope.reverse =
        $scope.propertyName === propertyName ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    $scope.handlDeleteAccountById = function (id) {
      ModalService.showModal({
        templateUrl: "app/Components/Notifycation/notifycation.template.html",
        controller: "ModalController",
      }).then(function (modal) {
        modal.close.then(function (result) {
          if (result === "Yes") {
            Account.deleteAccountById(id);
            getContent($scope.currentPage);
            toastr.success("Thành công !", "Xóa người dùng", {
              closeButton: true,
            });
          }
        });
      });
    };
    // setting function open modal
    function openModal(data, title) {
      return ModalService.showModal({
        templateUrl: "app/Account/modalAccount.template.html",
        controller: "ModalUpdateController",
        inputs: {
          account: data,
          title: title,
        },
      });
    }

    $scope.handlUpdateAccount = function (id) {
      $scope.title = "Updated account";
      var result = Account.getAccountById(id);
      var modal = openModal(result, $scope.title);
      modal.then(function (modal) {
        modal.close.then(function (result) {
          if (result !== "no") {
            var resp = Account.editAccount(result, id);
            if (resp) {
              toastr.success("Thành công !", "Cập nhật người dùng", {
                closeButton: true,
              });
              getContent($scope.currentPage);
            }
          }
        });
      });
    };

    $scope.handleCreated = function () {
      $scope.title = "Created account";
      var modal = openModal({}, $scope.title);
      modal.then(function (modal) {
        modal.close.then(function (result) {
          if (result !== "no") {
            var resp = Account.createdAccount(result);
            if (resp.status) {
              toastr.success("Thành công !", "Thêm người dùng", {
                closeButton: true,
              });
              getContent($scope.currentPage);
            } else {
              toastr.error("Thất bại, email đã tồn tại!", "Thêm người dùng", {
                closeButton: true,
              });
            }
          }
        });
      });
    };

    $scope.hanldRest = function () {
      $scope.initcondition = {};
      getContent($scope.currentPage);
    };
  }
})();
