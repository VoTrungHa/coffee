(function () {
  "use strict";

  angular.module("coffee").component("coffeeComponent", coffeeComponent());

  function coffeeComponent() {
    return {
      templateUrl: "app/Coffee/coffee.template.html",
      controller: "coffeeController",
    };
  }
})();
