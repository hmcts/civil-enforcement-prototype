/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

function waitAndRedirect (page, waitTime) {
  var theWaitTime = waitTime || 3000
  $('#daysPassing').addClass('active')
  setTimeout(function () { document.location.href = page }, theWaitTime)
}

function daysPass (page, waitTime, days) {
  console.log('daysPass')
  var theDays = days || 5
  var theWaitTime = 200 * theDays || 5000
  setTimeout(function () { waitAndRedirect(page, waitTime) }, theWaitTime)
}

if ($('#CCJrequested').length === 1) {
  daysPass('/notifications/claimant/email2', 5000, 5)
}

if ($('#showEmailFromHCEO').length === 1) {
  daysPass('/notifications/claimant/email4', 5000, 5)
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})
