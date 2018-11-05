module.exports = function (router) {
  router.get(['/writs/'], function (req, res) {
    res.render('writs/amount-to-enforce.html')
  })
  router.get(['/writs/payment'], function (req, res) {
    res.redirect('/GOVUK-pay/enter-card?continueUrl=/writs/confirmation-page')
  })
  router.post(['/writs/'], function (req, res) {
    res.redirect('/writs/select-hceo')
  })
  router.post(['/writs/select-hceo'], function (req, res) {
    res.redirect('/writs/debtor-details')
  })
  router.post(['/writs/debtor-details'], function (req, res) {
    res.redirect('/writs/check-answers')
  })
}
