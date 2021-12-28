"use strict";

angular
  .module("index")
  .config([
    "$routeProvider",
    function config($routeProvider) {
      $routeProvider

        .when("/login", {
          template: "<login-component></login-component>",
        })
        .when("/register", {
          template: "<register-component></register-component>",
        })

        .when("/accounts", {
          template: "<account-component></account-component>",
        })

        .when("/created-account", {
          template: "<account-created-component></account-created-component>",
        })

        .when("/account-detail/:id", {
          template: "<account-detail-component></account-detail-component>",
        })
        .when("/account-edit/:id", {
          template: "<account-edit-component></account-edit-component>",
        })
        .when("/logout", {
          template: "<logout-component></logout-component>",
        })
        .when("/coffees", {
          template: "<coffee-component></coffee-component>",
        })
        .otherwise("/coffees");
    },
  ])
  .run([
    "$rootScope",
    "$location",
    "$http",
    function ($rootScope, $location, $http) {
      $rootScope.globals = JSON.parse(localStorage.getItem("globals")) || null;

      $rootScope.$on("$locationChangeStart", function (event, next, current) {
        if ($location.path() !== "/login" && !$rootScope.globals) {
          if ($location.path() === "/register") {
            $location.path("/register");
          } else $location.path("/login");
        }
        if ($location.path() === "/logout" && $rootScope.globals) {
          $location.path("/logout");
        }
      });
    },
  ]);
