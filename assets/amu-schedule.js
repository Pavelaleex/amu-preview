// Demo schedule shown until the YCLIENTS widget is connected: a weekly template rendered from today.
// Fills every <div data-demo-schedule data-days="N"> with the next N days that have classes.
(function () {
  var V = 'Валентина', A = 'Анна';
  var week = {
    1: [['09:00', 'Стретчинг', V, 60, 8], ['19:00', 'Пилатес мат', V, 60, 8], ['20:15', 'Йога', A, 60, 8]],
    2: [['10:00', 'Пилатес реформер', V, 55, 2], ['19:00', 'Здоровая спина', V, 60, 8], ['20:15', 'Медитация', A, 45, 8]],
    3: [['09:00', 'Йога', A, 60, 8], ['12:00', 'Пилатес реформер', V, 55, 2], ['19:00', 'Стретчинг', V, 60, 8], ['20:15', 'Пилатес мат', V, 60, 8]],
    4: [['10:00', 'Здоровая спина', V, 60, 8], ['19:00', 'Пилатес реформер', V, 55, 2], ['20:15', 'Йога', A, 60, 8]],
    5: [['09:00', 'Пилатес мат', V, 60, 8], ['19:00', 'Стретчинг', V, 60, 8], ['20:15', 'Медитация', A, 45, 8]],
    6: [['11:00', 'Йога', A, 60, 8], ['12:15', 'Пилатес реформер', V, 55, 2], ['13:30', 'Стретчинг', V, 60, 8]],
    0: [['11:00', 'Медитация', A, 45, 8], ['12:15', 'Здоровая спина', V, 60, 8]]
  };
  var BOOK = '/amu-preview/kontakty#zapis';

  function free(date, time, cap) {
    var s = date.getDate() * 31 + date.getMonth() * 7 + parseInt(time, 10) * 13 + parseInt(time.slice(3), 10);
    return 1 + (s % cap);
  }

  function row(c, date) {
    var meta = c[2] + ' · ' + c[3] + ' мин';
    var left = free(date, c[0], c[4]);
    return '<li class="grid grid-cols-[64px_1fr_auto] items-center gap-4 px-5 py-4 sm:grid-cols-[80px_1fr_1fr_auto]">' +
      '<span class="serif text-xl">' + c[0] + '</span>' +
      '<div><p class="font-medium">' + c[1] + '</p><p class="text-xs text-ink-soft sm:hidden">' + meta + '</p></div>' +
      '<p class="hidden text-sm text-ink-soft sm:block">' + meta + '</p>' +
      '<div class="flex items-center gap-3"><span class="hidden text-xs sm:inline ' + (left <= 1 ? 'text-reseda-deep' : 'text-ink-soft') + '">свободно ' + left + '</span>' +
      '<a href="' + BOOK + '" class="btn-secondary  !px-4 !py-2 !text-[11px]">Записаться</a></div></li>';
  }

  function render(el) {
    var want = Number(el.getAttribute('data-days')) || 7;
    var now = new Date();
    var nowHm = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2);
    var html = '';
    for (var i = 0, shown = 0; shown < want && i < 30; i++) {
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      var classes = (week[d.getDay()] || []).filter(function (c) { return i > 0 || c[0] > nowHm; });
      if (!classes.length) continue;
      var title = d.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
      html += '<section><h3 class="mb-3 text-2xl first-letter:uppercase">' + title + '</h3>' +
        '<ul class="divide-y divide-ink/10 rounded-2xl bg-pearl-light/60">' +
        classes.map(function (c) { return row(c, d); }).join('') + '</ul></section>';
      shown++;
    }
    el.innerHTML = '<div class="space-y-8">' + html + '</div>';
  }

  var els = document.querySelectorAll('[data-demo-schedule]');
  for (var k = 0; k < els.length; k++) render(els[k]);
})();
