const settings = require('./config')

module.exports = function (router) {
  const version = 'v3'
  router.get(['/' + version + '/CMC/claim-form'], function (req, res) {
    res.render(version + '/CMC/claim-form/claim-form-claimant.html', {
      details: settings
    })
  })
}
