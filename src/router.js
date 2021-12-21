"use strict";

angular.module("coffee").config([
  "$routeProvider",
  function config($routeProvider) {
    $routeProvider

      .when("/", {
        template: "<account-component></account-component>",
      })

      .when("/created-account", {
        template: "<account-created></account-created>",
      })

      .otherwise("/phones");
  },
]);
