module.exports = function (router) {
  const version = 'v2'
  router.get(['/' + version + '/notifications/claimant/:email'], function (req, res) {
    let phoneAlert = req.query.phoneAlert || false
    res.render(version + '/notifications/claimant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert
    })
  })
  router.get(['/' + version + '/notifications/defendant/:email'], function (req, res) {
    let phoneAlert = req.query.phoneAlert || false
    res.render(version + '/notifications/defendant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert
    })
  })
}
