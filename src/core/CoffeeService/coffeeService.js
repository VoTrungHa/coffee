(function () {
  "use strict";

  angular.module("core.coffee").factory("Coffee", coffeeService);

  coffeeService.$inject = ["$http", "publicService"];

  function coffeeService($http, publicService) {
    var service = {};
    service.getListCoffee = function () {
      return $http({
        method: "GET",
        url: "http://localhost:3000/db/coffee.json",
      }).then(function (response) {
        if (!localStorage.getItem("Coffees"))
          localStorage.setItem("Coffees", JSON.stringify(response.data));
      });
    };
    service.deleteProductById = function (id) {
      var data = JSON.parse(localStorage.getItem("Coffees")); // get data form localstorage
      var result = data.filter((item, index) => item.id !== id); // remove item have id from form
      localStorage.setItem("Coffees", JSON.stringify(result)); // save data to localstorage
    };
    service.createdCoffee = function (coffee) {
      var data = JSON.parse(localStorage.getItem("Coffees")) || []; // get data form localstorage
      var result = data.filter((item, index) => item.name === coffee.name); // check array have item  name same with name from form

      if (result.length <= 0) {
        var newCoffee = {
          id: publicService.Makeid(8),
          name: coffee.name,
          image: coffee.image,
          size: coffee.size,
          category: coffee.category,
          image: coffee.image,
          price: coffee.price,
          descript: coffee.descript,
          attributes: coffee.attributes,
        };
        data.push(newCoffee); // add to array, and then save
        localStorage.setItem("Coffees", JSON.stringify(data));
        return { status: true, message: "Thêm sản phẩm thành công !" };
      } else {
        return { status: false, message: "Tên sản phẩm đã tồn tại!" };
      }
    };

    service.editCoffee = function (coffee, id) {
      var data = JSON.parse(localStorage.getItem("Coffees"));
      data.map((item, index) => {
        if (item.id === id) {
          item.name = coffee.name;
          item.size = coffee.size;
          item.category = coffee.category;
          item.descript = coffee.descript;
          item.price = coffee.price;
          item.image = coffee.image;
          item.attributes = coffee.attributes;
        }
      });
      localStorage.setItem("Coffees", JSON.stringify(data));
      return true;
    };

    service.getProductById = function (id) {
      var data = JSON.parse(localStorage.getItem("Coffees"));
      var result = data.filter((item, index) => item.id === id);
      return result[0];
    };

    return service;
  }
})();
