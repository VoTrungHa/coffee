(function () {
  "use strict";

  angular.module("coffee", []).controller("coffeeController", coffeeController);

  coffeeController.$inject = ["$scope", "Coffee"];

  function coffeeController($scope, Coffee) {
    $scope.isSetOpenSearch = true;

    $scope.types = [
      { name: "Tất cả", value: "" },
      { name: "Cà phê", value: "Cà phê" },
      { name: "Trái cây", value: "Trái cây" },
      { name: "Giải khát", value: "Giải khát" },
    ];
    $scope.CONTENTS_LIST_WIDTH = [
      { name: "ID", width: "140px" },
      { name: "Tên sản phẩm", width: "140px" },
      { name: "Hình ảnh", width: "120px" },
      { name: "Thể loại", width: "120px", key: "category" },
      { name: "Giá thành", width: "140px", key: "price" },
      { name: "Số lượng", width: "120px", key: "count" },
      { name: "Chi tiết", width: "120px" },
      { name: "Xóa", width: "100px" },
    ];
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    $scope.initcondition = {
      category: "",
      id: "",
      name: "",
      priceF: null,
      priceT: null,
    };
    $scope.setIsOpenSearch = function (name) {
      $scope.isSetOpenSearch = name;
    };

    function getContent(page) {
      Coffee.getListCoffee();
      $scope.initData = JSON.parse(localStorage.getItem("Coffees"));
      $scope.totalItems = $scope.initData.length;
      var begin = (page - 1) * $scope.numPerPage,
        end = begin + $scope.numPerPage;
      $scope.initData = $scope.initData.slice(begin, end);
    }
    getContent($scope.currentPage); // get list coffee .
    $scope.pageChanged = function () {
      getContent($scope.currentPage);
    };

    $scope.hanldRest = function () {
      $scope.initcondition = {
        category: "",
        id: "",
        name: "",
        priceF: null,
        priceT: null,
      };
      getContent($scope.currentPage);
    };

    $scope.hanldSearch = function () {
      var conditions = [];
      if ($scope.initcondition.category) {
        conditions.push({
          name: "category",
          value: $scope.initcondition.category,
        });
      }
      if ($scope.initcondition.id) {
        conditions.push({
          name: "id",
          value: $scope.initcondition.id,
        });
      }
      if ($scope.initcondition.name) {
        conditions.push({
          name: "name",
          value: $scope.initcondition.name,
        });
      }

      if ($scope.initcondition.priceF && $scope.initcondition.priceT) {
        conditions.push({
          name: "price",
          priceF: $scope.initcondition.priceF,
          priceT: $scope.initcondition.priceT,
        });
      }

      if (conditions.length > 0) {
        conditions.map((item, index) => {
          var result = $scope.initData.filter((coffee, index) => {
            if (item.name === "price") {
              return (
                +coffee[item.name] >= +item.priceF &&
                +coffee[item.name] <= +item.priceT
              );
            } else {
              return (
                coffee[item.name]
                  .toLowerCase()
                  .indexOf(item.value.toLowerCase()) != -1
              );
            }
          });
          $scope.initData = result;
        });
      } else {
        getContent($scope.currentPage);
      }
    };
  }
})();
