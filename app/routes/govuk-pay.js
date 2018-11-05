module.exports = function (router) {
  router.get(['/GOVUK-pay/enter-card'], function (req, res) {
    var sess = req.session
    sess.continueUrl = req.query.continueUrl || false
    res.render('GOVUK-pay/enter-card.html')
  })
  router.get(['/GOVUK-pay/redirect-handler/'], function (req, res) {
    res.redirect(req.session.continueUrl)
  })
}
