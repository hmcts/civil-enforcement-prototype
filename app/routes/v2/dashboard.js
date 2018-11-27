const settings = require('./config')

module.exports = function (router) {
  const version = 'v2'

  router.get(['/' + version + '/dashboard/case', '/' + version + '/dashboard/:dashboardType/case'], function (req, res) {
    let defendant = req.query.defendant || settings.defendant.name
    let claimant = req.query.claimant || settings.claimant.name
    let claimAmount = req.query.claimAmount || settings.claimAmount
    let simulateTimePassing = req.query.simulateTimePassing || false
    let CCJrequested = req.query.CCJrequested || false
    let CCJapproved = req.query.CCJapproved || false
    let writApproved = req.query.writApproved || false
    let writReady = req.query.writReady || false
    let writServed = req.query.writServed || false
    let dashboardType = req.params.dashboardType || 'claimant'
    res.render(version + '/dashboard/case.html', {
      defendant: defendant,
      claimant: claimant,
      defendantData: settings.defendant,
      claimantData: settings.claimant,
      claimAmount: claimAmount,
      simulateTimePassing: simulateTimePassing,
      CCJrequested: CCJrequested,
      CCJapproved: CCJapproved,
      writApproved: writApproved,
      writReady: writReady,
      writServed: writServed,
      dashboardType: dashboardType
    })
  })

  router.get(['/' + version + '/dashboard/', '/' + version + '/dashboard/:dashboardType'], function (req, res) {
    res.render(version + '/dashboard/index.html', {})
  })

  router.get(['/' + version + '/dashboard/case-alt'], function (req, res) {
    let defendant = req.query.defendant || settings.defendantName
    let enforcement = req.query.enforcement || false
    let writApproved = req.query.writApproved || false
    let writReady = req.query.writReady || false
    res.render(version + '/dashboard/case-alt.html', {
      defendant: defendant,
      enforcement: enforcement,
      writApproved: writApproved,
      writReady: writReady
    })
  })

  router.post(['/' + version + '/dashboard/security/defendant'], function (req, res) {
    res.redirect('/' + version + '/dashboard/security/defendant/2')
  })

  router.get(['/' + version + '/dashboard/security/defendant/2'], function (req, res) {
    res.render(version + '/dashboard/security/request-code.html')
  })

  router.post(['/' + version + '/dashboard/security/defendant/2'], function (req, res) {
    res.redirect('/' + version + '/dashboard/security/defendant/3')
  })

  router.get(['/' + version + '/dashboard/security/defendant/3'], function (req, res) {
    res.render(version + '/dashboard/security/enter-code.html')
  })

  router.post(['/' + version + '/dashboard/security/defendant/3'], function (req, res) {
    res.redirect('/' + version + '/dashboard/defendant/case?writApproved=true')
  })

}
