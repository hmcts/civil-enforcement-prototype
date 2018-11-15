module.exports = function (router) {
  const version = 'v1'
  router.get(['/' + version + '/writs/'], function (req, res) {
    res.render('writs/amount-to-enforce.html')
  })
  router.get(['/' + version + '/writs/payment'], function (req, res) {
    res.redirect('/' + version + '/GOVUK-pay/enter-card?continueUrl=/' + version + '/writs/confirmation-page')
  })
  router.post(['/' + version + '/writs/'], function (req, res) {
    res.redirect('/' + version + '/writs/select-hceo')
  })
  router.post(['/' + version + '/writs/select-hceo'], function (req, res) {
    res.redirect('/' + version + '/writs/debtor-details')
  })
  router.post(['/' + version + '/writs/debtor-details'], function (req, res) {
    res.redirect('/' + version + '/writs/check-answers')
  })
}
