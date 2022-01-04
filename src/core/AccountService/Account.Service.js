(function () {
  "use strict";

  angular
    .module("core.account")
    .factory("Account", function ($http, publicService) {
      return {
        getListAccount: function () {
          if (!localStorage.getItem("Accounts")) {
            return $http({
              method: "GET",
              url: "http://localhost:3000/db/accounts.json",
            }).then(function (response) {
              localStorage.setItem("Accounts", JSON.stringify(response.data));
            });
          }
        },

        createdAccount: async function (account) {
          await this.getListAccount();
          var data = JSON.parse(localStorage.getItem("Accounts")) || [];
          var result = data.filter(
            (item, index) => item.email === account.email
          );
          if (result.length <= 0) {
            var newAcc = {
              id: publicService.Makeid(8),
              email: account.email,
              password: account.password,
              avatar: "http://localhost:3000/public/images/user-avatar.png",
              role: "USER",
              phone: account.phone || "",
              nickName: account.nickName || "",
              gender: account.gender || "",
            };
            data.push(newAcc);
            localStorage.setItem("Accounts", JSON.stringify(data));
            return { status: true, message: "Tạo tài khoản thành công" };
          } else {
            return { status: false, message: "Email đã tồn tại!" };
          }
        },

        editAccount: function (account, id) {
          var data = JSON.parse(localStorage.getItem("Accounts"));
          data.map((item, index) => {
            if (item.id === id) {
              item.email = account.email;
              item.nickName = account.nickName;
              item.role = account.role;
              item.gender = account.gender;
              item.phone = account.phone;
            }
          });
          localStorage.setItem("Accounts", JSON.stringify(data));
          return true;
        },

        deleteAccountById: function (id) {
          var data = JSON.parse(localStorage.getItem("Accounts"));
          var result = data.filter((item, index) => item.id !== id);
          localStorage.setItem("Accounts", JSON.stringify(result));
        },

        getAccountById: function (id) {
          var data = JSON.parse(localStorage.getItem("Accounts"));
          var result = data.filter((item, index) => item.id === id);
          return result[0];
        },
      };
    });
})();
