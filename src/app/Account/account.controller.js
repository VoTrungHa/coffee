(function () {
  "use strict";

  angular
    .module("account", ["ui.bootstrap"])
    .controller("accountcontroller", accountcontroller);

  accountcontroller.$inject = ["$scope", "Account"];
  function accountcontroller($scope, Account) {
    $scope.isSetOpenSearch = true;
    $scope.initData = [];
    $scope.items = [
      { name: "Tất cả", value: "" },
      { name: "Quản trị", value: "ADMIN" },
      { name: "Nhân viên", value: "USER" },
    ];
    $scope.CONTENTS_LIST_WIDTH = [
      { name: "ID", width: "140px" },
      { name: "Địa chỉ email", width: "120px" },
      { name: "Tên tài khoản", width: "120px" },
      { name: "Chức vụ", width: "120px" },
      { name: "Hình ảnh", width: "120px" },
      { name: "Ngày đăng ký", width: "140px" },
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
      email: "",
      id: "",
      nickName: "",
    };

    async function getContent(page) {
      await Account.getListAccount();
      $scope.initData = await JSON.parse(localStorage.getItem("Accounts"));
      $scope.totalItems = $scope.initData.length;
      var begin = (page - 1) * $scope.numPerPage,
        end = begin + $scope.numPerPage;
      $scope.initData = $scope.initData.slice(begin, end);
    }
    getContent($scope.currentPage);

    $scope.search = function () {
      var Datas = JSON.parse(localStorage.getItem("Accounts"));
      var result = [];
      var filter = [];
      if ($scope.initcondition.id) {
        filter.push({ id: $scope.initcondition.id });
      }
      if ($scope.initcondition.email) {
        filter.push({ email: $scope.initcondition.email });
      }
      if ($scope.initcondition.nickName) {
        filter.push({ nickName: $scope.initcondition.nickName });
      }
      for (var i = 0; i < filter.length; i++) {
        result = Datas.filter(
          (item, index) =>
            item[Object.keys(filter[i])[0]]
              .toLowerCase()
              .includes(Object.values(filter[i])[0].toLowerCase()) === true
        );
      }
      $scope.initData = result.slice(0, $scope.numPerPage);
    };

    $scope.pageChanged = function () {
      getContent($scope.currentPage);
    };
    $scope.rest = function () {
      console.log("Fwfew");
      $scope.initcondition = {
        name: "",
        id: "",
        nickName: "",
      };
    };

    $scope.handleFilterSearch = function () {};
  }
})();
