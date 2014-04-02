angular.module('tiqiu')
  .factory('Auth', function($http, $q) {
    var currentUser;

    return {
      login: function(user) {
        var deferred = $q.defer();
        $http({
          url: 'http://api.tiqiu365.com/Accounthandler.ashx',
          method: "GET",
          params: {
            action: 'LoginB',
            name: user.username,
            pwd: user.password,
            code: user.code
          }
        })
          .then(function(response) {
            if (response.data && response.data.Result == 1) {
              currentUser = response.data.Data;
              deferred.resolve(response.data.Data);
            } else {
              deferred.reject(response.data)
            }
          }, function(response) {
            deferred.reject({
              HelpMessage: '系统不可用'
            });
          });
        return deferred.promise;
      },
      isLoggedIn: function() {
        return !!currentUser;
      },
      getCurrentUser: function() {
        return currentUser;
      }
    };
  })
  .factory('Book', function($http, Auth, $q) {

    return {
      getFieldList: function() {
        var user = Auth.getCurrentUser() || {};
        var deferred = $q.defer();
        $http({
          url: 'http://api.tiqiu365.com/FieldHandler.ashx',
          method: "GET",
          params: {
            action: 'GetFieldList',
            token: user.Token,
            pageindex: 0,
            pagesize: 1000
          }
        })
          .then(function(response) {
            if (response.data && response.data.Result == 1) {
              deferred.resolve(response.data.Data.ItemList);
            } else {
              deferred.reject(response.data)
            }
          }, function(response) {
            deferred.reject({
              Message: '系统不可用'
            });
          });
        return deferred.promise;
      },
      getFieldItemList: function(fieldId) {
        var user = Auth.getCurrentUser() || {};
        var deferred = $q.defer();
        $http({
          url: 'http://api.tiqiu365.com/FieldHandler.ashx',
          method: "GET",
          params: {
            action: 'GetFieldItemList',
            token: user.Token,
            AccountBID: user.ID,
            id: fieldId
          }
        })
          .then(function(response) {
            if (response.data && response.data.Result == 1) {
              deferred.resolve(response.data.Data);
            } else {
              deferred.reject(response.data)
            }
          }, function(response) {
            deferred.reject({
              Message: '系统不可用'
            });
          });
        return deferred.promise;
      },
      getFieldItemScheduledList: function(fieldId, start, end) {
        var user = Auth.getCurrentUser() || {};
        var deferred = $q.defer();
        $http({
          url: 'http://api.tiqiu365.com/FieldHandler.ashx',
          method: "GET",
          params: {
            action: 'GetFieldItemScheduledList',
            token: user.Token,
            AccountBID: user.ID,
            id: fieldId,
            start: start,
            end: end
          }
        })
          .then(function(response) {
            if (response.data && response.data.Result == 1) {
              deferred.resolve(response.data.Data);
            } else {
              deferred.reject(response.data)
            }
          }, function(response) {
            deferred.reject({
              Message: '系统不可用'
            });
          });
        return deferred.promise;
      }
    };
  });