/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

function daysPass (page, waitTime, days) {
  var theWaitTime = waitTime || 3000
  setTimeout(function () {
    $('#triggerDaysPassing').addClass('active')
  }, theWaitTime)
  $('#triggerDaysPassing').on('click', function () {
    $('#daysPassing').addClass('active')
    $('#triggerDaysPassing').removeClass('active')
    for (var i = 0; i <= days; ++i) {
      setTimeout((function (x) {
        return function () {
          $('#days').html(x)
        }
      })(i), i * 1000)
    }
    setTimeout(function () { document.location.href = page }, (days * 1000))
  })
}

if ($('#daysPassing').length === 1) {
  var url = ($('#daysPassing').attr('data-dayspassurl'))
  var timeToPrompt = ($('#daysPassing').attr('data-dayspasstimetoprompt')) || 5000
  var days = ($('#daysPassing').attr('data-dayspassdays')) || 5
  daysPass(url, timeToPrompt, days)
}

if ($('#phone-mockup').length === 1) {
  $('#phone-mockup').on('click', function () {
    $('#phoneBackground').toggleClass('active');
    $(this).toggleClass('active');
  })
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})
