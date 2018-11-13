/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

function waitAndRedirect (page, waitTime) {
  var theWaitTime = waitTime || 3000
  $('#triggerDaysPassing').addClass('active')
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
    setTimeout(function () { document.location.href = page }, theWaitTime)
    return false
  })
}

function daysPass (page, waitTime, days) {
  var theDays = days || 5
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
    setTimeout(function () { document.location.href = page }, theWaitTime)
  })
}

if ($('#CCJrequested').length === 1) {
  daysPass('/notifications/claimant/email2?phoneAlert=true', 5000, 5)
}

if ($('#showEmailFromHCEO').length === 1) {
  daysPass('/notifications/claimant/email4', 5000, 5)
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
