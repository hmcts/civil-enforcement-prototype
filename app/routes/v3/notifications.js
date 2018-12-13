const settings = require('./config')

module.exports = function (router) {
  const version = 'v3'
  router.get(['/' + version + '/notifications/claimant/:email'], function (req, res) {
    let phoneAlert = req.query.phoneAlert || false
    let defendant = req.query.defendant || settings.defendant.name
    let claimant = req.query.claimant || settings.claimant.name
    let claimNumber = req.query.claimNumber || settings.claimNumber
    res.render(version + '/notifications/claimant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert,
      defendant: defendant,
      claimant: claimant,
      claimNumber: claimNumber
    })
  })
  router.get(['/' + version + '/notifications/defendant/:email'], function (req, res) {
    let phoneAlert = req.query.phoneAlert || false
    let defendant = req.query.defendant || settings.defendant.name
    let claimant = req.query.claimant || settings.claimant.name
    let claimNumber = req.query.claimNumber || settings.claimNumber
    res.render(version + '/notifications/defendant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert,
      defendant: defendant,
      claimant: claimant,
      claimNumber: claimNumber
    })
  })
}
