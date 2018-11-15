module.exports = function (router) {
  const version = 'v1'
  router.get(['/' + version + '/notifications/claimant/:email'], function (req, res) {
    let phoneAlert = req.query.phoneAlert || false
    res.render(version + '/notifications/claimant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert
    })
  })
}
