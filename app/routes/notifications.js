module.exports = function (router) {
  router.get(['/notifications/claimant/:email'], function (req, res) {
    var phoneAlert = req.query.phoneAlert || false
    res.render('notifications/claimant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert
    })
  })
}
