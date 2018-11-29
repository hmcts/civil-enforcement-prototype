const settings = require('./config')
const pageFlow = require('./pages.json')

module.exports = function (router) {
  const version = 'v2'
  const sprint = 5
  router.get(['/' + version + '/page-flow/'], function (req, res) {
    res.render(version + '/page-flow.html',
      {
        pageFlow: pageFlow,
        sprint: sprint
      }
    )
  })
}
