moment.lang('zh-cn');

angular.module('tiqiu')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$window', 'Auth',
    function($rootScope, $scope, $location, $window, Auth) {
      $scope.captchaUrl = 'http://api.tiqiu365.com/ValidateCodeHandler.ashx?t' + (+new Date());
      $scope.showCaptcha = false;

      $scope.refreshCode = function() {
        $scope.captchaUrl = 'http://api.tiqiu365.com/ValidateCodeHandler.ashx?t' + (+new Date());
      };

      $scope.login = function() {
        Auth.login({
          username: $scope.username,
          password: $scope.password,
          code: $scope.code
        })
          .then(function() {
            $location.path('/book');
          }, function(response) {
            $scope.error = response.HelpMessage;
            if (response.HelpMessage == '你已输入错误3次用户名密码，请仔细核对并填写验证码！') {
              $scope.showCaptcha = true;
              $scope.refreshCode();
            }
          });
      };
    }
  ])
  .controller('BookCtrl', ['$rootScope', '$scope', '$location', '$window', 'Book', '$modal',
    function($rootScope, $scope, $location, $window, Book, $modal) {

      function BookModalCtrl($scope, $modalInstance, data) {
        data.scheduledDate = moment(data.schduleItem.ScheduledDate).format('YYYY年MMMDo dddd')
        $scope.data = data;
        $scope.ok = function() {
          Book.orderFreeTeam({
            minPlayerCount: this.minPlayerCount,
            priceUnit: this.priceUnit,
            price: this.price,
            scheduledId: data.schduleItem.ScheduledID
          })
            .then(function() {
              $modalInstance.close()
            });
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }

      $scope.openDialog = function(schduleItem) {

        var modalInstance = $modal.open({
          templateUrl: 'partial/book-dialog.html',
          controller: BookModalCtrl,
          resolve: {
            data: function() {
              return {
                schduleItem: schduleItem,
                fieldItem: fieldItem,
                field: field
              };
            }
          }
        });

        modalInstance.result.then(function(data) {
          getScheduleList();
        }, function() {});
      };

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
        start, end, field, fieldItem;
      start = moment(current).subtract('days', day).format('YYYY-MM-DD');
      end = moment(current).add('days', 6 - day).format('YYYY-MM-DD');

      // 场地改变
      $scope.changeField = function(fi) {
        field = fi;
        $scope.fields.forEach(function(f) {
          if (f.id == fi.id) {
            f.active = true;
          } else {
            f.active = false;
          }
        });

        $scope.tabs = fi.item.map(function(t) {
          return {
            id: t.ID,
            title: t.Name,
            fieldId: t.FieldID
          };
        });
      };

      Book.getFieldList()
        .then(function(data) {
          $scope.fields = data.map(function(f, i) {
            return {
              id: f.ID,
              name: f.Name,
              active: i === 0,
              item: f.Items
            }
          });
          $scope.changeField($scope.fields[0]);
        });

      $scope.switchFieldItem = function(item) {
        fieldItem = item;
        getScheduleList();
      };

      $scope.query = function(dir) {
        if (dir === 'prev') {
          start = moment(Date.parse(start)).subtract('days', 7).format('YYYY-MM-DD');
          end = moment(Date.parse(end)).subtract('days', 7).format('YYYY-MM-DD');
        } else {
          start = moment(Date.parse(start)).add('days', 7).format('YYYY-MM-DD');
          end = moment(Date.parse(end)).add('days', 7).format('YYYY-MM-DD');
        }

        getScheduleList();
      };

      function getScheduleList() {
        var dateList = [],
          i;
        for (i = 0; i < 7; i++) {
          dateList.push(moment(Date.parse(start)).add('days', i).format('YYYY-MM-DD'));
        }

        Book.getFieldItemScheduledList(fieldItem, start, end)
          .then(function(data) {
            data.forEach(function(d) {
              d.Status = statusMap[d.Status + ''];
            });

            var map = _.groupBy(data, function(d) {
              return d.ScheduledDate.slice(0, 10);
            }),
              days = [];

            i = 0;
            for (i = 0; i < 7; i++) {
              days.push({
                weekday: date[i],
                day: moment(dateList[i]).format('MMMDo'),
                period: map[dateList[i]] || [{
                  "Status": 'Void',
                  "StartTime": "09:00:00",
                  "EndTime": "10:30:00"
                }, {
                  "Status": 'Void',
                  "StartTime": "10:30:00",
                  "EndTime": "12:00:00"
                }, {
                  "Status": 'Void',
                  "StartTime": "12:00:00",
                  "EndTime": "13:30:00"
                }, {
                  "Status": 'Void',
                  "StartTime": "13:30:00",
                  "EndTime": "15:00:00"
                }, {
                  "Status": 'Void',
                  "StartTime": "15:00:00",
                  "EndTime": "16:30:00"
                }, {
                  "Status": 'Void',
                  "StartTime": "16:30:00",
                  "EndTime": "18:00:00"
                }, {
                  "Status": 'Void',
                  "StartTime": "18:00:00",
                  "EndTime": "19:30:00"
                }, {
                  "Status": 'Void',
                  "StartTime": "19:30:00",
                  "EndTime": "21:00:00"
                }, {
                  "Status": 'Void',
                  "StartTime": "21:00:00",
                  "EndTime": "22:30:00"
                }]
              });
            }

            $scope.days = days;
          });
      }
    }
  ]);