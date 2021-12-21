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
        name: "STORE MANAGEMENT",
        icon: "bx:bxs-door-open",
      },
      {
        name: "ACCOUNT MANAGEMENT",
        icon: "carbon:user-avatar-filled-alt",
      },
      {
        name: "MENU MANAGEMENT",
        icon: "ant-design:book-filled",
      },
      {
        name: "PROMOTION MANAGEMENT",
        icon: "fontisto:shopping-sale",
      },
    ])
    .controller("sliderController", sliderController);
  sliderController.$inject = ["$scope", "menu"];
  function sliderController($scope, menu) {
    $scope.menu = menu;
  }
})();
