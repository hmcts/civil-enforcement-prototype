module.exports = function (router) {
  const version = 'v1'
  router.get(['/' + version + '/dashboard/'], function (req, res) {
    res.render(version + '/dashboard/index.html', {
    })
  })

  router.get(['/' + version + '/dashboard/case-alt'], function (req, res) {
    let defendant = req.query.defendant || 'Andrew Smith'
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

  router.get(['/' + version + '/dashboard/case'], function (req, res) {
    let defendant = req.query.defendant || 'Andrew Smith'
    let simulateTimePassing = req.query.simulateTimePassing || false
    let CCJrequested = req.query.CCJrequested || false
    let CCJapproved = req.query.CCJapproved || false
    let writApproved = req.query.writApproved || false
    let writReady = req.query.writReady || false
    let writServed = req.query.writServed || false
    res.render(version + '/dashboard/case.html', {
      defendant: defendant,
      simulateTimePassing: simulateTimePassing,
      CCJrequested: CCJrequested,
      CCJapproved: CCJapproved,
      writApproved: writApproved,
      writReady: writReady,
      writServed: writServed
    })
  })
}
