'use strict';

angular.module('cdreamApp')
  .service('userService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var user = {email : ''};
    return{
        getUser : function() {return user},
        setUser : function(json) {user = json}
    }
  });
