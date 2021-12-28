(function () {
  "use strict";

  angular
    .module("slider")
    .directive("modSlider", function () {
      return {
        templateUrl: "app/Layouts/Slider/slider.template.html",
        restrict: "E",
      };
    })
    .constant("menu", [
      {
        name: "PRODUCT MANAGEMENT",
        icon: "ls:coffee",
        src: "#!/coffees",
      },
      {
        name: "ACCOUNT MANAGEMENT",
        icon: "carbon:user-avatar-filled-alt",
        src: "#!/accounts",
      },
      {
        name: "MENU MANAGEMENT",
        icon: "ant-design:book-filled",
        src: "",
      },
      {
        name: "PROMOTION MANAGEMENT",
        icon: "fontisto:shopping-sale",
        src: "",
      },
    ])
    .controller("sliderController", sliderController);
  sliderController.$inject = ["$scope", "menu"];
  function sliderController($scope, menu) {
    $scope.menu = menu;
  }
})();
