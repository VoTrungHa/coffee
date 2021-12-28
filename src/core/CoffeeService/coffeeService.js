(function () {
  "use strict";

  angular.module("core.coffee").factory("Coffee", coffeeService);

  coffeeService.$inject = ["$http"];

  function coffeeService($http) {
    var service = {};
    service.getListCoffee = function () {
      if (!localStorage.getItem("Coffees")) {
        return $http({
          method: "GET",
          url: "http://localhost:3000/db/coffee.json",
        }).then(function (response) {
          localStorage.setItem("Coffees", JSON.stringify(response.data));
        });
      }
    };
    return service;
  }
})();
