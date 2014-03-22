$(document).ready(function() {
  var compiled = juicer(
    '{@each list as day,k}\
        <div class="cal-column-fluid">\
            {@each day.period as p}\
            <div class="cal-cell ${p.status}" data-time="${p.time}" data-status="${p.status}">\
                {@if p.status==="ordered" || p.status==="processing"}\
                <span><strong>预订人：</strong> ${p.owner}</span><br/>\
                <span><strong>电话：</strong> ${p.tel}</span>\
                {@else if p.status==="solo"}\
                <span><strong>截止时间：</strong> ${p.endtime}</span><br/>\
                <span><strong>已加入人数：</strong> ${p.count}</span>\
                {@else if p.status==="reserve"}\
                <span><strong>约战方：</strong> ${p.team}</span><br/>\
                <span><strong>联系人：</strong> ${p.contact}</span><br/>\
                <span><strong>电话：</strong> ${p.tel}</span>\
                {@/if}\
            </div>\
            {@/each}\
        </div>\
    {@/each}'),
    data = {
      list: [{
        period: [{
          time: '09:00 - 10:30',
          status: 'unavailable'
        }, {
          time: '10:30 - 12:00',
          status: 'unavailable'
        }, {
          time: '12:00 - 13:30',
          status: 'unavailable'
        }, {
          time: '13:30 - 15:00',
          status: 'unavailable'
        }, {
          time: '15:00 - 16:30',
          status: 'unavailable'
        }, {
          time: '16:30 - 18:00',
          status: 'unavailable'
        }, {
          time: '18:00 - 19:30',
          status: 'unavailable'
        }, {
          time: '19:30 - 21:00',
          status: 'unavailable'
        }]
      }, {
        period: [{
          time: '09:00 - 10:30',
          status: 'unavailable'
        }, {
          time: '10:30 - 12:00',
          status: 'unavailable'
        }, {
          time: '12:00 - 13:30',
          status: 'unavailable'
        }, {
          time: '13:30 - 15:00',
          status: 'unavailable'
        }, {
          time: '15:00 - 16:30',
          status: 'unavailable'
        }, {
          time: '16:30 - 18:00',
          status: 'unavailable'
        }, {
          time: '18:00 - 19:30',
          status: 'unavailable'
        }, {
          time: '19:30 - 21:00',
          status: 'unavailable'
        }]
      }, {
        period: [{
          time: '09:00 - 10:30',
          status: 'available'
        }, {
          time: '10:30 - 12:00',
          status: 'available'
        }, {
          time: '12:00 - 13:30',
          status: 'available'
        }, {
          time: '13:30 - 15:00',
          status: 'ordered',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '15:00 - 16:30',
          status: 'ordered',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '16:30 - 18:00',
          status: 'ordered',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '18:00 - 19:30',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '19:30 - 21:00',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }]
      }, {
        period: [{
          time: '09:00 - 10:30',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '10:30 - 12:00',
          status: 'solo',
          endtime: '2014/04/10 03:30',
          count: 6
        }, {
          time: '12:00 - 13:30',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '13:30 - 15:00',
          status: 'processing',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '15:00 - 16:30',
          status: 'processing',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '16:30 - 18:00',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '18:00 - 19:30',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '19:30 - 21:00',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }]
      }, {
        period: [{
          time: '09:00 - 10:30',
          status: 'solo',
          endtime: '2014/04/10 03:30',
          count: 4
        }, {
          time: '10:30 - 12:00',
          status: 'available'
        }, {
          time: '12:00 - 13:30',
          status: 'available'
        }, {
          time: '13:30 - 15:00',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '15:00 - 16:30',
          status: 'processing',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '16:30 - 18:00',
          status: 'processing',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '18:00 - 19:30',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '19:30 - 21:00',
          status: 'reserve',
          team: '谢菲联',
          contact: '李先生',
          tel: '13800138000'
        }]
      }, {
        period: [{
          time: '09:00 - 10:30',
          status: 'available'
        }, {
          time: '10:30 - 12:00',
          status: 'available'
        }, {
          time: '12:00 - 13:30',
          status: 'reserve',
          team: '曼联',
          contact: '李先生',
          tel: '13800138000'
        }, {
          time: '13:30 - 15:00',
          status: 'processing',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '15:00 - 16:30',
          status: 'available'
        }, {
          time: '16:30 - 18:00',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '18:00 - 19:30',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '19:30 - 21:00',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }]
      }, {
        period: [{
          time: '09:00 - 10:30',
          status: 'processing',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '10:30 - 12:00',
          status: 'available'
        }, {
          time: '12:00 - 13:30',
          status: 'processing',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '13:30 - 15:00',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '15:00 - 16:30',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '16:30 - 18:00',
          status: 'processing',
          owner: '张先生',
          tel: '13800138000'
        }, {
          time: '18:00 - 19:30',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }, {
          time: '19:30 - 21:00',
          status: 'ordered',
          owner: '李先生',
          tel: '13800138000'
        }]
      }]
    };

  // 渲染
  $('.cal-week-box').html(compiled.render(data));

  $('.available').on('show.bs.popover', function(e) {
    // do something…
    console.log(e);
  });

  $(document).on('click', '.cal-cell', function(e) {
    var $el = $(e.target),
      content = '',
      status, data, isShow;
    if (!$el.hasClass('cal-cell')) {
      $el = $el.parents('.cal-cell');
    }
    data = $el.data('bs.popover');
    if (data) {
      isShow = data.tip().hasClass('in');
    } else {
      status = $el.attr('data-status');
      switch (status) {
        case 'available':
          content = '<button class="btn btn-small book">发布预定</button><button class="btn btn-small groupon">发布单飞</button>';
          break;
        case 'ordered':
          content = '<button class="btn btn-small view">查看详情</button><button class="btn btn-small cancel">取消预定</button>';
          break;
        case 'processing':
          content = '<button class="btn btn-small confirm">确认预定</button>';
          break;
        case 'solo':
          break;
        default:
          return false;
      }
      $el.popover({
        html: true,
        animation: false,
        trigger: 'manual',
        placement: 'auto right',
        content: content
      });
    }
    $('.cal-cell').popover('hide');
    $el.popover(isShow ? 'hide' : 'show');
    return false;
  });

  $(document).on('click', '.book', function(e) {
    $('.cal-cell').popover('hide');
    $('#popup-book').modal('show');
  });

  $(document).on('click', '.groupon', function(e) {
    $('.cal-cell').popover('hide');
    $('#popup-groupon').modal('show');
  });

  $(document).on('click', '.confirm', function() {
    $('.cal-cell').popover('hide');
    $('#popup-confirm').modal('show');
  });

  $('#field-switcher a').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
  })
});