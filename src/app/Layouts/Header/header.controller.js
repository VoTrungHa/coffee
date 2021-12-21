(function () {
  "use strict";

  angular.module("header").directive("modHeader", function () {
    return {
      templateUrl: "app/Layouts/Header/header.template.html",
      restrict: "E",
      scope: {
        index: "=",
        name: "=",
      },
      transclude: true,
      // controller: function ($scope) { chỉ xử dụng để xử lý logic
      //   $scope.title=
      // },
    };
  });
})();
