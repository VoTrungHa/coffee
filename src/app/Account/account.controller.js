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

  accountcontroller.$inject = [
    "$scope",
    "Account",
    "publicService",
    "ModalService",
    "toastr",
  ];
  function accountcontroller(
    $scope,
    Account,
    publicService,
    ModalService,
    toastr
  ) {
    $scope.initData = [];
    $scope.orderBy = "email";
    $scope.propertyName = "email"; // attribute use for the search
    $scope.reverse = true;
    $scope.items = [
      { name: "Tất cả", value: "" },
      { name: "Quản trị", value: "ADMIN" },
      { name: "Nhân viên", value: "USER" },
    ];
    $scope.query = "";
    $scope.CONTENTS_LIST_WIDTH = [
      { name: "Name", width: "140px", key: "nickName" },
      { name: "Gender", width: "140px", key: "gender" },
      { name: "Role", width: "140px", key: "role" },
      { name: "Phone", width: "120px", key: "phone" },
      { name: "Email", width: "120px", key: "email" },
    ];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;
    $scope.title = "Update Account";

    function getContent(page) {
      $scope.initData = JSON.parse(localStorage.getItem("Accounts"));
      $scope.totalItems = $scope.initData.length;
      $scope.initData = $scope.initData.slice(
        publicService.CalutePaging(page, $scope.numPerPage).begin,
        publicService.CalutePaging(page, $scope.numPerPage).end
      );
    }
    getContent($scope.currentPage); // get list account .

    $scope.pageChanged = function (page) {
      getContent(page);
    };

    $scope.handlDeleteAccountById = function (id) {
      console.log(id);
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

    $scope.search = function (value) {
      var data = JSON.parse(localStorage.getItem("Accounts"));
      const result = data.filter((item, index) => {
        return (
          item.email.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.nickName.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.gender.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.phone.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
          item.role.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      });
      $scope.initData = result.slice(
        publicService.CalutePaging($scope.currentPage, $scope.numPerPage).begin,
        publicService.CalutePaging($scope.currentPage, $scope.numPerPage).end
      );
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
      $scope.query = "";
      getContent($scope.currentPage);
    };
  }
})();
