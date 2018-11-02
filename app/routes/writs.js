module.exports = function (router) {
  router.get(['/writs/'], function (req, res) {
    res.render('writs/amount-to-enforce.html')
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
