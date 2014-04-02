moment.lang('zh-cn');

angular.module('tiqiu')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth',
    function($rootScope, $scope, $location, $window, Auth) {
      $scope.login = function() {
        Auth.login({
          username: $scope.username,
          password: $scope.password
        })
          .then(function() {
            $location.path('/book');
          }, function(response) {
            $scope.error = response.message;
          });
      };
    }
  ])
  .controller('BookCtrl', ['$rootScope', '$scope', '$location', '$window', 'Book',
    function($rootScope, $scope, $location, $window, Book) {
      var statusMap = {
        '0': 'Available',
        '1': 'Booking',
        '2': 'Booked',
        '3': 'CustomerConfirmed',
        '10': 'CheckIn',
        '20': 'Ending',
        '50': 'Expired',
        '60': 'Canceled',
        '-1': 'Void'
      }, current = new Date(),
        day = current.getDay(),
        date = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        start, end, fieldId;
      start = moment(current).subtract('days', day).format('YYYY-MM-DD');
      end = moment(current).add('days', 6 - day).format('YYYY-MM-DD');

      // 场地改变
      $scope.changeField = function(field) {
        $scope.fields.forEach(function(f) {
          if (f.id == field.id) {
            f.active = true;
          } else {
            f.active = false;
          }
        });

        Book.getFieldItemList()
          .then(function(data) {
            $scope.tabs = data.map(function(t) {
              return {
                id: t.ID,
                title: t.Name
              };
            });
          }, function() {
            console.error('error');
          });
      };

      Book.getFieldList()
        .then(function(data) {
          $scope.fields = data.map(function(f, i) {
            return {
              id: f.ID,
              name: f.Name,
              active: i === 0
            }
          });
          $scope.changeField($scope.fields[0]);
        });

      $scope.switchFieldItem = function(id) {
        fieldId = id;
        Book.getFieldItemScheduledList(id, start, end)
          .then(function(data) {
            data.forEach(function(d) {
              d.Status = statusMap[d.Status + ''];
            });

            var map = _.groupBy(data, function(d) {
              return d.ScheduledDate;
            }),
              days = [];

            var i = 0;
            for (var key in map) {
              days.push({
                weekday: date[i++],
                day: moment(key).format('MMMDo'),
                period: map[key]
              });
            }

            $scope.days = days;
          })
      };

      $scope.query = function(dir) {
        if (dir === 'prev') {
          start = moment(Date.parse(start)).subtract('days', 7).format('YYYY-MM-DD');
          end = moment(Date.parse(end)).subtract('days', 7).format('YYYY-MM-DD');
        } else {
          start = moment(Date.parse(start)).add('days', 7).format('YYYY-MM-DD');
          end = moment(Date.parse(end)).add('days', 7).format('YYYY-MM-DD');
        }

        Book.getFieldItemScheduledList(fieldId, start, end)
          .then(function(data) {
            data.forEach(function(d) {
              d.Status = statusMap[d.Status + ''];
            });

            var map = _.groupBy(data, function(d) {
              return d.ScheduledDate;
            }),
              days = [];

            var i = 0;
            for (var key in map) {
              days.push({
                weekday: date[i++],
                day: moment(key).format('MMMDo'),
                period: map[key]
              });
            }

            $scope.days = days;
          })
      };
    }
  ]);