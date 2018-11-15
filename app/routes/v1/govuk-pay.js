module.exports = function (router) {
  const version = 'v1'
  router.get(['/' + version + '/GOVUK-pay/enter-card'], function (req, res) {
    let sess = req.session
    sess.continueUrl = req.query.continueUrl || false
    res.render(version + '/GOVUK-pay/enter-card.html')
  })
  router.get(['/' + version + '/GOVUK-pay/redirect-handler/'], function (req, res) {
    res.redirect(req.session.continueUrl)
  })
}
