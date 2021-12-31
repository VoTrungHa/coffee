(function () {
  "use strict";

  angular
    .module("coffee", [])
    .controller("coffeeController", coffeeController)
    .controller("ModalCoffeeController", ModalCoffeeController)
    .controller("ModalController", ModalController);

  ModalController.$inject = ["$scope", "close"];
  function ModalController($scope, close) {
    $scope.title = "Xóa sản phẩm";
    $scope.content = "Bạn có chắc muốn xóa sản phẩm này không ?";
    $scope.close = function (result) {
      close(result);
    };
  }

  ModalCoffeeController.$inject = ["$scope", "close", "coffee", "title"];
  function ModalCoffeeController($scope, close, coffee, title) {
    $scope.data = {
      name: "",
      attributes: [{ size: "", price: "" }],
      image: "",
      category: "",
      descript: "",
    };
    if (coffee) {
      $scope.data = coffee;
    }
    $scope.title = title;
    $scope.size = ["M", "L", "XL"];
    $scope.category = ["Cà phê", "Giải khát", "Nước suối", "Sinh tố"];
    $scope.attribute = [{ size: "", price: "" }];
    $scope.addAttribute = function () {
      $scope.data.attributes.push({ size: "", price: "" });
    };
    $scope.deleteAtribute = function (index) {
      $scope.data.attributes.splice(index, 1);
    };
    $scope.close = function (params) {
      if (params === "no") {
        close(false);
      } else {
        close($scope.data);
      }
    };
  }
  coffeeController.$inject = ["$scope", "Coffee", "ModalService", "toastr"];
  function coffeeController($scope, Coffee, ModalService, toastr) {
    $scope.CONTENTS_LIST_WIDTH = [
      { name: "Name", width: "140px", key: "name" },
      { name: "Image", width: "140px" },
      { name: "Category", width: "120px" },
      { name: "Size", width: "120px" },
      { name: "Action", width: "160px" },
    ];

    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    $scope.initcondition = {
      name: "",
    };

    function getContent(page) {
      Coffee.getListCoffee();
      $scope.initData = JSON.parse(localStorage.getItem("Coffees"));
      $scope.totalItems = $scope.initData.length;
      var begin = (page - 1) * $scope.numPerPage,
        end = begin + $scope.numPerPage;
      $scope.initData.map((item, index) => {
        var size = "";
        item.attributes.map((att, index) => {
          size += att.size + " ";
        });
        item.size = size;
      });
      $scope.initData = $scope.initData.slice(begin, end);
    }
    getContent($scope.currentPage);
    $scope.pageChanged = function (page) {
      getContent(page);
    };

    $scope.hanldRest = function () {
      $scope.initcondition = {};
      getContent($scope.currentPage);
    };

    $scope.sortBy = function (propertyName) {
      $scope.reverse =
        $scope.propertyName === propertyName ? !$scope.reverse : false;
      $scope.propertyName = propertyName;
    };

    function openModal(data, title) {
      return ModalService.showModal({
        templateUrl: "app/Coffee/modalCoffee.template.html",
        controller: "ModalCoffeeController",
        inputs: {
          coffee: data,
          title: title,
        },
      });
    }
    $scope.handlUpdateProduct = function (id) {
      $scope.title = "Updated product";
      var result = Coffee.getProductById(id);
      var modal = openModal(result, $scope.title);
      modal.then(function (modal) {
        modal.close.then(function (result) {
          console.log(result);
          if (result) {
            var resp = Coffee.editCoffee(result, id);
            if (resp) {
              toastr.success("Thành công !", "Cập nhật sản phẩm ", {
                closeButton: true,
              });
              getContent($scope.currentPage);
            }
          }
        });
      });
    };

    $scope.handleCreated = function () {
      $scope.title = "Created coffee";
      var modal = openModal(null, $scope.title, $scope.SIZE);
      modal.then(function (modal) {
        modal.close.then(function (result) {
          if (result) {
            var resp = Coffee.createdCoffee(result);
            if (resp.status) {
              toastr.success("Thành công !", "Thêm người dùng", {
                closeButton: true,
              });
              getContent($scope.currentPage);
            } else {
              toastr.error(
                "Thất bại, sản phẩm đã tồn tại!",
                "Thêm người dùng",
                {
                  closeButton: true,
                }
              );
            }
          }
        });
      });
    };

    $scope.handlDeleteProductById = function (id) {
      ModalService.showModal({
        templateUrl: "app/Components/Notifycation/notifycation.template.html",
        controller: "ModalController",
      }).then(function (modal) {
        modal.close.then(function (result) {
          if (result === "Yes") {
            Coffee.deleteProductById(id);
            getContent($scope.currentPage);
            toastr.success("Thành công !", "Xóa sản phẩm", {
              closeButton: true,
            });
          }
        });
      });
    };
  }
})();
