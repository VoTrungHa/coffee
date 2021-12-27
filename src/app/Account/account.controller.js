(function () {
  "use strict";

  angular
    .module("account", ["ui.bootstrap"])
    .controller("accountcontroller", accountcontroller)
    .controller("ModalController", ModalController);

  ModalController.$inject = ["$scope", "close"];
  function ModalController($scope, close) {
    $scope.title = "Xóa người dùng";
    $scope.content = "Bạn có chắc muốn xóa tài khoản này không ?";
    $scope.close = function (result) {
      close(result);
    };
  }

  accountcontroller.$inject = ["$scope", "Account", "ModalService", "toastr"];
  function accountcontroller($scope, Account, ModalService, toastr) {
    $scope.isSetOpenSearch = true;
    $scope.initData = [];
    $scope.orderBy = "email";
    $scope.propertyName = "createdAt";
    $scope.reverse = true;
    $scope.items = [
      { name: "Tất cả", value: "" },
      { name: "Quản trị", value: "ADMIN" },
      { name: "Nhân viên", value: "USER" },
    ];
    $scope.CONTENTS_LIST_WIDTH = [
      { name: "ID", width: "140px" },
      { name: "Địa chỉ email", width: "140px", key: "email" },
      { name: "Tên tài khoản", width: "140px", key: "nickName" },
      { name: "Chức vụ", width: "120px", key: "role" },
      { name: "Hình ảnh", width: "120px" },
      { name: "Ngày đăng ký", width: "140px", key: "createdAt" },
      { name: "Trạng thái", width: "120px" },
      { name: "Chi tiết", width: "120px" },
      { name: "Xóa", width: "100px" },
    ];
    $scope.setIsOpenSearch = function (name) {
      $scope.isSetOpenSearch = name;
    };
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    $scope.initcondition = {
      role: "",
      email: "",
      id: "",
      nickName: "",
    };

    function getContent(page) {
      Account.getListAccount();
      $scope.initData = JSON.parse(localStorage.getItem("Accounts"));
      $scope.totalItems = $scope.initData.length;
      var begin = (page - 1) * $scope.numPerPage,
        end = begin + $scope.numPerPage;
      console.log(begin + " " + end);
      $scope.initData = $scope.initData.slice(begin, end);
      console.log($scope.initData);
    }
    getContent($scope.currentPage); // get list account .

    $scope.pageChanged = function () {
      getContent($scope.currentPage);
    };

    $scope.sortBy = function (propertyName) {
      $scope.reverse =
        $scope.propertyName === propertyName ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    $scope.handlDeleteAccountById = function (id) {
      ModalService.showModal({
        templateUrl: "app/Components/Modal/modal.template.html",
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
  }
})();
