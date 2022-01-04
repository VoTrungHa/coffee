(function () {
  "use strict";

  angular
    .module("core.publicService", [])
    .factory("publicService", function () {
      return {
        Makeid: function (length) {
          // create UUID
          var result = "";
          var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < length; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          return result;
        },
        CalutePaging: function (page, numPerPage) {
          var begin = (page - 1) * numPerPage,
            end = begin + numPerPage;
          return { begin, end };
        },
      };
    });
})();
