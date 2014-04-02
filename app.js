var express = require('express'),
  app = express(),
  url = require('url')
  moment = require('moment'),
  mock = require('mockjs');

app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.get('/AccountHandler.ashx', function(req, res, next) {
  var query = url.parse(req.url, true).query || {},
    action = query.action,
    username = query.Name,
    password = query.pwd;

  // setTimeout(function() {
  if (action === 'Login') {
    if (username === 'admin' && password == '123') {
      res.json({
        isSuccess: true,
        user: {
          ID: 123,
          Name: username,
          Token: 'sdaksndkasdsad',
          BusinessesID: 123
        }
      });
    } else if (username === 'admin') {
      res.json({
        isSuccess: false,
        message: '密码不正确'
      });
    } else {
      res.json({
        isSuccess: false,
        message: '该账户不存在，请更换账户或联系管理员'
      });
    }
  }
  // }, 500);

});

app.get('/FieldHandler.ashx', function(req, res, next) {
  var query = url.parse(req.url, true).query || {},
    action = query.action;

  if (action === 'GetFieldList') {
    res.json({
      Result: 1,
      Message: '',
      Data: [{
        ID: 123,
        BusinessesID: 1,
        Name: '星空球场'
      }, {
        ID: 124,
        BusinessesID: 1,
        Name: '12码'
      }, {
        ID: 126,
        BusinessesID: 1,
        Name: '体育中心'
      }]
    });
  } else if (action === 'GetFieldItemList') {
    res.json({
      Result: 1,
      Message: '',
      Data: [{
        ID: 123,
        FieldID: 123,
        BusinessesID: 1,
        Level: 1,
        Type: 7,
        Brief: '',
        Status: 0,
        Name: '三圣乡星空球场'
      }, {
        ID: 124,
        FieldID: 124,
        BusinessesID: 1,
        Level: 1,
        Type: 7,
        Brief: '',
        Status: 0,
        Name: '锦城大道星空球场'
      }, {
        ID: 125,
        FieldID: 124,
        BusinessesID: 1,
        Level: 1,
        Type: 7,
        Brief: '',
        Status: 0,
        Name: '华阳滨河星空球场'
      }]
    });
  } else {
    var start = moment(Date.parse(query.start)),
      end = moment(Date.parse(query.end)); //'2014-03-23';

    var time = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30', '18:00', '19:30', '21:00'],
      data = mock.mock({
        Result: 1,
        Message: '',
        'Data|56': [{
          'ScheduledID|1-100': 1,
          'FieldID|1-100': 1,
          'FieldItemID|1-100': 1,
          'Status|1': [0, 1, 2, 3, 10, 20, 50, 60, -1],
          'StartTime|+1': 0,
          'EndTime|+1': 0,
          'ScheduledDate': start,
          'Price': 300,
          'ScheduledRemark': '',
          'OrderID|1-100': 1,
          'OrderType|1': [0, 1, 2],
          'MemberID': 123,
          'MemberName|1': ['李先生', '张先生', '孙先生', '刘先生'],
          'MemberBID': 234,
          'MemberBName|1': ['李先生', '张先生', '孙先生', '刘先生'],
          'PkPayType|1': [1, 2, 3],
          'SoloMinPlayer|8-12': 1,
          'OrderPrice': 20,
          'PriceUnit|1': [0, 1],
          'OrderRemark': '',
          'TeamID': 789,
          'TeamName|1': ['成都谢菲联', '曼联', '四川全兴'],
          'TeamColor|1': ['红色', '蓝色', '白色'],
          'TeamBID': 1000,
          'TeamBName|1': ['大连万达', '切尔西', 'AC米兰'],
          'TeamBColor|1': ['红色', '蓝色', '白色'],
          'SoloPalyerCount|3-8': 1
        }]
      });

    data.Data.forEach(function(schedule, index) {
      schedule.StartTime = time[schedule.StartTime % 8];
      schedule.EndTime = time[schedule.EndTime % 8 + 1];
      schedule.ScheduledDate = moment(schedule.ScheduledDate).add('days', Math.floor(index / 8)).format('YYYY-MM-DD');
    });

    res.json(data);
  }
});

app.listen(8080);