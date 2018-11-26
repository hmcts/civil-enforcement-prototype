module.exports = function (router) {
  const version = 'v2'
  const defendantName = 'Andrew Smith'
  const claimantName = 'Sam Jones'

  router.get(['/' + version + '/dashboard/case', '/' + version + '/dashboard/:dashboardType/case'], function (req, res) {
    let defendant = req.query.defendant || defendantName
    let claimant = req.query.claimant || claimantName
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
    res.render(version + '/dashboard/index.html', {
    })
  })

  router.get(['/' + version + '/dashboard/case-alt'], function (req, res) {
    let defendant = req.query.defendant || defendantName
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

}
