const settings = require('./config')

module.exports = function (router) {
  const version = 'v2'
  router.get(['/' + version + '/GOVUK-pay/enter-card'], function (req, res) {
    let sess = req.session
    sess.continueUrl = req.query.continueUrl || false
    sess.amount = req.query.amount || '66.00'
    res.render(version + '/GOVUK-pay/enter-card.html', {
      amount: sess.amount
    })
  })
  router.get(['/' + version + '/GOVUK-pay/confirm-card-payment'], function (req, res) {
    let sess = req.session
    console.log(sess)
    res.render(version + '/GOVUK-pay/confirm-card-payment.html', {
      name: settings.defendantName,
      amount: '255'
    })
  })
  router.get(['/' + version + '/GOVUK-pay/redirect-handler/'], function (req, res) {
    res.redirect(req.session.continueUrl)
  })
}
