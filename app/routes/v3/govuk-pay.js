const settings = require('./config')

module.exports = function (router) {
  const version = 'v3'
  router.get(['/' + version + '/GOVUK-pay/enter-card'], function (req, res) {
    let sess = req.session
    sess.continueUrl = req.query.continueUrl || false
    sess.paymentAmount = req.query.amount || '66.00'
    sess.payee = req.query.payee || 'claimant'
    res.render(version + '/GOVUK-pay/enter-card.html', {
      amount: sess.paymentAmount
    })
  })
  router.get(['/' + version + '/GOVUK-pay/confirm-card-payment'], function (req, res) {
    let sess = req.session
    let payee = sess.payee
    console.log(sess.payee)
    if (sess.payee === 'defendant') {
      payee = settings.defendant
    } else {
      payee = settings.claimant
    }
    res.render(version + '/GOVUK-pay/confirm-card-payment.html', {
      payee: payee,
      amount: sess.paymentAmount
    })
  })
  router.get(['/' + version + '/GOVUK-pay/redirect-handler/'], function (req, res) {
    res.redirect(req.session.continueUrl)
  })
}
