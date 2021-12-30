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
        icon: "carbon:user-avatar-filled-alt",
        src: "#!/accounts",
      },
      {
        icon: "ls:coffee",
        src: "#!/coffees",
      },

      // {
      //   icon: "ant-design:book-filled",
      //   src: "",
      // },
      // {
      //   icon: "fontisto:shopping-sale",
      //   src: "",
      // },
    ])
    .controller("sliderController", sliderController);
  sliderController.$inject = ["$scope", "menu"];
  function sliderController($scope, menu) {
    $scope.menu = menu;
  }
})();
