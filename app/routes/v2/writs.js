module.exports = function (router) {
  const version = 'v2'
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

  router.get(['/' + version + '/check-writ/', '/' + version + '/check-writ'], function (req, res) {
    res.render(version + '/check-writ/start.html')
  })

  router.get(['/' + version + '/check-writ/questions'], function (req, res) {
    res.render(version + '/check-writ/index.html')
  })

  router.post(['/' + version + '/check-writ/questions'], function (req, res) {
    // res.render(version + 'check-writ/index.html', {
    //   d: 'asd'
    // })
    res.redirect('/' + version + '/check-writ/confirmation-page')
  })
}
