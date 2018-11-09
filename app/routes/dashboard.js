module.exports = function (router) {
  router.get(['/dashboard/case-alt'], function (req, res) {
    var defendant = req.query.defendant || 'Andrew Smith'
    var enforcement = req.query.enforcement || false
    var writApproved = req.query.writApproved || false
    var writReady = req.query.writReady || false
    res.render('dashboard/case-alt.html', {
      defendant: defendant,
      enforcement: enforcement,
      writApproved: writApproved,
      writReady: writReady
    })
  })

  router.get(['/dashboard/case'], function (req, res) {
    var defendant = req.query.defendant || 'Andrew Smith'
    var CCJrequested = req.query.CCJrequested || false
    var CCJapproved = req.query.CCJapproved || false
    var writApproved = req.query.writApproved || false
    var writReady = req.query.writReady || false
    var writServed = req.query.writServed || false
    res.render('dashboard/case.html', {
      defendant: defendant,
      CCJrequested: CCJrequested,
      CCJapproved: CCJapproved,
      writApproved: writApproved,
      writReady: writReady,
      writServed: writServed
    })
  })
}
