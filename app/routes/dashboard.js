module.exports = function (router) {
  router.get(['/dashboard/case-alt'], function (req, res) {
    var enforcement = req.query.enforcement || false
    var writApproved = req.query.writApproved || false
    res.render('dashboard/case-alt.html', {
      enforcement: enforcement,
      writApproved: writApproved
    })
  })
}
